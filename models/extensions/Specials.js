import races from '../../json/races.json' with { type: 'json' };

class Specials {
	constructor() {
		this.superStrength = false;
		this.superAudition = false;
		this.nightVision = false;
		this.conjurer = false;
		this.memberReplacement = false;
		this.hugeMovement = false;
	}

	setSpecials(race) {
		const foundRace = races.find((ra) => ra.code === race);
		if (foundRace) {
			for (const special of foundRace.special) {
				if (this.hasOwnProperty(special)) {
					this[special] = true;
				}
			}
		}
	}

	isInHuargenForm(bool) {
		this.hugeMovement = bool;
	}
}

export { Specials };
