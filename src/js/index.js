import Player from './player';
import Gameboard from './gameboard';
import Ship from './ship';
import '../css/style.css';

// Ships: Carrier(5), Battleship(4), Cruiser(3), Submarine(3), Destroyer(2)

/// ////////////
// MODULES
const mainGameLoop = (() => {
  // Create Players
  const player1 = new Player('player');
  const opponent = new Player('opponent');
  // Create Opponents
  const gameboardPlayer = new Gameboard(player1);
  const gameboardOpponent = new Gameboard(opponent);

  const currentTurn = player1;

  function prepareGame() {
    gameboardPlayer.initialize();
    gameboardOpponent.initialize();
    DOMController.createBoardGrid(gameboardPlayer);
    DOMController.createBoardGrid(gameboardOpponent);
  }

  function testPlaceShips() {
    gameboardPlayer.placeShip('Carrier', [10, 20, 30, 40, 50]);
    gameboardPlayer.placeShip('Battleship', [11, 12, 13, 14]);
    gameboardPlayer.placeShip('Cruiser', [84, 85, 86]);
    gameboardPlayer.placeShip('Submarine', [33, 34, 35]);
    gameboardPlayer.placeShip('Destroyer', [88, 98]);

    gameboardOpponent.placeShip('Carrier', [1, 2, 3, 4, 5]);
    gameboardOpponent.placeShip('Battleship', [11, 12, 13, 14]);
    gameboardOpponent.placeShip('Cruiser', [21, 22, 23]);
    gameboardOpponent.placeShip('Submarine', [63, 64, 65]);
    gameboardOpponent.placeShip('Destroyer', [41, 42]);
  }

  return {
    player1,
    opponent,
    currentTurn,
    gameboardPlayer,
    gameboardOpponent,
    prepareGame,
    testPlaceShips,
  };
})();

const DOMController = (() => {
  const playerField = document.getElementById('player-field');
  const opponentField = document.getElementById('opponent-field');
  const playerBoard = playerField.querySelector('.board');
  const opponentBoard = opponentField.querySelector('.board');

  // Create an empty grid on correct side for passed in gameboard
  function createBoardGrid(board) {
    const parent =
      board.owner.playerName === 'player' ? playerBoard : opponentBoard;
    console.log(parent);

    board.board.forEach((cellNum) => {
      const newCell = document.createElement('div');
      newCell.classList.add('cell');
      newCell.dataset.coord = cellNum;
      parent.appendChild(newCell);
    });
  }

  // Takes ref to which board and which ship
  function renderShip(board, ship) {
    const parent =
      board.owner.playerName === 'player' ? playerBoard : opponentBoard;

    ship.occupiedCells.forEach((occupiedCell) => {
      const domCell = parent.querySelector(`[data-coord="${occupiedCell}"]`);
      domCell.classList.add('ship');
    });
  }

  return {
    createBoardGrid,
    renderShip,
  };
})();

/// ////////////
// GAME LOGIC
mainGameLoop.prepareGame();
mainGameLoop.testPlaceShips();
mainGameLoop.gameboardPlayer.ships.forEach((ship) => {
  DOMController.renderShip(mainGameLoop.gameboardPlayer, ship);
});

mainGameLoop.gameboardOpponent.ships.forEach((ship) => {
  DOMController.renderShip(mainGameLoop.gameboardOpponent, ship);
});

if (mainGameLoop.player1.takeShot(4)) {
  mainGameLoop.gameboardPlayer.receiveAttack(4);
}
