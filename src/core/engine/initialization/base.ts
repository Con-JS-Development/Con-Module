//import type { Runnable } from "types";
export const GeneratorFunction = Object.getPrototypeOf(function* () { }) as GeneratorFunction;
export const GeneratorFunctionConstructor = GeneratorFunction.constructor as GeneratorFunctionConstructor;
const Generator = GeneratorFunction.prototype as Generator;
export const AsyncGeneratorFunction = Object.getPrototypeOf(async function* () { }) as AsyncGeneratorFunction;
export const AsyncGeneratorFunctionConstructor = AsyncGeneratorFunction.constructor as AsyncGeneratorFunctionConstructor;
const AsyncGenerator = AsyncGeneratorFunction.prototype as AsyncGenerator;
export const AsyncFunctionConstructor = Object.getPrototypeOf(async function () { }).constructor as FunctionConstructor;
Object.assign(Symbol,{
    runnable:Symbol("Symbol.runnable"),
    isGenerator:Symbol("Symbol.isGenerator"),
    isAsyncGenerator:Symbol("Symbol.isAsyncGenerator"),
    isNotThenable:Symbol("Symbol.isNotThenable"),
    thenable:Symbol("Symbol.thenable"),
});
console[Symbol.toStringTag] = "Console";
/*
Function.isRunnable = function isRunnable(runnable): runnable is Runnable{
    return (typeof runnable === "function") || (typeof runnable[Symbol.runnable] === "function") || GeneratorFunction.isGenerator(runnable);
}
Function.run = function run<returnType,argumetns extends any[],thisArg = any>(runnable: Runnable<returnType,argumetns,thisArg>,thisArg: thisArg, ...params: argumetns): returnType{
    if(!Function.isRunnable(runnable)) throw new TypeError(`The object must be the runnable. Make sure the method has a property with the key Symbol.runnable.`);
    //@ts-ignore
    if(Function.hasRunnable(runnable)) return runnable[Symbol.runnable].call(thisArg, ...params) as any;
    if(runnable as any instanceof GeneratorFunctionConstructor || GeneratorFunction.isGenerator(runnable)) return GeneratorFunction.Run(runnable) as any;
    if(typeof runnable === "function") return (runnable as any)(...params) as any;
    return null as any;
}
Function.hasRunnable = function hasRunnable(runnable): runnable is {[Symbol.runnable]:()=>any}{
    return typeof runnable[Symbol.runnable] === "function";
}*/
GeneratorFunction.isGenerator = function isGenerator(gen):gen is Generator{return Symbol.isGenerator in gen}
AsyncGeneratorFunction.isAsyncGenerator = function isAsyncGenerator(gen): gen is AsyncGenerator{return Symbol.isAsyncGenerator in gen}
Object.defineProperty(Generator,Symbol.isGenerator,{value:true});
Object.defineProperty(AsyncGenerator,Symbol.isGenerator,{value:true});
Object.defineProperty(AsyncGenerator,Symbol.isAsyncGenerator,{value:true});
Object.defineProperty(Number,"unitTypes",{value:['', 'k', 'M', 'G', 'T', 'E']});
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