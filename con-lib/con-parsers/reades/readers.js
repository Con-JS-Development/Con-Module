import { Reader } from "./main.js";

export class TextReader extends Reader{}
export class RawTextReader extends StringReader{}
export class BasicTextReader extends StringReader{}
export class NumberReader extends Reader{}
export class IntReader extends NumberReader{}
export class FloatReader extends NumberReader{}
export class BooleanReader extends Reader{}
export class ObjectReader extends Reader{}
export class ArrayReader extends Reader{}

export class CompoudReaderOptions{
    constructor(initial, endial, spliting = ","){
        this.initialChar = initial;
        this.endialChar = endial;
        this.splitingChar = spliting
    }
}
export class ObjectReaderOptions extends CompoudReaderOptions{
    constructor(propertyReader, valueReader, assignial = '=', initial = '{', endial = '}', spliting = ','){
        super(initial,endial,spliting);
    }
}
export class ArrayReaderOptions extends CompoudReaderOptions{}