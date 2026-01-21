<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../config/headers.php";
require_once "../config/database.php";

/* Handle OPTIONS */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/* Ensure DB connection */
if (!isset($conn) || $conn->connect_error) {
    echo json_encode([
        "success" => false,
        "error" => "Database connection failed"
    ]);
    exit();
}

/* Read raw input */
$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

/* Fallback to form-data */
if (!is_array($data)) {
    $data = $_POST;
}

/* If still empty */
if (!is_array($data) || empty($data)) {
    echo json_encode([
        "success" => false,
        "error" => "No input data received"
    ]);
    exit();
}

/* Sanitize inputs */
$name     = trim($data['name'] ?? '');
$email    = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');
$role     = ($data['role'] ?? 'patient') === 'doctor' ? 'doctor' : 'patient';

/* Validation */
if ($name === '' || $email === '' || $password === '') {
    echo json_encode([
        "success" => false,
        "error" => "All fields are required"
    ]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "error" => "Invalid email address"
    ]);
    exit();
}

if (strlen($password) < 8) {
    echo json_encode([
        "success" => false,
        "error" => "Password must be at least 8 characters"
    ]);
    exit();
}

/* ---------- CHECK EMAIL IN PATIENT ---------- */
$stmt = $conn->prepare("SELECT 1 FROM patient WHERE email = ?");
if (!$stmt) {
    echo json_encode(["success" => false, "error" => $conn->error]);
    exit();
}
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo json_encode(["success" => false, "error" => "Email already exists"]);
    exit();
}
$stmt->close();

/* ---------- CHECK EMAIL IN STAFF ---------- */
$stmt = $conn->prepare("SELECT 1 FROM staff WHERE email = ?");
if (!$stmt) {
    echo json_encode(["success" => false, "error" => $conn->error]);
    exit();
}
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo json_encode(["success" => false, "error" => "Email already exists"]);
    exit();
}
$stmt->close();

/* Hash password */
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

/* ---------- INSERT USER ---------- */
if ($role === 'doctor') {
    $stmt = $conn->prepare(
        "INSERT INTO staff (StaffName, email, password, StaffPosition)
         VALUES (?, ?, ?, 'Doctor')"
    );
} else {
    $stmt = $conn->prepare(
        "INSERT INTO patient (PatientName, email, password)
         VALUES (?, ?, ?)"
    );
}

if (!$stmt) {
    echo json_encode(["success" => false, "error" => $conn->error]);
    exit();
}

$stmt->bind_param("sss", $name, $email, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Account created successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => "Signup failed"
    ]);
}

$stmt->close();
$conn->close();
