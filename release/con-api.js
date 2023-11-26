/*! This file was automatically generated. */
import * as __WEBPACK_EXTERNAL_MODULE__minecraft_server_ui_f6791859__ from "@minecraft/server-ui";
import * as __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__ from "@minecraft/server";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  AZ: () => (/* reexport */ AsyncFunctionConstructor),
  EN: () => (/* reexport */ AsyncGeneratorFunction),
  tT: () => (/* reexport */ AsyncGeneratorFunctionConstructor),
  LV: () => (/* reexport */ AsyncSemaphore),
  nv: () => (/* reexport */ BinaryStreamReader),
  "do": () => (/* reexport */ BinaryStreamWriter),
  Zu: () => (/* reexport */ BlockRaycastHit),
  X6: () => (/* reexport */ BuildClass),
  Fi: () => (/* reexport */ CoordinateBase),
  BA: () => (/* reexport */ CustomDatabase),
  Aw: () => (/* reexport */ CustomEvent),
  QM: () => (/* reexport */ DatabaseSavingModes),
  bQ: () => (/* reexport */ DisposableHandle),
  dL: () => (/* reexport */ EndOfStreamError),
  xs: () => (/* reexport */ FixedNumber),
  Lg: () => (/* reexport */ GenerateRandomString),
  gp: () => (/* reexport */ GenerateUUID),
  tp: () => (/* reexport */ GeneratorFunction),
  vd: () => (/* reexport */ GeneratorFunctionConstructor),
  u8: () => (/* reexport */ GeneratorThread),
  Pl: () => (/* reexport */ GeometryGenerator),
  fl: () => (/* reexport */ JsonDatabase),
  lw: () => (/* reexport */ MinecraftOverloadEvent),
  RY: () => (/* reexport */ NBT),
  N3: () => (/* reexport */ NBTDatabase),
  ZA: () => (/* reexport */ NBTReaderOptions),
  ts: () => (/* reexport */ NBTStreamReader),
  yl: () => (/* reexport */ NBTStreamWriter),
  zK: () => (/* reexport */ NBTTypes),
  u$: () => (/* reexport */ NBTWriterOptions),
  uX: () => (/* reexport */ OverTakes),
  Li: () => (/* reexport */ PlayerDieAfterEventSignal),
  oY: () => (/* reexport */ PlayerHealthChangedAfterEventSignal),
  e9: () => (/* reexport */ PlayerHitBlockAfterEventSignal),
  zG: () => (/* reexport */ PlayerHitEntityAfterEventSignal),
  Fy: () => (/* reexport */ PlayerHurtAfterEventSignal),
  tB: () => (/* reexport */ ReExtenend),
  fd: () => (/* reexport */ ShapeGeneratorPrototype),
  jw: () => (/* reexport */ Shapes),
  cW: () => (/* reexport */ SyncPromise),
  wM: () => (/* reexport */ TextReader),
  rV: () => (/* reexport */ TextStream),
  Ek: () => (/* reexport */ TextWriter),
  Hw: () => (/* reexport */ ThreadCommands),
  AO: () => (/* reexport */ Vec3),
  ay: () => (/* reexport */ YieldableSymbol),
  Se: () => (/* reexport */ YieldableTypes),
  Pr: () => (/* reexport */ defaultWriters),
  C$: () => (/* reexport */ defualtReaders),
  J8: () => (/* reexport */ output),
  Yp: () => (/* reexport */ sus)
});

