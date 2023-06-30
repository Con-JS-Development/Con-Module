/**
 * Represents an event signal.
 * @template - The types of the arguments passed to the event handlers.
 */
export class EventSignal<args extends any[]|any>{
    protected _methods_:{[k: symbol]: Function} = {};
    protected _symbol_ = Symbol('session');
    get subscribers(){return Object.getOwnPropertySymbols(this._methods_).length;};
    /**
     * Triggers the event signal.
     * @param params - The arguments to pass to the event handlers.
     * @returns A promise that resolves with the number of successful event handlers.
     */
    async trigger(...params: args extends any[]?args:[args]) {
        await Promise.all(Object.getOwnPropertySymbols(this._methods_).map(sym => {
            return (async()=>{return await this._methods_[sym](...params);})().catch((globalThis as any)["console"].error);
        }));
    }

    /**
     * Subscribes to the event signal.
     * @template  k - The type of the event handler function.
     * @param method - The event handler function to subscribe.
     * @returns The subscribed event handler function.
     */
    subscribe<k extends (...args: args extends any[]?args:[args])=>any>(method: k): k | void {
        const t = typeof method;
        if(t !== "function" && t !== "object") throw new TypeError(`Expected a function or an object, but got ${t}.`);
        if(!Object.prototype.hasOwnProperty.call(method,this._symbol_)){
            const key = Symbol('key');
            (method as any)[this._symbol_] = key;
            this._methods_[key] = method;
            return method;
        };
    }

    /**
     * Unsubscribes from the event signal.
     * @template k - The type of the event handler function.
     * @param method - The event handler function to unsubscribe.
     * @returns The unsubscribed event handler function.
     */
    unsubscribe<k extends (...args: args extends any[]?args:[args])=>any>(method: k): k | void  {
        const t = typeof method;
        if(t !== "function" && t !== "object") throw new TypeError(`Expected a function or an object, but got ${t}.`);
        if(Object.prototype.hasOwnProperty.call(method,this._symbol_)) {
            delete this._methods_[(method as any )[this._symbol_] as symbol];
            delete (method as any)[this._symbol_];
            return method;
        };
    }
}
/**
 * Represents an before event signal.
 * @template - The types of the arguments passed to the event handlers.
 */
export class BeforeEventSignal<args extends any[]|any> extends EventSignal<args>{
     /**
     * Triggers the event signal.
     * @param params - The arguments to pass to the event handlers.
     * @returns A promise that resolves with the number of successful event handlers.
     */
    triggerCancelable(cancelation:()=>any, ...params: args extends any[]?args:[args]): Promise<void> {let isCanceled = false;
        this.setCancel = (canceled)=>isCanceled = canceled??true;
        const promises = super.trigger(...params);
        //@ts-ignore
        delete this.setCancel;
        if(isCanceled) cancelation();
        return promises;
    }
    setCancel(cancel: boolean = true){
        throw TypeError("This event is not cancelable");
    }
}
export class MinecraftEventSignal<args extends any[]|any> extends EventSignal<args>{
    constructor(subscribe: (param: MinecraftEventSignal<args>)=>void,unsubscribe: (param: MinecraftEventSignal<args>)=>void){
        super();
        this._parent_sub_ = subscribe;
        this._parent_unsub_ = unsubscribe;
        this._isSubscribed_ = false;
    }
    protected _parent_sub_;
    protected _parent_unsub_;
    protected _isSubscribed_;
    subscribe<k extends (...args: args extends any[] ? args : [args]) => any>(method: k): void | k {
        const a = super.subscribe(method);
        if(!this._isSubscribed_ && this.subscribers > 0){
            this._parent_sub_(this);
            this._isSubscribed_ = true;
        }
        return a;
    }
    unsubscribe<k extends (...args: args extends any[] ? args : [args]) => any>(method: k): void | k {
        const a = super.unsubscribe(method);
        if(this.subscribers<=0 && this._isSubscribed_){
            this._parent_unsub_(this);
        }
        return a;
    }
    static bindTo<ev,callback extends (param: ev)=>void,newProperties extends any[],subscribeArgs extends any[] = []>(event: {subscribe:(callback:callback,...options: subscribeArgs)=>callback,unsubscribe:(callback:callback)=>callback},eventDataConverter: (pr: ev)=>newProperties,...options: subscribeArgs){
        const eve = (param: ev)=>{
            //@ts-ignore
            ts.trigger(...eventDataConverter(param))
        }
        const ts = new MinecraftEventSignal<newProperties>((es)=>{
            event.subscribe(eve as callback,...options as subscribeArgs);
        },(es)=>{
            event.unsubscribe(eve as callback);
        });
    }
}
export class BeforeMinecraftEventSignal<args extends any[]|any> extends BeforeEventSignal<args>{
    constructor(subscribe: (param: BeforeMinecraftEventSignal<args>)=>void,unsubscribe: (param: BeforeMinecraftEventSignal<args>)=>void){
        super();
        this._parent_sub_ = subscribe;
        this._parent_unsub_ = unsubscribe;
        this._isSubscribed_ = false;
    }
    protected _parent_sub_;
    protected _parent_unsub_;
    protected _isSubscribed_;
    subscribe<k extends (...args: args extends any[] ? args : [args]) => any>(method: k): void | k {
        const a = super.subscribe(method);
        if(!this._isSubscribed_ && this.subscribers > 0){
            this._parent_sub_(this);
            this._isSubscribed_ = true;
        }
        return a;
    }
    unsubscribe<k extends (...args: args extends any[] ? args : [args]) => any>(method: k): void | k {
        const a = super.unsubscribe(method);
        if(this.subscribers<=0 && this._isSubscribed_){
            this._parent_unsub_(this);
        }
        return a;
    }    
    static bindTo<ev,callback extends (param: ev)=>void,newProperties extends any[],subscribeArgs extends any[] = []>(event: {subscribe:(callback:callback,...options: subscribeArgs)=>callback,unsubscribe:(callback:callback)=>callback},eventDataConverter: (pr: ev)=>newProperties,...options: subscribeArgs){
        const eve = (param: any)=>{
            //@ts-ignore
            ts.triggerCancelable(()=>param.cancel = true,...eventDataConverter(param))
        }
        const ts = new BeforeMinecraftEventSignal<newProperties>((es)=>{
            event.subscribe(eve as callback,...options as subscribeArgs);
        },(es)=>{
            event.unsubscribe(eve as callback);
        });
    }
}