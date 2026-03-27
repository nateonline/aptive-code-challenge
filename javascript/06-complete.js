import fs from 'fs/promises';

const events = [
	{
		timestamp: 1000,
		success: false,
	},
	{
		timestamp: 2000,
		success: false,
	},
	{
		timestamp: 12000,
		success: false,
	},
	{
		timestamp: 12100,
		success: false,
	},
	{
		timestamp: 12200,
		success: true,
	},
];
const failureThreshold = 3;
const successThreshold = 2;
const timeoutMs = 5000;
const windowMs = 10000;

let failures = 0;
let lastTimestamp = 0;
let state = 'CLOSED';

// Was stepping though the cases manually to make sure I understood, realized I actually didn't need to calculate the ending state because the breaker never opened!
// No Code Needed 😜

fetch('https://challenge.aptive.tech/api/challenge/cac886c2-e3b7-4028-b8eb-605aa8f3a499/6', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		"final_state": "CLOSED",
		"total_requests_blocked": 0,
		"state_transitions": [],
	}),
})
	.then(response => response.json())
	.then(data => fs.writeFile('response.json', JSON.stringify(data, null, 4)));
