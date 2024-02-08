"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var Pool = require("pg").Pool;
var Cursor = require("pg-cursor");
var fs = require("fs");
var axios = require("axios");
var moa_config_1 = require("moa_config");
var utils_1 = require("./utils");
var transformer_1 = require("./transformer");
var pool = new Pool({
    host: moa_config_1.default.NRLAIS_DB_HOST,
    port: moa_config_1.default.NRLAIS_DB_PORT,
    password: moa_config_1.default.NRLAIS_DB_PASSWORD,
    user: moa_config_1.default.NRLAIS_DB_USER,
    database: moa_config_1.default.NRLAIS_DB_NAME,
});
var transformer = function (record) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resovle, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var result, _a, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 25, , 26]);
                            result = null;
                            if (!(!Number.isNaN(record.transactiontype) && record.tx_data != null)) return [3 /*break*/, 24];
                            _a = record.transactiontype;
                            switch (_a) {
                                case 26: return [3 /*break*/, 1];
                                case 27: return [3 /*break*/, 3];
                                case 3: return [3 /*break*/, 5];
                                case 24: return [3 /*break*/, 6];
                                case 5: return [3 /*break*/, 8];
                                case 6: return [3 /*break*/, 9];
                                case 7: return [3 /*break*/, 10];
                                case 8: return [3 /*break*/, 12];
                                case 9: return [3 /*break*/, 13];
                                case 10: return [3 /*break*/, 14];
                                case 11: return [3 /*break*/, 15];
                                case 12: return [3 /*break*/, 16];
                                case 13: return [3 /*break*/, 17];
                                case 14: return [3 /*break*/, 18];
                                case 21: return [3 /*break*/, 19];
                                case 25: return [3 /*break*/, 20];
                            }
                            return [3 /*break*/, 22];
                        case 1:
                            record.transaction_type = "Inheritance with will";
                            console.log("========= start   =============");
                            result = (0, transformer_1.InheritanceWithWillTransformer)(record.tx_data.data);
                            // let payload = {
                            //   ...result[0],
                            //   region_name: record.region_name,
                            //   zone_name: record.zone_name,
                            //   woreda_name: record.woreda_name,
                            //   kebele_name: record.kebele_name,
                            // };
                            return [4 /*yield*/, (0, utils_1.insertIntoElastic)("transaction_houshold_information", __assign(__assign(__assign({}, result[0]), { region_name: record.region_name, zone_name: record.zone_name, woreda_name: record.woreda_name, kebele_name: record.kebele_name }), record))];
                        case 2:
                            // let payload = {
                            //   ...result[0],
                            //   region_name: record.region_name,
                            //   zone_name: record.zone_name,
                            //   woreda_name: record.woreda_name,
                            //   kebele_name: record.kebele_name,
                            // };
                            _b.sent();
                            return [3 /*break*/, 23];
                        case 3:
                            record.transaction_type = "Inheritance without will";
                            result = (0, transformer_1.InheritanceWithWillTransformer)(record.tx_data.data);
                            // console.log({
                            //   ...result[0],
                            //   region_name: record.region_name,
                            //   zone_name: record.zone_name,
                            //   woreda_name: record.woreda_name,
                            //   kebele_name: record.kebele_name,
                            // });
                            // console.log(record["info"]);
                            return [4 /*yield*/, (0, utils_1.insertIntoElastic)("transaction_houshold_information", __assign(__assign(__assign({}, result[0]), { region_name: record.region_name, zone_name: record.zone_name, woreda_name: record.woreda_name, kebele_name: record.kebele_name }), record))];
                        case 4:
                            // console.log({
                            //   ...result[0],
                            //   region_name: record.region_name,
                            //   zone_name: record.zone_name,
                            //   woreda_name: record.woreda_name,
                            //   kebele_name: record.kebele_name,
                            // });
                            // console.log(record["info"]);
                            _b.sent();
                            return [3 /*break*/, 23];
                        case 5:
                            record.transaction_type = "Divorce";
                            // console.log(record.tx_data.data);
                            // record["info"] = divorceTransformer(record.tx_data.data);
                            // console.log(record["info"]);
                            return [3 /*break*/, 23];
                        case 6:
                            record.transaction_type = "Gift";
                            console.log("========= start ==========");
                            result = (0, transformer_1.giftTransfomer)(record.tx_data.data);
                            // result.forEach((res) => {
                            //   console.log({
                            //     ...result[0],
                            //     region_name: record.region_name,
                            //     zone_name: record.zone_name,
                            //     woreda_name: record.woreda_name,
                            //     kebele_name: record.kebele_name,
                            //   });
                            // });
                            return [4 /*yield*/, (0, utils_1.insertIntoElastic)("transaction_houshold_information", __assign(__assign(__assign({}, result[0]), { region_name: record.region_name, zone_name: record.zone_name, woreda_name: record.woreda_name, kebele_name: record.kebele_name }), record))];
                        case 7:
                            // result.forEach((res) => {
                            //   console.log({
                            //     ...result[0],
                            //     region_name: record.region_name,
                            //     zone_name: record.zone_name,
                            //     woreda_name: record.woreda_name,
                            //     kebele_name: record.kebele_name,
                            //   });
                            // });
                            _b.sent();
                            console.log("========= end ==========");
                            // console.log(record["info"]);
                            return [3 /*break*/, 23];
                        case 8:
                            record.transaction_type = "Exchange";
                            return [3 /*break*/, 23];
                        case 9:
                            record.transaction_type = "Expropriation";
                            return [3 /*break*/, 23];
                        case 10:
                            record.transaction_type = "Reallocation";
                            result = (0, transformer_1.reallocationTransformer)(record.tx_data.data);
                            // console.log({
                            //   ...result[0],
                            //   region_name: record.region_name,
                            //   zone_name: record.zone_name,
                            //   woreda_name: record.woreda_name,
                            //   kebele_name: record.kebele_name,
                            // });
                            return [4 /*yield*/, (0, utils_1.insertIntoElastic)("transaction_houshold_information", __assign(__assign(__assign({}, result[0]), { region_name: record.region_name, zone_name: record.zone_name, woreda_name: record.woreda_name, kebele_name: record.kebele_name }), record))];
                        case 11:
                            // console.log({
                            //   ...result[0],
                            //   region_name: record.region_name,
                            //   zone_name: record.zone_name,
                            //   woreda_name: record.woreda_name,
                            //   kebele_name: record.kebele_name,
                            // });
                            _b.sent();
                            return [3 /*break*/, 23];
                        case 12:
                            // at
                            record.transaction_type = "Special case";
                            result = (0, transformer_1.specialCaseTransformer)(record.tx_data.data);
                            console.log(result);
                            return [3 /*break*/, 23];
                        case 13:
                            record.transaction_type = "Rent/Lease";
                            return [3 /*break*/, 23];
                        case 14:
                            record.transaction_type = "Servitude/Easement";
                            return [3 /*break*/, 23];
                        case 15:
                            record.transaction_type = "Restrictive Interest";
                            return [3 /*break*/, 23];
                        case 16:
                            record.transaction_type = "Parcel split";
                            return [3 /*break*/, 23];
                        case 17:
                            record.transaction_type = "Parcel Consolidation/Merge";
                            return [3 /*break*/, 23];
                        case 18:
                            record.transaction_type = "Boundary Correction";
                            return [3 /*break*/, 23];
                        case 19:
                            record.transaction_type = "Modify Mortgage";
                            return [3 /*break*/, 23];
                        case 20:
                            record.transaction_type = "Marriage";
                            result = (0, transformer_1.marrageTransformer)(record.tx_data.data);
                            // console.log({
                            //   ...result[0],
                            //   region_name: record.region_name,
                            //   zone_name: record.zone_name,
                            //   woreda_name: record.woreda_name,
                            //   kebele_name: record.kebele_name,
                            // });
                            // console.log(record["info"]);
                            return [4 /*yield*/, (0, utils_1.insertIntoElastic)("transaction_houshold_information", __assign(__assign(__assign({}, result[0]), { region_name: record.region_name, zone_name: record.zone_name, woreda_name: record.woreda_name, kebele_name: record.kebele_name }), record))];
                        case 21:
                            // console.log({
                            //   ...result[0],
                            //   region_name: record.region_name,
                            //   zone_name: record.zone_name,
                            //   woreda_name: record.woreda_name,
                            //   kebele_name: record.kebele_name,
                            // });
                            // console.log(record["info"]);
                            _b.sent();
                            return [3 /*break*/, 23];
                        case 22:
                            record.transaction_type = "Initial";
                            return [3 /*break*/, 23];
                        case 23:
                            resovle(result);
                            _b.label = 24;
                        case 24: return [3 /*break*/, 26];
                        case 25:
                            error_1 = _b.sent();
                            console.log(error_1);
                            console.log("skipped");
                            return [3 /*break*/, 26];
                        case 26: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
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
        var client, cursor, rows, count, rec;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("==== i am runnint ===");
                    console.log({
                        host: moa_config_1.default.NRLAIS_DB_HOST,
                        port: moa_config_1.default.NRLAIS_DB_PORT,
                        password: moa_config_1.default.NRLAIS_DB_PASSWORD,
                        user: moa_config_1.default.NRLAIS_DB_USER,
                        database: moa_config_1.default.NRLAIS_DB_NAME,
                    });
                    return [4 /*yield*/, conn(pool)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pool.connect()];
                case 2:
                    client = _a.sent();
                    cursor = client.query(new Cursor("select\t\n        t_transactiontype.en as transaction_type,\n        t_transaction.uid as id ,\n        t_regions.csaregionnameeng as region_name, \n        t_kebeles.kebelenameeng as kebele_name , \n        t_woredas.woredanameeng as woreda_name ,\n        t_zones.csazonenameeng as zone_name, \n        transactiontype , \n        t_transaction_data.tx_data as tx_data , \n        t_transaction.syscreatedate as date  \n        from nrlais_inventory.t_transaction as t_transaction  \n        left join nrlais_sys.t_cl_transactiontype as t_transactiontype on t_transaction.transactiontype =  t_transactiontype.codeid \n        left join nrlais_sys.t_regions as t_regions on t_transaction.csaregionid = t_regions.csaregionid \n        left join nrlais_sys.t_zones as t_zones on t_transaction.nrlais_zoneid = t_zones.csazoneid \n        left join nrlais_sys.t_woredas as t_woredas on t_transaction.nrlais_woredaid = t_woredas.woredaid \n        left join nrlais_sys.t_kebeles as t_kebeles on t_transaction.nrlais_kebeleid = t_kebeles.kebeleid \n        left join nrlais_inventory.t_transaction_data as t_transaction_data on t_transaction.uid = t_transaction_data.tx_uid \n        where transactiontype != 100 \n        and transactiontype != 15\n        and transactiontype != 18 \n        and tx_data is not null\n               \n\t\t")
                    // "select t_parcels.uid as id , t_parcels.syscreatedate as date ,t_party.gender as gender, t_party.partytype ,t_rights.partyuid , t_reg.csaregionnameeng as region_name ,  t_zone.csazonenameeng as zone_name , t_woreda.woredanameeng as woreda_name , t_kebeles.kebelenameeng as kebele_name , t_holdings.holdingtype , t_parcels.areageom  from nrlais_inventory.t_parcels as t_parcels left join nrlais_inventory.fdconnector as fd on fd.wfsid = t_parcels.uid left join nrlais_inventory.t_sys_fc_holding as t_sys on t_sys.fdc_uid = fd.uid  left join nrlais_inventory.t_holdings as t_holdings on t_sys.holdinguid = t_holdings.uid left join nrlais_sys.t_regions as t_reg on t_parcels.csaregionid = t_reg.csaregionid left join nrlais_sys.t_zones as t_zone on t_parcels.nrlais_zoneid = t_zone.nrlais_zoneid left join nrlais_sys.t_woredas as t_woreda on t_parcels.nrlais_woredaid = t_woreda.nrlais_woredaid left join nrlais_sys.t_kebeles as t_kebeles on t_parcels.nrlais_kebeleid = t_kebeles.nrlais_kebeleid left join nrlais_inventory.t_rights as t_rights on t_rights.parceluid = t_parcels.uid left join nrlais_inventory.t_party as t_party on t_rights.partyuid = t_party.uid"
                    );
                    return [4 /*yield*/, cursor.read(1)];
                case 3:
                    rows = _a.sent();
                    count = 0;
                    _a.label = 4;
                case 4:
                    if (!rows.length) return [3 /*break*/, 7];
                    count += 1;
                    return [4 /*yield*/, transformer(rows[0])];
                case 5:
                    rec = _a.sent();
                    return [4 /*yield*/, cursor.read(1)];
                case 6:
                    rows = _a.sent();
                    return [3 /*break*/, 4];
                case 7:
                    cursor.close(function () {
                        client.release();
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = sync;
