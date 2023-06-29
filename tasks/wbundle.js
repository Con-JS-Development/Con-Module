const webpack = require("webpack");
const ts = require('typescript');
const fs = require("fs");
const { generateDtsBundle } = require('dts-bundle-generator');
const config = require("../bundler.config");

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
    for(const module_name of config.module_names)
    {
        console.log("[D.TS]","Generating declaration file for '" + module_name + ".js' . . .");
        const [types] = generateDtsBundle([{filePath:config.modules[module_name]}], options);
        fs.writeFileSync(`./dist/${module_name}.d.ts`, types);
    }
}
async function RunAndCompile(){
    if(!fs.existsSync("./dist")) {
        console.log("[Info] './dist' directory does not exist, creating new './dist' directory. . .");
        fs.mkdirSync("./dist");
    }
    DeclarationCompile(config);
    await WebpackCompile(config.webpack);
    console.log("[Info] Cleaning. . .");
    //await fs.promises.rm("./types",{force:true,recursive:true});
    console.log("[Info] Done. . .");
    //await CompileTypes();
}
RunAndCompile().catch(er=>{console.error(er,er.stack);  process.exitCode = 1;});


