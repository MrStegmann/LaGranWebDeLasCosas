import levels from '../json/levels.json' with { type: 'json' };
import weapons from '../json/weapons.json' with { type: 'json' };
import { Spell } from './Spell.js';
import { Skill } from './Skill.js';

class Npc {
	// Data entered by the user
	constructor(id, name, level, category, attribute, weapon, sas) {
		this._id = id;
		this.name = name || '';
		this.level = level || 0;
		this.category = category || '';

		this.strength = attribute.strength || 0;
		this.dexterity = attribute.dexterity || 0;
		this.intelligence = attribute.intelligence || 0;
		this.willpower = attribute.willpower || 0;
		this.constitution = attribute.constitution || 0;
		this.wisdom = attribute.wisdom || 0;
		this.charisma = attribute.charisma || 0;
		this.weapon = weapon || '';
		this.spells = sas.spells;
		this.skills = sas.skills;

		this.hp = 0;
		this.ap = 0;
		this.sp = 0;
		this.pDamage = 0;
		this.sDamage = 0;
		this.pDefense = 0;
		this.sDefense = 0;

		this.setPoints();
	}

	static fromRaw(data) {
		return new Npc(
			data._id?.toString?.() ?? null,
			data.name,
			data.level,
			data.category,
			{
				strength: data.strength,
				dexterity: data.dexterity,
				intelligence: data.intelligence,
				willpower: data.willpower,
				constitution: data.constitution,
				wisdom: data.wisdom,
				charisma: data.charisma,
			},
			data.weapon,
			{
				spells: data.spells.map(Spell.fromRaw),
				skills: data.skills.map(Skill.fromRaw),
			}
		);
	}

	static stimateStats(level, category) {
		if (!category || !level) return;
		const lvl = levels[category][level] || levels['normal']['1'];

		const hp = lvl.hp;
		const ap = lvl.ap;
		const sp = lvl.sp;
		return { hp, ap, sp };
	}

	static stimateDamageDefense(attributes, weapon, category) {
		if (!category) return;
		let damage = weapons[weapon] || weapons['unarmed'];

		if (category === 'elite') damage += 2;
		if (category === 'boss') damage += 4;

		const pDefense = Math.ceil(attributes.constitution / 2);
		const sDefense = Math.ceil(attributes.willpower / 2);
		const pDamage = Math.ceil(damage + attributes.strength / 2);
		const sDamage = Math.ceil(attributes.intelligence / 2);

		return { pDefense, sDefense, pDamage, sDamage };
	}

	addHp(value) {
		this.hp += value;
	}

	setPoints() {
		if (!this.category || !this.level) return;
		const lvl = levels[this.category][this.level] || levels['normal']['1'];

		this.hp = lvl.hp;
		this.ap = lvl.ap;
		this.sp = lvl.sp;

		this.addHp(this.constitution);
		this.pDefense = Math.ceil(this.constitution / 2);
		this.sDefense = Math.ceil(this.willpower / 2);
		this.pDamage = Math.ceil(this.getWeaponDamage() + this.strength / 2);
		this.sDamage = Math.ceil(this.intelligence / 2);
	}

	getWeaponDamage() {
		if (!this.category) return;
		let damage = weapons[this.weapon] || weapons['unarmed'];

		if (this.category === 'elite') damage += 2;
		if (this.category === 'boss') damage += 4;
		return damage;
	}
}

export { Npc };
