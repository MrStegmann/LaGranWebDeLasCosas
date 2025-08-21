export default class Aritmetic {
  static RandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
