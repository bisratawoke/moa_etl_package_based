"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var config_1 = require("config");
var pool = new pg_1.Pool({
    host: config_1.default.NRLAIS_DB_HOST,
    port: config_1.default.NRLAIS_DB_PORT,
    password: config_1.default.NRLAIS_DB_PASSWORD,
    user: config_1.default.NRLAIS_DB_USER,
    database: config_1.default.NRLAIS_DB_NAME,
});
var client = await pool.connect();
exports.default = client;
