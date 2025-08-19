import SocketClient from "../config/socket"; // Asegúrate de tener esto creado y conectado
import storageEnum from "../../utils/enums/storageEnum";

export default class CodexBridge {
  static async getaLL() {
    return await SocketClient.emitWithPromise("codex:getAll", {
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async create(fragment) {
    return await SocketClient.emitWithPromise("codex:create", {
      fragment,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async update(fragment) {
    return await SocketClient.emitWithPromise("codex:update", {
      fragment,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async delete(fragmentId) {
    return await SocketClient.emitWithPromise("codex:delete", {
      fragmentId,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }
}
