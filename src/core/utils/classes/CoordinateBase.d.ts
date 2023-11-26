import { Vector3 } from "@minecraft/server";
import { Vec3 } from "./Vec3";

export class CoordinateBase
{
	static readonly default: CoordinateBase;
	constructor(xVec: Vector3, yVec: Vector3, zVec: Vector3)
    set x(vec: Vector3);
    set y(vec: Vector3);
    set z(vec: Vector3);
    get x(): Vec3
    get y(): Vec3
    get z(): Vec3
    readonly inverted: CoordinateBase
    readonly isPerpendicular: boolean
    readonly determinant: Number
    passLocalCoordinate(vec: Vector3): Vec3
    passLocalCoordinates(vecs: Iterable<Vector3>): Generator<Vec3>
    static invert(base: CoordinateBase): CoordinateBase
    static getDeterminant({x: bx, y: by, z: bz}: CoordinateBase): Number
    static applyBaseOnVector({x:bx, y:by, z:bz}: CoordinateBase, vec: Vector3): Vec3
    static applyBaseOnVectors({x:bx, y:by, z:bz}: CoordinateBase, vectors: Iterable<Vector3>): Generator<Vec3>;
    static isPerpendicular(base: CoordinateBase): boolean
    static fromZVec(zVec: Vector3): CoordinateBase;
}