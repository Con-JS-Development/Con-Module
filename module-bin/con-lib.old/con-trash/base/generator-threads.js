import { PromiseLike } from '../../JS/PromiseLike.js';
import { GeneratorFunction, GeneratorFunctionConstructor } from '../../JS/build-ins.js';

const RunningGenerator = Symbol("RunningGenerator");
const NextArgument = Symbol("NextArgument");
const GeneratorCommand = Symbol("GeneratorCommand");
const GeneratorData = Symbol("GeneratorData");
export const YieldableGeneratorValue = Symbol("YieldableGeneratorValue");
export const GeneratorYieldType = Symbol("GeneratorYieldType");
export const CustomValue = Symbol('CustomValue');
export const CustomAsyncValue = Symbol('CustomAsyncValue');

const GeneratorCommandTypes = {
    "getPromise":"getPromise",
    "getGenerator":"getGenerator"
}
const GeneratorCommands = {
    [GeneratorCommandTypes.getPromise]: {
        [YieldableGeneratorValue]: true,
        [GeneratorCommand]:GeneratorCommandTypes.getPromise
    },
    [GeneratorCommandTypes.getGenerator]: {
        [YieldableGeneratorValue]: true,
        [GeneratorCommand]:GeneratorCommandTypes.getGenerator
    }
}
export const GeneratorYieldTypes = {
    custom:"custom",
    customAsync:"customAsync",
    promise:"promise",
    number:"number",
    generator:"generator"
}
PromiseLike.prototype[GeneratorYieldType] = GeneratorYieldTypes.promise;
PromiseLike.prototype[YieldableGeneratorValue] = true;
Promise.prototype[YieldableGeneratorValue] = true;
Promise.prototype[GeneratorYieldType] = GeneratorYieldTypes.promise;
Number.prototype[YieldableGeneratorValue] = true;
Number.prototype[GeneratorYieldType] = GeneratorYieldTypes.number;
GeneratorFunction.prototype[YieldableGeneratorValue] = true;
GeneratorFunction.prototype[GeneratorYieldType] = GeneratorYieldTypes.generator;
GeneratorFunction.Commands = GeneratorCommands;
GeneratorFunction.runThread = run;

