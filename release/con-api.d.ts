import * as MC from '@minecraft/server';
import { Direction, Entity, ScoreboardIdentity, ScoreboardObjective, Vector3 } from '@minecraft/server';
import { ActionFormData, FormResponse } from '@minecraft/server-ui';

declare module "@minecraft/server-ui" {
	interface FormResponse {
		readonly output: ActionFormResponse["selection"] | MessageFormResponse["selection"] | ModalFormResponse["formValues"];
	}
	interface ActionFormResponse {
		readonly output: ActionFormResponse["selection"];
	}
	interface MessageFormResponse {
		readonly output: MessageFormResponse["selection"];
	}
	interface ModalFormResponse {
		readonly output: ModalFormResponse["formValues"];
	}
}
export declare const sus: ActionFormData;
export declare const output: typeof FormResponse;
export declare const GeneratorFunction: GeneratorFunction;
export declare const GeneratorFunctionConstructor: GeneratorFunctionConstructor;
export declare const AsyncGeneratorFunction: AsyncGeneratorFunction;
export declare const AsyncGeneratorFunctionConstructor: AsyncGeneratorFunctionConstructor;
export declare const AsyncFunctionConstructor: FunctionConstructor;
export class SyncPromise<T> implements PromiseLike<T> {
	constructor(executor: (resolve: (value: T | SyncPromise<T>) => void, reject: (reason?: any) => void) => void);
	readonly isRejected: boolean;
	readonly isFulfilled: boolean;
	readonly value?: T | any;
	then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): SyncPromise<TResult1 | TResult2>;
	finally(onfinally?: (() => void) | undefined | null): Promise<T>;
	catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
	/**
	 * Creates a new rejected promise for the provided reason.
	 * @param reason The reason the promise was rejected.
	 * @returns A new rejected Promise.
	 */
	static reject<T = never>(reason?: any): SyncPromise<T>;
	/**
	 * Creates a new resolved promise.
	 * @returns A resolved promise.
	 */
	static resolve(): SyncPromise<void>;
	/**
	 * Creates a new resolved promise for the provided value.
	 * @param value A promise.
	 * @returns A promise whose internal state matches the provided promise.
	 */
	static resolve<T>(value: T): SyncPromise<Awaited<T>>;
	/**
	 * Creates a new resolved promise for the provided value.
	 * @param value A promise.
	 * @returns A promise whose internal state matches the provided promise.
	 */
	static resolve<T>(value: T | PromiseLike<T>): SyncPromise<Awaited<T>>;
}
export const YieldableSymbol: unique symbol;
export enum ThreadCommands {
	SelfGenerator = "SelfGenerator",
	SelfAwaiter = "SelfAwaiter",
	EndOfTick = "EndOfTick"
}
export enum YieldableTypes {
	AsyncCallback = "AsyncCallback",
	SyncCallback = "SyncCallback",
	Value = "Value"
}
export interface Yieldable<T> {
	[YieldableSymbol]: Yieldables<T>;
}
export type YieldableValue<T = any> = number | null | undefined | PromiseLike<T> | Yieldable<T> | ThreadCommands;
export type Yieldables<T> = {
	type: YieldableTypes.AsyncCallback;
	value: (resolve: (returnValue: T) => void) => void;
} | {
	type: YieldableTypes.SyncCallback;
	value: () => T;
} | {
	type: YieldableTypes.Value;
	value: T;
};
export interface GeneratorThread<TReturn> extends PromiseLike<TReturn> {
	readonly generator: Generator<YieldableValue, TReturn, any>;
	readonly awaiter: SyncPromise<TReturn>;
	start(): SyncPromise<TReturn>;
}
export interface GeneratorThreadConstructor {
	<TReturn>(generator: Generator<YieldableValue, TReturn, any>): GeneratorThread<TReturn>;
	<TReturn>(generator: Runnable<Generator<YieldableValue, TReturn, any>>): GeneratorThread<TReturn>;
	<TReturn, TParams extends any[], ThisArg = null>(generator: Runnable<Generator<YieldableValue, TReturn, any>, TParams>): GeneratorThread<TReturn>;
	<TReturn, TParams extends any[], ThisArg = null>(generator: Runnable<Generator<YieldableValue, TReturn, any>, TParams>, thisArg: ThisArg, ...params: TParams): GeneratorThread<TReturn>;
	new <TReturn>(generator: Generator<YieldableValue, TReturn, any>): GeneratorThread<TReturn>;
	new <TReturn>(generator: Runnable<Generator<YieldableValue, TReturn, any>>): GeneratorThread<TReturn>;
	new <TReturn, TParams extends any[], ThisArg = null>(generator: Runnable<Generator<YieldableValue, TReturn, any>, TParams>): GeneratorThread<TReturn>;
	new <TReturn, TParams extends any[], ThisArg = null>(generator: Runnable<Generator<YieldableValue, TReturn, any>, TParams>, thisArg: ThisArg, ...params: TParams): GeneratorThread<TReturn>;
	isRunning(generator: Generator): boolean;
	getThread<TReturn>(generator: Generator<YieldableValue, TReturn>): GeneratorThread<TReturn>;
	Run<TReturn>(generator: Generator<YieldableValue, TReturn, any>): GeneratorThread<TReturn>["awaiter"];
	Run<TReturn>(generator: Runnable<Generator<YieldableValue, TReturn, any>>): GeneratorThread<TReturn>["awaiter"];
	Run<TReturn, TParams extends any[], ThisArg = null>(generator: Runnable<Generator<YieldableValue, TReturn, any>, TParams>): GeneratorThread<TReturn>["awaiter"];
	Run<TReturn, TParams extends any[], ThisArg = null>(generator: Runnable<Generator<YieldableValue, TReturn, any>, TParams>, thisArg: ThisArg, ...params: TParams): GeneratorThread<TReturn>["awaiter"];
}
export declare var GeneratorThread: GeneratorThreadConstructor;
export interface Vec3 extends Vector3 {
	/**
	* Calculates projection of 'a' onto 'b'
	* @this {this}-First Vector to project onto second Vector
	* @param vec-Second Vector onto which first is projected
	* @returns -The projection of 'a' onto 'b'
	*/
	projection(vec: Vector3): Vec3;
	/**
	* Calculates rejection of 'a' from 'b'
	* @this {this}-First Vector to reject from second Vector
	* @param vec-Second Vector from which first is rejected
	* @returns -The rejection of 'a' from 'b'
	*/
	rejection(vec: Vector3): Vec3;
	/**
	* Calculates distance between two points
	* @this {this}-First point represented as a vector
	* @param vec-Second point represented as a vector
	* @returns -The distance between points represented by vectors 'a' and 'b'
	*/
	distance(vec: Vector3): number; /**
	* Reflects a vector across a given normal vector.
	* @this {this} - The vector to reflect.
	* @param vec - The normal vector to reflect across.
	* @returns  The reflected vector.
	*/
	reflect(vec: Vector3): Vec3;
	/**
	 * Calculates the linear interpolation between two vectors.
	 * @this {this} - The first vector.
	 * @param vec - The second vector.
	 * @param t - The interpolation parameter. Should be between 0 and 1.
	 * @returns  The interpolated vector.
	 */
	lerp(vec: Vector3, t: number): Vector3;
	/**
	 * Calculates the cross product of two vectors.
	 * @this {this} - The first vector.
	 * @param vec - The second vector.
	 * @returns  The cross product of the two vectors.
	 */
	cross(vec: Vector3): Vec3;
	/**
	 * Calculates the dot product of two vectors.
	 * @this {this} - The first vector.
	 * @param vec - The second vector.
	 * @returns The dot product of the two vectors.
	 */
	dot(vec: Vector3): number;
	/**
	 * Adds two vectors.
	 * @this {this} - The first vector.
	 * @param vec - The second vector.
	 * @returns  The sum of the two vectors.
	 */
	add(vec: Vector3): Vec3;
	/**
	 * Subtracts the second vector from the first vector.
	 * @this {this} - The first vector.
	 * @param vec - The second vector.
	 * @returns  The difference of the two vectors.
	 */
	subtract(vec: Vector3): Vec3;
	/**
	 * Multiplies a vector by a scalar value.
	 * @this {this} - The vector to be multiplied.
	 * @param num - The scalar value or vector to multiply the vector by.
	 * @returns  The product of the vector and the scalar value.
	 */
	multiply(num: number | Vector3): Vec3;
	floor(): Vec3;
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
	floor(vec: Vector3): Vec3;
	from(object: any): Vec3;
	sort(vec1: Vector3, vec2: Vector3): [
		Vec3,
		Vec3
	];
	isVec3(vec: any): vec is Vec3;
	readonly down: Vec3;
	readonly up: Vec3;
	readonly right: Vec3;
	readonly left: Vec3;
	readonly forward: Vec3;
	readonly backward: Vec3;
	readonly zero: Vec3;
	readonly prototype: Vec3;
} & {
	readonly [K in Direction]: Vec3;
};
export declare var Vec3: Vec3Constructor;
export class CoordinateBase {
	static readonly default: CoordinateBase;
	constructor(xVec: Vector3, yVec: Vector3, zVec: Vector3);
	set x(vec: Vector3);
	set y(vec: Vector3);
	set z(vec: Vector3);
	get x(): Vec3;
	get y(): Vec3;
	get z(): Vec3;
	readonly inverted: CoordinateBase;
	readonly isPerpendicular: boolean;
	readonly determinant: Number;
	passLocalCoordinate(vec: Vector3): Vec3;
	passLocalCoordinates(vecs: Iterable<Vector3>): Generator<Vec3>;
	static invert(base: CoordinateBase): CoordinateBase;
	static getDeterminant({ x: bx, y: by, z: bz }: CoordinateBase): Number;
	static applyBaseOnVector({ x: bx, y: by, z: bz }: CoordinateBase, vec: Vector3): Vec3;
	static applyBaseOnVectors({ x: bx, y: by, z: bz }: CoordinateBase, vectors: Iterable<Vector3>): Generator<Vec3>;
	static isPerpendicular(base: CoordinateBase): boolean;
	static fromZVec(zVec: Vector3): CoordinateBase;
}
/**
 * An implementation of an asynchronous semaphore that implements the PromiseLike interface.
 */
