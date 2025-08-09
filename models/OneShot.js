class Stage {
	constructor(name, description, target, cluesHooks = []) {
		this.name = name;
		this.description = description;
		this.target = target;
		this.cluesHooks = cluesHooks;
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
	getTarget() {
		return this.target;
	}
	setTarget(target) {
		this.target = target;
	}
	getCluesHooks() {
		return this.cluesHooks;
	}
	setCluesHooks(cluesHooks) {
		this.cluesHooks = cluesHooks;
	}

	getDescriptionLength() {
		return this.description.length;
	}

	validateDescriptionLength() {
		return this.getDescriptionLength() <= 560;
	}
}

class OneShot {
	constructor(title, flags, intro, knot, conclusion) {
		this.title = title;
		this.flags = flags;
		this.intro = intro; // clase Stage
		this.knot = knot; // clase Stage
		this.conclusion = conclusion; // clase Stage
	}

	static fromRaw(data) {
		return new OneShot(
			data.title,
			data.flags,
			Stage(data.intro.name, data.intro.description, data.intro.target, data.intro.cluesHooks),
			Stage(data.knot.name, data.knot.description, data.knot.target, data.knot.cluesHooks),
			Stage(data.conclusion.name, data.conclusion.description, data.conclusion.target, data.conclusion.cluesHooks)
		);
	}

	getTitle() {
		return this.title;
	}
	setTitle(title) {
		this.title = title;
	}

	getFlags() {
		return this.flags;
	}
	setFlags(flags) {
		this.flags = flags;
	}
	getIntro() {
		return this.intro;
	}
	setIntro(intro) {
		this.intro = intro;
	}
	getKnot() {
		return this.knot;
	}
	setKnot(knot) {
		this.knot = knot;
	}
	getConclusion() {
		return this.conclusion;
	}
	setConclusion(conclusion) {
		this.conclusion = conclusion;
	}

	validateDescriptionLength(stage) {
		if (!stage) return false;
		if (typeof stage !== 'string' || stage !== 'intro' || stage !== 'knot' || stage !== 'conclusion') return false;
		return this[stage].validateDescriptionLength();
	}
}

export { OneShot, Stage };
