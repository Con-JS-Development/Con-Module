import { system } from "@minecraft/server";

export const GeneratorFunction = Object.getPrototypeOf(function* () { }) as GeneratorFunction;
export const GeneratorFunctionConstructor = GeneratorFunction.constructor as GeneratorFunctionConstructor;
export const Generator = GeneratorFunction.prototype as Generator;
export const AsyncGeneratorFunction = Object.getPrototypeOf(async function* () { }) as AsyncGeneratorFunction;
export const AsyncGeneratorFunctionConstructor = AsyncGeneratorFunction.constructor as AsyncGeneratorFunctionConstructor;
export const AsyncGenerator = AsyncGeneratorFunction.prototype as AsyncGenerator;
export const AsyncFunctionConstructor = Object.getPrototypeOf(async function () { }).constructor as FunctionConstructor;
export type Runnable<returnType = any, args extends any[] = []> = {
    [Symbol.runnable](): (...args: args)=>returnType
} | ((...params: args)=>returnType)
export type RunnableReturnType<n extends Runnable> = n extends ()=>any?ReturnType<n>:(n extends {[Symbol.runnable](): (...args: any)=>any}?ReturnType<ReturnType<n[typeof Symbol.runnable]>>: never);

declare global{
    var GeneratorFunction: GeneratorFunction;
    var GeneratorFunctionConstructor: GeneratorFunctionConstructor;
    var AsyncGeneratorFunction: GeneratorFunction;
    var AsyncGeneratorFunctionConstructor: GeneratorFunctionConstructor;
    var AsyncFunctionConstructor: FunctionConstructor;
    var nextTick: Promise<number>;
    var currentTick: number;
    var delay: (delay?: number)=>Promise<void>
    interface SymbolConstructor{
        readonly runnable: unique symbol
        readonly isAsyncGenerator: unique symbol
        readonly isGenerator: unique symbol
    }
    interface Console{
        [Symbol.toStringTag]: "Console"
        logger(): void
        errorHandler(error: unknown): void
    }
    interface Function{
        [Symbol.runnable](): ()=>any
    }
    interface FunctionConstructor{
        run<returnType,m extends Runnable<returnType,args>,args extends any[]>(thisArg: any, runnable: m, ...params: args ): returnType;
        isRunnable(a: any): a is Runnable
    }
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
        unitTypes: string[]
    }
    interface Array<T>{
        get randomeElement(): T;
        remove(any: T): void;
        removeAll(any: T): void;
    }
    interface Number{
        unitFormat(place?: number, space?:string, exponent?:number, component?:number): string;
        setLength(length?:number, radix?:number): string
        floor(): number
    }
    interface Generator{
        readonly [Symbol.isGenerator]: true
    }
    interface AsyncGenerator{
        readonly [Symbol.isAsyncGenerator]: true
    }
    interface GeneratorFunction{
        isGenerator(gen: object): gen is Generator;
    }
    interface AsyncGeneratorFunction{
        isAsyncGenerator(gen: object): gen is AsyncGenerator;
    }
}
console[Symbol.toStringTag] = "Console";
console.logger = console.log;
console.log = console.warn.bind(console,"[Log]");
console.warn = console.warn.bind(console,"[Warn]");
console.error = console.error.bind(console,"[Error]");
console.errorHandler = function(er){/*@ts-ignore*/
    return console.error(er??(er?.constructor?.name??""),er?.stack??"");}
Number.unitTypes = ['', 'k', 'M', 'G', 'T', 'E'];
Date.prototype.toHHMMSS = function():`${number}:${number}:${number}`{ //@ts-ignore 
    return this.toTimeString().split(' ')[0]; 
}
Object.assign(Symbol,{
    runnable:Symbol("Symbol.runnable"),
    isGenerator:Symbol("Symbol.isGenerator"),
    isAsyncGenerator:Symbol("Symbol.isAsyncGenerator")
});
Function.prototype[Symbol.runnable] = function (){return this as ()=>void;}
Function.isRunnable = function isRunnable(runnable): runnable is Runnable{return (Symbol.runnable in runnable || typeof(runnable[Symbol.runnable]) == 'function');}
Function.run = function run<returnType,m extends Runnable<returnType,args>,args extends any[]>(thisArg: any, runnable: m, ...params: args): returnType{
    if(!(Symbol.runnable in runnable))
        throw new TypeError(`The object must be the runnable. Make sure the method has a property with the key Symbol.runnable.`);
    return runnable[Symbol.runnable]().call(thisArg,...params);
}
GeneratorFunction.isGenerator = function isGenerator(gen):gen is Generator{return Symbol.isGenerator in gen}
AsyncGeneratorFunction.isAsyncGenerator = function isAsyncGenerator(gen): gen is AsyncGenerator{return Symbol.isAsyncGenerator in gen}
Object.assign(globalThis,{
    GeneratorFunction,
    GeneratorFunctionConstructor,
    AsyncGeneratorFunction,
    AsyncGeneratorFunctionConstructor,
    AsyncFunctionConstructor,
    delay(timeout = 1){ return new Promise(res=>system.runTimeout(res as ()=>void,timeout))},
    print: console.warn,
    setInterval: system.runInterval.bind(system),
    setTimeout: system.runTimeout.bind(system),
    clearInterval: system.clearRun.bind(system),
    clearTimeout: system.clearRun.bind(system),
    [Symbol.toStringTag]:"GlobalThis"
});
Object.defineProperties(globalThis, {
    nextTick: { get() { return new Promise(res => setTimeout(res.bind(null,system.currentTick + 1))); } },
    currentTick: { get() { return system.currentTick; } }
});
Object.assign(Math, {
    deg(number: number) { return (number * 180) * Math.PI }, //degresses
    rad(number:number) { return (number * Math.PI) / 180 }, //radians
    randomBetween(max: number, min = 0) {
        const [n, x] = max > min ? [max, min] : [min, max]
        return Math.random() * (x - n) + n;
    }
});
Object.defineProperties(Array.prototype, {
    randomElement: { get() { return this[Math.floor(Math.random() * this.length)]; } },
    remove: {
        value(value:any) {
            let i = this.indexOf(value);
            if (i > -1) this.splice(i, 1);
            return this;
        }
    },
    removeAll: {
        value(value:any) {
            let i = 0;
            while (i < this.length) {
                if (this[i] === value) this.splice(i, 1);
                else ++i;
            }
            return this;
        }
    }
});
Object.assign(Number.prototype, {
    unitFormat(place = 1, space = "", exponent = 3, component = 1) {
        for (let i = 0, n = this as unknown as number, c = 10 ** (exponent + component), e = 10 ** exponent; true; i++) {
            if (n >= c) {
                n /= e;
                continue;
            }
            return nFix(n, place) + space + (Number.unitTypes[i] ?? "");
        }
    },
    setLength(length=4, radix=10) {return (this as unknown as number).toString(radix).padStart(length, '0');},
    floor() { return ~~this }
});
function nFix(num:number, place:number) {
    let n = "" + num;
    let n2 = n.split('.');
    if (n2.length == 1) return n;
    else if (n2[1]?.length < place) return n;
    else return num.toFixed(place);
}