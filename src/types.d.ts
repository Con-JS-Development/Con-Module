//import type { YieldableValue } from "core";
/*
export type Runnable<returnType = any, parameters extends any[] = [],thisParam = any> = 
(returnType extends Generator<any,any,any>?(returnType extends Generator<YieldableValue,infer TReturn,infer TNext>?(this: thisParam, ...params: parameters)=>Generator<YieldableValue,TReturn,TNext>:never):((this: thisParam, ...params: parameters)=>returnType)) |
{ [Symbol.runnable]:((this: thisParam,...params: parameters)=>returnType) } |
Generator<YieldableValue,returnType,any>;
export type RunnableReturnType<T extends Runnable> = T extends Runnable<infer Ret>?Ret:never;*/
export type Vector3Optional<Base,Key extends keyof Base> ={[K in keyof Base]: K extends Key?never:Base[K]} & {[K in keyof Base]?: K extends Key?Base[K]: never}