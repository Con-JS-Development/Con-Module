/**
 * Adds two vectors.
 * @param {import("minecraft/server").Vector3} a - The first vector.
 * @param {import("minecraft/server").Vector3} b - The second vector.
 * @returns {import("minecraft/server").Vector3} The sum of the two vectors.
 */
export function addVectors(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + b.z
    };
}

/**
 * Subtracts the second vector from the first vector.
 * @param {import("minecraft/server").Vector3} a - The first vector.
 * @param {import("minecraft/server").Vector3} b - The second vector.
 * @returns {import("minecraft/server").Vector3} The difference of the two vectors.
 */
export function subtractVectors(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - b.z
    };
}

/**
 * Multiplies a vector by a scalar value.
 * @param {import("minecraft/server").Vector3} a - The vector to be multiplied.
 * @param {number} s - The scalar value to multiply the vector by.
 * @returns {import("minecraft/server").Vector3} The product of the vector and the scalar value.
 */
export function multiplyVectorByScalar(a, s) {
    return {
        x: a.x * s,
        y: a.y * s,
        z: a.z * s
    };
}

/**
 * Calculates the dot product of two vectors.
 * @param {import("minecraft/server").Vector3} a - The first vector.
 * @param {import("minecraft/server").Vector3} b - The second vector.
 * @returns {number} The dot product of the two vectors.
 */
export function dotProduct(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

/**
 * Calculates the cross product of two vectors.
 * @param {import("minecraft/server").Vector3} a - The first vector.
 * @param {import("minecraft/server").Vector3} b - The second vector.
 * @returns {import("minecraft/server").Vector3} The cross product of the two vectors.
 */
export function crossProduct(a, b) {
    return {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x
    };
}

/**
* Calculates magnitude (length) of given vector
* @param {import("minecraft/server").Vector3}a-The vector to calculate magnitude of
* @returns {number}-The magnitude (length) of given vector
*/
export function magnitude(a){
    return Math.sqrt(a.x**2+a.y**2+a.z**2);
}

/**
* Normalizes given vector to have magnitude (length) of 1
* @param {import("minecraft/server").Vector3}a-The vector to normalize
* @returns {import("minecraft/server").Vector3}-The normalized vector
*/
export function normalize(a){
    let m = magnitude(a);
    return{
        x:a.x/m,
        y:a.y/m,
        z:a.z/m
    };
}

/**
* Calculates angle between two vectors in radians
* @param {import("minecraft/server").Vector3}a-The first vector
* @param {import("minecraft/server").Vector3}b-The second vector
* @returns {number}-The angle between two vectors in radians
*/
export function angleBetweenVectors(a,b){
    let dot = dotProduct(a,b);
    let ma = magnitude(a);
    let mb = magnitude(b);
    return Math.acos(dot/(ma*mb));
}

/**
* Calculates projection of 'a' onto 'b'
* @param {import("minecraft/server").Vector3}a-First Vector to project onto second Vector
* @param {import("minecraft/server").Vector3}b-Second Vector onto which first is projected
* @returns {import("minecraft/server").Vector3}-The projection of 'a' onto 'b'
*/
export function vectorProjection(a,b){
    let dot = dotProduct(a,b);
    let mb = magnitude(b);
    let s = dot/(mb**2);
    return multiplyVectorByScalar(b,s);
}

/**
* Calculates rejection of 'a' from 'b'
* @param {import("minecraft/server").Vector3}a-First Vector to reject from second Vector
* @param {import("minecraft/server").Vector3}b-Second Vector from which first is rejected
* @returns {import("minecraft/server").Vector3}-The rejection of 'a' from 'b'
*/
export function vectorRejection(a,b){
    let p =vectorProjection(a,b);
    return subtractVectors(a,p);
}

/**
* Calculates distance between two points
* @param {import("minecraft/server").Vector3}a-First point represented as a vector
* @param {import("minecraft/server").Vector3}b-Second point represented as a vector
* @returns {number}-The distance between points represented by vectors 'a' and 'b'
*/
export function distanceBetweenPoints(a,b){
    let d = subtractVectors(a,b);
    return magnitude(d);
}

/**
 * Reflects a vector across a given normal vector.
 * @param {import("minecraft/server").Vector3} v - The vector to reflect.
 * @param {import("minecraft/server").Vector3} n - The normal vector to reflect across.
 * @returns {import("minecraft/server").Vector3} The reflected vector.
 */
export function reflectVector(v, n) {
    let d = dotProduct(v, n);
    return subtractVectors(v, multiplyVectorByScalar(n, 2 * d));
}

/**
 * Calculates the linear interpolation between two vectors.
 * @param {import("minecraft/server").Vector3} a - The first vector.
 * @param {import("minecraft/server").Vector3} b - The second vector.
 * @param {number} t - The interpolation parameter. Should be between 0 and 1.
 * @returns {import("minecraft/server").Vector3} The interpolated vector.
 */
export function lerpVectors(a, b, t) {
    let c = multiplyVectorByScalar(a, 1 - t);
    let d = multiplyVectorByScalar(b, t);
    return addVectors(c, d);
}

/**
 * Rotates a vector around an axis by a given angle.
 * @param {Object} vector - The vector to rotate. Must have x, y, and z properties.
 * @param {Object} axis - The axis to rotate around. Must have x, y, and z properties.
 * @param {number} angle - The angle in radians to rotate by.
 * @returns {Object} A new vector representing the result of the rotation.
 */
function rotateVector(vector, axis, angle) {
    var x = vector.x,
        y = vector.y,
        z = vector.z,
        u = axis.x,
        v = axis.y,
        w = axis.z,
        cosAngle = Math.cos(angle),
        sinAngle = Math.sin(angle);

    return {
        x: u * (u * x + v * y + w * z) * (1 - cosAngle) + x * cosAngle + (-w * y + v * z) * sinAngle,
        y: v * (u * x + v * y + w * z) * (1 - cosAngle) + y * cosAngle + (w * x - u * z) * sinAngle,
        z: w * (u * x + v * y + w * z) * (1 - cosAngle) + z * cosAngle + (-v * x + u * y) * sinAngle
    };
}

/**
 * Rotates a vector so that it "lands" on another vector.
 * @param {Object} vector - The vector to rotate. Must have x, y, and z properties.
 * @param {Object} targetVector - The vector to rotate onto. Must have x, y, and z properties.
 * @returns {Object} A new vector representing the result of the rotation.
 */
function rotateVectorOntoVector(vector, targetVector) {
    var axis = crossProduct(vector, targetVector);
    var angle = Math.acos(dotProduct(vector, targetVector) / (magnitude(vector) * magnitude(targetVector)));
    return rotateVector(vector, axis, angle);
}