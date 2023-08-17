class Ship {
  constructor(name, length, occupiedCells) {
    this.name = name;
    this.length = length;
    this.occupiedCells = occupiedCells;
    this.hits = [];
  }

  occupyCells(cells) {
    this.occupiedCells = cells;
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
