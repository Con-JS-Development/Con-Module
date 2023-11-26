//import type { Runnable } from "types";

declare module "@minecraft/server" {
    interface PlayerBreakBlockAfterEventSignal extends PromiseLike<PlayerBreakBlockAfterEvent>{}
    interface BlockExplodeAfterEventSignal extends PromiseLike<BlockExplodeAfterEvent>{}
    interface PlayerPlaceBlockAfterEventSignal extends PromiseLike<PlayerPlaceBlockAfterEvent>{}
    interface ButtonPushAfterEventSignal extends PromiseLike<ButtonPushAfterEvent>{}
    interface ChatSendAfterEventSignal  extends PromiseLike<ChatSendAfterEvent>{}
    interface DataDrivenEntityTriggerAfterEventSignal  extends PromiseLike<DataDrivenEntityTriggerAfterEvent>{}
    interface EffectAddAfterEventSignal  extends PromiseLike<EffectAddAfterEvent>{}
    interface EntityDieAfterEventSignal extends PromiseLike<EntityDieAfterEvent>{}
    interface EntityHealthChangedAfterEventSignal extends PromiseLike<EntityHealthChangedAfterEvent>{}
    interface EntityHitBlockAfterEventSignal  extends PromiseLike<EntityHitBlockAfterEvent>{}
    interface EntityHitEntityAfterEventSignal  extends PromiseLike<EntityHitEntityAfterEvent>{}
    interface EntityHurtAfterEventSignal extends PromiseLike<EntityHurtAfterEvent>{}
    interface EntityRemovedAfterEventSignal  extends PromiseLike<EntityRemoveAfterEvent>{}
    interface EntitySpawnAfterEventSignal extends PromiseLike<EntitySpawnAfterEvent> {}
    interface ExplosionAfterEventSignal  extends PromiseLike<ExplosionAfterEvent>{}
    interface ItemCompleteUseAfterEventSignal extends PromiseLike<ItemCompleteUseAfterEvent>{}
    interface ItemDefinitionAfterEventSignal extends PromiseLike<ItemDefinitionTriggeredAfterEvent>{}
    interface ItemReleaseUseAfterEventSignal  extends PromiseLike<ItemReleaseUseAfterEvent>{}
    interface ItemStartUseAfterEventSignal  extends PromiseLike<ItemStartUseAfterEvent>{}
    interface ItemStartUseOnAfterEventSignal  extends PromiseLike<ItemStartUseOnAfterEvent>{}
    interface ItemStopUseAfterEventSignal  extends PromiseLike<ItemStopUseAfterEvent>{}
    interface ItemStopUseOnAfterEventSignal  extends PromiseLike<ItemStopUseOnAfterEvent>{}
    interface ItemUseAfterEventSignal  extends PromiseLike<ItemUseAfterEvent>{}
    interface ItemUseOnAfterEventSignal  extends PromiseLike<ItemUseOnAfterEvent>{}
    interface LeverActionAfterEventSignal extends PromiseLike<LeverActionAfterEvent>{}
    interface ServerMessageAfterEventSignal  extends PromiseLike<MessageReceiveAfterEvent>{}
    interface PistonActivateAfterEventSignal extends PromiseLike<PistonActivateAfterEvent>{}
    interface PlayerJoinAfterEventSignal extends PromiseLike<PlayerJoinAfterEvent>{}
    interface PlayerLeaveAfterEventSignal extends PromiseLike<PlayerLeaveAfterEvent>{}
    interface PlayerSpawnAfterEventSignal  extends PromiseLike<PlayerSpawnAfterEvent>{}
    interface PressurePlatePopAfterEventSignal extends PromiseLike<PressurePlatePopAfterEvent>{}
    interface PressurePlatePushAfterEventSignal extends PromiseLike<PressurePlatePushAfterEvent>{}
    interface ProjectileHitEntityAfterEventSignal extends PromiseLike<ProjectileHitEntityAfterEvent>{}
    interface ProjectileHitBlockAfterEventSignal extends PromiseLike<ProjectileHitBlockAfterEvent>{}
    interface TargetBlockHitAfterEventSignal extends PromiseLike<TargetBlockHitAfterEvent>{}
    interface TripWireTripAfterEventSignal extends PromiseLike<TripWireTripAfterEvent>{}
    interface WeatherChangeAfterEventSignal extends PromiseLike<WeatherChangeAfterEvent>{}
    interface WorldInitializeAfterEventSignal extends PromiseLike<WorldInitializeAfterEvent>{}
    //-----Bebore
    interface EntityRemoveBeforeEventSignal extends PromiseLike<EntityRemoveBeforeEvent>{
        //cancel?: boolean
    }
    interface ChatSendBeforeEventSignal extends PromiseLike<ChatSendBeforeEvent>{
        //cancel?: boolean
    }
    interface DataDrivenEntityTriggerBeforeEventSignal extends PromiseLike<DataDrivenEntityTriggerBeforeEvent>{
        //cancel?: boolean
    }
    interface ExplosionBeforeEventSignal  extends PromiseLike<ExplosionBeforeEvent>{
        //cancel?: boolean
    }
    interface ItemDefinitionBeforeEventSignal extends PromiseLike<ItemDefinitionTriggeredBeforeEvent>{
        //cancel?: boolean
    }
    interface ItemUseBeforeEventSignal extends PromiseLike<ItemUseBeforeEvent>{
        //cancel?: boolean
    }
    interface ItemUseOnBeforeEventSignal extends PromiseLike<ItemUseOnBeforeEvent>{
        //cancel?: boolean
    }
    interface PistonActivateBeforeEventSignal  extends PromiseLike<PistonActivateBeforeEvent>{
        //cancel?: boolean
    }
    interface PlayerBreakBlockBeforeEventSignal extends PromiseLike<PlayerBreakBlockBeforeEvent>{
        //cancel?: boolean
    }
    interface PlayerPlaceBlockBeforeEventSignal extends PromiseLike<PlayerPlaceBlockBeforeEvent>{
        //cancel?: boolean
    }
    interface EntityRemoveBeforeEventSignal extends PromiseLike<EntityRemoveBeforeEvent>{
    }
    //-----System
    interface WatchdogTerminateBeforeEventSignal extends PromiseLike<WatchdogTerminateBeforeEvent>{
        //cancel?: boolean
    }
    interface ScriptEventCommandMessageAfterEventSignal extends PromiseLike<ScriptEventCommandMessageAfterEvent>{
    }
    //-----Custom
    interface WorldAfterEvents{
        readonly playerDie: PlayerDieAfterEventSignal;
        readonly playerHurt: PlayerHurtAfterEventSignal;
        readonly playerHealthChanged: PlayerHealthChangedAfterEventSignal;
        readonly playerHitEntity: PlayerHitEntityAfterEventSignal;
        readonly playerHitBlock: PlayerHitBlockAfterEventSignal;
    }
}
import * as MC from "@minecraft/server";
interface PlayerDieAfterEventSignal extends PromiseLike<PlayerDieAfterEvent>{
    subscribe<T extends ()=>any>(callback: T): T
    unsubscribe<T extends ()=>any>(callback: T): T
}
interface PlayerDieAfterEvent extends MC.EntityDieAfterEvent{ readonly deadEntity: MC.Player}

