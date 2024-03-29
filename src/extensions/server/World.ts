import { World, world } from '@minecraft/server';
import { CoordinateBase, OverTakes } from 'core';
const _overworld_ = world.getDimension("overworld");
const _nether_ = world.getDimension("nether");
const _theEnd_ = world.getDimension("the_end");
declare module '@minecraft/server' {
    interface World {
      /** Represend insatnce of Dimension for overworld*/
      readonly overworld: Dimension;
      /** Represend insatnce of Dimension for nether*/
      readonly nether: Dimension;
      /** Represend insatnce of Dimension for theEnd*/
      readonly theEnd: Dimension;
      /** The Worlds Coordinate Base */
      readonly coordinateBase: CoordinateBase;
      sendMessage(object: number | boolean | string | RawMessage | (string|RawMessage)[]): void
    }
};
OverTakes(World.prototype,{
  get overworld(){return _overworld_;},
  get nether(){return _nether_;},
  get theEnd(){return _theEnd_;},
  get coordinateBase(){return CoordinateBase.default;},
  sendMessage(object) {return super.sendMessage(typeof object ==="object"?object:("" + object));}
});