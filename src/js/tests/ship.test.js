import Ship from '../ship';

describe('Ship', () => {
  let ship;
  beforeEach(() => {
    ship = new Ship('Submarine', 3, [1, 2, 3]);
  });

  test('should create a new ship of length 3', () => {
    expect(ship).toEqual({
      name: 'Submarine',
      length: 3,
      hits: [],
      occupiedCells: [1, 2, 3],
    });
  });

  test('should not have any hits', () => {
    expect(ship.hits).toEqual([]);
  });

  test('should take a hit', () => {
    ship.hit(2);
    expect(ship.hits).toContain(2);
  });

  test('should not allow duplicate hit on same cell', () => {
    ship.hit(2);
    ship.hit(2);
    ship.hit(2);
    expect(ship.hits.length).toBe(1);
  });

  test('should not be sunk', () => {
    ship.hit(3);
    ship.hit(2);
    expect(ship.isSunk()).toBe(false);
  });

  test('should be sunk', () => {
    ship.hit(3);
    ship.hit(2);
    ship.hit(1);
    expect(ship.isSunk()).toBe(true);
  });
});
