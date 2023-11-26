import { System, system, Dimension, Entity, world } from '@minecraft/server';
import { JsonDatabase, OverTakes, /*systemDatabase*/ } from 'core';
//import type { Runnable } from "types";

const overworld = world.getDimension("overworld")
declare module '@minecraft/server' {
    interface System {
        readonly onlinePlayers: Player[]
        /** @async Await for next tick */
        readonly nextTick: Promise<number>;
        readonly database: JsonDatabase;
        delay(ticks?: number): Promise<number>;
        runCommand(cmd: string, target?: Dimension | Entity): CommandResult;
        runCommandAsync(cmd: string, target?: Dimension | Entity): Promise<CommandResult>;
        runTimeout<args extends any[]>(callBack: (...p:args)=>any,delay?: number, ...param: args): number;
        runInterval<args extends any[]>(callBack: (...p:args)=>any,delay?: number, ...param: args): number;
        run<args extends any[]>(callBack: (...p:args)=>any, ...param: args): number;
    }
};
OverTakes(System.prototype, {
    get onlinePlayers(){return world.getPlayers();},
    get nextTick(): Promise<number>{return new Promise(res=>super.runTimeout(()=>res((this.currentTick??0) + 1),0)) as Promise<number>;},
    /*get database(): JsonDatabase{return systemDatabase;},*/
    runCommand(cmd: string, target?: Dimension | Entity){return (target??overworld).runCommand(cmd);},
    runCommandAsync(cmd: string, target?: Dimension | Entity){return (target??overworld).runCommandAsync(cmd);},
    runTimeout<params extends any[]>(callBack: (...p:params)=>any,timeout=1,...params: params){return super.runTimeout(()=>callBack(...params),timeout)},
    runInterval<params extends any[]>(callBack: (...p:params)=>any,timeout=1,...params: params){return super.runInterval(()=>callBack(...params),timeout)},
    run<params extends any[]>(callBack: (...p:params)=>any,...params: params){return super.run(()=>callBack(...params))},
    delay(ticks = 0){
        return new Promise(res=>{system.runTimeout(()=>{
            res(system.currentTick + 1);
        }, ticks<1?0:ticks-1)});
    }
});