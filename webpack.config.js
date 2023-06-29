const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack');
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: {
    "con-api": "./src/con-api/index.ts",
  },
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
    path: path.resolve(__dirname, "dist"),
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
}