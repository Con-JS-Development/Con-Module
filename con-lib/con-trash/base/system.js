import { System, system } from "@minecraft/server";
import { SystemRunTimeoutSymbol, SystemRunIntervalSymbol, SystemRunSymbol } from "../../API/index.js";

System.prototype.run = function run(callback,...params){
    return this[SystemRunSymbol](()=>{
        Function.asyncCall(callback,console.error,...params);
    });
}
System.prototype.runTimeout = function runTimeout(callback, timeout,...params){
    return this[SystemRunTimeoutSymbol](()=>{
        Function.asyncCall(callback,console.error,...params);
    },...[timeout]);
}
System.prototype.runInterval = function runInterval(callback, interval,...params){
    return this[SystemRunIntervalSymbol](()=>{
        Function.asyncCall(callback,console.error,...params);
    },...[interval]);
}
Object.defineProperty(System.prototype, "nextTick",  {get(){return globalThis.nextTick;}})