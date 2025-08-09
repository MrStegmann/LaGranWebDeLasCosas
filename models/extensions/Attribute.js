import { Talent } from './Talent.js';

class Attribute {
	constructor(code, label, value, talents) {
		this.code = code;
		this.label = label;
		this.value = value;
		this.tp = value * 2; // Puntos de talento. 2 puntos por cada 1 de atributo
		this.talents = talents; // { talent1: value, talent2: value, talent3: value, etc...}
	}

	static fromRaw(data) {
		return new Attribute(data.code, data.label, data.value, data.talents.map(Talent.fromRaw));
	}

	static setAttributeByAttribute(attribute) {
		return new Attribute(
			attribute.code,
			attribute.label,
			attribute.value || 0,
			attribute.talents.map((tal) => Talent.setTalentByTalent(tal))
		);
	}

	getLabel() {
		return this.label;
	}

	getAttribute() {
		return this.attribute;
	}
	setAttribute(attribute) {
		this.attribute = attribute;
	}

	getValue() {
		return this.value;
	}
	setValue(value) {
		this.value = value;
		this.tp = value * 2;
	}

	addValue(value) {
		this.value += value;
		this.tp += value * 2;
	}
	removeValue(value) {
		this.value -= value;
		this.tp -= value * 2;
	}

	getTalents() {
		return this.talents;
	}
	setTalents(talents) {
		this.talents = talents;
	}

	static getLowestTalent(talents) {
		let lowest = { code: 'null', label: 'null', value: 100 };
		for (let talent of talents) {
			if (talent.value < lowest.value && talent.value > 0) {
				lowest = talent;
			}
		}

		return lowest;
	}

	static getAllTimeLowestTalent(attributes) {
		let lowest = { code: 'null', label: 'null', value: 100 };
		for (let attribute of attributes) {
			const currentLowest = this.getLowestTalent(attribute.talents);
			if (currentLowest.value > 0 && currentLowest.value < lowest.value) {
				lowest = currentLowest;
			}
		}
		return lowest;
	}

	static getAllTimeLowestTalents(attributes) {
		let lowest = this.getAllTimeLowestTalent(attributes);

		const lowests = [];
		// Busca los valores que son iguale de bajos que el valor de referencia
		if (lowest.code !== 'null') {
			for (let attribute of attributes) {
				for (let talent of attribute.talents) {
					if (talent.value === lowest.value) lowests.push(talent);
				}
			}
		}

		return lowests;
	}

	static getHighestTalent(talents) {
		let highest = { code: 'null', label: 'null', value: 0 };
		talents.forEach((talent) => {
			if (talent.value > highest.value && talent.value > 0) highest = talent;
		});
		return highest;
	}

	static getAllTimeHighestTalent(attributes) {
		let highest = { code: 'null', label: 'null', value: 0 };
		for (let attribute of attributes) {
			const currentHighest = this.getHighestTalent(attribute.talents);
			if (highest.value < currentHighest.value && currentHighest.value > 0) highest = currentHighest;
		}
		return highest;
	}

	static getAllTimeHighestTalents(attributes) {
		let highest = this.getAllTimeHighestTalent(attributes);

		const highests = [];
		// Busca los valores que son iguale de bajos que el valor de referencia
		if (highest.code !== 'null') {
			for (let attribute of attributes) {
				for (let talent of attribute.talents) {
					if (talent.value === highest.value) highests.push(talent);
				}
			}
		}

		return highests;
	}

	getTalentValueByIndex(index) {
		if (!this.talents[index]) return 0;
		return this.talents[index].value;
	}
	setTalentValueByCode(code, value) {
		const talent = this.talents.find((talent) => talent.code === code);
		if (!talent) return;
		talent.value = value;
	}
	addTalentValueByCode(code, value) {
		const talent = this.talents.find((talent) => talent.code === code);
		if (!talent) return;
		talent.value += value;
	}
	removeTalentValueByCode(code, value) {
		const talent = this.talents.find((talent) => talent.code === code);
		if (!talent) return;
		talent.value -= value;
	}
	getTalentValueByCode(code) {
		const talent = this.talents.find((talent) => talent.code === code);
		if (!talent) return;
		return talent;
	}

	getTalentsTotalPoints() {
		return Attribute.calculateTalentsTotalPoints(this.talents);
	}

	static calculateTalentsTotalPoints(talents) {
		if (talents.length === 0) return 0;
		return talents.reduce((previous, actually) => previous + actually.value, 0);
	}
}

export { Attribute };
