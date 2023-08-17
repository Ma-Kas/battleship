import Gameboard from '../gameboard';

describe('Gameboard', () => {
  let newGameboard;
  beforeEach(() => {
    newGameboard = new Gameboard('player');
  });

  test('should be created', () => {
    expect(newGameboard).toEqual({
      board: [],
      missedShots: [],
      owner: 'player',
      ships: [],
    });
  });

  test('should be initialized with 100 cells', () => {
    newGameboard.initialize();
    expect(newGameboard.board.length).toBe(100);
  });

  test('should allow valid ship placement', () => {
    newGameboard.initialize();
    expect(newGameboard.isValidShipPlacement(5, [10, 20, 30, 40, 50])).toBe(
      true,
    );
  });

  test('should disallow valid ship placement', () => {
    newGameboard.initialize();
    expect(newGameboard.isValidShipPlacement(4, [1, 2, 5])).toBe(false);
  });

  test('should add a battleship to ships array, when placed', () => {
    newGameboard.initialize();
    newGameboard.placeShip('Battleship', 5, [10, 20, 30, 40, 50]);
    expect(newGameboard.ships).toContainEqual({
      hits: [],
      length: 5,
      occupiedCells: [10, 20, 30, 40, 50],
      name: 'Battleship',
    });
  });

  test('should report all ships destroyed', () => {
    newGameboard.initialize();
    expect(newGameboard.allShipsDestroyed()).toBe(true);
  });
});
