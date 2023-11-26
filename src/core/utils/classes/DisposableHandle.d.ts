/**
 * Represents a disposable handle.
 */
export class DisposableHandle<T,D = void>{
    private _disposed_?: boolean;
    private _onUpdate_?: (thisArg: DisposableHandle<T,D>, ...params: T extends []?T:[T])=>D;
    private _onDispose_?: (thisArg: DisposableHandle<T,D>)=>void;
    /**
     * Creates a new DisposableHandle.
     * @param onUpdate - The function to call when the handle is updated.
     * @param onDispose - The function to call when the handle is disposed.
     */
    constructor(onUpdate: (thisArg: DisposableHandle<T,D>, ...params: T extends []?T:[T])=>D, onDispose?: (arg: DisposableHandle<T,D>)=>void)
    /**
     * Updates the handle.
     * @throws {ReferenceError} If the handle is disposed.
     */
    update(...params: T extends []?T:[T]): D

    /**
     * Disposes of the handle.
     */
    dispose(): void

    /**
     * Gets whether the handle is disposed.
     * @returns True if the handle is disposed; otherwise, false.
     */
    readonly isDisposed: boolean;
}