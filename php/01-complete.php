<?php

$url = "https://challenge.aptive.tech/api/challenge/b641f5b2-5016-4bb3-b47f-cba4e2f3cedf/1";
$payload = json_encode(["acknowledged" => true]);

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
