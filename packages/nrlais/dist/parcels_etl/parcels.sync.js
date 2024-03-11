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
exports.syncWithOutGeom = void 0;
var Pool = require("pg").Pool;
var Cursor = require("pg-cursor");
var fs = require("fs");
var axios = require("axios");
var moa_config_1 = require("moa_config");
var utils_1 = require("./utils");
var extract_1 = require("../admin_location_etl/extract");
var notifire_1 = require("notifire");
var notifire = new notifire_1.default({
    host: moa_config_1.default.ELASTIC_URL,
    username: moa_config_1.default.ELASTIC_USERNAME,
    password: moa_config_1.default.ELASTIC_PASSWORD,
});
function conn(pool) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                console.log("====== in connection pool =====");
                pool.query("select 1", function (err, result) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(result);
                    }
                });
            }
            catch (error) {
                console.log("=== in connection pool error ===");
                console.error(error);
            }
            return [2 /*return*/];
        });
    });
}
function sync() {
    return __awaiter(this, void 0, void 0, function () {
        var pool, client, cursor, rows, rec;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pool = new Pool({
                        host: moa_config_1.default.NRLAIS_DB_HOST,
                        port: moa_config_1.default.NRLAIS_DB_PORT,
                        password: moa_config_1.default.NRLAIS_DB_PASSWORD,
                        user: moa_config_1.default.NRLAIS_DB_USER,
                        database: moa_config_1.default.NRLAIS_DB_NAME,
                    });
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    cursor = client.query(new Cursor("select \n      ST_AsText(ST_Transform(t_parcels.geometry,4326)) as location,\n       familyrole.en,t_parcels.syscreatedate as created_at, \n       t_parcels.syslastmoddate as updated_at, \n       t_parcels.uid as id,  \n       t_parcels.syscreatedate as date,\n       t_party.gender as gender, \n       t_party.partytype,\n       t_rights.partyuid,\n       t_reg.csaregionnameeng as region_name, \n       t_zone.csazonenameeng as zone_name, \n       t_woreda.woredanameeng as woreda_name, \n       t_kebeles.kebelenameeng as kebele_name, \n       t_holdings.holdingtype, \n       t_parcels.areageom  \n       from nrlais_inventory.t_parcels as t_parcels \n       left join nrlais_inventory.fdconnector as fd on fd.wfsid = t_parcels.uid \n       left join nrlais_inventory.t_sys_fc_holding as t_sys on t_sys.fdc_uid = fd.uid  \n       left join nrlais_inventory.t_holdings as t_holdings on t_sys.holdinguid = t_holdings.uid \n       left join nrlais_sys.t_regions as t_reg on t_parcels.csaregionid = t_reg.csaregionid \n       left join nrlais_sys.t_zones as t_zone on t_parcels.nrlais_zoneid = t_zone.nrlais_zoneid \n       left join nrlais_sys.t_woredas as t_woreda on t_parcels.nrlais_woredaid = t_woreda.nrlais_woredaid \n       left join nrlais_sys.t_kebeles as t_kebeles on t_parcels.nrlais_kebeleid = t_kebeles.nrlais_kebeleid \n       left join nrlais_inventory.t_rights as t_rights on t_rights.parceluid = t_parcels.uid \n       left join nrlais_inventory.t_party as t_party on t_rights.partyuid = t_party.uid \n       inner join nrlais_sys.t_cl_familyrole as familyrole on familyrole.codeid = t_party.mreg_familyrole"
                    // "select t_parcels.uid as id , t_parcels.syscreatedate as date ,t_party.gender as gender, t_party.partytype ,t_rights.partyuid , t_reg.csaregionnameeng as region_name ,  t_zone.csazonenameeng as zone_name , t_woreda.woredanameeng as woreda_name , t_kebeles.kebelenameeng as kebele_name , t_holdings.holdingtype , t_parcels.areageom  from nrlais_inventory.t_parcels as t_parcels left join nrlais_inventory.fdconnector as fd on fd.wfsid = t_parcels.uid left join nrlais_inventory.t_sys_fc_holding as t_sys on t_sys.fdc_uid = fd.uid  left join nrlais_inventory.t_holdings as t_holdings on t_sys.holdinguid = t_holdings.uid left join nrlais_sys.t_regions as t_reg on t_parcels.csaregionid = t_reg.csaregionid left join nrlais_sys.t_zones as t_zone on t_parcels.nrlais_zoneid = t_zone.nrlais_zoneid left join nrlais_sys.t_woredas as t_woreda on t_parcels.nrlais_woredaid = t_woreda.nrlais_woredaid left join nrlais_sys.t_kebeles as t_kebeles on t_parcels.nrlais_kebeleid = t_kebeles.nrlais_kebeleid left join nrlais_inventory.t_rights as t_rights on t_rights.parceluid = t_parcels.uid left join nrlais_inventory.t_party as t_party on t_rights.partyuid = t_party.uid"
                    ));
                    console.log("========= in here ======");
                    return [4 /*yield*/, cursor.read(1000)];
                case 2:
                    rows = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!rows.length) return [3 /*break*/, 8];
                    return [4 /*yield*/, notifire.notify({
                            index: "nrlais parcels data",
                            extraction_date: new Date(),
                            extraction_status: notifire_1.EXTRACTION_STATUS.COMPLETED,
                            number_of_extracted_records: rows.length,
                            method: notifire_1.EXTRACTION_METHOD.SYSTEMATIC,
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, utils_1.transformer)(rows[0])];
                case 5:
                    rec = _a.sent();
                    return [4 /*yield*/, (0, utils_1.insertIntoElasticNotDuplication)(utils_1.indexName, rec)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, cursor.read(1000)];
                case 7:
                    rows = _a.sent();
                    return [3 /*break*/, 3];
                case 8:
                    console.log("===== im done ======");
                    cursor.close(function () {
                        client.release();
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = sync;
function syncWithOutGeom() {
    return __awaiter(this, void 0, void 0, function () {
        var pool, client, cursor, numOrRow, rows, x;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pool = new Pool({
                        host: moa_config_1.default.NRLAIS_DB_HOST,
                        port: moa_config_1.default.NRLAIS_DB_PORT,
                        password: moa_config_1.default.NRLAIS_DB_PASSWORD,
                        user: moa_config_1.default.NRLAIS_DB_USER,
                        database: moa_config_1.default.NRLAIS_DB_NAME,
                    });
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    cursor = client.query(new Cursor("select\n       familyrole.en,t_parcels.syscreatedate as created_at, \n       t_parcels.syslastmoddate as updated_at, \n       t_parcels.uid as parcel_id,  \n       t_parcels.syscreatedate as date,\n       t_party.uid as party_id,\n       t_party.gender as gender, \n       t_party.partytype,\n       t_rights.partyuid,\n       t_reg.csaregionnameeng as region_name, \n       t_zone.csazonenameeng as zone_name, \n       t_woreda.woredanameeng as woreda_name, \n       t_kebeles.kebelenameeng as kebele_name, \n       t_holdings.holdingtype, \n       t_parcels.areageom  \n      from nrlais_inventory.t_parcels as t_parcels\n      left join nrlais_inventory.fdconnector as fd on fd.wfsid = t_parcels.uid\n      left join nrlais_inventory.t_sys_fc_holding as t_sys on t_sys.fdc_uid = fd.uid\n      left join nrlais_inventory.t_holdings as t_holdings on t_sys.holdinguid = t_holdings.uid\n      left join nrlais_sys.t_regions as t_reg on t_parcels.csaregionid = t_reg.csaregionid\n      left join nrlais_sys.t_zones as t_zone on t_parcels.nrlais_zoneid = t_zone.nrlais_zoneid \n      left join nrlais_sys.t_woredas as t_woreda on t_parcels.nrlais_woredaid = t_woreda.nrlais_woredaid \n      left join nrlais_sys.t_kebeles as t_kebeles on t_parcels.nrlais_kebeleid = t_kebeles.nrlais_kebeleid\n    "));
                    numOrRow = 10000;
                    return [4 /*yield*/, cursor.read(numOrRow)];
                case 2:
                    rows = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!rows.length) return [3 /*break*/, 10];
                    return [4 /*yield*/, notifire.notify({
                            index: "nrlais parcels data",
                            extraction_date: new Date(),
                            extraction_status: notifire_1.EXTRACTION_STATUS.COMPLETED,
                            number_of_extracted_records: rows.length,
                            method: notifire_1.EXTRACTION_METHOD.SYSTEMATIC,
                        })];
                case 4:
                    _a.sent();
                    x = 0;
                    _a.label = 5;
                case 5:
                    if (!(x < rows.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, extract_1.insertIntoElastic)("nrlais_parcel_without_geom", rows[x], rows[x]["parcel_id"])];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    x++;
                    return [3 /*break*/, 5];
                case 8: return [4 /*yield*/, cursor.read(numOrRow)];
                case 9:
                    rows = _a.sent();
                    return [3 /*break*/, 3];
                case 10:
                    cursor.close(function () {
                        client.release();
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.syncWithOutGeom = syncWithOutGeom;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, syncWithOutGeom()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
