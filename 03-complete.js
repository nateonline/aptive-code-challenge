import fs from 'fs/promises';

const sequence = [0, 1];

// Start by looking for the 2nd index (3rd number)
for (let i = 2; i < 19; i++) {
	sequence.push(sequence[i-2] + sequence[i-1]);
}
console.log(sequence.at(-1));

// Dealt with some off-by-one requirements definitions stuff

fetch('https://challenge.aptive.tech/api/challenge/cac886c2-e3b7-4028-b8eb-605aa8f3a499/3', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		value: sequence.at(-1)
	})
})
	.then(response => response.json())
	.then(data => fs.writeFile('response.json', JSON.stringify(data, null, 4)));
