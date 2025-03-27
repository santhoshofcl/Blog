<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    $to = "santhoshofcl01@gmail.com"; 
    $headers = "From: $email\r\nReply-To: $email\r\n";
    $body = "Name: $name\nEmail: $email\nSubject: $subject\n\n$message";

    if (mail($to, "Contact Form Submission: $subject", $body, $headers)) {
        echo "Success";
    } else {
        echo "Error";
    }
}
?>
