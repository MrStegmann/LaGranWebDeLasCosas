export default function () {
	const crypto = window.crypto || window.msCrypto;
	const timestamp = Date.now().toString(36);
	const array = new Uint8Array(6);
	crypto.getRandomValues(array);
	const random = Array.from(array, (dec) => dec.toString(36).padStart(2, '0'))
		.join('')
		.substring(0, 6);
	return `TEMP-${timestamp}-${random}`;
}
