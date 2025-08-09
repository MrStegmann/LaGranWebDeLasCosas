import SocketClient from '../config/socket'; // Asegúrate de tener esto creado y conectado

export default class OneshotBridge {
	static async get() {
		return await SocketClient.emitWithPromise('oneshot:getAll', { token: localStorage.getItem("GWC-token") });
	}

	static async create(oneshot) {
		return await SocketClient.emitWithPromise('oneshot:create', { oneshot, token: localStorage.getItem("GWC-token") });
	}

	static async update(oneshot) {
		return await SocketClient.emitWithPromise('oneshot:update', { oneshot, token: localStorage.getItem("GWC-token") });
	}

	static async delete(oneshotId) {
		return await SocketClient.emitWithPromise('oneshot:delete', { oneshotId, token: localStorage.getItem("GWC-token") });
	}
}
