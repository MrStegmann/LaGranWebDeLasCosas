import SocketClient from "../config/socket"; // Asegúrate de tener esto creado y conectado
import storageEnum from "../../utils/enums/storageEnum";

export default class NpcBridge {
  static async getNpcs() {
    return await SocketClient.emitWithPromise("npc:getAll", {
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async createNpc(npc) {
    return await SocketClient.emitWithPromise("npc:create", {
      npc,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async updateNpc(npc) {
    return await SocketClient.emitWithPromise("npc:update", {
      npc,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async deleteNpc(npcId) {
    return await SocketClient.emitWithPromise("npc:delete", {
      npcId,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }
}
