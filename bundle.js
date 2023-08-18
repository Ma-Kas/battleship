/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleship/./src/css/style.css?");

/***/ }),

/***/ "./src/js/gameboard.js":
/*!*****************************!*\
  !*** ./src/js/gameboard.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/js/ship.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./src/js/helpers.js\");\n\n\n\nconst GRID = 10;\n\nclass Gameboard {\n  constructor(player) {\n    this.owner = player;\n    this.board = [];\n    this.ships = [];\n    this.missedShots = [];\n  }\n\n  initialize() {\n    this.board = Array.from({ length: GRID * GRID }, (x, i) => i + 1);\n  }\n\n  placeShip(shipType, length, occupiedCells) {\n    if (!this.isValidShipPlacement(length, occupiedCells)) {\n      return false;\n    }\n    const newShip = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](shipType, length, occupiedCells);\n    this.ships.push(newShip);\n    return true;\n  }\n\n  placeShipsRandomly() {\n    _helpers__WEBPACK_IMPORTED_MODULE_1__.SHIP_TYPES.forEach((shipType) => {\n      let placed = false;\n      while (!placed) {\n        const proposedCells = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.randomProposedCells)(shipType.length, GRID);\n        if (this.placeShip(shipType.type, shipType.length, proposedCells)) {\n          placed = true;\n        }\n      }\n    });\n  }\n\n  isValidShipPlacement(length, proposedCells) {\n    // Invalid if amount of proposed cells doesn't match ship type\n    if (proposedCells.length !== length) return false;\n\n    // Invalid if any proposed cells are outside board\n    if (!proposedCells.every((cell) => cell >= 1 && cell <= GRID * GRID))\n      return false;\n\n    proposedCells.sort((a, b) => a - b);\n\n    // Invalid if cells are not perfectly consecutive (+1 to each) (for horizontal)\n    // AND if not below each other (+10 to each) (for vertical)\n    let isHorizontal = true;\n    if ((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.arrayIsConsecutive)(proposedCells)) {\n      isHorizontal = true;\n    } else if ((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.arrayIsStacked)(proposedCells)) {\n      isHorizontal = false;\n    } else {\n      return false;\n    }\n\n    // ONLY FOR HORIZONTAL PLACEMENT\n    // Invalid if ship \"wraps\" from one row to next\n    // Get row of first number, then check for each other one if it is same\n    if (isHorizontal) {\n      const row = Math.floor((proposedCells[0] - 1) / 10) + 1;\n      for (let i = 1; i < proposedCells.length; i++) {\n        if (Math.floor((proposedCells[i] - 1) / 10) + 1 !== row) return false;\n      }\n    }\n\n    // Invalid if any ship in this.ships already occupies any of the proposed cells\n    for (let i = 0; i < proposedCells.length; i++) {\n      for (let j = 0; j < this.ships.length; j++) {\n        if (this.ships[j].occupiedCells.includes(proposedCells[i])) {\n          return false;\n        }\n      }\n    }\n\n    return true;\n  }\n\n  receiveAttack(attackedCell) {\n    for (let i = 0; i < this.ships.length; i++) {\n      if (this.ships[i].occupiedCells.includes(attackedCell)) {\n        const hitShip = this.ships[i];\n        // Handle hit detection in ship class\n        hitShip.hit(attackedCell);\n        // If hit sunk ship, remove it from ships array\n        if (hitShip.isSunk()) {\n          this.ships.splice(this.ships.indexOf(hitShip), 1);\n        }\n        return true;\n      }\n    }\n    // If no hit, append missedShots array\n    this.missedShots.push(attackedCell);\n    return false;\n  }\n\n  allShipsDestroyed() {\n    return this.ships.length === 0;\n  }\n\n  reset() {\n    this.board = [];\n    this.ships = [];\n    this.missedShots = [];\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://battleship/./src/js/gameboard.js?");

/***/ }),

