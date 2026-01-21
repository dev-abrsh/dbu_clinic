<?php
require "../../config/headers.php";
require "../../config/database.php";

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $appointments = [];

    // Use prepared statement as in appointmentInfo.php
    $stmt = $conn->prepare(
        "SELECT p.patientName, s.StaffName as doctorName, a.AppointmentDate AS date, a.AppointmentTime AS time
        FROM appointment a
        JOIN patient p ON a.patientID = p.patientID
        JOIN staff s ON a.StaffID = s.StaffID
        ORDER BY a.AppointmentDate DESC, a.AppointmentTime DESC"
    );
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($patientName, $doctorName, $date, $time);
        while ($stmt->fetch()) {
            $appointments[] = [
                "patientName" => $patientName,
                "doctorName" => $doctorName,
                "date" => $date,
                "time" => $time
            ];
        }
    }
    $stmt->close();

    echo json_encode([
        "success" => true,
        "content" => $appointments
    ]);
    $conn->close();
    exit;
} else {
    echo json_encode([
        "success" => false,
        "error" => "Invalid request method"
    ]);
    $conn->close();
    exit;
}
?>