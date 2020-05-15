<?php 
if(isset($_POST['submit'])){
    $to = "j.spratt.gm@gmail.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $last_name = $_POST['last_name'];
    $subject = "Portfolio Message";
    $message = $_POST['message'];
    $message = $from . " wrote the following:" . "\n\n" . $_POST['message'];
    $message2 = "Here is a copy of your message to" . $to . "\n\n" . $_POST['message'];

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    mail($to,$subject,$message,$headers);
    mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
    echo "Mail Sent. Thank you, I will contact you shortly. Kind regards Joe";
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    }
?>