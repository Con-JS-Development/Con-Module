/*! This file was automatically generated. */
import * as __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__ from "@minecraft/server";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Ng: () => (/* reexport */ BeforeEventSignal),
  gu: () => (/* reexport */ BeforeMinecraftEventSignal),
  Fi: () => (/* reexport */ CoordinateBase),
  zg: () => (/* reexport */ EventSignal),
  IX: () => (/* reexport */ MinecraftEventSignal),
  uX: () => (/* reexport */ OverTakes),
  AO: () => (/* reexport */ Vec3)
});

;// CONCATENATED MODULE: external "@minecraft/server"
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
const server_namespaceObject = x({ ["ContainerSlot"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.ContainerSlot, ["Entity"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.Entity, ["EntityEquipmentInventoryComponent"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityEquipmentInventoryComponent, ["EntityHealthComponent"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityHealthComponent, ["EntityInventoryComponent"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityInventoryComponent, ["EntityOnFireComponent"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EntityOnFireComponent, ["EquipmentSlot"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.EquipmentSlot, ["ItemStack"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.ItemStack, ["Player"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.Player, ["System"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.System, ["World"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.World, ["system"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.system, ["world"]: () => __WEBPACK_EXTERNAL_MODULE__minecraft_server_fb7572af__.world });
;// CONCATENATED MODULE: ./src/core/overTakes.ts
function OverTakes(prototype, object) {
    const prototypeOrigin = Object.setPrototypeOf(Object.defineProperties({}, Object.getOwnPropertyDescriptors(prototype)), Object.getPrototypeOf(prototype));
    Object.setPrototypeOf(object, prototypeOrigin);
    Object.defineProperties(prototype, Object.getOwnPropertyDescriptors(object));
    return prototypeOrigin;
}

;// CONCATENATED MODULE: ./src/core/Vec3.ts
const Vec3 = function Vec3(x = 0, y = 0, z = 0) {
    if (new.target) {
        this.x = Number(x);
        this.y = Number(y);
        this.z = Number(z);
    }
    else
        return Object.setPrototypeOf({ x: Number(x), y: Number(y), z: Number(z) }, Vec3.prototype);
};
Vec3.prototype = {
    add(vec) { return Vec3.add(this, vec); },
    subtract(vec) { return Vec3.subtract(this, vec); },
    multiply(num) { return Vec3.multiply(this, num); },
    get length() { return Vec3.magnitude(this); },
    get normalized() { return Vec3.normalize(this); },
    x: 0,
    y: 0,
    z: 0
};
Vec3.magnitude = function magnitude(vec) { return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z); };
Vec3.normalize = function normalize(vec) { const l = Vec3.magnitude(vec); return Vec3(vec.x / l, vec.y / l, vec.z / l); };
Vec3.cross = function crossProduct(a, b) { return Vec3(a.y * b.z - a.z * b.y, (a.z * b.x - a.x * b.z), a.x * b.y - a.y * b.x); };
Vec3.dot = function dot(a, b) { return a.x * b.x + a.y * b.y + a.z * b.z; };
Vec3.angleBetween = function angleBetween(a, b) { return Math.acos(Vec3.dot(a, b) / (Vec3.magnitude(a) * Vec3.magnitude(b))); };
Vec3.subtract = function subtract(a, b) { return Vec3(a.x - b.x, a.y - b.y, a.z - b.z); };
Vec3.add = function add(a, b) { return Vec3(a.x + b.x, a.y + b.y, a.z + b.z); };
Vec3.multiply = function multiply(vec, num) {
    if (typeof num == "number")
        return Vec3(vec.x * num, vec.y * num, vec.z * num);
    else
        return Vec3(vec.x * num.x, vec.y * num.y, vec.z * num.z);
};
Vec3.projection = function projection(a, b) { return Vec3.multiply(b, Vec3.dot(a, b) / (Math.pow((b.x * b.x + b.y * b.y + b.z * b.z), 2))); };
Vec3.rejection = function rejection(a, b) { return Vec3.subtract(a, Vec3.projection(a, b)); };
Vec3.reflect = function reflect(v, n) { return Vec3.subtract(v, Vec3.multiply(n, 2 * Vec3.dot(v, n))); };
Vec3.lerp = function lerp(a, b, t) { return Vec3.multiply(a, 1 - t).add(Vec3.multiply(b, t)); };
Vec3.distance = function distance(a, b) { return Vec3.magnitude(Vec3.subtract(a, b)); };
Vec3.from = function from(object) {
    if (Array.isArray(object))
        return Vec3(object[0], object[1], object[2]);
    const { x = 0, y = 0, z = 0 } = object !== null && object !== void 0 ? object : {};
    return Object.setPrototypeOf({ x: Number(x), y: Number(y), z: Number(z) }, Vec3.prototype);
};

;// CONCATENATED MODULE: ./src/core/CoordinateBase.ts

class CoordinateBase {
    static get default() { return defaultBase; }
    constructor(xVec, yVec, zVec) {
        if (Vec3.dot(xVec, yVec) > 1e-5)
            throw Error("Vectors are not perpendicular.");
        if (Vec3.dot(yVec, zVec) > 1e-5)
            throw Error("Vectors are not perpendicular.");
        if (Vec3.dot(xVec, zVec) > 1e-5)
            throw Error("Vectors are not perpendicular.");
        this._x_ = xVec;
        this._y_ = yVec;
        this._z_ = zVec;
    }
    set x(vec) { this._x_ = Vec3.from(vec); }
    set y(vec) { this._y_ = Vec3.from(vec); }
    set z(vec) { this._z_ = Vec3.from(vec); }
    get x() { return Vec3.from(this._x_); }
    get y() { return Vec3.from(this._y_); }
    get z() { return Vec3.from(this._z_); }
    get inverted() { return CoordinateBase.invert(this); }
    get determinant() { return CoordinateBase.getDeterminant(this); }
    static invert(base) {
        const { x: bx, y: by, z: bz } = base, iDet = 1 / CoordinateBase.getDeterminant(base);
        return new CoordinateBase(Vec3((by.y * bz.z - bz.y * by.z) * iDet, (bx.z * bz.y - bx.y * bz.z) * iDet, (bx.y * by.z - bx.z * by.y) * iDet), Vec3((by.z * bz.x - by.x * bz.z) * iDet, (bx.x * bz.z - bx.z * bz.x) * iDet, (by.x * bx.z - bx.x * by.z) * iDet), Vec3((by.x * bz.y - bz.x * by.y) * iDet, (bz.x * bx.y - bx.x * bz.y) * iDet, (bx.x * by.y - by.x * bx.y) * iDet));
    }
    static getDeterminant({ x: bx, y: by, z: bz }) {
        return bx.x * (by.y * bz.z - bz.y * by.z) -
            bx.y * (by.x * bz.z - by.z * bz.x) +
            bx.z * (by.x * bz.y - by.y * bz.x);
    }
    static applyBaseOnVector({ x: bx, y: by, z: bz }, vec) {
        return Vec3(vec.x * bx.x + vec.y * by.x + vec.z * bz.x, vec.x * bx.y + vec.y * by.y + vec.z * bz.y, vec.x * bx.z + vec.y * by.z + vec.z * bz.z);
    }
    static *applyBaseOnVectors({ x: bx, y: by, z: bz }, vecs) {
        for (const vec of vecs)
            yield Vec3(vec.x * bx.x + vec.y * by.x + vec.z * bz.x, vec.x * bx.y + vec.y * by.y + vec.z * bz.y, vec.x * bx.z + vec.y * by.z + vec.z * bz.z);
    }
}
//@ts-ignore
CoordinateBase.prototype._x_ = Vec3(1, 0, 0);
//@ts-ignore
CoordinateBase.prototype._y_ = Vec3(0, 1, 0);
//@ts-ignore
CoordinateBase.prototype._z_ = Vec3(0, 0, 1);
const defaultBase = Object.setPrototypeOf({ inverted: CoordinateBase.prototype.inverted }, CoordinateBase.prototype);

;// CONCATENATED MODULE: ./src/core/EventSignal.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Represents an event signal.
 * @template - The types of the arguments passed to the event handlers.
 */
class EventSignal {
    constructor() {
        this._methods_ = {};
        this._symbol_ = Symbol('session');
    }
    get subscribers() { return Object.getOwnPropertySymbols(this._methods_).length; }
    ;
    /**
     * Triggers the event signal.
     * @param params - The arguments to pass to the event handlers.
     * @returns A promise that resolves with the number of successful event handlers.
     */
    trigger(...params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(Object.getOwnPropertySymbols(this._methods_).map(sym => {
                return (() => __awaiter(this, void 0, void 0, function* () { return yield this._methods_[sym](...params); }))().catch(globalThis["console"].error);
            }));
        });
    }
    /**
     * Subscribes to the event signal.
     * @template  k - The type of the event handler function.
     * @param method - The event handler function to subscribe.
     * @returns The subscribed event handler function.
     */
    subscribe(method) {
        const t = typeof method;
        if (t !== "function" && t !== "object")
            throw new TypeError(`Expected a function or an object, but got ${t}.`);
        if (!Object.prototype.hasOwnProperty.call(method, this._symbol_)) {
            const key = Symbol('key');
            method[this._symbol_] = key;
            this._methods_[key] = method;
            return method;
        }
        ;
    }
    /**
     * Unsubscribes from the event signal.
     * @template k - The type of the event handler function.
     * @param method - The event handler function to unsubscribe.
     * @returns The unsubscribed event handler function.
     */
    unsubscribe(method) {
        const t = typeof method;
        if (t !== "function" && t !== "object")
            throw new TypeError(`Expected a function or an object, but got ${t}.`);
        if (Object.prototype.hasOwnProperty.call(method, this._symbol_)) {
            delete this._methods_[method[this._symbol_]];
            delete method[this._symbol_];
            return method;
        }
        ;
    }
}
/**
 * Represents an before event signal.
 * @template - The types of the arguments passed to the event handlers.
 */
class BeforeEventSignal extends EventSignal {
    /**
    * Triggers the event signal.
    * @param params - The arguments to pass to the event handlers.
    * @returns A promise that resolves with the number of successful event handlers.
    */
    triggerCancelable(cancelation, ...params) {
        let isCanceled = false;
        this.setCancel = (canceled) => isCanceled = canceled !== null && canceled !== void 0 ? canceled : true;
        const promises = super.trigger(...params);
        //@ts-ignore
        delete this.setCancel;
        if (isCanceled)
            cancelation();
        return promises;
    }
    setCancel(cancel = true) {
        throw TypeError("This event is not cancelable");
    }
}
class MinecraftEventSignal extends EventSignal {
    constructor(subscribe, unsubscribe) {
        super();
        this._parent_sub_ = subscribe;
        this._parent_unsub_ = unsubscribe;
        this._isSubscribed_ = false;
    }
    subscribe(method) {
        const a = super.subscribe(method);
        if (!this._isSubscribed_ && this.subscribers > 0) {
            this._parent_sub_(this);
            this._isSubscribed_ = true;
        }
        return a;
    }
    unsubscribe(method) {
        const a = super.unsubscribe(method);
        if (this.subscribers <= 0 && this._isSubscribed_) {
            this._parent_unsub_(this);
        }
        return a;
    }
    static bindTo(event, eventDataConverter, ...options) {
        const eve = (param) => {
            //@ts-ignore
            ts.trigger(...eventDataConverter(param));
        };
        const ts = new MinecraftEventSignal((es) => {
            event.subscribe(eve, ...options);
        }, (es) => {
            event.unsubscribe(eve);
        });
    }
}
class BeforeMinecraftEventSignal extends BeforeEventSignal {
    constructor(subscribe, unsubscribe) {
        super();
        this._parent_sub_ = subscribe;
        this._parent_unsub_ = unsubscribe;
        this._isSubscribed_ = false;
    }
    subscribe(method) {
        const a = super.subscribe(method);
        if (!this._isSubscribed_ && this.subscribers > 0) {
            this._parent_sub_(this);
            this._isSubscribed_ = true;
        }
        return a;
    }
    unsubscribe(method) {
        const a = super.unsubscribe(method);
        if (this.subscribers <= 0 && this._isSubscribed_) {
            this._parent_unsub_(this);
        }
        return a;
    }
    static bindTo(event, eventDataConverter, ...options) {
        const eve = (param) => {
            //@ts-ignore
            ts.triggerCancelable(() => param.cancel = true, ...eventDataConverter(param));
        };
        const ts = new BeforeMinecraftEventSignal((es) => {
            event.subscribe(eve, ...options);
        }, (es) => {
            event.unsubscribe(eve);
        });
    }
}

;// CONCATENATED MODULE: ./src/core/index.ts





;// CONCATENATED MODULE: ./src/con-api/System.ts


const overworld = server_namespaceObject.world.getDimension("overworld");
;
OverTakes(server_namespaceObject.System.prototype, {
    get onlinePlayers() { return server_namespaceObject.world.getPlayers(); },
    get nextTick() { return new Promise(res => { var _a; return (_a = this.run) === null || _a === void 0 ? void 0 : _a.call(this, () => { var _a; return res(((_a = this.currentTick) !== null && _a !== void 0 ? _a : 0) + 1); }); }); },
    runCommand(cmd, target) { return (target !== null && target !== void 0 ? target : overworld).runCommand(cmd); },
    runCommandAsync(cmd, target) { return (target !== null && target !== void 0 ? target : overworld).runCommandAsync(cmd); },
    delay(ticks = 0) {
        return new Promise(res => {
            server_namespaceObject.system.runTimeout(() => {
                res(server_namespaceObject.system.currentTick + 1);
            }, ticks < 1 ? 0 : ticks - 1);
        });
    }
});

;// CONCATENATED MODULE: ./src/con-api/World.ts


const _overworld_ = server_namespaceObject.world.getDimension("overworld");
const _nether_ = server_namespaceObject.world.getDimension("nether");
const _theEnd_ = server_namespaceObject.world.getDimension("the_end");
;
OverTakes(server_namespaceObject.World.prototype, {
    get overworld() { return _overworld_; },
    get nether() { return _nether_; },
    get theEnd() { return _theEnd_; },
    get coordinateBase() { return CoordinateBase.default; }
});

;// CONCATENATED MODULE: ./src/con-api/Player.ts


OverTakes(server_namespaceObject.Player.prototype, {
    toString() { return `[${super.name}: ${super.id}]`; }
});

;// CONCATENATED MODULE: ./src/con-api/Entity.ts


OverTakes(server_namespaceObject.Entity.prototype, {
    toString() { return `[${super.typeId}: ${super.id}]`; },
    get entityLocation() { return Vec3.from(this.location); },
    getHeadLocation() { return Vec3.from(super.getHeadLocation()); },
    getViewDirection() { return Vec3.from(super.getViewDirection()); },
    getVelocity() { return Vec3.from(super.getVelocity()); },
    setVelocity(velocity) {
        super.clearVelocity();
        super.applyImpulse(velocity);
        return this;
    },
    get isBurning() { return super.hasComponent(server_namespaceObject.EntityOnFireComponent.componentId); },
    get inventory() { return super.getComponent(server_namespaceObject.EntityInventoryComponent.componentId); },
    get container() { return super.getComponent(server_namespaceObject.EntityInventoryComponent.componentId).container; },
    get equipment() { return super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId); },
    get mainhandItem() { return super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).getEquipment(server_namespaceObject.EquipmentSlot.mainhand); },
    set mainhandItem(item) {
        if (item instanceof server_namespaceObject.ContainerSlot)
            super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).setEquipment(server_namespaceObject.EquipmentSlot.mainhand, item.getItem());
        else if (item instanceof server_namespaceObject.ItemStack)
            super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).setEquipment(server_namespaceObject.EquipmentSlot.mainhand, item);
    },
    get mainhandSlot() { return super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).getEquipmentSlot(server_namespaceObject.EquipmentSlot.mainhand); },
    get offhandItem() { return super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).getEquipment(server_namespaceObject.EquipmentSlot.offhand); },
    set offhandItem(item) {
        if (item instanceof server_namespaceObject.ContainerSlot)
            super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).setEquipment(server_namespaceObject.EquipmentSlot.offhand, item.getItem());
        else if (item instanceof server_namespaceObject.ItemStack)
            super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).setEquipment(server_namespaceObject.EquipmentSlot.offhand, item);
    },
    get offhandSlot() { return super.getComponent(server_namespaceObject.EntityEquipmentInventoryComponent.componentId).getEquipmentSlot(server_namespaceObject.EquipmentSlot.offhand); },
    get health() { return super.getComponent(server_namespaceObject.EntityHealthComponent.componentId).currentValue; },
    set health(num) {
        const h = super.getComponent(server_namespaceObject.EntityHealthComponent.componentId);
        if (num < 0)
            h.resetToMaxValue();
        else
            h.setCurrentValue(num);
    }
});

;// CONCATENATED MODULE: ./src/con-api/index.ts






var __webpack_exports__BeforeEventSignal = __webpack_exports__.Ng;
var __webpack_exports__BeforeMinecraftEventSignal = __webpack_exports__.gu;
var __webpack_exports__CoordinateBase = __webpack_exports__.Fi;
var __webpack_exports__EventSignal = __webpack_exports__.zg;
var __webpack_exports__MinecraftEventSignal = __webpack_exports__.IX;
var __webpack_exports__OverTakes = __webpack_exports__.uX;
var __webpack_exports__Vec3 = __webpack_exports__.AO;
export { __webpack_exports__BeforeEventSignal as BeforeEventSignal, __webpack_exports__BeforeMinecraftEventSignal as BeforeMinecraftEventSignal, __webpack_exports__CoordinateBase as CoordinateBase, __webpack_exports__EventSignal as EventSignal, __webpack_exports__MinecraftEventSignal as MinecraftEventSignal, __webpack_exports__OverTakes as OverTakes, __webpack_exports__Vec3 as Vec3 };
