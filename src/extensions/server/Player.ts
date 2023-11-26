import { Player, ScreenDisplay } from "@minecraft/server";
import { OverTakes, /*playerDatabase*/ } from "../../core";

const PlayerSymbol = Symbol("Player");
declare module "@minecraft/server" {
    interface Player{
        toString(): string,
        sendMessage(object: number | boolean | string | RawMessage | (string|RawMessage)[]): void
        /*
        getDatabaseProperty(key: string): any
        setDatabaseProperty(key: string, value: any): Promise<void>
        hasDatabaseProperty(key: string): boolean*/
        //deleteProperty(key: string): Promise<boolean>
    }
    interface ScreenDisplay{
        readonly player: Player
        sendMessage(object: any): void
    }
    interface Camera{
        readonly player: Player
    }
}
OverTakes(Player.prototype, {
    toString(){return `[${this.name}: ${this.id}]`},
    sendMessage(object) {return super.sendMessage(typeof object ==="object"?object:("" + object));},
    /*
    getDatabaseProperty(key: string){
        if(!this || !this?.isValid() || !this?.id) throw new ReferenceError("Object bound to prototype doesn't exists");
        if(playerDatabase.objective.isValid())
        return playerDatabase.get(this.id + "_player_" + key);
    },
    async setDatabaseProperty(key: string, value: any){
        if(!this || !this?.isValid() || !this?.id) throw new ReferenceError("Object bound to prototype doesn't exists");
        if(!playerDatabase.objective?.isValid()) await playerDatabase.rebuildAsync();
        playerDatabase.set(this.id + "_player_" + key, value);
    },
    hasDatabaseProperty(key: string){
        if(!this || !this?.isValid() || !this?.id) throw new ReferenceError("Object bound to prototype doesn't exists");
        return playerDatabase.has(this.id + "_player_" + key);
    },
    async deleteProperty(key: string){
        if(!this || !this?.isValid() || !this?.id) throw new ReferenceError("Object bound to prototype doesn't exists");
        if(!playerDatabase.objective?.isValid()) await playerDatabase.rebuildAsync();
        return playerDatabase.delete(this.id + "_player_" + key);
    },*/
    get onScreenDisplay(): ScreenDisplay{const display = super.onScreenDisplay; display[PlayerSymbol] = this; return display;}
});
OverTakes(ScreenDisplay.prototype,{
    get player(): Player{return (this as any)[PlayerSymbol];}, 
    sendMessage(object) {return this.player.sendMessage(object);}
})