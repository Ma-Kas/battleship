class Ship {
  constructor(name, occupiedCells) {
    this.name = name;
    this.length = occupiedCells.length;
    this.occupiedCells = occupiedCells;
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
