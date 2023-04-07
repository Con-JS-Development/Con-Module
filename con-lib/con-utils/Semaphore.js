/**
 * An implementation of an asynchronous semaphore that implements the PromiseLike interface.
 * @implements {PromiseLike<number>}
 */
export class AsyncSemaphore {
    #promise;
    #id;
    #map;

    constructor() {
        this.#promise = Promise.resolve();
        this.#id = 0;
        this.#map = new Map();
    }

    /**
     * Releases the lock with the given id.
     * @param {number} id - The id of the lock to release.
     * @returns {boolean} - Returns true if the lock was released successfully.
     * @throws {ReferenceError} - Throws an error if the given id is invalid.
     */
    release(id) {
        if (!this.#map.has(id)) throw new ReferenceError("Invalid promise id resolved!");
        const res = this.#map.get(id);
        this.#map.delete(id);
        res();
        return true;
    }

    /**
     * Acquires a lock and returns its id.
     * @async
     * @returns {Promise<number>} - Returns a promise that resolves with the id of the acquired lock.
     */
    async lock() {
        const promise = this.#promise;
        const id = this.#id++;
        this.#promise = new Promise((res) => this.#map.set(id, res));
        await promise;
        return id;
    }
    /**
     * @async
     * @template {[]} args
     * @param {(...args)=>any} method @param {...args} params
     * @returns {Promise}
     */
    async secureRun(method, ...params){
        const id = await this.lock();
        try {
            await method(...params);
        } catch (error) {
            console.error(error,error.stack);
        }
        this.release(id);
    }
    /**
     * Attaches a callback for when a lock is acquired. This allows the `AsyncSemaphore` instance to be used as a `PromiseLike` object.
     * @type {Promise['then']} - Returns a promise that resolves with the result of the callback.
     */
    get then() {
        const promise = this.lock();
        return Promise.prototype.then.bind(promise);
    }
}