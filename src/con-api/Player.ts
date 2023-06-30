import { Player} from "@minecraft/server";
import { OverTakes, Vec3 } from "../core";

declare module "@minecraft/server" {
    interface Player {
        toString(): string
    }
}
OverTakes(Player.prototype, {
    toString(){return `[${super.name}: ${super.id}]`}
});