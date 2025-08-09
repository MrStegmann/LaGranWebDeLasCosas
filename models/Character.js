import { Spell } from './Spell.js';
import { Skill } from './Skill.js';
import { Attribute } from './extensions/Attribute.js';
import { Perk } from './Perk.js';
import { Item } from './Item.js';
import { Gear } from './extensions/Gear.js';

import { AlteredState } from './extensions/AlteredState.js';
import { Specials } from './extensions/Specials.js';
import { Advantage } from './extensions/Advantage.js';
import { Disadvantage } from './extensions/Disadvantage.js';
import { Logistic } from './extensions/Logistic.js';
import { BasicStat } from './extensions/BasicStat.js';

class Character {
	constructor(id, basicInf, attributes, perks, inventory, sas) {
		this._id = id; // String
		this.name = basicInf.name; // String
		this.lore = basicInf.lore; // String
		this.level = basicInf.level; // Number: 1-10
		this.category = basicInf.category; // String: Noob, Normal, Elite, Boss
		this.race = basicInf.race; // String
		this.isHuargen = basicInf.isHuargen; // Boolean
		this.isInHumanForm = true;

		// Datos que se pueden separar en distintas secciones para el formulario

		this.attributes = attributes; // Array de clases Attribute
		this.perks = perks; // Array de clases Perks
		this.inventory = inventory.inventory; // Array de clases Item
		this.gear = inventory.gear; // clase Gear
		this.spells = sas.spells; // Array de clase Spell
		this.skills = sas.skills; // Array de clase Skill

		// Valores deducidos automáticamente
		this.basicStat = new BasicStat();

		// mecanicas del sistema
		this.logistic = new Logistic();
		// Ventajas
		this.advantage = new Advantage();
		// Desventajas
		this.disadvantage = new Disadvantage();

		// Estados alterados. También contiene información sobre si puede sufrirlas o no.
		this.alteredState = new AlteredState();

		// Caracteristicas especiales
		this.specials = new Specials();

		this.experience = 0;
		this.maxExperience = 100;

		this.basicStat.setPoints(basicInf.category, basicInf.level, attributes);
		this.specials.setSpecials(basicInf.race);
	}

	static fromRaw(data) {
		const character = new Character(
			data._id?.toString?.() ?? null,
			{
				name: data.name,
				lore: data.lore,
				level: data.level,
				category: data.category,
				race: data.race,
				isHuargen: data.isHuargen,
			},
			data.attributes.map(Attribute.fromRaw),
			data.perks.map(Perk.fromRaw),
			{
				gear: Gear.fromRaw(data.gear),
				inventory: data.inventory.map(Item.fromRaw),
			},
			{
				spells: data.spells.map(Spell.fromRaw),
				skills: data.skills.map(Skill.fromRaw),
			}
		);
		return character;
	}

	setLevel(level) {
		this.level = level;
	}
	setCategory(category) {
		this.category = category;
	}

	setRace(race) {
		this.race = race;
	}
	setHuargen(isHuargen) {
		this.isHuargen = isHuargen;
	}
	setIsInHumanForm(value) {
		this.isInHumanForm = value;
	}

	getPerks() {
		return this.perks;
	}
	setPerks(perks) {
		this.perks = perks;
	}

	setAttributes(attributes) {
		this.attributes = attributes;
		this.basicStat.setPoints(this.category, this.level, attributes);
	}

	getAttribute(code) {
		if (this.attributes.length === 0) return null;
		return this.attributes.find((attr) => attr.code === code);
	}

	getInventory() {
		return this.inventory;
	}
	setInventory(inventory) {
		this.inventory = inventory;
	}

	setGear(gear) {
		this.gear = gear;
	}
	getGear() {
		return this.gear;
	}

	setSpells(spells) {
		this.spells = spells;
	}
	getSpells() {
		return this.spells;
	}

	setSkills(skill) {
		this.skills = skill;
	}
	getSkills() {
		return this.skills;
	}

	static getAttributeTotalPoints(attributes) {
		if (attributes.length === 0) return 0;
		return attributes.reduce((previous, actually) => previous + actually.value, 0);
	}

