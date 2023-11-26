export class SyncPromise<T> implements PromiseLike<T>{
    constructor(executor: (resolve: (value: T | SyncPromise<T>) => void, reject: (reason?: any) => void) => void);
    readonly isRejected: boolean;
    readonly isFulfilled: boolean;
    readonly value?: T | any;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): SyncPromise<TResult1 | TResult2>;
    finally(onfinally?: (() => void) | undefined | null): Promise<T>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    static reject<T = never>(reason?: any): SyncPromise<T>;
    /**
     * Creates a new resolved promise.
     * @returns A resolved promise.
     */
    static resolve(): SyncPromise<void>;
    /**
     * Creates a new resolved promise for the provided value.
     * @param value A promise.
     * @returns A promise whose internal state matches the provided promise.
     */
    static resolve<T>(value: T): SyncPromise<Awaited<T>>;
    /**
     * Creates a new resolved promise for the provided value.
     * @param value A promise.
     * @returns A promise whose internal state matches the provided promise.
     */
    static resolve<T>(value: T | PromiseLike<T>): SyncPromise<Awaited<T>>;
}