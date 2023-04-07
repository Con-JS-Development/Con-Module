/**
 * Represents an event signal.
 * @template {[]} args - The types of the arguments passed to the event handlers.
 */
export class EventSignal{
    #methods = {};
    #symbol = Symbol('session');

    /**
     * Triggers the event signal.
     * @param {...args} params - The arguments to pass to the event handlers.
     * @returns {Promise<void>} A promise that resolves with the number of successful event handlers.
     */
    async trigger(...params) {
        await Promise.all(Object.getOwnPropertySymbols(this.#methods).map(sym => {
            return (async()=>{return await Function.run(null,this.#methods[sym],...params);})().catch(console.errorHandle);
        }));
    }

    /**
     * Subscribes to the event signal.
     * @template {(...params: args)=>any || {[Symbol.runnable]: Function}} k - The type of the event handler function.
     * @param {k} method - The event handler function to subscribe.
     * @returns {k} The subscribed event handler function.
     */
    subscribe(method) {
        const t = typeof method;
        if(t !== "function" && t !== "object") throw new TypeError(`Expected a function or an object, but got ${t}.`);
        if(!Symbol.runnable in method) throw new TypeError(`The object must be the runnable. Make sure the method has a property with the key Symbol.runnable.`);
        if(!Object.prototype.hasOwnProperty.call(method,this.#symbol)){
            const key = Symbol('key');
            method[this.#symbol] = key;
            this.#methods[key] = method;
            return method;
        };
    }

    /**
     * Unsubscribes from the event signal.
     * @template {(...params: args)=>any || {[Symbol.runnable]: Function}} k - The type of the event handler function.
     * @param {k} method - The event handler function to unsubscribe.
     * @returns {k} The unsubscribed event handler function.
     */
    unsubscribe(method) {
        const t = typeof method;
        if(t !== "function" && t !== "object") throw new TypeError(`Expected a function or an object, but got ${t}.`);
        if(!Symbol.runnable in method) throw new TypeError(`The method must implement the runnable interface. Make sure the method has a property with the key Symbol.runnable.`);
        if(Object.prototype.hasOwnProperty.call(method,this.#symbol)) {
            delete this.#methods[method[this.#symbol]];
            delete method[this.#symbol];
            return method;
        };
    }
}