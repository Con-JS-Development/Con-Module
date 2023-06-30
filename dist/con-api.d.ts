// Generated by dts-bundle-generator v8.0.1

import { Vector3 } from '@minecraft/server';

export declare function OverTakes<b extends object>(prototype: b, object: Partial<b>): b;
export interface Vec3 extends Vector3 {
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
export type Vec3Constructor = {
	new (x: number, y?: number, z?: number): Vec3;
	(x: number, y?: number, z?: number): Vec3;
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
	multiply(v: Vector3, n: number | Vector3): Vec3;
	/**
	* Calculates magnitude (length) of given vector
	* @param a-The vector to calculate magnitude of
	* @returns -The magnitude (length) of given vector
	*/
	magnitude(vec: Vector3): number;
	/**
	* Normalizes given vector to have magnitude (length) of 1
	* @param a-The vector to normalize
	* @returns -The normalized vector
	*/
	normalize(vec: Vector3): Vec3;
	/**
	 * Calculates the cross product of two vectors.
	 * @param a - The first vector.
	 * @param b - The second vector.
	 * @returns  The cross product of the two vectors.
	 */
	cross(a: Vector3, b: Vector3): Vec3;
	/**
	 * Calculates the dot product of two vectors.
	 * @param a - The first vector.
	 * @param b - The second vector.
	 * @returns The dot product of the two vectors.
	 */
	dot(a: Vector3, b: Vector3): number;
	/**
	* Calculates angle between two vectors in radians
	* @param a-The first vector
	* @param b-The second vector
	* @returns -The angle between two vectors in radians
	*/
	angleBetween(a: Vector3, b: Vector3): number;
	/**
	* Calculates projection of 'a' onto 'b'
	* @param a-First Vector to project onto second Vector
	* @param b-Second Vector onto which first is projected
	* @returns -The projection of 'a' onto 'b'
	*/
	projection(a: Vector3, b: Vector3): Vec3;
	/**
	* Calculates rejection of 'a' from 'b'
	* @param a-First Vector to reject from second Vector
	* @param b-Second Vector from which first is rejected
	* @returns -The rejection of 'a' from 'b'
	*/
	rejection(a: Vector3, b: Vector3): Vec3;
	/**
	* Calculates distance between two points
	* @param a-First point represented as a vector
	* @param b-Second point represented as a vector
	* @returns -The distance between points represented by vectors 'a' and 'b'
	*/
	distance(a: Vector3, b: Vector3): number; /**
	* Reflects a vector across a given normal vector.
	* @param v - The vector to reflect.
	* @param n - The normal vector to reflect across.
	* @returns  The reflected vector.
	*/
	reflect(v: Vector3, n: Vector3): Vec3;
	/**
	 * Calculates the linear interpolation between two vectors.
	 * @param a - The first vector.
	 * @param b - The second vector.
	 * @param t - The interpolation parameter. Should be between 0 and 1.
	 * @returns  The interpolated vector.
	 */
	lerp(a: Vector3, b: Vector3, t: number): Vector3;
	from(object: any): Vec3;
	prototype: Vec3;
};
export declare const Vec3: Vec3Constructor;
export declare class CoordinateBase {
	static get default(): CoordinateBase;
	constructor(xVec: Vector3, yVec: Vector3, zVec: Vector3);
	private _x_;
	private _y_;
	private _z_;
	set x(vec: Vector3);
	set y(vec: Vector3);
	set z(vec: Vector3);
	get x(): Vec3;
	get y(): Vec3;
	get z(): Vec3;
	get inverted(): CoordinateBase;
	get determinant(): number;
	static invert(base: CoordinateBase): CoordinateBase;
	static getDeterminant({ x: bx, y: by, z: bz }: CoordinateBase): number;
	static applyBaseOnVector({ x: bx, y: by, z: bz }: CoordinateBase, vec: Vector3): Vec3;
	static applyBaseOnVectors({ x: bx, y: by, z: bz }: CoordinateBase, vecs: IterableIterator<Vec3>): Generator<Vec3, void, unknown>;
}
/**
 * Represents an event signal.
 * @template - The types of the arguments passed to the event handlers.
 */
export declare class EventSignal<args extends any[] | any> {
	protected _methods_: {
		[k: symbol]: Function;
	};
	protected _symbol_: symbol;
	get subscribers(): number;
	/**
	 * Triggers the event signal.
	 * @param params - The arguments to pass to the event handlers.
	 * @returns A promise that resolves with the number of successful event handlers.
	 */
	trigger(...params: args extends any[] ? args : [
		args
	]): Promise<void>;
	/**
	 * Subscribes to the event signal.
	 * @template  k - The type of the event handler function.
	 * @param method - The event handler function to subscribe.
	 * @returns The subscribed event handler function.
	 */
	subscribe<k extends (...args: args extends any[] ? args : [
		args
	]) => any>(method: k): k | void;
	/**
	 * Unsubscribes from the event signal.
	 * @template k - The type of the event handler function.
	 * @param method - The event handler function to unsubscribe.
	 * @returns The unsubscribed event handler function.
	 */
	unsubscribe<k extends (...args: args extends any[] ? args : [
		args
	]) => any>(method: k): k | void;
}
/**
 * Represents an before event signal.
 * @template - The types of the arguments passed to the event handlers.
 */
export declare class BeforeEventSignal<args extends any[] | any> extends EventSignal<args> {
	/**
	* Triggers the event signal.
	* @param params - The arguments to pass to the event handlers.
	* @returns A promise that resolves with the number of successful event handlers.
	*/
	triggerCancelable(cancelation: () => any, ...params: args extends any[] ? args : [
		args
	]): Promise<void>;
	setCancel(cancel?: boolean): void;
}
export declare class MinecraftEventSignal<args extends any[] | any> extends EventSignal<args> {
	constructor(subscribe: (param: MinecraftEventSignal<args>) => void, unsubscribe: (param: MinecraftEventSignal<args>) => void);
	protected _parent_sub_: (param: MinecraftEventSignal<args>) => void;
	protected _parent_unsub_: (param: MinecraftEventSignal<args>) => void;
	protected _isSubscribed_: boolean;
	subscribe<k extends (...args: args extends any[] ? args : [
		args
	]) => any>(method: k): void | k;
	unsubscribe<k extends (...args: args extends any[] ? args : [
		args
	]) => any>(method: k): void | k;
	static bindTo<ev, callback extends (param: ev) => void, newProperties extends any[], subscribeArgs extends any[] = [
	]>(event: {
		subscribe: (callback: callback, ...options: subscribeArgs) => callback;
		unsubscribe: (callback: callback) => callback;
	}, eventDataConverter: (pr: ev) => newProperties, ...options: subscribeArgs): void;
}
export declare class BeforeMinecraftEventSignal<args extends any[] | any> extends BeforeEventSignal<args> {
	constructor(subscribe: (param: BeforeMinecraftEventSignal<args>) => void, unsubscribe: (param: BeforeMinecraftEventSignal<args>) => void);
	protected _parent_sub_: (param: BeforeMinecraftEventSignal<args>) => void;
	protected _parent_unsub_: (param: BeforeMinecraftEventSignal<args>) => void;
	protected _isSubscribed_: boolean;
	subscribe<k extends (...args: args extends any[] ? args : [
		args
	]) => any>(method: k): void | k;
	unsubscribe<k extends (...args: args extends any[] ? args : [
		args
	]) => any>(method: k): void | k;
	static bindTo<ev, callback extends (param: ev) => void, newProperties extends any[], subscribeArgs extends any[] = [
	]>(event: {
		subscribe: (callback: callback, ...options: subscribeArgs) => callback;
		unsubscribe: (callback: callback) => callback;
	}, eventDataConverter: (pr: ev) => newProperties, ...options: subscribeArgs): void;
}

export {};
