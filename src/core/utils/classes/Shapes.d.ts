import { Vector3 } from "@minecraft/server";
import { Vec3 } from "./Vec3";
import { CoordinateBase } from "./CoordinateBase";
import type { Vector3Optional } from "types";

type axis = "y" | "z" | "x";

export const GeometryGenerator: {
    change(x: axis,y:axis,z:axis): ShapeGenerator
    from(iterable: Iterable<Vector3>): ShapeGenerator
    //square(from: Vector3Optional<Vector3,"y">, to: {x?:number, z?:number}): ShapeGenerator
    circle(radius: number, rMin?: number, y?: number): ShapeGenerator
    cylinder(radius: number, height: number, rMin?: number): ShapeGenerator
    cubeFromTo(from: Vector3,to: Vector3): ShapeGenerator
    cubeFromSize(size: Vector3): ShapeGenerator
    sphereRadius(radius: number, radiusInside?: number): ShapeGenerator
    elipsoide(vec: Vector3): ShapeGenerator
    pathFromTo(from: Vector3, to: Vector3): ShapeGenerator
    pathFromDirection(direction: Vector3): ShapeGenerator
    spread(depth: number,fluidDirection?: Vector3[], mode?: "push" | "unshift"): ShapeGenerator<Vec3,unknown,boolean|undefined>
    fluid(depth: number, mode?: "push" | "unshift"): ShapeGenerator<Vec3,unknown,boolean|undefined>
    soak(depth: number): ShapeGenerator<Vec3,unknown,boolean|undefined>
}
export declare interface ShapeGenerator<Vec extends Vector3 = Vec3,TReturn = unknown, TNext = unknown> extends Generator<Vec,TReturn,TNext>{
    add(vec: Vector3): ShapeGenerator<Vec3,TReturn,TNext>;
    offset(vec: Vector3): ShapeGenerator<Vec3,TReturn,TNext>;
    multiply(vec: number | Vector3): ShapeGenerator<Vec3,TReturn,TNext>;
    invert(): ShapeGenerator<Vec3,TReturn,TNext>;
    applyBase(base: CoordinateBase): ShapeGenerator<Vec3,TReturn,TNext>;
    normilize(): ShapeGenerator<Vec3,TReturn,TNext>;
    projection(vec: Vector3): ShapeGenerator<Vec3,TReturn,TNext>;
    rejection(vec: Vector3): ShapeGenerator<Vec3,TReturn,TNext>;
    reflect(vec: Vector3): ShapeGenerator<Vec3,TReturn,TNext>;
    cross(vec: Vector3): ShapeGenerator<Vec3,TReturn,TNext>;
    readonly normilized: ShapeGenerator<Vec3,TReturn,TNext>;
    readonly inverted: ShapeGenerator<Vec3,TReturn,TNext>;
    readonly nextValue: ReturnType<Generator<Vec3,TReturn,TNext>["next"]>;
}
export const ShapeGeneratorPrototype: ShapeGenerator;
export const Shapes: {[K in keyof typeof GeometryGenerator]: K extends string?K:never};