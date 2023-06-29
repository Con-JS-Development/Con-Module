export declare const GeneratorFunction: GeneratorFunction;
export declare const GeneratorFunctionConstructor: GeneratorFunctionConstructor;
export declare const Generator: Generator<unknown, any, unknown>;
export declare const AsyncGeneratorFunction: AsyncGeneratorFunction;
export declare const AsyncGeneratorFunctionConstructor: AsyncGeneratorFunctionConstructor;
export declare const AsyncGenerator: AsyncGenerator<unknown, any, unknown>;
export declare const AsyncFunctionConstructor: FunctionConstructor;
export type Runnable<returnType = any, args extends any[] = []> = {
    [Symbol.runnable](): (...args: args) => returnType;
} | ((...params: args) => returnType);
export type RunnableReturnType<n extends Runnable> = n extends () => any ? ReturnType<n> : (n extends {
    [Symbol.runnable](): (...args: any) => any;
} ? ReturnType<ReturnType<n[typeof Symbol.runnable]>> : never);
declare global {
    var GeneratorFunction: GeneratorFunction;
    var GeneratorFunctionConstructor: GeneratorFunctionConstructor;
    var AsyncGeneratorFunction: GeneratorFunction;
    var AsyncGeneratorFunctionConstructor: GeneratorFunctionConstructor;
    var AsyncFunctionConstructor: FunctionConstructor;
    var nextTick: Promise<number>;
    var currentTick: number;
    var sleep: (delay?: number) => Promise<void>;
    interface SymbolConstructor {
        readonly runnable: unique symbol;
        readonly isAsyncGenerator: unique symbol;
        readonly isGenerator: unique symbol;
    }
    interface Console {
        [Symbol.toStringTag]: "Console";
        logger(): void;
        errorHandler(error: unknown): void;
    }
    interface Function {
        [Symbol.runnable](): () => any;
    }
    interface FunctionConstructor {
        run<returnType, m extends Runnable<returnType, args>, args extends any[]>(thisArg: any, runnable: m, ...params: args): returnType;
        isRunnable(a: any): a is Runnable;
    }
    interface Date {
        toHHMMSS(): `${number}:${number}:${number}`;
    }
    interface Math {
        deg(number: number): number;
        rad(number: number): number;
        randomBetween(min: number): number;
        randomBetween(max: number, min: number): number;
    }
    interface NumberConstructor {
        unitTypes: string[];
    }
    interface Array<T> {
        get randomeElement(): T;
        remove(any: T): void;
        removeAll(any: T): void;
    }
    interface Number {
        unitFormat(place?: number, space?: string, exponent?: number, component?: number): string;
        setLength(length?: number, radix?: number): string;
        floor(): number;
    }
    interface Generator {
        readonly [Symbol.isGenerator]: true;
    }
    interface AsyncGenerator {
        readonly [Symbol.isAsyncGenerator]: true;
    }
    interface GeneratorFunction {
        isGenerator(gen: object): gen is Generator;
    }
    interface AsyncGeneratorFunction {
        isAsyncGenerator(gen: object): gen is AsyncGenerator;
    }
}
