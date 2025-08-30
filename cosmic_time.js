export class CosmicTime {
  static now() {
    return new Date().toISOString() + "::COSMIC";
  }
}
