import fs from 'fs/promises';

// Felt like the instructions had had a bug in the explaination. I felt like the ABORT clause was regardless of the majority setting, but then tested the other way and it was marked correct.

fetch('https://challenge.aptive.tech/api/challenge/cac886c2-e3b7-4028-b8eb-605aa8f3a499/8', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		"decision": "COMMIT",
		"can_commit_participants": [
			"region-us-east",
			"region-us-west",
			"region-asia"
		],
		"aborted_participants": [
			"region-eu"
		],
		"reasoning": "Majority achieved: 3 of 4 participants voted COMMIT within timeout"
	}),
})
	.then(response => response.json())
	.then(data => fs.writeFile('response.json', JSON.stringify(data, null, 4)));
