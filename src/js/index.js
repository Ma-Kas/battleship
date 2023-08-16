import Player from './player';
import Gameboard from './gameboard';
import '../css/style.css';

/// ////////////
// MODULES
const mainGameLoop = (() => {
  // Create Players
  const player1 = new Player('player');
  const opponent = new Player('opponent');
  // Create Opponents
  const gameboardPlayer = new Gameboard(player1);
  const gameboardOpponent = new Gameboard(opponent);

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

  function playOpponentTurn() {
    // Pick random valid cell to attack
    let cellToAttack =
      Math.floor(Math.random() * gameboardOpponent.board.length) + 1;

    while (opponent.madeShots.includes(cellToAttack)) {
      cellToAttack =
        Math.floor(Math.random() * gameboardOpponent.board.length) + 1;
    }

    // Handle attack on chosen cell
    if (opponent.takeShot(cellToAttack)) {
      const targetCellDOM = DOMController.getCellFromCoord(
        gameboardPlayer,
        cellToAttack,
      );
      if (gameboardPlayer.receiveAttack(cellToAttack)) {
        DOMController.renderShot(targetCellDOM, true);
      } else {
        DOMController.renderShot(targetCellDOM, false);
      }
    }

    // Check for win
    if (checkForWin()) {
      DOMController.handleEndGame(checkForWin());
    }
  }

  function playTurn(clickedCell) {
    const targetCell = Number(clickedCell.dataset.coord);
    // Only run logic, if clicked cell is valid
    if (mainGameLoop.player1.takeShot(targetCell)) {
      if (mainGameLoop.gameboardOpponent.receiveAttack(targetCell)) {
        DOMController.renderShot(clickedCell, true);
      } else {
        DOMController.renderShot(clickedCell, false);
      }

      // Check for win, otherwise let opponent play turn
      if (checkForWin()) {
        DOMController.handleEndGame(checkForWin());
      } else {
        playOpponentTurn();
      }
    }
  }

  function checkForWin() {
    if (gameboardPlayer.allShipsDestroyed()) return opponent;
    if (gameboardOpponent.allShipsDestroyed()) return player1;
    return false;
  }

  function resetGame() {
    player1.reset();
    opponent.reset();
    gameboardPlayer.reset();
    gameboardOpponent.reset();

    prepareGame();
    testPlaceShips();
    gameboardPlayer.ships.forEach((ship) => {
      DOMController.renderShip(gameboardPlayer, ship);
    });

    gameboardOpponent.ships.forEach((ship) => {
      DOMController.renderShip(gameboardOpponent, ship);
    });
  }

  return {
    player1,
    opponent,
    gameboardPlayer,
    gameboardOpponent,
    prepareGame,
    testPlaceShips,
    playOpponentTurn,
    playTurn,
    checkForWin,
    resetGame,
  };
})();

const DOMController = (() => {
  const playerField = document.getElementById('player-field');
  const opponentField = document.getElementById('opponent-field');
  const playerBoard = playerField.querySelector('.board');
  const opponentBoard = opponentField.querySelector('.board');

  (function buttonEventListeners() {
    const resetBtn = document.getElementById('reset');

    resetBtn.addEventListener('click', () => {
      const modalContainer = document.getElementById('modal-container');
      playerBoard.innerHTML = '';
      opponentBoard.innerHTML = '';
      mainGameLoop.resetGame();
      modalContainer.classList.toggle('hidden');
    });
  })();

  // Create an empty grid on correct side for passed in gameboard
  function createBoardGrid(board) {
    const parent =
      board.owner.playerName === 'player' ? playerBoard : opponentBoard;

    if (parent === playerBoard) {
      board.board.forEach((cellNum) => {
        const newCell = document.createElement('div');
        newCell.classList.add('player-cell');
        newCell.dataset.coord = cellNum;
        parent.appendChild(newCell);
      });
    } else {
      board.board.forEach((cellNum) => {
        const newCell = document.createElement('div');
        newCell.classList.add('opponent-cell');
        newCell.dataset.coord = cellNum;
        parent.appendChild(newCell);

        newCell.addEventListener('click', (e) => {
          mainGameLoop.playTurn(e.target);
        });
      });
    }
  }

  // Given input of which board, and cell coordinate(1-100), return ref to cell DOM element
  function getCellFromCoord(board, coord) {
    const parent =
      board.owner.playerName === 'player' ? playerBoard : opponentBoard;
    return parent.querySelector(`[data-coord="${coord}"]`);
  }

  // Takes ref to which board and which ship
  function renderShip(board, ship) {
    const parent =
      board.owner.playerName === 'player' ? playerBoard : opponentBoard;

    ship.occupiedCells.forEach((occupiedCell) => {
      const domCell = parent.querySelector(`[data-coord="${occupiedCell}"]`);
      if (parent === playerBoard) {
        domCell.classList.add('ship');
      } else {
        domCell.classList.add('ship-hidden');
      }
    });
  }

  function renderShot(targetCell, isHit) {
    if (isHit) {
      targetCell.classList.add('hit');
    } else {
      targetCell.classList.add('miss');
    }
  }

  function handleEndGame(winner) {
    const modalContainer = document.getElementById('modal-container');
    const resultText = modalContainer.querySelector('.result');
    resultText.textContent =
      winner.playerName === 'opponent' ? 'You lose!' : 'You win!';
    modalContainer.classList.toggle('hidden');
  }

  return {
    createBoardGrid,
    getCellFromCoord,
    renderShip,
    renderShot,
    handleEndGame,
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
