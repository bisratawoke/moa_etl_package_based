"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var moa_config_1 = require("moa_config");
var pool = new pg_1.Pool({
    host: moa_config_1.default.PSNP_PW_DB_HOST,
    port: moa_config_1.default.PSNP_PW_DB_PORT,
    password: moa_config_1.default.PSNP_PW_DB_PASSWORD,
    user: moa_config_1.default.PSNP_PW_DB_USER,
    database: moa_config_1.default.PSNP_PW_DB_NAME,
});
exports.default = pool;
