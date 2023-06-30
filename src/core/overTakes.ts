export function OverTakes<b extends object>(prototype: b, object: Partial<b>): b{
    const prototypeOrigin = Object.setPrototypeOf(Object.defineProperties({},Object.getOwnPropertyDescriptors(prototype)),Object.getPrototypeOf(prototype));
    Object.setPrototypeOf(object, prototypeOrigin);
    Object.defineProperties(prototype, Object.getOwnPropertyDescriptors(object));
    return prototypeOrigin;
}