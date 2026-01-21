<?php
require_once "../config/headers.php";

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $message = trim($data['message'] ?? '');

    if (!$name || !$email || !$message) {
        echo json_encode([
            "success" => false,
            "error" => "All fields are required."
        ]);
        exit;
    }

    // ✅ Fake success response (no email sent)
    echo json_encode([
        "success" => true,
        "message" => "Your message was successfully sent."
    ]);
    exit;
} else {
    echo json_encode([
        "success" => false,
        "error" => "Invalid request method."
    ]);
    exit;
}
