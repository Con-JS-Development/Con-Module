import { Vec3 } from "./Vec3";
import { CoordinateBase } from "./CoordinateBase";
import { GeneratorFunction } from "core/engine";

export const GeometryGenerator = {
    *from(iterable){for(const vec of iterable) yield Vec3.from(vec);},
    *circle(r, rMin = 0, y = 0){
        let rr = r**2, rrMin = rMin**2;
        for (let x = -r, xx = x**2; x < r; x++, xx = x**2)
            if (xx < rr && xx >= rrMin) for (let z = -r, zz = xx + z**2; z < r; z++, zz = xx + z**2) 
                if(zz < rr && zz >= rrMin) yield {x,y,z,__proto__:Vec3.prototype};
    },
    *cylinder(r, height, rMin = 0){
        for(let y = 0; y < height; y++)
            yield* GeometryGenerator.circle(r,rMin,y);
    },
    *cubeFromTo(from, to){
        const [
            {x:xFrom,y:yFrom,z:zFrom},
            {x:xTo,y:yTo,z:zTo},
        ] = Vec3.sort(from,to);
        for (let y = yFrom; y < yTo; y++) 
            for (let x = xFrom; x < xTo; x++)
                for (let z = zFrom; z < zTo; z++) yield {x,y,z,__proto__:Vec3.prototype};
    },
    *cubeFromSize({x:xSize,y:ySize,z:zSize}){
        for (let y = 0; y < ySize; y++) 
            for (let x = 0; x < xSize; x++)
                for (let z = 0; z < zSize; z++) yield {x,y,z,__proto__:Vec3.prototype};
    },
    *sphereRadius(r, rIn = 0){
        const rP = r**2, rMinP = rIn**2;
        for (let x = -r, XX = x**2; x < r; x++, XX = x**2) {
            if (XX < rP && XX >= rMinP) for (let y = -r, YY = XX + y**2; y < r; y++, YY = XX + y**2)
                if (YY < rP && YY >= rMinP) for (let z = -r, ZZ = YY + z**2; z < r; z++, ZZ = YY + z**2)
                    if (ZZ < rP && ZZ >= rMinP) yield {x,y,z,__proto__:Vec3.prototype};
        }
    },
    *elipsoide({x:xVec,y:yVec,z:zVec}){
        const xrP = xVec**2;
        const yrP = yVec**2;
        const zrP = zVec**2;
        const xAdder = 1/xVec;
        const yAdder = 1/yVec;
        const zAdder = 1/zVec;
        for (let x = -1, XX = xrP; x < 1; x+=xAdder, XX = (x*xVec)**2) {
            if (XX < xrP) for (let y = -1, YY = yrP; y < 1; y+=yAdder, YY = (x*yVec)**2 + (y*yVec)**2)
                if (YY < yrP) for (let z = -1, ZZ = zrP; z < 1; z+=zAdder, ZZ = (x*zVec)**2 + (y*zVec)**2 + (z*zVec)**2)
                    if (ZZ < zrP) yield {x:x*xVec,y:y*yVec,z:z*zVec,__proto__:Vec3.prototype};
        }
    },
    *pathFromTo(from, to){
        const {x:x1,y:y1,z:z1} = Vec3.subtract(to,from);
        const maxs = {x:Math.abs(x1), y:Math.abs(y1), z:Math.abs(z1)};
        const key = maxs.x > maxs.z ? (maxs.x > maxs.y?"x":"y") : (maxs.z > maxs.y?"z":"y"), n = maxs[key];
        const xd = x1/n, yd = y1/n, zd = z1/n;
        let xc = xd, yc = yd, zc  = zd;
        for (let i = 0; i < n; i++){
            yield Vec3.add(from,{x:xc, y:yc, z:zc});
            xc+=xd, yc+= yd, zc += zd;
        }
        yield Vec3.add(from,{x:x1,y:y1,z:z1});
    },
    *pathFromDirection(size){
        const {x:x1,y:y1,z:z1} = size;
        const maxs = {x:Math.abs(x1), y:Math.abs(y1), z:Math.abs(z1)};
        const key = maxs.x > maxs.z ? (maxs.x > maxs.y?"x":"y") : (maxs.z > maxs.y?"z":"y"), n = maxs[key];
        const xd = x1/n, yd = y1/n, zd = z1/n;
        let xc = xd, yc = yd, zc  = zd;
        for (let i = 0; i < n; i++){
            yield {x:xc, y:yc, z:zc, __proto__:Vec3.prototype};
            xc+=xd, yc+= yd, zc += zd;
        }
        yield {x:x1,y:y1,z:z1, __proto__: Vec3.prototype};
    },
    *spread(deeps,vectors,mode="push"){
        const modeMethod = Array.prototype[mode];
        const vecs = vectors??[Vec3.down,Vec3.left,Vec3.right,Vec3.backward,Vec3.forward,Vec3.up], array = [{loc:Vec3.zero,dp:0}], registry = {};
        while (array.length > 0) {
            const {loc, dp} = array.shift(), key = `${loc.x}.${loc.y}.${loc.z}`;
            if(dp < deeps && !registry[key]){
                registry[key] = true;
                let yi = yield Vec3.from(loc);
                if(!yi) continue;
                for (const vec of vecs) modeMethod.call(array,{loc:vec.add(loc),dp:dp+1});
            }
        }
    },
    *fluid(depth,mode="push"){
        const modeMethod = Array.prototype[mode];
        const vecs = [Vec3.down,Vec3.left,Vec3.right,Vec3.backward,Vec3.forward], array = [{loc:Vec3.zero,dp:depth}], registry = {};
        while (array.length > 0) {
            const {loc, dp} = array.shift(), key = `${loc.x}.${loc.y}.${loc.z}`;
            if(dp && !registry[key]){
                registry[key] = true;
                if(!(yield Vec3.from(loc))) continue;
                for (const vec of vecs) modeMethod.call(array,{loc:vec.add(loc),dp:dp-1});
            }
        }
    },
    *soak(depth){
        const modeMethod = Array.prototype.push;
        const vecs = [Vec3.down,Vec3.left,Vec3.right,Vec3.backward,Vec3.forward], array = [{loc:Vec3.zero,dp:depth}], registry = {}, up = Vec3.up;
        while (array.length > 0) {
            const {loc, dp} = array.shift(), key = `${loc.x}.${loc.y}.${loc.z}`;
            if(dp && !registry[key]){
                registry[key] = true;
                if(!(yield Vec3.from(loc))) continue;
                array.unshift({loc:up.add(loc),dp:dp-1});
                for (const vec of vecs) modeMethod.call(array,{loc:vec.add(loc),dp:dp-1});
            }
        }
    }
}
export const Shapes = {};
export const ShapeGeneratorPrototype = {
    get nextValue(){return this.next();},
    get inverted(){return ShapeGeneratorPrototypeFunctions.invert.call(this);},
    get normalized(){return ShapeGeneratorPrototypeFunctions.normalize.call(this);},
    __proto__: GeneratorFunction.prototype
};
const ShapeGeneratorPrototypeFunctions = {
    *cross(vec){
        let values = this.next();
        while (!values.done) values = this.next(yield Vec3.cross(values.value,vec));
        return values.value;
    },
    *projection(vec){
        let values = this.next();
        while (!values.done) values = this.next(yield Vec3.projection(values.value,vec));
        return values.value;
    },
    *rejection(vec){
        let values = this.next();
        while (!values.done) values = this.next(yield Vec3.rejection(values.value,vec));
        return values.value;
    },
    *reflect(vec){
        let values = this.next();
        while (!values.done) values = this.next(yield Vec3.reflect(values.value,vec));
        return values.value;
    },
    *normalize(){
        let values = this.next();
        while (!values.done) values = this.next(yield Vec3.magnitude(values.value));
        return values.value;
    },
    *multiply(num){
        let values = this.next();
        while (!values.done) values = this.next(yield Vec3.multiply(values.value,num));
        return values.value;
    },
    *add({x:x1,y:y1,z:z1}){
        let values = this.next();
        while (!values.done){
            const {x,y,z} = values.value;
            values = this.next(yield {x:x + x1,y:y+y1,z:z + z1,__proto__:Vec3.prototype});
        }
        return values.value;
    },
    *invert(){
        let values = this.next();
        while (!values.done){
            const {x,y,z} = values.value;
            values = this.next(yield {x:-x,y:-y,z:-z,__proto__:Vec3.prototype});
        }
        return values.value;
    },
    /**@param {CoordinateBase} base */
    *applyBase(base){return yield * CoordinateBase.applyBaseOnVectors(base,this);},
    offset(vec){return ShapeGeneratorPrototypeFunctions.add.call(this,vec);}
}
for (const key of Object.getOwnPropertyNames(ShapeGeneratorPrototypeFunctions)) {
    const Func = ShapeGeneratorPrototypeFunctions[key];
    Func.prototype = ShapeGeneratorPrototype;
    ShapeGeneratorPrototype[key] = Func;
}
for (const key of Object.getOwnPropertyNames(GeometryGenerator)) {
    const value = GeometryGenerator[key];
    value.prototype = ShapeGeneratorPrototype;
    Shapes[key] = key;
}