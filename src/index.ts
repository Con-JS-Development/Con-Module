import { loadTime } from "./initialization";
//export * from "./node_module_reexport/index";
export * from "./core/index";
export * from "./extensions/index";
export type * from "types";
import "./index.globals";

console.warn("§h§lCon-API Loaded in  ~" + (Date.now() - loadTime) + "ms");