import { Events, world, WorldInitializeEvent } from "@minecraft/server";
const SubsribedSymbol = Symbol('Subscibed');
const {events} = world;
export class EventExecutor{
    constructor(){
        this[SubsribedSymbol] = false;
        this.delegates = {};
        this.oneTimes = [];
    }
    async execute(eventData){
        const descriptors = Object.getOwnPropertySymbols(this.delegates).concat(Object.getOwnPropertyNames(this.delegates));
        const misses = [];
        for (const keys of descriptors) {
            const method = this.delegates[keys];
            misses.push(Function.runAsAsync(method,eventData).catch(n=>console.error(n,n.stack)));
        }
        if (this.oneTimes.length>0) {
            const meths = this.oneTimes;
            this.oneTimes = [];
            while (meths.length>0) {
                const method = meths.shift();
                misses.push(Function.runAsAsync(method,eventData).catch(n=>console.error(n,n.stack)));
            }
        }
        await Promise.all(misses);
    }
    sub(key,value){
        this.delegates[key] = value;
    }
    unsub(key){
        delete this.delegates[key];
    }
}
class EventManager{
    constructor(){
        for (const eventName of Object.keys(Events.prototype)) {
            this[eventName] = new EventExecutor();
        }
    }
    registry(key,object){
        if (key==undefined) throw new TypeError('undefined key can not be set as valid key');
        if (!(typeof(key) === 'string' ||typeof(key) === 'symbol')) throw new TypeError('invalid key type: ' + typeof(key));
        let eSubs = 0;
        for (const eventName of object) {
            if(!(object[eventName] instanceof Function)) throw new TypeError(`event ${eventName} is not a function`);
            if(this[eventName] === undefined) this[eventName] = new EventExecutor();
            const executor = this[eventName];
            if (!executor[SubsribedSymbol]) {
                const e = events[eventName];
                (e!==undefined)?e.subscribe((ev)=>executor.execute(ev)):null;
                executor[SubsribedSymbol] = true;
            }
            executor.sub(key,object[eventName]);
            eSubs++;
        }
        return eSubs;
    }
    delete(key){
        for (const eventName of this) {
            if (this[eventName] instanceof EventExecutor) this[eventName].unsub(key);
        }
    }
    execute(eventName,eventData){
        if(this[eventName] instanceof EventExecutor){
            return this[eventName].execute(eventData);
        }
    }
}
export const EventHendler = new EventManager();
export default EventHendler;
export class EventRegister{
    static registry(key,events){
        return EventHendler.registry(key,events);
    }
    static execute(eventName,eventData){
        return EventHendler.execute(eventName,eventData);
    }
    static delete(key){
        EventHendler.delete(key);
    }
    static getExecutor(name){
        return EventHendler[name];
    }
}
WorldInitializeEvent.prototype.registryEvent = function(){
    EventRegister.registry(...arguments);
}