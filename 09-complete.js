import fs from 'fs/promises';

fetch('https://challenge.aptive.tech/api/challenge/cac886c2-e3b7-4028-b8eb-605aa8f3a499/9', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		"election_won": true,
		"votes_received": [
			"node-1",
			"node-2",
			"node-5",
			"node-3",
			"node-4",
		],
		"votes_denied": [
		],
		"new_term": 4
	}),
})
	.then(response => response.json())
	.then(data => fs.writeFile('response.json', JSON.stringify(data, null, 4)));
