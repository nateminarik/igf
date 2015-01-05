<?php
session_start();

$msg='';

if($_SERVER["REQUEST_METHOD"] == "POST"){
	$recaptcha=$_POST['g-recaptcha-response'];
	$from=$_POST['name'];
	$header='From:' . $from . '\r\n';
	$to='jason.pierce.designs@gmail.com';
	$subject='general inquiry from the website';
	$comments=$_POST['comments'];
	$phone=$_POST['phone'];
	$message='Message from ' . $name . ': \r\n' . 'Phone: ' . $phone . ' \r\n' . 'Comments: ' . $comments . '\r\n';

	if(!empty($recaptcha)){
		include("getCurlData.php");
		$google_url="https://www.google.com/recaptcha/api/siteverify";
		$secret='6Lfu3f8SAAAAAHDleuq1BbgswHFYTt_vZeoYnohH';
		$ip=$_SERVER['REMOTE_ADDR'];
		$url=$google_url."?secret=".$secret."&response=".$recaptcha."&remoteip=".$ip;
		$res=getCurlData($url);
		$res= json_decode($res, true);
		//reCaptcha success check
		if($res['success']){
			mail($to, $subject, $message, $headers);
		} else {
			$msg="Please re-enter your reCAPTCHA.";
		}

	} else {
		$msg="Please re-enter your reCAPTCHA.";
	}
}
?>