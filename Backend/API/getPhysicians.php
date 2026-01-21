<?php
require_once "../config/headers.php";
require_once "../config/database.php";

header("Content-Type: application/json");

$physicians = [];

$sql = "SELECT StaffID, StaffName FROM staff WHERE StaffPosition = 'Doctor' ORDER BY StaffName ASC";
$result = $conn->query($sql);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $physicians[] = [
            "StaffID" => (int)$row["StaffID"],
            "StaffName" => $row["StaffName"]
        ];
    }
}

echo json_encode([
    "success" => true,
    "physicians" => $physicians
]);

$conn->close();
exit;
?>

