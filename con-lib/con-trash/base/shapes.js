import { GeneratorFunction } from '../../JS/build-ins.js';

export const GeometryGenerator = {
    *square({x:x1,y = 0,z:z1}, {x:x2 = 0,z:z2 = 0} = {}){
        const xMin = (x1 - x2)/2, xMax = xMin + x2, zMin = (z1 - z2)/2, zMax = zMin + z2;
        for (let x = 0; x < x1; x++)
            if(x < xMin || x > xMax) for (let z = 0; z < z1; z++)
                if(z < zMin || z > zMax) yield {x,y,z};
    },
    *circle(r, rMin = 0, y = 0){
        let rr = r**2, rrMin = rMin**2;
        for (let x = -r, xx = x**2; x < r; x++, xx = x**2)
            if (xx < rr && xx >= rrMin) for (let z = -r, zz = xx + z**2; z < r; z++, zz = xx + z**2) 
                if(zz < rr && zz >= rrMin) yield {x,y,z};
    },
    *cylinder(r, height, rMin = 0){
        for(let y = 0; y < height; y++)
            yield* this.circle(r,rMin,y);
    },
    *cube({x,y:yS,z},{x:x2 = 0,y:y2 = 0,z:z2 = 0} = {}){
        const yMin = (yS - y2)/2, yMax = yMin + y2;
        for (let y = 0; y < yS; y++)
           if(y < yMin || y > yMax) yield* this.square({x,y,z},{x:x2,z:z2});
    },
    *sphere(r, rIn = 0){
        let rP = r**2, rMinP = rIn**2;
        for (let x = -r, XX = x**2; x < r; x++, XX = x**2) {
            if (XX < rP && XX >= rMinP) for (let y = -r, YY = XX + y**2; y < r; y++, YY = XX + y**2)
                if (YY < rP && YY >= rMinP) for (let z = -r, ZZ = YY + z**2; z < r; z++, ZZ = YY + z**2)
                    if (ZZ < rP && ZZ >= rMinP) yield {x,y,z};
        }
    },
    *path({x:x1,y:y1,z:z1}){
        const maxs = {x:Math.abs(x1), y:Math.abs(y1), z:Math.abs(z1)};
        const key = maxs.x > maxs.z ? (maxs.x > maxs.y?"x":"y") : (maxs.z > maxs.y?"z":"y"), n = maxs[key];
        const xd = x1/n, yd = y1/n, zd = z1/n;
        let xc = xd, yc = yd, zc  = zd;
        for (let i = 0; i < n; i++){
            yield {x:xc, y:yc, z:zc};
            xc+=xd, yc+= yd, zc += zd;
        }
        yield {x:x1,y:y1,z:z1};
    },
    *fluidFill(track,...vectors){
        if(vectors.length == 0){
            console.warn("Set all");
            vectors = FillVectors.all;
        }
        const array = [];
        const registry = {};
        array.push({loc:{x:0,y:0,z:0},dp:0});
        while (array.length > 0) {
            const {loc, dp} = array.shift(), key = `${loc.x}.${loc.y}.${loc.z}`;
            if(dp < track && !registry[key]){
                registry[key] = true;
                let yi = yield loc;
                if(!yi) continue;
                for (const {x,y,z} of vectors) {
                    array.push({loc:{x:x + loc.x,y:y+loc.y,z:z+loc.z},dp:dp+1});
                }
            }
        }
    }
}


const GeometryPrototype = Object.setPrototypeOf({
    *offSet({x:x1,y:y1,z:z1}){
        let values = this.next();
        while (!values.done){
            const {x,y,z} = values.value;
            values = this.next(yield {x:x + x1,y:y+y1,z:z + z1});
        }
        return values.value;
    },
    get nextValue(){
        return this.next();
    }
}, GeneratorFunction.prototype);
GeometryPrototype.offSet.prototype = GeometryPrototype;
export const FillVectors = {
    up:{x:0,y:1,z:0},
    down:{x:0,y:-1,z:0},
    back:{x:0,y:0,z:-1},
    forward:{x:0,y:0,z:1},
    right:{x:1,y:0,z:0},
    left:{x:-1,y:0,z:0}
}
FillVectors.all = Object.getOwnPropertyNames(FillVectors).map(k=>FillVectors[k]);
export const Shapes = {};
for (const key of Object.getOwnPropertyNames(GeometryGenerator)) {
    const value = GeometryGenerator[key];
    value.prototype = GeometryPrototype;
    Shapes[key] = key;
}