import { Vector3 } from "@minecraft/server";
import { Vec3 } from "./Vec3";

export class CoordinateBase
{
	static get default() {return defaultBase as CoordinateBase;}
	constructor(xVec: Vector3, yVec: Vector3, zVec: Vector3){
		if(Vec3.dot(xVec,yVec) > 1e-5) throw Error("Vectors are not perpendicular.");
		if(Vec3.dot(yVec,zVec) > 1e-5) throw Error("Vectors are not perpendicular.");
		if(Vec3.dot(xVec,zVec) > 1e-5) throw Error("Vectors are not perpendicular.");
		this._x_ = xVec;
        this._y_ = yVec;
        this._z_ = zVec;
    }
    private _x_;
    private _y_;
    private _z_;
    set x(vec: Vector3){this._x_ = Vec3.from(vec);}
    set y(vec: Vector3){this._y_ = Vec3.from(vec);}
    set z(vec: Vector3){this._z_ = Vec3.from(vec);}
    get x(): Vec3{return Vec3.from(this._x_);}
    get y(): Vec3{return Vec3.from(this._y_);}
    get z(): Vec3{return Vec3.from(this._z_);}
    get inverted() {return CoordinateBase.invert(this);}
    get determinant() {return CoordinateBase.getDeterminant(this);} 
    static invert(base: CoordinateBase){
    	const {x: bx, y: by, z: bz} = base, iDet = 1/CoordinateBase.getDeterminant(base);
        return new CoordinateBase(
           Vec3((by.y*bz.z-bz.y*by.z)*iDet, (bx.z*bz.y-bx.y*bz.z)*iDet, (bx.y*by.z-bx.z*by.y)*iDet), 
           Vec3((by.z*bz.x-by.x*bz.z)*iDet, (bx.x*bz.z-bx.z*bz.x)*iDet, (by.x*bx.z-bx.x*by.z)*iDet), 
           Vec3((by.x*bz.y-bz.x*by.y)*iDet, (bz.x*bx.y-bx.x*bz.y)*iDet, (bx.x*by.y-by.x*bx.y)*iDet) 
        );
    }
    static getDeterminant({x: bx, y: by, z: bz}: CoordinateBase){
    	return bx.x * (by.y * bz.z - bz.y * by.z) -
           bx.y * (by.x * bz.z - by.z * bz.x) +
           bx.z * (by.x * bz.y - by.y * bz.x);
    }
    static applyBaseOnVector({x:bx, y:by, z:bz}: CoordinateBase, vec: Vector3){
    	return Vec3(
	       vec.x*bx.x+vec.y*by.x+vec.z*bz.x,
	       vec.x*bx.y+vec.y*by.y+vec.z*bz.y,
	       vec.x*bx.z+vec.y*by.z+vec.z*bz.z
        );
    }
    static *applyBaseOnVectors({x:bx, y:by, z:bz}: CoordinateBase, vecs: IterableIterator<Vec3>){
    	for(const vec of vecs) yield Vec3(
	        vec.x*bx.x+vec.y*by.x+vec.z*bz.x,
	        vec.x*bx.y+vec.y*by.y+vec.z*bz.y,
	        vec.x*bx.z+vec.y*by.z+vec.z*bz.z);
    } 
}
//@ts-ignore
CoordinateBase.prototype._x_ = Vec3(1,0,0);
//@ts-ignore
CoordinateBase.prototype._y_ = Vec3(0,1,0);
//@ts-ignore
CoordinateBase.prototype._z_ = Vec3(0,0,1);
const defaultBase = Object.setPrototypeOf({inverted:CoordinateBase.prototype.inverted}, CoordinateBase.prototype);