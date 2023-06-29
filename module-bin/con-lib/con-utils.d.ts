import { Vector3 } from '@minecraft/server';
import './con-base';
import { Runnable } from './con-base';
/**
 * Represents a disposable handle.
 */
export declare class DisposableHandle<n> {
    #private;
    /**
     * Creates a new DisposableHandle.
     * @param onUpdate - The function to call when the handle is updated.
     * @param onDispose - The function to call when the handle is disposed.
     */
    constructor(onUpdate: (any: DisposableHandle<n>) => n, onDispose?: () => void);
    /**
     * Updates the handle.
     * @returns A promise that resolves when the update is complete.
     * @throws {ReferenceError} If the handle is disposed.
     */
    update(): Promise<n | void>;
    /**
     * Disposes of the handle.
     */
    dispose(): void;
    /**
     * Gets whether the handle is disposed.
     * @returns True if the handle is disposed; otherwise, false.
     */
    get isDisposed(): boolean;
}
/**
 * Represents an event signal.
 * @template - The types of the arguments passed to the event handlers.
 */
export declare class EventSignal<args extends any[]> {
    #private;
    /**
     * Triggers the event signal.
     * @param params - The arguments to pass to the event handlers.
     * @returns A promise that resolves with the number of successful event handlers.
     */
    trigger(...params: args): Promise<void>;
    /**
     * Subscribes to the event signal.
     * @template  k - The type of the event handler function.
     * @param method - The event handler function to subscribe.
     * @returns The subscribed event handler function.
     */
    subscribe<k extends Runnable<any, args>>(method: k): k | void;
    /**
     * Unsubscribes from the event signal.
     * @template k - The type of the event handler function.
     * @param method - The event handler function to unsubscribe.
     * @returns The unsubscribed event handler function.
     */
    unsubscribe<k extends Runnable<any, args>>(method: k): k | void;
}
/**
 * An implementation of an asynchronous semaphore that implements the PromiseLike interface.
 */
export declare class AsyncSemaphore implements PromiseLike<number> {
    #private;
    constructor();
    /**
     * Releases the lock with the given id.
     * @param id - The id of the lock to release.
     * @returns- Returns true if the lock was released successfully.
     * @throws {ReferenceError} - Throws an error if the given id is invalid.
     */
    release(id: number): boolean;
    /**
     * Acquires a lock and returns its id.
     * @async
     * @returns - Returns a promise that resolves with the id of the acquired lock.
     */
    lock(): Promise<number>;
    /**
     * @async
     * @param method
     * @param params
     * @returns
     */
    secureRun<args extends any[]>(method: (...params: args) => any, ...params: args): Promise<void>;
    /**
     * Attaches a callback for when a lock is acquired. This allows the `AsyncSemaphore` instance to be used as a `PromiseLike` object.
     * @type - Returns a promise that resolves with the result of the callback.
     */
    get then(): Promise<number>['then'];
}
/**
 * Generates a UUID (Universally Unique Identifier).
 * @returns The generated UUID.
 */
export declare function generateUUID(): string;
/**
 * Adds two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns  The sum of the two vectors.
 */
export declare function addVectors(a: Vector3, b: Vector3): Vector3;
/**
 * Subtracts the second vector from the first vector.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns  The difference of the two vectors.
 */
export declare function subtractVectors(a: Vector3, b: Vector3): Vector3;
/**
 * Multiplies a vector by a scalar value.
 * @param a - The vector to be multiplied.
 * @param {number} s - The scalar value to multiply the vector by.
 * @returns  The product of the vector and the scalar value.
 */
export declare function multiplyVectorByScalar(a: Vector3, s: number): Vector3;
/**
 * Calculates the dot product of two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns The dot product of the two vectors.
 */
export declare function dotProduct(a: Vector3, b: Vector3): number;
/**
 * Calculates the cross product of two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns  The cross product of the two vectors.
 */
export declare function crossProduct(a: Vector3, b: Vector3): Vector3;
/**
* Calculates magnitude (length) of given vector
* @param a-The vector to calculate magnitude of
* @returns -The magnitude (length) of given vector
*/
export declare function magnitude(a: Vector3): number;
/**
* Normalizes given vector to have magnitude (length) of 1
* @param a-The vector to normalize
* @returns -The normalized vector
*/
export declare function normalize(a: Vector3): Vector3;
/**
* Calculates angle between two vectors in radians
* @param a-The first vector
* @param b-The second vector
* @returns -The angle between two vectors in radians
*/
export declare function angleBetweenVectors(a: Vector3, b: Vector3): number;
/**
* Calculates projection of 'a' onto 'b'
* @param a-First Vector to project onto second Vector
* @param b-Second Vector onto which first is projected
* @returns -The projection of 'a' onto 'b'
*/
export declare function vectorProjection(a: Vector3, b: Vector3): Vector3;
/**
* Calculates rejection of 'a' from 'b'
* @param a-First Vector to reject from second Vector
* @param b-Second Vector from which first is rejected
* @returns -The rejection of 'a' from 'b'
*/
export declare function vectorRejection(a: Vector3, b: Vector3): Vector3;
/**
* Calculates distance between two points
* @param a-First point represented as a vector
* @param b-Second point represented as a vector
* @returns -The distance between points represented by vectors 'a' and 'b'
*/
export declare function distanceBetweenPoints(a: Vector3, b: Vector3): number;
/**
 * Reflects a vector across a given normal vector.
 * @param v - The vector to reflect.
 * @param n - The normal vector to reflect across.
 * @returns  The reflected vector.
 */
