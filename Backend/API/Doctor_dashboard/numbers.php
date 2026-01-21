<?php
require_once "../../config/headers.php";
require_once "../../config/database.php";

$physicians = [];

$sql = "SELECT s.StaffName as physicianName, COUNT(a.AppointmentID) as appointmentCount
        FROM staff s
        LEFT JOIN appointment a ON s.StaffID = a.StaffID
        WHERE s.StaffName IS NOT NULL AND s.StaffName != ''
        GROUP BY s.StaffID, s.StaffName
        ORDER BY appointmentCount DESC, physicianName ASC";

$result = $conn->query($sql);
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $physicians[] = [
            "physicianName" => $row["physicianName"],
            "appointmentCount" => (int)$row["appointmentCount"]
        ];
    }
}

echo json_encode([
    "success" => true,
    "physicians" => $physicians
]);
$conn->close();
exit;
