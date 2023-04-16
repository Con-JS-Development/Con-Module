import { AsyncFunctionConstructor } from "../con-base/index";

export const MinecraftModules = [
    "@minecraft/server",
    "@minecraft/server-ui",
    "@minecraft/server-gametest",
    "@minecraft/server-net",
    "@minecraft/server-admin",
    "@minecraft/server-editor",
    "@minecraft/server-editor-bindings"
];
export const OutputTypes = {
    "error":"error",
    "log":"log",
    "warn":"warn",
    "syntax":"syntax"
} 
export const Settings = {
    output:console.warn,
}
function formatText(type,...texts){

}
export async function TerminalInput(source, message){ let o = formatText.bind(null,false);
    const a = await RunCode(message,true, {console:{log:o,warn:o,error:o},print:o, self:source});
    if
}

export async function RunCode(code, useModules = true, ...scopes){let func, output = {syntaxError:undefined, promise: undefined};
    const modules = useModules?(await BuildAPIScope(MinecraftModules)):[];
    try {
        func = BuildNewFunction(this,code,...modules,...scopes);
    } catch (error) {
        output.syntaxError = error;
        output.promise = Promise.reject(error);
        return output;
    }
    output.promise = func();
    return output;
}

async function BuildAPIScope(...modules){
    let promises = [];
    modules.forEach(m=>promises.push(import(m).catch(()=>({}))));
    return await Promise.all(promises);
}

function BuildNewFunction(thisArg = this, code, ...scopes){
    let scope = {}, func;
    for(const s of scopes) Object.assign(scope,s);
    let keys = Object.getOwnPropertyNames(scope);
    try {
        if(code.endsWith(";")) code = code.substring(0,code.length - 1);
        func = AsyncFunctionConstructor.apply(AsyncFunctionConstructor,[...keys,"return (" + code + ")"]);
    } catch (error) {
        func = AsyncFunctionConstructor.apply(AsyncFunctionConstructor,[...keys,code]);
    }
    return Function.prototype.bind.apply(func,[thisArg,...keys.map(k=>scope[k])]);
}