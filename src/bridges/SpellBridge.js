import SocketClient from '../config/socket'; // Asegúrate de tener esto creado y conectado

export default class SpellBridge {
	static async getSpells() {
		return await SocketClient.emitWithPromise('spell:getAll', { token: localStorage.getItem("GWC-token") });
	}

	static async createSpell(spell) {
		return await SocketClient.emitWithPromise('spell:create', { spell, token: localStorage.getItem("GWC-token") });
	}

	static async updateSpell(spell) {
		return await SocketClient.emitWithPromise('spell:update', { spell, token: localStorage.getItem("GWC-token") });
	}

	static async deleteSpell(spellId) {
		return await SocketClient.emitWithPromise('spell:delete', { spellId, token: localStorage.getItem("GWC-token") });
	}
}
