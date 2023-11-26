import {world, ScoreboardObjective,ScoreboardIdentityType, ScoreboardIdentity,system, Entity} from "@minecraft/server";
import { NBT } from "../../../node_module_reexport/index";
///////////////////////////////////////////////////
// DATABASE.JS
///////////////////////////////////////////////////
const {scoreboard} = world, {FakePlayer} = ScoreboardIdentityType;
const split = "\n_`Split`_\n";
function endTickCall(callback){
    system.run(()=>system.run(()=>system.run(callback)));
}
export const DatabaseSavingModes = {
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
        if(typeof objective !== "string" && !objective instanceof ScoreboardObjective) throw new RangeError("Firt parameter si not valid: " + objective);
        this._scoreboard_ = typeof objective === "string"?(scoreboard.getObjective(objective)??scoreboard.addObjective(objective,objective)):objective;
        this._nameId_ = this.id;
        this._source_ = new Map();
        this._changes_ = new Map();
        if(this._saveMode_ === DatabaseSavingModes.TickInterval){
            system.runInterval(()=>{
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
export class JsonDatabase extends ScoreboardDatabaseManager{}
export class NBTDatabase extends ScoreboardDatabaseManager{
    get _parser_() {return NBT;};
}
export class CustomDatabase extends ScoreboardDatabaseManager{
    constructor(parser,...params){
        super(params);
        this._parser_ = parser;
    }
}