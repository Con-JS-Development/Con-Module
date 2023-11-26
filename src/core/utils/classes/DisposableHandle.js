/**
 * Represents a disposable handle.
 */
export class DisposableHandle{
    /**
     * Creates a new DisposableHandle.
     * @param onUpdate - The function to call when the handle is updated.
     * @param onDispose - The function to call when the handle is disposed.
     */
    constructor(onUpdate, onDispose = ()=>{}){
        this._disposed_ = false;
        this._onUpdate_ = onUpdate;
        this._onDispose_ = onDispose;
    }
    update(...params){
        if(this.isDisposed) throw new ReferenceError("This object handle is disposed, you can't update it.");
        if(!this._onUpdate_) return;
        return this._onUpdate_(this,...params);
    }
    dispose(){
        const close = this._onDispose_;
        delete this._disposed_;
        delete this._onUpdate_;
        delete this._onDispose_;
        if(close) close(this);
    }
    get isDisposed(){return this._disposed_??true};
}