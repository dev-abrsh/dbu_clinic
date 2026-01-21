<?php
require_once "../config/headers.php";
require_once "../config/database.php";

header("Content-Type: application/json");

// Check if user is logged in
if (!isset($_SESSION['user'])) {
    echo json_encode(["success" => false, "error" => "Please login first"]);
    exit;
}

$PatientID = isset($_SESSION['user']['id']) ? intval($_SESSION['user']['id']) : intval($_GET['PatientID'] ?? 0);

if ($PatientID === 0) {
    echo json_encode(["success" => false, "error" => "PatientID is required"]);
    exit;
}

// Check if patient has medical card data (department, phone, etc.)
$stmt = $conn->prepare(
    "SELECT department, phone, DateofBirth, gender, bloodType
     FROM patient
     WHERE PatientID = ?"
);

$stmt->bind_param("i", $PatientID);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $patient = $result->fetch_assoc();
    // Check if medical card info exists
    if (!empty($patient['department']) && !empty($patient['phone']) && !empty($patient['gender']) && !empty($patient['bloodType'])) {
        echo json_encode(["success" => true, "hasCard" => true]);
    } else {
        echo json_encode(["success" => true, "hasCard" => false]);
    }
} else {
    echo json_encode(["success" => true, "hasCard" => false]);
}

$stmt->close();
$conn->close();
