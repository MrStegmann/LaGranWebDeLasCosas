class Disadvantage {
	constructor() {
		this._phobia = '';
		this._oneArmed = false;
		this._vengeful = false;
		this._indecisive = false;
	}

	getphobia() {
		return this._phobia;
	}
	setphobia(value) {
		this._phobia = value;
	}

	getoneArmed() {
		return this._oneArmed;
	}
	setoneArmed(value) {
		this._oneArmed = value;
	}

	getvengeful() {
		return this._vengeful;
	}
	setvengeful(value) {
		this._vengeful = value;
	}

	getindecisive() {
		return this._indecisive;
	}
	setindecisive(value) {
		this._indecisive = value;
	}
}

export { Disadvantage };
