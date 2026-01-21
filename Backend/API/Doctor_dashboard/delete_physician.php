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

// Get the StaffID for the physician
$stmt = $conn->prepare("SELECT StaffID FROM staff WHERE StaffName = ?");
$stmt->bind_param("s", $physicianName);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows === 0) {
    echo json_encode(["success" => false, "error" => "Physician not found."]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->bind_result($staffID);
$stmt->fetch();
$stmt->close();

// Optionally, delete all appointments for this physician
$delAppt = $conn->prepare("DELETE FROM appointment WHERE StaffID = ?");
$delAppt->bind_param("i", $staffID);
$delAppt->execute();
$delAppt->close();

// Delete the physician
$stmt = $conn->prepare("DELETE FROM staff WHERE StaffID = ?");
$stmt->bind_param("i", $staffID);
$success = $stmt->execute();
$stmt->close();

if ($success) {
    echo json_encode(["success" => true, "message" => "Physician deleted successfully."]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to delete physician."]);
}
$conn->close();
exit;
