import * as MC from "@minecraft/server";
import { Vec3 } from "core";

export class BlockRaycastHit implements MC.Vector3, MC.BlockRaycastHit{
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly block: MC.Block;
    readonly face: MC.Direction;
    readonly faceLocation: MC.Vector3;
    readonly faceVetor: Vec3;
}
declare module "@minecraft/server" {
    interface BlockRaycastHit{
        readonly x: number;
        readonly y: number;
        readonly z: number;
        readonly faceVetor: Vec3;
    }
}