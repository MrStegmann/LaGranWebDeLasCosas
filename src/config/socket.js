import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', {
	autoConnect: true,
});

export default class SocketClient {
	static emit(event, data, callback) {
		if (!socket) {
			throw new Error('Socket no inicializado');
		}
		if (!event) {
			throw new Error('Evento no especificado');
		}
		if (data) {
			socket.emit(event, data, callback);
		} else {
			socket.emit(event, callback);
		}
	}

	static emitWithPromise(event, data) {
		return new Promise((resolve, reject) => {
			this.emit(event, data, (response) => {
				if (!response?.success) {
					reject(new Error(response.error || 'Error desconocido'));
				} else {
					resolve(response);
				}
			});
		});
	}
}
