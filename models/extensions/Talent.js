class Talent {
	constructor(code, label, value) {
		this.code = code;
		this.label = label;
		this.value = value;
	}

	static fromRaw(data) {
		return new Talent(data.code, data.label, data.value);
	}

	static setTalentByTalent(talent) {
		return new Talent(talent.code, talent.label, talent.value || 0);
	}
}

export { Talent };
