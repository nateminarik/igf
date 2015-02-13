<?php

session_start();
require_once "Mail.php";

	$msg='';

	if($_SERVER["REQUEST_METHOD"] == "POST"){
		$recaptcha=$_POST['g-recaptcha-response'];
		$name=ucwords($_POST['name']);
		$to='jason.pierce.designs@gmail.com';
		$subject='general inquiry from the website';
		$comments=$_POST['comments'];
		$phone=$_POST['phone'];
		$email=$_POST['email'];
		$host = "mail.igf-inc.com";
		$username='test@igf-inc.com';
		$password='Igfwebsite1';
		$auth = array('host' => $host, 'auth' => true, 'username' => $username, 'password' => $password);
		$headers = array('From' => $username, 'To' => $to, 'Subject' => $subject, 'Reply-To' => $email);

		$message='Message from ' . $name . ': \n' . 'Phone: ' . $phone . ' \n' . 'Email: ' . $email . '\n' . 'Comments: ' . $comments . '\n';

		if(!empty($recaptcha)){
			// include("getCurlData.php");
			// $google_url="https://www.google.com/recaptcha/api/siteverify";
			// $secret='6Lfu3f8SAAAAAHDleuq1BbgswHFYTt_vZeoYnohH';
			// $ip=$_SERVER['REMOTE_ADDR'];
			// $url=$google_url."?secret=".$secret."&response=".$recaptcha."&remoteip=".$ip;
			// $res=getCurlData($url);
			// $res= json_decode($res, true);
			// //reCaptcha success check
			// $output = print_r($res, true);
			// echo ' ' . $output . ' is the output. ';

			// This section send the email
			$smtp = Mail::factory('smtp', $auth);
			$mail = $smtp->send($email_to, $headers, $email_message);


			// if($res['success']){
			// 	echo 'in third if...';
			// 	mail($to, $subject, $message, $header);
			// } elseif ($res['error-codes']){
			// 	$msg="response was error";
			// } else {
			// 	$msg="response was dumbass";
			// }


		} else {
			$msg="response recaptcha was empty";
		}
	}

echo $msg;

?>