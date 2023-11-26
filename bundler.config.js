const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack');
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

class BundlerConfig{
    /**@param {{[k: string]: string}} */
    constructor(modules,outFolder = "./dist/"){
        const WB = Object.create({
          mode: "production",
          target: ["es2020"],
          // ------ ^
          module: {
            rules: [
              {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
              },
            ],
          },
          resolve: {
            plugins: [new TsconfigPathsPlugin()],
            extensions: [".tsx", ".ts", ".js"]
          },
          optimization: {
            minimize: true,
            minimizer: [
              new TerserPlugin({
                include: /\.min\.js$/,
                terserOptions: {
                  format: {
                    comments: 'some',
                  }
                },
                extractComments: false
              }),
              new webpack.BannerPlugin(`This file was automatically generated.`),    
            ]  
          },
          output: {
            filename: '[name].js',
            path: path.resolve(__dirname,outFolder),
            library: {
              type: 'module'
            },
          },
          experiments: {
            outputModule: true,
          },
          externalsType: "module",
          externals: {
            "@minecraft/server": '@minecraft/server',
            "@minecraft/server-ui": '@minecraft/server-ui',
            "@minecraft/server-admin": '@minecraft/server-server-admin',
            "@minecraft/server-gametest": '@minecraft/server-gametest',
            "@minecraft/server-net": '@minecraft/server-net',
          }
      });
      WB.entry = {};
        const module_names = Object.getOwnPropertyNames(modules);
        for(const module_name  of module_names){
          WB.entry[module_name] = modules[module_name];
        }
        this.webpack = WB;
        this.modules = modules;
        this.outFolder = outFolder;
        this.module_names = module_names;
    }
}
module.exports = new BundlerConfig({
    "con-api":"./src/index.ts"
},"./dist/");