class Perk {
	constructor(id, type, name, description, level, levels) {
		this.id = typeof id === 'number' ? id : parseInt(id);
		this.type = type;
		this.name = name;
		this.description = description;
		this.level = level || 1;
		this.levelOne = levels.levelOne;
		this.levelTwo = levels.levelTwo;
		this.levelThree = levels.levelThree;
	}

	static fromRaw(data) {
		return new Perk(data.id?.toString?.() ?? null, data.type, data.name, data.description, data.level, { levelOne: data.levelOne, levelTwo: data.levelTwo, levelThree: data.levelThree });
	}

	getType() {
		return this.type;
	}
	setType(type) {
		this.type = type;
	}
}

export { Perk };
