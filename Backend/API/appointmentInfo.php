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

$stmt = $conn->prepare(
    "SELECT 
        a.AppointmentID,
        p.PatientName,
        s.StaffName as physician,
        a.appointment_date as date,
        a.appointment_time as time,
        a.status
    FROM appointment a
    JOIN patient p ON a.PatientID = p.PatientID
    JOIN staff s ON a.StaffID = s.StaffID
    WHERE a.PatientID = ?
    ORDER BY a.appointment_date DESC, a.appointment_time DESC
    LIMIT 1"
);

$stmt->bind_param("i", $PatientID);
$stmt->execute();
$result = $stmt->get_result();

$appointment = null;

if ($result->num_rows > 0) {
    $appointment = $result->fetch_assoc();
    echo json_encode([
        "success" => true,
        "content" => $appointment
    ]);
} else {
    echo json_encode([
        "success" => false,
        "content" => null
    ]);
}

$stmt->close();
$conn->close();
