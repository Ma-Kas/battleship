import Player from './player';
import Gameboard from './gameboard';
import { SHIP_TYPES } from './helpers';
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

  let currentShipToPlace = SHIP_TYPES[0];

  function prepareGame() {
    // Initialize Gameboards
    gameboardPlayer.initialize();
    gameboardOpponent.initialize();

    // Create DOM Elements
    DOMController.createPlacementGrid();
    DOMController.createBoardGrid(gameboardPlayer);
    DOMController.createBoardGrid(gameboardOpponent);

    // Create Random Opponent Ships
    gameboardOpponent.placeShipsRandomly();
    mainGameLoop.gameboardOpponent.ships.forEach((ship) => {
      DOMController.renderShip(mainGameLoop.gameboardOpponent, ship);
    });
  }

  function getCurrentShip() {
    return currentShipToPlace;
  }

  function incrementCurrentShip() {
    const index = SHIP_TYPES.indexOf(currentShipToPlace);
    if (index < SHIP_TYPES.length - 1) {
      currentShipToPlace = SHIP_TYPES[index + 1];
    }
  }

  function handleShipPlacement(placementCells) {
    if (
      gameboardPlayer.placeShip(
        currentShipToPlace.type,
        currentShipToPlace.length,
        placementCells,
      )
    ) {
      const placedShip =
        gameboardPlayer.ships[gameboardPlayer.ships.length - 1];
      DOMController.renderShip(gameboardPlayer, placedShip);
      incrementCurrentShip();
    }
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
    currentShipToPlace = SHIP_TYPES[0];
    player1.reset();
    opponent.reset();
    gameboardPlayer.reset();
    gameboardOpponent.reset();

    prepareGame();
  }

  return {
    player1,
    opponent,
    gameboardPlayer,
    gameboardOpponent,
    getCurrentShip,
    prepareGame,
    handleShipPlacement,
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
    const startBtn = document.getElementById('start');
    const resetBtn = document.getElementById('reset');
    const flipBtn = document.getElementById('flip');
    const confirmBtn = document.getElementById('confirm');

    startBtn.addEventListener('click', () => {
      const welcomeModalContainer = document.getElementById(
        'welcome-modal-container',
      );
      welcomeModalContainer.classList.add('hidden');
      mainGameLoop.prepareGame();
    });

    // Toggle horizontal and vertical alignment
    flipBtn.addEventListener('click', () => {
      flipBtn.dataset.horiz = Number(flipBtn.dataset.horiz) ? 0 : 1;
    });

    confirmBtn.addEventListener('click', () => {
      if (mainGameLoop.gameboardPlayer.ships.length !== 5) {
        return;
      }
      const placementModalContainer = document.getElementById(
        'placement-modal-container',
      );
      placementModalContainer.classList.add('hidden');
    });

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
        const newCellChild = document.createElement('div');
        newCell.classList.add('player-cell');
        newCell.classList.add('flex-centered');
        newCell.dataset.coord = cellNum;
        newCellChild.classList.add('cell-inner');
        newCellChild.dataset.coord = cellNum;
        parent.appendChild(newCell);
        newCell.appendChild(newCellChild);
      });
    } else {
      board.board.forEach((cellNum) => {
        const newCell = document.createElement('div');
        const newCellChild = document.createElement('div');
        newCell.classList.add('opponent-cell');
        newCell.classList.add('flex-centered');
        newCell.dataset.coord = cellNum;
        newCellChild.classList.add('cell-inner');
        newCellChild.dataset.coord = cellNum;
        parent.appendChild(newCell);
        newCell.appendChild(newCellChild);

        newCell.addEventListener('click', (e) => {
          if (!e.target.classList.contains('cell-inner')) {
            return;
          }
          mainGameLoop.playTurn(e.target);
        });
      });
    }
  }

  // Renders placement grid and adds event listeners for placement hover effect
  function createPlacementGrid() {
    const placementModalContainer = document.getElementById(
      'placement-modal-container',
    );
    const placementModal = document.getElementById('placement-modal');
    const placementBoard = placementModal.querySelector('.board');

    // Cleanup from previous game
    placementModalContainer.classList.remove('hidden');
    placementBoard.innerHTML = '';

    for (let i = 1; i <= 100; i++) {
      const newCell = document.createElement('div');
      const newCellChild = document.createElement('div');
      newCell.classList.add('placement-cell');
      newCell.classList.add('flex-centered');
      newCellChild.classList.add('placement-cell-highlight');
      newCell.dataset.coord = i;
      newCellChild.dataset.coord = i;
      placementBoard.appendChild(newCell);
      newCell.appendChild(newCellChild);

      // Add event listeners for hover
      newCell.addEventListener('mouseenter', () => {
        if (mainGameLoop.gameboardPlayer.ships.length !== 5) {
          const isHorizontal = Number(
            document.getElementById('flip').getAttribute('data-horiz'),
          );
          const shipToPlace = mainGameLoop.getCurrentShip();
          renderShipHover(newCell, shipToPlace.length, isHorizontal);
        }
      });
      newCell.addEventListener('mouseleave', () => {
        const toUnhighlight = document.querySelectorAll('.hover');
        toUnhighlight.forEach((cell) => {
          cell.classList.remove('hover');
        });
      });

      // Add event listeners for placement
      newCell.addEventListener('click', () => {
        // Only allow placement when current hover is valid
        if (newCellChild.classList.contains('hover')) {
          const placementCells = [];
          document
            .querySelectorAll('.hover')
            .forEach((cell) =>
              placementCells.push(Number(cell.getAttribute('data-coord'))),
            );

          // If placement successful:
          // Mark ship on placement board, move to place next ship
          mainGameLoop.handleShipPlacement(placementCells);
        }
      });
    }
  }

  // Given input of which board, and cell coordinate(1-100), return ref to cell DOM element
  function getCellFromCoord(board, coord) {
    const parent =
      board.owner.playerName === 'player' ? playerBoard : opponentBoard;
    return parent.querySelector(`.cell-inner[data-coord="${coord}"]`);
  }

  function renderShipHover(origin, length, isHorizontal) {
    const start = Number(origin.dataset.coord);
    const proposedCells = [];

    if (isHorizontal) {
      for (let i = start; i < start + length; i++) {
        proposedCells.push(i);
      }
    } else {
      proposedCells.push(start);
      while (proposedCells.length !== length) {
        proposedCells.push(proposedCells[proposedCells.length - 1] + 10);
      }
    }
    if (
      !mainGameLoop.gameboardPlayer.isValidShipPlacement(length, proposedCells)
    ) {
      return;
    }

    proposedCells.forEach((cell) => {
      const toHighlight = document.querySelector(
        `.placement-cell-highlight[data-coord="${cell}"]`,
      );
      toHighlight.classList.add('hover');
    });
  }

  // Takes ref to which board and which ship
  // For player, render it on placement and playing board
  function renderShip(board, ship) {
    const parent =
      board.owner.playerName === 'player' ? playerBoard : opponentBoard;

    ship.occupiedCells.forEach((occupiedCell) => {
      const domCell = parent.querySelector(
        `.cell-inner[data-coord="${occupiedCell}"]`,
      );
      const domPlacementCell = document.querySelector(
        `.placement-cell-highlight[data-coord="${occupiedCell}"]`,
      );
      if (parent === playerBoard) {
        domCell.classList.add('ship');
        domPlacementCell.classList.add('ship');
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
    createPlacementGrid,
    getCellFromCoord,
    renderShip,
    renderShot,
    handleEndGame,
  };
})();

/// ////////////
// GAME LOGIC
// mainGameLoop.prepareGame();
