//import type { Runnable } from "types";
import type { SyncPromise } from "core";
import type { ConfirmFormData } from "core";
//__startOfFile__//
import {World, System, Scoreboard, Player} from "@minecraft/server";
declare global{
    const scoreboard: Scoreboard;
    const system: System;
    const world: World;
    const currentTick: number;
    const nextTick: Promise<number>;
    function setTimeout<args extends any[]>(callBack: (...args: args)=>any,delay?: number, ...param: args): number
    function setInterval<args extends any[]>(callBack:(...args: args)=>any,delay?: number, ...param: args): number
    function clearTimeout(id: number): void;
    function clearInterval(id: number): void;
    function delay(delay?: number): Promise<number>;
    function confirm(player: Player, message?: string, title?: string): Promise<boolean>;
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
        readonly randomElement: T;
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