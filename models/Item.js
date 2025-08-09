import IdGenerator from '../utils/IdGenerator.js';

class Item {
	constructor(id, generalInfo, specificInfo) {
		this._id = id;
		this.name = generalInfo.name;
		this.description = generalInfo.description;
		this.code = generalInfo.code;
		this.quality = generalInfo.quality;
		this.wearable = generalInfo.wearable; // Necesario para ocupar un slot de equipamiento. Solo para armadura y armas, abalorios, collares y joyas
		this.usable = generalInfo.usable; // Solo para pociones y comidas
		this.price = generalInfo.price; // String: '100c', '25s', '1g' La cantidad en números sin límite máximo y la letra indica si es Cobre, Plata u Oro
		this.max = generalInfo.max; // Cantidad máxima de items en inventario
		this.quantity = generalInfo.quantity; // Cantidad de items en inventario
		this.inventoryId = generalInfo.inventoryId;

		this.type = specificInfo.type;
		this.talent = specificInfo.talent;
		this.damage = specificInfo.damage;
		this.slot = specificInfo.slot; // "firstHand": Weapon, "secondHand": Weapon | Shield
		this.pDefense = specificInfo.pDefense;
		this.sDefense = specificInfo.sDefense;
		this.durability = specificInfo.durability;
		this.reinforcement = specificInfo.reinforcement; // String
		this.requirements = specificInfo.requirements;
		this.cons = specificInfo.cons;
		this.material = specificInfo.material;
	}

	static fromRaw(data) {
		if (data === null || data === undefined) return {};
		return new Item(
			data._id?.toString?.() ?? null,
			{
				name: data.name,
				description: data.description,
				code: data.code,
				quality: data.quality,
				wearable: data.wearable,
				usable: data.usable,
				price: data.price,
				max: data.max,
				quantity: data.quantity,
				inventoryId: data.inventoryId,
			},
			{
				type: data.type,
				talent: data.talent,
				damage: data.damage,
				slot: data.slot,
				pDefense: data.pDefense,
				sDefense: data.sDefense,
				durability: data.durability,
				reinforcement: data.reinforcement,
				requirements: data.requirements,
				cons: data.cons,
				material: data.material,
			}
		);
	}

	setItemByItem(item) {
		this._id = item._id;
		this.name = item.name;
		this.description = item.description;
		this.code = item.code;
		this.quality = item.quality;
		this.wearable = item.wearable;
		this.usable = item.usable;
		this.price = item.price;
		this.quantity = item.quantity;
		this.max = item.max;
		this.quality = item.quality;
		this.inventoryId = item.inventoryId || IdGenerator.generate();
		this.type = item.type;
		this.talent = item.talent;
		this.damage = item.damage;
		this.slot = item.slot;
		this.pDefense = item.pDefense;
		this.sDefense = item.sDefense;
		this.durability = item.durability;
		this.reinforcement = item.reinforcement;
		this.requirements = item.requirements;
		this.cons = item.cons;
		this.material = item.material;
	}

	setQuantity(value) {
		if (value > this.max) this.quantity = this.max;
		else this.quantity = value;
	}
	setMaxQuantity() {
		this.quantity = this.max;
	}
	addQuantity(value) {
		if (this.quantity + value > this.max) this.quantity = this.max;
		else this.quantity += value;
	}

	generateNewTempId() {
		this.inventoryId = IdGenerator.generate();
	}

	getRequirements() {
		if (this.requirements) {
			return this.requirements;
		}
	}
	getCons() {
		if (this.cons) {
			return this.cons;
		}
	}
}

export { Item };
