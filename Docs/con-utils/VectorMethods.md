# Vector Methods
This methods provides functions for performing operations on vectors.

## Functions

### `addVectors(a, b)`

Adds two vectors.

**Parameters:**

- `a` (Vector3): The first vector.
- `b` (Vector3): The second vector.

**Returns:**

(Vector3): The sum of the two vectors.

### `subtractVectors(a, b)`

Subtracts the second vector from the first vector.

**Parameters:**

- `a` (Vector3): The first vector.
- `b` (Vector3): The second vector.

**Returns:**

(Vector3): The difference of the two vectors.

### `multiplyVectorByScalar(a, s)`

Multiplies a vector by a scalar value.

**Parameters:**

- `a` (Vector3): The vector to be multiplied.
- `s` (number): The scalar value to multiply the vector by.

**Returns:**

(Vector3): The product of the vector and the scalar value.

### `dotProduct(a, b)`

Calculates the dot product of two vectors.

**Parameters:**

- `a` (Vector3): The first vector.
- `b` (Vector3): The second vector.

**Returns:**

(number): The dot product of the two vectors.

### `crossProduct(a, b)`

Calculates the cross product of two vectors.

**Parameters:**

- `a` (Vector3): The first vector.
- `b` (Vector3): The second vector.

**Returns:**

(Vector3): The cross product of the two vectors.

### `magnitude(a)`

Calculates magnitude (length) of given vector

**Parameters:**

- `a` (Vector3): The vector to calculate magnitude of

**Returns:**

(number): The magnitude (length) of given vector

### `normalize(a)`

Normalizes given vector to have magnitude (length) of 1

**Parameters:**

- `a` (Vector3): The vector to normalize

**Returns:**

(Vector3): The normalized vector

### `angleBetweenVectors(a,b)`

Calculates angle between two vectors in radians

**Parameters:**

- `a` (Vector3): The first vector
- `b` (Vector3): The second vector

**Returns:**

(number): The angle between two vectors in radians

### `vectorProjection(a,b)`

Calculates projection of 'a' onto 'b'

**Parameters:**

- `a` (Vector3): First Vector to project onto second Vector
- `b` (Vector3): Second Vector onto which first is projected

**Returns:**

(Vector3): The projection of 'a' onto 'b'

### `vectorRejection(a,b)`

Calculates rejection of 'a' from 'b'

**Parameters:**

- `a` (Vector3): First Vector to reject from second Vector
- `b` (Vector3): Second Vector from which first is rejected

**Returns:**

(Vector3): The rejection of 'a' from 'b'

### `distanceBetweenPoints(a,b)`

Calculates distance between two points

**Parameters:**

- `a` (Vector3): First point represented as a vector
- `b` (Vector3): Second point represented as a vector

**Returns:**

(number): The distance between points represented by vectors 'a' and 'b'

### `reflectVector(v,n)`

Reflects a vector across a given normal vector.

**Parameters:**

- `v` (Vector3): The vector to reflect.
- `n` (Vector3): The normal vector to reflect across.

**Returns:**

(Vector3): The reflected vector.

### `lerpVectors(a,b,t)`

Calculates the linear interpolation between two vectors.

**Parameters:**

- `a` (Vector3): The first vector.
- `b` (Vector3): The second vector.
- `t` (number): The interpolation parameter. Should be between 0 and 1.

**Returns:** 

(Vector3): The interpolated vector.

### `rotateVector(vector, axis, angle)`

Rotates a vector around an axis by a given angle.

**Parameters:**
- `vector`: The vector to rotate. Must have x, y, and z properties.
- `axis`: The axis to rotate around. Must have x, y, and z properties.
- `angle`: The angle in radians to rotate by.

**Returns:**
A new Vector3 representing the result of the rotation.

### `rotateVectorOntoVector(vector, targetVector)`

Rotates a vector so that it "lands" on another vector.

**Parameters:**
- `vector`: The vector to rotate. Must have x, y, and z properties.
- `targetVector`: The vector to rotate onto. Must have x, y, and z properties.

**Returns:**
A new Vector3 representing the result of the rotation.

## Example

Here's an example of how you could use the functions in this module:

```javascript
import { 
    addVectors, subtractVectors, multiplyVectorByScalar, 
    dotProduct, crossProduct, magnitude, normalize, 
    angleBetweenVectors, vectorProjection, vectorRejection, 
    distanceBetweenPoints, reflectVector, lerpVectors 
} from './con-utils/index.js';

let a = { x: 1, y: 2, z: 3 };
let b = { x: 4, y: 5, z: 6 };

let sum = addVectors(a, b);
console.log(sum); // { x: 5, y: 7, z: 9 }

let difference = subtractVectors(a, b);
console.log(difference); // { x: -3, y: -3, z: -3 }

let product = multiplyVectorByScalar(a, 2);
console.log(product); // { x: 2, y: 4, z: 6 }

let dot = dotProduct(a,b);
console.log(dot); // 32

let cross = crossProduct(a,b);
console.log(cross); // { x: -3, y: 6, z: -3 }

let mag = magnitude(a);
console.log(mag); // 3.7416573867739413

let norm = normalize(a);
console.log(norm); // { x: 0.2672612419124244,y: 0.5345224838248488,z: 0.8017837257372732 }

let angle = angleBetweenVectors(a,b);
console.log(angle); // 0.22572612855273393

let projection = vectorProjection(a,b);
console.log(projection); // { x: 1.6,y: 2,z: 2.4 }

let rejection = vectorRejection(a,b);
console.log(rejection); // { x: -0.5999999999999999,y: -0,z: 0.6000000000000001 }

let distance = distanceBetweenPoints(a,b);
console.log(distance); // 5.196152422706632

let reflection = reflectVector(a,b);
console.log(reflection); // { x:-0.7999999999999998,y:-1,z:-1.2000000000000002}

let lerp = lerpVectors(a,b,.5);
console.log(lerp); // {x:2.5,y:3.5,z:4.5}
```