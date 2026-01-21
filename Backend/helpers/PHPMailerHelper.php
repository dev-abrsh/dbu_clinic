<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php'; // Adjust path if needed

class PHPMailerHelper
{
    public static function sendMail($to, $subject, $body, $fromEmail, $fromName)
    {
        $mail = new PHPMailer(true);
        try {
            //Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // Set your SMTP server
            $mail->SMTPAuth = true;
            $mail->Username = 'eyobedteshome@gmail.com'; // SMTP username
            $mail->Password = 'your_app_password'; // SMTP password or app password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            //Recipients
            $mail->setFrom($fromEmail, $fromName);
            $mail->addAddress($to);

            // Content
            $mail->isHTML(false);
            $mail->Subject = $subject;
            $mail->Body = $body;

            $mail->send();
            return [
                "success" => true,
                "message" => "Your message has been sent successfully."
            ];
        } catch (Exception $e) {
            error_log("PHPMailer error: " . $mail->ErrorInfo);
            return [
                "success" => false,
                "error" => "Failed to send your message. Please try again later."
            ];
        }
    }
}
?>