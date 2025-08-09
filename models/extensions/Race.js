class Race {
	constructor(id, code, label, pros, cons, special) {
		this._id = id;
		this.code = code;
		this.label = label;
		this.pros = pros;
		this.cons = cons;
		this.special = special; // [String] Superfuerza, vision nocturna, audicion superior
	}

	getId() {
		return this._id;
	}
	setId(id) {
		this._id = id;
	}

	getCode() {
		return this.code;
	}
	setCode(code) {
		this.code = code;
	}
	getLabel() {
		return this.label;
	}
	setLabel(label) {
		this.label = label;
	}
	getPros() {
		return this.pros;
	}
	setPros(pros) {
		this.pros = pros;
	}
	getCons() {
		return this.cons;
	}
	setCons(cons) {
		this.cons = cons;
	}
	getSpecial() {
		return this.special;
	}
	setSpecial(special) {
		this.special = special;
	}
}
