import { Vector3 } from '@minecraft/server';
import './con-base';
import { Runnable } from './con-base';
/**
 * Represents a disposable handle.
 */
export class DisposableHandle<n>{
    #disposed;
    #onUpdate?;
    #onDispose?;

    /**
     * Creates a new DisposableHandle.
     * @param onUpdate - The function to call when the handle is updated.
     * @param onDispose - The function to call when the handle is disposed.
     */
    constructor(onUpdate: (any: DisposableHandle<n>)=>n, onDispose = ()=>{}){
        this.#disposed = false;
        this.#onUpdate = onUpdate;
        this.#onDispose = onDispose;
    }

    /**
     * Updates the handle.
     * @returns A promise that resolves when the update is complete.
     * @throws {ReferenceError} If the handle is disposed.
     */
    async update(): Promise<n | void>{ //@ts-ignore
        if(this.isDisposed) throw new ReferenceError("This object handle is disposed, you can't update it.");
        if(!this.#onUpdate) return;
        return await Function.run(null,this.#onUpdate, this);
    }

    /**
     * Disposes of the handle.
     */
    dispose(){
        const close = this.#onDispose;
        this.#disposed = true;
        this.#onUpdate = undefined;
        this.#onDispose = undefined;
        if(close) Function.run(null,close,this);
    }

    /**
     * Gets whether the handle is disposed.
     * @returns True if the handle is disposed; otherwise, false.
     */
    get isDisposed(){return this.#disposed};
}
/**
 * Represents an event signal.
 * @template - The types of the arguments passed to the event handlers.
 */
export class EventSignal<args extends any[]>{
    #methods:{[k: symbol]: Runnable<any,args>} = {};
    #symbol = Symbol('session');
    /**
     * Triggers the event signal.
     * @param params - The arguments to pass to the event handlers.
     * @returns A promise that resolves with the number of successful event handlers.
     */
    async trigger(...params: args) {
        await Promise.all(Object.getOwnPropertySymbols(this.#methods).map(sym => {
            return (async()=>{return await Function.run(null,this.#methods[sym],...params);})().catch(console.errorHandler);
        }));
    }

    /**
     * Subscribes to the event signal.
     * @template  k - The type of the event handler function.
     * @param method - The event handler function to subscribe.
     * @returns The subscribed event handler function.
     */
    subscribe<k extends Runnable<any,args>>(method: k): k | void {
        //@ts-ignore
        const t = typeof method;
        if(t !== "function" && t !== "object") throw new TypeError(`Expected a function or an object, but got ${t}.`);
        if(!Function.isRunnable(method)) throw new TypeError(`The object must be the runnable. Make sure the method has a property with the key Symbol.runnable.`);
        if(!Object.prototype.hasOwnProperty.call(method,this.#symbol)){
            const key = Symbol('key');
            (method as any)[this.#symbol] = key;
            this.#methods[key] = method;
            return method;
        };
    }

    /**
     * Unsubscribes from the event signal.
     * @template k - The type of the event handler function.
     * @param method - The event handler function to unsubscribe.
     * @returns The unsubscribed event handler function.
     */
    unsubscribe<k extends Runnable<any,args>>(method: k): k | void  {
        const t = typeof method;
        if(t !== "function" && t !== "object") throw new TypeError(`Expected a function or an object, but got ${t}.`);
        if(!Function.isRunnable(method)) throw new TypeError(`The method must implement the runnable interface. Make sure the method has a property with the key Symbol.runnable.`);
        if(Object.prototype.hasOwnProperty.call(method,this.#symbol)) {
            delete this.#methods[(method as any )[this.#symbol] as symbol];
            delete (method as any)[this.#symbol];
            return method;
        };
    }
}
/**
 * An implementation of an asynchronous semaphore that implements the PromiseLike interface.
 */
export class AsyncSemaphore implements PromiseLike<number> {
    #promise;
    #id;
    #map;
    constructor() {
        this.#promise = Promise.resolve(0);
        this.#id = 0;
        this.#map = new Map();
    }

    /**
     * Releases the lock with the given id.
     * @param id - The id of the lock to release.
     * @returns- Returns true if the lock was released successfully.
     * @throws {ReferenceError} - Throws an error if the given id is invalid.
     */
    release(id: number) {
        if (!this.#map.has(id)) throw new ReferenceError("Invalid promise id resolved!");
        const res = this.#map.get(id);
        this.#map.delete(id);
        res();
        return true;
    }

    /**
     * Acquires a lock and returns its id.
     * @async
     * @returns - Returns a promise that resolves with the id of the acquired lock.
     */
    async lock(): Promise<number> {
        const promise = this.#promise;
        const id = this.#id++;
        this.#promise = new Promise<number>((res) => this.#map.set(id, res));
        await promise;
        return id;
    }
    /**
     * @async
     * @param method 
     * @param params
     * @returns
     */
    async secureRun<args extends any[]>(method:(...params: args)=>any, ...params: args){
        const id = await this.lock();
        try {
            await method(...params);
        } catch (error) {console.errorHandler(error)}
        this.release(id);
    }
    /**
     * Attaches a callback for when a lock is acquired. This allows the `AsyncSemaphore` instance to be used as a `PromiseLike` object.
     * @type - Returns a promise that resolves with the result of the callback.
     */
    get then(): Promise<number>['then'] {
        const promise = this.lock();
        return Promise.prototype.then.bind(promise);
    }
}
/**
 * Generates a UUID (Universally Unique Identifier).
 * @returns The generated UUID.
 */
export function generateUUID(): string {
    let timestamp = Date.now();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) =>{
      let r = (timestamp + Math.random() * 16) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
/**
 * Sets of Math Vector Operations
 */
export class VectorOperators{
    /**
     * Adds two vectors.
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns  The sum of the two vectors.
     */
    static add(a:Vector3, b:Vector3): Vector3 {
        return {
            x: a.x + b.x,
            y: a.y + b.y,
            z: a.z + b.z
        };
    }
    /**
     * Subtracts the second vector from the first vector.
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns  The difference of the two vectors.
     */
    static subtract(a:Vector3, b:Vector3): Vector3 {
        return {
            x: a.x - b.x,
            y: a.y - b.y,
            z: a.z - b.z
        };
    }
    /**
     * Multiplies a vector by a scalar value.
     * @param a - The vector to be multiplied.
     * @param {number} s - The scalar value to multiply the vector by.
     * @returns  The product of the vector and the scalar value.
     */
    static multiplyByScalar(a:Vector3, s:number): Vector3 {
        return {
            x: a.x * s,
            y: a.y * s,
            z: a.z * s
        };
    }
    /**
     * Calculates the dot product of two vectors.
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns The dot product of the two vectors.
     */
    static dotProduct(a:Vector3, b:Vector3) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    /**
     * Calculates the cross product of two vectors.
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns  The cross product of the two vectors.
     */
    static crossProduct(a:Vector3, b:Vector3): Vector3 {
        return {
            x: a.y * b.z - a.z * b.y,
            y: a.z * b.x - a.x * b.z,
            z: a.x * b.y - a.y * b.x
        };
    }
    /**
    * Calculates magnitude (length) of given vector
    * @param a-The vector to calculate magnitude of
    * @returns -The magnitude (length) of given vector
    */
    static magnitude(a:Vector3){
        return Math.sqrt(a.x**2+a.y**2+a.z**2);
    }
    /**
    * Normalizes given vector to have magnitude (length) of 1
    * @param a-The vector to normalize
    * @returns -The normalized vector
    */
    static normalize(a: Vector3): Vector3{
        let m = VectorOperators.magnitude(a);
        return{
            x:a.x/m,
            y:a.y/m,
            z:a.z/m
        };
    }
    /**
    * Calculates angle between two vectors in radians
    * @param a-The first vector
    * @param b-The second vector
    * @returns -The angle between two vectors in radians
    */
    static angleBetween(a: Vector3,b: Vector3){
        return Math.acos(
            VectorOperators.dotProduct(a,b)/
            (VectorOperators.magnitude(a)*VectorOperators.magnitude(b))
        );
    }
    /**
    * Calculates projection of 'a' onto 'b'
    * @param a-First Vector to project onto second Vector
    * @param b-Second Vector onto which first is projected
    * @returns -The projection of 'a' onto 'b'
    */
    static projection(a: Vector3,b: Vector3): Vector3{
        return VectorOperators.multiplyByScalar(b,VectorOperators.dotProduct(a,b)/(VectorOperators.magnitude(b)**2));
    }
    /**
    * Calculates rejection of 'a' from 'b'
    * @param a-First Vector to reject from second Vector
    * @param b-Second Vector from which first is rejected
    * @returns -The rejection of 'a' from 'b'
    */
    static rejection(a: Vector3,b: Vector3){
        return VectorOperators.subtract(a,VectorOperators.projection(a,b));
    }
    /**
    * Calculates distance between two points
    * @param a-First point represented as a vector
    * @param b-Second point represented as a vector
    * @returns -The distance between points represented by vectors 'a' and 'b'
    */
    static distanceBetween(a: Vector3,b: Vector3){
        return VectorOperators.magnitude(VectorOperators.subtract(a,b));
    }
    /**
     * Reflects a vector across a given normal vector.
     * @param v - The vector to reflect.
     * @param n - The normal vector to reflect across.
     * @returns  The reflected vector.
     */
    static reflect(v: Vector3, n: Vector3) {
        let d = VectorOperators.dotProduct(v, n);
        return VectorOperators.subtract(v, VectorOperators.multiplyByScalar(n, 2 * d));
    }
    /**
     * Calculates the linear interpolation between two vectors.
     * @param a - The first vector.
     * @param b - The second vector.
     * @param t - The interpolation parameter. Should be between 0 and 1.
     * @returns  The interpolated vector.
     */
    static lerp(a:Vector3, b:Vector3, t: number) {
        return VectorOperators.add(
            VectorOperators.multiplyByScalar(a, 1 - t),
            VectorOperators.multiplyByScalar(b, t)
        );
    }
    /**
     * Rotates a vector around an axis by a given angle.
     * @param vector - The vector to rotate. Must have x, y, and z properties.
     * @param  axis - The axis to rotate around. Must have x, y, and z properties.
     * @param  angle - The angle in radians to rotate by.
     * @returns  A new vector representing the result of the rotation.
     */
    static rotate(vector: Vector3, axis: Vector3, angle: number): Vector3 {
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
    * @param vector - The vector to rotate. Must have x, y, and z properties.
    * @param direction - The vector to rotate onto. Must have x, y, and z properties.
    * @returns A new vector representing the result of the rotation.
    */
    static apply(vector: Vector3, direction: Vector3, base = {x:0,y:1,z:0}): Vector3 {
        let xVec = VectorOperators.normalize(VectorOperators.crossProduct(base, direction));
        let yVec = VectorOperators.normalize(VectorOperators.crossProduct(xVec, direction));
        return  VectorOperators.add(
                    VectorOperators.multiplyByScalar(xVec,vector.x),
                    VectorOperators.add(
                        VectorOperators.multiplyByScalar(yVec,vector.y),
                        VectorOperators.multiplyByScalar(direction,vector.z)
                    )
                );
    }
}
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
const _offset = Symbol('offset');
const _buffer = Symbol('buffer');
/**
 * Represents a text stream.
 */
export class TextStream {
    //private
    [_buffer] = "";
    //private
    [_offset] = 0;

    /**
     * Creates a new TextStream instance.
     * @param string - The string to use as the stream's buffer.
     */
    constructor(string: string) {
        this[_buffer] = string;
    }

    /**
     * Gets the stream's buffer.
     */
    get buffer(): string {
        return this[_buffer];
    }

    /**
     * Gets the stream's current offset.
     */
    get offset() {
        return this[_offset];
    }

    /**
     * Gets the size of the stream's buffer.
     */
    get size() {
        return this.buffer.length;
    }

    /**
     * Determines if the end of the stream has been reached.
     */
    get isEndOfStream() {
        return this.offset >= this.buffer.length;
    }

    /**
     * Resets the stream's offset to 0.
     */
    reset() {this[_offset] = 0;}

    /**
     * Skips a specified number of characters in the stream.
     */
    skip(length = 1) {
        if (length < 1) throw new RangeError('Error: Length must be greater than or equal to 1')
        if (length > this.size - this.offset) {
            throw new RangeError('Error: Attempting to skip beyond end of stream');
        }
        this[_offset] += length;
    }
    /**
     * Moves the stream's current offset backward by a specified number of characters.
     * @param length - The number of characters to move backward.
     * @throws {RangeError} If length is less than 1.
     */
    rewind(length = 1) {
        if (length < 1) throw new RangeError('Error: Length must be greater than or equal to 1')
        if (length > this.offset) this.reset();
        else this[_offset] -= length;
    }
    toString(){return this.buffer;}
}
/**
 * Represents a text writer that writes to a text stream.
 */
export class TextWriter extends TextStream {

    /**
     * Writes a string to the stream at the specified position and advances the current position by the length of the string.
     * @param string - The string to write to the stream.
     * @param offset - The position in the stream to write at. Defaults to the current offset of the stream.
     */
    write(string: string, offset = this.offset) {
        if (offset > this.buffer.length) {
            throw new Error('Offset cannot be greater than stream size');
        }
        const before = this.buffer.slice(0, offset);
        const after = this.buffer.slice(offset + string.length);
        this[_buffer] = before + string + after;
        this[_offset] += string.length;
    }

    /**
     * Inserts a string into the stream at the specified position and advances the current position by the length of the string.
     * @param string - The string to insert into the stream.
     * @param offset - The position in the stream to insert at. Defaults to the current offset of the stream.
     */
    insert(string: string, offset = this.offset) {
        if (offset > this.size) {
            throw new Error('Offset cannot be greater than stream size');
        }
        const before = this.buffer.slice(0, offset);
        const after = this.buffer.slice(offset);
        this[_buffer] = before + string + after;
        this[_offset] += string.length;
    }

    /**
     * Deletes a specified number of characters from the stream at the current position and advances the current position by that number of characters.
     * @param length - The number of characters to delete from the stream.
     * @param offset - The position in the stream to delete at. Defaults to the current offset of the stream.
     */
    delete(length = 1, offset = this.offset) {
        if (length < 1) throw new RangeError('Error: Length must be greater than or equal to 1')
        if (offset < 0 || offset >= this.size) throw new RangeError('Error: offset must be in range between 0 and size of the stream')
        if (length > this.size - offset) {
            throw new RangeError('Error: Attempting to delete beyond end of stream');
        }
        const before = this.buffer.slice(0, offset);
        const after = this.buffer.slice(offset + length);
        this[_buffer] = before + after;
        this[_offset] += length;
    }
}
/**
 * Represents a text reader that reads from a text stream.
 */
export class TextReader extends TextStream implements IterableIterator<string> {
    /**
     * Peeks at a specific position in the stream without advancing the current position.
     * @param length - The number of characters to peek at.
     * @param offset - The position in the stream to peek at. Defaults to the current offset of the stream.
     * @returns The characters at the specified position in the stream.
     */
    peek(length = 1, offset = this.offset) {
        if (length < 1) throw new RangeError('Error: Length must be greater than or equal to 1')
        if (offset < 0) throw new RangeError('Error: offset must be greater than or equal to 0')
        if (offset > this.size) {
            throw new RangeError('Error: Attempting to peek beyond end of stream');
        }
        return this.buffer.substring(offset, length);
    }

    /**
     * Reads a specified number of characters from the stream and advances the current position by that number of characters.
     * @param length - The number of characters to read.
     * @param offset- The position in the stream to read from. Defaults to the current offset of the stream.
     * @returns The characters read from the stream.
     */
    read(length = 1, offset = this.offset) {
        if (length < 1) throw new RangeError('Error: Length must be greater than or equal to 1')
        if (offset < 0) throw new RangeError('Error: offset must be greater than or equal to 0')
        if (this.isEndOfStream) {
            throw new RangeError('Error: Attempting to read beyond end of stream');
        }
        this[_offset] = offset + length;
        return this.buffer.substring(offset, offset + length);
    }

    /**
     * Returns an object representing the next character in the stream, or indicating that the end of the stream has been reached. This method is implemented from the Iterator interface.
     * @returns An object with a `done` property indicating whether the end of the stream has been reached and a `value` property containing the next character in the stream if available.
     */
    next(...args: any[]): IteratorResult<string> {
        if (this.isEndOfStream) return { done: true , value:undefined};
        else return { done: false, value: this.buffer[this[_offset]++] }
    }

    /**
     * Returns an iterator for the characters in the stream.
     * @returns An iterator for the characters in the stream.
     */
    [Symbol.iterator]() {
        return this;
    }
}