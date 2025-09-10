import SocketClient from "@/config/socket"; // Asegúrate de tener esto creado y conectado
import storageEnum from "@/../utils/enums/storageEnum";

export default class SpellBridge {
  static async getSpells() {
    return await SocketClient.emitWithPromise("spell:getAll", {
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async createSpell(spell) {
    return await SocketClient.emitWithPromise("spell:create", {
      spell,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async updateSpell(spell) {
    return await SocketClient.emitWithPromise("spell:update", {
      spell,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async deleteSpell(spellId) {
    return await SocketClient.emitWithPromise("spell:delete", {
      spellId,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }
}
