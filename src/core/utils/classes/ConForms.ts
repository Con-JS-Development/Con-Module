import { Player } from "@minecraft/server";
import { MessageFormData } from "@minecraft/server-ui";

export class ConfirmFormData {
    static defualtTitle = "§t§lConfirm";
    static defualtOkButton = "§q§lOK";
    static defualtCancel = "§4§lCancel";
    private _messageForm_ = new MessageFormData();
    constructor(message: string, title = ConfirmFormData.defualtTitle, okButton =  ConfirmFormData.defualtOkButton, cancelButton =  ConfirmFormData.defualtCancel){
        this._messageForm_.title(title);
        this._messageForm_.body(message);
        this._messageForm_.button1(cancelButton);
        this._messageForm_.button2(okButton);
    }
    async show(player: Player){
        const data = await this._messageForm_.show(player);
        return !!(data.selection);
    }
    async showForce(player: Player){
        const data = await this._messageForm_.forceShow(player);
        return !!(data.selection);
    }
}