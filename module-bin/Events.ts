import * as MC from "@minecraft/server";
export class Event{}
export class PlayerInfoEvent extends Event{
    constructor(playerName: string, playerId: string){
        super();
        this.playerName = playerName;
        this.playerId = playerId;
    }
    readonly playerName;
    readonly playerId;
}
export class PlayerEvent extends PlayerInfoEvent{
    constructor(player: MC.Entity){
        if(player instanceof MC.Player){
            super(player.name, player.id);
            this.player = player;
        }else throw TypeError("Entity is not a player");
    }
    readonly player: MC.Player;
}
export class PlayerDamaged extends PlayerEvent{
    constructor(player: MC.Entity, damageSource: MC.EntityDamageSource){
        super(player);
        this.damageSource = damageSource;    
    }
    readonly damageSource;
}
export class PlayerDamagedInfo extends PlayerDamaged{
    constructor(player: MC.Entity, damageSource: MC.EntityDamageSource, damage: number){
        super(player, damageSource);
        this.damage = damage;    
    }
    readonly damage;
}
export class PlayerHealthChange extends PlayerEvent{
    constructor(player: MC.Entity, newValue:number, oldValue:number){
        super(player);
        this.newValue = newValue;
        this.oldValue = oldValue;
    }
    readonly newValue;
    readonly oldValue;
}
export class Events{
    get playerConnect(){return playerConnect}
    get playerDisconnect(){return playerDisconnect}
    get playerJoin(){return playerJoin}
    get playerRespawn(){return playerRespawn}
    get playerDie(){return playerDie};
    get playerHurt(){return playerHurt};
    get playerHealthChange(){return playerHealthChange;}
}
const playerConnect = new EventSignal<PlayerInfoEvent>;
const playerDisconnect = new EventSignal<PlayerInfoEvent>;
const playerJoin = new EventSignal<PlayerEvent>;
const playerRespawn = new EventSignal<PlayerEvent>;
const playerDie = new EventSignal<PlayerDamaged>;
const playerHurt = new EventSignal<PlayerDamagedInfo>;
const playerHealthChange = new EventSignal<PlayerHealthChange>;

MC.world.afterEvents.playerJoin.subscribe(ev=>playerConnect.trigger(new PlayerInfoEvent(ev.playerName,ev.playerId)));
MC.world.afterEvents.playerLeave.subscribe(ev=>playerConnect.trigger(new PlayerInfoEvent(ev.playerName,ev.playerId)));
MC.world.afterEvents.playerSpawn.subscribe(({initialSpawn,player})=>{if(initialSpawn) playerJoin.trigger(new PlayerEvent(player))});
MC.world.afterEvents.playerSpawn.subscribe(({initialSpawn,player})=>{if(!initialSpawn) playerRespawn.trigger(new PlayerEvent(player))});
MC.world.afterEvents.entityDie.subscribe(({deadEntity,damageSource})=>{playerDie.trigger(new PlayerDamaged(deadEntity,damageSource))},{entityTypes:["minecraft:player"]});
MC.world.afterEvents.entityHurt.subscribe(({hurtEntity,damage,damageSource})=>{playerHurt.trigger(new PlayerDamagedInfo(hurtEntity,damageSource,damage))},{entityTypes:["minecraft:player"]});
MC.world.afterEvents.entityHealthChanged.subscribe(({entity,newValue,oldValue})=>playerHealthChange.trigger(new PlayerHealthChange(entity,newValue,oldValue)),{entityTypes:["minecraft:player"]});

export const events = new Events;