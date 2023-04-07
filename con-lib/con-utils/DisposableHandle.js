/**
 * Represents a disposable handle.
 */
export class DisposableHandle{
    #disposed;
    #onUpdate;
    #onDispose;

    /**
     * Creates a new DisposableHandle.
     * @param {Function} onUpdate - The function to call when the handle is updated.
     * @param {?Function} [onDispose=()=>{}] - The function to call when the handle is disposed.
     */
    constructor(onUpdate, onDispose = ()=>{}){
        this.#disposed = false;
        this.#onUpdate = onUpdate;
        this.#onDispose = onDispose;
    }

    /**
     * Updates the handle.
     * @returns {Promise} A promise that resolves when the update is complete.
     * @throws {ReferenceError} If the handle is disposed.
     */
    async update(){
        if(this.isDisposed) throw new ReferenceError("This object handle is disposed, you can't update it.");
        return await Function.run(null,this.#onUpdate,this);
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
     * @returns {boolean} True if the handle is disposed; otherwise, false.
     */
    get isDisposed(){return this.#disposed};
}