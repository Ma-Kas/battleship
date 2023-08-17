export const SHIP_TYPES = [
  { type: 'Carrier', length: 5 },
  { type: 'Battleship', length: 4 },
  { type: 'Cruiser', length: 3 },
  { type: 'Submarine', length: 3 },
  { type: 'Destroyer', length: 2 },
];

export function arrayIsConsecutive(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] + 1) {
      return false;
    }
  }
  return true;
}

// Checks whether cells in array are vertically stacked in 10x10 grid
export function arrayIsStacked(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] + 10) {
      return false;
    }
  }
  return true;
}

export function randomProposedCells(length, gridSize) {
  const array = [];
  // 50/50 chance whether random cells are horizontal or vertical stacked
  const isHorizontal = Math.random() < 0.5;
  const startNumber = Math.floor(Math.random() * (gridSize * gridSize)) + 1;

  array.push(startNumber);
  while (array.length < length) {
    if (isHorizontal) {
      array.push(array[array.length - 1] + 1);
    } else {
      array.push(array[array.length - 1] + 10);
    }
  }
  return array;
}
