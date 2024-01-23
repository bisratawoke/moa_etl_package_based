"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var config = null;
if (((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.trim()) === "development") {
    config = JSON.parse(fs.readFileSync(path.resolve(__dirname, "devConfig.json")).toString());
}
else if (((_b = process.env.NODE_ENV) === null || _b === void 0 ? void 0 : _b.trim()) === "production") {
    config = JSON.parse(fs.readFileSync(path.resolve(__dirname, "prodConfig.json")).toString());
}
else {
    console.error('Unsupported environment. Set NODE_ENV to "development" or "production".');
    process.exit(1);
}
exports.default = config;
