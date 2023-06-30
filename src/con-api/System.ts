import { System, system, Dimension, Entity, world } from '@minecraft/server';
import { OverTakes } from 'core';

const overworld = world.getDimension("overworld")
declare module '@minecraft/server' {
    interface System {
        readonly onlinePlayers: Player[]
        /** @async Await for next tick */
        readonly nextTick: Promise<number>;
        runCommand(cmd: string, target?: Dimension | Entity): CommandResult
        runCommandAsync(cmd: string, target?: Dimension | Entity): Promise<CommandResult>;
        delay(ticks?: number): Promise<number>;
    }
};
OverTakes(System.prototype, {
    get onlinePlayers(){return world.getPlayers();},
    get nextTick(): Promise<number>{return new Promise(res=>this.run?.(()=>res((this.currentTick??0) + 1))) as Promise<number>;},
    runCommand(cmd: string, target?: Dimension | Entity){return (target??overworld).runCommand(cmd);},
    runCommandAsync(cmd: string, target?: Dimension | Entity){return (target??overworld).runCommandAsync(cmd);},
    delay(ticks = 0){
        return new Promise(res=>{system.runTimeout(()=>{
            res(system.currentTick + 1);
        }, ticks<1?0:ticks-1)});
    }
});