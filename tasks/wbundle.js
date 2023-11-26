const webpack = require("webpack");
const fs = require("fs");
const { generateDtsBundle } = require('dts-bundle-generator');
const config = require("../bundler.config");
const path = require("path");

async function WebpackCompile(webpack_config){
    console.log("[Webpack] Starting. . .");
    let run=()=>{};    
    const promise = new Promise(res=>run = res)
    const compiler = webpack(webpack_config,(err,stats)=>{
        run();
        if(err) {console.error(err,err.stack); process.exitCode = 1;}
        if(stats.hasErrors()){console.error("[Webpack][Error]",stats.compilation.errors.map(e=>e.message + " " + e.stack).join("\n")); process.exitCode = 1;}
        if(stats.hasWarnings()) console.warn("[Webpack][Warning]",stats.compilation.warnings.map(e=>e.message + " " + e.stack).join("\n"));
        console.log("[Webpack]-[Done]",`bundled via Webpack v${webpack.version} compiled in ${stats.endTime - stats.startTime}ms`);
    });
    await promise;
}
function DeclarationCompile(config){
    const options = {preferredConfigPath:"./tsconfig.json"};
    let data = "";
    for(const module_name of config.module_names)
    {
        console.log("[D.TS]","Generating declaration file for '" + module_name + ".js' . . .");
        const [types] = generateDtsBundle([{filePath:config.modules[module_name],
            failOnClass: false,
            output: {
              noBanner: true,
              exportReferencedTypes: true,
              inlineDeclareExternals: true,
            }}], options);
        if(fs.existsSync(path.dirname(config.modules[module_name]) + "/" +  path.basename(config.modules[module_name],".ts") + ".globals.d.ts"))
        {
            if(fs.statSync(path.dirname(config.modules[module_name]) + "/" +  path.basename(config.modules[module_name],".ts") + ".globals.d.ts").isFile()){
                data = fs.readFileSync(path.dirname(config.modules[module_name]) + "/" +  path.basename(config.modules[module_name],".ts") + ".globals.d.ts","utf8");
                data = data.split("//__startOfFile__//")[1]??data;
            }
        }
        fs.writeFileSync(path.resolve(config.outFolder,`./${module_name}.d.ts`), types + "\n" + data);
    }
}
async function RunAndCompile(){
    if(!fs.existsSync(config.outFolder)) {
        console.log("[Info] '" + config.outFolder + "' directory does not exist, creating new '" + config.outFolder + "' directory. . .");
        fs.mkdirSync(config.outFolder);
    }
    const task = WebpackCompile(config.webpack);
    DeclarationCompile(config);
    await task;
    console.log("[Info] Cleaning. . .");
    //await fs.promises.rm("./types",{force:true,recursive:true});
    console.log("[Info] Done. . .");
    //await CompileTypes();
}
RunAndCompile().catch(er=>{console.error(er,er.stack);  process.exitCode = 1;});


