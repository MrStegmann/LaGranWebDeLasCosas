import SocketClient from '../config/socket'; // Asegúrate de tener esto creado y conectado

export default class CharacterBridge {
	static async getCharacters() {
		return await SocketClient.emitWithPromise('character:getAll', { token: localStorage.getItem("GWC-token") });
	}

	static async createCharacter(character) {
		return await SocketClient.emitWithPromise('character:create', { character, token: localStorage.getItem("GWC-token") });
	}

	static async updateCharacter(character) {
		return await SocketClient.emitWithPromise('character:update', { character, token: localStorage.getItem("GWC-token") });
	}

	static async deleteCharacter(characterId) {
		return await SocketClient.emitWithPromise('character:delete', { characterId, token: localStorage.getItem("GWC-token") });
	}
}
