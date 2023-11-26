export type PartialParts<b,thisArg = b> = {
    [P in keyof b]?: b[P] extends (...param: infer param)=>infer ret?((this: thisArg,...param:param)=>ret):b[P]
};
export function OverTakes<b extends object>(prototype: b, object: PartialParts<b, b>): b{
    const prototypeOrigin = Object.setPrototypeOf(Object.defineProperties({},Object.getOwnPropertyDescriptors(prototype)),Object.getPrototypeOf(prototype));
    Object.setPrototypeOf(object, prototypeOrigin);
    Object.defineProperties(prototype, Object.getOwnPropertyDescriptors(object));
    return prototypeOrigin;
}
export function ReExtenend<T extends (new ()=>any),D extends (new ()=>any)>(class1: T, newParent: D): T & D {
    Object.setPrototypeOf(class1, newParent);
    Object.setPrototypeOf(class1.prototype, newParent.prototype);
    //@ts-ignore
    return class1;
}
/**
 * Generates a UUID (Universally Unique Identifier).
 * @returns The generated UUID.
 */
export function GenerateUUID(timestamp: number = Date.now()): string {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) =>{
      let r = (timestamp + Math.random() * 16) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
export function GenerateRandomString(length: number): string {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
export function BuildClass<T,N extends string>(object: T, name?: N, extendsThis?: {new():any}): {new(): T,():T,prototype:T,name:N}{
    const newClass = extendsThis==undefined?
    (function(this: any){return this;}):
    (function(){
        return Reflect.construct(extendsThis,...(arguments as unknown as [any]),new.target??newClass);
    });
    newClass.prototype = Object.setPrototypeOf(object,extendsThis?.prototype??Object.prototype);
    Object.defineProperty(newClass,"name",{value:name,configurable:true});
    //@ts-ignore
    return newClass;
}
export function EmptyInsatnce(theClass: (()=>any) | (new ()=>any)){
    return {__proto__:theClass.prototype};
}

export function FixedNumber(number: number, length: number,radix = 16){
    const toStr = number.toString(radix);
    if(toStr.length < length) return "0".repeat(length - toStr.length) + toStr;
    else return toStr;
}