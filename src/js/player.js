class Player {
  constructor(playerName) {
    this.playerName = playerName;
    this.madeShots = [];
  }

  takeShot(cell) {
    if (this.madeShots.includes(cell)) return false;
    this.madeShots.push(cell);
    return true;
  }

  reset() {
    this.madeShots = [];
  }
}

export default Player;
