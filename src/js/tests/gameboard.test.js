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

  test('should add a battleship to ships array, when placed', () => {
    newGameboard.initialize();
    newGameboard.placeShip('Battleship', 4);
    expect(newGameboard.ships).toContainEqual({
      hits: [],
      length: 4,
      occupiedCells: [],
      name: 'Battleship',
    });
  });

  test('should report all ships destroyed', () => {
    newGameboard.initialize();
    expect(newGameboard.allShipsDestroyed()).toBe(true);
  });
});
