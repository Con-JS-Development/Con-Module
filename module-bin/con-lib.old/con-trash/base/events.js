import { EventSignalPrototype, EventClasses } from "../../API/index.js";
import { SubscribeMethodSymbol, UnSubscribeMethodSymbol } from "../../API/index.js";
import { YieldableGeneratorValue, GeneratorYieldType, GeneratorYieldTypes, CustomAsyncValue } from "./generator-threads.js";
import { PromiseLike } from "../../JS/PromiseLike.js";

const symbolSubscribed = Symbol('sub');
Object.defineProperties(EventSignalPrototype,{
    then:{
        value(callBack){
            const n = this.subscribe((arg)=>{
                this.unsubscribe(n);
                Function.asyncCall(callBack,console.error,Object.applyOwnGetter(Object.getPrototypeOf(Object.getPrototypeOf(arg)), arg));
            });
        }
    },
    [YieldableGeneratorValue]:{value:true},
    [GeneratorYieldType]:{value:GeneratorYieldTypes.customAsync},
    [CustomAsyncValue]:{
        get(){
            return new PromiseLike(res=>{
                const a = this[SubscribeMethodSymbol]((o)=>{
                    this[UnSubscribeMethodSymbol](a);
                    res(o);
                });
            });
        }
    }
});
const assigns = {
    subscribe(callback, ...params){
        if(!(symbolSubscribed in callback)){
            callback[symbolSubscribed] = this[SubscribeMethodSymbol]((any)=>{
                Function.asyncCall(callback,console.error,any);
            },...params);
        }
        return callback;
    },
    unsubscribe(callback){
        if(symbolSubscribed in callback){
            this[UnSubscribeMethodSymbol](callback[symbolSubscribed]);
            delete callback[symbolSubscribed];
            return callback;
        } else {
            return this[UnSubscribeMethodSymbol](callback);
        }
    }
};
for (const cl of EventClasses) {
    Object.assign(cl.prototype,assigns);
}