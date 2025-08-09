class Spell {
	constructor(id, category, attribute, talent, name, description, config) {
		this._id = id;
		this.category = category;
		this.attribute = attribute;
		this.talent = talent;
		this.name = name;
		this.description = description;
		this.cost = config.cost;
		this.power = config.power;
		this.actions = config.actions;
		this.turns = config.turns;
		this.level = config.level;
	}

	static fromRaw(data) {
		return new Spell(data._id?.toString?.() ?? null, data.category, data.attribute, data.talent, data.name, data.description, {
			cost: data.cost,
			power: data.power,
			actions: data.actions,
			turns: data.turns,
			level: data.level,
		});
	}

	// Getter and Setter methods
	getCategory() {
		return this.category;
	}

	setCategory(category) {
		this.category = category;
	}

	getAttribute() {
		return this.attribute;
	}

	setAttribute(attribute) {
		this.attribute = attribute;
	}

	getTalent() {
		return this.talent;
	}

	setTalent(talent) {
		this.talent = talent;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
	}

	getDescription() {
		return this.description;
	}

	setDescription(description) {
		this.description = description;
	}

	getPower() {
		return this.power;
	}

	setPower(power) {
		this.power = power;
	}

	getActions() {
		return this.actions;
	}

	setActions(actions) {
		this.actions = actions;
	}

	getTurns() {
		return this.turns;
	}

	setTurns(turns) {
		this.turns = turns;
	}

	getLevel() {
		return this.level;
	}

	setLevel(level) {
		this.level = level;
	}

	static getDataByCategory(category) {
		//	Coste, Poder, Acciones, Turnos
		const data = { cost: 0, power: 1, actions: 1, turns: 0 }; // Valor por defecto para Trucos (trick)
		if (category === 'fast') {
			data.cost = 2;
			data.power = 3;
			data.actions = 1;
			data.turns = 2;
		}
		if (category === 'basic') {
			data.cost = 3;
			data.power = 4;
			data.actions = 2;
			data.turns = 3;
		}
		if (category === 'powerful') {
			data.cost = 4;
			data.power = 5;
			data.actions = 3;
			data.turns = 4;
		}
		return data;
	}
}

export { Spell };
