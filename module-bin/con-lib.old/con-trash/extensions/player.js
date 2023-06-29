import {Entity, Player} from '@minecraft/server';
import { SendMessageSymbol } from '../../API/api-fix.js';

Object.defineProperties(Entity.prototype, {
    toString:{value(){return `[Entity: ${this.typeId}]`;}},
    container:{get(){return this.getComponent('minecraft:inventory')?.container}},
    health:{get(){return this.getComponent('minecraft:health')?.current}, set(n){this.getComponent('minecraft:health').setCurrent(n)}},
    viewBlock:{get(){return this.getBlockFromViewDirection({maxDisatnce:10,includePassableBlocks:true});}},
    viewEntities:{get(){return this.getEntitiesFromViewDirection({maxDisatnce:10});}}
});
Object.defineProperties(Player.prototype, {
    sendMessage: {
        value: function sendMessage(text){
            for (const t of text.split('\n')) {
                this[SendMessageSymbol](t);
            }
        }
    },
    toString:{value(){return `[Player: ${this.name}]`;}},
    mainhand:{
        get(){return this.container.getSlot(this.selectedSlot);},
    },
});