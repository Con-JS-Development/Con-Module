import { Block, BlockInventoryComponent, Direction } from "@minecraft/server";
import { OverTakes, Vec3 } from "core";

declare module "@minecraft/server" {
    interface Block {
        toString(): string,
        readonly container?: Container
        readonly inventory?: BlockInventoryComponent
        readonly canBeWaterlogged: boolean
    }
}
OverTakes(Block.prototype, {
    toString(){ return `[${this.constructor.name}: bob: ${this.typeId}]`;},
    get inventory(){return super.getComponent(BlockInventoryComponent.componentId);},
    get container(){return super.getComponent(BlockInventoryComponent.componentId)?.container;},
    get canBeWaterlogged(){return super.type?.canBeWaterlogged;}
});