import { Dimension,
    BlockPermutation,BlockType,Block } from "@minecraft/server";
import { OverTakes } from "core";
import {BlockRaycastHit} from "../New/index";

declare module "@minecraft/server" {
    interface Dimension {
        toString(): string,
        setBlock(location: Vector3, data: BlockPermutation | BlockType | string): void;
        placeBlock(location: Vector3, data: BlockPermutation | BlockType | string): boolean;
        getBlockFromRay(location: Vector3, direction: Vector3, options?: BlockRaycastOptions): BlockRaycastHit
        validBlockLocation(location: Vector3): boolean
    }
}
OverTakes(Dimension.prototype, {
    toString(){return `[${this.constructor.name}: ${this.id}]`;},
    setBlock(location, data) {
        const block = super.getBlock(location);
        if(data as unknown as object instanceof BlockPermutation) return block.setPermutation(data);
        return block.setType(data);
    },
    placeBlock(location, data) {
        const block = super.getBlock(location);
        if(!block.isAir) return false;
        if(data as unknown as object instanceof BlockPermutation) block.setPermutation(data);
        else block.setType(data);
        return true;
    },
    getBlockFromRay(location, direction, options) {
        const data = super.getBlockFromRay(...[location,direction,options]);
        if(data) return Object.setPrototypeOf(data,BlockRaycastHit.prototype);
    },
    validBlockLocation({y}){
        const {max,min} = super.heightRange;
        return y >= min && y <= max;
    }
});