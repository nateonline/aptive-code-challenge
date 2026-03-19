import fs from 'fs/promises';

// This one just had me apply some logic and barely change the example submission, was super easy

fetch('https://challenge.aptive.tech/api/challenge/cac886c2-e3b7-4028-b8eb-605aa8f3a499/7', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		"can_satisfy_quorum": true,
		"consensus_value": "consistent",
		"needs_repair": false,
		"repair_nodes": []
	}),
})
	.then(response => response.json())
	.then(data => fs.writeFile('response.json', JSON.stringify(data, null, 4)));