interface PlayerHurtAfterEventSignal extends PromiseLike<PlayerHurtAfterEvent>{
    subscribe<T extends ()=>any>(callback: T): T
    unsubscribe<T extends ()=>any>(callback: T): T
}
interface PlayerHurtAfterEvent extends MC.EntityHurtAfterEvent{ readonly hurtEntity: MC.Player}

interface PlayerHealthChangedAfterEventSignal extends PromiseLike<PlayerHealthChangedAfterEvent>{
    subscribe<T extends ()=>any>(callback: T): T
    unsubscribe<T extends ()=>any>(callback: T): T
}
interface PlayerHealthChangedAfterEvent extends MC.EntityHealthChangedAfterEvent{ readonly entity: MC.Player}

interface PlayerHitEntityAfterEventSignal extends PromiseLike<PlayerHitEntityAfterEvent>{
    subscribe<T extends ()=>any>(callback: T): T
    unsubscribe<T extends ()=>any>(callback: T): T
}
interface PlayerHitEntityAfterEvent extends MC.EntityHitEntityAfterEvent{ readonly damagingEntity: MC.Player}
interface PlayerHitBlockAfterEventSignal extends PromiseLike<PlayerHitBlockAfterEvent>{
    subscribe<T extends ()=>any>(callback: T): T
    unsubscribe<T extends ()=>any>(callback: T): T
}
interface PlayerHitBlockAfterEvent extends MC.EntityHitBlockAfterEvent{ readonly damagingEntity: MC.Player}
export declare var PlayerDieAfterEventSignal: {new():PlayerDieAfterEventSignal,readonly prototype: PlayerDieAfterEventSignal};
export declare var PlayerHurtAfterEventSignal: {new():PlayerHurtAfterEventSignal,readonly prototype: PlayerHurtAfterEventSignal};
export declare var PlayerHealthChangedAfterEventSignal: {new():PlayerHealthChangedAfterEventSignal,readonly prototype: PlayerHealthChangedAfterEventSignal};
export declare var PlayerHitEntityAfterEventSignal: {new():PlayerHitEntityAfterEventSignal,readonly prototype: PlayerHitEntityAfterEventSignal};
export declare var PlayerHitBlockAfterEventSignal: {new():PlayerHitBlockAfterEventSignal,readonly prototype: PlayerHitBlockAfterEventSignal};