export declare class AsyncSemaphore implements PromiseLike<number> {
	private _promise_;
	private _id_;
	private _map_;
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
	secureRun<args extends any[]>(method: Runnable, ...params: args): Promise<void>;
	/**
	 * Attaches a callback for when a lock is acquired. This allows the `AsyncSemaphore` instance to be used as a `PromiseLike` object.
	 * @type - Returns a promise that resolves with the result of the callback.
	 */
	get then(): Promise<number>["then"];
}
export const GeometryGenerator: {
	square(from: Vector3Optional<Vector3, "y">, to: {
		x?: number;
		z?: number;
	}): ShapeGenerator;
	circle(radius: number, rMin?: number, y?: number): ShapeGenerator;
	cylinder(radius: number, height: number, rMin?: number): ShapeGenerator;
	cubeFromTo(from: Vector3, to: Vector3): ShapeGenerator;
	cubeFromSize(size: Vector3): ShapeGenerator;
	sphere(radius: number, radiusInside?: number): ShapeGenerator;
	pathFromTo(from: Vector3, to: Vector3): ShapeGenerator;
	pathFromDirection(direction: Vector3): ShapeGenerator;
	fluidFill(depth: number, fluidDirection?: Vector3[]): ShapeGenerator<Vec3, unknown, boolean | undefined>;
};
export declare interface ShapeGenerator<Vec extends Vector3 = Vec3, TReturn = unknown, TNext = unknown> extends Generator<Vec, TReturn, TNext> {
	add(vec: Vector3): ShapeGenerator<Vec3, TReturn, TNext>;
	offset(vec: Vector3): ShapeGenerator<Vec3, TReturn, TNext>;
	multiply(vec: number | Vector3): ShapeGenerator<Vec3, TReturn, TNext>;
	invert(): ShapeGenerator<Vec3, TReturn, TNext>;
	applyBase(base: CoordinateBase): ShapeGenerator<Vec3, TReturn, TNext>;
	normilize(): ShapeGenerator<Vec3, TReturn, TNext>;
	projection(vec: Vector3): ShapeGenerator<Vec3, TReturn, TNext>;
	rejection(vec: Vector3): ShapeGenerator<Vec3, TReturn, TNext>;
	reflect(vec: Vector3): ShapeGenerator<Vec3, TReturn, TNext>;
	readonly normilized: ShapeGenerator<Vec3, TReturn, TNext>;
	readonly inverted: ShapeGenerator<Vec3, TReturn, TNext>;
	readonly nextValue: ReturnType<Generator<Vec3, TReturn, TNext>["next"]>;
}
export const ShapeGeneratorPrototype: ShapeGenerator;
export const Shapes: {
	[K in keyof typeof GeometryGenerator]: K extends string ? K : never;
};
/**
 * Represents a disposable handle.
 */
