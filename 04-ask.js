import fs from 'fs/promises';

fetch('https://challenge.aptive.tech/api/challenge/cac886c2-e3b7-4028-b8eb-605aa8f3a499/4', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
	},
})
	.then(response => response.json())
	.then(data => fs.writeFile('response.json', JSON.stringify(data, null, 4)));