function runGeneratorFunction(generatorFunction,...args){
    if(!generatorFunction instanceof GeneratorFunctionConstructor) throw new TypeError("Invalid type passed to first argument as generatorFunction");
    return runGenerator(generatorFunction.apply(this, args))
}
function runGenerator(generator){
    if(generator[RunningGenerator]) return generator[GeneratorData].promise;
    else {
        const data = {};
        data.promise = new PromiseLike((res,rej)=>{
            data.resolve = res;
            data.reject = rej;
            data.input = [];
        });
        generator[GeneratorData] = data;
        generator[RunningGenerator] = true;
        runNext(generator,data);
        return data.promise;
    }
}
function run(gen, ...params){
    if(gen instanceof GeneratorFunctionConstructor){
        return runGeneratorFunction.call(this, gen, ...params);
    } else if (GeneratorFunction.isGenerator(gen)){
        return runGenerator(gen);
    } else throw new TypeError("Invalid type passed");
}
function runInputParam(generator, data, value){
    if (value == null || value <= 0){
        Promise.resolve().then(runNext.bind(null, generator,data));
    } else if (typeof(value) === 'number'){
        setTimeout(()=>runNext(generator,data),value);
    } else if (value[YieldableGeneratorValue]){
        return runYieldable(generator,data,value);
    } else if(typeof value === 'object' && 'then' in value) {
        Promise.resolve(value).then(
            (res)=>{data[NextArgument] = res; runNext(generator,data);},
            (er)=>{ if(runThrow(generator,data,er)) runNext(generator,data);}
        );
    } else return runThrow(generator,data,new TypeError('Invalid type passed in to the yield: ' + value));
    return false;
}
/** @param {Generator} generator @param {{reject:()=>void,resolve:()=>void, input: any[]} data} */
function runNext(generator, data){
    if(generator[RunningGenerator] !== true ) return data.reject(new Error('Generator is not running!'));
    const {resolve, reject, input} = data;
    while(true){
        try {
            const arg = data[NextArgument], {value, done} = (input.length>0?input.shift():generator.next(...[arg]));
            delete data[NextArgument];
            if (done) return resolve(value);
            if(runInputParam(generator,data,value)) continue;
        } catch (er) { reject(er); }
        return;
    }
}
function runYieldable(generator, data, value){
    if(GeneratorCommand in value){
        switch(value[GeneratorCommand]){
            case GeneratorCommandTypes.getGenerator:
                data[NextArgument] = generator;
                return true;
            case GeneratorCommandTypes.getPromise:
                data[NextArgument] = data.promise;
                return true;
            default:
                return runThrow(generator,data,new TypeError('Invalid command yielded.'));
        }
    } else if (GeneratorYieldType in value){
        switch (value[GeneratorYieldType]) {
            case GeneratorYieldTypes.number:
                const n = Number(value);
                if(isFinite(n) && n >= 0) {
                    setTimeout(()=>runNext(generator,data), n);
                    return false;
                }
                return runThrow(generator, data, new TypeError('Invalid number "' + value + '" yielded.'));
            case GeneratorYieldTypes.promise:
                if(value instanceof Promise || value instanceof PromiseLike){
                    value.then(
                        (res)=>{ data[NextArgument] = res; runNext(generator,data);},
                        (er)=>{ if(runThrow(generator,data,er)) runNext(generator,data);}
                    );
                    return false;
                } else return runThrow(generator, data, new TypeError('Invalid yield, value is not Promise instance.'));
            case GeneratorYieldTypes.generator:
                let promise = null;
                if(GeneratorFunction.isGenerator(value) || value instanceof GeneratorFunctionConstructor){
                    if(value[RunningGenerator]) promise = value[GeneratorData].promise;
                    else promise = run(value);
                } else return runThrow(generator, data, new TypeError('Invalid yielded generator.'));
                promise.then(
                    (res)=>{ data[NextArgument] = res; runNext(generator,data);},
                    (er)=>{ if(runThrow(generator,data,er)) runNext(generator,data);}
                );
                return false;
            case GeneratorYieldTypes.custom:
                    if(CustomValue in value) {
                        data[NextArgument] = value[CustomValue];
                        return true;
                    } else return runThrow(generator, data, new TypeError('Invalid yielded custom value.'));
            case GeneratorYieldTypes.customAsync:
                    if(CustomAsyncValue in value) {
                        const p = value[CustomAsyncValue];
                        if(p instanceof PromiseLike || p instanceof Promise){
                            p.then(
                                (res)=>{ data[NextArgument] = res; runNext(generator,data);},
                                (er)=>{ if(runThrow(generator,data,er)) runNext(generator,data);}
                            );
                            return false;
                        } else if ("then" in p){
                            try {
                                Promise.resolve(p).then(
                                    (res)=>{ data[NextArgument] = res; runNext(generator,data);},
                                    (er)=>{ if(runThrow(generator,data,er)) runNext(generator,data);}
                                );
                                return false;
                            } catch (error) {
                                return runThrow(generator, data, new TypeError('Invalid yielded custom async value.'));
                            }
                        } else return runThrow(generator, data, new TypeError('Invalid yielded custom async value.'));
                    } else return runThrow(generator, data, new TypeError('Invalid yielded custom async value.'));
            default:
                return runThrow(generator, data, new TypeError('Invalid yield type in yielded object.'));
        }
    } else return runThrow(generator, data, new TypeError('Invalid value yielded.'));
}
function runThrow(generator, data, er){
    try{
        data.input.push(generator.throw(er));
        return true;
    } catch(error){
        data.reject(error);
        return false;
    }
}