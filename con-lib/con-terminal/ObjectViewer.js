import { AsyncFunctionConstructor, AsyncGeneratorFunctionConstructor, GeneratorFunctionConstructor } from "../JS/build-ins";

export function getFormatView(any){
    return "" + toStringPrimitive(any);
}
export function getFormatViewFull(any){
    return "" + toStringPrimitiveFull(any);
}
export function getObjectViewFull(any){
    return ;
}
export function getView(any){
    return "" + any;
}
export function formatCode(code){
    return "" + code;
}



export function toStringLike(any,space = ""){
    let a = Object(any)
    for (const key of Object.getOwnPropertyNames(any)) {
        
    }
}
export function toStringPrimitiveFull(any){
    switch (typeof any) {
        case 'object': 
            if(any === null){
                return "§7§onull";
            }else if (any instanceof Error) {
                return `§6${any}\n${any.stack}`;
            }else{
                const base = any, names = Object.getOwnPropertyNames(base), symbols = Object.getOwnPropertySymbols(base);
                const keys = names.filter(a=>(base.__lookupGetter__?.(a) == undefined && base.__lookupSetter__?.(a) == undefined)).map(k=>`§7${k}§r§7: ${toStringPrimitiveShort(base[k])}§r`).concat(symbols.map(s=>`§r${toStringPrimitiveShort(s)}§r§7: ${toStringPrimitiveShort(base[s])}`));
                const realKeys = keys.slice(0,5), typeOf = getTypeOfObject(base);
                let output = `§7${(typeOf == "Object" || typeOf == '')?"":typeOf + " "}{${realKeys.join("§7, ")}${keys.length>5?"§r§7, ...":"§r§7"}}§r`;
                function buildLines(base, offSet = "  "){
                    const prototype = Object.getPrototypeOf(base);
                    for (const keyName of Object.getOwnPropertyNames(base)) {
                        let getter = base.__lookupGetter__?.(keyName);
                        let setter = base.__lookupSetter__?.(keyName);
                        if(getter == undefined&&setter == undefined){
                            output += `\n${offSet}§r${keyName}§7: §r${toStringPrimitive(base[keyName])}`;
                        } else {
                            if(getter != undefined) output += `\n${offSet}§7get§r ${keyName}§7: (...)`;
                            if(setter != undefined) output += `\n${offSet}§7set§r ${keyName}§7: (...)`;
                        }
                    }
                    for (const keySymbol of Object.getOwnPropertySymbols(base)){
                        let getter = base.__lookupGetter__?.(keySymbol);
                        let setter = base.__lookupSetter__?.(keySymbol);
                        if(getter == undefined&&setter == undefined){
                            output += `\n${offSet}§r${toStringPrimitiveShort(keySymbol)}§7: §r${toStringPrimitive(base[keySymbol])}`;
                        } else {
                            if(getter != undefined) output += `\n${offSet}§7get§r ${toStringPrimitiveShort(keySymbol)}§7: (...)`;
                            if(setter != undefined) output += `\n${offSet}§7set§r ${toStringPrimitiveShort(keySymbol)}§7: (...)`;
                        }
                    }
                    if(prototype != null){
                        const typOf = getTypeOfObject(prototype);
                        output += `\n${offSet}§r[[Prototype]]§r§7: ` + (typOf==""?"Object":typOf)
                        if(prototype != Object.prototype && prototype != Array.prototype && prototype != Map.prototype){
                            buildLines(prototype, offSet + "  ");
                        }
                    }
                }
                buildLines(base);
                return output;
            }
        case 'function': return any.toString();
        case 'symbol': return `§7Symbol(${any.description})`;
        case 'bigint':
        case 'number':
        case 'boolean': return `§3${any.toString()}§r`;
        case 'undefined': return "§7§oundefined";
        case 'string': return `§3"${any}"§r`;
        default:
            break;
    }
}
export function toStringPrimitiveShort(any){
    switch (typeof any) {
        case 'object': 
            if(any === null){
                return "§7§onull";
            }else{
                const typeOf = getTypeOfObject(any);
                return `§7${typeOf} {...}`;
            }
        case 'function': return "§5§oƒ§r";
        case 'symbol': return `§3Symbol(${any.description})§r`;
        case 'bigint':
        case 'number':
        case 'boolean': return `§3${any.toString()}§r`;
        case 'undefined': return "§7§oundefined§r";
        case 'string': return `§3"${any}"§r`;
        default:
            break;
    }
}
export function toStringPrimitive(any){
    switch (typeof any) {
        case 'object': 
            if(any === null){
                return "§7§onull§r";
            }else if (any instanceof Error) {
                return `§6${any}§r`;
            }else{
                const base = any, names = Object.getOwnPropertyNames(base), symbols = Object.getOwnPropertySymbols(base);
                const keys = names.map(k=>`§7${k}§r§7: ${toStringPrimitiveShort(base[k])}§r`).concat(symbols.map(s=>`§r${toStringPrimitiveShort(s)}§r§7: ${toStringPrimitiveShort(base[s])}`));
                const realKeys = keys.slice(0,5), typeOf = getTypeOfObject(base);
                return `§7${(typeOf == "Object" || typeOf == '')?"":typeOf + " "}{${realKeys.join("§7, ")}${keys.length>5?"§r§7, ...":"§r§7"}}`;
            }
        case 'function': return toFunctionString(any);
        case 'symbol': return `Symbol(${any.description})`;
        case 'bigint':
        case 'number':
        case 'boolean': return `§3${any.toString()}§r`;
        case 'undefined': return "§7§oundefined";
        case 'string': return `§6"${any}"§r`;
        default:
            break;
    }
}
export function getTypeOfObject(obj){
    return (obj[Symbol.toStringTag]??((obj.constructor?.prototype == obj?obj.constructor?.name:obj.__proto__?.constructor?.name)??""));
}
export function toFunctionString(func){
    const n = func.toString(), ctor = Object.getPrototypeOf(func).constructor;
    if(n.startsWith('class')){
        return `§5§oclass §r§3${func.name}`
    }else{
        return `§5§o${(ctor == AsyncFunctionConstructor?"async ƒ ":(ctor == GeneratorFunctionConstructor?"ƒ * ":(ctor == AsyncGeneratorFunctionConstructor?"async ƒ * ":"ƒ ")))} §r§g${func.name}§7(${n.match(/(?<=(^[^\(]+\()|\()(.*)(?=(\)([ ]+|)\{([^]+|)\}$)|(\)(([ ]+|)(\=\>)([ ]+|))))/)[0].replace(/  +/g," ")})`;
    }
}
globalThis[Symbol.toStringTag] = 'GlobalThis';
globalThis.console[Symbol.toStringTag] = "Console";