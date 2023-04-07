import * as BASE from '../con-base/index';

const {AsyncFunction}=BASE;

import * as MC from '@minecraft/server';
//import * as UI from '@minecraft/server-ui';
import * as GT from '@minecraft/server-gametest';
import { getView, getFormatView, formatCode, getFormatViewFull } from './ObjectViewer';

const {warn,log,error} = console;
export class Console{
    static{
        Console.prototype.scope = {console:Object.create(console)};
    }
    static async input(code, options){
        const {self = world, output = world.sendMessage.bind(world), scope = framework, echo = true} = options??{};
        const o = echo?output:()=>undefined;
        const _console = {
            log: Console.output.bind(output, ColorModes.log),
            warn: Console.output.bind(output, ColorModes.warn),
            error: Console.output.bind(output, ColorModes.error)
        };
        const print = _console.log;
        const a = Console._input(MC,code, Object.setPrototypeOf({print,self}, scope));
        if(a.syntaxError){
            o(`§l§g$ ${BaseColor[ColorModes.error]}>  §r${formatCode(a.code)}`);
            _console.error(a.syntaxError);
        } else {
            o(`§l§g$ ${BaseColor[ColorModes.info]}>  §r${formatCode(a.code)}`);
            try {
                const out = await a.promise;
                _console.log(getFormatViewFull(out));
            } catch (error) {
                console.error(error,error.stack);
                _console.error(error, error.stack??"");
            }
        }
    }
    
    static output(mode, ...objets){
        this(`§l$ ${BaseColor[mode]}<  §r${MinorColor[mode]}${objets.join(` §r${MinorColor[mode]}`).replace(/\n/g,"\n     ")}`);
    }
    /** @param {string} code @param {?object} scope @returns {{syntaxError?: Error, promise:Promise<any>, func?: ()=>Promise, code: string, scope: object}} */
    static _input(thisArg = this, code, scope = framework){
        let r = {syntaxError: undefined, promise:undefined, func: undefined, code, scope};
        try {
            r.func = Console.getFunction.call(thisArg,scope,code);
        } catch (er){
            r.syntaxError = er;
            r.promise = Promise.reject(er);
            return r
        }
        console.warn("Test");
        r.promise = r.func();
        return r;
    }
    /** @type {(scopeLike: object, code: string, ...paramNames: string[])=>(...args: any[])=>Promise} */
    static getFunction(scopeLike, code, ...paramNames){
        let keys = [], func;
        let obj = scopeLike;
        if(code.endsWith(";")) code = code.substring(0,code.length - 1);
        while(obj !== Object.prototype && obj !== null && obj !== Array.prototype){
            for (const key of Object.getOwnPropertyNames(obj)) {
                if(keys.includes(key)) continue;
                keys.push(key);
            }
            obj = Object.getPrototypeOf(obj);
        }
        try {
            func = AsyncFunctionConstructor.apply(AsyncFunctionConstructor,[...keys,...paramNames,"return (" + code + ")"]);
        } catch (error) {
            func = AsyncFunctionConstructor.apply(AsyncFunctionConstructor,[...keys,...paramNames,code]);
        }
        return func.bind.apply(func,[this,...keys.map(k=>scopeLike[k])]);
    }
}
export default Console;
