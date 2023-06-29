import { world } from '@minecraft/server';

class CommandRegistry{
    registredValues = {};
    prefixes = [];
    commands = [];
    /** @param {Command} command */
    registry(command){
        if(!command instanceof Command) throw new TypeError("Object is not instanceof Command");
        const obj = {};
        if(command.name == undefined || command.name.length < 3) throw new Error(`Invalid command name "${command.name}"`);
        if(command.name in this.registredValues) throw new Error(`Command with this name "${command.name}", another command already registred this name`);
        obj[command.name] = command;
        for (const a of command.aliases) {
            if(a in this.registredValues || a == undefined || a.length < 1) new Error(`Invalid command alias or already used by another command "${a}"`);
            this.registredValues[a] = command;
        }
        Object.assign(this.registredValues,obj);
        if(!this.prefixes.includes(command.prefix)) this.prefixes.push(command.prefix);
        this.commands.push(command);
        return true;
    }
    delete(name){
        const command = this.registredValues[name];
        if(command == undefined) return true;
        for (const alias of command.aliases) {
            delete this.registredValues[alias];
        }
        delete this.registredValues[name];
        const index = this.commands.indexOf(command);
        if (index > -1) { // only splice array when item is found
          this.commands = this.commands.splice(index, 1); // 2nd parameter means remove one item only
        }
        return true;
    }
}
export class Command{
    constructor(name){
        this.name = name;
    }
    aliases = [];
    cancelLevel = 2;
    prefix = '!';
    visibility = true;
    op = true;
    access = undefined;
    info = '';
    timeout = 0;
    executor = ()=>undefined;
    argumentParser = undefined;
    static RegistryCommand(command){
        return Command.Registry.registry(command);
    }
    static Registry = new CommandRegistry();
    /** @param {import('@minecraft/server').Player} sender @param {Command} command*/
    static CanRun(sender,command){
        let isOp = sender.isOp(), yes = (isOp == command.op) | isOp;
        if(command.access != undefined && !isOp){
            yes |= world.find(sender,command.access);
        }
        return yes;
    }
    /**@param {string} name @returns {Command} */
    static GetCommand(name){
        return this.Registry.registredValues[name];
    }
    static GetPrefixes(){
        return this.Registry.prefixes;
    }
    static GetAllCommands(){
        return [...this.Registry.commands];
    }
}
export class CommandBuilder extends Command{
    constructor(name){
        super(name);
    }
    setCancelation(calcelationLevel){this.cancelLevel = calcelationLevel; return this;}
    setPrefix(prefix){this.prefix = prefix;return this;}
    setName(name){this.name = name;return this;}
    setAliases(aliases){this.aliases = aliases;return this;}
    setOp(op){this.op = op;return this;}
    setInfo(info){this.info = info;return this;}
    setExecutor(callBack){this.executor = callBack;return this;}
    setTimeout(timeout){this.timeout = timeout;return this;}
    setVisibility(isVisible){this.visibility = isVisible;return this;}
    setAccessor(access){this.access = access; return this;}
    setArgumentParser(parse){this.argumentParser = parse; return this;}
    //setOpAccessor(access){this.opAccess = access; return this;}
}