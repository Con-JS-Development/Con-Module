import { Kernel } from "core/engine";
import { Vec3 } from "./Vec3";

export class CoordinateBase
{
	static get default() {return defaultBase;}
	constructor(xVec, yVec, zVec){
		this._x_ = Vec3.from(xVec);
        this._y_ = Vec3.from(yVec);
        this._z_ = Vec3.from(zVec);
    }
    set x(vec){this._x_ = Vec3.from(vec);}
    set y(vec){this._y_ = Vec3.from(vec);}
    set z(vec){this._z_ = Vec3.from(vec);}
    get x(){return this._x_;}
    get y(){return this._y_;}
    get z(){return this._z_;}
    get inverted() {return CoordinateBase.invert(this);}
    get determinant() {return CoordinateBase.getDeterminant(this);}
    get isPerpendicular(){return CoordinateBase.isPerpendicular(this);}
    passLocalCoordinate(vec){return CoordinateBase.applyBaseOnVector(this,vec);}
    passLocalCoordinates(vecs){return CoordinateBase.applyBaseOnVectors(this,vecs)};
    static invert(base){
    	const {x: bx, y: by, z: bz} = base, iDet = 1/CoordinateBase.getDeterminant(base);
        return new CoordinateBase(
           {x:(by.y*bz.z-bz.y*by.z)*iDet, y:(bx.z*bz.y-bx.y*bz.z)*iDet, z:(bx.y*by.z-bx.z*by.y)*iDet}, 
           {x:(by.z*bz.x-by.x*bz.z)*iDet, y:(bx.x*bz.z-bx.z*bz.x)*iDet, z:(by.x*bx.z-bx.x*by.z)*iDet}, 
           {x:(by.x*bz.y-bz.x*by.y)*iDet, y:(bz.x*bx.y-bx.x*bz.y)*iDet, z:(bx.x*by.y-by.x*bx.y)*iDet} 
        );
    }
    static getDeterminant({x: bx, y: by, z: bz}){
    	return bx.x * (by.y * bz.z - bz.y * by.z) -
           bx.y * (by.x * bz.z - by.z * bz.x) +
           bx.z * (by.x * bz.y - by.y * bz.x);
    }
    static applyBaseOnVector({x:bx, y:by, z:bz}, vec){
    	return Vec3(
	       vec.x*bx.x+vec.y*by.x+vec.z*bz.x,
	       vec.x*bx.y+vec.y*by.y+vec.z*bz.y,
	       vec.x*bx.z+vec.y*by.z+vec.z*bz.z
        );
    }
    static *applyBaseOnVectors({x:bx, y:by, z:bz}, vecs){
        if(typeof vecs[Symbol.iterator] !== "function") throw new TypeError("vectors parameter is not iterable.");
        const iterator = vecs[Symbol.iterator]();
        let result = iterator.next();
        while (!result.done) {
            const {value:vec} = result;
            result = iterator.next(yield Vec3(
                vec.x*bx.x+vec.y*by.x+vec.z*bz.x,
                vec.x*bx.y+vec.y*by.y+vec.z*bz.y,
                vec.x*bx.z+vec.y*by.z+vec.z*bz.z
            ));
        }
        return result.value;
    }
    static isPerpendicular({x:xVec,y:yVec,z:zVec}){
        return (Vec3.dot(xVec,yVec) > 1e-5)&&(Vec3.dot(yVec,zVec) > 1e-5)&&(Vec3.dot(xVec,zVec) > 1e-5)
    }
    static fromZVec(zVec){
        zVec = Vec3.normalize(zVec);
        let xVec = Vec3(-zVec.z, 0, zVec.x).normalized;
        let yVec = Vec3.cross(xVec,zVec).normalized;
        return new CoordinateBase(xVec,yVec,zVec);
    }
}
CoordinateBase.prototype._x_ = Vec3(1,0,0);
CoordinateBase.prototype._y_ = Vec3(0,1,0);
CoordinateBase.prototype._z_ = Vec3(0,0,1);
const defaultBase = Kernel.__setPrototypeOf({inverted:CoordinateBase.prototype.inverted},CoordinateBase.prototype);