/***/ "./src/js/helpers.js":
/*!***************************!*\
  !*** ./src/js/helpers.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SHIP_TYPES: () => (/* binding */ SHIP_TYPES),\n/* harmony export */   arrayIsConsecutive: () => (/* binding */ arrayIsConsecutive),\n/* harmony export */   arrayIsStacked: () => (/* binding */ arrayIsStacked),\n/* harmony export */   randomProposedCells: () => (/* binding */ randomProposedCells)\n/* harmony export */ });\nconst SHIP_TYPES = [\n  { type: 'Carrier', length: 5 },\n  { type: 'Battleship', length: 4 },\n  { type: 'Cruiser', length: 3 },\n  { type: 'Submarine', length: 3 },\n  { type: 'Destroyer', length: 2 },\n];\n\nfunction arrayIsConsecutive(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] !== arr[i - 1] + 1) {\n      return false;\n    }\n  }\n  return true;\n}\n\n// Checks whether cells in array are vertically stacked in 10x10 grid\nfunction arrayIsStacked(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] !== arr[i - 1] + 10) {\n      return false;\n    }\n  }\n  return true;\n}\n\nfunction randomProposedCells(length, gridSize) {\n  const array = [];\n  // 50/50 chance whether random cells are horizontal or vertical stacked\n  const isHorizontal = Math.random() < 0.5;\n  const startNumber = Math.floor(Math.random() * (gridSize * gridSize)) + 1;\n\n  array.push(startNumber);\n  while (array.length < length) {\n    if (isHorizontal) {\n      array.push(array[array.length - 1] + 1);\n    } else {\n      array.push(array[array.length - 1] + 10);\n    }\n  }\n  return array;\n}\n\n\n//# sourceURL=webpack://battleship/./src/js/helpers.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/js/player.js\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ \"./src/js/gameboard.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ \"./src/js/helpers.js\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/style.css */ \"./src/css/style.css\");\n\n\n\n\n\n/// ////////////\n// MODULES\nconst mainGameLoop = (() => {\n  // Create Players\n  const player1 = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('player');\n  const opponent = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('opponent');\n  // Create Opponents\n  const gameboardPlayer = new _gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"](player1);\n  const gameboardOpponent = new _gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"](opponent);\n\n  let currentShipToPlace = _helpers__WEBPACK_IMPORTED_MODULE_2__.SHIP_TYPES[0];\n\n  function prepareGame() {\n    // Initialize Gameboards\n    gameboardPlayer.initialize();\n    gameboardOpponent.initialize();\n\n    // Create DOM Elements\n    DOMController.createPlacementGrid();\n    DOMController.createBoardGrid(gameboardPlayer);\n    DOMController.createBoardGrid(gameboardOpponent);\n\n    // Create Random Opponent Ships\n    gameboardOpponent.placeShipsRandomly();\n    mainGameLoop.gameboardOpponent.ships.forEach((ship) => {\n      DOMController.renderShip(mainGameLoop.gameboardOpponent, ship);\n    });\n  }\n\n  function getCurrentShip() {\n    return currentShipToPlace;\n  }\n\n  function incrementCurrentShip() {\n    const index = _helpers__WEBPACK_IMPORTED_MODULE_2__.SHIP_TYPES.indexOf(currentShipToPlace);\n    if (index < _helpers__WEBPACK_IMPORTED_MODULE_2__.SHIP_TYPES.length - 1) {\n      currentShipToPlace = _helpers__WEBPACK_IMPORTED_MODULE_2__.SHIP_TYPES[index + 1];\n    }\n  }\n\n  function handleShipPlacement(placementCells) {\n    if (\n      gameboardPlayer.placeShip(\n        currentShipToPlace.type,\n        currentShipToPlace.length,\n        placementCells,\n      )\n    ) {\n      const placedShip =\n        gameboardPlayer.ships[gameboardPlayer.ships.length - 1];\n      DOMController.renderShip(gameboardPlayer, placedShip);\n      incrementCurrentShip();\n    }\n  }\n\n  function playOpponentTurn() {\n    // Pick random valid cell to attack\n    let cellToAttack =\n      Math.floor(Math.random() * gameboardOpponent.board.length) + 1;\n\n    while (opponent.madeShots.includes(cellToAttack)) {\n      cellToAttack =\n        Math.floor(Math.random() * gameboardOpponent.board.length) + 1;\n    }\n\n    // Handle attack on chosen cell\n    if (opponent.takeShot(cellToAttack)) {\n      const targetCellDOM = DOMController.getCellFromCoord(\n        gameboardPlayer,\n        cellToAttack,\n      );\n      if (gameboardPlayer.receiveAttack(cellToAttack)) {\n        DOMController.renderShot(targetCellDOM, true);\n      } else {\n        DOMController.renderShot(targetCellDOM, false);\n      }\n    }\n\n    // Check for win\n    if (checkForWin()) {\n      DOMController.handleEndGame(checkForWin());\n    }\n  }\n\n  function playTurn(clickedCell) {\n    const targetCell = Number(clickedCell.dataset.coord);\n    // Only run logic, if clicked cell is valid\n    if (mainGameLoop.player1.takeShot(targetCell)) {\n      if (mainGameLoop.gameboardOpponent.receiveAttack(targetCell)) {\n        DOMController.renderShot(clickedCell, true);\n      } else {\n        DOMController.renderShot(clickedCell, false);\n      }\n\n      // Check for win, otherwise let opponent play turn\n      if (checkForWin()) {\n        DOMController.handleEndGame(checkForWin());\n      } else {\n        playOpponentTurn();\n      }\n    }\n  }\n\n  function checkForWin() {\n    if (gameboardPlayer.allShipsDestroyed()) return opponent;\n    if (gameboardOpponent.allShipsDestroyed()) return player1;\n    return false;\n  }\n\n  function resetGame() {\n    currentShipToPlace = _helpers__WEBPACK_IMPORTED_MODULE_2__.SHIP_TYPES[0];\n    player1.reset();\n    opponent.reset();\n    gameboardPlayer.reset();\n    gameboardOpponent.reset();\n\n    prepareGame();\n  }\n\n  return {\n    player1,\n    opponent,\n    gameboardPlayer,\n    gameboardOpponent,\n    getCurrentShip,\n    prepareGame,\n    handleShipPlacement,\n    playOpponentTurn,\n    playTurn,\n    checkForWin,\n    resetGame,\n  };\n})();\n\nconst DOMController = (() => {\n  const playerField = document.getElementById('player-field');\n  const opponentField = document.getElementById('opponent-field');\n  const playerBoard = playerField.querySelector('.board');\n  const opponentBoard = opponentField.querySelector('.board');\n\n  (function buttonEventListeners() {\n    const startBtn = document.getElementById('start');\n    const resetBtn = document.getElementById('reset');\n    const flipBtn = document.getElementById('flip');\n    const confirmBtn = document.getElementById('confirm');\n\n    startBtn.addEventListener('click', () => {\n      const welcomeModalContainer = document.getElementById(\n        'welcome-modal-container',\n      );\n      welcomeModalContainer.classList.add('hidden');\n      mainGameLoop.prepareGame();\n    });\n\n    // Toggle horizontal and vertical alignment\n    flipBtn.addEventListener('click', () => {\n      flipBtn.dataset.horiz = Number(flipBtn.dataset.horiz) ? 0 : 1;\n    });\n\n    confirmBtn.addEventListener('click', () => {\n      if (mainGameLoop.gameboardPlayer.ships.length !== 5) {\n        return;\n      }\n      const placementModalContainer = document.getElementById(\n        'placement-modal-container',\n      );\n      placementModalContainer.classList.add('hidden');\n    });\n\n    resetBtn.addEventListener('click', () => {\n      const modalContainer = document.getElementById('modal-container');\n      playerBoard.innerHTML = '';\n      opponentBoard.innerHTML = '';\n      mainGameLoop.resetGame();\n      modalContainer.classList.toggle('hidden');\n    });\n  })();\n\n  // Create an empty grid on correct side for passed in gameboard\n  function createBoardGrid(board) {\n    const parent =\n      board.owner.playerName === 'player' ? playerBoard : opponentBoard;\n\n    if (parent === playerBoard) {\n      board.board.forEach((cellNum) => {\n        const newCell = document.createElement('div');\n        const newCellChild = document.createElement('div');\n        newCell.classList.add('player-cell');\n        newCell.classList.add('flex-centered');\n        newCell.dataset.coord = cellNum;\n        newCellChild.classList.add('cell-inner');\n        newCellChild.dataset.coord = cellNum;\n        parent.appendChild(newCell);\n        newCell.appendChild(newCellChild);\n      });\n    } else {\n      board.board.forEach((cellNum) => {\n        const newCell = document.createElement('div');\n        const newCellChild = document.createElement('div');\n        newCell.classList.add('opponent-cell');\n        newCell.classList.add('flex-centered');\n        newCell.dataset.coord = cellNum;\n        newCellChild.classList.add('cell-inner');\n        newCellChild.dataset.coord = cellNum;\n        parent.appendChild(newCell);\n        newCell.appendChild(newCellChild);\n\n        newCell.addEventListener('click', (e) => {\n          if (!e.target.classList.contains('cell-inner')) {\n            return;\n          }\n          mainGameLoop.playTurn(e.target);\n        });\n      });\n    }\n  }\n\n  // Renders placement grid and adds event listeners for placement hover effect\n  function createPlacementGrid() {\n    const placementModalContainer = document.getElementById(\n      'placement-modal-container',\n    );\n    const placementModal = document.getElementById('placement-modal');\n    const placementBoard = placementModal.querySelector('.board');\n\n    // Cleanup from previous game\n    placementModalContainer.classList.remove('hidden');\n    placementBoard.innerHTML = '';\n\n    for (let i = 1; i <= 100; i++) {\n      const newCell = document.createElement('div');\n      const newCellChild = document.createElement('div');\n      newCell.classList.add('placement-cell');\n      newCell.classList.add('flex-centered');\n      newCellChild.classList.add('placement-cell-highlight');\n      newCell.dataset.coord = i;\n      newCellChild.dataset.coord = i;\n      placementBoard.appendChild(newCell);\n      newCell.appendChild(newCellChild);\n\n      // Add event listeners for hover\n      newCell.addEventListener('mouseenter', () => {\n        if (mainGameLoop.gameboardPlayer.ships.length !== 5) {\n          const isHorizontal = Number(\n            document.getElementById('flip').getAttribute('data-horiz'),\n          );\n          const shipToPlace = mainGameLoop.getCurrentShip();\n          renderShipHover(newCell, shipToPlace.length, isHorizontal);\n        }\n      });\n      newCell.addEventListener('mouseleave', () => {\n        const toUnhighlight = document.querySelectorAll('.hover');\n        toUnhighlight.forEach((cell) => {\n          cell.classList.remove('hover');\n        });\n      });\n\n      // Add event listeners for placement\n      newCell.addEventListener('click', () => {\n        // Only allow placement when current hover is valid\n        if (newCellChild.classList.contains('hover')) {\n          const placementCells = [];\n          document\n            .querySelectorAll('.hover')\n            .forEach((cell) =>\n              placementCells.push(Number(cell.getAttribute('data-coord'))),\n            );\n\n          // If placement successful:\n          // Mark ship on placement board, move to place next ship\n          mainGameLoop.handleShipPlacement(placementCells);\n        }\n      });\n    }\n  }\n\n  // Given input of which board, and cell coordinate(1-100), return ref to cell DOM element\n  function getCellFromCoord(board, coord) {\n    const parent =\n      board.owner.playerName === 'player' ? playerBoard : opponentBoard;\n    return parent.querySelector(`.cell-inner[data-coord=\"${coord}\"]`);\n  }\n\n  function renderShipHover(origin, length, isHorizontal) {\n    const start = Number(origin.dataset.coord);\n    const proposedCells = [];\n\n    if (isHorizontal) {\n      for (let i = start; i < start + length; i++) {\n        proposedCells.push(i);\n      }\n    } else {\n      proposedCells.push(start);\n      while (proposedCells.length !== length) {\n        proposedCells.push(proposedCells[proposedCells.length - 1] + 10);\n      }\n    }\n    if (\n      !mainGameLoop.gameboardPlayer.isValidShipPlacement(length, proposedCells)\n    ) {\n      return;\n    }\n\n    proposedCells.forEach((cell) => {\n      const toHighlight = document.querySelector(\n        `.placement-cell-highlight[data-coord=\"${cell}\"]`,\n      );\n      toHighlight.classList.add('hover');\n    });\n  }\n\n  // Takes ref to which board and which ship\n  // For player, render it on placement and playing board\n  function renderShip(board, ship) {\n    const parent =\n      board.owner.playerName === 'player' ? playerBoard : opponentBoard;\n\n    ship.occupiedCells.forEach((occupiedCell) => {\n      const domCell = parent.querySelector(\n        `.cell-inner[data-coord=\"${occupiedCell}\"]`,\n      );\n      const domPlacementCell = document.querySelector(\n        `.placement-cell-highlight[data-coord=\"${occupiedCell}\"]`,\n      );\n      if (parent === playerBoard) {\n        domCell.classList.add('ship');\n        domPlacementCell.classList.add('ship');\n      } else {\n        domCell.classList.add('ship-hidden');\n      }\n    });\n  }\n\n  function renderShot(targetCell, isHit) {\n    if (isHit) {\n      targetCell.classList.add('hit');\n    } else {\n      targetCell.classList.add('miss');\n    }\n  }\n\n  function handleEndGame(winner) {\n    const modalContainer = document.getElementById('modal-container');\n    const resultText = modalContainer.querySelector('.result');\n    resultText.textContent =\n      winner.playerName === 'opponent' ? 'You lose!' : 'You win!';\n    modalContainer.classList.toggle('hidden');\n  }\n\n  return {\n    createBoardGrid,\n    createPlacementGrid,\n    getCellFromCoord,\n    renderShip,\n    renderShot,\n    handleEndGame,\n  };\n})();\n\n/// ////////////\n// GAME LOGIC\n// mainGameLoop.prepareGame();\n\n\n//# sourceURL=webpack://battleship/./src/js/index.js?");

/***/ }),

/***/ "./src/js/player.js":
/*!**************************!*\
  !*** ./src/js/player.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Player {\n  constructor(playerName) {\n    this.playerName = playerName;\n    this.madeShots = [];\n  }\n\n  takeShot(cell) {\n    if (this.madeShots.includes(cell)) return false;\n    this.madeShots.push(cell);\n    return true;\n  }\n\n  reset() {\n    this.madeShots = [];\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/js/player.js?");

/***/ }),

/***/ "./src/js/ship.js":
/*!************************!*\
  !*** ./src/js/ship.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Ship {\n  constructor(name, length, occupiedCells) {\n    this.name = name;\n    this.length = length;\n    this.occupiedCells = occupiedCells;\n    this.hits = [];\n  }\n\n  hit(cell) {\n    if (this.hits.includes(cell)) return;\n    this.hits.push(cell);\n  }\n\n  isSunk() {\n    return this.hits.length === this.length;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/js/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;