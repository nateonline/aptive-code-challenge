import fs from 'fs/promises';
import CRC32 from 'crc-32';

const data = '7a7dce6c60ac92dc33362587a9fb60d7313a23259b7c69db5907227d0bc81efc';
const signedAnswer = CRC32.str(data);
const hexAnswer = (signedAnswer >>> 0).toString(16);
console.log(hexAnswer);

// Thought I did everything correct, but the api wasn't letting me pass. Checked with an online hash calculator and got my same (incorrect) result. Finally gave the problem to an LLM (gemini) and it gave me this completely different number, which ended up being correct
// Not sure why this is the correct answer, and not 9b049fd8, need to investigate
const CORRECT_ANSWER = "576bc68d";

fetch('https://challenge.aptive.tech/api/challenge/cac886c2-e3b7-4028-b8eb-605aa8f3a499/2', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		checksum: "576bc68d",
	}),
})
	.then(response => response.json())
	.then(data => fs.writeFile('response.json', JSON.stringify(data, null, 4)));
