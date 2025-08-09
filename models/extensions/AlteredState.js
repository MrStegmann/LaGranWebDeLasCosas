class AlteredState {
	constructor() {
		this._canBeBleeding = true;
		this._canBeStuned = true;
		this._canBeFelled = true;
		this._canBeSick = true;
		this._canBeScared = true;
		this._canBeLostControl = true;
		this._canBeRooted = true;
		this._canBeMadness = true;
		this._canBeTired = true;
		this._canBeBlinded = true;
		this._canBeGrabbed = true;
		this._canBeDisarmed = true;
		this._canBeResurrected = true;
		this._canBeCursed = true;
		this._canBeBurning = true;
		this._canBeParanoisa = true;
		this._canBeSpellbound = true;

		this._bleeding = false;
		this._stuned = false;
		this._felled = false;
		this._sick = {};
		this._scared = false;
		this._lostControl = false;
		this._burned = false;
		this._rooted = false;
		this._madness = false;
		this._tired = false;
		this._blinded = false;
		this._grabbed = false;
		this._disarmed = false;
		this._cripple = false;
		this._resurrected = false;
		this._cursed = {};
		this._burning = false;
		this._paranoisa = false;
		this._vertic = false;
		this._spellbound = false;
	}

	getcanBeBleeding() {
		return this._canBeBleeding;
	}
	setcanBeBleeding(value) {
		this._canBeBleeding = value;
	}

	getcanBeStuned() {
		return this._canBeStuned;
	}
	setcanBeStuned(value) {
		this._canBeStuned = value;
	}

	getcanBeFelled() {
		return this._canBeFelled;
	}
	setcanBeFelled(value) {
		this._canBeFelled = value;
	}

	getcanBeSick() {
		return this._canBeSick;
	}
	setcanBeSick(value) {
		this._canBeSick = value;
	}

	getcanBeScared() {
		return this._canBeScared;
	}
	setcanBeScared(value) {
		this._canBeScared = value;
	}

	getcanBeLostControl() {
		return this._canBeLostControl;
	}
	setcanBeLostControl(value) {
		this._canBeLostControl = value;
	}

	getcanBeRooted() {
		return this._canBeRooted;
	}
	setcanBeRooted(value) {
		this._canBeRooted = value;
	}

	getcanBeMadness() {
		return this._canBeMadness;
	}
	setcanBeMadness(value) {
		this._canBeMadness = value;
	}

	getcanBeTired() {
		return this._canBeTired;
	}
	setcanBeTired(value) {
		this._canBeTired = value;
	}

	getcanBeBlinded() {
		return this._canBeBlinded;
	}
	setcanBeBlinded(value) {
		this._canBeBlinded = value;
	}

	getcanBeGrabbed() {
		return this._canBeGrabbed;
	}
	setcanBeGrabbed(value) {
		this._canBeGrabbed = value;
	}

	getcanBeDisarmed() {
		return this._canBeDisarmed;
	}
	setcanBeDisarmed(value) {
		this._canBeDisarmed = value;
	}

	getcanBeResurrected() {
		return this._canBeResurrected;
	}
	setcanBeResurrected(value) {
		this._canBeResurrected = value;
	}

	getcanBeCursed() {
		return this._canBeCursed;
	}
	setcanBeCursed(value) {
		this._canBeCursed = value;
	}

	getcanBeBurning() {
		return this._canBeBurning;
	}
	setcanBeBurning(value) {
		this._canBeBurning = value;
	}

	getcanBeParanoisa() {
		return this._canBeParanoisa;
	}
	setcanBeParanoisa(value) {
		this._canBeParanoisa = value;
	}

	getcanBeSpellbound() {
		return this._canBeSpellbound;
	}
	setcanBeSpellbound(value) {
		this._canBeSpellbound = value;
	}

	getbleeding() {
		return this._bleeding;
	}
	setbleeding(value) {
		this._bleeding = value;
	}

	getstuned() {
		return this._stuned;
	}
	setstuned(value) {
		this._stuned = value;
	}

	getfelled() {
		return this._felled;
	}
	setfelled(value) {
		this._felled = value;
	}

	getsick() {
		return this._sick;
	}
	setsick(value) {
		this._sick = value;
	}

	getscared() {
		return this._scared;
	}
	setscared(value) {
		this._scared = value;
	}

	getlostControl() {
		return this._lostControl;
	}
	setlostControl(value) {
		this._lostControl = value;
	}

	getburned() {
		return this._burned;
	}
	setburned(value) {
		this._burned = value;
	}

	getrooted() {
		return this._rooted;
	}
	setrooted(value) {
		this._rooted = value;
	}

	getmadness() {
		return this._madness;
	}
	setmadness(value) {
		this._madness = value;
	}

	gettired() {
		return this._tired;
	}
	settired(value) {
		this._tired = value;
	}

	getblinded() {
		return this._blinded;
	}
	setblinded(value) {
		this._blinded = value;
	}

	getgrabbed() {
		return this._grabbed;
	}
	setgrabbed(value) {
		this._grabbed = value;
	}

	getdisarmed() {
		return this._disarmed;
	}
	setdisarmed(value) {
		this._disarmed = value;
	}

	getcripple() {
		return this._cripple;
	}
	setcripple(value) {
		this._cripple = value;
	}

	getresurrected() {
		return this._resurrected;
	}
	setresurrected(value) {
		this._resurrected = value;
	}

	getcursed() {
		return this._cursed;
	}
	setcursed(value) {
		this._cursed = value;
	}

	getburning() {
		return this._burning;
	}
	setburning(value) {
		this._burning = value;
	}

	getparanoisa() {
		return this._paranoisa;
	}
	setparanoisa(value) {
		this._paranoisa = value;
	}

	getvertic() {
		return this._vertic;
	}
	setvertic(value) {
		this._vertic = value;
	}

	getspellbound() {
		return this._spellbound;
	}
	setspellbound(value) {
		this._spellbound = value;
	}
}

export { AlteredState };
