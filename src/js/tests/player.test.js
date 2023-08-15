import Player from '../player';

describe('Player', () => {
  let newPlayer;

  beforeEach(() => {
    newPlayer = new Player('player');
  });

  test('should be created', () => {
    expect(newPlayer).toEqual({ playerName: 'player', madeShots: [] });
  });

  test('should take shot on empty cell', () => {
    newPlayer.takeShot(2);
    expect(newPlayer.madeShots).toContain(2);
  });

  test('should not take shot on already played cell', () => {
    newPlayer.takeShot(2);
    newPlayer.takeShot(2);
    expect(newPlayer.madeShots.length).toBe(1);
  });
});
