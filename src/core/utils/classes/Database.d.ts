import {ScoreboardObjective, ScoreboardIdentity, Entity} from "@minecraft/server";
//////////////////////////////////////
// DATABASE.JS
//////////////////////////////////////
export enum DatabaseSavingModes {
    OneTimeSave="OneTimeSave",
    EndTickSave="EndTickSave",
    TickInterval="TickInterval"
}
export enum ChangeAction {
    Change=0,
    Remove=1
}
/**@extends {Map<string,any>}*/
declare class ScoreboardDatabaseManager extends Map<string,any>{
    private _saveMode_: DatabaseSavingModes;
    private hasChanges: boolean;
    readonly maxLength: number;
    private readonly _scoreboard_: ScoreboardObjective;
    protected readonly _source_: Map<string,string|ScoreboardIdentity|Entity>;
    protected readonly _parser_: {stringify:(data: any)=>string,parse:(data: string)=>any};
    readonly savingMode: DatabaseSavingModes;
    constructor(objective: ScoreboardObjective | string, saveMode?: DatabaseSavingModes);
    constructor(objective: ScoreboardObjective | string, saveMode: DatabaseSavingModes.EndTickSave, interval?: number);
    /**@inheritdoc */
    set(key: string, value: any): this
    /**@inheritdoc */
    delete(key: string): boolean
    clear(): void
    load(): this
    loadAsync(): Promise<this>
    rebuild(): this;
    rebuildAsync(): Promise<this>;
    readonly objective: ScoreboardObjective
    readonly id: string;
    readonly loaded: boolean;
}
export class JsonDatabase extends ScoreboardDatabaseManager{}
export class NBTDatabase extends ScoreboardDatabaseManager{}
export class CustomDatabase extends ScoreboardDatabaseManager{
    constructor(parser: {parse:(data:string)=>any,stringify:(data: any)=>string}, objective: string | ScoreboardObjective, saveMode?: DatabaseSavingModes);
    constructor(parser: {parse:(data:string)=>any,stringify:(data: any)=>string}, objective: string | ScoreboardObjective, saveMode: DatabaseSavingModes.EndTickSave, interval?: number);
}