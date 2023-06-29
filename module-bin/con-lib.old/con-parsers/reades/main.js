export class Stream{
    /** @type {boolean} @readonly */
    get endOfStream(){return this.i >= this.length;}
    /** @type {number}  @readonly*/
    get length(){return this.v.length;}
    /** @type {string}  @readonly*/
    get source(){return this.v}
    /** @param {string} string */
    constructor(string){
        this.v = string;
        this.i = 0;
    }
    offSet(i = 0){
        if(i > this.length) throw new RangeError("Offset out of the length bounds.");
        this.i = i;
    }
    readToEnd(){
        if(this.endOfStream) return "";
        else {
            let a = this.v.substring(i);
            i = this.length;
            return a;
        }
    }
    read(length = 1){
        if(this.endOfStream || this.i + length > this.length) throw new RangeError("End of the stream.");
        let i = this.i; 
        i += length;
        return this.substring(i, i + length);

    }
    seek(length = 1){
        if(this.endOfStream || this.i + length > this.length) throw new RangeError("End of the stream.");
        return this.substring(this.i, this.i + length);
    }
}
export class Reader{
    /** @type {Stream} @readonly */
    get source(){return this.stream;}
    /** @param {Stream} stream */
    constructor(stream){
        this.stream = stream;
    }
    read(){
        return this.stream.readToEnd();
    }
}