<?php
require_once "../config/headers.php";

header("Content-Type: application/json");

if (isset($_SESSION['user'])) {
    echo json_encode([
        "loggedIn" => true,
        "user" => $_SESSION["user"],
        "role" => $_SESSION["user"]["role"] ?? "patient"
    ]);
} else {
    echo json_encode([
        "loggedIn" => false
    ]);
}
exit;
?>