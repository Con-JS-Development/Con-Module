import { Vec3 } from "core";

export class BlockRaycastHit{
    get x(){return this.block.x + this.faceLocation.x;}
    get y(){return this.block.y + this.faceLocation.y;}
    get z(){return this.block.z + this.faceLocation.z;}
    get faceVector(){return Vec3[this.face];}
    get distance(){return Vec3.magnitude(this);}
}