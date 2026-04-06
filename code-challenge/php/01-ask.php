<?php

$url = "https://challenge.aptive.tech/api/challenge";
$payload = json_encode(["email" => "nate96taylor+php@gmail.com"]);

$options = [
	"http" => [
		"method"  => "POST",
		"header"  => "Content-type: application/json\r\n" . "Content-Length: " . strlen($payload) . "\r\n",
		"content" => $payload,
	],
];

$context  = stream_context_create($options);
$response = file_get_contents($url, false, $context);

if ($response === false) {
	die("Error: Could not reach the API.");
}

$data = json_decode($response, true);
$prettyJson = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
file_put_contents("response.json", $prettyJson);

echo "Response saved to response.json successfully!";
