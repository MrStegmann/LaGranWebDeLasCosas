import SocketClient from "@/config/socket"; // Asegúrate de tener esto creado y conectado
import storageEnum from "@/../utils/enums/storageEnum";

export default class CodexBridge {
  static async getaLL() {
    return await SocketClient.emitWithPromise("codex:getAll", {
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async getCategories() {
    return await SocketClient.emitWithPromise("codex:get_categories", {
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async createCategory(name) {
    return await SocketClient.emitWithPromise("codex:create_category", {
      data: { name },
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async updateCategory(category) {
    return await SocketClient.emitWithPromise("codex:update_category", {
      data: category,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async deleteCategory(categoryId) {
    return await SocketClient.emitWithPromise("codex:delete_category", {
      data: categoryId,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async getFragments() {
    return await SocketClient.emitWithPromise("codex:get_fragments", {
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }

  static async createFragment(fragment) {
    return await SocketClient.emitWithPromise("codex:create_fragment", {
      data: fragment,
      token: localStorage.getItem(storageEnum.GWC_TOKEN),
    });
  }
}
