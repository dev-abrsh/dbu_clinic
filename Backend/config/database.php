<?php

// Database connection
$host = "localhost";
$port = 3306;
$db_name = "dbu_clinic";
$username = "root";
$password = "";

# Creating connection
$conn = new mysqli($host, $username, $password, $db_name, $port);
if($conn->connect_error) {
    // Don't echo here as it breaks JSON responses
    // Error will be handled by calling code
    error_log("Database connection failed: " . $conn->connect_error);
}
?>
