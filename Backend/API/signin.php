<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

require_once "../config/headers.php";
require_once "../config/database.php";

session_start();

/* OPTIONS */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

/* Read input safely */
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if ($email === '' || $password === '') {
    echo json_encode([
        "success" => false,
        "error" => "Email and password are required"
    ]);
    exit();
}

/* ================= PATIENT ================= */
$stmt = $conn->prepare(
    "SELECT PatientID, PatientName, password, email
     FROM patient WHERE email = ?"
);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "error" => "Database error"
    ]);
    exit();
}

$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

$user = null;
$role = "patient";

if ($stmt->num_rows === 1) {
    $stmt->bind_result($id, $name, $hash, $userEmail);
    $stmt->fetch();

    if (password_verify($password, $hash)) {
        $user = [
            "id" => $id,
            "name" => $name,
            "email" => $userEmail
        ];
    }
}

$stmt->close();

/* ================= STAFF ================= */
if (!$user) {
    $stmt = $conn->prepare(
        "SELECT StaffID, StaffName, password, email, StaffPosition
         FROM staff WHERE email = ?"
    );

    if (!$stmt) {
        echo json_encode([
            "success" => false,
            "error" => "Database error"
        ]);
        exit();
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $name, $hash, $userEmail, $position);
        $stmt->fetch();

        if (password_verify($password, $hash)) {
            $role = strtolower($position) === "doctor" ? "doctor" : "admin";
            $user = [
                "id" => $id,
                "name" => $name,
                "email" => $userEmail
            ];
        }
    }

    $stmt->close();
}

/* ================= FAIL ================= */
if (!$user) {
    echo json_encode([
        "success" => false,
        "error" => "Invalid email or password"
    ]);
    exit();
}

/* ================= SESSION ================= */
$_SESSION['user'] = [
    "id" => $user['id'],
    "name" => $user['name'],
    "email" => $user['email'],
    "role" => $role
];

/* ================= SUCCESS ================= */
echo json_encode([
    "success" => true,
    "PatientID" => $user['id'],
    "PatientName" => $user['name'],
    "role" => $role
]);

$conn->close();
