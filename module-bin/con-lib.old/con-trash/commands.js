import { Dimension, Entity } from '@minecraft/server';
import * as parsers from '../../Parsers/index.js';

class CommandRegister{

}
class CommandSyntax{

}
class Param{
    getReader(){
        return parsers.readToEnd;
    }
}
class DynamicParam extends Param{}
class ConstantParam extends Param{
    constructor(value){
        super();
        this.value = value;
    }
}



class EnumParam extends Param{
    constructor(enumTypes = {defualt:"default"}){
        super()
        this.enums = enumTypes;
    }
    getReader(){
        return (ref) => {
            const {i} = ref, n = parsers.parseText(ref);
            if(Object.prototype.hasOwnProperty.call(this.enums,n)){
                return this.enums[n];
            }else{
                throw new parsers.RangeParserSyntaxError(ref,i,ref.i,"unknow enumerable")
            }
        }
    }
}




export class CommandEnvironment{
    constructor(sender, execution_permission, command){
        this.sender = sender;
        this.location = sender.location;
        this.dimension = sender.dimension;
        this.permission = execution_permission;
        this.command = command;
        if(sender instanceof Entity) this.senderType = SenderTypes.entity;
        else if(sender instanceof Player) this.senderType = SenderTypes.player;
        else this.senderType = SenderTypes.server;
    }
}
export const SenderTypes = {
    entity: "entity",
    player: "player",
    server: "server"
}