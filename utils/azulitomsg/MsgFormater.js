export default class MsgFormater {
  static setParams(msg, params) {
    if (!params || !Array.isArray(params)) return msg;
    return params.reduce((acc, param, index) => {
      return acc.replace(`$\{p${index + 1}}`, param);
    }, msg);
  }
}
