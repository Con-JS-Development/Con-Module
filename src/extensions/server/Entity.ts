import { Vector3, Entity,
    EntityOnFireComponent, 
    EntityInventoryComponent, 
    EntityEquippableComponent, 
    EquipmentSlot, ContainerSlot, ItemStack, EntityHealthComponent, Vector2, Block } from "@minecraft/server";
import { CoordinateBase, OverTakes, Vec3 } from "core";
import * as New from "../New";

declare module "@minecraft/server" {
    interface Entity extends Vector3{
        readonly x: number;
        readonly y: number;
        readonly z: number;
        readonly rotation: Vector2;
        readonly entityLocation: Vec3;
        readonly headLocation: Vec3;
        readonly velocity: Vec3;
        readonly isBurning: boolean;
        readonly inventory: EntityInventoryComponent;
        readonly container: Container;
        readonly equipment: EntityEquippableComponent;
        readonly mainhandSlot: ContainerSlot;
        readonly offhandSlot: ContainerSlot;
        readonly viewDirection: Vec3;
        readonly viewBase: CoordinateBase;
        readonly viewBlock?: Block;
        readonly viewEntity: Entity;
        readonly viewEntities: Entity[];
        readonly blockRayCastLocation?: Vec3;
        readonly block: Block;
        get mainhandItem(): ItemStack;
        set mainhanditem(item: ItemStack | ContainerSlot);
        get offhandItem(): ItemStack;
        set offhandItem(item: ItemStack | ContainerSlot);
        get health(): number;
        set health(current: number);
        toString(): string;
        getHeadLocation(): Vec3;
        getViewDirection(): Vec3;
        getVelocity(): Vec3;
        setVelocity(velocity: Vector3): void;
        getBlockFromViewDirection(options?: BlockRaycastOptions): BlockRaycastHit
    }
}
Object.setPrototypeOf(Entity.prototype, Vec3.prototype);
OverTakes(Entity.prototype, {
    toString(){return `[${this.typeId}: ${this.id}]`},
    getBlockFromViewDirection(options){
        const data = super.getBlockFromViewDirection(...[options]);
        if(data) return Object.setPrototypeOf(data,New.BlockRaycastHit.prototype);
    },
    get viewBase(){return CoordinateBase.fromZVec(super.getViewDirection());},
    get viewDirection(): Vec3{return Vec3.from(super.getViewDirection());},
    get viewBlock(): Block {return super.getBlockFromViewDirection({maxDistance: 8.75})?.block;},
    get viewEntities(): Entity[] {return super.getEntitiesFromViewDirection({maxDistance: 8.75}).map((hit: any)=>hit.entity);},
    get viewEntity(): Entity {return super.getEntitiesFromViewDirection({maxDistance: 8.75})[0]?.entity;},
    get blockRayCastLocation() {const data = super.getBlockFromViewDirection({maxDistance: 8}) as New.BlockRaycastHit; if(data) return Vec3.add(data.block,data.faceLocation);},
    get x(){return super.location.x;},
    get y(){return super.location.y;},
    get z(){return super.location.z;},
    get entityLocation(): Vec3{return Vec3.from(super.location);},
    get location(): Vec3{return Vec3.from(super.location);},
    get headLocation(): Vec3{return Vec3.from(super.getHeadLocation());},
    get velocity(): Vec3{return Vec3.from(super.getVelocity());},
    get rotation(): Vector2{return super.getRotation();},
    get block(){return super.dimension.getBlock(super.location);},
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
    get equipment(){return super.getComponent(EntityEquippableComponent.componentId);},
    get mainhandItem(): ItemStack{return super.getComponent(EntityEquippableComponent.componentId).getEquipment(EquipmentSlot.Mainhand)},
    set mainhandItem(item: ItemStack | ContainerSlot){
        if(item instanceof ContainerSlot) super.getComponent(EntityEquippableComponent.componentId).setEquipment(EquipmentSlot.Mainhand,item.getItem());
        else if(item instanceof ItemStack) super.getComponent(EntityEquippableComponent.componentId).setEquipment(EquipmentSlot.Mainhand,item);
    },
    get mainhandSlot(): ContainerSlot{return super.getComponent(EntityEquippableComponent.componentId).getEquipmentSlot(EquipmentSlot.Mainhand);},
    get offhandItem(): ItemStack{return super.getComponent(EntityEquippableComponent.componentId).getEquipment(EquipmentSlot.Offhand)},
    set offhandItem(item: ItemStack | ContainerSlot){
        if(item instanceof ContainerSlot) super.getComponent(EntityEquippableComponent.componentId).setEquipment(EquipmentSlot.Offhand,item.getItem());
        else if(item instanceof ItemStack) super.getComponent(EntityEquippableComponent.componentId).setEquipment(EquipmentSlot.Offhand,item);
    },
    get offhandSlot(): ContainerSlot{return super.getComponent(EntityEquippableComponent.componentId).getEquipmentSlot(EquipmentSlot.Offhand);},
    get health(){return super.getComponent(EntityHealthComponent.componentId).currentValue;},
    set health(num: number){ 
        const h = super.getComponent(EntityHealthComponent.componentId);
        if(num < 0) h.resetToMaxValue();
        else h.setCurrentValue(num);
    }
});