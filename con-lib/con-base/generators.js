export const GeneratorFunction = Object.getPrototypeOf(function* () { });
export const GeneratorFunctionConstructor = GeneratorFunction.constructor;
export const Generator = GeneratorFunction.prototype;
export const AsyncGeneratorFunction = Object.getPrototypeOf(async function* () { });
export const AsyncGeneratorFunctionConstructor = AsyncGeneratorFunction.constructor;
export const AsyncGenerator = AsyncGeneratorFunction.prototype;
export const AsyncFunctionConstructor = Object.getPrototypeOf(async function () { }).constructor;

GeneratorFunction.prototype[Symbol.isGenerator] = true;
GeneratorFunction.isGenerator = function isGenerator(generator) { return (generator[Symbol.isGenerator] === true); }
AsyncGeneratorFunction.prototype[Symbol.isAsyncGenerator] = true;
AsyncGeneratorFunction.isAsyncGenerator = function isAsyncGenerator(generator) { return (generator[Symbol.isAsyncGenerator] === true); }