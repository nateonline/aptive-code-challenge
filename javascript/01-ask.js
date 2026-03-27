import fs from 'fs/promises';

fetch('https://challenge.aptive.tech/api/challenge', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		email: 'nate96taylor@gmail.com',
	}),
})
	.then(response => response.json())
	.then(data => fs.writeFile('response.json', JSON.stringify(data, null, 4)));
