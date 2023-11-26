import { ItemStack, ContainerSlot, ItemEnchantsComponent, ItemDurabilityComponent, ItemComponentTypeMap } from "@minecraft/server";
import { OverTakes } from "core";

declare module "@minecraft/server" {
    interface ContainerSlot{
        toString(): string;
        enchantments: EnchantmentList;
        damage?: number;
        readonly maxDurability?: number;
    }
    interface ItemStack {
        toString(): string;
        enchantments: EnchantmentList;
        damage?: number;
        readonly maxDurability?: number;
    }
    interface ItemComponent {
        readonly item: ItemStack
    }
}
OverTakes(ItemStack.prototype, {
    toString(){return `[${this.constructor.name}: ${super.typeId}]`},
    get enchantments(){return super.getComponent(ItemEnchantsComponent.componentId).enchantments;},
    set enchantments(enchantments){super.getComponent(ItemEnchantsComponent.componentId).enchantments = enchantments;},
    get damage(){return super.getComponent(ItemDurabilityComponent.componentId).damage;},
    set damage(damage){super.getComponent(ItemDurabilityComponent.componentId).damage = damage;},
    get maxDurability(){return super.getComponent(ItemDurabilityComponent.componentId).maxDurability;},
    getComponent<T extends keyof ItemComponentTypeMap>(componentId: keyof ItemComponentTypeMap): ItemComponentTypeMap[T] {return Object.defineProperty(super.getComponent(componentId),"item",{value:this});},
});
OverTakes(ContainerSlot.prototype, {
    toString(){return `[${this.constructor.name}: ${super.typeId}]`},
    get enchantments(){return super.getItem()?.getComponent(ItemEnchantsComponent.componentId).enchantments;},
    set enchantments(enchantments){
        const item = super.getItem();
        if(!item) return;
        item.enchantments = enchantments;
        super.setItem(item);
    },
    get damage(){return super.getItem()?.getComponent(ItemDurabilityComponent.componentId).damage;},
    set damage(damage){ 
        const item = super.getItem();
        if(!item) return;
        item.damage = damage;
        super.setItem(item);
    },
    get maxDurability(){return super.getItem()?.getComponent(ItemDurabilityComponent.componentId).maxDurability;},
});