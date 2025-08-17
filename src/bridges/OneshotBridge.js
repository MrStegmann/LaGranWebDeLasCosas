import SocketClient from "../config/socket"; // Asegúrate de tener esto creado y conectado
import storageEnum from "../../utils/enums/storageEnum";

export default class OneshotBridge {
  static async get() {
    return await SocketClient.emitWithPromise("oneshot:getAll", {
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async create(oneshot) {
    return await SocketClient.emitWithPromise("oneshot:create", {
      oneshot,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async update(oneshot) {
    return await SocketClient.emitWithPromise("oneshot:update", {
      oneshot,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async delete(oneshotId) {
    return await SocketClient.emitWithPromise("oneshot:delete", {
      oneshotId,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }
}
