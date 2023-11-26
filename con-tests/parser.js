function EndOfStream(string,offset){return offset >= string.length;}
export class ParseToken{
    constructor(string,offset,base){
        this.__base = base;
        this.__offset = base;
        this.__source = string;
        this.__name = new.target.name;
    }
    parse(){return {value:null,current:this,offset:this.__offset,source:this.__source};}
    throw(offset,count = 1,name){
        if(this.__base) this.__base.throw(offset,count,name??this.__name);
    }
}
export class StringParseToken extends ParseToken{
    parse(){
        const value  = "";
        return {value:value,current:this,offset:this.__offset,source:this.__source};
    }
}
export class Parser{

}
"abcdefghijklmnopqrstuvwxyz0123456789_$ß€";
export class CommandŁłĐđ$ß{
    constructor(definition){

    }
    execute(source){

    }
}
export class CommandDefinition{

}