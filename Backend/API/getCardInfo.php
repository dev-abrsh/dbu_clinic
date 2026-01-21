<?php
require_once "../config/headers.php";
require_once "../config/database.php";

header("Content-Type: application/json");
session_start();

$PatientID = $_SESSION['PatientID'] ?? 0;

if ($PatientID === 0) {
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized"
    ]);
    exit;
}

$stmt = $conn->prepare("
    SELECT 
        name,
        email,
        phone,
        age,
        gender,
        bloodType,
        department,
        profilePic
    FROM patients
    WHERE id = ?
");

$stmt->bind_param("i", $PatientID);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        "success" => true,
        "content" => $row
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "No record found"
    ]);
}

$stmt->close();
$conn->close();