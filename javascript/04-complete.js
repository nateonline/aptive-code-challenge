import fs from 'fs/promises';

let sum = 0;

// for (let page = 1; page <= 6; page++) {
// 	fetch(`https://challenge.aptive.tech/api/challenge/cac886c2-e3b7-4028-b8eb-605aa8f3a499/4?page=${page}`, {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		}
// 	})
// 		.then(response => response.json())
// 		.then(data => {
// 			data.data.forEach(element => {
// 				sum += element;
// 			});
// 		})
// 		.then(data => {
// 			console.log(sum);
// 		})
// }

// Sum of all pages is 49254

fetch('https://challenge.aptive.tech/api/challenge/cac886c2-e3b7-4028-b8eb-605aa8f3a499/4', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		checksum: 49254 % 10000
	}),
})
	.then(response => response.json())
	.then(data => fs.writeFile('response.json', JSON.stringify(data, null, 4)));
