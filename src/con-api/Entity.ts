import { Entity, Vector3, 
    EntityOnFireComponent, 
    EntityInventoryComponent, 
    EntityEquipmentInventoryComponent, 
    EquipmentSlot, ContainerSlot, ItemStack, EntityHealthComponent } from "@minecraft/server";
import { OverTakes, Vec3 } from "../core";

declare module "@minecraft/server" {
    interface Entity {
        readonly entityLocation: Vec3
        getHeadLocation(): Vec3;
        getViewDirection(): Vec3;
        getVelocity(): Vec3;
        setVelocity(velocity: Vector3): void;
        readonly isBurning: boolean;
        readonly inventory: EntityInventoryComponent;
        readonly container: Container;
        readonly equipment: EntityEquipmentInventoryComponent;
        get mainhandItem(): ItemStack;
        set mainhanditem(item: ItemStack | ContainerSlot);
        readonly mainhandSlot: ContainerSlot
        get offhandItem(): ItemStack;
        set offhandItem(item: ItemStack | ContainerSlot);
        readonly offhandSlot: ContainerSlot
        get health(): number
        set health(current: number);
        toString(): string
    }
}
OverTakes(Entity.prototype, {
    toString(){return `[${super.typeId}: ${super.id}]`},
    get entityLocation(): Vec3{return Vec3.from(this.location);},
    getHeadLocation(): Vec3{return Vec3.from(super.getHeadLocation())},
    getViewDirection(): Vec3{return Vec3.from(super.getViewDirection())},
    getVelocity(): Vec3{return Vec3.from(super.getVelocity())},
    setVelocity(velocity: Vector3) {
        super.clearVelocity();
        super.applyImpulse(velocity);
        return this as Entity;
    },
    get isBurning(){return super.hasComponent(EntityOnFireComponent.componentId);},
    get inventory(){return super.getComponent(EntityInventoryComponent.componentId);},
    get container(){return super.getComponent(EntityInventoryComponent.componentId).container;},
    get equipment(){return super.getComponent(EntityEquipmentInventoryComponent.componentId);},
    get mainhandItem(): ItemStack{return super.getComponent(EntityEquipmentInventoryComponent.componentId).getEquipment(EquipmentSlot.mainhand)},
    set mainhandItem(item: ItemStack | ContainerSlot){
        if(item instanceof ContainerSlot) super.getComponent(EntityEquipmentInventoryComponent.componentId).setEquipment(EquipmentSlot.mainhand,item.getItem());
        else if(item instanceof ItemStack) super.getComponent(EntityEquipmentInventoryComponent.componentId).setEquipment(EquipmentSlot.mainhand,item);
    },
    get mainhandSlot(): ContainerSlot{return super.getComponent(EntityEquipmentInventoryComponent.componentId).getEquipmentSlot(EquipmentSlot.mainhand);},
    get offhandItem(): ItemStack{return super.getComponent(EntityEquipmentInventoryComponent.componentId).getEquipment(EquipmentSlot.offhand)},
    set offhandItem(item: ItemStack | ContainerSlot){
        if(item instanceof ContainerSlot) super.getComponent(EntityEquipmentInventoryComponent.componentId).setEquipment(EquipmentSlot.offhand,item.getItem());
        else if(item instanceof ItemStack) super.getComponent(EntityEquipmentInventoryComponent.componentId).setEquipment(EquipmentSlot.offhand,item);
    },
    get offhandSlot(): ContainerSlot{return super.getComponent(EntityEquipmentInventoryComponent.componentId).getEquipmentSlot(EquipmentSlot.offhand);},
    get health(){return super.getComponent(EntityHealthComponent.componentId).currentValue;},
    set health(num: number){ 
        const h = super.getComponent(EntityHealthComponent.componentId);
        if(num < 0) h.resetToMaxValue();
        else h.setCurrentValue(num);
    }
});