	getTotalImprovedTalents() {
		return this.attributes.reduce((previous, actually) => previous + actually.getNumberOfImprovedTalents(), 0);
	}

	static applyProsToAttributes(pros, attributes) {
		// pros es una Map(), attributes es un array de clases Attribute. Debe devolver el array Attributes con los cambios realizados
		pros.forEach((value, key) => {
			const attribute = attributes.find((attr) => attr.getTalentValueByCode(key) !== undefined);
			if (attribute) attribute.addTalentValueByCode(key, value);
		});
		return attributes;
	}
	static applyConsToAttributes(cons, attributes) {
		// pros es una Map(), attributes es un array de clases Attribute. Debe devolver el array Attributes con los cambios realizados
		cons.forEach((value, key) => {
			const attribute = attributes.find((attr) => attr.getTalentValueByCode(key) !== undefined);
			if (attribute) attribute.removeTalentValueByCode(key, value);
		});
		return attributes;
	}

	changeForm() {
		if (!this.isHuargen) return;
		if (this.isInHumanForm) {
			//Quitar valores de forma huargen
			this.getAttribute('strength').removeTalentValueByCode('athletics', 2);
			this.getAttribute('strength').removeTalentValueByCode('brutality', 2);
			this.getAttribute('willpower').removeTalentValueByCode('magicResistance', 2);
			this.getAttribute('constitution').removeTalentValueByCode('resilience', 2);
			this.getAttribute('wisdom').removeTalentValueByCode('perception', 2);

			this.getAttribute('willpower').addTalentValueByCode('clResistance', 5);
			this.getAttribute('dexterity').addTalentValueByCode('stealth', 3);
			this.getAttribute('dexterity').addTalentValueByCode('sleightHand', 2);

			//Agregar valores de forma humana
			this.getAttribute('strength').addTalentValueByCode('athletics', 1);
			this.getAttribute('strength').addTalentValueByCode('brutality', 1);
			this.getAttribute('willpower').addTalentValueByCode('magicResistance', 1);
			this.getAttribute('constitution').addTalentValueByCode('resilience', 1);
			this.getAttribute('wisdom').addTalentValueByCode('perception', 1);

			this.getAttribute('willpower').removeTalentValueByCode('clResistance', 2);
			this.getAttribute('dexterity').removeTalentValueByCode('stealth', 2);
			this.getAttribute('dexterity').removeTalentValueByCode('sleightHand', 1);
		} else {
			// Quitar valores de forma humana
			this.getAttribute('strength').removeTalentValueByCode('athletics', 1);
			this.getAttribute('strength').removeTalentValueByCode('brutality', 1);
			this.getAttribute('willpower').removeTalentValueByCode('magicResistance', 1);
			this.getAttribute('constitution').removeTalentValueByCode('resilience', 1);
			this.getAttribute('wisdom').removeTalentValueByCode('perception', 1);

			this.getAttribute('willpower').addTalentValueByCode('clResistance', 2);
			this.getAttribute('dexterity').addTalentValueByCode('stealth', 2);
			this.getAttribute('dexterity').addTalentValueByCode('sleightHand', 1);

			// Añadir valores de forma huargen
			this.getAttribute('strength').addTalentValueByCode('athletics', 2);
			this.getAttribute('strength').addTalentValueByCode('brutality', 2);
			this.getAttribute('willpower').addTalentValueByCode('magicResistance', 2);
			this.getAttribute('constitution').addTalentValueByCode('resilience', 2);
			this.getAttribute('wisdom').addTalentValueByCode('perception', 2);

			this.getAttribute('willpower').removeTalentValueByCode('clResistance', 5);
			this.getAttribute('dexterity').removeTalentValueByCode('stealth', 3);
			this.getAttribute('dexterity').removeTalentValueByCode('sleightHand', 2);
		}
	}
}

export { Character };

// Hacer del talento de profesión e idiomas un desplegable que permita poner puntos, y así evitar un desvordamiento de talentos en sabiduría
// Un idioma debe ser elegible como nativa, y una segunda que pudiera dominar. Podría estar en una opción aparte y no en talentos, aunque se añada después.
