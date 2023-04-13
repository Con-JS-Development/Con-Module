import { MinecraftDimensionTypes, ScoreboardIdentity, ScoreboardIdentityType, ScoreboardObjective, world } from "@minecraft/server";
import {AsyncSemaphore} from './Semaphore.js';


const splitKey = '.\n$_', matchRegex = /\.\n\$\_/g;
const {fakePlayer} = ScoreboardIdentityType;
const {parse, stringify} = JSON;

const {scoreboard} = world,
overworld=world.getDimension(MinecraftDimensionTypes.overworld);

const db = new Map();
/**@extends {Map<string,any>} */
class DB extends Map(){
    #id;
    #objective;
    #participants = new Map();
    /**
     * Create a new database!
     * @param {ScoreboardObjective} objective
     * @param {boolean?} createNew
     */
    constructor(objective, createNew = true) {
        if(typeof objective == "string"){
            let get = scoreboard.getObjective(objective);
            if(get == null && createNew){
                if(createNew)get = scoreboard.addObjective(objective, objective);
                else throw new ReferenceError(`No such a scoreboard objectvie \"${objective}\"`);
            }
            objective = get;
        }
        if(!objective instanceof ScoreboardObjective) throw new TypeError("is not instance of ScoreboardObjective");
        if(db.has(objective.id)) return db.get(objective.id);
        this.#objective = objective;
        this.#id = objective.id;
        for(const p of objective.getParticipants()){
            if(p.type != fakePlayer) continue;
            const [key,value] = p.displayName.split(splitKey);
            const v = parse(value.replaceAll("\\\"","\""));
            super.set(key,v);
            this._onInit(key,p);
        }
    }
    /**@private */
    _onInit(key, participant){
        this.#participants.set(key,participant);
    }
    /**@private */
    _onDelete(key){
        this.#objective.removeParticipant(this.#participants.get(key));
        this.#participants.delete(key);
    }
    /**@private */
    _onClear(){
        this.#participants.clear();
    }
    /**
     * Delete a key from the database 
     * @param {string} key Key to delete from the database
     */
    delete(key) {
        if (key.match(matchRegex)) throw new TypeError(`Database keys can't include "${splitKey}"`);
        if (!this.has(key)) return false;
        this._onDelete(key);
        return super.delete(key);
    }
    clear() {
        scoreboard.removeObjective(this.scoreboardObjective)
        this.#objective = scoreboard.addObjective(this.#id, this.#id);
        this._onClear();
        return super.clear();
    }
    /**@readonly @returns {Map<string,ScoreboardIdentity>}*/
    get participants() {return this.#participants}
    /**@readonly */
    get id(){return this.#id;}
    /**@readonly */
    get scoreboardObjective(){return this.#objective;}
}
/**
 * AsyncDatabase
 */
export class AsyncDatabase extends DB{
    #semaphores = new Map();
    /**@private */
    _onInit(key){
        super._onInit(key);
        this.#semaphores.set(key,new AsyncSemaphore());
    }
    /**@private */
    _onDelete(key){
        super._onDelete(key);
        this.#semaphores.delete(key);
    }
    /**@private */
    _onClear(){
        super._onClear();
        this.#semaphores.clear();
    }
    /**
     * Set a value from a key
     * @param {string} key Key to set
     * @param {any} value The value
     */
    async set(key, value) {
        if (value==undefined) throw new TypeError("Value must be defined");
        if (key.match(matchRegex)) throw new TypeError(`Database keys can't include "${splitKey}"`);


        const build = key + splitKey + stringify(value).replaceAll(/"/g, '\\"');
        if (build.length > 32000) throw new Error(`You can't set that big value`);
        /**@type {AsyncSemaphore} */
        const semaphore = this.#semaphores.get(key)?? new AsyncSemaphore();
        const lockId = await semaphore;
        if (this.has(key)) this.scoreboardObjective.removeParticipant(this.participants.get(key));
        await overworld.runCommandAsync(`scoreboard players set "${build}" "${this.id}" 0`);
        const keyId = key + splitKey;
        const p = this.scoreboardObjective.getParticipants().find(({displayName:n})=>n.startsWith(keyId));
        if(p == undefined) {
            semaphore.release(lockId);
            throw new Error("Value couldn't be set!");
        }
        super.participants.set(key,p);
        super.set(key, value);
        this.#semaphores.set(key,semaphore);
        semaphore.release(lockId);
    }
    /**
     * @readonly
     * @returns {Map<string,AsyncSemaphore>}
     */
    get semaphores(){return this.#semaphores;}
}
export class Database extends DB{
    set(key, value) {
        if (value==undefined) throw new TypeError("Value must be defined");
        if (key.match(matchRegex)) throw new TypeError(`Database keys can't include "${splitKey}"`);
        const build = key + splitKey + stringify(value).replaceAll(/"/g, '\\"');
        if (build.length > 32000) throw new Error(`You can't set that big value`);
        if (this.has(key)) this.scoreboardObjective.removeParticipant(this.participants.get(key));
        overworld.runCommand(`scoreboard players set "${build}" "${this.id}" 0`);
        const keyId = key + splitKey;
        const p = this.scoreboardObjective.getParticipants().find(({displayName:n})=>n.startsWith(keyId));
        if(p == undefined) throw new Error("Value couldn't be set!");
        super.participants.set(key,p);
        return super.set(key, value);
    }
}