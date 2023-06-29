declare global{
    var nextTick: Promise<number>;
    var currentTick: number;
    var GeneratorFunction: GeneratorFunction;
    var GeneratorFunctionConstructor: GeneratorFunctionConstructor;
    var AsyncGeneratorFunction: AsyncGeneratorFunction;
    var AsyncGeneratorFunctionConstructor: AsyncGeneratorFunctionConstructor;
    var AsyncFunctionConstructor: AsyncFunctionConstructor;
    interface SymbolConstructor{
        readonly isGenerator: Symbol
        readonly isAsyncGenerator: Symbol
        readonly runnable: Symbol
    }
    interface FunctionConstructor{
        run<k extends []>(thisArg=null, runnable: {[Symbol.runnable]: (...args:k)=>infer l}, ...args: k): l; 
    }
    interface Function{
        [Symbol.runnable](): this;
    }
    interface Console{
        fileLog: Console['log'];
        errorHandle(er: any): void;
    }
    interface Date{
        toHHMMSS(): string
    }
    interface Math{
        rad(deg: number): number
        deg(rad: number): number
        randomBetween(max: number, min?: number): number
    }
    interface NumberConstructor{
        readonly unitTypes: string[];
    }
    interface Number{
        unitFormat(place?: number, space?: string): string;
        setLength(length=4, radix=10): string;
        floor(): string;
    }
    interface Array<T>{
        readonly randomElement: T;
        remove(value: T): this;
        removeAll(value: T): this;
    }
    interface Generator<T = unknown, TReturn = any, TNext = unknown> extends Iterator<T, TReturn, TNext> {
        // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
        next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
        return(value: TReturn): IteratorResult<T, TReturn>;
        throw(e: any): IteratorResult<T, TReturn>;
        [Symbol.iterator](): Generator<T, TReturn, TNext>;
    }
    interface GeneratorFunction {
        isGenerator(generator: any): generator is Generator
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
    interface GeneratorFunctionConstructor extends FunctionConstructor {
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
        isAsynGenerator(generator: any): generator is AsyncGenerator
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
    interface AsyncFunctionConstructor extends FunctionConstructor{
        /**
            * Creates a new AsyncGenerator function.
            * @param args A list of arguments the function accepts.
            */
        new (...args: string[]): AsyncFunction;
        /**
            * Creates a new AsyncGenerator function.
            * @param args A list of arguments the function accepts.
            */
        (...args: string[]): AsyncFunction;
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
        readonly prototype: AsyncFunction;
    }
    interface AsyncFunction extends Function{
        (): Promise
        readonly prototype: Promise
    }
}
export const Generator: Generator;
export const GeneratorFunction: GeneratorFunction;
export const GeneratorFunctionConstructor: GeneratorFunctionConstructor;
export const AsyncGenerator: AsyncGenerator;
export const AsyncGeneratorFunction: AsyncGeneratorFunction;
export const AsyncGeneratorFunctionConstructor: AsyncGeneratorFunctionConstructor;
export const AsyncFunctionConstructor: AsyncFunctionConstructor