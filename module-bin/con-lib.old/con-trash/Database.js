import { world } from "@minecraft/server"

const scoreSymbol = Symbol('scores'), nameSymbol = Symbol('name'), dbTypeSymbol = Symbol('dbType');
const defaultType = 'Type:default', extendedType = 'Type:extended', fakeMaxLength = 31000;
const {scoreboard} = world;

class DB extends Map{
    constructor(name,type){
        if(typeof(name)!=='string') throw new TypeError('Name is not a string.');
        if(name.length>12) throw new Error('Name for this DB is too large.');
        if(name.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('Invalid character mach in the name of the Database.');
        super();
        this[nameSymbol] = name;
        this[scoreSymbol] = getObjective(name,type);
        if(this[scoreSymbol].displayName !== type) throw new TypeError(`(${name}) cant be loaded as "${type}" becouse is type of "${this[scoreSymbol].displayName}"`);
        this[dbTypeSymbol] = type;
    }
    clear(){
        scoreboard.removeObjective(this[nameSymbol]);
        this[scoreSymbol] = scoreboard.addObjective(this[nameSymbol],this[dbTypeSymbol]);
        super.clear();
    }
    get sizeAll(){return [...this.entriesAll()].length??0;}
    get name(){return this[nameSymbol];}
    get objective(){return this[scoreSymbol];}
    loadAll(){ [...this.entriesAll()]; return this}
    forEachAll(callBack){for (const [key,value] of this.entriesAll()) try{callBack(value,key,this);}catch{}}
    *keysAll(){for (const [key,value] of this.entriesAll()) yield key;}
    *valuesAll(){for (const [key,value] of this.entriesAll()) yield value;}
    hasAll(key){if(super.has(key)) return true; for (const [theKey] of this.entriesAll()) if(theKey === key) return true; return false;}
}
export class Database extends DB{
    constructor(name,instantLoad=false){
        super(name,defaultType);
        if(instantLoad) this.loadAll();
    }
    delete(key){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        super.delete(key);
        for (const identity of this[scoreSymbol].getParticipants()) {
            if(identity.displayName.split('+:_')[0] === key) return this[scoreSymbol].resetScoreTarget(identity);
        }
        return false;
    }
    *deleteGen(key){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        yield;
        super.delete(key);
        for (const identity of this[scoreSymbol].getParticipants()) {
            if(identity.displayName.split('+:_')[0] === key) return this[scoreSymbol].resetScoreTarget(identity);
            yield;
        }
        return false;
    }
    get(key){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if(key.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('invalid key name: ' + key);
        if (super.has(key)) return super.get(key);
        let raw = "";
        for (const identity of this[scoreSymbol].getParticipants()) {
            const {displayName,type} = identity;
            if ((displayName.split('+:_')[0] == key) && type == 3) {
                raw = displayName.slice(key.length + 3);
                break;
            }
        }
        if(raw==="") return;
        const data = JSON.parse(raw.getModify());
        super.set(key,data);
        return data;
    }
    *getGen(key){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if(key.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('invalid key name: ' + key);
        if (super.has(key)) return super.get(key);
        yield;
        let raw = "";
        for (const identity of this[scoreSymbol].getParticipants()) {
            const {displayName,type} = identity;
            if ((displayName.split('+:_')[0] == key) && type == 3) {
                raw = displayName.slice(key.length + 3);
                break;
            }
            yield;
        }
        yield;
        if(raw==="") return;
        const data = JSON.parse(raw.getModify());
        super.set(key,data);
        yield;
        return data;
    }
    set(key,value){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if (key.length>150) throw new Error('key is too large max length it 150 characters');
        if(key.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('invalid key name: ' + key);
        const raw = JSON.stringify(value);
        if(raw.length>fakeMaxLength) throw new Error(`value large (${raw.length} !< ${fakeMaxLength}), If you need to save more data per property use Extended Database.`);
        this.delete(key);
        this[scoreSymbol].setScoreTarget(key+ "+:_" + raw);
        return super.set(key,value);
    }
    *setGen(key,value){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if (key.length>150) throw new Error('key is too large max length it 150 characters');
        if(key.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('invalid key name: ' + key);
        yield;
        const raw = JSON.stringify(value);
        if(raw.length>fakeMaxLength) throw new Error(`value large (${raw.length} !< ${fakeMaxLength}), If you need to save more data per property use Extended Database.`);
        yield * this.deleteGen(key);
        this[scoreSymbol].setScoreTarget(key+ "+:_" + raw);
        yield;
        return super.set(key,value);
    }
    *entriesAll(){
        for (const {displayName} of this[scoreSymbol].getParticipants()) {
            const key = displayName.split('+:_')[0];
            const value = JSON.parse(displayName.substring(key.length + 3).getModify());
            super.set(key,value);
            yield [key,value];
        }
    }
}
export class ExtendedDatabase extends DB{
    constructor(name,instantLoad=false){
        super(name,extendedType);
        if(instantLoad) this.loadAll();
    }
    delete(key){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if(key.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('invalid key name: ' + key);
        super.delete(key);
        let isLast = false;
        for (const identity of this[scoreSymbol].getParticipants()) {
            if(identity.displayName.split('+:_')[0] === key) {
                this[scoreSymbol].resetScoreTarget(identity);
                isLast = true;
            } else if(isLast) return true;
        }
        return false;
    }
    *deleteGen(key){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if(key.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('invalid key name: ' + key);
        super.delete(key);
        yield;
        let isLast = false;
        for (const identity of this[scoreSymbol].getParticipants()) {
            if(identity.displayName.split('+:_')[0] === key) {
                this[scoreSymbol].resetScoreTarget(identity);
                isLast = true;
            } else if(isLast) return true;
            yield;
        }
        return false;
    }
    get(key){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if(key.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('invalid key name: ' + key);
        if (super.has(key)) return super.get(key);
        let raw = "", isLast = false;
        for (const identity of this[scoreSymbol].getParticipants()) {
            const {displayName,type} = identity;
            if ((displayName.split('+:_')[0] === key) && type == 3) {
                raw += displayName.slice(key.length + 4);
                isLast = true;
            } else if(isLast) break;
        }
        if(raw==="") return;
        const data = JSON.parse(raw.getModify());
        super.set(key,data);
        return data;
    }
    *getGen(key){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if(key.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('invalid key name: ' + key);
        if (super.has(key)) return super.get(key);
        yield;
        let raw = "", isLast = false;
        for (const identity of this[scoreSymbol].getParticipants()) {
            const {displayName,type} = identity;
            if ((displayName.split('+:_')[0] === key) && type == 3) {
                raw += displayName.slice(key.length + 4);
                isLast = true;
            } else if(isLast) break;
            yield;
        }
        yield;
        if(raw==="") return;
        const data = JSON.parse(raw.getModify());
        super.set(key,data);
        return data;
    }
    *setGen(key,value){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if (key.length>150) throw new Error('key is too large max length it 150 characters');
        if(key.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('invalid key name: ' + key);
        yield;
        const raw = JSON.stringify(value);
        yield* this.deleteGen(key);
        for (let i = 1, Min = 0; i<65500; i++, Min+=fakeMaxLength) {
            const Current = raw.substring(Min,Min + fakeMaxLength);
            if (Current == "") break;
            this[scoreSymbol].setScoreTarget(key + "+:_" + String.fromCharCode(i) + Current);
            yield;
        }
        return super.set(key,value);
    }
    async setAsync(key,value){
        await null;
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if(key.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('invalid key name: ' + key);
        const raw = JSON.stringify(value);
        this.delete(key);
        await null;
        for (let i = 1, Min = 0; i<65500; i++, Min+=fakeMaxLength) {
            const Current = raw.substring(Min,Min + fakeMaxLength);
            if (Current == "") break;
            this[scoreSymbol].setScoreTarget(key + "+:_" + String.fromCharCode(i) + Current);
            await null;
        }
        return super.set(key,value);
    }
    set(key,value){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if (key.length>150) throw new Error('key is too large max length it 150 characters');
        if(key.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('invalid key name: ' + key);
        const raw = JSON.stringify(value);
        this.delete(key);
        for (let i = 1, Min = 0; i<65500; i++, Min+=fakeMaxLength) {
            const Current = raw.substring(Min,Min + fakeMaxLength);
            if (Current == "") break;
            this[scoreSymbol].setScoreTarget(key + "+:_" + String.fromCharCode(i) + Current);
        }
        return super.set(key,value);
    }
    *entriesAll(){
        let database = {};
        for (const identity of this[scoreSymbol].getParticipants()) {
            const {displayName,type} = identity;
            const key = displayName.split('+:_')[0];
            if (type == 3) {
                database[key] = (database[key]??"") + displayName.substring(key.length + 4);
            }
        }
        for(const [key,value] of Object.entries(database)){
            const data = JSON.parse(value.getModify());
            super.set(key,data);
            yield [key,data];
        }
    }
}
function getObjective(n,d){
    const c = scoreboard.getObjective(n);
    if(c!==null) return c;
    try {
        return scoreboard.addObjective(n,d);
    } catch (er) {
        throw er;
    }
}
export class TagBasedDatabase extends Map{
    /*
    save(){
        let MaxLength = 1000;
        for (const tag of this.getTags()) if(tag.startsWith(tagDataPrefix)) this.removeTag(tag);
        const Base = JSON.stringify(this.data);
        for (let index = 1000, Min = 0; index<5100; index++, Min+= MaxLength) {
            const Current = Base.substring(Min,Min + MaxLength);
            if (Current == "") break;
            if (index > 5000) throw new Error("extensions.js player.save() data is too big");
            this.addTag(tagDataPrefix+index + Current);
        }
        return this.data;
    },
    load(){
        let sBuilder = "";
        for (const tag of this.getTags()) {
            if(!tag.startsWith(tagDataPrefix)) continue;
            sBuilder += tag.substring(tagDataPrefix.length + 4);
        }
        try {
            this.data = JSON.parse(sBuilder);
        } catch (error) {
            this.data = {};
        } finally {
            this.data = this.data??{};
            return this.data;
        }
    },*/
}