<?php
require_once "../../config/headers.php";
require_once "../../config/database.php";

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "error" => "Invalid request method."]);
    $conn->close();
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$physicianName = trim($data['physicianName'] ?? '');

if ($physicianName === '') {
    echo json_encode(["success" => false, "error" => "Physician name is required."]);
    $conn->close();
    exit;
}

// Check if physician already exists
$stmt = $conn->prepare("SELECT StaffID FROM staff WHERE StaffName = ?");
$stmt->bind_param("s", $physicianName);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo json_encode(["success" => false, "error" => "Physician already exists."]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();

// Insert new physician (doctor)
$stmt = $conn->prepare("INSERT INTO staff (StaffName, StaffPosition) VALUES (?, 'Doctor')");
$stmt->bind_param("s", $physicianName);
$success = $stmt->execute();
$stmt->close();

if ($success) {
    echo json_encode(["success" => true, "message" => "Physician added successfully."]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to add physician."]);
}
$conn->close();
exit;
