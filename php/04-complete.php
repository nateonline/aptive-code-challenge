<?php

$params = [
	"payload" => "{\"id\":\"evt_a1b2c3\",\"type\":\"order.created\",\"data\":{\"order_id\":\"ord_987\",\"amount\":4999}}",
	"signature" => "cec859ce33db0370008c1371783cc35956cd098a44fa44b696917a941c298a43",
	"secret" => "def12d66771cbcf7134917a26caad3e6",
	"timestamp" => 1700000000,
	"tolerance_seconds" => 300,
	"current_time" => 1700000300,
];

$params_payload = json_decode($params["payload"]);
$post_event = [
	"id" => $params_payload->id,
	"type" => $params_payload->type,
	"data" => [
		"order_id" => $params_payload->data->order_id,
	],
];

// Tested validity by removing dot separator before hash
$signed_content = $params['timestamp'] . "." . $params['payload'];
$sha256 = hash_hmac('sha256', $signed_content, $params['secret']);
$isSignatureValid = hash_equals($params['signature'], $sha256);
$isTimestampValid = abs($params['current_time'] - $params['timestamp']) <= $params['tolerance_seconds'];
$isValid = ($isTimestampValid && $isSignatureValid);

$url = "https://challenge.aptive.tech/api/challenge/b641f5b2-5016-4bb3-b47f-cba4e2f3cedf/4";
$post_content = json_encode([
	"valid" => $isValid,
	"event" => $post_event,
]);

echo json_encode($post_content) . PHP_EOL;

$options = [
	"http" => [
		"method"  => "POST",
		"header"  => "Content-type: application/json\r\n" . "Content-Length: " . strlen($post_content) . "\r\n",
		"content" => $post_content,
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

echo "Response saved to response.json successfully!" . PHP_EOL;
