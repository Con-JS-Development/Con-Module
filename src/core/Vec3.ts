import { Vector3 } from "@minecraft/server";


export interface Vec3 extends Vector3{
    /**
     * Adds two vectors.
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns  The sum of the two vectors.
     */
    add(vec: Vector3): Vec3;
    /**
     * Subtracts the second vector from the first vector.
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns  The difference of the two vectors.
     */
    subtract(vec: Vector3): Vec3;
    /**
     * Multiplies a vector by a scalar value.
     * @param a - The vector to be multiplied.
     * @param num - The scalar value to multiply the vector by.
     * @returns  The product of the vector and the scalar value.
     */
    multiply(num: number | Vector3): Vec3;
    readonly length: number;
    readonly normalized: Vec3;
}
type Vec3Constructor = {
    new(x:number, y?: number, z?:number): Vec3,
    (x:number, y?: number, z?:number): Vec3,
    /**
     * Adds two vectors.
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns  The sum of the two vectors.
     */
    add(a: Vector3, b: Vector3): Vec3;
    /**
     * Subtracts the second vector from the first vector.
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns  The difference of the two vectors.
     */
    subtract(a: Vector3, b: Vector3): Vec3;
    /**
     * Multiplies a vector by a scalar value.
     * @param v - The vector to be multiplied.
     * @param n - The vector or scalar value to multiply the vector by.
     * @returns  The product of the vector and the scalar value.
     */
    multiply(v:Vector3, n: number | Vector3): Vec3;
    /**
    * Calculates magnitude (length) of given vector
    * @param a-The vector to calculate magnitude of
    * @returns -The magnitude (length) of given vector
    */
    magnitude(vec: Vector3): number,
    /**
    * Normalizes given vector to have magnitude (length) of 1
    * @param a-The vector to normalize
    * @returns -The normalized vector
    */
    normalize(vec: Vector3): Vec3,
    /**
     * Calculates the cross product of two vectors.
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns  The cross product of the two vectors.
     */
    cross(a: Vector3,b: Vector3): Vec3,
    /**
     * Calculates the dot product of two vectors.
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns The dot product of the two vectors.
     */
    dot(a:Vector3, b: Vector3): number,
    /**
    * Calculates angle between two vectors in radians
    * @param a-The first vector
    * @param b-The second vector
    * @returns -The angle between two vectors in radians
    */
    angleBetween(a: Vector3, b:Vector3): number,
    
    /**
    * Calculates projection of 'a' onto 'b'
    * @param a-First Vector to project onto second Vector
    * @param b-Second Vector onto which first is projected
    * @returns -The projection of 'a' onto 'b'
    */
    projection(a: Vector3, b: Vector3): Vec3
    /**
    * Calculates rejection of 'a' from 'b'
    * @param a-First Vector to reject from second Vector
    * @param b-Second Vector from which first is rejected
    * @returns -The rejection of 'a' from 'b'
    */
    rejection(a: Vector3, b:Vector3): Vec3
    /**
    * Calculates distance between two points
    * @param a-First point represented as a vector
    * @param b-Second point represented as a vector
    * @returns -The distance between points represented by vectors 'a' and 'b'
    */
    distance(a: Vector3, b: Vector3): number    /**
    * Reflects a vector across a given normal vector.
    * @param v - The vector to reflect.
    * @param n - The normal vector to reflect across.
    * @returns  The reflected vector.
    */
    reflect(v: Vector3, n: Vector3): Vec3
    /**
     * Calculates the linear interpolation between two vectors.
     * @param a - The first vector.
     * @param b - The second vector.
     * @param t - The interpolation parameter. Should be between 0 and 1.
     * @returns  The interpolated vector.
     */
    lerp(a: Vector3, b: Vector3, t: number): Vector3;
    from(object: any): Vec3
    prototype: Vec3
};
export const Vec3: Vec3Constructor = function Vec3(this: Vec3,x:number = 0, y: number = 0, z:number = 0){
    if(new.target){
        this.x=Number(x);
        this.y=Number(y);
        this.z=Number(z);
    } else return Object.setPrototypeOf({x:Number(x),y:Number(y),z:Number(z)}, Vec3.prototype);
} as Vec3Constructor
Vec3.prototype = {
    add(vec: Vector3){return Vec3.add(this,vec);},
    subtract(vec: Vector3){return Vec3.subtract(this,vec);},
    multiply(num: number|Vector3){return Vec3.multiply(this,num);},
    get length(){return Vec3.magnitude(this);},
    get normalized(){return Vec3.normalize(this);},
    x: 0,
    y: 0,
    z: 0
} as Vec3
Vec3.magnitude = function magnitude(vec: Vector3){return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);}
Vec3.normalize = function normalize(vec: Vector3){const l = Vec3.magnitude(vec); return Vec3(vec.x/l, vec.y/l, vec.z/l); }
Vec3.cross=function crossProduct(a: Vector3, b: Vector3) {return Vec3(a.y * b.z - a.z * b.y, (a.z * b.x - a.x * b.z),a.x * b.y - a.y * b.x);}
Vec3.dot=function dot(a: Vector3, b: Vector3){return a.x * b.x + a.y * b.y + a.z * b.z;}
Vec3.angleBetween = function angleBetween(a: Vector3,b: Vector3){return Math.acos(Vec3.dot(a,b)/(Vec3.magnitude(a)*Vec3.magnitude(b)));}
Vec3.subtract = function subtract(a: Vector3, b: Vector3){return Vec3(a.x-b.x,a.y-b.y,a.z-b.z)};
Vec3.add = function add(a: Vector3, b: Vector3){return Vec3(a.x+b.x,a.y+b.y,a.z+b.z)};
Vec3.multiply = function multiply(vec: Vector3,num: number|Vector3){
    if(typeof num == "number") return Vec3(vec.x*num, vec.y*num, vec.z*num);
    else return Vec3(vec.x*num.x,vec.y*num.y,vec.z*num.z);
}
Vec3.projection = function projection(a: Vector3,b: Vector3){return Vec3.multiply(b,Vec3.dot(a,b)/((b.x * b.x + b.y * b.y + b.z * b.z)**2));}
Vec3.rejection = function rejection(a: Vector3,b: Vector3){return Vec3.subtract(a,Vec3.projection(a,b));}
Vec3.reflect = function reflect(v: Vector3, n: Vector3) {return Vec3.subtract(v, Vec3.multiply(n, 2 * Vec3.dot(v, n)));}
Vec3.lerp = function lerp(a:Vector3, b:Vector3, t: number) {return Vec3.multiply(a, 1 - t).add(Vec3.multiply(b,t));}
Vec3.distance = function distance(a: Vector3,b: Vector3){return Vec3.magnitude(Vec3.subtract(a,b));}
Vec3.from = function from(object: any){
    if(Array.isArray(object)) return Vec3(object[0],object[1],object[2]);
    const {x=0,y=0,z=0} = object??{};
    return Object.setPrototypeOf({x:Number(x),y:Number(y),z:Number(z)},Vec3.prototype);
}