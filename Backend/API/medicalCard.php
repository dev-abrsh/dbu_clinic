<?php
require_once "../config/headers.php";
require_once "../config/database.php";

header("Content-Type: application/json");

// Check if user is logged in
if (!isset($_SESSION['user'])) {
    echo json_encode(["success" => false, "error" => "Please login first"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle both FormData and JSON
    if (isset($_POST['user_data'])) {
        $data = json_decode($_POST['user_data'], true);
    } else {
        $data = json_decode(file_get_contents("php://input"), true);
    }

    $department = trim($data['department'] ?? '');
    $phone = trim($data['phone'] ?? '');
    $birthdate = trim($data['birthdate'] ?? '');
    $gender = trim($data['gender'] ?? '');
    $bloodType = trim($data['bloodType'] ?? '');

    if (empty($department) || empty($phone) || empty($birthdate) || empty($gender) || empty($bloodType)) {
        echo json_encode([
            "success" => false,
            "error" => "All fields are required"
        ]);
        exit;
    }

    $email = $_SESSION['user']['email'];
    
    $stmt = $conn->prepare("UPDATE patient SET department=?, phone=?, DateofBirth=?, gender=?, bloodType=? WHERE email=?");
    $stmt->bind_param("ssssss", $department, $phone, $birthdate, $gender, $bloodType, $email);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Medical card created successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "error" => "Can't add the data to the database"
        ]);
    }

    $stmt->close();
    $conn->close();
    exit;
} else {
    echo json_encode([
        "success" => false,
        "error" => "Invalid request method"
    ]);
    exit;
}
?>

<!-- sfgsdf -->