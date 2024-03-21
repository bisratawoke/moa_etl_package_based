"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.etl_kebele = exports.etl_woreda = exports.etl_zone = exports.etl_region = exports.etl_llup = exports.insertIntoElastic = void 0;
var pg_1 = require("pg");
var moa_config_1 = require("moa_config");
var transform_1 = require("./transform");
var axios_1 = require("axios");
function insertIntoElastic(indexName, payload, id) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("".concat(moa_config_1.default.ELASTIC_URL, "/").concat(indexName, "/_doc/").concat(id), payload, {
                            auth: {
                                username: moa_config_1.default.ELASTIC_USERNAME,
                                password: moa_config_1.default.ELASTIC_PASSWORD,
                            },
                        })];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1.response.data);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.insertIntoElastic = insertIntoElastic;
function getCountOfLLUPKebeles(indexName) {
    return __awaiter(this, void 0, void 0, function () {
        var response, count, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("".concat(moa_config_1.default.ELASTIC_URL, "/").concat(indexName, "/_count"), {
                            auth: {
                                username: moa_config_1.default.ELASTIC_USERNAME,
                                password: moa_config_1.default.ELASTIC_PASSWORD,
                            },
                        })];
                case 1:
                    response = _a.sent();
                    count = response.data.count;
                    return [2 /*return*/, count];
                case 2:
                    error_2 = _a.sent();
                    console.log("============ in get count of llup kebeles =================");
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getListOfLLUPKebeles(indexName) {
    return __awaiter(this, void 0, void 0, function () {
        var count, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getCountOfLLUPKebeles("llup_data_report_with_pdf_ref")];
                case 1:
                    count = _a.sent();
                    return [4 /*yield*/, axios_1.default.get("".concat(moa_config_1.default.ELASTIC_URL, "/").concat(indexName, "/_search?size=").concat(count), {
                            auth: {
                                username: moa_config_1.default.ELASTIC_USERNAME,
                                password: moa_config_1.default.ELASTIC_PASSWORD,
                            },
                        })];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result.data.hits.hits];
                case 3:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function etl_llup() {
    return __awaiter(this, void 0, void 0, function () {
        var llupKebeles, x, query, response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, getListOfLLUPKebeles("llup_data_report_with_pdf_ref")];
                case 1:
                    llupKebeles = _a.sent();
                    x = 0;
                    _a.label = 2;
                case 2:
                    if (!(x < llupKebeles.length)) return [3 /*break*/, 5];
                    query = {
                        query: {
                            match: {
                                "kebele_name.keyword": llupKebeles[x]["_source"]["kebele_name"],
                            },
                        },
                    };
                    return [4 /*yield*/, axios_1.default.post("".concat(moa_config_1.default.ELASTIC_URL, "/nrlais_kebeles/_search"), query, {
                            auth: {
                                username: moa_config_1.default.ELASTIC_USERNAME,
                                password: moa_config_1.default.ELASTIC_PASSWORD,
                            },
                        })];
                case 3:
                    response = _a.sent();
                    console.log(response.data);
                    _a.label = 4;
                case 4:
                    x++;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.etl_llup = etl_llup;
function etl_region() {
    return __awaiter(this, void 0, void 0, function () {
        var pool, conn, response, x, trans_record, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    pool = new pg_1.Pool({
                        host: moa_config_1.default.NRLAIS_DB_HOST,
                        port: moa_config_1.default.NRLAIS_DB_PORT,
                        password: moa_config_1.default.NRLAIS_DB_PASSWORD,
                        user: moa_config_1.default.NRLAIS_DB_USER,
                        database: moa_config_1.default.NRLAIS_DB_NAME,
                    });
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query("\n        select \n          id as region_id,\n          csaregionnameeng as region_name,\n          csaregionid as region_code,\n          ST_AsGeoJson(ST_Transform(geometry,4326)) as location\n        from nrlais_sys.t_regions;\n    ")];
                case 2:
                    response = _a.sent();
                    x = 0;
                    _a.label = 3;
                case 3:
                    if (!(x < response.rows.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, transform_1.removeNullLocation)(response.rows[x])];
                case 4:
                    trans_record = _a.sent();
                    return [4 /*yield*/, insertIntoElastic("nrlais_regions", trans_record, trans_record["region_id"])];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    x++;
                    return [3 /*break*/, 3];
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_5 = _a.sent();
                    console.log(error_5);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.etl_region = etl_region;
function etl_zone() {
    return __awaiter(this, void 0, void 0, function () {
        var pool, conn, response, x, trans_record, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    pool = new pg_1.Pool({
                        host: moa_config_1.default.NRLAIS_DB_HOST,
                        port: moa_config_1.default.NRLAIS_DB_PORT,
                        password: moa_config_1.default.NRLAIS_DB_PASSWORD,
                        user: moa_config_1.default.NRLAIS_DB_USER,
                        database: moa_config_1.default.NRLAIS_DB_NAME,
                    });
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query("\n        select\n          t_zone.id as zone_id, \n          t_zone.nrlais_zoneid as zone_code,\n          t_region.csaregionid as region_code,\n          t_region.csaregionnameeng as region_name,\n          t_zone.csazonenameeng as zone_name,\n          ST_AsGeoJson(ST_Transform(t_zone.geometry,4326)) as location\n          from nrlais_sys.t_zones as t_zone\n          inner join nrlais_sys.t_regions as t_region on t_zone.csaregionid = t_region.csaregionid\n    ")];
                case 2:
                    response = _a.sent();
                    x = 0;
                    _a.label = 3;
                case 3:
                    if (!(x < response.rows.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, transform_1.removeNullLocation)(response.rows[x])];
                case 4:
                    trans_record = _a.sent();
                    return [4 /*yield*/, insertIntoElastic("nrlais_zones", trans_record, String(trans_record["zone_id"]))];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    x++;
                    return [3 /*break*/, 3];
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_6 = _a.sent();
                    console.log(error_6);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.etl_zone = etl_zone;
function etl_woreda() {
    return __awaiter(this, void 0, void 0, function () {
        var pool, conn, response, x, trans_record, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    pool = new pg_1.Pool({
                        host: moa_config_1.default.NRLAIS_DB_HOST,
                        port: moa_config_1.default.NRLAIS_DB_PORT,
                        password: moa_config_1.default.NRLAIS_DB_PASSWORD,
                        user: moa_config_1.default.NRLAIS_DB_USER,
                        database: moa_config_1.default.NRLAIS_DB_NAME,
                    });
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query("\n      select \n        t_woreda.id as woreda_id,\n        t_zone.nrlais_zoneid as zone_code,\n        t_region.csaregionid as region_code,\n        t_region.csaregionnameeng as region_name,\n        t_zone.csazonenameeng as zone_name,\n        t_woreda.woredanameeng as woreda_name,\n        t_woreda.nrlais_woredaid as woreda_code,\n        ST_AsGeoJson(ST_Transform(t_woreda.geometry,4326)) as location\n        from nrlais_sys.t_woredas as t_woreda\n        inner join nrlais_sys.t_zones as t_zone on t_zone.nrlais_zoneid = t_woreda.nrlais_zoneid\n        inner join nrlais_sys.t_regions as t_region on t_zone.csaregionid = t_region.csaregionid\n\n    ")];
                case 2:
                    response = _a.sent();
                    x = 0;
                    _a.label = 3;
                case 3:
                    if (!(x < response.rows.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, transform_1.removeNullLocation)(response.rows[x])];
                case 4:
                    trans_record = _a.sent();
                    return [4 /*yield*/, insertIntoElastic("nrlais_woredas", trans_record, trans_record["woreda_id"])];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    x++;
                    return [3 /*break*/, 3];
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_7 = _a.sent();
                    console.log(error_7);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.etl_woreda = etl_woreda;
function etl_kebele() {
    return __awaiter(this, void 0, void 0, function () {
        var pool, conn, response, x, trans_record, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    pool = new pg_1.Pool({
                        host: moa_config_1.default.NRLAIS_DB_HOST,
                        port: moa_config_1.default.NRLAIS_DB_PORT,
                        password: moa_config_1.default.NRLAIS_DB_PASSWORD,
                        user: moa_config_1.default.NRLAIS_DB_USER,
                        database: moa_config_1.default.NRLAIS_DB_NAME,
                    });
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query("\n      select \n        t_kebele.id as kebele_id,\n        t_zone.nrlais_zoneid as zone_code,\n        t_region.csaregionid as region_code,\n        t_region.csaregionnameeng as region_name,\n        t_zone.csazonenameeng as zone_name,\n        t_woreda.woredanameeng as woreda_name,\n        t_woreda.nrlais_woredaid as woreda_code,\n        t_kebele.nrlais_kebeleid as kebele_code,\n        t_kebele.kebelenameeng as kebele_name,\n        ST_AsGeoJson(ST_Transform(t_kebele.geometry,4326)) as location\n        from nrlais_sys.t_kebeles as t_kebele\n        inner join nrlais_sys.t_woredas as t_woreda on t_woreda.nrlais_woredaid = t_kebele.nrlais_woredaid\n        inner join nrlais_sys.t_zones as t_zone on t_zone.nrlais_zoneid = t_woreda.nrlais_zoneid\n        inner join nrlais_sys.t_regions as t_region on t_zone.csaregionid = t_region.csaregionid\n    ")];
                case 2:
                    response = _a.sent();
                    x = 0;
                    _a.label = 3;
                case 3:
                    if (!(x < response.rows.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, transform_1.removeNullLocation)(response.rows[x])];
                case 4:
                    trans_record = _a.sent();
                    return [4 /*yield*/, insertIntoElastic("nrlais_kebeles", trans_record, trans_record["kebele_id"])];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    x++;
                    return [3 /*break*/, 3];
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_8 = _a.sent();
                    console.log(error_8);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.etl_kebele = etl_kebele;
