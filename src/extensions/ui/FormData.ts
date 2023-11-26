import { Player } from "@minecraft/server";
import { ModalFormData, ActionFormData, MessageFormData, FormResponse, FormCancelationReason } from "@minecraft/server-ui";
import { ReExtenend } from "core";

export class FormData {
    async forceShow(player: Player): Promise<Awaited<ReturnType<this["show"]>>>{
        do {
            const value = await this.show(player);
            if(value.cancelationReason !== FormCancelationReason.UserBusy) return value as any;
        } while (true);
    }
    async show(player: Player): Promise<FormResponse>{return Promise.resolve() as unknown as Promise<FormResponse>;}
}
declare module "@minecraft/server-ui"{
    interface ModalFormData extends FormData{}
    interface ActionFormData extends FormData{}
    interface MessageFormData extends FormData{}
}
ReExtenend(ModalFormData,FormData);
ReExtenend(ActionFormData,FormData);
ReExtenend(MessageFormData,FormData);