import { System } from "@minecraft/server";
import { SystemRunSymbol } from "../../API/api-fix.js";

Object.defineProperties(System.prototype, {
    nextTick: {get(){return new Promise(res=>this[SystemRunSymbol](res));}}
});
