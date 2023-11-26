import { Block, DimensionLocation, Vector3 } from "@minecraft/server";
import { Vec3 } from "core/utils/classes/Vec3";

class Area {
    protected constructor(){}
    protected __inside(loc: Vector3){return false;}
    isInside(loc: Vector3){
        return this.__inside(loc);
    }
}
export class CyrcularArea extends Area{
    private __dimension;
    private __entry;
    private __radius;
    constructor(entry: DimensionLocation,radius: number){
        super();
        this.__dimension = entry.dimension;
        this.__entry = entry;
        this.__radius = radius;
    }
    __inside(loc: Vector3 | Block){
        const bool = Vec3.subtract(loc,this.__entry).length <= this.__radius;
        if(loc instanceof Block) return loc.dimension === this.__dimension && bool;
        else return bool;
    }
}