import Ship from './ship';

const GRID = 10;

class Gameboard {
  constructor(player) {
    this.owner = player;
    this.board = [];
    this.ships = [];
    this.missedShots = [];
  }

  initialize() {
    this.board = Array.from({ length: GRID * GRID }, (x, i) => i + 1);
  }

  placeShip(shipType, cells) {
    const newShip = new Ship(shipType, cells);
    this.ships.push(newShip);
  }

  receiveAttack(attackedCell) {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].occupiedCells.includes(attackedCell)) {
        const hitShip = this.ships[i];
        // Handle hit detection in ship class
        hitShip.hit(attackedCell);
        // If hit sunk ship, remove it from ships array
        if (hitShip.isSunk()) {
          this.ships.splice(this.ships.indexOf(hitShip), 1);
        }
        return true;
      }
    }
    // If no hit, append missedShots array
    this.missedShots.push(attackedCell);
    return false;
  }

  allShipsDestroyed() {
    return this.ships.length === 0;
  }

  reset() {
    this.board = [];
    this.ships = [];
    this.missedShots = [];
  }
}

export default Gameboard;