export class DisposableHandle<T, D = void> {
	private _disposed_?: boolean;
	private _onUpdate_?: (thisArg: DisposableHandle<T, D>, ...params: T extends [
	] ? T : [
		T
	]) => D;
	private _onDispose_?: (thisArg: DisposableHandle<T, D>) => void;
	/**
	 * Creates a new DisposableHandle.
	 * @param onUpdate - The function to call when the handle is updated.
	 * @param onDispose - The function to call when the handle is disposed.
	 */
	constructor(onUpdate: (thisArg: DisposableHandle<T, D>, ...params: T extends [
	] ? T : [
		T
	]) => D, onDispose?: (arg: DisposableHandle<T, D>) => void);
	/**
	 * Updates the handle.
	 * @throws {ReferenceError} If the handle is disposed.
	 */
	update(...params: T extends [
	] ? T : [
		T
	]): D;
	/**
	 * Disposes of the handle.
	 */
	dispose(): void;
	/**
	 * Gets whether the handle is disposed.
	 * @returns True if the handle is disposed; otherwise, false.
	 */
	readonly isDisposed: boolean;
}
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
/**
 * Represents an event signal.
 * @template - The types of the arguments passed to the event handlers.
 */
export declare class CustomEvent<args extends any[]> {
	private readonly _methods_;
	private readonly _session_;
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
export declare const MinecraftOverloadEvent: (object: object, name: string, parent: {
	new (): any;
}) => {
	(): object;
	new (): object;
	prototype: object;
	name: string; /**
	 * Unsubscribes from the event signal.
	 * @template k - The type of the event handler function.
	 * @param method - The event handler function to unsubscribe.
	 * @returns The unsubscribed event handler function.
	 */
};
//////////////////////////////////////
// DATABASE.JS
//////////////////////////////////////
export enum DatabaseSavingModes {
	OneTimeSave = "OneTimeSave",
	EndTickSave = "EndTickSave",
	TickInterval = "TickInterval"
}
export enum ChangeAction {
	Change = 0,
	Remove = 1
}
/**@extends {Map<string,any>}*/
export declare class ScoreboardDatabaseManager extends Map<string, any> {
	private _saveMode_: DatabaseSavingModes;
	private hasChanges: boolean;
	readonly maxLength: number;
	private readonly _scoreboard_: ScoreboardObjective;
	protected readonly _source_: Map<string, string | ScoreboardIdentity | Entity>;
	protected readonly _parser_: {
		stringify: (data: any) => string;
		parse: (data: string) => any;
	};
	readonly savingMode: DatabaseSavingModes;
	constructor(objective: ScoreboardObjective | string, saveMode?: DatabaseSavingModes);
	constructor(objective: ScoreboardObjective | string, saveMode: DatabaseSavingModes.EndTickSave, interval?: number);
	/**@inheritdoc */
	set(key: string, value: any): this;
	/**@inheritdoc */
	delete(key: string): boolean;
	clear(): void;
	load(): this;
	loadAsync(): Promise<this>;
	rebuild(): this;
	rebuildAsync(): Promise<this>;
	readonly objective: ScoreboardObjective;
	readonly id: string;
	readonly loaded: boolean;
}
export class JsonDatabase extends ScoreboardDatabaseManager {
}
export class NBTDatabase extends ScoreboardDatabaseManager {
}
export class CustomDatabase extends ScoreboardDatabaseManager {
	constructor(parser: {
		parse: (data: string) => any;
		stringify: (data: any) => string;
	}, objective: string | ScoreboardObjective, saveMode?: DatabaseSavingModes);
	constructor(parser: {
		parse: (data: string) => any;
		stringify: (data: any) => string;
	}, objective: string | ScoreboardObjective, saveMode: DatabaseSavingModes.EndTickSave, interval?: number);
}
export type PartialParts<b, thisArg = b> = {
	[P in keyof b]?: b[P] extends (...param: infer param) => infer ret ? ((this: thisArg, ...param: param) => ret) : b[P];
};
export declare function OverTakes<b extends object>(prototype: b, object: PartialParts<b, b>): b;
export declare function ReExtenend<T extends (new () => any), D extends (new () => any)>(class1: T, newParent: D): T & D;
/**
 * Generates a UUID (Universally Unique Identifier).
 * @returns The generated UUID.
 */
export declare function GenerateUUID(timestamp?: number): string;
export declare function GenerateRandomString(length: number): string;
export declare function BuildClass<T, N extends string>(object: T, name?: N, extendsThis?: {
	new (): any;
}): {
	new (): T;
	(): T;
	prototype: T;
	name: N;
};
export declare function FixedNumber(number: number, length: number, radix?: number): string;
export type Runnable<returnType = any, parameters extends any[] = [
], thisParam = any> = (returnType extends Generator<any, any, any> ? (returnType extends Generator<YieldableValue, infer TReturn, infer TNext> ? (this: thisParam, ...params: parameters) => Generator<YieldableValue, TReturn, TNext> : never) : ((this: thisParam, ...params: parameters) => returnType)) | {
	[Symbol.runnable]: ((this: thisParam, ...params: parameters) => returnType);
} | Generator<YieldableValue, returnType, any>;
export type RunnableReturnType<T extends Runnable> = T extends Runnable<infer Ret> ? Ret : never;
export type Vector3Optional<Base, Key extends keyof Base> = {
	[K in keyof Base]: K extends Key ? never : Base[K];
} & {
	[K in keyof Base]?: K extends Key ? Base[K] : never;
};
declare module "@minecraft/server" {
	interface System {
		readonly onlinePlayers: Player[];
		/** @async Await for next tick */
		readonly nextTick: Promise<number>;
		delay(ticks?: number): Promise<number>;
		runCommand(cmd: string, target?: Dimension | Entity): CommandResult;
		runCommandAsync(cmd: string, target?: Dimension | Entity): Promise<CommandResult>;
		runTimeout<args extends any[]>(callBack: Runnable<void, args>, delay?: number, ...param: args): number;
		runInterval<args extends any[]>(callBack: Runnable<void, args>, delay?: number, ...param: args): number;
		run<args extends any[]>(callBack: Runnable<void, args>, ...param: args): number;
	}
}
declare module "@minecraft/server" {
	interface World {
		/** Represend insatnce of Dimension for overworld*/
		readonly overworld: Dimension;
		/** Represend insatnce of Dimension for nether*/
		readonly nether: Dimension;
		/** Represend insatnce of Dimension for theEnd*/
		readonly theEnd: Dimension;
		/** The Worlds Coordinate Base */
		readonly coordinateBase: CoordinateBase;
		sendMessage(object: any): void;
	}
}
declare module "@minecraft/server" {
	interface Player {
		toString(): string;
		sendMessage(object: any): void;
	}
	interface ScreenDisplay {
		readonly player: Player;
		sendMessage(object: any): void;
	}
}
declare module "@minecraft/server" {
	interface Entity extends Vector3 {
		readonly x: number;
		readonly y: number;
		readonly z: number;
		readonly rotation: Vector2;
		readonly entityLocation: Vec3;
		readonly headLocation: Vec3;
		readonly velocity: Vec3;
		readonly isBurning: boolean;
		readonly inventory: EntityInventoryComponent;
		readonly container: Container;
		readonly equipment: EntityEquipmentInventoryComponent;
		readonly mainhandSlot: ContainerSlot;
		readonly offhandSlot: ContainerSlot;
		readonly viewDirection: Vec3;
		readonly viewBase: CoordinateBase;
		readonly viewBlock?: Block;
		readonly viewEntity: Entity;
		readonly viewEntities: Entity[];
		readonly blockRayCastLocation?: Vec3;
		get mainhandItem(): ItemStack;
		set mainhanditem(item: ItemStack | ContainerSlot);
		get offhandItem(): ItemStack;
		set offhandItem(item: ItemStack | ContainerSlot);
		get health(): number;
		set health(current: number);
		toString(): string;
		getHeadLocation(): Vec3;
		getViewDirection(): Vec3;
		getVelocity(): Vec3;
		setVelocity(velocity: Vector3): void;
		getBlockFromViewDirection(options?: BlockRaycastOptions): BlockRaycastHit;
	}
}
declare module "@minecraft/server" {
	interface Dimension {
		toString(): string;
		setBlock(location: Vector3, data: BlockPermutation | BlockType | string): void;
		getBlockFromRay(location: Vector3, direction: Vector3, options?: BlockRaycastOptions): BlockRaycastHit;
	}
}
declare module "@minecraft/server" {
	interface ContainerSlot {
		toString(): string;
		enchantments: EnchantmentList;
		damage?: number;
		readonly maxDurability?: number;
	}
	interface ItemStack {
		toString(): string;
		enchantments: EnchantmentList;
		damage?: number;
		readonly maxDurability?: number;
	}
	interface ItemComponent {
		readonly item: ItemStack;
	}
}
declare module "@minecraft/server" {
	interface BlockBreakAfterEventSignal extends PromiseLike<BlockBreakAfterEvent>, Yieldable<BlockBreakAfterEvent> {
		subscribe<T extends Runnable<void, [
			BlockBreakAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			BlockBreakAfterEvent
		]>>(callback: T): T;
	}
	interface BlockExplodeAfterEventSignal extends PromiseLike<BlockExplodeAfterEvent>, Yieldable<BlockExplodeAfterEvent> {
		subscribe<T extends Runnable<void, [
			BlockExplodeAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			BlockExplodeAfterEvent
		]>>(callback: T): T;
	}
	interface BlockPlaceAfterEventSignal extends PromiseLike<BlockPlaceAfterEvent>, Yieldable<BlockPlaceAfterEvent> {
		subscribe<T extends Runnable<void, [
			BlockPlaceAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			BlockPlaceAfterEvent
		]>>(callback: T): T;
	}
	interface ButtonPushAfterEventSignal extends PromiseLike<ButtonPushAfterEvent>, Yieldable<ButtonPushAfterEvent> {
		subscribe<T extends Runnable<void, [
			ButtonPushAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ButtonPushAfterEvent
		]>>(callback: T): T;
	}
	interface ChatSendAfterEventSignal extends PromiseLike<ChatSendAfterEvent>, Yieldable<ChatSendAfterEvent> {
		subscribe<T extends Runnable<void, [
			ChatSendAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ChatSendAfterEvent
		]>>(callback: T): T;
	}
	interface DataDrivenEntityTriggerAfterEventSignal extends PromiseLike<DataDrivenEntityTriggerAfterEvent>, Yieldable<DataDrivenEntityTriggerAfterEvent> {
		subscribe<T extends Runnable<void, [
			DataDrivenEntityTriggerAfterEvent
		]>>(callback: T, options?: EntityDataDrivenTriggerEventOptions): T;
		unsubscribe<T extends Runnable<void, [
			DataDrivenEntityTriggerAfterEvent
		]>>(callback: T): T;
	}
	interface EffectAddAfterEventSignal extends PromiseLike<EffectAddAfterEvent>, Yieldable<EffectAddAfterEvent> {
		subscribe<T extends Runnable<void, [
			EffectAddAfterEvent
		]>>(callback: T, options?: EntityEventOptions): T;
		unsubscribe<T extends Runnable<void, [
			EffectAddAfterEvent
		]>>(callback: T): T;
	}
	interface EntityDieAfterEventSignal extends PromiseLike<EntityDieAfterEvent>, Yieldable<EntityDieAfterEvent> {
		subscribe<T extends Runnable<void, [
			EntityDieAfterEvent
		]>>(callback: T, options?: EntityEventOptions): T;
		unsubscribe<T extends Runnable<void, [
			EntityDieAfterEvent
		]>>(callback: T): T;
	}
	interface EntityHealthChangedAfterEventSignal extends PromiseLike<EntityHealthChangedAfterEvent>, Yieldable<EntityHealthChangedAfterEvent> {
		subscribe<T extends Runnable<void, [
			EntityHealthChangedAfterEvent
		]>>(callback: T, options?: EntityEventOptions): T;
		unsubscribe<T extends Runnable<void, [
			EntityHealthChangedAfterEvent
		]>>(callback: T): T;
	}
	interface EntityHitBlockAfterEventSignal extends PromiseLike<EntityHitBlockAfterEvent>, Yieldable<EntityHitBlockAfterEvent> {
		subscribe<T extends Runnable<void, [
			EntityHitBlockAfterEvent
		]>>(callback: T, options?: EntityEventOptions): T;
		unsubscribe<T extends Runnable<void, [
			EntityHitBlockAfterEvent
		]>>(callback: T): T;
	}
	interface EntityHitEntityAfterEventSignal extends PromiseLike<EntityHitEntityAfterEvent>, Yieldable<EntityHitEntityAfterEvent> {
		subscribe<T extends Runnable<void, [
			EntityHitEntityAfterEvent
		]>>(callback: T, options?: EntityEventOptions): T;
		unsubscribe<T extends Runnable<void, [
			EntityHitEntityAfterEvent
		]>>(callback: T): T;
	}
	interface EntityHurtAfterEventSignal extends PromiseLike<EntityHurtAfterEvent>, Yieldable<EntityHurtAfterEvent> {
		subscribe<T extends Runnable<void, [
			EntityHurtAfterEvent
		]>>(callback: T, options?: EntityEventOptions): T;
		unsubscribe<T extends Runnable<void, [
			EntityHurtAfterEvent
		]>>(callback: T): T;
	}
	interface EntityRemovedAfterEventSignal extends PromiseLike<EntityRemovedAfterEvent>, Yieldable<EntityRemovedAfterEvent> {
		subscribe<T extends Runnable<void, [
			EntityRemovedAfterEvent
		]>>(callback: T, options?: EntityEventOptions): T;
		unsubscribe<T extends Runnable<void, [
			EntityRemovedAfterEvent
		]>>(callback: T): T;
	}
	interface EntitySpawnAfterEventSignal extends PromiseLike<EntitySpawnAfterEvent>, Yieldable<EntitySpawnAfterEvent> {
		subscribe<T extends Runnable<void, [
			EntitySpawnAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			EntitySpawnAfterEvent
		]>>(callback: T): T;
	}
	interface ExplosionAfterEventSignal extends PromiseLike<ExplosionAfterEvent>, Yieldable<ExplosionAfterEvent> {
		subscribe<T extends Runnable<void, [
			ExplosionAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ExplosionAfterEvent
		]>>(callback: T): T;
	}
	interface ItemCompleteUseAfterEventSignal extends PromiseLike<ItemCompleteUseAfterEvent>, Yieldable<ItemCompleteUseAfterEvent> {
		subscribe<T extends Runnable<void, [
			ItemCompleteUseAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ItemCompleteUseAfterEvent
		]>>(callback: T): T;
	}
	interface ItemDefinitionAfterEventSignal extends PromiseLike<ItemDefinitionTriggeredAfterEvent>, Yieldable<ItemDefinitionTriggeredAfterEvent> {
		subscribe<T extends Runnable<void, [
			ItemDefinitionTriggeredAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ItemDefinitionTriggeredAfterEvent
		]>>(callback: T): T;
	}
	interface ItemReleaseUseAfterEventSignal extends PromiseLike<ItemReleaseUseAfterEvent>, Yieldable<ItemReleaseUseAfterEvent> {
		subscribe<T extends Runnable<void, [
			ItemReleaseUseAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ItemReleaseUseAfterEvent
		]>>(callback: T): T;
	}
	interface ItemStartUseAfterEventSignal extends PromiseLike<ItemStartUseAfterEvent>, Yieldable<ItemStartUseAfterEvent> {
		subscribe<T extends Runnable<void, [
			ItemStartUseAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ItemStartUseAfterEvent
		]>>(callback: T): T;
	}
	interface ItemStartUseOnAfterEventSignal extends PromiseLike<ItemStartUseOnAfterEvent>, Yieldable<ItemStartUseOnAfterEvent> {
		subscribe<T extends Runnable<void, [
			ItemStartUseOnAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ItemStartUseOnAfterEvent
		]>>(callback: T): T;
	}
	interface ItemStopUseAfterEventSignal extends PromiseLike<ItemStopUseAfterEvent>, Yieldable<ItemStopUseAfterEvent> {
		subscribe<T extends Runnable<void, [
			ItemStopUseAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ItemStopUseAfterEvent
		]>>(callback: T): T;
	}
	interface ItemStopUseOnAfterEventSignal extends PromiseLike<ItemStopUseOnAfterEvent>, Yieldable<ItemStopUseOnAfterEvent> {
		subscribe<T extends Runnable<void, [
			ItemStopUseOnAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ItemStopUseOnAfterEvent
		]>>(callback: T): T;
	}
	interface ItemUseAfterEventSignal extends PromiseLike<ItemUseAfterEvent>, Yieldable<ItemUseAfterEvent> {
		subscribe<T extends Runnable<void, [
			ItemUseAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ItemUseAfterEvent
		]>>(callback: T): T;
	}
	interface ItemUseOnAfterEventSignal extends PromiseLike<ItemUseOnAfterEvent>, Yieldable<ItemUseOnAfterEvent> {
		subscribe<T extends Runnable<void, [
			ItemUseOnAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ItemUseOnAfterEvent
		]>>(callback: T): T;
	}
	interface LeverActionAfterEventSignal extends PromiseLike<LeverActionAfterEvent>, Yieldable<LeverActionAfterEvent> {
		subscribe<T extends Runnable<void, [
			LeverActionAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			LeverActionAfterEvent
		]>>(callback: T): T;
	}
	interface ServerMessageAfterEventSignal extends PromiseLike<MessageReceiveAfterEvent>, Yieldable<MessageReceiveAfterEvent> {
		subscribe<T extends Runnable<void, [
			MessageReceiveAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			MessageReceiveAfterEvent
		]>>(callback: T): T;
	}
	interface PistonActivateAfterEventSignal extends PromiseLike<PistonActivateAfterEvent>, Yieldable<PistonActivateAfterEvent> {
		subscribe<T extends Runnable<void, [
			PistonActivateAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			PistonActivateAfterEvent
		]>>(callback: T): T;
	}
	interface PlayerJoinAfterEventSignal extends PromiseLike<PlayerJoinAfterEvent>, Yieldable<PlayerJoinAfterEvent> {
		subscribe<T extends Runnable<void, [
			PlayerJoinAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			PlayerJoinAfterEvent
		]>>(callback: T): T;
	}
	interface PlayerLeaveAfterEventSignal extends PromiseLike<PlayerLeaveAfterEvent>, Yieldable<PlayerLeaveAfterEvent> {
		subscribe<T extends Runnable<void, [
			PlayerLeaveAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			PlayerLeaveAfterEvent
		]>>(callback: T): T;
	}
	interface PlayerSpawnAfterEventSignal extends PromiseLike<PlayerSpawnAfterEvent>, Yieldable<PlayerSpawnAfterEvent> {
		subscribe<T extends Runnable<void, [
			PlayerSpawnAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			PlayerSpawnAfterEvent
		]>>(callback: T): T;
	}
	interface PressurePlatePopAfterEventSignal extends PromiseLike<PressurePlatePopAfterEvent>, Yieldable<PressurePlatePopAfterEvent> {
		subscribe<T extends Runnable<void, [
			PressurePlatePopAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			PressurePlatePopAfterEvent
		]>>(callback: T): T;
	}
	interface PressurePlatePushAfterEventSignal extends PromiseLike<PressurePlatePushAfterEvent>, Yieldable<PressurePlatePushAfterEvent> {
		subscribe<T extends Runnable<void, [
			PressurePlatePushAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			PressurePlatePushAfterEvent
		]>>(callback: T): T;
	}
	interface ProjectileHitEntityAfterEventSignal extends PromiseLike<ProjectileHitEntityAfterEvent>, Yieldable<ProjectileHitEntityAfterEvent> {
		subscribe<T extends Runnable<void, [
			ProjectileHitEntityAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ProjectileHitEntityAfterEvent
		]>>(callback: T): T;
	}
	interface ProjectileHitBlockAfterEventSignal extends PromiseLike<ProjectileHitBlockAfterEvent>, Yieldable<ProjectileHitBlockAfterEvent> {
		subscribe<T extends Runnable<void, [
			ProjectileHitBlockAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ProjectileHitBlockAfterEvent
		]>>(callback: T): T;
	}
	interface TargetBlockHitAfterEventSignal extends PromiseLike<TargetBlockHitAfterEvent>, Yieldable<TargetBlockHitAfterEvent> {
		subscribe<T extends Runnable<void, [
			TargetBlockHitAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			TargetBlockHitAfterEvent
		]>>(callback: T): T;
	}
	interface TripWireTripAfterEventSignal extends PromiseLike<TripWireTripAfterEvent>, Yieldable<TripWireTripAfterEvent> {
		subscribe<T extends Runnable<void, [
			TripWireTripAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			TripWireTripAfterEvent
		]>>(callback: T): T;
	}
	interface WeatherChangeAfterEventSignal extends PromiseLike<WeatherChangeAfterEvent>, Yieldable<WeatherChangeAfterEvent> {
		subscribe<T extends Runnable<void, [
			WeatherChangeAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			WeatherChangeAfterEvent
		]>>(callback: T): T;
	}
	interface WorldInitializeAfterEventSignal extends PromiseLike<WorldInitializeAfterEvent>, Yieldable<WorldInitializeAfterEvent> {
		subscribe<T extends Runnable<void, [
			WorldInitializeAfterEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			WorldInitializeAfterEvent
		]>>(callback: T): T;
	}
	//-----Bebore
	interface ChatSendBeforeEventSignal extends PromiseLike<ChatSendBeforeEvent>, Yieldable<ChatSendBeforeEvent> {
		subscribe<T extends Runnable<void, [
			ChatSendBeforeEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ChatSendBeforeEvent
		]>>(callback: T): T;
		cancel?: boolean;
	}
	interface DataDrivenEntityTriggerBeforeEventSignal extends PromiseLike<DataDrivenEntityTriggerBeforeEvent>, Yieldable<DataDrivenEntityTriggerBeforeEvent> {
		subscribe<T extends Runnable<void, [
			DataDrivenEntityTriggerBeforeEvent
		]>>(callback: T, options?: EntityDataDrivenTriggerEventOptions): T;
		unsubscribe<T extends Runnable<void, [
			DataDrivenEntityTriggerBeforeEvent
		]>>(callback: T): T;
		cancel?: boolean;
	}
	interface ExplosionBeforeEventSignal extends PromiseLike<ExplosionBeforeEvent>, Yieldable<ExplosionBeforeEvent> {
		subscribe<T extends Runnable<void, [
			ExplosionBeforeEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ExplosionBeforeEvent
		]>>(callback: T): T;
		cancel?: boolean;
	}
	interface ItemDefinitionBeforeEventSignal extends PromiseLike<ItemDefinitionTriggeredBeforeEvent>, Yieldable<ItemDefinitionTriggeredBeforeEvent> {
		subscribe<T extends Runnable<void, [
			ItemDefinitionTriggeredBeforeEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ItemDefinitionTriggeredBeforeEvent
		]>>(callback: T): T;
		cancel?: boolean;
	}
	interface ItemUseBeforeEventSignal extends PromiseLike<ItemUseBeforeEvent>, Yieldable<ItemUseBeforeEvent> {
		subscribe<T extends Runnable<void, [
			ItemUseBeforeEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ItemUseBeforeEvent
		]>>(callback: T): T;
		cancel?: boolean;
	}
	interface ItemUseOnBeforeEventSignal extends PromiseLike<ItemUseOnBeforeEvent>, Yieldable<ItemUseOnBeforeEvent> {
		subscribe<T extends Runnable<void, [
			ItemUseOnBeforeEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			ItemUseOnBeforeEvent
		]>>(callback: T): T;
		cancel?: boolean;
	}
	interface PistonActivateBeforeEventSignal extends PromiseLike<PistonActivateBeforeEvent>, Yieldable<PistonActivateBeforeEvent> {
		subscribe<T extends Runnable<void, [
			PistonActivateBeforeEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			PistonActivateBeforeEvent
		]>>(callback: T): T;
		cancel?: boolean;
	}
	//-----System
	interface WatchdogTerminateBeforeEventSignal extends PromiseLike<WatchdogTerminateBeforeEvent>, Yieldable<WatchdogTerminateBeforeEvent> {
		subscribe<T extends Runnable<void, [
			WatchdogTerminateBeforeEvent
		]>>(callback: T): T;
		unsubscribe<T extends Runnable<void, [
			WatchdogTerminateBeforeEvent
		]>>(callback: T): T;
		cancel?: boolean;
	}
	interface ScriptEventCommandMessageAfterEventSignal extends PromiseLike<ScriptEventCommandMessageAfterEvent>, Yieldable<ScriptEventCommandMessageAfterEvent> {
		subscribe<T extends Runnable<void, [
			ScriptEventCommandMessageAfterEvent
		]>>(callback: T, options?: ScriptEventMessageFilterOptions): T;
		unsubscribe<T extends Runnable<void, [
			ScriptEventCommandMessageAfterEvent
		]>>(callback: T): T;
	}
	//-----Custom
	interface WorldAfterEvents {
		readonly playerDie: PlayerDieAfterEventSignal;
		readonly playerHurt: PlayerHurtAfterEventSignal;
		readonly playerHealthChanged: PlayerHealthChangedAfterEventSignal;
		readonly playerHitEntity: PlayerHitEntityAfterEventSignal;
		readonly playerHitBlock: PlayerHitBlockAfterEventSignal;
	}
}
export interface PlayerDieAfterEventSignal extends PromiseLike<PlayerDieAfterEvent>, Yieldable<PlayerDieAfterEvent> {
	subscribe<T extends Runnable<void, [
		PlayerDieAfterEvent
	]>>(callback: T): T;
	unsubscribe<T extends Runnable<void, [
		PlayerDieAfterEvent
	]>>(callback: T): T;
}
export interface PlayerDieAfterEvent extends MC.EntityDieAfterEvent {
	readonly deadEntity: MC.Player;
}
export interface PlayerHurtAfterEventSignal extends PromiseLike<PlayerHurtAfterEvent>, Yieldable<PlayerHurtAfterEvent> {
	subscribe<T extends Runnable<void, [
		PlayerHurtAfterEvent
	]>>(callback: T): T;
	unsubscribe<T extends Runnable<void, [
		PlayerHurtAfterEvent
	]>>(callback: T): T;
}
export interface PlayerHurtAfterEvent extends MC.EntityHurtAfterEvent {
	readonly hurtEntity: MC.Player;
}
export interface PlayerHealthChangedAfterEventSignal extends PromiseLike<PlayerHealthChangedAfterEvent>, Yieldable<PlayerHealthChangedAfterEvent> {
	subscribe<T extends Runnable<void, [
		PlayerHealthChangedAfterEvent
	]>>(callback: T): T;
	unsubscribe<T extends Runnable<void, [
		PlayerHealthChangedAfterEvent
	]>>(callback: T): T;
}
export interface PlayerHealthChangedAfterEvent extends MC.EntityHealthChangedAfterEvent {
	readonly entity: MC.Player;
}
export interface PlayerHitEntityAfterEventSignal extends PromiseLike<PlayerHitEntityAfterEvent>, Yieldable<PlayerHitEntityAfterEvent> {
	subscribe<T extends Runnable<void, [
		PlayerHitEntityAfterEvent
	]>>(callback: T): T;
	unsubscribe<T extends Runnable<void, [
		PlayerHitEntityAfterEvent
	]>>(callback: T): T;
}
export interface PlayerHitEntityAfterEvent extends MC.EntityHitEntityAfterEvent {
	readonly damagingEntity: MC.Player;
}
export interface PlayerHitBlockAfterEventSignal extends PromiseLike<PlayerHitBlockAfterEvent>, Yieldable<PlayerHitBlockAfterEvent> {
	subscribe<T extends Runnable<void, [
		PlayerHitBlockAfterEvent
	]>>(callback: T): T;
	unsubscribe<T extends Runnable<void, [
		PlayerHitBlockAfterEvent
	]>>(callback: T): T;
}
export interface PlayerHitBlockAfterEvent extends MC.EntityHitBlockAfterEvent {
	readonly damagingEntity: MC.Player;
}
export declare var PlayerDieAfterEventSignal: {
	new (): PlayerDieAfterEventSignal;
	readonly prototype: PlayerDieAfterEventSignal;
};
export declare var PlayerHurtAfterEventSignal: {
	new (): PlayerHurtAfterEventSignal;
	readonly prototype: PlayerHurtAfterEventSignal;
};
export declare var PlayerHealthChangedAfterEventSignal: {
	new (): PlayerHealthChangedAfterEventSignal;
	readonly prototype: PlayerHealthChangedAfterEventSignal;
};
export declare var PlayerHitEntityAfterEventSignal: {
	new (): PlayerHitEntityAfterEventSignal;
	readonly prototype: PlayerHitEntityAfterEventSignal;
};
export declare var PlayerHitBlockAfterEventSignal: {
	new (): PlayerHitBlockAfterEventSignal;
	readonly prototype: PlayerHitBlockAfterEventSignal;
};
export class BlockRaycastHit implements MC.Vector3, MC.BlockRaycastHit {
	readonly x: number;
	readonly y: number;
	readonly z: number;
	readonly block: MC.Block;
	readonly face: MC.Direction;
	readonly faceLocation: MC.Vector3;
	readonly faceVetor: Vec3;
}
export * from "nbt-serializer";

export {};


import {World,System, Scoreboard} from "@minecraft/server";
declare global{
    const scoreboard: Scoreboard;
    const system: System;
    const world: World;
    const currentTick: number;
    const nextTick: Promise<number>;
    function setTimeout<args extends any[]>(callBack: Runnable<void,args>,delay?: number, ...param: args): number
    function setInterval<args extends any[]>(callBack: Runnable<void,args>,delay?: number, ...param: args): number
    function clearTimeout(id: number): void;
    function clearInterval(id: number): void;
    function delay(delay?: number): Promise<number>;
    //----------------------
    var GeneratorFunction: GeneratorFunction;
    var GeneratorFunctionConstructor: GeneratorFunctionConstructor;
    var AsyncGeneratorFunction: AsyncGeneratorFunction;
    var AsyncGeneratorFunctionConstructor: AsyncGeneratorFunctionConstructor;
    var AsyncFunctionConstructor: FunctionConstructor;
    function displayError(error: Error): void
    interface Generator<T = unknown, TReturn = any, TNext = unknown> extends Iterator<T, TReturn, TNext> {
        // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
        next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
        return(value: TReturn): IteratorResult<T, TReturn>;
        throw(e: any): IteratorResult<T, TReturn>;
        [Symbol.iterator](): Generator<T, TReturn, TNext>;
    }
    interface GeneratorFunction {
        /**
         * Creates a new Generator object.
         * @param args A list of arguments the function accepts.
         */
        new (...args: any[]): Generator;
        /**
         * Creates a new Generator object.
         * @param args A list of arguments the function accepts.
         */
        (...args: any[]): Generator;
        /**
         * The length of the arguments.
         */
        readonly length: number;
        /**
         * Returns the name of the function.
         */
        readonly name: string;
        /**
         * A reference to the prototype.
         */
        readonly prototype: Generator;
    }
    interface GeneratorFunctionConstructor {
        /**
         * Creates a new Generator function.
         * @param args A list of arguments the function accepts.
         */
        new (...args: string[]): GeneratorFunction;
        /**
         * Creates a new Generator function.
         * @param args A list of arguments the function accepts.
         */
        (...args: string[]): GeneratorFunction;
        /**
         * The length of the arguments.
         */
        readonly length: number;
        /**
         * Returns the name of the function.
         */
        readonly name: string;
        /**
         * A reference to the prototype.
         */
        readonly prototype: GeneratorFunction;
    }
    interface AsyncGenerator<T = unknown, TReturn = any, TNext = unknown> extends AsyncIterator<T, TReturn, TNext> {
        // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
        next(...args: [] | [TNext]): Promise<IteratorResult<T, TReturn>>;
        return(value: TReturn | PromiseLike<TReturn>): Promise<IteratorResult<T, TReturn>>;
        throw(e: any): Promise<IteratorResult<T, TReturn>>;
        [Symbol.asyncIterator](): AsyncGenerator<T, TReturn, TNext>;
    }
    interface AsyncGeneratorFunction {
        /**
         * Creates a new AsyncGenerator object.
         * @param args A list of arguments the function accepts.
         */
        new (...args: any[]): AsyncGenerator;
        /**
         * Creates a new AsyncGenerator object.
         * @param args A list of arguments the function accepts.
         */
        (...args: any[]): AsyncGenerator;
        /**
         * The length of the arguments.
         */
        readonly length: number;
        /**
         * Returns the name of the function.
         */
        readonly name: string;
        /**
         * A reference to the prototype.
         */
        readonly prototype: AsyncGenerator;
    }
    interface AsyncGeneratorFunctionConstructor {
        /**
         * Creates a new AsyncGenerator function.
         * @param args A list of arguments the function accepts.
         */
        new (...args: string[]): AsyncGeneratorFunction;
        /**
         * Creates a new AsyncGenerator function.
         * @param args A list of arguments the function accepts.
         */
        (...args: string[]): AsyncGeneratorFunction;
        /**
         * The length of the arguments.
         */
        readonly length: number;
        /**
         * Returns the name of the function.
         */
        readonly name: string;
        /**
         * A reference to the prototype.
         */
        readonly prototype: AsyncGeneratorFunction;
    }
}
declare global {
    interface SymbolConstructor{
        readonly runnable: unique symbol
        readonly isAsyncGenerator: unique symbol
        readonly isGenerator: unique symbol
        readonly isNotThenble: unique symbol
        readonly thenable: unique symbol
    }
    interface Console{[Symbol.toStringTag]: "Console"}
    interface Function{[Symbol.runnable]: ()=>this}
    interface FunctionConstructor{
        run<returnType,argumetns extends any[],thisArg = any>(runnable: Runnable<returnType,argumetns,thisArg>,thisArg: thisArg, ...params: argumetns): returnType;
        isRunnable(a: any): a is Runnable;
        hasRunnable(a: any): a is {[Symbol.runnable]: ()=>any};
    }
    interface Generator<T = unknown, TReturn = any, TNext = unknown>{readonly [Symbol.isGenerator]: true}
    interface AsyncGenerator{readonly [Symbol.isAsyncGenerator]: true, readonly [Symbol.isGenerator]: true}
    interface GeneratorFunction{isGenerator(gen: object): gen is Generator; Run(generator: any): PromiseLike<any>}
    interface AsyncGeneratorFunction{isAsyncGenerator(gen: object): gen is AsyncGenerator;}
    interface Date{
        toHHMMSS(): `${number}:${number}:${number}`;
    }
    interface Math{
        deg(number: number): number
        rad(number:number): number
        randomBetween(min: number): number
        randomBetween(max: number, min: number): number
    }
    interface NumberConstructor{
        readonly unitTypes: string[]
    }
    interface Array<T>{
        readonly randomeElement: T;
        remove(any: T): void;
        removeAll(any: T): void;
    }
    interface Number{
        unitFormat(place?: number, space?:string, exponent?:number, component?:number): string;
        setLength(length?:number, radix?:number): string
        floor(): number
    }
    interface Generator{readonly [Symbol.isGenerator]: true}
    interface AsyncGenerator{readonly [Symbol.isAsyncGenerator]: true}
    interface GeneratorFunction{isGenerator(gen: object): gen is Generator;}
    interface AsyncGeneratorFunction{isAsyncGenerator(gen: object): gen is AsyncGenerator;}
}