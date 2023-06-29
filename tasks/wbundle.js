const webpack = require("webpack");

console.log("[Info] Starting. . .");
const compiler = webpack(require("../webpack.config"),(err,stats)=>{
    if(err) console.error(err,err.stack);
    if(stats.hasErrors()) console.error("[Error]",stats.compilation.errors.map(e=>e.message + " " + e.stack).join("\n"));
    if(stats.hasWarnings()) console.warn("[Warning]",stats.compilation.warnings.map(e=>e.message + " " + e.stack).join("\n"));
    console.log("[Done]",`bundled via Webpack v${webpack.version} compiled in ${stats.endTime - stats.startTime}ms`)
});