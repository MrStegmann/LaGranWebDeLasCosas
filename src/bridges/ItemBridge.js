import SocketClient from '../config/socket'; // Asegúrate de tener esto creado y conectado

export default class ItemBridge {
	static async getItems() {
		return await SocketClient.emitWithPromise('item:getAll', { token: localStorage.getItem("GWC-token") });
	}

	static async createItem(item) {
		return await SocketClient.emitWithPromise('item:create', { item, token: localStorage.getItem("GWC-token") });
	}

	static async updateItem(item) {
		return await SocketClient.emitWithPromise('item:update', { item, token: localStorage.getItem("GWC-token") });
	}

	static async deleteItem(itemId) {
		return await SocketClient.emitWithPromise('item:delete', { itemId, token: localStorage.getItem("GWC-token") });
	}
}
