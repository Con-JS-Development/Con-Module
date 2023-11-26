import * as MC from "@minecraft/server";
import { EmptyInsatnce, OverTakes, SyncPromise } from "core";

const {world,system} = MC;

OverTakesEvents(world.afterEvents, MC.WorldAfterEvents.prototype);
OverTakesEvents(world.beforeEvents, MC.WorldBeforeEvents.prototype);
OverTakesEvents(system.afterEvents, MC.SystemAfterEvents.prototype);
OverTakesEvents(system.beforeEvents, MC.SystemBeforeEvents.prototype);

const methods = new Map();
const ids = new WeakMap();
let id = 0;
Function.prototype.valueOf = function(){
    const i = ids.has(this)?ids.get(this):++id;
    ids.set(this,i);
    methods.set(i,this);
    return i;
}
function OverTakesEvents(instance,prototype){
    for (const eventName of Object.getOwnPropertyNames(prototype)) {
        if(eventName === "constructor") continue;
        const event = instance[eventName];
        const {enumerable,configurable} = Object.getOwnPropertyDescriptor(prototype,eventName);
        Object.defineProperty(prototype,eventName,{configurable,enumerable,
            get(){return event},
            set(num){
                const add = num>0, id = add?num:-num;
                const method = methods.get(id);
                methods.delete(id);
                if(method === undefined) return;
                if(add) event.subscribe(method);
                else event.unsubscribe(method);
            }
        });
        OverTakes(Object.getPrototypeOf(event), {
            nativeSubscribe:event.subscribe,
            nativeUnsubscribe:event.unsubscribe,
            /*
            subscribe(runnable,...options){
                const caller = (...data)=>{
                    const {get,set} = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(data[0]??{}),"cancel")??{};
                    if(get && set) Object.defineProperty(event,"cancel",{get:()=>get.call(data[0]),set:(v)=>set.call(data[0],v),configurable: true});
                    try {
                        runnable(...data);
                    } catch (er) {console.error(er,er.stack);}
                    delete event.cancel;
                }
                runnable[this.__symbol__]=caller;
                super.subscribe(caller,...options);
                return runnable;
            },
            unsubscribe(runnable){
                if(runnable[this.__symbol__]) super.unsubscribe(runnable[this.__symbol__]);
                return runnable;
            },*/
            get then(){
                const syncPromise = new SyncPromise(res=>{
                    const data = this.subscribe((ev)=>{
                        this.unsubscribe(data);
                        res(ev);
                    });
                });
                return syncPromise.then.bind(syncPromise);
            },
            /*
            get cancel(){return undefined},
            set cancel(v){throw new ReferenceError("You are not in 'before event' environment.");},*/
            __symbol__:Symbol("method"),
            valueOf(){return 0;}
        });
    }
}
export class PlayerDieAfterEventSignal extends MC.EntityDieAfterEventSignal {
    subscribe(callback){ return MC.world.afterEvents.entityDie.subscribe(callback,{entityTypes:["minecraft:player"]});}
}
export class PlayerHurtAfterEventSignal extends MC.EntityHurtAfterEventSignal {
    subscribe(callback){ return MC.world.afterEvents.entityHurt.subscribe(callback,{entityTypes:["minecraft:player"]});}
}
export class PlayerHealthChangedAfterEventSignal extends MC.EntityHealthChangedAfterEventSignal {
    subscribe(callback){ return MC.world.afterEvents.entityHealthChanged.subscribe(callback,{entityTypes:["minecraft:player"]});}
}
export class PlayerHitEntityAfterEventSignal extends MC.EntityHitEntityAfterEventSignal {
    subscribe(callback){ return MC.world.afterEvents.entityHitEntity.subscribe(callback,{entityTypes:["minecraft:player"]});}
}
export class PlayerHitBlockAfterEventSignal extends MC.EntityHitBlockAfterEventSignal {
    subscribe(callback){ return MC.world.afterEvents.entityHitBlock.subscribe(callback,{entityTypes:["minecraft:player"]});}
}
Object.assign(MC.WorldAfterEvents.prototype,{
    playerDie: EmptyInsatnce(PlayerDieAfterEventSignal),
    playerHurt: EmptyInsatnce(PlayerHurtAfterEventSignal),
    playerHealthChanged: EmptyInsatnce(PlayerHealthChangedAfterEventSignal),
    playerHitEntity: EmptyInsatnce(PlayerHitEntityAfterEventSignal),
    playerHitBlock: EmptyInsatnce(PlayerHitBlockAfterEventSignal),
});