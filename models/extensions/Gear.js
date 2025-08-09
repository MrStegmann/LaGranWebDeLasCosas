import { Item } from '../Item.js';
import races from '../../json/races.json' with { type: 'json' };
import worgenData from '../../json/worgenData.json' with { type: 'json' };

class Gear {
	constructor(armor, accessories, weapons) {
		this.head = armor?.head;
		this.shoulders = armor?.shoulders;
		this.chest = armor?.chest;
		this.hands = armor?.hands;
		this.legs = armor?.legs;
		this.feet = armor?.feet;

		this.necks = accessories?.necks;
		this.rings = accessories?.rings;
		this.trinkets = accessories?.trinkets;

		this.firstHand = weapons?.first;
		this.secondHand = weapons?.second;
	}

	static fromRaw(data) {
		return new Gear(
			{
				head: Item.fromRaw(data?.head),
				shoulders: Item.fromRaw(data?.shoulders),
				chest: Item.fromRaw(data?.chest),
				hands: Item.fromRaw(data?.hands),
				legs: Item.fromRaw(data?.legs),
				feet: Item.fromRaw(data?.feet),
			},
			{
				necks: data?.necks?.map(Item.fromRaw) ?? [],
				rings: data?.rings?.map(Item.fromRaw) ?? [],
				trinkets: data?.trinkets?.map(Item.fromRaw) ?? [],
			},

			{
				first: Item.fromRaw(data?.firstHand),
				second: Item.fromRaw(data?.secondHand),
			}
		);
	}

	setHead(head) {
		this.head = head;
	}
	setShoulders(shoulders) {
		this.shoulders = shoulders;
	}
	setChest(chest) {
		this.chest = chest;
	}
	setHands(hands) {
		this.hands = hands;
	}
	setLegs(legs) {
		this.legs = legs;
	}
	setFeet(feet) {
		this.feet = feet;
	}
	setNeck(neck) {
		this.neck = neck;
	}
	setRings(rings) {
		this.rings = rings;
	}
	setTrinkets(trinkets) {
		this.trinkets = trinkets;
	}
	setFirstHand(firstHand) {
		this.firstHand = firstHand;
	}
	setSecondHand(secondHand) {
		this.secondHand = secondHand;
	}

	getRequirements() {
		const requirements = new Map();
		const items = [this.head, this.shoulders, this.chest, this.hands, this.legs, this.feet, this.neck, this.rings, this.trinkets, this.firstHand, this.secondHand];
		for (const item of items) {
			if (item?.name) {
				const requirement = item.getRequirements();
				if (requirement) {
					for (const [key, value] of Object.entries(requirement)) {
						requirements.set(key, (requirements.get(key) || 0) + value);
					}
				}
			}
		}
		return requirements;
	}

	getCons() {
		const cons = new Map();
		const items = [this.head, this.shoulders, this.chest, this.hands, this.legs, this.feet, this.neck, this.rings, this.trinkets, this.firstHand, this.secondHand];
		for (const item of items) {
			if (item?.name) {
				const itemCons = item.getCons();
				if (itemCons) {
					for (const [key, value] of Object.entries(itemCons)) {
						cons.set(key, (cons.get(key) || 0) + value);
					}
				}
			}
		}
		return cons;
	}

	getTotalTalent(attributes, key) {
		let total = 0;
		for (const attribute of attributes) {
			const talent = attribute.getTalentValueByCode(key);
			if (talent) {
				total += talent.value;
			}
		}
		return total;
	}
	getTotalRace(race, key) {
		let total = 0;
		for (const r of races) {
			if (r.code === race) {
				const founded = r.pros[`TALENT:${key}`];
				if (founded) {
					total += founded;
				}
			}
		}
		return total;
	}
	getTotalWorgen(isHuargen, key) {
		let total = 0;
		if (isHuargen) {
			const worgenPros = worgenData.human.pros;
			const founded = worgenPros[key];
			if (founded) {
				total += founded;
			}
		}
		return total;
	}
	canWearThisGear(attributes, race, isHuargen) {
		let canWear = true;
		const requirements = this.getRequirements();
		for (const [key, value] of requirements) {
			let total = 0;

			total += this.getTotalTalent(attributes, key);
			total += this.getTotalRace(race, key);
			total += this.getTotalWorgen(isHuargen, key);

			if (total < value) canWear = false;
		}

		return canWear;
	}
}

export { Gear };
