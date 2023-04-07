import { system } from '@minecraft/server';
import * as Gen from './generators.js';

const {
    GeneratorFunction,
    GeneratorFunctionConstructor,
    Generator,
    AsyncGeneratorFunction,
    AsyncGeneratorFunctionConstructor,
    AsyncGenerator,
    AsyncFunctionConstructor
} = Gen;

Object.assign(Function.prototype, {
    [Symbol.runnable](){return this;}
});
Object.assign(Function, {
    run(thisArg, runnable, ...args){
        if(!Symbol.runnable in method) throw new TypeError(`The object must be the runnable. Make sure the method has a property with the key Symbol.runnable.`);
        return runnable[Symbol.runnable].call(thisArg,...args);
    }
});
Object.assign(globalThis, {
    GeneratorFunction,
    GeneratorFunctionConstructor,
    AsyncGeneratorFunction,
    AsyncGeneratorFunctionConstructor,
    AsyncFunctionConstructor,
    print: console.warn.bind(console,"[Log]"),
    setInterval: system.runInterval.bind(system),
    setTimeout: system.runTimeout.bind(system),
    clearInterval: system.clearRun.bind(system),
    clearTimeout: system.clearRun.bind(system)
});
Object.defineProperties(globalThis, {
    nextTick: { get() { return new Promise(res => setTimeout(res.bind(null,system.currentTick + 1))); } },
    currentTick: { get() { return system.currentTick; } }
});
console.fileLog = console.log;
console.log = console.warn.bind(console,"[Log]");
console.warn = console.warn.bind(console,"[Warn]");
console.error = console.error.bind(console,"[Error]");
console.errorHandle = function(er){return this.error(er??(er?.constructor?.name??""),er?.stack??"");}

Object.assign(Date.prototype, {
    toHHMMSS() { return this.toTimeString().split(' ')[0]; }
});

Object.assign(Math, {
    deg(number) { return (number * 180) * this.PI }, //degresses
    rad(number) { return (number * this.PI) / 180 }, //radians
    randomBetween(max, min = 0) {
        const [n, x] = max > min ? [max, min] : [min, max]
        return this.random() * (x - n) + n;
    }
});

Number.unitTypes = ['', 'k', 'M', 'G', 'T', 'E'];
// 56,485 -> 56.4k
Object.assign(Number.prototype, {
    unitFormat: function (place = 1, space = "", exponent = 3, component = 1) {
        for (let i = 0, n = this, c = 10 ** (exponent + component), e = 10 ** exponent; true; i++) {
            if (n >= c) {
                n /= e;
                continue;
            }
            return nFix(n, place) + space + (Number.unitTypes[i] ?? "");
        }
    },
    setLength(length=4, radix=10) {return this.toString(radix).padStart(length, '0');},
    floor() { return ~~this }
});
function nFix(num, place) {
    let n = "" + num;
    let n2 = n.split('.');
    if (n2.length == 1) return n;
    else if (n2[1]?.length < place) return n;
    else return num.toFixed(place);

}
Object.defineProperties(Array.prototype, {
    randomElement: { get() { return this[Math.floor(Math.random() * this.length)]; } },
    remove: {
        value(value) {
            let i = this.indexOf(value);
            if (i > -1) this.splice(i, 1);
            return this;
        }
    },
    removeAll: {
        value(value) {
            let i = 0;
            while (i < this.length) {
                if (this[i] === value) this.splice(i, 1);
                else ++i;
            }
            return this;
        }
    }
});