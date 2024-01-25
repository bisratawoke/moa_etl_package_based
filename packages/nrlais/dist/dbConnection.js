"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var config_1 = require("config");
var dbConn = /** @class */ (function () {
    function dbConn() {
        this.pool = new pg_1.Pool({
            host: config_1.default.NRLAIS_DB_HOST,
            port: config_1.default.NRLAIS_DB_PORT,
            password: config_1.default.NRLAIS_DB_PASSWORD,
            user: config_1.default.NRLAIS_DB_USER,
            database: config_1.default.NRLAIS_DB_NAME,
        });
        this.connect();
    }
    dbConn.prototype.connect = function () {
        var _this = this;
        this.pool
            .connect()
            .then(function (con) {
            _this.client = con;
            _this.client.query("select 1", function (err, result) {
                if (err) {
                    console.log("====== error in connect ======");
                    console.log(err);
                }
                else {
                    console.log(result.rows);
                }
            });
        })
            .catch(function (err) {
            console.log("=== error connecting to database ====");
            console.log(err);
        });
    };
    return dbConn;
}());
exports.default = new dbConn();
// const pool = new Pool({
//   host: config.NRLAIS_DB_HOST,
//   port: config.NRLAIS_DB_PORT,
//   password: config.NRLAIS_DB_PASSWORD,
//   user: config.NRLAIS_DB_USER,
//   database: config.NRLAIS_DB_NAME,
// });
// const client = await pool.connect();
// export default client;
