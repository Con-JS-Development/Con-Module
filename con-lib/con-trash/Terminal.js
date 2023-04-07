import { BeforeChatEvent, world } from '@minecraft/server';
import { CommandBuilder, Command } from '../libraries/classes.js';
import { ArgumentParserTypes, CommandParser, SkipCharacters, StringRef } from '../libraries/Parsers.js';


export class Terminal{
    constructor(){
        if(!subscibed) subscibed = world.events.beforeChat.subscribe((ev)=>this.onChat(ev).catch(er=>console.error(er,er.stack)));
    }
    /** @param {BeforeChatEvent} eventData */
    async onChat(eventData){
        const {message,sender} = eventData, errorMess = n=>`§cUnknown command: ${n}. Please check that the command exists and that you have permission to use it.`;
        /** @type {string} */
        let newString;
        if(!Command.GetPrefixes().find(p=>{
            if( message.startsWith(p)){
                newString = message.substring(p.length);
                return true;
            }
            return false;
        })) return false;
        const [commandName] = newString.match(/^[^ ]+/g)??[];
        if(commandName == null) return;
        const cmd = Command.GetCommand(commandName);
        if(cmd == null) return;
        if(cmd.cancelLevel === 1){
            eventData.sendToTargets = true;
            eventData.targets = [];
        } else if (cmd.cancelLevel === 2) eventData.cancel = true;
        if(!Command.CanRun(sender,cmd)) return sender.tell(errorMess(commandName));
        newString = StringRef.toRef(newString.substring(commandName.length));
        SkipCharacters(newString);
        try {
            const argument = CommandParser.ParseCommandArguments(...[newString,cmd.argumentParser(sender)]);
            const strings = await cmd.executor({commandName,message:eventData.message,sender:sender,command:cmd},sender,...argument);
            if(typeof(strings) === 'string') return sender.tell("" + strings);
        } catch (error) {
            if(error.type == 'parsingError') sender.tell("§c" + error);
            else throw error;
        }
    }
    RegistryCommand = cmd=>Terminal.RegistryCommand(cmd)
    static RegistryCommand(command){
        if(Array.isArray(command)){
            for (const cmd of command) {
                Command.RegistryCommand(cmd);
            }
        }else return Command.RegistryCommand(command);
    }
}

let subscibed = false;
const terminal = new Terminal();

Terminal.RegistryCommand([
    new CommandBuilder('help').setPrefix('-').setAliases(['h','?']).setOp(false).setCancelation(1)
    .setInfo('Show list of aviable commands.').setArgumentParser(function*gen(){return [];})
    .setExecutor((cmd,sender,params)=>{
        let Output = '§a----------Help------------\n';
        Command.GetAllCommands().forEach((command)=>{
            const cmd = command;
            if ((sender.isOp() == cmd.op || sender.isOp())&&!cmd.hidden) {
                Output += `  §b${cmd.prefix}§a${cmd.name} §7 ${cmd.info?'- ' + cmd.info:''}\n`;
            }
        });
        return Output + '§a-----------------------------';
    }),
    new CommandBuilder('testfor').setPrefix('-').setOp(false).setCancelation(2).setInfo('Run testing command with one selector argument.').setArgumentParser(function*gen(sender){
        const targets = (yield {type: ArgumentParserTypes.target, params:[sender], optional: true})??[sender];
        return [targets];
    }).setExecutor((cmd, sender, targets)=>{
        for (const entity of targets) {
            sender.tell('Found: ' + entity);
        }
    })
]);