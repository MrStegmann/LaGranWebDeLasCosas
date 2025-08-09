class Logistic {
	constructor() {
		this._perceptionScope = 100;
		this._critics = 20;
		this._pifias = 1;
		this._movement = 20;
		this._initiative = 0;
		this._hasBeenSpoted = false;
		this._actions = 2;
		this._hasAttacked = false;
		this._spellScope = 80;
		this._extraPPerception = 1;
		this._extraSPerception = 1;
		this._extraChange = 1;
		this._extraAskAction = 1;
		this._wounded = 'none';
		this._lastTarget = {};
	}

	getperceptionScope() {
		return this._perceptionScope;
	}
	setperceptionScope(value) {
		this._perceptionScope = value;
	}

	getcritics() {
		return this._critics;
	}
	setcritics(value) {
		this._critics = value;
	}

	getpifias() {
		return this._pifias;
	}
	setpifias(value) {
		this._pifias = value;
	}

	getmovement() {
		return this._movement;
	}
	setmovement(value) {
		this._movement = value;
	}

	getinitiative() {
		return this._initiative;
	}
	setinitiative(value) {
		this._initiative = value;
	}

	gethasBeenSpoted() {
		return this._hasBeenSpoted;
	}
	sethasBeenSpoted(value) {
		this._hasBeenSpoted = value;
	}

	getactions() {
		return this._actions;
	}
	setactions(value) {
		this._actions = value;
	}

	gethasAttacked() {
		return this._hasAttacked;
	}
	sethasAttacked(value) {
		this._hasAttacked = value;
	}

	getspellScope() {
		return this._spellScope;
	}
	setspellScope(value) {
		this._spellScope = value;
	}

	getextraPPerception() {
		return this._extraPPerception;
	}
	setextraPPerception(value) {
		this._extraPPerception = value;
	}

	getextraSPerception() {
		return this._extraSPerception;
	}
	setextraSPerception(value) {
		this._extraSPerception = value;
	}

	getextraChange() {
		return this._extraChange;
	}
	setextraChange(value) {
		this._extraChange = value;
	}

	getextraAskAction() {
		return this._extraAskAction;
	}
	setextraAskAction(value) {
		this._extraAskAction = value;
	}

	getwounded() {
		return this._wounded;
	}
	setwounded(value) {
		this._wounded = value;
	}

	getlastTarget() {
		return this._lastTarget;
	}
	setlastTarget(value) {
		this._lastTarget = value;
	}
}

export { Logistic };
