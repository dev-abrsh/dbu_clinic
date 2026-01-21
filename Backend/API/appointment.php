<?php
require_once "../config/headers.php";
require_once "../config/database.php";

header("Content-Type: application/json");

// Check if user is logged in
if (!isset($_SESSION['user'])) {
    echo json_encode(["success" => false, "error" => "Please login first"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$PatientID = isset($_SESSION['user']['id']) ? intval($_SESSION['user']['id']) : intval($data['PatientID'] ?? 0);
$StaffID = intval($data['StaffID'] ?? 0);
$date = trim($data['appointment_date'] ?? $data['date'] ?? '');
$time = trim($data['appointment_time'] ?? $data['time'] ?? '');

if ($PatientID === 0 || $StaffID === 0 || $date === '' || $time === '') {
    echo json_encode(["success" => false, "error" => "All fields are required"]);
    exit;
}

$stmt = $conn->prepare(
    "INSERT INTO appointment (PatientID, StaffID, appointment_date, appointment_time)
     VALUES (?, ?, ?, ?)"
);

$stmt->bind_param("iiss", $PatientID, $StaffID, $date, $time);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Appointment booked successfully"]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to book appointment"]);
}

$stmt->close();
$conn->close();
