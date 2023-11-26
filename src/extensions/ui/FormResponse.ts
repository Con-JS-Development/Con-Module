import { FormResponse, ModalFormResponse } from "@minecraft/server-ui";
import { OverTakes } from "core";

declare module "@minecraft/server-ui"{
    interface FormResponse{
        readonly output: ActionFormResponse["selection"] | MessageFormResponse["selection"] | ModalFormResponse["formValues"];
    }
    interface ActionFormResponse{
        readonly output: ActionFormResponse["selection"];
    }
    interface MessageFormResponse{
        readonly output: MessageFormResponse["selection"];
    }
    interface ModalFormResponse{
        readonly output: ModalFormResponse["formValues"];
    }
}
OverTakes(FormResponse.prototype, {
    get output(): number | (number|string|boolean)[] | undefined {
        if(this instanceof ModalFormResponse) return this.formValues;
        return (this as any).selection;
    }
});