;// CONCATENATED MODULE: ./node_modules/nbt-serializer/BinaryStream.js
class Stream extends DataView{
    /**@param {ArrayBuffer|number} buffer*/
    constructor(buffer, offset = 0){
        if(typeof buffer === "number") super(new ArrayBuffer(buffer));
        else super(buffer);
        this.__offset__ = offset;
        this.__size__ = offset;
    }
    /**@private */
    __size__;
    /**@private */
    __off_set__;
    /**@protected */
    get __offset__(){return this.__off_set__??0;};
    set __offset__(v){if(v>this.byteLength) throw new EndOfStreamError("Offset cant be out of Stream."); this.__off_set__ = v; if(v>this.__size__) this.__size__ = v;}
    /**@readonly */
    get offset(){return this.__offset__;}
    get size(){return this.__size__;}
    /**@readonly */
    get EndOfStream(){return this.__offset__ >= this.byteLength;}
    setOffset(num){
        if(num>this.byteLength) throw new EndOfStreamError("Offset cant be out of Stream.");
    }
    static fromString(text, options,...params){
        const {bufferLength = 32e+3, base=16}=options??{};
        const BYTES_PER_ELEMENT = base / 8, property ="setUint" + base;
        if(text.length * BYTES_PER_ELEMENT > bufferLength) throw new RangeError("Can't fit text to specified buffer, please increase buffer length");
        const typedArray = new DataView(new ArrayBuffer(bufferLength));
        if(!property in typedArray) throw new Error("Invalid base: " + base);
        for (let i = 0; i < text.length; i++) typedArray[property](i*BYTES_PER_ELEMENT,String.prototype.charCodeAt.call(text,i) - 1);
        const a = new this(typedArray.buffer,...params);
        a.__size__ = text.length * BYTES_PER_ELEMENT;
        return a;
    }
    /**@param {Stream} stream @param {8|16|32} base*/
    static toString(stream, base=16){
        const BYTES_PER_ELEMENT = base / 8, property ="getUint" + base;
        const codes = [];
        if(!property in stream) throw new Error("Invalid base: " + base);
        for (let i = 0; i < stream.size; i+=BYTES_PER_ELEMENT) codes.push(1 + stream[property](i));
        return String.fromCharCode.apply(String,codes);
    }
    toString(base = 16){
        return Stream.toString(this,base);
    }
}
class BinaryStreamWriter extends Stream{
    constructor(stream){
        if(typeof stream === "number") super(stream);
        else if(stream instanceof Stream) super(stream.buffer,stream.offset);
        else if("buffer" in stream) super(stream.buffer);
        else super(stream); 
    }
    writeBytes(buffer,length){
        const array = new Uint8Array(buffer);
        if(!length) length = array.length;
        for (var i = 0; i < length; i++) {
            this.writeByte(array[i]??0);
        }
        return i;
    }
    writeString(text, base = 8){
        const property = "writeUint" + base;
        if(!property in this) throw new Error("Invalid base: " + base);
        let out = 0;
        for (let i = 0; i < text.length; i++) out+= this[property](String.prototype.charCodeAt.call(text,i));
        return out;
    }
    /**@param {number} num */
    writeByte(num){return this.writeUint8(num);}
    /**@param {number} num */
    writeUint8(num){
        if(this.EndOfStream || this.__offset__ + 1 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        this.setUint8(this.__offset__,num);
        this.__offset__+=1;
        return 1;
    }
    /**@param {number} num */
    writeInt8(num){
        if(this.EndOfStream || this.__offset__ + 1 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        this.setInt8(this.__offset__,num);
        this.__offset__+=1;
        return 1;
    }

    /**@param {number} num */
    writeInt16(num){
        if(this.EndOfStream || this.__offset__ + 2 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        this.setInt16(this.__offset__,num);
        this.__offset__+=2;
        return 2;
    }    
    /**@param {number} num */
    writeUint16(num){
        if(this.EndOfStream || (this.__offset__ + 2 > this.byteLength)) throw new EndOfStreamError("You cant write at end of the stream");
        this.setUint16(this.__offset__,num);
        this.__offset__+=2;
        return 2;
    }

    /**@param {number} num */
    writeInt32(num){
        if(this.EndOfStream || this.__offset__ + 4 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        this.setInt32(this.__offset__,num);
        this.__offset__+=4;
        return 4;
    }    
    /**@param {number} num */
    writeUint32(num){
        if(this.EndOfStream || this.__offset__ + 4 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        this.setUint32(this.__offset__,num);
        this.__offset__+=4;
        return 4;
    }
    
    /**@param {number} num */
    writeFloat32(num){
        if(this.EndOfStream || this.__offset__ + 4 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        this.setFloat32(this.__offset__,num);
        this.__offset__+=4;
        return 4;
    }    
    /**@param {number} num */
    writeFloat64(num){
        if(this.EndOfStream || this.__offset__ + 8 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        this.setFloat64(this.__offset__,num);
        this.__offset__+=8;
        return 8;
    }
}
class BinaryStreamReader extends Stream{
    constructor(stream){
        if(typeof stream === "number") super(stream);
        else if(stream instanceof Stream) super(stream.buffer,stream.offset);
        else if("buffer" in stream) super(stream.buffer);
        else super(stream); 
    }
    readBytes(length=0){
        if(length + this.offset > this.byteLength) length = this.byteLength - this.offset;
        const array = new Uint8Array(length);
        for (var i = 0; i < length; i++)  array[i] = this.readByte();
        return array;
    }
    readString(length=0, base = 8){
        const BYTES_PER_ELEMENT = base / 8, property = "readUint" + base;
        if((length*BYTES_PER_ELEMENT) + this.offset > this.byteLength) length = Math.floor((this.byteLength - this.offset)/BYTES_PER_ELEMENT);
        if(!property in this) throw new Error("Invalid base: " + base);
        let data = [];
        for (let i = 0; i < length; i++) data.push(this[property]());
        return String.fromCharCode.call(String,...data);
    }
    readByte(){return this.readUint8();}
    readUint8(){
        if(this.EndOfStream || this.__offset__ + 1 > this.byteLength) throw new EndOfStreamError("You cant read at end of the stream");
        const v = this.getUint8(this.__offset__);
        this.__offset__+=1;
        return v;
    }
    readInt8(){
        if(this.EndOfStream || this.__offset__ + 1 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        const v = this.getInt8(this.__offset__);
        this.__offset__+=1;
        return v;
    }
    readInt16(){
        if(this.EndOfStream || this.__offset__ + 2 > this.byteLength) throw new EndOfStreamError("You cant read at end of the stream");
        const v = this.getInt16(this.__offset__);
        this.__offset__+=2;
        return v;
    }
    readUint16(){
        if(this.EndOfStream || this.__offset__ + 2 > this.byteLength) throw new EndOfStreamError("You cant read at end of the stream");
        const v = this.getUint16(this.__offset__);
        this.__offset__+=2;
        return v;
    }
    readInt32(){
        if(this.EndOfStream || this.__offset__ + 4 > this.byteLength) throw new EndOfStreamError("You cant read at end of the stream");
        const v = this.getInt32(this.__offset__);
        this.__offset__+=4;
        return v;
    }
    readUint32(){
        if(this.EndOfStream || this.__offset__ + 4 > this.byteLength) throw new EndOfStreamError("You cant read at end of the stream");
        const v = this.getUint32(this.__offset__);
        this.__offset__+=4;
        return v;
    }
    readFloat32(){
        if(this.EndOfStream || this.__offset__ + 4 > this.byteLength) throw new EndOfStreamError("You cant read at end of the stream");
        const v = this.getFloat32(this.__offset__);
        this.__offset__+=4;
        return v;
    }
    readFloat64(){
        if(this.EndOfStream || this.__offset__ + 8 > this.byteLength) throw new EndOfStreamError("You cant read at end of the stream");
        const v = this.getFloat64(this.__offset__);
        this.__offset__+=8;
        return v;
    }
}
class EndOfStreamError extends Error{}

;// CONCATENATED MODULE: ./node_modules/nbt-serializer/index.js


const NBTTypes = {
    "EndOfCompoud":0,
    "Compoud":1,
    "Array":2,
    "TypedArray":3,
    "Uint8":4,
    "Uint16":5,
    "Int32":6,
    "Double":7,
    "String":8,
    "Empty":9,
    "Boolean":10,
    0:"EndOfCompoud",
    1:"Compoud",
    2:"Array",
    3:"TypedArray",
    4:"Uint8",
    5:"Uint16",
    6:"Int32",
    7:"Double",
    8:"String",
    9:"Empty",
    10:"Boolean"
}
function isUint8(n) {return Number.isInteger(n) && n >= 0 && n <= 255;}  
function isUint16(n) {return Number.isInteger(n) && n >= 0 && n <= 65535;}
function isInt32(n) {return Number.isInteger(n) && n >= -2147483648 && n <= 2147483647;}
const caller = Function.prototype.call;
class NBTStreamWriter extends BinaryStreamWriter{
    constructor(stream,options = new NBTWriterOptions()){
        super(stream);
        if(!(options instanceof NBTWriterOptions)) Object.setPrototypeOf(options,NBTWriterOptions.prototype);
        this.__options__ = options;
    }
    /**@readonly @private @type {NBTWriterOptions} */
    __options__;
    writeTypedArray(array){
        const typeOf = this.__options__.getType(array[0]);
        let bytes = this.writeType(typeOf);
        bytes += this.writeUint16(array.length);
        for (const data of array) bytes+=this.__options__.writers[typeOf](this,data);
        return bytes;
    }
    writeBoolean(bool){return this.writeByte(!!bool?1:0);}
    writeString(text){
        return this.writeUint16(text.length) + super.writeString(text,8);
    }
    writeArray(array){
        let bytes = this.writeUint16(array.length);
        for (const data of array) {
            const type = this.__options__.getType(data);
            if(!type) continue;
            bytes += this.writeType(type)
            + this.__options__.writers[type](this,data);
        }
        return bytes;
    }
    writeCompoud(object){
        let bytes = 0;
        for (const propertyName of Object.getOwnPropertyNames(object??{})) {
            const data = object[propertyName];
            const type = this.__options__.getType(data);
            if(!type) continue;
            bytes+=this.writeType(type) 
            + this.writeString(propertyName,8) 
            + this.__options__.writers[type](this,data);
        }
        bytes+=this.writeType(this.__options__.nbtTypes.EndOfCompoud);
        return bytes;
    }
    writeEmpty(){return 0;}
    writeType(type){return this.writeByte(typeof type==="string"?(this.__options__.nbtTypes[type]??0):type??0);}
}
class NBTStreamReader extends BinaryStreamReader{
    constructor(stream,options = new NBTReaderOptions()){
        super(stream);
        if(!(options instanceof NBTReaderOptions)) Object.setPrototypeOf(options,NBTReaderOptions.prototype);
        this.__options__ = options;
    }
    /**@readonly @private @type {NBTReaderOptions} */
    __options__;
    readTypedArray(){
        const typeOf = this.readType(),array=[];
        let length = this.readUint16();
        for (let i = 0; i < length; i++) array.push(this.__options__.readers[typeOf](this));
        return array;
    }
    readBoolean(){return !!this.readByte();}
    readString(){
        const length = this.readUint16();
        let text = super.readString(length,8);
        return text
    }
    readArray(){
        let length = this.readUint16();
        const array = [];
        for (let i = 0; i < length; i++) {
            const type = this.readType();
            array.push(this.__options__.readers[type](this));
        }
        return array;
    }
    readCompoud(){
        const object = {};
        while(true){
            const dataType = this.readType();
            if(dataType === this.__options__.nbtTypes.EndOfCompoud) break;
            const propertyName = this.readString();
            const data = this.__options__.readers[dataType](this);
            object[propertyName] = data;
        }
        return object;
    }
    readEmpty(){return undefined;}
    readType(){return this.readByte();}
}
class NBT{
    static ReadNBT(stream){
        let type = stream.readType();
        return stream.__options__.readers[type](stream);
    }
    static WriteNBT(data, stream, type = stream.__options__.getType(data)){
        let bytesWriten = stream.writeType(type);
        bytesWriten += stream.__options__.writers[type](stream,data);
        return bytesWriten;
    }
    static getType(object){
        switch (typeof object) {
            case "undefined":
                return NBTTypes.Empty;
            case "string":
                return NBTTypes.String;
            case "boolean":
                return NBTTypes.Boolean;
            case "object": 
                return Array.isArray(object)?NBTTypes.Array:NBTTypes.Compoud;
            case "number":
                if(isUint8(object)) return NBTTypes.Uint8;
                if(isUint16(object)) return NBTTypes.Uint16;
                if(isInt32(object)) return NBTTypes.Int32;
                return NBTTypes.Double;
            default:
                return undefined;
        }
    }
    /**@param {any} object @param {NBTWriterOptions?} options */
    static stringify(object,options){
        let o = new NBTStreamWriter(32e+3,options??new NBTWriterOptions());
        NBT.WriteNBT(object,o);
        return o.toString();
    }
    /**@param {any} object @param {NBTReaderOptions?} options */
    static parse(string,options){
        let stream = NBTStreamReader.fromString(string,null,options??new NBTReaderOptions());
        return NBT.ReadNBT(stream);
    }
    static createNewWriters(object){return object?Object.setPrototypeOf(object,defaultWriters):Object.create(defaultWriters);}
    static createNewReaders(object){return object?Object.setPrototypeOf(object,defualtReaders):Object.create(defualtReaders);}
}
const defaultWriters = {
    [NBTTypes.Compoud]:caller.bind(NBTStreamWriter.prototype.writeCompoud),
    [NBTTypes.Empty]:caller.bind(NBTStreamWriter.prototype.writeEmpty),
    [NBTTypes.Array]:caller.bind(NBTStreamWriter.prototype.writeArray),
    [NBTTypes.String]:caller.bind(NBTStreamWriter.prototype.writeString),
    [NBTTypes.Boolean]:caller.bind(NBTStreamWriter.prototype.writeBoolean),
    [NBTTypes.Uint8]:caller.bind(NBTStreamWriter.prototype.writeByte),
    [NBTTypes.Uint16]:caller.bind(NBTStreamWriter.prototype.writeUint16),
    [NBTTypes.Int32]:caller.bind(NBTStreamWriter.prototype.writeInt32),
    [NBTTypes.Double]:caller.bind(NBTStreamWriter.prototype.writeFloat64),
    [NBTTypes.TypedArray]:caller.bind(NBTStreamWriter.prototype.writeTypedArray)
}
const defualtReaders = {
    [NBTTypes.Compoud]:caller.bind(NBTStreamReader.prototype.readCompoud),
    [NBTTypes.Empty]:caller.bind(NBTStreamReader.prototype.readEmpty),
    [NBTTypes.Array]:caller.bind(NBTStreamReader.prototype.readArray),
    [NBTTypes.String]:caller.bind(NBTStreamReader.prototype.readString),
    [NBTTypes.Boolean]:caller.bind(NBTStreamReader.prototype.readBoolean),
    [NBTTypes.Uint8]:caller.bind(NBTStreamReader.prototype.readByte),
    [NBTTypes.Uint16]:caller.bind(NBTStreamReader.prototype.readUint16),
    [NBTTypes.Int32]:caller.bind(NBTStreamReader.prototype.readInt32),
    [NBTTypes.Double]:caller.bind(NBTStreamReader.prototype.readFloat64),
    [NBTTypes.TypedArray]:caller.bind(NBTStreamReader.prototype.readTypedArray)
}
class NBTStreamOptions{}
NBTStreamOptions.prototype.nbtTypes = NBTTypes;
NBTStreamOptions.prototype.getType = NBT.getType;
class NBTWriterOptions extends NBTStreamOptions{}
NBTWriterOptions.prototype.writers = defaultWriters;
class NBTReaderOptions extends NBTStreamOptions{}
NBTReaderOptions.prototype.readers = defualtReaders;
;// CONCATENATED MODULE: external "@minecraft/server-ui"
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
const server_ui_namespaceObject = x({ ["FormResponse"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_ui_f6791859__.FormResponse, ["ModalFormResponse"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_ui_f6791859__.ModalFormResponse });
;// CONCATENATED MODULE: ./src/core/engine/base.ts
const GeneratorFunction = Object.getPrototypeOf(function* () { });
const GeneratorFunctionConstructor = GeneratorFunction.constructor;
const Generator = GeneratorFunction.prototype;
const AsyncGeneratorFunction = Object.getPrototypeOf(async function* () { });
const AsyncGeneratorFunctionConstructor = AsyncGeneratorFunction.constructor;
const AsyncGenerator = AsyncGeneratorFunction.prototype;
const AsyncFunctionConstructor = Object.getPrototypeOf(async function () { }).constructor;
Object.assign(Symbol, {
    runnable: Symbol("Symbol.runnable"),
    isGenerator: Symbol("Symbol.isGenerator"),
    isAsyncGenerator: Symbol("Symbol.isAsyncGenerator"),
    isNotThenable: Symbol("Symbol.isNotThenable"),
    thenable: Symbol("Symbol.thenable"),
});
console[Symbol.toStringTag] = "Console";
Function.isRunnable = function isRunnable(runnable) {
    return (typeof runnable === "function") || (typeof runnable[Symbol.runnable] === "function") || GeneratorFunction.isGenerator(runnable);
};
Function.run = function run(runnable, thisArg, ...params) {
    if (!Function.isRunnable(runnable))
        throw new TypeError(`The object must be the runnable. Make sure the method has a property with the key Symbol.runnable.`);
    //@ts-ignore
    if (Function.hasRunnable(runnable))
        return runnable[Symbol.runnable].call(thisArg, ...params);
    if (runnable instanceof GeneratorFunctionConstructor || GeneratorFunction.isGenerator(runnable))
        return GeneratorFunction.Run(runnable);
    if (typeof runnable === "function")
        return runnable(...params);
    return null;
};
Function.hasRunnable = function hasRunnable(runnable) {
    return typeof runnable[Symbol.runnable] === "function";
};
GeneratorFunction.isGenerator = function isGenerator(gen) { return Symbol.isGenerator in gen; };
AsyncGeneratorFunction.isAsyncGenerator = function isAsyncGenerator(gen) { return Symbol.isAsyncGenerator in gen; };
Object.defineProperty(Generator, Symbol.isGenerator, { value: true });
Object.defineProperty(AsyncGenerator, Symbol.isGenerator, { value: true });
Object.defineProperty(AsyncGenerator, Symbol.isAsyncGenerator, { value: true });
Object.defineProperty(Number, "unitTypes", { value: ['', 'k', 'M', 'G', 'T', 'E'] });
Object.assign(Math, {
    deg(number) { return (number * 180) * Math.PI; },
    rad(number) { return (number * Math.PI) / 180; },
    randomBetween(max, min = 0) {
        const [n, x] = max > min ? [max, min] : [min, max];
        return Math.random() * (x - n) + n;
    }
});
Object.defineProperties(Array.prototype, {
    randomElement: { get() { return this[Math.floor(Math.random() * this.length)]; } },
    remove: {
        value(value) {
            let i = this.indexOf(value);
            if (i > -1)
                this.splice(i, 1);
            return this;
        }
    },
    removeAll: {
        value(value) {
            let i = 0;
            while (i < this.length) {
                if (this[i] === value)
                    this.splice(i, 1);
                else
                    ++i;
            }
            return this;
        }
    }
});
Object.assign(Number.prototype, {
    unitFormat(place = 1, space = "", exponent = 3, component = 1) {
        for (let i = 0, n = this, c = 10 ** (exponent + component), e = 10 ** exponent; true; i++) {
            if (n >= c) {
                n /= e;
                continue;
            }
            return nFix(n, place) + space + (Number.unitTypes[i] ?? "");
        }
    },
    setLength(length = 4, radix = 10) { return this.toString(radix).padStart(length, '0'); },
    floor() { return ~~this; }
});
function nFix(num, place) {
    let n = "" + num;
    let n2 = n.split('.');
    if (n2.length == 1)
        return n;
    else if (n2[1]?.length < place)
        return n;
    else
        return num.toFixed(place);
}

;// CONCATENATED MODULE: ./src/core/engine/SyncPromise.js
class SyncPromise{
    isRejected = false;
    resolvedValue = undefined;
    rejectedValue = undefined;
    isFulfilled = false;
    get value(){
        if(this.isFulfilled) return this.resolvedValue;
        if(this.isRejected) return this.rejectedValue;
        return undefined;
    }
    run = [];
    static resolve(value){
        return new SyncPromise(res=>res(value));
    }
    static reject(value){
        return new SyncPromise((res,rej)=>rej(value));
    }
    getResolver(){
        return (val)=>{
            if (this.isFulfilled || this.isRejected) throw new Error('SyncPromise is already finished.');
            try {
                if(typeof val?.then === "function") return val.then(this.getResolver(),this.getRejecter());
            } catch (error) {}
            this.isFulfilled = true;
            this.resolvedValue = val;
            for (const runs of this.run) {
                runs.res(val);
            }
            delete this.run;
        }
    }
    getRejecter(){
        return (er)=>{
            if (this.isFulfilled || this.isRejected) throw new Error('SyncPromise is already finished.');
            try {
                if(typeof er?.then === "function") return er.then(this.getRejecter(),this.getRejecter());
            } catch (error) {}
            this.isRejected = true;
            this.rejectedValue = er;
            for (const runs of this.run) {
                runs.rej(er);
            }
            delete this.run;
        }
    }
    constructor(thens){
        thens(this.getResolver(),this.getRejecter());
    }
    then(res, rej){
        if(this.isRejected){
            return new SyncPromise((resolve,reject)=>{
                try {
                    if(rej != undefined) resolve(rej(this.rejectedValue));
                    else reject(this.rejectedValue); 
                } catch (error) {
                    reject(error);
                }
            });
        } else if(this.isFulfilled){
            return new SyncPromise((resolve,reject)=>{
                try {
                    if(res != undefined) resolve(res(this.resolvedValue));
                    else resolve(this.resolvedValue);
                } catch (error) {
                    reject(error);
                }
            });
        } else {
            return new SyncPromise((resolve, reject)=>{
                this.run.push({
                    res: (a)=>{
                        try {
                            if(res != undefined) resolve(res(a));
                            else resolve(a);
                        } catch (error) {
                            reject(error);
                        }
                    },
                    rej: (e)=>{
                        try {
                            if(rej != undefined) resolve(rej(e));
                            else reject(e);
                        } catch (error) {
                            reject(error);
                        }
                    }
                });
            });
        }
    };
    finally(callBack){
        if(this.isRejected){
            return new SyncPromise((resolve,reject)=>{
                try {
                    callBack?.();
                    reject(this.rejectedValue);
                } catch (error) {
                    reject(error);
                }
            });
        } else if(this.isFulfilled){
            return new SyncPromise((resolve,reject)=>{
                try {
                    callBack?.();
                    resolve(this.resolvedValue);
                } catch (error) {
                    reject(error);
                }
            });
        } else {
            return new SyncPromise((resolve, reject)=>{
                this.run.push({
                    res: (a)=>{
                        try {
                            callBack?.();
                            resolve(a);
                        } catch (error) {
                            reject(error);
                        }
                    },
                    rej: (e)=>{
                        try {
                            callBack?.();
                            reject(e);
                        } catch (error) {
                            reject(error);
                        }
                    }
                });
            });
        }
    };
    catch(rej){
        if(this.isRejected){
            return new SyncPromise((resolve,reject)=>{
                try {
                    if(rej != undefined) resolve(rej(this.rejectedValue));
                    else reject(this.rejectedValue); 
                } catch (error) {
                    reject(error);
                }
            });
        } else if(this.isFulfilled){
            return new SyncPromise((resolve)=>resolve(this.resolvedValue));
        } else {
            return new SyncPromise((resolve, reject)=>{
                this.run.push({
                    res: resolve,
                    rej: (e)=>{
                        try {
                            if(rej != undefined) resolve(rej(this.rejectedValue));
                            else reject(this.rejectedValue); 
                        } catch (error) {
                            reject(error);
                        }
                    }
                });
            });
        }
    };
}
;// CONCATENATED MODULE: external "@minecraft/server"
var server_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var server_y = x => () => x
const server_namespaceObject = server_x({ ["BlockPermutation"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.BlockPermutation, ["BlockType"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.BlockType, ["ContainerSlot"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.ContainerSlot, ["Dimension"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.Dimension, ["Direction"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.Direction, ["Entity"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.Entity, ["EntityDieAfterEventSignal"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityDieAfterEventSignal, ["EntityEquipmentInventoryComponent"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityEquipmentInventoryComponent, ["EntityHealthChangedAfterEventSignal"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityHealthChangedAfterEventSignal, ["EntityHealthComponent"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityHealthComponent, ["EntityHitBlockAfterEventSignal"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityHitBlockAfterEventSignal, ["EntityHitEntityAfterEventSignal"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityHitEntityAfterEventSignal, ["EntityHurtAfterEventSignal"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityHurtAfterEventSignal, ["EntityInventoryComponent"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityInventoryComponent, ["EntityOnFireComponent"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityOnFireComponent, ["EquipmentSlot"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EquipmentSlot, ["ItemDurabilityComponent"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.ItemDurabilityComponent, ["ItemEnchantsComponent"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.ItemEnchantsComponent, ["ItemStack"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.ItemStack, ["Player"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.Player, ["ScoreboardIdentityType"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.ScoreboardIdentityType, ["ScoreboardObjective"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.ScoreboardObjective, ["ScreenDisplay"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.ScreenDisplay, ["System"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.System, ["SystemAfterEvents"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.SystemAfterEvents, ["SystemBeforeEvents"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.SystemBeforeEvents, ["World"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.World, ["WorldAfterEvents"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.WorldAfterEvents, ["WorldBeforeEvents"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.WorldBeforeEvents, ["system"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.system, ["world"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.world });
;// CONCATENATED MODULE: ./src/core/engine/green-thread.js




const IsRunningSymbol = Symbol("IsRunning");
const ThreadSymbol = Symbol("ThreadSymbol");
const YieldableSymbol = Symbol("Yieldable");
const ThreadCommands = {
    "SelfGenerator":"SelfGenerator",
    "SelfAwaitor":"SelfAwaitor",
    "EndOfTick":"EndOfTick"
};
const SymbolCommands = {
    [ThreadCommands.SelfGenerator](thread){thread.param = thread.generator;return false},
    [ThreadCommands.SelfAwaitor](thread){thread.param = thread.awaiter;return false;},
    [ThreadCommands.EndOfTick](thread){server_namespaceObject.system.runTimeout(()=>server_namespaceObject.system.runTimeout(()=>thread.onRun(),0),0);return true}
};
function GeneratorThread(generator, thisArg, ...param){
    if(!GeneratorFunction.isGenerator(generator) && generator instanceof GeneratorFunctionConstructor) generator = generator.call(thisArg,...param);
    if(!GeneratorFunction.isGenerator(generator)) throw new TypeError("Must be generator or function what returns generator");
    if(GeneratorThread.isRunning(generator)) return generator[ThreadSymbol];
    const object = new.target?this:{__proto__:GeneratorThread.prototype};
    generator[ThreadSymbol] = object;
    Object.assign(object,{
        param:undefined,
        generator,
        promise: new SyncPromise((res,rej)=>{object.resolve = res;object.reject = rej;}),
        nexts:[]
    });
    return object;
}
GeneratorThread.Run = function runGenerator(){
    return GeneratorThread(...arguments).start().catch(displayError);
}
GeneratorFunction.Run = GeneratorThread.Run; 
GeneratorThread.isRunning = function isRunning(generator){return generator[IsRunningSymbol] === true;}
GeneratorThread.getThread = function getThread(generator){if(GeneratorThread.isRunning(generator)) return generator[ThreadSymbol];}
GeneratorThread.prototype = {
    get awaiter(){return this.promise},
    get then(){return this.promise.then.bind(this.promise);},
    start(){
        if(GeneratorThread.isRunning(this.generator)) throw new Error("Generator is already running or already has ended");
        this.generator[IsRunningSymbol] = true;
        this.onRun();
        return this.awaiter;
    },
    onRun(){
        while(true){
            try {
                let {value, done} = this.nexts.length>0?this.nexts.shift():this.generator.next(this.param);
                delete this.param;
                if(done) return this.resolve(value);
                if(this.onCommand(value)) return;
            } catch (error) { if(this.onError(error)) return; }
        }
    },
    onCommand(value){
        if(value === 0 || value === null || value === undefined){
            Promise.resolve().then(()=>this.onRun());
            return true;
        }
        if(typeof value === "number"){
            if(value < 1) return this.onError(new TypeError("Number of ticks to await must be bigger than 0"));
            setTimeout(()=>this.onRun(),value);
            return true;
        }
        if(value === this.awaiter || value === this.generator || value === this) return this.onError(new TypeError("Can't yield recursive values."));
        if(value instanceof SyncPromise) return this.onThenable(value);
        if(value instanceof Promise) return this.onThenable(value);
        if(value[YieldableSymbol]) return this.onYielable(value[YieldableSymbol]);
        if(value[Symbol.thenable]) return this.onThenable(value);
        if(value in SymbolCommands) {
            try {
                return SymbolCommands[value](this);
            } catch (error) {
                return this.onError(error);
            }
        }
        if(typeof value.then === "function" && !value[Symbol.isNotThenble]){ 
            try {
                return this.onThenable(Promise.resolve(value));
            } catch (error) { return this.onError(error); }
        }
        return this.onError(new TypeError("Unknow yielded type " + value));
    },
    onYielable(value){
        try {
            const {type,data} = value;
            if(!type in resolver) return this.onError(new TypeError("Unknow yieldable data type:" + type));
            return resolver[type](this, data);
        } catch (error) {
            return this.onError(error);
        }
    },
    onError(er){
        try{
            this.nexts.push(this.generator.throw(er));
            return false;
        } catch(error){
            this.reject(error);
            return true;
        }
    },
    onThenable(thenable){
        try {
            thenable.then(res=>{this.param = res; this.onRun();},rej=>this.onError(rej)?null:this.onRun());
        } catch (error) { return this.onError(value); }
        return true;
    }
};
const YieldableTypes = {
    AsyncCallback:"AsyncCallback",
    SyncCallback:"SyncCallback",
    Value:"Value"
};
const resolver = {
    [YieldableTypes.AsyncCallback](thread, data){
        let ret = false;
        try {
            data((value)=>{ 
                if(ret){ thread.param = value; thread.onRun();} 
                else {thread.onError(new TypeError("This yieladable value is tagged as AsyncCallback type but its executed synced."))?null:thread.onRun();}
            });
        } catch (error) {
            return thread.onError(new TypeError("This yieladable value is tagged as AsyncCallback type but it is not possible to execute. ErrorMessage: " + error));
        }
        ret = true;
        return true;
    },
    [YieldableTypes.SyncCallback](thread, data){
        try {
            thread.param = data();
        } catch (error) {
            return thread.onError(new TypeError("This yieladable value is tagged as SyncCallback type but it is not possible to execute. ErrorMessage: " + error));
        }
        thread.param = data();
        return false;
    },
    [YieldableTypes.Value](thread,data){
        thread.param = data;
        return false;
    }
}
;// CONCATENATED MODULE: ./src/core/engine/index.ts




;// CONCATENATED MODULE: ./src/core/utils/classes/Vec3.js
/*
 * Copyright © 2023 Free Term Of Use ConMaster2112
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software. You must include and keep this
 * copyright notice in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


const isVec3Symbol = Symbol("isVec3");
function Vec3(x = 0, y = 0, z = 0){
    if(new.target){
        this.x=Number(x);
        this.y=Number(y);
        this.z=Number(z);
    } else return {x:Number(x),y:Number(y),z:Number(z), __proto__:Vec3.prototype};
}
Vec3.magnitude = function magnitude(vec){return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);}
Vec3.normalize = function normalize(vec){const l = Vec3.magnitude(vec); return {x:vec.x/l, y:vec.y/l, z:vec.z/l,__proto__:Vec3.prototype}; }
Vec3.cross=function crossProduct(a, b) {return {x:a.y * b.z - a.z * b.y, y:a.x * b.z - a.z * b.x,z:a.x * b.y - a.y * b.x,__proto__:Vec3.prototype};}
Vec3.dot=function dot(a, b){return a.x * b.x + a.y * b.y + a.z * b.z;}
Vec3.angleBetween = function angleBetween(a,b){return Math.acos(Vec3.dot(a,b)/(Vec3.magnitude(a)*Vec3.magnitude(b)));}
Vec3.subtract = function subtract(a, b){return {x:a.x-b.x,y:a.y-b.y,z:a.z-b.z,__proto__:Vec3.prototype}};
Vec3.add = function add(a, b){return {x:a.x+b.x,y:a.y+b.y,z:a.z+b.z,__proto__:Vec3.prototype}};
Vec3.multiply = function multiply(vec,num){
    if(typeof num == "number") return {x:vec.x*num,y:vec.y*num,z:vec.z*num,__proto__:Vec3.prototype};
    else return {x:vec.x*num.x,y:vec.y*num.y,z:vec.z*num.z,__proto__:Vec3.prototype};
}
Vec3.isVec3 = function isVec3(vec){return vec[isVec3Symbol] === true;}
Vec3.floor = function floor(vec){return {x:Math.floor(vec.x),y:Math.floor(vec.y),z:Math.floor(vec.z),__proto__:Vec3.prototype};}
Vec3.projection = function projection(a,b){return Vec3.multiply(b,Vec3.dot(a,b)/((b.x * b.x + b.y * b.y + b.z * b.z)**2));}
Vec3.rejection = function rejection(a,b){return Vec3.subtract(a,Vec3.projection(a,b));}
Vec3.reflect = function reflect(v, n) {return Vec3.subtract(v, Vec3.multiply(n, 2 * Vec3.dot(v, n)));}
Vec3.lerp = function lerp(a, b, t) {return Vec3.multiply(a, 1 - t).add(Vec3.multiply(b,t));}
Vec3.distance = function distance(a,b){return Vec3.magnitude(Vec3.subtract(a,b));}
Vec3.from = function from(object){
    if(Vec3.isVec3(object)) return object;
    if(Array.isArray(object)) return Vec3(object[0],object[1],object[2]);
    const {x=0,y=0,z=0} = object??{};
    return {x:Number(x),y:Number(y),z:Number(z),__proto__:Vec3.prototype};
}
Vec3.sort = function sort(vec1, vec2){
    const [x1,x2] = vec1.x<vec2.x?[vec1.x,vec2.x]:[vec2.x,vec1.x];
    const [y1,y2] = vec1.y<vec2.y?[vec1.y,vec2.y]:[vec2.y,vec1.y];
    const [z1,z2] = vec1.z<vec2.z?[vec1.z,vec2.z]:[vec2.z,vec1.z];
    return [{x:x1,y:y1,z:z1,__proto__:Vec3.prototype},{x:x2,y:y2,z:z2,__proto__:Vec3.prototype}];
}
Vec3.up = {x:0,y:1,z:0, __proto__:Vec3.prototype};
Vec3.down = {x:0,y:1,z:0, __proto__:Vec3.prototype};
Vec3.right = {x:1,y:0,z:0, __proto__:Vec3.prototype};
Vec3.left = {x:-1,y:0,z:0, __proto__:Vec3.prototype};
Vec3.forward = {x:0,y:0,z:1, __proto__:Vec3.prototype};
Vec3.backward = {x:0,y:0,z:-1, __proto__:Vec3.prototype};
Vec3.zero = {x:0,y:0,z:0, __proto__:Vec3.prototype};
Vec3[server_namespaceObject.Direction.Down] = Vec3.down;
Vec3[server_namespaceObject.Direction.Up] = Vec3.Up;
Vec3[server_namespaceObject.Direction.East] = Vec3.right;
Vec3[server_namespaceObject.Direction.West] = Vec3.left;
Vec3[server_namespaceObject.Direction.South] = Vec3.backward;
Vec3[server_namespaceObject.Direction.North] = Vec3.forward;
Vec3.prototype = {
    distance(vec){return Vec3.distance(this,vec);},
    lerp(vec,t){return Vec3.lerp(this,vec,t);},
    projection(vec){return Vec3.projection(this,vec);},
    reflect(vec){return Vec3.reflect(this,vec);},
    rejection(vec){return Vec3.rejection(this,vec);},
    cross(vec){return Vec3.cross(this,vec);},
    dot(vec){return Vec3.dot(this,vec);},
    floor(){return Vec3.floor(this);},
    add(vec){return Vec3.add(this,vec);},
    subtract(vec){return Vec3.subtract(this,vec);},
    multiply(num){return Vec3.multiply(this,num);},
    get length(){return Vec3.magnitude(this);},
    get normalized(){return Vec3.normalize(this);},
    x: 0,
    y: 0,
    z: 0,
    [isVec3Symbol]:true,
    toString(){return `${this.x} ${this.y} ${this.z}`;}
}
;// CONCATENATED MODULE: ./src/core/utils/classes/CoordinateBase.js


class CoordinateBase
{
	static get default() {return defaultBase;}
	constructor(xVec, yVec, zVec){
		this._x_ = Vec3.from(xVec);
        this._y_ = Vec3.from(yVec);
        this._z_ = Vec3.from(zVec);
    }
    set x(vec){this._x_ = Vec3.from(vec);}
    set y(vec){this._y_ = Vec3.from(vec);}
    set z(vec){this._z_ = Vec3.from(vec);}
    get x(){return this._x_;}
    get y(){return this._y_;}
    get z(){return this._z_;}
    get inverted() {return CoordinateBase.invert(this);}
    get determinant() {return CoordinateBase.getDeterminant(this);}
    get isPerpendicular(){return CoordinateBase.isPerpendicular(this);}
    passLocalCoordinate(vec){return CoordinateBase.applyBaseOnVector(this,vec);}
    passLocalCoordinates(vecs){return CoordinateBase.applyBaseOnVectors(this,vecs)};
    static invert(base){
    	const {x: bx, y: by, z: bz} = base, iDet = 1/CoordinateBase.getDeterminant(base);
        return new CoordinateBase(
           {x:(by.y*bz.z-bz.y*by.z)*iDet, y:(bx.z*bz.y-bx.y*bz.z)*iDet, z:(bx.y*by.z-bx.z*by.y)*iDet}, 
           {x:(by.z*bz.x-by.x*bz.z)*iDet, y:(bx.x*bz.z-bx.z*bz.x)*iDet, z:(by.x*bx.z-bx.x*by.z)*iDet}, 
           {x:(by.x*bz.y-bz.x*by.y)*iDet, y:(bz.x*bx.y-bx.x*bz.y)*iDet, z:(bx.x*by.y-by.x*bx.y)*iDet} 
        );
    }
    static getDeterminant({x: bx, y: by, z: bz}){
    	return bx.x * (by.y * bz.z - bz.y * by.z) -
           bx.y * (by.x * bz.z - by.z * bz.x) +
           bx.z * (by.x * bz.y - by.y * bz.x);
    }
    static applyBaseOnVector({x:bx, y:by, z:bz}, vec){
    	return Vec3(
	       vec.x*bx.x+vec.y*by.x+vec.z*bz.x,
	       vec.x*bx.y+vec.y*by.y+vec.z*bz.y,
	       vec.x*bx.z+vec.y*by.z+vec.z*bz.z
        );
    }
    static *applyBaseOnVectors({x:bx, y:by, z:bz}, vecs){
        if(typeof vecs[Symbol.iterator] !== "function") throw new TypeError("vectors parameter is not iterable.");
        const iterator = vecs[Symbol.iterator]();
        let result = iterator.next();
        while (!result.done) {
            const {value:vec} = result;
            result = iterator.next(yield Vec3(
                vec.x*bx.x+vec.y*by.x+vec.z*bz.x,
                vec.x*bx.y+vec.y*by.y+vec.z*bz.y,
                vec.x*bx.z+vec.y*by.z+vec.z*bz.z
            ));
        }
        return result.value;
    }
    static isPerpendicular({x:xVec,y:yVec,z:zVec}){
        return (Vec3.dot(xVec,yVec) > 1e-5)&&(Vec3.dot(yVec,zVec) > 1e-5)&&(Vec3.dot(xVec,zVec) > 1e-5)
    }
    static fromZVec(zVec){
        zVec = Vec3.normalize(zVec);
        let xVec = Vec3(-zVec.z, 0, zVec.x).normalized;
        let yVec = Vec3.cross(zVec,xVec).normalized;
        return new CoordinateBase(xVec,yVec,zVec);
    }
}
CoordinateBase.prototype._x_ = Vec3(1,0,0);
CoordinateBase.prototype._y_ = Vec3(0,1,0);
CoordinateBase.prototype._z_ = Vec3(0,0,1);
const defaultBase = {inverted:CoordinateBase.prototype.inverted,__proto__:CoordinateBase.prototype};
;// CONCATENATED MODULE: ./src/core/utils/classes/Semaphores.ts
/**
 * An implementation of an asynchronous semaphore that implements the PromiseLike interface.
 */
class AsyncSemaphore {
    _promise_;
    _id_;
    _map_;
    constructor() {
        this._promise_ = Promise.resolve(0);
        this._id_ = 0;
        this._map_ = new Map();
    }
    /**
     * Releases the lock with the given id.
     * @param id - The id of the lock to release.
     * @returns- Returns true if the lock was released successfully.
     * @throws {ReferenceError} - Throws an error if the given id is invalid.
     */
    release(id) {
        if (!this._map_.has(id))
            throw new ReferenceError("Invalid promise id resolved!");
        const res = this._map_.get(id);
        this._map_.delete(id);
        res();
        return true;
    }
    /**
     * Acquires a lock and returns its id.
     * @async
     * @returns - Returns a promise that resolves with the id of the acquired lock.
     */
    async lock() {
        const promise = this._promise_;
        const id = this._id_++;
        this._promise_ = new Promise((res) => this._map_.set(id, res));
        await promise;
        return id;
    }
    /**
     * @async
     * @param method
     * @param params
     * @returns
     */
    async secureRun(method, ...params) {
        const id = await this.lock();
        try {
            await Function.run(method, typeof method === "function" ? null : method);
        }
        catch (error) {
            console.error(error, error?.stack ?? "");
        }
        this.release(id);
    }
    /**
     * Attaches a callback for when a lock is acquired. This allows the `AsyncSemaphore` instance to be used as a `PromiseLike` object.
     * @type - Returns a promise that resolves with the result of the callback.
     */
    get then() {
        const promise = this.lock();
        return Promise.prototype.then.bind(promise);
    }
}

;// CONCATENATED MODULE: ./src/core/utils/classes/Shapes.js




const GeometryGenerator = {
    *circle(r, rMin = 0, y = 0){
        let rr = r**2, rrMin = rMin**2;
        for (let x = -r, xx = x**2; x < r; x++, xx = x**2)
            if (xx < rr && xx >= rrMin) for (let z = -r, zz = xx + z**2; z < r; z++, zz = xx + z**2) 
                if(zz < rr && zz >= rrMin) yield {x,y,z,__proto__:Vec3.prototype};
    },
    *cylinder(r, height, rMin = 0){
        for(let y = 0; y < height; y++)
            yield* GeometryGenerator.circle(r,rMin,y);
    },
    *cubeFromTo(from, to){
        const [
            {x:xFrom,y:yFrom,z:zFrom},
            {x:xTo,y:yTo,z:zTo},
        ] = Vec3.sort(from,to);
        for (let y = yFrom; y < yTo; y++) 
            for (let x = xFrom; x < xTo; x++)
                for (let z = zFrom; z < zTo; z++) yield {x,y,z,__proto__:Vec3.prototype};
    },
    *cubeFromSize({x:xSize,y:ySize,z:zSize}){
        for (let y = 0; y < ySize; y++) 
            for (let x = 0; x < xSize; x++)
                for (let z = 0; z < zSize; z++) yield {x,y,z,__proto__:Vec3.prototype};
    },
    *sphere(r, rIn = 0){
        const rP = r**2, rMinP = rIn**2;
        for (let x = -r, XX = x**2; x < r; x++, XX = x**2) {
            if (XX < rP && XX >= rMinP) for (let y = -r, YY = XX + y**2; y < r; y++, YY = XX + y**2)
                if (YY < rP && YY >= rMinP) for (let z = -r, ZZ = YY + z**2; z < r; z++, ZZ = YY + z**2)
                    if (ZZ < rP && ZZ >= rMinP) yield {x,y,z,__proto__:Vec3.prototype};
        }
    },
    *pathFromTo(from, to){
        const {x:x1,y:y1,z:z1} = Vec3.subtract(to,from);
        const maxs = {x:Math.abs(x1), y:Math.abs(y1), z:Math.abs(z1)};
        const key = maxs.x > maxs.z ? (maxs.x > maxs.y?"x":"y") : (maxs.z > maxs.y?"z":"y"), n = maxs[key];
        const xd = x1/n, yd = y1/n, zd = z1/n;
        let xc = xd, yc = yd, zc  = zd;
        for (let i = 0; i < n; i++){
            yield Vec3.add(from,{x:xc, y:yc, z:zc});
            xc+=xd, yc+= yd, zc += zd;
        }
        yield Vec3.add(from,{x:x1,y:y1,z:z1});
    },
    *pathFromDirection(size){
        const {x:x1,y:y1,z:z1} = size;
        const maxs = {x:Math.abs(x1), y:Math.abs(y1), z:Math.abs(z1)};
        const key = maxs.x > maxs.z ? (maxs.x > maxs.y?"x":"y") : (maxs.z > maxs.y?"z":"y"), n = maxs[key];
        const xd = x1/n, yd = y1/n, zd = z1/n;
        let xc = xd, yc = yd, zc  = zd;
        for (let i = 0; i < n; i++){
            yield {x:xc, y:yc, z:zc, __proto__:Vec3.prototype};
            xc+=xd, yc+= yd, zc += zd;
        }
        yield {x:x1,y:y1,z:z1, __proto__: Vec3.prototype};
    },
    *fluidFill(deeps,vectors){
        const vecs = vectors??[Vec3.down,Vec3.left,Vec3.right,Vec3.backward,Vec3.forward], array = [{loc:Vec3.zero,dp:0}], registry = {};
        while (array.length > 0) {
            const {loc, dp} = array.shift(), key = `${loc.x}.${loc.y}.${loc.z}`;
            if(dp < deeps && !registry[key]){
                registry[key] = true;
                let yi = yield Vec3.from(loc);
                if(!yi) continue;
                for (const vec of vecs) array.push({loc:vec.add(loc),dp:dp+1});
            }
        }
    }
}
const Shapes = {};
const ShapeGeneratorPrototype = {
    get nextValue(){return this.next();},
    get inverted(){return ShapeGeneratorPrototypeFunctions.invert.call(this);},
    get normalized(){return ShapeGeneratorPrototypeFunctions.normalize.call(this);},
    __proto__: GeneratorFunction.prototype
};
const ShapeGeneratorPrototypeFunctions = {
    *cross(vec){
        let values = this.next();
        while (!values.done) values = this.next(yield Vec3.cross(values.value,vec));
        return values.value;
    },
    *projection(vec){
        let values = this.next();
        while (!values.done) values = this.next(yield Vec3.projection(values.value,vec));
        return values.value;
    },
    *rejection(vec){
        let values = this.next();
        while (!values.done) values = this.next(yield Vec3.rejection(values.value,vec));
        return values.value;
    },
    *reflect(vec){
        let values = this.next();
        while (!values.done) values = this.next(yield Vec3.reflect(values.value,vec));
        return values.value;
    },
    *normalize(){
        let values = this.next();
        while (!values.done) values = this.next(yield Vec3.magnitude(values.value));
        return values.value;
    },
    *multiply(num){
        let values = this.next();
        while (!values.done) values = this.next(yield Vec3.multiply(values.value,num));
        return values.value;
    },
    *add({x:x1,y:y1,z:z1}){
        let values = this.next();
        while (!values.done){
            const {x,y,z} = values.value;
            values = this.next(yield {x:x + x1,y:y+y1,z:z + z1,__proto__:Vec3.prototype});
        }
        return values.value;
    },
    *invert(){
        let values = this.next();
        while (!values.done){
            const {x,y,z} = values.value;
            values = this.next(yield {x:-x,y:-y,z:-z,__proto__:Vec3.prototype});
        }
        return values.value;
    },
    /**@param {CoordinateBase} base */
    *applyBase(base){return yield * CoordinateBase.applyBaseOnVectors(base,this);},
    offset(vec){return ShapeGeneratorPrototypeFunctions.add.call(this,vec);}
}
for (const key of Object.getOwnPropertyNames(ShapeGeneratorPrototypeFunctions)) {
    const Func = ShapeGeneratorPrototypeFunctions[key];
    Func.prototype = ShapeGeneratorPrototype;
    ShapeGeneratorPrototype[key] = Func;
}
for (const key of Object.getOwnPropertyNames(GeometryGenerator)) {
    const value = GeometryGenerator[key];
    value.prototype = ShapeGeneratorPrototype;
    Shapes[key] = key;
}
;// CONCATENATED MODULE: ./src/core/utils/classes/DisposableHandle.js
/**
 * Represents a disposable handle.
 */
class DisposableHandle{
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
;// CONCATENATED MODULE: ./src/core/utils/classes/TextStream.ts
const _offset = Symbol('offset');
const _buffer = Symbol('buffer');
/**
 * Represents a text stream.
 */
class TextStream {
    //private
    [_buffer] = "";
    //private
    [_offset] = 0;
    /**
     * Creates a new TextStream instance.
     * @param string - The string to use as the stream's buffer.
     */
    constructor(string) {
        this[_buffer] = string;
    }
    /**
     * Gets the stream's buffer.
     */
    get buffer() {
        return this[_buffer];
    }
    /**
     * Gets the stream's current offset.
     */
    get offset() {
        return this[_offset];
    }
    /**
     * Gets the size of the stream's buffer.
     */
    get size() {
        return this.buffer.length;
    }
    /**
     * Determines if the end of the stream has been reached.
     */
    get isEndOfStream() {
        return this.offset >= this.buffer.length;
    }
    /**
     * Resets the stream's offset to 0.
     */
    reset() { this[_offset] = 0; }
    /**
     * Skips a specified number of characters in the stream.
     */
    skip(length = 1) {
        if (length < 1)
            throw new RangeError('Error: Length must be greater than or equal to 1');
        if (length > this.size - this.offset) {
            throw new RangeError('Error: Attempting to skip beyond end of stream');
        }
        this[_offset] += length;
    }
    /**
     * Moves the stream's current offset backward by a specified number of characters.
     * @param length - The number of characters to move backward.
     * @throws {RangeError} If length is less than 1.
     */
    rewind(length = 1) {
        if (length < 1)
            throw new RangeError('Error: Length must be greater than or equal to 1');
        if (length > this.offset)
            this.reset();
        else
            this[_offset] -= length;
    }
    toString() { return this.buffer; }
}
/**
 * Represents a text writer that writes to a text stream.
 */
class TextWriter extends TextStream {
    /**
     * Writes a string to the stream at the specified position and advances the current position by the length of the string.
     * @param string - The string to write to the stream.
     * @param offset - The position in the stream to write at. Defaults to the current offset of the stream.
     */
    write(string, offset = this.offset) {
        if (offset > this.buffer.length) {
            throw new Error('Offset cannot be greater than stream size');
        }
        const before = this.buffer.slice(0, offset);
        const after = this.buffer.slice(offset + string.length);
        this[_buffer] = before + string + after;
        this[_offset] += string.length;
    }
    /**
     * Inserts a string into the stream at the specified position and advances the current position by the length of the string.
     * @param string - The string to insert into the stream.
     * @param offset - The position in the stream to insert at. Defaults to the current offset of the stream.
     */
    insert(string, offset = this.offset) {
        if (offset > this.size) {
            throw new Error('Offset cannot be greater than stream size');
        }
        const before = this.buffer.slice(0, offset);
        const after = this.buffer.slice(offset);
        this[_buffer] = before + string + after;
        this[_offset] += string.length;
    }
    /**
     * Deletes a specified number of characters from the stream at the current position and advances the current position by that number of characters.
     * @param length - The number of characters to delete from the stream.
     * @param offset - The position in the stream to delete at. Defaults to the current offset of the stream.
     */
    delete(length = 1, offset = this.offset) {
        if (length < 1)
            throw new RangeError('Error: Length must be greater than or equal to 1');
        if (offset < 0 || offset >= this.size)
            throw new RangeError('Error: offset must be in range between 0 and size of the stream');
        if (length > this.size - offset) {
            throw new RangeError('Error: Attempting to delete beyond end of stream');
        }
        const before = this.buffer.slice(0, offset);
        const after = this.buffer.slice(offset + length);
        this[_buffer] = before + after;
        this[_offset] += length;
    }
}
/**
 * Represents a text reader that reads from a text stream.
 */
class TextReader extends TextStream {
    /**
     * Peeks at a specific position in the stream without advancing the current position.
     * @param length - The number of characters to peek at.
     * @param offset - The position in the stream to peek at. Defaults to the current offset of the stream.
     * @returns The characters at the specified position in the stream.
     */
    peek(length = 1, offset = this.offset) {
        if (length < 1)
            throw new RangeError('Error: Length must be greater than or equal to 1');
        if (offset < 0)
            throw new RangeError('Error: offset must be greater than or equal to 0');
        if (offset > this.size) {
            throw new RangeError('Error: Attempting to peek beyond end of stream');
        }
        return this.buffer.substring(offset, length);
    }
    /**
     * Reads a specified number of characters from the stream and advances the current position by that number of characters.
     * @param length - The number of characters to read.
     * @param offset- The position in the stream to read from. Defaults to the current offset of the stream.
     * @returns The characters read from the stream.
     */
    read(length = 1, offset = this.offset) {
        if (length < 1)
            throw new RangeError('Error: Length must be greater than or equal to 1');
        if (offset < 0)
            throw new RangeError('Error: offset must be greater than or equal to 0');
        if (this.isEndOfStream) {
            throw new RangeError('Error: Attempting to read beyond end of stream');
        }
        this[_offset] = offset + length;
        return this.buffer.substring(offset, offset + length);
    }
    /**
     * Returns an object representing the next character in the stream, or indicating that the end of the stream has been reached. This method is implemented from the Iterator interface.
     * @returns An object with a `done` property indicating whether the end of the stream has been reached and a `value` property containing the next character in the stream if available.
     */
    next(...args) {
        if (this.isEndOfStream)
            return { done: true, value: undefined };
        else
            return { done: false, value: this.buffer[this[_offset]++] };
    }
    /**
     * Returns an iterator for the characters in the stream.
     * @returns An iterator for the characters in the stream.
     */
    [Symbol.iterator]() { return this; }
}

;// CONCATENATED MODULE: ./src/core/utils/functions/functions.ts
function OverTakes(prototype, object) {
    const prototypeOrigin = Object.setPrototypeOf(Object.defineProperties({}, Object.getOwnPropertyDescriptors(prototype)), Object.getPrototypeOf(prototype));
    Object.setPrototypeOf(object, prototypeOrigin);
    Object.defineProperties(prototype, Object.getOwnPropertyDescriptors(object));
    return prototypeOrigin;
}
function ReExtenend(class1, newParent) {
    Object.setPrototypeOf(class1, newParent);
    Object.setPrototypeOf(class1.prototype, newParent.prototype);
    //@ts-ignore
    return T;
}
/**
 * Generates a UUID (Universally Unique Identifier).
 * @returns The generated UUID.
 */
function GenerateUUID(timestamp = Date.now()) {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (timestamp + Math.random() * 16) % 16 | 0;
        timestamp = Math.floor(timestamp / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
function GenerateRandomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
function BuildClass(object, name, extendsThis) {
    const newClass = extendsThis == undefined ?
        (function () { return this; }) :
        (function () {
            return Reflect.construct(extendsThis, ...arguments, new.target ?? newClass);
        });
    newClass.prototype = Object.setPrototypeOf(object, extendsThis?.prototype ?? Object.prototype);
    Object.defineProperty(newClass, "name", { value: name, configurable: true });
    //@ts-ignore
    return newClass;
}
function FixedNumber(number, length, radix = 16) {
    const toStr = number.toString(radix);
    if (toStr.length < length)
        return "0".repeat(length - toStr.length) + toStr;
    else
        return toStr;
}

;// CONCATENATED MODULE: ./src/core/utils/classes/Events.ts

/**
 * Represents an event signal.
 * @template - The types of the arguments passed to the event handlers.
 */
class CustomEvent {
    _methods_ = {};
    _session_ = Symbol('session');
    /**
     * Triggers the event signal.
     * @param params - The arguments to pass to the event handlers.
     * @returns A promise that resolves with the number of successful event handlers.
     */
    async trigger(...params) {
        await Promise.all(Object.getOwnPropertySymbols(this._methods_).map(sym => {
            return (async () => { return await Function.run(this._methods_[sym], null, ...params); })();
        }));
    }
    /**
     * Subscribes to the event signal.
     * @template  k - The type of the event handler function.
     * @param method - The event handler function to subscribe.
     * @returns The subscribed event handler function.
     */
    subscribe(method) {
        //@ts-ignore
        const t = typeof method;
        if (t !== "function" && t !== "object")
            throw new TypeError(`Expected a function or an object, but got ${t}.`);
        if (!Function.isRunnable(method))
            throw new TypeError(`The object must be the runnable. Make sure the method has a property with the key Symbol.runnable.`);
        if (!Object.prototype.hasOwnProperty.call(method, this._session_)) {
            const key = Symbol('key');
            method[this._session_] = key;
            this._methods_[key] = method;
            return method;
        }
        ;
    }
    /**
     * Unsubscribes from the event signal.
     * @template k - The type of the event handler function.
     * @param method - The event handler function to unsubscribe.
     * @returns The unsubscribed event handler function.
     */
    unsubscribe(method) {
        const t = typeof method;
        if (t !== "function" && t !== "object")
            throw new TypeError(`Expected a function or an object, but got ${t}.`);
        if (!Function.isRunnable(method))
            throw new TypeError(`The method must implement the runnable interface. Make sure the method has a property with the key Symbol.runnable.`);
        if (Object.prototype.hasOwnProperty.call(method, this._session_)) {
            delete this._methods_[method[this._session_]];
            delete method[this._session_];
            return method;
        }
        ;
    }
}
const MinecraftOverloadEvent = (object, name, parent) => {
    const classa = BuildClass(object, name, parent);
    Object.setPrototypeOf(object, parent.prototype);
    return classa;
};

;// CONCATENATED MODULE: ./src/core/utils/classes/Database.js


///////////////////////////////////////////////////
// DATABASE.JS
///////////////////////////////////////////////////
const {scoreboard} = server_namespaceObject.world, {FakePlayer} = server_namespaceObject.ScoreboardIdentityType;
const split = "\n_`Split`_\n";
function endTickCall(callback){
    server_namespaceObject.system.run(()=>server_namespaceObject.system.run(()=>server_namespaceObject.system.run(callback)));
}
const DatabaseSavingModes = {
    OneTimeSave:"OneTimeSave",
    EndTickSave:"EndTickSave",
    TickInterval:"TickInterval"
}
const ChangeAction = {
    Change:0,
    Remove:1
}
function run(thisClass,key,value,action){
    if(thisClass._source_.has(key)) thisClass._scoreboard_.removeParticipant(thisClass._source_.get(key));
    if(action === ChangeAction.Remove) thisClass._source_.delete(key);
    else{
        thisClass._source_.set(key,value);
        thisClass._scoreboard_.setScore(value,0);
    }
}
const SavingModes = {
    [DatabaseSavingModes.OneTimeSave](thisClass,key,value,action){
        run(thisClass,key,value,action);
    },
    /**@param {ScoreboardDatabaseManager} thisClass */
    [DatabaseSavingModes.EndTickSave](thisClass,key,value,action){
        if(!thisClass.hasChanges){
            endTickCall(()=>{
                for (const [k,{action,value}] of thisClass._changes_.entries()) {        
                    run(thisClass,k,value,action);
                }
                thisClass._changes_.clear();
                thisClass.hasChanges = false;
            });
        }
        thisClass.hasChanges = true;
        thisClass._changes_.set(key,{action,value});
    },
    /**@param {ScoreboardDatabaseManager} thisClass */
    [DatabaseSavingModes.TickInterval](thisClass,key,value,action){
        thisClass.hasChanges = true;
        thisClass._changes_.set(key,{action,value});
    }
}
/**@extends {Map<string,any>}*/
class ScoreboardDatabaseManager extends Map{
    /**@private */
    _loaded_ = false;
    /**@private */
    _saveMode_;
    /**@private */
    hasChanges = false;
    /**@readonly */
    get maxLength(){return 30e3;}
    /**@private @type {ScoreboardObjective}*/
    _scoreboard_;
    /**@protected @type {Map<string,string|ScoreboardIdentity|Entity>} */
    _source_;
    _onHandleLost_;
    /**@protected @readonly @type {{stringify:(data: any)=>string,parse:(data: string): any}} */
    get _parser_(){return JSON;}
    get savingMode(){return this._saveMode_;}
    /**@protected */
    constructor(objective, saveMode = DatabaseSavingModes.EndTickSave, interval=5){
        super();
        this._saveMode_ = saveMode;
        this._nameId_ = objective;
        this.interval = interval??5;
        if(!objective) throw new RangeError("Firt parameter si not valid: " + objective);
        if(typeof objective !== "string" && !objective instanceof server_namespaceObject.ScoreboardObjective) throw new RangeError("Firt parameter si not valid: " + objective);
        this._scoreboard_ = typeof objective === "string"?(scoreboard.getObjective(objective)??scoreboard.addObjective(objective,objective)):objective;
        this._nameId_ = this.id;
        this._source_ = new Map();
        this._changes_ = new Map();
        if(this._saveMode_ === DatabaseSavingModes.TickInterval){
            server_namespaceObject.system.runInterval(()=>{
                if(this.hasChanges){
                    endTickCall(()=>{
                        for (const [k,{action,value}] of this._changes_.entries()) run(this,k,value,action);
                        this._changes_.clear();
                        this.hasChanges = false;
                    })
                }
            },this.interval);
        }
    }
    load(){
        if(this._loaded_) return this;
        for (const participant of this._scoreboard_.getParticipants()) {
            const {displayName,type} = participant;
            if(type !== FakePlayer) continue;
            const [name,data] = displayName.split(split);
            this._source_.set(name,participant);
            super.set(name,this._parser_.parse(data));
        }
        this._loaded_=true;
        return this;
    }
    async loadAsync(){
        if(this._loaded_) return this;
        for (const participant of this._scoreboard_.getParticipants()) {
            const {displayName,type} = participant;
            if(type !== FakePlayer) continue;
            const [name,data] = displayName.split(split);
            this._source_.set(name,participant);
            super.set(name,this._parser_.parse(data));
        }
        this._loaded_=true;
        return this;
    }
    /**@inheritdoc */
    set(key, value){
        if(!this._loaded_) throw new ReferenceError("Database is not loaded");
        const newValue = `${key}${split}${this._parser_.stringify(value)}`;
        if(newValue.length > this.maxLength) throw new RangeError("Value is too large for one property");
        super.set(key,value);
        this._onChange_(key,newValue,ChangeAction.Change);
        return this;
    }
    /**@inheritdoc */
    delete(key){
        if(!this._loaded_) throw new ReferenceError("Database is not loaded");
        this._onChange_(key,null,ChangeAction.Remove);
        return super.delete(key);
    }
    clear(){
        if(!this._loaded_) throw new ReferenceError("Database is not loaded");
         for (const [key,value] of this.entries()) this.delete(key,value);
    }
    /**@private */
    _onChange_(key, value, action){
        if(!this._loaded_) throw new ReferenceError("Database is not loaded");
        SavingModes[this._saveMode_](this,key,value,action);
    }
    /**@readonly @returns {ScoreboardObjective} */
    get objective(){return this._scoreboard_;}
    /**@readonly @returns {string} */
    get id(){return this._scoreboard_.id;}
    /**@readonly @returns {boolean} */
    get loaded(){return this._loaded_;}
    rebuild(){
        if(this.objective?.isValid()) return;
        const newScores = scoreboard.addObjective(this._nameId_,this._nameId_);
        this._scoreboard_ = newScores;
        this._source_ = new Map();
        for (const [k,v] of this.entries()) {
            const data = `${k}${split}${this._parser_.stringify(v)}`;
            newScores.setScore(data,0);
            this._source_.set(k,data);
        }
        return this;
    }
    async rebuildAsyc(){
        if(this.objective?.isValid()) return;
        const newScores = scoreboard.addObjective(this._nameId_,this._nameId_);
        this._scoreboard_ = newScores;
        this._source_ = new Map();
        for (const [k,v] of this.entries()) {
            const data = `${k}${split}${this._parser_.stringify(v)}`;
            newScores.setScore(data,0);
            this._source_.set(k,data);
            await null;
        }
        return this;
    }
}
class JsonDatabase extends ScoreboardDatabaseManager{}
class NBTDatabase extends ScoreboardDatabaseManager{
    get _parser_() {return NBT;};
}
class CustomDatabase extends ScoreboardDatabaseManager{
    constructor(parser,...params){
        super(params);
        this._parser_ = parser;
    }
}
;// CONCATENATED MODULE: ./src/core/utils/classes/index.ts









;// CONCATENATED MODULE: ./src/core/utils/functions/index.ts


;// CONCATENATED MODULE: ./src/core/utils/index.ts



;// CONCATENATED MODULE: ./src/core/index.ts



;// CONCATENATED MODULE: ./src/extensions/ui/response.ts


OverTakes(server_ui_namespaceObject.FormResponse.prototype, {
    get output() {
        if (this instanceof server_ui_namespaceObject.ModalFormResponse)
            return this.formValues;
        return this.selection;
    }
});
const sus = {};

;// CONCATENATED MODULE: ./src/extensions/ui/index.ts


const output = server_ui_namespaceObject.FormResponse;

;// CONCATENATED MODULE: ./src/extensions/server/System.ts


const overworld = server_namespaceObject.world.getDimension("overworld");
;
OverTakes(server_namespaceObject.System.prototype, {
    get onlinePlayers() { return server_namespaceObject.world.getPlayers(); },
    get nextTick() { return new Promise(res => super.runTimeout(() => res((this.currentTick ?? 0) + 1), 0)); },
    runCommand(cmd, target) { return (target ?? overworld).runCommand(cmd); },
    runCommandAsync(cmd, target) { return (target ?? overworld).runCommandAsync(cmd); },
    runTimeout(callBack, timeout = 1, ...params) { return super.runTimeout(() => Function.run(callBack, callBack, ...params), timeout); },
    runInterval(callBack, timeout = 1, ...params) { return super.runInterval(() => Function.run(callBack, callBack, ...params), timeout); },
    run(callBack, ...params) { return super.run(() => Function.run(callBack, callBack, ...params)); },
    delay(ticks = 0) {
        return new Promise(res => {
            server_namespaceObject.system.runTimeout(() => {
                res(server_namespaceObject.system.currentTick + 1);
            }, ticks < 1 ? 0 : ticks - 1);
        });
    }
});

;// CONCATENATED MODULE: ./src/extensions/server/World.ts


const _overworld_ = server_namespaceObject.world.getDimension("overworld");
const _nether_ = server_namespaceObject.world.getDimension("nether");
const _theEnd_ = server_namespaceObject.world.getDimension("the_end");
;
OverTakes(server_namespaceObject.World.prototype, {
    get overworld() { return _overworld_; },
    get nether() { return _nether_; },
    get theEnd() { return _theEnd_; },
    get coordinateBase() { return CoordinateBase.default; },
    sendMessage(object) { return super.sendMessage("" + object); }
});

;// CONCATENATED MODULE: ./src/extensions/server/Player.ts


const PlayerSymbol = Symbol("Player");
OverTakes(server_namespaceObject.Player.prototype, {
    toString() { return `[${super.name}: ${super.id}]`; },
    sendMessage(object) { return super.sendMessage("" + object); },
    get onScreenDisplay() { const display = super.onScreenDisplay; display[PlayerSymbol] = this; return display; }
});
OverTakes(server_namespaceObject.ScreenDisplay.prototype, {
    get player() { return this[PlayerSymbol]; },
    sendMessage(object) { return this.player.sendMessage(object); }
});

;// CONCATENATED MODULE: ./src/extensions/New/BlockRaycastHit.js


class BlockRaycastHit{
    get x(){return this.block.x + this.faceLocation.x;}
    get y(){return this.block.y + this.faceLocation.y;}
    get z(){return this.block.z + this.faceLocation.z;}
    get faceVector(){return Vec3[this.face];}
}
;// CONCATENATED MODULE: ./src/extensions/New/index.ts


;// CONCATENATED MODULE: ./src/extensions/server/Entity.ts



Object.setPrototypeOf(server_namespaceObject.Entity.prototype, Vec3.prototype);
OverTakes(server_namespaceObject.Entity.prototype, {
    toString() { return `[${super.typeId}: ${super.id}]`; },
    getBlockFromViewDirection(options) {
        const data = super.getBlockFromViewDirection(...[options]);
        if (data)
            return Object.setPrototypeOf(data, BlockRaycastHit.prototype);
    },
    get viewBase() {
        const self = this;
        let zVec = self.getViewDirection();
        let xVec = Vec3(-zVec.z, 0, zVec.x).normalized;
        let yVec = Vec3.cross(xVec, zVec).normalized;
        return new CoordinateBase(xVec, yVec, zVec);
    },
    get viewDirection() { return Vec3.from(super.getViewDirection()); },
    get viewBlock() { return super.getBlockFromViewDirection({ maxDistance: 8.75 })?.block; },
    get viewEntities() { return super.getEntitiesFromViewDirection({ maxDistance: 8.75 }).map((hit) => hit.entity); },
    get viewEntity() { return super.getEntitiesFromViewDirection({ maxDistance: 8.75 })[0]?.entity; },
    get blockRayCastLocation() { const data = super.getBlockFromViewDirection({ maxDistance: 8 }); if (data)
        return Vec3.add(data.block, data.faceLocation); },
    get x() { return super.location.x; },
    get y() { return super.location.y; },
    get z() { return super.location.z; },
    get entityLocation() { return Vec3.from(super.location); },
    get location() { return Vec3.from(super.location); },
    get headLocation() { return Vec3.from(super.getHeadLocation()); },
    get velocity() { return Vec3.from(super.getVelocity()); },
    get rotation() { return super.getRotation(); },
    getHeadLocation() { return Vec3.from(super.getHeadLocation()); },
    getViewDirection() { return Vec3.from(super.getViewDirection()); },
    getVelocity() { return Vec3.from(super.getVelocity()); },
    setVelocity(velocity) {
        super.clearVelocity();
        super.applyImpulse(velocity);
        return this;
    },
    get isBurning() { return super.hasComponent(server_namespaceObject.EntityOnFireComponent.componentId); },
    get inventory() { return super.getComponent(server_namespaceObject.EntityInventoryComponent.componentId); },
    get container() { return super.getComponent(server_namespaceObject.EntityInventoryComponent.componentId).container; },
    get equipment() { return super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId); },
    get mainhandItem() { return super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).getEquipment(server_namespaceObject.EquipmentSlot.mainhand); },
    set mainhandItem(item) {
        if (item instanceof server_namespaceObject.ContainerSlot)
            super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).setEquipment(server_namespaceObject.EquipmentSlot.mainhand, item.getItem());
        else if (item instanceof server_namespaceObject.ItemStack)
            super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).setEquipment(server_namespaceObject.EquipmentSlot.mainhand, item);
    },
    get mainhandSlot() { return super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).getEquipmentSlot(server_namespaceObject.EquipmentSlot.mainhand); },
    get offhandItem() { return super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).getEquipment(server_namespaceObject.EquipmentSlot.offhand); },
    set offhandItem(item) {
        if (item instanceof server_namespaceObject.ContainerSlot)
            super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).setEquipment(server_namespaceObject.EquipmentSlot.offhand, item.getItem());
        else if (item instanceof server_namespaceObject.ItemStack)
            super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).setEquipment(server_namespaceObject.EquipmentSlot.offhand, item);
    },
    get offhandSlot() { return super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).getEquipmentSlot(server_namespaceObject.EquipmentSlot.offhand); },
    get health() { return super.getComponent(server_namespaceObject.EntityHealthComponent.componentId).currentValue; },
    set health(num) {
        const h = super.getComponent(server_namespaceObject.EntityHealthComponent.componentId);
        if (num < 0)
            h.resetToMaxValue();
        else
            h.setCurrentValue(num);
    }
});

;// CONCATENATED MODULE: ./src/extensions/server/Dimension.ts



OverTakes(server_namespaceObject.Dimension.prototype, {
    toString() { return `[${this.constructor.name}: bob: ${this.id}]`; },
    setBlock(location, data) {
        const block = super.getBlock(location);
        if (data instanceof server_namespaceObject.BlockPermutation)
            return block.setPermutation(data);
        if (data instanceof server_namespaceObject.BlockType)
            return block.setType(data);
        if (typeof data === "string")
            return block.setPermutation(server_namespaceObject.BlockPermutation.resolve(data));
        throw new TypeError("Second parameter is not valid type: " + data);
    },
    getBlockFromRay(location, direction, options) {
        const data = super.getBlockFromRay(...[location, direction, options]);
        if (data)
            return Object.setPrototypeOf(data, BlockRaycastHit.prototype);
    },
});

;// CONCATENATED MODULE: ./src/extensions/server/ItemContainers.ts


OverTakes(server_namespaceObject.ItemStack.prototype, {
    toString() { return `[${this.constructor.name}: ${super.typeId}]`; },
    get enchantments() { return super.getComponent(server_namespaceObject.ItemEnchantsComponent.componentId).enchantments; },
    set enchantments(enchantments) { super.getComponent(server_namespaceObject.ItemEnchantsComponent.componentId).enchantments = enchantments; },
    get damage() { return super.getComponent(server_namespaceObject.ItemDurabilityComponent.componentId).damage; },
    set damage(damage) { super.getComponent(server_namespaceObject.ItemDurabilityComponent.componentId).damage = damage; },
    get maxDurability() { return super.getComponent(server_namespaceObject.ItemDurabilityComponent.componentId).maxDurability; },
    getComponent(componentId) { return Object.defineProperty(super.getComponent(componentId), "item", { value: this }); },
});
OverTakes(server_namespaceObject.ContainerSlot.prototype, {
    toString() { return `[${this.constructor.name}: ${super.typeId}]`; },
    get enchantments() { return super.getItem()?.getComponent(server_namespaceObject.ItemEnchantsComponent.componentId).enchantments; },
    set enchantments(enchantments) {
        const item = super.getItem();
        if (!item)
            return;
        item.enchantments = enchantments;
        super.setItem(item);
    },
    get damage() { return super.getItem()?.getComponent(server_namespaceObject.ItemDurabilityComponent.componentId).damage; },
    set damage(damage) {
        const item = super.getItem();
        if (!item)
            return;
        item.damage = damage;
        super.setItem(item);
    },
    get maxDurability() { return super.getItem()?.getComponent(server_namespaceObject.ItemDurabilityComponent.componentId).maxDurability; },
});

;// CONCATENATED MODULE: ./src/extensions/server/Events.js



const {world,system} = server_namespaceObject;

OverTakesEvents(world.afterEvents, server_namespaceObject.WorldAfterEvents.prototype);
OverTakesEvents(world.beforeEvents, server_namespaceObject.WorldBeforeEvents.prototype);
OverTakesEvents(system.afterEvents, server_namespaceObject.SystemAfterEvents.prototype);
OverTakesEvents(system.beforeEvents, server_namespaceObject.SystemBeforeEvents.prototype);

function OverTakesEvents(instance,prototype){
    for (const eventName of Object.getOwnPropertyNames(prototype)) {
        if(eventName === "constructor") continue;
        const event = instance[eventName];
        OverTakes(Object.getPrototypeOf(event), {
            subscribe(runnable,...options){
                if(!Function.isRunnable(runnable)) throw new TypeError("callback is not runnable");
                const caller = (...data)=>{
                    const {get,set} = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(data[0]??{}),"cancel")??{};
                    if(get && set) Object.defineProperty(event,"cancel",{get:()=>get.call(data[0]),set:(v)=>set.call(data[0],v),configurable: true});
                    try {
                        Promise.resolve(Function.run(runnable,null,...data)).catch(er=>console.error(er,er.stack));
                    } catch (er) {console.error(er,er.stack);}
                    delete event.cancel;
                }
                runnable[this.__symbol__]=caller;
                super.subscribe(caller,...options);
                return runnable;
            },
            unsubscribe(runnable){
                if(!Function.isRunnable(runnable)) throw new TypeError("callback is not runnable");
                if(runnable[this.__symbol__]) super.unsubscribe(runnable[this.__symbol__]);
                return runnable;
            },
            get then(){
                const syncPromise = new SyncPromise(res=>{
                    const data = this.subscribe((ev)=>{
                        this.unsubscribe(data);
                        res(ev);
                    });
                });
                return syncPromise.then.bind(syncPromise);
            },
            get cancel(){return undefined},
            set cancel(v){throw new ReferenceError("You are not in 'before event' environment.");},
            __symbol__:Symbol("method"),
            [Symbol.thenable]: true,
            get [YieldableSymbol](){
                return {
                    type: YieldableTypes.AsyncCallback,
                    data:(res)=>{
                        const data = this.subscribe((ev)=>{
                            this.unsubscribe(data);
                            res(ev);
                        });
                    }
                }
            }
        });
    }
}
class PlayerDieAfterEventSignal extends server_namespaceObject.EntityDieAfterEventSignal {
    subscribe(callback){ return server_namespaceObject.world.afterEvents.entityDie.subscribe(callback,{entityTypes:["minecraft:player"]});}
}
class PlayerHurtAfterEventSignal extends server_namespaceObject.EntityHurtAfterEventSignal {
    subscribe(callback){ return server_namespaceObject.world.afterEvents.entityHurt.subscribe(callback,{entityTypes:["minecraft:player"]});}
}
class PlayerHealthChangedAfterEventSignal extends server_namespaceObject.EntityHealthChangedAfterEventSignal {
    subscribe(callback){ return server_namespaceObject.world.afterEvents.entityHealthChanged.subscribe(callback,{entityTypes:["minecraft:player"]});}
}
class PlayerHitEntityAfterEventSignal extends server_namespaceObject.EntityHitEntityAfterEventSignal {
    subscribe(callback){ return server_namespaceObject.world.afterEvents.entityHitEntity.subscribe(callback,{entityTypes:["minecraft:player"]});}
}
class PlayerHitBlockAfterEventSignal extends server_namespaceObject.EntityHitBlockAfterEventSignal {
    subscribe(callback){ return server_namespaceObject.world.afterEvents.entityHitBlock.subscribe(callback,{entityTypes:["minecraft:player"]});}
}
Object.assign(server_namespaceObject.WorldAfterEvents.prototype,{
    playerDie: new PlayerDieAfterEventSignal,
    playerHurt: new PlayerHurtAfterEventSignal,
    playerHealthChanged: new PlayerHealthChangedAfterEventSignal,
    playerHitEntity: new PlayerHitEntityAfterEventSignal,
    playerHitBlock: new PlayerHitBlockAfterEventSignal,
});
;// CONCATENATED MODULE: ./src/extensions/server/index.ts








;// CONCATENATED MODULE: ./src/extensions/index.ts




;// CONCATENATED MODULE: ./src/index.globals.js





OverTakes(globalThis,{
    GeneratorFunction: GeneratorFunction,
    GeneratorFunctionConstructor: GeneratorFunctionConstructor,
    AsyncGeneratorFunction: AsyncGeneratorFunction,
    AsyncGeneratorFunctionConstructor: AsyncGeneratorFunctionConstructor,
    AsyncFunctionConstructor: AsyncFunctionConstructor,
    world: server_namespaceObject.world,
    system: server_namespaceObject.system,
    scoreboard: server_namespaceObject.world.scoreboard,
    get currentTick(){return server_namespaceObject.system.currentTick;},
    get nextTick(){return server_namespaceObject.system.nextTick;},
    setTimeout: server_namespaceObject.system.runTimeout.bind(server_namespaceObject.system),
    setInterval: server_namespaceObject.system.runInterval.bind(server_namespaceObject.system),
    clearInterval: server_namespaceObject.system.clearRun.bind(server_namespaceObject.system),
    clearTimeout: server_namespaceObject.system.clearRun.bind(server_namespaceObject.system),
    delay(delay = 1){
        if(delay < 1) return Promise.resolve(server_namespaceObject.system.currentTick);
        return new Promise(res=>setTimeout(res,delay-1,server_namespaceObject.system.currentTick + delay))
    },
    displayError(er){console.error(er,er?.stack??"");}
});
;// CONCATENATED MODULE: ./src/index.ts





var __webpack_exports__AsyncFunctionConstructor = __webpack_exports__.AZ;
var __webpack_exports__AsyncGeneratorFunction = __webpack_exports__.EN;
var __webpack_exports__AsyncGeneratorFunctionConstructor = __webpack_exports__.tT;
var __webpack_exports__AsyncSemaphore = __webpack_exports__.LV;
var __webpack_exports__BinaryStreamReader = __webpack_exports__.nv;
var __webpack_exports__BinaryStreamWriter = __webpack_exports__["do"];
var __webpack_exports__BlockRaycastHit = __webpack_exports__.Zu;
var __webpack_exports__BuildClass = __webpack_exports__.X6;
var __webpack_exports__CoordinateBase = __webpack_exports__.Fi;
var __webpack_exports__CustomDatabase = __webpack_exports__.BA;
var __webpack_exports__CustomEvent = __webpack_exports__.Aw;
var __webpack_exports__DatabaseSavingModes = __webpack_exports__.QM;
var __webpack_exports__DisposableHandle = __webpack_exports__.bQ;
var __webpack_exports__EndOfStreamError = __webpack_exports__.dL;
var __webpack_exports__FixedNumber = __webpack_exports__.xs;
var __webpack_exports__GenerateRandomString = __webpack_exports__.Lg;
var __webpack_exports__GenerateUUID = __webpack_exports__.gp;
var __webpack_exports__GeneratorFunction = __webpack_exports__.tp;
var __webpack_exports__GeneratorFunctionConstructor = __webpack_exports__.vd;
var __webpack_exports__GeneratorThread = __webpack_exports__.u8;
var __webpack_exports__GeometryGenerator = __webpack_exports__.Pl;
var __webpack_exports__JsonDatabase = __webpack_exports__.fl;
var __webpack_exports__MinecraftOverloadEvent = __webpack_exports__.lw;
var __webpack_exports__NBT = __webpack_exports__.RY;
var __webpack_exports__NBTDatabase = __webpack_exports__.N3;
var __webpack_exports__NBTReaderOptions = __webpack_exports__.ZA;
var __webpack_exports__NBTStreamReader = __webpack_exports__.ts;
var __webpack_exports__NBTStreamWriter = __webpack_exports__.yl;
var __webpack_exports__NBTTypes = __webpack_exports__.zK;
var __webpack_exports__NBTWriterOptions = __webpack_exports__.u$;
var __webpack_exports__OverTakes = __webpack_exports__.uX;
var __webpack_exports__PlayerDieAfterEventSignal = __webpack_exports__.Li;
var __webpack_exports__PlayerHealthChangedAfterEventSignal = __webpack_exports__.oY;
var __webpack_exports__PlayerHitBlockAfterEventSignal = __webpack_exports__.e9;
var __webpack_exports__PlayerHitEntityAfterEventSignal = __webpack_exports__.zG;
var __webpack_exports__PlayerHurtAfterEventSignal = __webpack_exports__.Fy;
var __webpack_exports__ReExtenend = __webpack_exports__.tB;
var __webpack_exports__ShapeGeneratorPrototype = __webpack_exports__.fd;
var __webpack_exports__Shapes = __webpack_exports__.jw;
var __webpack_exports__SyncPromise = __webpack_exports__.cW;
var __webpack_exports__TextReader = __webpack_exports__.wM;
var __webpack_exports__TextStream = __webpack_exports__.rV;
var __webpack_exports__TextWriter = __webpack_exports__.Ek;
var __webpack_exports__ThreadCommands = __webpack_exports__.Hw;
var __webpack_exports__Vec3 = __webpack_exports__.AO;
var __webpack_exports__YieldableSymbol = __webpack_exports__.ay;
var __webpack_exports__YieldableTypes = __webpack_exports__.Se;
var __webpack_exports__defaultWriters = __webpack_exports__.Pr;
var __webpack_exports__defualtReaders = __webpack_exports__.C$;
var __webpack_exports__output = __webpack_exports__.J8;
var __webpack_exports__sus = __webpack_exports__.Yp;
export { __webpack_exports__AsyncFunctionConstructor as AsyncFunctionConstructor, __webpack_exports__AsyncGeneratorFunction as AsyncGeneratorFunction, __webpack_exports__AsyncGeneratorFunctionConstructor as AsyncGeneratorFunctionConstructor, __webpack_exports__AsyncSemaphore as AsyncSemaphore, __webpack_exports__BinaryStreamReader as BinaryStreamReader, __webpack_exports__BinaryStreamWriter as BinaryStreamWriter, __webpack_exports__BlockRaycastHit as BlockRaycastHit, __webpack_exports__BuildClass as BuildClass, __webpack_exports__CoordinateBase as CoordinateBase, __webpack_exports__CustomDatabase as CustomDatabase, __webpack_exports__CustomEvent as CustomEvent, __webpack_exports__DatabaseSavingModes as DatabaseSavingModes, __webpack_exports__DisposableHandle as DisposableHandle, __webpack_exports__EndOfStreamError as EndOfStreamError, __webpack_exports__FixedNumber as FixedNumber, __webpack_exports__GenerateRandomString as GenerateRandomString, __webpack_exports__GenerateUUID as GenerateUUID, __webpack_exports__GeneratorFunction as GeneratorFunction, __webpack_exports__GeneratorFunctionConstructor as GeneratorFunctionConstructor, __webpack_exports__GeneratorThread as GeneratorThread, __webpack_exports__GeometryGenerator as GeometryGenerator, __webpack_exports__JsonDatabase as JsonDatabase, __webpack_exports__MinecraftOverloadEvent as MinecraftOverloadEvent, __webpack_exports__NBT as NBT, __webpack_exports__NBTDatabase as NBTDatabase, __webpack_exports__NBTReaderOptions as NBTReaderOptions, __webpack_exports__NBTStreamReader as NBTStreamReader, __webpack_exports__NBTStreamWriter as NBTStreamWriter, __webpack_exports__NBTTypes as NBTTypes, __webpack_exports__NBTWriterOptions as NBTWriterOptions, __webpack_exports__OverTakes as OverTakes, __webpack_exports__PlayerDieAfterEventSignal as PlayerDieAfterEventSignal, __webpack_exports__PlayerHealthChangedAfterEventSignal as PlayerHealthChangedAfterEventSignal, __webpack_exports__PlayerHitBlockAfterEventSignal as PlayerHitBlockAfterEventSignal, __webpack_exports__PlayerHitEntityAfterEventSignal as PlayerHitEntityAfterEventSignal, __webpack_exports__PlayerHurtAfterEventSignal as PlayerHurtAfterEventSignal, __webpack_exports__ReExtenend as ReExtenend, __webpack_exports__ShapeGeneratorPrototype as ShapeGeneratorPrototype, __webpack_exports__Shapes as Shapes, __webpack_exports__SyncPromise as SyncPromise, __webpack_exports__TextReader as TextReader, __webpack_exports__TextStream as TextStream, __webpack_exports__TextWriter as TextWriter, __webpack_exports__ThreadCommands as ThreadCommands, __webpack_exports__Vec3 as Vec3, __webpack_exports__YieldableSymbol as YieldableSymbol, __webpack_exports__YieldableTypes as YieldableTypes, __webpack_exports__defaultWriters as defaultWriters, __webpack_exports__defualtReaders as defualtReaders, __webpack_exports__output as output, __webpack_exports__sus as sus };