export declare function reflectVector(v: Vector3, n: Vector3): Vector3;
/**
 * Calculates the linear interpolation between two vectors.
 * @param a - The first vector.
 * @param b - The second vector.
 * @param t - The interpolation parameter. Should be between 0 and 1.
 * @returns  The interpolated vector.
 */
export declare function lerpVectors(a: Vector3, b: Vector3, t: number): Vector3;
/**
 * Rotates a vector around an axis by a given angle.
 * @param vector - The vector to rotate. Must have x, y, and z properties.
 * @param  axis - The axis to rotate around. Must have x, y, and z properties.
 * @param  angle - The angle in radians to rotate by.
 * @returns  A new vector representing the result of the rotation.
 */
export declare function rotateVector(vector: Vector3, axis: Vector3, angle: number): Vector3;
/**
 * Rotates a vector so that it "lands" on another vector.
 * @param  vector - The vector to rotate. Must have x, y, and z properties.
 * @param targetVector - The vector to rotate onto. Must have x, y, and z properties.
 * @returns A new vector representing the result of the rotation.
 */
export declare function rotateVectorOntoVector(vector: Vector3, targetVector: Vector3): Vector3;
declare const _offset: unique symbol;
declare const _buffer: unique symbol;
/**
 * Represents a text stream.
 */
export declare class TextStream {
    [_buffer]: string;
    [_offset]: number;
    /**
     * Creates a new TextStream instance.
     * @param string - The string to use as the stream's buffer.
     */
    constructor(string: string);
    /**
     * Gets the stream's buffer.
     */
    get buffer(): string;
    /**
     * Gets the stream's current offset.
     */
    get offset(): number;
    /**
     * Gets the size of the stream's buffer.
     */
    get size(): number;
    /**
     * Determines if the end of the stream has been reached.
     */
    get isEndOfStream(): boolean;
    /**
     * Resets the stream's offset to 0.
     */
    reset(): void;
    /**
     * Skips a specified number of characters in the stream.
     */
    skip(length?: number): void;
    /**
     * Moves the stream's current offset backward by a specified number of characters.
     * @param length - The number of characters to move backward.
     * @throws {RangeError} If length is less than 1.
     */
    rewind(length?: number): void;
    toString(): string;
}
/**
 * Represents a text writer that writes to a text stream.
 */
export declare class TextWriter extends TextStream {
    /**
     * Writes a string to the stream at the specified position and advances the current position by the length of the string.
     * @param string - The string to write to the stream.
     * @param offset - The position in the stream to write at. Defaults to the current offset of the stream.
     */
    write(string: string, offset?: number): void;
    /**
     * Inserts a string into the stream at the specified position and advances the current position by the length of the string.
     * @param string - The string to insert into the stream.
     * @param offset - The position in the stream to insert at. Defaults to the current offset of the stream.
     */
    insert(string: string, offset?: number): void;
    /**
     * Deletes a specified number of characters from the stream at the current position and advances the current position by that number of characters.
     * @param length - The number of characters to delete from the stream.
     * @param offset - The position in the stream to delete at. Defaults to the current offset of the stream.
     */
    delete(length?: number, offset?: number): void;
}
/**
 * Represents a text reader that reads from a text stream.
 */
export declare class TextReader extends TextStream implements IterableIterator<string> {
    /**
     * Peeks at a specific position in the stream without advancing the current position.
     * @param length - The number of characters to peek at.
     * @param offset - The position in the stream to peek at. Defaults to the current offset of the stream.
     * @returns The characters at the specified position in the stream.
     */
    peek(length?: number, offset?: number): string;
    /**
     * Reads a specified number of characters from the stream and advances the current position by that number of characters.
     * @param length - The number of characters to read.
     * @param offset- The position in the stream to read from. Defaults to the current offset of the stream.
     * @returns The characters read from the stream.
     */
    read(length?: number, offset?: number): string;
    /**
     * Returns an object representing the next character in the stream, or indicating that the end of the stream has been reached. This method is implemented from the Iterator interface.
     * @returns An object with a `done` property indicating whether the end of the stream has been reached and a `value` property containing the next character in the stream if available.
     */
    next(...args: any[]): IteratorResult<string>;
    /**
     * Returns an iterator for the characters in the stream.
     * @returns An iterator for the characters in the stream.
     */
    [Symbol.iterator](): this;
}
export {};
