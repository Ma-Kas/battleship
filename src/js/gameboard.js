import Ship from './ship';
import {
  SHIP_TYPES,
  arrayIsConsecutive,
  arrayIsStacked,
  randomProposedCells,
} from './helpers';

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

  placeShip(shipType, length, occupiedCells) {
    if (!this.isValidShipPlacement(length, occupiedCells)) {
      return false;
    }
    const newShip = new Ship(shipType, length, occupiedCells);
    this.ships.push(newShip);
    return true;
  }

  placeShipsRandomly() {
    SHIP_TYPES.forEach((shipType) => {
      let placed = false;
      while (!placed) {
        const proposedCells = randomProposedCells(shipType.length, GRID);
        if (this.placeShip(shipType.type, shipType.length, proposedCells)) {
          placed = true;
        }
      }
    });
  }

  isValidShipPlacement(length, proposedCells) {
    // Invalid if amount of proposed cells doesn't match ship type
    if (proposedCells.length !== length) return false;

    // Invalid if any proposed cells are outside board
    if (!proposedCells.every((cell) => cell >= 1 && cell <= GRID * GRID))
      return false;

    proposedCells.sort();

    // Invalid if cells are not perfectly consecutive (+1 to each) (for horizontal)
    // AND if not below each other (+10 to each) (for vertical)
    let isHorizontal = true;
    if (arrayIsConsecutive(proposedCells)) {
      isHorizontal = true;
    } else if (arrayIsStacked(proposedCells)) {
      isHorizontal = false;
    } else {
      return false;
    }

    // ONLY FOR HORIZONTAL PLACEMENT
    // Invalid if ship "wraps" from one row to next
    // Get row of first number, then check for each other one if it is same
    if (isHorizontal) {
      const row = Math.floor((proposedCells[0] - 1) / 10) + 1;
      for (let i = 1; i < proposedCells.length; i++) {
        if (Math.floor((proposedCells[i] - 1) / 10) + 1 !== row) return false;
      }
    }

    // Invalid if any ship in this.ships already occupies any of the proposed cells
    for (let i = 0; i < proposedCells.length; i++) {
      for (let j = 0; j < this.ships.length; j++) {
        if (this.ships[j].occupiedCells.includes(proposedCells[i])) {
          return false;
        }
      }
    }

    return true;
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
