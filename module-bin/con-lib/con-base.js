import { system } from "@minecraft/server";
export const GeneratorFunction = Object.getPrototypeOf(function* () { });
export const GeneratorFunctionConstructor = GeneratorFunction.constructor;
export const Generator = GeneratorFunction.prototype;
export const AsyncGeneratorFunction = Object.getPrototypeOf(async function* () { });
export const AsyncGeneratorFunctionConstructor = AsyncGeneratorFunction.constructor;
export const AsyncGenerator = AsyncGeneratorFunction.prototype;
export const AsyncFunctionConstructor = Object.getPrototypeOf(async function () { }).constructor;
console[Symbol.toStringTag] = "Console";
console.logger = console.log;
console.log = console.warn.bind(console, "[Log]");
console.warn = console.warn.bind(console, "[Warn]");
console.error = console.error.bind(console, "[Error]");
console.errorHandler = function (er) {
    return console.error(er ?? (er?.constructor?.name ?? ""), er?.stack ?? "");
};
Number.unitTypes = ['', 'k', 'M', 'G', 'T', 'E'];
Date.prototype.toHHMMSS = function () {
    return this.toTimeString().split(' ')[0];
};
Object.assign(Symbol, {
    runnable: Symbol("Symbol.runnable"),
    isGenerator: Symbol("Symbol.isGenerator"),
    isAsyncGenerator: Symbol("Symbol.isAsyncGenerator")
});
Function.prototype[Symbol.runnable] = function () { return this; };
Function.isRunnable = function isRunnable(runnable) { return (Symbol.runnable in runnable || typeof (runnable[Symbol.runnable]) == 'function'); };
Function.run = function run(thisArg, runnable, ...params) {
    if (!(Symbol.runnable in runnable))
        throw new TypeError(`The object must be the runnable. Make sure the method has a property with the key Symbol.runnable.`);
    return runnable[Symbol.runnable]().call(thisArg, ...params);
};
GeneratorFunction.isGenerator = function isGenerator(gen) { return Symbol.isGenerator in gen; };
AsyncGeneratorFunction.isAsyncGenerator = function isAsyncGenerator(gen) { return Symbol.isAsyncGenerator in gen; };
Object.assign(globalThis, {
    GeneratorFunction,
    GeneratorFunctionConstructor,
    AsyncGeneratorFunction,
    AsyncGeneratorFunctionConstructor,
    AsyncFunctionConstructor,
    sleep(sleep = 1) { return new Promise(res => system.runTimeout(res, sleep)); },
    print: console.warn,
    setInterval: system.runInterval.bind(system),
    setTimeout: system.runTimeout.bind(system),
    clearInterval: system.clearRun.bind(system),
    clearTimeout: system.clearRun.bind(system),
    [Symbol.toStringTag]: "GlobalThis"
});
Object.defineProperties(globalThis, {
    nextTick: { get() { return new Promise(res => setTimeout(res.bind(null, system.currentTick + 1))); } },
    currentTick: { get() { return system.currentTick; } }
});
Object.assign(Math, {
    deg(number) { return (number * 180) * Math.PI; },
    rad(number) { return (number * Math.PI) / 180; },
    randomBetween(max, min = 0) {
        const [n, x] = max > min ? [max, min] : [min, max];
        return Math.random() * (x - n) + n;
    }
});
Object.defineProperties(Array.prototype, {
    randomElement: { get() { return this[Math.floor(Math.random() * this.length)]; } },
    remove: {
        value(value) {
            let i = this.indexOf(value);
            if (i > -1)
                this.splice(i, 1);
            return this;
        }
    },
    removeAll: {
        value(value) {
            let i = 0;
            while (i < this.length) {
                if (this[i] === value)
                    this.splice(i, 1);
                else
                    ++i;
            }
            return this;
        }
    }
});
Object.assign(Number.prototype, {
    unitFormat(place = 1, space = "", exponent = 3, component = 1) {
        for (let i = 0, n = this, c = 10 ** (exponent + component), e = 10 ** exponent; true; i++) {
            if (n >= c) {
                n /= e;
                continue;
            }
            return nFix(n, place) + space + (Number.unitTypes[i] ?? "");
        }
    },
    setLength(length = 4, radix = 10) { return this.toString(radix).padStart(length, '0'); },
    floor() { return ~~this; }
});
function nFix(num, place) {
    let n = "" + num;
    let n2 = n.split('.');
    if (n2.length == 1)
        return n;
    else if (n2[1]?.length < place)
        return n;
    else
        return num.toFixed(place);
}
