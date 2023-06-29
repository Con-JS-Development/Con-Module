/*! This file was automatically generated. */
import * as __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__ from "@minecraft/server";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  K: () => (/* binding */ Jogn),
  i: () => (/* reexport */ database_setTimeout)
});

;// CONCATENATED MODULE: external "@minecraft/server"
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
const server_namespaceObject = x({ ["system"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.system });
;// CONCATENATED MODULE: ./src/database/index.ts

const database_setTimeout = server_namespaceObject.system.runTimeout;

;// CONCATENATED MODULE: ./src/con-api/index.ts


const Jogn = database_setTimeout.call;

var __webpack_exports__Jogn = __webpack_exports__.K;
var __webpack_exports__setTimeout = __webpack_exports__.i;
export { __webpack_exports__Jogn as Jogn, __webpack_exports__setTimeout as setTimeout };
