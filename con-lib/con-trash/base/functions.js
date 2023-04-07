import { AsyncFunctionConstructor, GeneratorFunction, GeneratorFunctionConstructor } from "../../JS/build-ins.js";

Function.asyncCall = safeAsyncCall;

function safeAsyncCall(method, erCallBack, ...params){
    if(method instanceof GeneratorFunctionConstructor){
        return GeneratorFunction.runThread.call(this,method,...params).catch((er)=>{
            erCallBack(er,er.stack);
            throw er;
        });
    } else if (method instanceof AsyncFunctionConstructor) {
        return method.call(this, ...params).catch((er)=>{
            erCallBack(er,er.stack);
            throw er;
        });
    } else if (method instanceof Function){
        return new Promise((res,rej)=>{
            try {
                res(method.call(this,...params))
            } catch (error) {
                erCallBack(error);
                rej(error);
            }
        });
    } else throw new TypeError("Method is not executable");
}