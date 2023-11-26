import { system } from "@minecraft/server";
import { GeneratorFunction, GeneratorFunctionConstructor } from "./base";
import { SyncPromise } from '../../utils';

const IsRunningSymbol = Symbol("IsRunning");
const ThreadSymbol = Symbol("ThreadSymbol");
export const YieldableSymbol = Symbol("Yieldable");
export const ThreadCommands = {
    "SelfGenerator":"SelfGenerator",
    "SelfAwaitor":"SelfAwaitor",
    "EndOfTick":"EndOfTick"
};
const SymbolCommands = {
    [ThreadCommands.SelfGenerator](thread){thread.param = thread.generator;return false},
    [ThreadCommands.SelfAwaitor](thread){thread.param = thread.awaiter;return false;},
    [ThreadCommands.EndOfTick](thread){system.runTimeout(()=>system.runTimeout(()=>thread.onRun(),0),0);return true}
};
export function GeneratorThread(generator, thisArg, ...param){
    if(!GeneratorFunction.isGenerator(generator) && generator instanceof GeneratorFunctionConstructor) generator = generator.call(thisArg,...param);
    if(!GeneratorFunction.isGenerator(generator)) throw new TypeError("Must be generator or function what returns generator");
    if(GeneratorThread.isRunning(generator)) return generator[ThreadSymbol];
    const object = new.target?this:{__proto__:GeneratorThread.prototype};
    generator[ThreadSymbol] = object;
    Object.assign(object,{
        param:undefined,
        generator,
        promise: new SyncPromise((res,rej)=>{object.resolve = res;object.reject = rej;}),
        nexts:[]
    });
    return object;
}
GeneratorThread.Run = function runGenerator(){
    return GeneratorThread(...arguments).start().catch(displayError);
}
GeneratorFunction.Run = GeneratorThread.Run; 
GeneratorThread.isRunning = function isRunning(generator){return generator[IsRunningSymbol] === true;}
GeneratorThread.getThread = function getThread(generator){if(GeneratorThread.isRunning(generator)) return generator[ThreadSymbol];}
GeneratorThread.prototype = {
    get awaiter(){return this.promise},
    get then(){return this.promise.then.bind(this.promise);},
    start(){
        if(GeneratorThread.isRunning(this.generator)) throw new Error("Generator is already running or already has ended");
        this.generator[IsRunningSymbol] = true;
        this.onRun();
        return this.awaiter;
    },
    onRun(){
        while(true){
            try {
                let {value, done} = this.nexts.length>0?this.nexts.shift():this.generator.next(this.param);
                delete this.param;
                if(done) return this.resolve(value);
                if(this.onCommand(value)) return;
            } catch (error) { if(this.onError(error)) return; }
        }
    },
    onCommand(value){
        if(value === 0 || value === null || value === undefined){
            Promise.resolve().then(()=>this.onRun());
            return true;
        }
        if(typeof value === "number"){
            if(value < 1) return this.onError(new TypeError("Number of ticks to await must be bigger than 0"));
            setTimeout(()=>this.onRun(),value);
            return true;
        }
        if(value === this.awaiter || value === this.generator || value === this) return this.onError(new TypeError("Can't yield recursive values."));
        if(value instanceof SyncPromise) return this.onThenable(value);
        if(value instanceof Promise) return this.onThenable(value);
        if(value[YieldableSymbol]) return this.onYielable(value[YieldableSymbol]);
        if(value[Symbol.thenable]) return this.onThenable(value);
        if(value in SymbolCommands) {
            try {
                return SymbolCommands[value](this);
            } catch (error) {
                return this.onError(error);
            }
        }
        if(typeof value.then === "function" && !value[Symbol.isNotThenble]){ 
            try {
                return this.onThenable(Promise.resolve(value));
            } catch (error) { return this.onError(error); }
        }
        return this.onError(new TypeError("Unknow yielded type " + value));
    },
    onYielable(value){
        try {
            const {type,data} = value;
            if(!type in resolver) return this.onError(new TypeError("Unknow yieldable data type:" + type));
            return resolver[type](this, data);
        } catch (error) {
            return this.onError(error);
        }
    },
    onError(er){
        try{
            this.nexts.push(this.generator.throw(er));
            return false;
        } catch(error){
            this.reject(error);
            return true;
        }
    },
    onThenable(thenable){
        try {
            thenable.then(res=>{this.param = res; this.onRun();},rej=>this.onError(rej)?null:this.onRun());
        } catch (error) { return this.onError(value); }
        return true;
    }
};
export const YieldableTypes = {
    AsyncCallback:"AsyncCallback",
    SyncCallback:"SyncCallback",
    Value:"Value"
};
const resolver = {
    [YieldableTypes.AsyncCallback](thread, data){
        let ret = false;
        try {
            data((value)=>{ 
                if(ret){ thread.param = value; thread.onRun();} 
                else {thread.onError(new TypeError("This yieladable value is tagged as AsyncCallback type but its executed synced."))?null:thread.onRun();}
            });
        } catch (error) {
            return thread.onError(new TypeError("This yieladable value is tagged as AsyncCallback type but it is not possible to execute. ErrorMessage: " + error));
        }
        ret = true;
        return true;
    },
    [YieldableTypes.SyncCallback](thread, data){
        try {
            thread.param = data();
        } catch (error) {
            return thread.onError(new TypeError("This yieladable value is tagged as SyncCallback type but it is not possible to execute. ErrorMessage: " + error));
        }
        thread.param = data();
        return false;
    },
    [YieldableTypes.Value](thread,data){
        thread.param = data;
        return false;
    }
}