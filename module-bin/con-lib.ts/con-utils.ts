import { Vector3 } from '@minecraft/server';
import './con-base';
/**
 * Represents a disposable handle.
 */
export class DisposableHandle<n>{
    #disposed;
    #onUpdate?;
    #onDispose?;

    /**
     * Creates a new DisposableHandle.
     * @param onUpdate - The function to call when the handle is updated.
     * @param onDispose - The function to call when the handle is disposed.
     */
    constructor(onUpdate: (any: DisposableHandle<n>)=>n, onDispose = ()=>{}){
        this.#disposed = false;
        this.#onUpdate = onUpdate;
        this.#onDispose = onDispose;
    }

    /**
     * Updates the handle.
     * @returns A promise that resolves when the update is complete.
     * @throws {ReferenceError} If the handle is disposed.
     */
    async update(): Promise<n | void>{ //@ts-ignore
        if(this.isDisposed) throw new ReferenceError("This object handle is disposed, you can't update it.");
        if(!this.#onUpdate) return;
        return await Function.run(null,this.#onUpdate, this);
    }

    /**
     * Disposes of the handle.
     */
    dispose(){
        const close = this.#onDispose;
        this.#disposed = true;
        this.#onUpdate = undefined;
        this.#onDispose = undefined;
        if(close) Function.run(null,close,this);
    }

    /**
     * Gets whether the handle is disposed.
     * @returns True if the handle is disposed; otherwise, false.
     */
    get isDisposed(){return this.#disposed};
}
/**
 * Represents an event signal.
 * @template - The types of the arguments passed to the event handlers.
 */
export class EventSignal<args extends any[]>{
    #methods:{[k: symbol]: Runnable<any,args>} = {};
    #symbol = Symbol('session');
    /**
     * Triggers the event signal.
     * @param params - The arguments to pass to the event handlers.
     * @returns A promise that resolves with the number of successful event handlers.
     */
    async trigger(...params: args) {
        await Promise.all(Object.getOwnPropertySymbols(this.#methods).map(sym => {
            return (async()=>{return await Function.run(null,this.#methods[sym],...params);})().catch(console.errorHandler);
        }));
    }

    /**
     * Subscribes to the event signal.
     * @template  k - The type of the event handler function.
     * @param method - The event handler function to subscribe.
     * @returns The subscribed event handler function.
     */
    subscribe<k extends Runnable<any,args>>(method: k): k | void {
        //@ts-ignore
        const t = typeof method;
        if(t !== "function" && t !== "object") throw new TypeError(`Expected a function or an object, but got ${t}.`);
        if(!Function.isRunnable(method)) throw new TypeError(`The object must be the runnable. Make sure the method has a property with the key Symbol.runnable.`);
        if(!Object.prototype.hasOwnProperty.call(method,this.#symbol)){
            const key = Symbol('key');
            (method as any)[this.#symbol] = key;
            this.#methods[key] = method;
            return method;
        };
    }

    /**
     * Unsubscribes from the event signal.
     * @template k - The type of the event handler function.
     * @param method - The event handler function to unsubscribe.
     * @returns The unsubscribed event handler function.
     */
    unsubscribe<k extends Runnable<any,args>>(method: k): k | void  {
        const t = typeof method;
        if(t !== "function" && t !== "object") throw new TypeError(`Expected a function or an object, but got ${t}.`);
        if(!Function.isRunnable(method)) throw new TypeError(`The method must implement the runnable interface. Make sure the method has a property with the key Symbol.runnable.`);
        if(Object.prototype.hasOwnProperty.call(method,this.#symbol)) {
            delete this.#methods[(method as any )[this.#symbol] as symbol];
            delete (method as any)[this.#symbol];
            return method;
        };
    }
}
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------