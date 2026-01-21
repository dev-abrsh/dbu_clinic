<?php
require_once "../config/headers.php";
require_once "../config/database.php";

header("Content-Type: application/json");

// Check if user is logged in
if (!isset($_SESSION['user'])) {
    echo json_encode(["success" => false, "error" => "Please login first"]);
    exit;
}

$PatientID = isset($_SESSION['user']['id']) ? intval($_SESSION['user']['id']) : 0;

if ($PatientID === 0) {
    echo json_encode(["success" => false, "error" => "PatientID is required"]);
    exit;
}

// Get patient medical card information
$stmt = $conn->prepare(
    "SELECT 
        p.PatientName as name,
        p.email,
        p.department,
        p.phone,
        p.DateofBirth,
        TIMESTAMPDIFF(YEAR, p.DateofBirth, CURDATE()) as age,
        p.gender,
        p.bloodType,
        p.profilepic as profilePic
     FROM patient p
     WHERE p.PatientID = ?"
);

$stmt->bind_param("i", $PatientID);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $patient = $result->fetch_assoc();
    echo json_encode([
        "success" => true,
        "content" => $patient
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => "Patient not found"
    ]);
}

$stmt->close();
$conn->close();
