class Skill {
	constructor(id, name, description, type, actions, turns) {
		this._id = id;
		this.name = name;
		this.description = description;
		this.type = type;
		this.actions = actions;
		this.turns = turns;
	}

	static fromRaw(data) {
		return new Skill(data._id?.toString?.() ?? null, data.name, data.description, data.type, data.actions, data.turns);
	}
	// Getter and Setter methods
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

	getType() {
		return this.type;
	}

	setType(type) {
		this.type = type;
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
}

export { Skill };
