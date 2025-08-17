import SocketClient from "../config/socket"; // Asegúrate de tener esto creado y conectado
import storageEnum from "../../utils/enums/storageEnum";

export default class SkillBridge {
  static async getSkills() {
    const token = localStorage.getItem(storageEnum.GWC_TOKEN);
    console.log(token);
    return await SocketClient.emitWithPromise("skill:getAll", { token });
  }

  static async createSkill(skill) {
    return await SocketClient.emitWithPromise("skill:create", {
      skill,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async updateSkill(skill) {
    return await SocketClient.emitWithPromise("skill:update", {
      skill,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async deleteSkill(skillId) {
    return await SocketClient.emitWithPromise("skill:delete", {
      skillId,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }
}
