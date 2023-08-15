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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/js/ship.js\");\n\n\nconst GRID = 10;\n\nclass Gameboard {\n  constructor(player) {\n    this.owner = player;\n    this.board = [];\n    this.ships = [];\n    this.missedShots = [];\n  }\n\n  initialize() {\n    this.board = Array.from({ length: GRID * GRID }, (x, i) => i + 1);\n  }\n\n  placeShip(shipType, cells) {\n    const newShip = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](shipType, cells);\n    this.ships.push(newShip);\n  }\n\n  receiveAttack(attackedCell) {\n    for (let i = 0; i < this.ships.length; i++) {\n      if (this.ships[i].occupiedCells.includes(attackedCell)) {\n        const hitShip = this.ships[i];\n        // Handle hit detection in ship class\n        hitShip.hit(attackedCell);\n        // If hit sunk ship, remove it from ships array\n        if (hitShip.isSunk()) {\n          this.ships.splice(this.ships.indexOf(hitShip), 1);\n        }\n        return;\n      }\n    }\n    // If no hit, append missedShots array\n    this.missedShots.push(attackedCell);\n  }\n\n  allShipsDestroyed() {\n    return this.ships.length === 0;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://battleship/./src/js/gameboard.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/js/player.js\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ \"./src/js/gameboard.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ \"./src/js/ship.js\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/style.css */ \"./src/css/style.css\");\n\n\n\n\n\n// Ships: Carrier(5), Battleship(4), Cruiser(3), Submarine(3), Destroyer(2)\nconst mainGameLoop = (() => {\n  const currentTurn = '';\n\n  // Create Players\n  const player1 = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('player');\n  const opponent = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('opponent');\n  // Create Opponents\n  const gameboardPlayer = new _gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"](player1);\n  const gameboardOpponent = new _gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"](opponent);\n\n  (function startGame() {\n    gameboardPlayer.initialize();\n    gameboardOpponent.initialize();\n  })();\n\n  function testPlaceShips() {\n    gameboardPlayer.placeShip('Carrier', [1, 2, 3, 4, 5]);\n    gameboardPlayer.placeShip('Battleship', [11, 12, 13, 14]);\n    gameboardPlayer.placeShip('Cruiser', [21, 22, 23]);\n    gameboardPlayer.placeShip('Submarine', [31, 32, 33]);\n    gameboardPlayer.placeShip('Destroyer', [41, 42]);\n\n    gameboardOpponent.placeShip('Carrier', [1, 2, 3, 4, 5]);\n    gameboardOpponent.placeShip('Battleship', [11, 12, 13, 14]);\n    gameboardOpponent.placeShip('Cruiser', [21, 22, 23]);\n    gameboardOpponent.placeShip('Submarine', [31, 32, 33]);\n    gameboardOpponent.placeShip('Destroyer', [41, 42]);\n  }\n\n  return {\n    player1,\n    opponent,\n    gameboardPlayer,\n    gameboardOpponent,\n    testPlaceShips,\n  };\n})();\n\nconst DOMController = () => {\n  //\n};\n\nmainGameLoop.testPlaceShips();\n\nif (mainGameLoop.player1.takeShot(4)) {\n  mainGameLoop.gameboardPlayer.receiveAttack(4);\n}\n\nconsole.log(mainGameLoop.gameboardPlayer.ships);\n\n\n//# sourceURL=webpack://battleship/./src/js/index.js?");

/***/ }),

/***/ "./src/js/player.js":
/*!**************************!*\
  !*** ./src/js/player.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Player {\n  constructor(playerName) {\n    this.playerName = playerName;\n    this.madeShots = [];\n  }\n\n  takeShot(cell) {\n    if (this.madeShots.includes(cell)) return false;\n    this.madeShots.push(cell);\n    return true;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/js/player.js?");

/***/ }),

/***/ "./src/js/ship.js":
/*!************************!*\
  !*** ./src/js/ship.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Ship {\n  constructor(name, occupiedCells) {\n    this.name = name;\n    this.length = occupiedCells.length;\n    this.occupiedCells = occupiedCells;\n    this.hits = [];\n  }\n\n  occupyCells() {\n    this.occupyCells.push();\n  }\n\n  hit(cell) {\n    if (this.hits.includes(cell)) return;\n    this.hits.push(cell);\n  }\n\n  isSunk() {\n    return this.hits.length === this.length;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/js/ship.js?");

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