import levels from '../../json/levels.json' with { type: 'json' };

class BasicStat {
	constructor() {
		this.hp = 15; // Puntos de vida
		this.damageGetted = 0; // Puntos de daño recibido. Se utiliza para calcular la vida restante. Cuando se reciben curas, se resta al daño recibido.
		this.mp = 10; // Puntos de maná
		this.mpSpented = 0; // Los puntos de maná gastados. Se utiliza para calcular el maná restante. Cuando se recupera maná, se reduce al maná gastado.
		this.spiritPoint = 10; // Puntos de espíritu
		this.spiritPointSpented = 0; // Los puntos de espíritu gastados. Se utiliza para calcular el espíritu restante. Cuando se recupera  se reduce al gastado.
		this.ap = 0; // Puntos de atributo
		this.sp = 2; // Puntos de hechizo/habilidad
	}

	setPoints(category, level, attributes) {
		if (!category || !level) return;
		const lvl = levels[category][level] || levels['noob']['1'];

		this.hp = lvl.hp;
		this.ap = lvl.ap;
		this.sp = lvl.sp;

		const CON = attributes.find((attr) => attr.code === 'constitution');
		const INT = attributes.find((at) => at.code === 'intelligence');
		const VOL = attributes.find((at) => at.code === 'willpower');

		if (CON) {
			const extraHealth = CON.getTalentValueByCode('health');
			if (extraHealth) {
				this.hp += extraHealth.value;
			}
		}
		if (INT) {
			this.mp += INT.value;
		}
		if (VOL) {
			this.spiritPoint += VOL.value;
		}
	}

	static stimateStats(level, category) {
		if (!category || !level) return;
		const lvl = levels[category][level] || levels['noob']['1'];

		const hp = lvl.hp;
		const ap = lvl.ap;
		const sp = lvl.sp;
		return { hp, ap, sp };
	}

	static stimateMP(attributes) {
		if (attributes.length === 0) return 10;
		const INT = attributes.find((at) => at.code === 'intelligence');
		let mp = 10;
		if (INT) {
			mp += INT.value;
		}
		return mp;
	}

	static stimateSpiritP(attributes) {
		if (attributes.length === 0) return 10;
		const VOL = attributes.find((at) => at.code === 'willpower');
		let spiritP = 10;
		if (VOL) {
			spiritP += VOL.value;
		}
		return spiritP;
	}
}

export { BasicStat };
