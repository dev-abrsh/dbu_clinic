<?php
require_once "../../config/headers.php";
require_once "../../config/database.php";

$patients = [];

if (isset($_SESSION['user']) && strtolower($_SESSION['user']['role']) === 'doctor') {
    $doctorEmail = $_SESSION['user']['email'];
    $staffID = null;

    // Get the doctor's staff ID
    $stmt = $conn->prepare("SELECT StaffID FROM staff WHERE email = ?");
    $stmt->bind_param("s", $doctorEmail);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($staffID);
        $stmt->fetch();
    }
    $stmt->close();

    if ($staffID) {
        // Fetch patients who have appointments with this doctor
        $sql = "SELECT 
                    p.PatientID as id,
                    p.profilepic as profilePic,
                    p.PatientName as name,
                    p.Gender as gender,
                    TIMESTAMPDIFF(YEAR, p.DateofBirth, CURDATE()) as age,
                    p.bloodType
                FROM appointment a
                JOIN patient p ON a.patientID = p.PatientID
                WHERE a.StaffID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $staffID);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($id, $profilePic, $name, $gender, $age, $bloodType);
        while ($stmt->fetch()) {
            $patients[] = [
                "id" => $id,
                "profilePic" => $profilePic,
                "name" => $name,
                "gender" => $gender,
                "age" => $age,
                "bloodType" => $bloodType
            ];
        }
        $stmt->close();
    }
}

echo json_encode([
    "success" => true,
    "content" => $patients
]);
$conn->close();
exit;
?>