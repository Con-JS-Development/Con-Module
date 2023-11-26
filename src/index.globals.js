import { ConfirmFormData, OverTakes } from "core/index";
import "./extensions/server/System";
import { world, system } from "@minecraft/server";
import { 
    GeneratorFunction,
    GeneratorFunctionConstructor,
    AsyncGeneratorFunction,
    AsyncGeneratorFunctionConstructor,
    AsyncFunctionConstructor
 } from "core/index";

OverTakes(globalThis,{
    GeneratorFunction,
    GeneratorFunctionConstructor,
    AsyncGeneratorFunction,
    AsyncGeneratorFunctionConstructor,
    AsyncFunctionConstructor,
    world,
    system,
    scoreboard: world.scoreboard,
    get currentTick(){return system.currentTick;},
    get nextTick(){return system.nextTick;},
    setTimeout: system.runTimeout.bind(system),
    setInterval: system.runInterval.bind(system),
    clearInterval: system.clearRun.bind(system),
    clearTimeout: system.clearRun.bind(system),
    delay(delay = 1){
        if(delay < 1) return Promise.resolve(system.currentTick);
        return new Promise(res=>setTimeout(res,delay-1,system.currentTick + delay))
    },
    displayError(er){console.error(er,er?.stack??"");},
    confirm(player,message = "",title){
        return new ConfirmFormData(message,title??ConfirmFormData.defualtTitle).show(player);
    }
});