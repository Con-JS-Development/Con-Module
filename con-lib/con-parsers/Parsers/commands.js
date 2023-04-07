import { legacyParserRegex } from "./consts.js";
import { RangeParserSyntaxError, StringRef, UnexpectedEndOfArguments, UnexpectedEndOfInput } from "./data.js";
import { readToEnd, parseText, parseNumber, parseString, parseStringValidator, SkipCharacters } from "./main.js";
import { ParseGameMode, parseLocation } from "./minecraft.js";
import { EntityQueryParser, parseRange } from "./target_selector.js";

const errorTypes = {
    "unexpectedType":"unexpectedType",
    "parsingError":"parsingError",
    "syntaxError":"syntaxError"
};
/** @typedef {{readToEnd: "readToEnd",text: "text",number: "number",target: "target",location: "location",range: "range",gamemode: "gamemode",custom: "custom"}} templateTypes */
const templateTypes = {
    readToEnd: "readToEnd",
    text: "text",
    number: "number",
    target: "target",
    location: "location",
    range: "range",
    gamemode: "gamemode",
    custom: "custom"
};
const parserTypes = {
    readToEnd: readToEnd,
    text:(ref)=>parseText(ref),
    number:(ref)=> parseNumber(ref),
    target:(ref,sender) => EntityQueryParser.ParseTarget(ref,sender),
    location: parseLocation,
    range: parseRange,
    gamemode: ParseGameMode
};
function *validator(sender){
    const a = yield {type: templateTypes.readToEnd};
    return a.match(legacyParserRegex)??[];
}
/** @param {StringRef} ref @param {Generator<{type: templateTypes,customParser?: (str: StringRef)=>any}>} validatorGenerator */
function parseCommand(ref, validatorGenerator = validator(), throwError = true){
    if(validatorGenerator instanceof GeneratorFunction) validatorGenerator = validatorGenerator();
    if(!validatorGenerator instanceof Generator) throw new TypeError("validatorGenerator is not generator");
    let v, value, lastIndex = ref.index;
    while (true) {
        try {
            v = validatorGenerator.next(...[value]);
            value = undefined;
            SkipCharacters(ref);
        } catch (error) {
            if(error.type == errorTypes.unexpectedType){
                throw Object.assign(new RangeParserSyntaxError(ref,lastIndex),{type:errorTypes.parsingError});
            }
            throw error;
        }
        if(v.done){
            if(ref.index < ref.length) throw Object.assign(new RangeParserSyntaxError(ref,ref.index,ref.length),{type:errorTypes.parsingError});
            return v.value;
        }
        const {type,params = [], optional = true} = v.value??{};
        if(ref.index>=ref.length) {
            if(optional) value=null;
            else{
                const er = new UnexpectedEndOfArguments(type);
                er.type = errorTypes.parsingError;
                throw er;
            }
            continue;
        }
        if(!type in templateTypes) {
            try {
                validatorGenerator.throw(Object.assign(new TypeError("Invalid template types"),{type: errorTypes.unexpectedType}));
            } catch (error) {
                console.warn(error, error.stack);
            }
            continue;
        }
        let func = type===templateTypes.custom?v.value.customParser:parserTypes[type];
        try {
            lastIndex = ref.index;
            value = func(ref,...params);
            SkipCharacters(ref);
        } catch (error) {
            error.type = errorTypes.parsingError;
            validatorGenerator.throw(error);
        }
    }
}
class CommandParser{
    static ParseCommandArguments(string, validator, throwError = true){
        const ref = StringRef.toRef(string)
        return parseCommand(ref,validator, throwError);
    }
}
export {CommandParser, templateTypes as ArgumentParserTypes, errorTypes as ErrorTypes};