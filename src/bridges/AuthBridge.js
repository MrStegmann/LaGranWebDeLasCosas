import SocketClient from "@/config/socket"; // Asegúrate de tener esto creado y conectado

export default class AuthBridge {
  static async login(credentials) {
    return await SocketClient.emitWithPromise("auth:login", credentials);
  }

  static async logout(token) {
    return await SocketClient.emitWithPromise("auth:logout", token);
  }

  static async autoLogin(token) {
    return await SocketClient.emitWithPromise("auth:autologin", token);
  }
}
