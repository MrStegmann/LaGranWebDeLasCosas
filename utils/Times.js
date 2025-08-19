export default class Times {
  constructor() {
    this.now = new Date();
    this.hour = this.now.getHours();
  }
  isMorning() {
    return this.hour >= 6 && this.hour < 12;
  }
  isNoon() {
    return this.hour >= 12 && this.hour < 18;
  }
  isEvening() {
    return this.hour >= 18 && this.hour < 24;
  }
  isNight() {
    return this.hour >= 0 && this.hour < 6;
  }
}
