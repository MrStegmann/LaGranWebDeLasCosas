import crypto from 'crypto';

class IdGenerator {
	static generate() {
		const timestamp = Date.now().toString(36);
		const buffer = crypto.randomBytes(6);
		const random = Array.from(buffer, (dec) => dec.toString(36).padStart(2, '0'))
			.join('')
			.substring(0, 6);
		return `TEMP-${timestamp}-${random}`;
	}
}

export default IdGenerator;
