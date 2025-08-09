import SocketClient from '../config/socket'; // Asegúrate de tener esto creado y conectado

export default class SkillBridge {
	static async getSkills() {
		const token = localStorage.getItem("GWC-token");
		console.log(token);
		return await SocketClient.emitWithPromise('skill:getAll', { token });
	}

	static async createSkill(skill) {
		return await SocketClient.emitWithPromise('skill:create', { skill, token: localStorage.getItem("GWC-token") });
	}

	static async updateSkill(skill) {
		return await SocketClient.emitWithPromise('skill:update', { skill, token: localStorage.getItem("GWC-token") });
	}

	static async deleteSkill(skillId) {
		return await SocketClient.emitWithPromise('skill:delete', { skillId, token: localStorage.getItem("GWC-token") });
	}
}
