class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.occupiedCells = [];
    this.hits = [];
  }

  occupyCells() {
    this.occupyCells.push();
  }

  hit(cell) {
    if (this.hits.includes(cell)) return;
    this.hits.push(cell);
  }

  isSunk() {
    return this.hits.length === this.length;
  }
}

export default Ship;
