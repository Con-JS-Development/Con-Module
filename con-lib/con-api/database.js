import {AsyncSemaphore} from '../con-utils';
import {ScoreboardIdentityType} from '@minecraft/server';

const databases = new Map();
const scoreboard = world.scoreboard;
const splitKey = '__$\n&__';
/**
 * Database
 */
export class Database extends Map{
    constructor(identifier) {
        if(typeof identifier === 'string') identifier = scoreboard.getObjective(identifier)??scoreboard.addObjective(identifier,identifier);
        if(!identifier instanceof ScoreboardObjective) throw new TypeError("Objective object must by type of ScoreboardObjective or string.");
        if(databases.has(identifier.id)) return databases.get(identifier.id);
        super();
        this.#objective = identifier;
        this.#id = identifier.id;
        this.#participants = new Map();
        this.#awaitHandles = new Map();
        this.#load();
        databases.set(identifier.id, this);
    }
    #load(){
        for (const p of identifier.getParticipants()) {
            if(p.type == ScoreboardIdentityType.fakePlayer){
                const [key,value] = p.displayName.split(splitKey);
                const v = JSON.parse(value.replaceAll("\\\"","\""));
                super.set(key,v);
                this.#participants.set(key,p);
                this.#awaitHandles.set(key,new AsyncSemaphore());
            }
        }
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
        if ((build.length + 1) > 32000) throw new Error(`Database setter to long... somehow`);
        let handle = this.#awaitHandles.get(key) ?? new PromseHandle();
        const handleKey = await handle.lock();
        if (this.has(key)) this.#objective.removeParticipant(this.#participants.get(key));
        await runCommand(`scoreboard players set "${build}" "${this.#id}" 0`);
        const keyId = key + splitKey;
        const p = this.#objective.getParticipants().find(({displayName:n})=>n.startsWith(keyId));
        if(p == undefined) throw new Error("Value couldn't be set!");
        this.#participants.set(key,p);
        super.set(key, value);
        this.#awaitHandles.set(key,handle);
        handle.release(handleKey);
    }
    /**
     * Delete a key from the database 
     * @param {string} key Key to delete from the database
     */
    delete(key) {
        if (key.match(matchRegex))
            throw new TypeError(`Database keys can't include "${splitKey}"`);
        if (!this.has(key)) return false;
        this.#objective.removeParticipant(this.#participants.get(key));
        this.#participants.delete(key);
        this.#awaitHandles.delete(key);
        return super.delete(key);
    }
    clear() {
        objectives(this.#objective,true);
        this.#objective = objectives(this.#id);
        this.#participants.clear();
        return super.clear();
    }
    #id;
    #objective;
    #participants;
    #awaitHandles = new Map();
    /**@returns {string} */
    getId(){return this.#id;}
    /**@returns {ScoreboardObjective} */
    getScoreboardObjective(){return this.#objective;}
}
