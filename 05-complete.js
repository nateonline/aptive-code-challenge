import fs from 'fs/promises';
import CryptoJS from 'crypto-js';

const servers = [
	"server-a",
	"server-b",
	"server-c",
];
const keys = [
	"user:1",
	"user:2",
	"user:3",
	"user:4",
	"user:5",
];

const nodes = [];
servers.forEach(server => {
	const vnodes = 3;
	for (let i = 0; i < vnodes; i++) {
		nodes.push({
			hash: CryptoJS.MD5(`${server}:vnode${i}`).toString(),
			server: server,
		});
	}
});
nodes.sort((a, b) => a.hash.localeCompare(b.hash));
console.log("Nodes:");
console.log(nodes);
console.log();

const distribution = {
	'server-a': [],
	'server-b': [],
	'server-c': [],
};
keys.forEach(key => {
	const keyHash = CryptoJS.MD5(key).toString();
	console.log(`Hash for key '${key}' is '${keyHash}'`);
	let foundNode = nodes.find(node => node.hash >= keyHash);
	if (foundNode === undefined) {
		foundNode = nodes.at(0);
	}
	console.log(`\tAssigned to ${foundNode.server} (because of node index ${nodes.indexOf(foundNode)})`)
	distribution[foundNode.server].push(key);
	console.log();
});
console.log(distribution);

fetch('https://challenge.aptive.tech/api/challenge/cac886c2-e3b7-4028-b8eb-605aa8f3a499/5', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		distribution: distribution,
	})
})
	.then(response => response.json())
	.then(data => fs.writeFile('response.json', JSON.stringify(data, null, 4)));
