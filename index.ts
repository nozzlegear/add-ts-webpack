#!/usr/bin/env node

import * as path from "path";
import * as fileSystem from "fs";
import * as program from "commander";
const pkg = require(path.join(__dirname, "../package.json"));
const cwd = process.cwd();

program.version(pkg.version)
    .option("-f, --filepath [filepath]", "KeePass filepath")
    .usage("add-ts-webpack -f 'Path/To/File'")
    .parse(process.argv);

let filepath: string = path.join(cwd, program["filepath"] || "./package.json");
let fileDir: string = path.dirname(filepath);

if (!fileSystem.existsSync(filepath)) {
    console.error(`No package.json file was found at ${filepath}.`);
    program.help();
}

let packageContents: {devDependencies?: Object, scripts?: Object};

try {
    packageContents = JSON.parse(fileSystem.readFileSync(filepath).toString());
} catch (e) {
    console.error(e);

    throw new Error(`Failed to parse package.json contents from ${filepath}`);
}

const devDependencies = Object.assign({}, {
    "autoprefixer": "^6.3.7",
    "awesome-typescript-loader": "^2.0.3",
    "babel-cli": "^6.9.0",
    "babel-loader": "^6.2.4",
    "babel-plugin-lodash": "^3.1.5",
    "babel-plugin-transform-regenerator": "^6.11.4",
    "babel-polyfill": "^6.9.1",
    "babel-preset-es2015": "^6.9.0",
    "babel-preset-stage-3": "^6.11.0",
    "css-loader": "^0.23.1",
    "file-loader": "^0.9.0",
    "image-webpack-loader": "^2.0.0",
    "json-loader": "^0.5.4",
    "lodash-webpack-plugin": "^0.9.2",
    "postcss-loader": "^0.9.1",
    "precss": "^1.4.0",
    "sass-loader": "^4.0.0",
    "script-loader": "^0.7.0",
    "source-map-loader": "^0.1.5",
    "style-loader": "^0.13.1",
    "typescript": "^2.0.0",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1"
}, packageContents.devDependencies);
const scripts = Object.assign({}, {
    "tsbuild" : "webpack",
    "tswatch" : "webpack-dev-server --inline --hot --port 9002"
}, packageContents.scripts);
packageContents = Object.assign({}, packageContents, {devDependencies, scripts});

// Write the updated package.json back to the file
fileSystem.writeFileSync(filepath, JSON.stringify(packageContents, null, 2));

// Read the webpack.sample.config.js and copy it to the target directory
const webpackConfig = fileSystem.readFileSync(path.join(__dirname,"../webpack.sample.config.js"));
fileSystem.writeFileSync(path.join(fileDir, "webpack.sample.config.js"), webpackConfig);

console.log(`Successfully added webpack configuration and dependencies to project at ${fileDir}.`);
console.log("");
console.log("Remember to rename webpack.sample.config.js to webpack.sample.js and run npm install!");
console.log("");