import { Kernel } from "core/engine";

/**
 * An implementation of an asynchronous semaphore that implements the PromiseLike interface.
 */
const then = Promise.prototype.then;
export class AsyncSemaphore implements PromiseLike<number> {
    private _promise_;
    private _id_;
    private _map_;
    constructor() {
        this._promise_ = Promise.resolve(0);
        this._id_ = 0;
        this._map_ = Kernel.Construct("Map");
    }

    /**
     * Releases the lock with the given id.
     * @param id - The id of the lock to release.
     * @returns- Returns true if the lock was released successfully.
     * @throws {ReferenceError} - Throws an error if the given id is invalid.
     */
    release(id: number) {
        if (!this._map_.has(id)) throw new ReferenceError("Invalid promise id resolved!");
        const res = this._map_.get(id) as ()=>{};
        this._map_.delete(id);
        res();
        return true;
    }

    /**
     * Acquires a lock and returns its id.
     * @async
     * @returns - Returns a promise that resolves with the id of the acquired lock.
     */
    async lock(): Promise<number> {
        const promise = this._promise_;
        const id = this._id_++;
        this._promise_ = new Promise<number>((res) => this._map_.set(id, res));
        await promise;
        return id;
    }
    /**
     * @async
     * @param method 
     * @param params
     * @returns
     */
    async secureRun<args extends any[]>(method: ()=>any, ...params: args){
        const id = await this.lock();
        try {
            await method();
        } catch (error: any) {console.error(error,error?.stack??"");}
        this.release(id);
    }
    /**
     * Attaches a callback for when a lock is acquired. This allows the `AsyncSemaphore` instance to be used as a `PromiseLike` object.
     * @type - Returns a promise that resolves with the result of the callback.
     */
    get then(): Promise<number>['then'] {
        const promise = this.lock();
        return then.bind(promise);
    }
}