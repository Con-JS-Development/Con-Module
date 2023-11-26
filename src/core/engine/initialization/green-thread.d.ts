import { Runnable } from "types";
import { SyncPromise } from "../../utils";

export const YieldableSymbol: unique symbol;
export enum ThreadCommands {
    SelfGenerator="SelfGenerator",
    SelfAwaiter="SelfAwaiter",
    EndOfTick="EndOfTick"
}
export enum YieldableTypes {
    AsyncCallback="AsyncCallback",
    SyncCallback="SyncCallback",
    Value="Value"
}
export interface Yieldable<T> {
    [YieldableSymbol]:Yieldables<T>
}
export type YieldableValue<T = any> = number | null | undefined | PromiseLike<T> | Yieldable<T> | ThreadCommands;
export type Yieldables<T> = {
    type: YieldableTypes.AsyncCallback,
    value: (resolve:(returnValue: T)=>void)=>void
} | {
    type: YieldableTypes.SyncCallback,
    value: ()=>T
} | {
    type: YieldableTypes.Value,
    value: T
}
interface GeneratorThread<TReturn> extends PromiseLike<TReturn>{
    readonly generator: Generator<YieldableValue,TReturn, any>;
    readonly awaiter: SyncPromise<TReturn>;
    start(): SyncPromise<TReturn>;
}
interface GeneratorThreadConstructor{
    <TReturn>(generator: Generator<YieldableValue,TReturn,any>): GeneratorThread<TReturn>;
    <TReturn>(generator: Runnable<Generator<YieldableValue,TReturn,any>>): GeneratorThread<TReturn>;
    <TReturn,TParams extends any[], ThisArg = null>(generator: Runnable<Generator<YieldableValue,TReturn,any>,TParams>): GeneratorThread<TReturn>;
    <TReturn,TParams extends any[], ThisArg = null>(generator: Runnable<Generator<YieldableValue,TReturn,any>,TParams>, thisArg: ThisArg, ...params: TParams): GeneratorThread<TReturn>;
    new <TReturn>(generator: Generator<YieldableValue,TReturn,any>): GeneratorThread<TReturn>;
    new <TReturn>(generator: Runnable<Generator<YieldableValue,TReturn,any>>): GeneratorThread<TReturn>;
    new <TReturn,TParams extends any[], ThisArg = null>(generator: Runnable<Generator<YieldableValue,TReturn,any>,TParams>): GeneratorThread<TReturn>;
    new <TReturn,TParams extends any[], ThisArg = null>(generator: Runnable<Generator<YieldableValue,TReturn,any>,TParams>, thisArg: ThisArg, ...params: TParams): GeneratorThread<TReturn>;
    isRunning(generator: Generator): boolean;
    getThread<TReturn>(generator: Generator<YieldableValue,TReturn>): GeneratorThread<TReturn>;
    Run<TReturn>(generator: Generator<YieldableValue,TReturn,any>): GeneratorThread<TReturn>["awaiter"];
    Run<TReturn>(generator: Runnable<Generator<YieldableValue,TReturn,any>>): GeneratorThread<TReturn>["awaiter"];
    Run<TReturn,TParams extends any[], ThisArg = null>(generator: Runnable<Generator<YieldableValue,TReturn,any>,TParams>): GeneratorThread<TReturn>["awaiter"];
    Run<TReturn,TParams extends any[], ThisArg = null>(generator: Runnable<Generator<YieldableValue,TReturn,any>,TParams>, thisArg: ThisArg, ...params: TParams): GeneratorThread<TReturn>["awaiter"];
}
export declare var GeneratorThread: GeneratorThreadConstructor;