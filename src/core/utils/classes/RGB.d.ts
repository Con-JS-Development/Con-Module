export const RGB: RGBConstructor;
declare interface RGBConstructor{
    new (r: number, g: number, b: number, a?: number): RGB
    (r: number, g: number, b: number, a?: number): RGB
    fromGray(interity: number): RGB
    readonly white: RGB
}
declare interface RGB{
    r:number
    g:number
    b:number
    a?:number
    red: number
    green: number
    blue: number
    alpha?: number
}