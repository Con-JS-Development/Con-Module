import { World, Dimension, world, MinecraftDimensionTypes } from '@minecraft/server';
import { SendMessageSymbol } from '../../API/api-fix.js';

const {overworld, nether, theEnd} = MinecraftDimensionTypes;

Object.defineProperties(World.prototype,{
    overworld: {value: world.getDimension(overworld)},
    nether: {value: world.getDimension(nether)},
    theEnd: {value: world.getDimension(theEnd)},
    time: {get(){return this.getTime();},set(num){return this.setTime(num);}},
    sendMessage: {
        value: function sendMessage(text, targetSelector){
            text = text.split('\n');
            if(targetSelector == undefined){
                for (const t of text) {
                    this[SendMessageSymbol](t);
                }
            }else{
                for (const p of this.overworld.getPlayers(targetSelector)) {
                    for (const t of text) {
                        p[SendMessageSymbol](t);
                    }
                }
            }
        }
    },
    find:{
        value(entity, queryOptions){
            queryOptions.location = entity.location;
            queryOptions.closest = 1;
            delete queryOptions.farthest;
            for (const e of entity.dimension.getEntities(queryOptions)) {
                if(entity == e) return e;
            }
            return false;
        }
    }
});

Object.defineProperties(Dimension.prototype,{
    setBlock: {value: function setBlock(loc, permutation){return this.fillBlocks(loc, loc, permutation);}}
});