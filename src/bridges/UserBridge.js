import SocketClient from "../config/socket"; // Asegúrate de tener esto creado y conectado
import storageEnum from "../../utils/enums/storageEnum";

export default class UserBridge {
  static async get(token) {
    return await SocketClient.emitWithPromise("user:getAll", { token });
  }

  static async create(user) {
    return await SocketClient.emitWithPromise("user:create", {
      data: user,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async update(user) {
    return await SocketClient.emitWithPromise("user:update", {
      data: user,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async delete(user) {
    return await SocketClient.emitWithPromise("user:delete", {
      data: user,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }
}
