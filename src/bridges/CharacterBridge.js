import SocketClient from "../config/socket"; // Asegúrate de tener esto creado y conectado
import storageEnum from "../../utils/enums/storageEnum";

export default class CharacterBridge {
  static async getCharacters() {
    return await SocketClient.emitWithPromise("character:getAll", {
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async createCharacter(character) {
    return await SocketClient.emitWithPromise("character:create", {
      character,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async updateCharacter(character) {
    return await SocketClient.emitWithPromise("character:update", {
      character,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async deleteCharacter(characterId) {
    return await SocketClient.emitWithPromise("character:delete", {
      characterId,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async getPlayerLevels() {
    return await SocketClient.emitWithPromise("character:getLevels", {
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async getRaces() {
    return await SocketClient.emitWithPromise("character:getRaces", {
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async getAttributes() {
    return await SocketClient.emitWithPromise("character:getAttributes", {
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }
}
