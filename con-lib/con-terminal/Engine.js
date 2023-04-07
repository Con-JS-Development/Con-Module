import { AsyncFunction } from "../con-base/index";

export class EngineEnvironment{
    static #default = globalThis;
    /**@readonly Yup */
    static get default(){return this.#default;}
    #environment;
    constructor(){this.#environment = {};}
    applyEnvroment(object){
        this.#environment = object;
    }
    addPropetry()
}
export class Engine{
    static runCode(string,environment = EngineEnvironment.default){

    }
}
/**@implements {PromiseLike} */
export class AsyncSemaphore{
    #promise = Promise.resolve();
    #id = 0;
    #map = new Map();
    release(id){
        if(!this.#map.has(id)) throw new ReferenceError("Invalid promise id resolved!");
        const res = this.#map.get(id);
        this.#map.delete(id);
        res();
        return true;
    }
    async lock(){
        const promise = this.#promise;
        const id = this.#id++;
        this.#promise = new Promise((res)=>this.#map.set(id,res));
        await promise;
        return id;
    }
    then(callBack){return this.lock().then(callBack);}
}