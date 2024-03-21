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
exports.transactionWithoutGenderInfo = void 0;
var Pool = require("pg").Pool;
var Cursor = require("pg-cursor");
var fs = require("fs");
var axios = require("axios");
var moa_config_1 = require("moa_config");
var utils_1 = require("./utils");
var transformer_1 = require("./transformer");
var notifire_1 = require("notifire");
var notifire = new notifire_1.default({
    host: moa_config_1.default.ELASTIC_URL,
    username: moa_config_1.default.ELASTIC_USERNAME,
    password: moa_config_1.default.ELASTIC_PASSWORD,
});
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
                var result;
                return __generator(this, function (_a) {
                    try {
                        result = null;
                        if (!Number.isNaN(record.transactiontype) && record.tx_data != null) {
                            switch (record.transactiontype) {
                                case 26:
                                    record.transaction_type = "Inheritance with will";
                                    result = (0, transformer_1.InheritanceWithWillTransformer)(record.tx_data.data);
                                    // result.forEach(async (rec) => {
                                    //   try {
                                    //     console.log(result);
                                    // await insertIntoElastic(
                                    //   "transaction_houshold_information_with_party_type_info",
                                    //   {
                                    //     ...rec,
                                    //     region_name: record.region_name,
                                    //     zone_name: record.zone_name,
                                    //     woreda_name: record.woreda_name,
                                    //     kebele_name: record.kebele_name,
                                    //     ...record,
                                    //   }
                                    // );
                                    //   } catch (error) {
                                    //     console.log(error);
                                    //   }
                                    // });
                                    break;
                                case 27:
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
                                    //   try {
                                    //     result = InheritanceWithWillTransformer(record.tx_data.data);
                                    //     result.forEach(async (rec) => {
                                    //       await insertIntoElastic(
                                    //         "transaction_houshold_information_with_party_type_info",
                                    //         {
                                    //           ...rec,
                                    //           region_name: record.region_name,
                                    //           zone_name: record.zone_name,
                                    //           woreda_name: record.woreda_name,
                                    //           kebele_name: record.kebele_name,
                                    //           ...record,
                                    //         }
                                    //       );
                                    //     });
                                    //   } catch (error) {
                                    //     console.log(error);
                                    // }
                                    break;
                                //does not have beneficary holding
                                case 3:
                                    record.transaction_type = "Divorce";
                                    // console.log(record.tx_data.data);
                                    // record["info"] = divorceTransformer(record.tx_data.data);
                                    // console.log(record["info"]);
                                    break;
                                case 24:
                                    record.transaction_type = "Gift";
                                    // result.forEach((res) => {
                                    //   console.log({
                                    //     ...result[0],
                                    //     region_name: record.region_name,
                                    //     zone_name: record.zone_name,
                                    //     woreda_name: record.woreda_name,
                                    //     kebele_name: record.kebele_name,
                                    //   });
                                    // });
                                    try {
                                        result = (0, transformer_1.giftTransfomer)(record.tx_data.data);
                                        // result.forEach(async (rec) => {
                                        //   await insertIntoElastic(
                                        //     "transaction_houshold_information_with_party_type_info",
                                        //     {
                                        //       ...rec,
                                        //       region_name: record.region_name,
                                        //       zone_name: record.zone_name,
                                        //       woreda_name: record.woreda_name,
                                        //       kebele_name: record.kebele_name,
                                        //       ...record,
                                        //     }
                                        //   );
                                        // });
                                    }
                                    catch (error) {
                                        console.log(error);
                                    }
                                    // console.log(record["info"]);
                                    break;
                                //empty
                                case 5:
                                    record.transaction_type = "Exchange";
                                    break;
                                //empty
                                case 6:
                                    record.transaction_type = "Expropriation";
                                    break;
                                case 7:
                                    record.transaction_type = "Reallocation";
                                    // console.log({
                                    //   ...result[0],
                                    //   region_name: record.region_name,
                                    //   zone_name: record.zone_name,
                                    //   woreda_name: record.woreda_name,
                                    //   kebele_name: record.kebele_name,
                                    // });
                                    try {
                                        result = (0, transformer_1.reallocationTransformer)(record.tx_data.data);
                                        // result.forEach(async (rec) => {
                                        //   await insertIntoElastic(
                                        //     "transaction_houshold_information_with_party_type_info",
                                        //     {
                                        //       ...result[0],
                                        //       region_name: record.region_name,
                                        //       zone_name: record.zone_name,
                                        //       woreda_name: record.woreda_name,
                                        //       kebele_name: record.kebele_name,
                                        //       ...record,
                                        //     }
                                        //   );
                                        // });
                                    }
                                    catch (error) {
                                        console.log(error);
                                    }
                                    break;
                                case 8:
                                    // at
                                    record.transaction_type = "Special case";
                                    result = (0, transformer_1.specialCaseTransformer)(record.tx_data.data);
                                    break;
                                case 9:
                                    record.transaction_type = "Rent/Lease";
                                    break;
                                case 10:
                                    record.transaction_type = "Servitude/Easement";
                                    break;
                                case 11:
                                    record.transaction_type = "Restrictive Interest";
                                    break;
                                case 12:
                                    record.transaction_type = "Parcel split";
                                    break;
                                case 13:
                                    record.transaction_type = "Parcel Consolidation/Merge";
                                    break;
                                case 20:
                                    record.transaction_type = "Register Mortgage";
                                    // console.log(record.tx_data.data);
                                    result = (0, transformer_1.registerMorgageTransform)(record.tx_data.data);
                                    // console.log({
                                    //   ...result[0],
                                    //   region_name: record.region_name,
                                    //   zone_name: record.zone_name,
                                    //   woreda_name: record.woreda_name,
                                    //   kebele_name: record.kebele_name,
                                    // });
                                    // console.log(record["info"]);
                                    // if(result[0].)
                                    // await insertIntoElastic("transaction_houshold_information_with_party_type_info", {
                                    //   ...result[0],
                                    //   region_name: record.region_name,
                                    //   zone_name: record.zone_name,
                                    //   woreda_name: record.woreda_name,
                                    //   kebele_name: record.kebele_name,
                                    //   ...record,
                                    // });
                                    break;
                                case 21:
                                    record.transaction_type = "Modify Mortgage";
                                    break;
                                case 22:
                                    record.transaction_type = "Cancel Mortgage";
                                    try {
                                        result = (0, transformer_1.cancelMorgageTransform)(record.tx_data.data);
                                    }
                                    catch (error) {
                                        console.log("====== in cancelMorgageTransform =======");
                                        console.log(error);
                                    }
                                    // console.log({
                                    //   ...result[0],
                                    //   region_name: record.region_name,
                                    //   zone_name: record.zone_name,
                                    //   woreda_name: record.woreda_name,
                                    //   kebele_name: record.kebele_name,
                                    // });
                                    // await insertIntoElastic("transaction_houshold_information_with_party_type_info", {
                                    //   ...result[0],
                                    //   region_name: record.region_name,
                                    //   zone_name: record.zone_name,
                                    //   woreda_name: record.woreda_name,
                                    //   kebele_name: record.kebele_name,
                                    //   ...record,
                                    // });
                                    break;
                                case 25:
                                    record.transaction_type = "Marriage";
                                    // console.log({
                                    //   ...result[0],
                                    //   region_name: record.region_name,
                                    //   zone_name: record.zone_name,
                                    //   woreda_name: record.woreda_name,
                                    //   kebele_name: record.kebele_name,
                                    // });
                                    // console.log(record["info"]);
                                    try {
                                        result = (0, transformer_1.marrageTransformer)(record.tx_data.data);
                                        // result.forEach(async (rec) => {
                                        //   await insertIntoElastic(
                                        //     "transaction_houshold_information_with_party_type_info",
                                        //     {
                                        //       ...rec,
                                        //       region_name: record.region_name,
                                        //       zone_name: record.zone_name,
                                        //       woreda_name: record.woreda_name,
                                        //       kebele_name: record.kebele_name,
                                        //       ...record,
                                        //     }
                                        //   );
                                        // });
                                    }
                                    catch (error) {
                                        console.log(error);
                                    }
                                    break;
                                default:
                                    record.transaction_type = "Initial";
                                    break;
                            }
                            resovle(__assign(__assign({}, record), { parties: result }));
                        }
                    }
                    catch (error) {
                        console.log(error);
                        console.log("skipped");
                    }
                    return [2 /*return*/];
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
        var client, cursor, rows, _loop_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn(pool)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pool.connect()];
                case 2:
                    client = _a.sent();
                    cursor = client.query(new Cursor("select\t\n        t_transaction.syscreatedate AS date,\n        EXTRACT(YEAR FROM t_transaction.syscreatedate) AS year,\n        t_transaction.syscreatedate as created_at,\n        t_transaction.syslastmoddate as updated_at,\n        t_transactiontype.en as transaction_type,\n        t_transaction.uid as id ,\n        t_regions.csaregionnameeng as region_name, \n        t_kebeles.kebelenameeng as kebele_name , \n        t_woredas.woredanameeng as woreda_name ,\n        t_zones.csazonenameeng as zone_name, \n        transactiontype , \n        t_transaction_data.tx_data as tx_data \n        from nrlais_inventory.t_transaction as t_transaction  \n        left join nrlais_sys.t_cl_transactiontype as t_transactiontype on t_transaction.transactiontype =  t_transactiontype.codeid \n        left join nrlais_sys.t_regions as t_regions on t_transaction.csaregionid = t_regions.csaregionid \n        left join nrlais_sys.t_zones as t_zones on t_transaction.nrlais_zoneid = t_zones.csazoneid \n        left join nrlais_sys.t_woredas as t_woredas on t_transaction.nrlais_woredaid = t_woredas.woredaid \n        left join nrlais_sys.t_kebeles as t_kebeles on t_transaction.nrlais_kebeleid = t_kebeles.kebeleid \n        left join nrlais_inventory.t_transaction_data as t_transaction_data on t_transaction.uid = t_transaction_data.tx_uid \n        where transactiontype != 100 \n        and transactiontype != 15\n        and transactiontype != 18\n        and tx_data is not null \n\t\t")
                    // "select t_parcels.uid as id , t_parcels.syscreatedate as date ,t_party.gender as gender, t_party.partytype ,t_rights.partyuid , t_reg.csaregionnameeng as region_name ,  t_zone.csazonenameeng as zone_name , t_woreda.woredanameeng as woreda_name , t_kebeles.kebelenameeng as kebele_name , t_holdings.holdingtype , t_parcels.areageom  from nrlais_inventory.t_parcels as t_parcels left join nrlais_inventory.fdconnector as fd on fd.wfsid = t_parcels.uid left join nrlais_inventory.t_sys_fc_holding as t_sys on t_sys.fdc_uid = fd.uid  left join nrlais_inventory.t_holdings as t_holdings on t_sys.holdinguid = t_holdings.uid left join nrlais_sys.t_regions as t_reg on t_parcels.csaregionid = t_reg.csaregionid left join nrlais_sys.t_zones as t_zone on t_parcels.nrlais_zoneid = t_zone.nrlais_zoneid left join nrlais_sys.t_woredas as t_woreda on t_parcels.nrlais_woredaid = t_woreda.nrlais_woredaid left join nrlais_sys.t_kebeles as t_kebeles on t_parcels.nrlais_kebeleid = t_kebeles.nrlais_kebeleid left join nrlais_inventory.t_rights as t_rights on t_rights.parceluid = t_parcels.uid left join nrlais_inventory.t_party as t_party on t_rights.partyuid = t_party.uid"
                    );
                    return [4 /*yield*/, cursor.read(1)];
                case 3:
                    rows = _a.sent();
                    _loop_1 = function () {
                        var result_1, error_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 4, , 5]);
                                    return [4 /*yield*/, notifire.notify({
                                            index: "nrlais transaction data",
                                            extraction_date: new Date(),
                                            extraction_status: notifire_1.EXTRACTION_STATUS.COMPLETED,
                                            number_of_extracted_records: rows.length,
                                            method: notifire_1.EXTRACTION_METHOD.SYSTEMATIC,
                                        })];
                                case 1:
                                    _b.sent();
                                    return [4 /*yield*/, transformer(rows[0])];
                                case 2:
                                    result_1 = _b.sent();
                                    if (result_1.parties) {
                                        result_1.parties.forEach(function (rec, indx) { return __awaiter(_this, void 0, void 0, function () {
                                            var houseHoldType, payload;
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                console.log("============= start ==============");
                                                houseHoldType = (0, utils_1.getRelationshipText)(rec["mreg_familyrole"]);
                                                if (rec["sex"])
                                                    console.log(rec["sex"]);
                                                payload = __assign(__assign(__assign({}, rec), result_1), { houseHoldType: houseHoldType });
                                                delete payload.tx_data;
                                                payload = __assign(__assign({}, payload), { string_year: String(payload.year) });
                                                console.log("".concat(payload["id"], "-").concat(payload["partyUID"]));
                                                console.log("=============== end =============");
                                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, (0, utils_1.insertIntoEs)("transaction_houshold_information_with_party_type_info_report", payload, "".concat(payload["id"], "-").concat(payload["partyUID"]))];
                                                            case 1:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }, indx * 100);
                                                return [2 /*return*/];
                                            });
                                        }); });
                                    }
                                    return [4 /*yield*/, cursor.read(1)];
                                case 3:
                                    rows = _b.sent();
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_1 = _b.sent();
                                    console.log(error_1);
                                    cursor.close(function () {
                                        client.release();
                                    });
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    };
                    _a.label = 4;
                case 4:
                    if (!rows.length) return [3 /*break*/, 6];
                    return [5 /*yield**/, _loop_1()];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.default = sync;
function transactionWithoutGenderInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var client_1, cursor, numOfRecs, rows, error_2, error_3;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    client_1 = _a.sent();
                    cursor = client_1.query(new Cursor("\n        SELECT \n          k.id as kebele_id,\n          tr.csaregionid,\n          r.csaregionnameeng as region_name,\n          tr.nrlais_zoneid,\n          z.csazonenameeng as zone_name,\n          tr.nrlais_woredaid,\n          w.woredanameeng as woreda_name,\n          tr.nrlais_kebeleid,\n          k.kebelenameeng as kebele_name,\n          DATE_PART('year', tr.syscreatedate::date) as year,\n          tr.transactiontype,\n          trt.en as trtype,\n          trs.en as trstatus,\n          COUNT(tr.transactiontype) as no_trans\n          FROM nrlais_inventory.t_transaction tr\n          LEFT JOIN nrlais_sys.t_cl_transactiontype trt ON tr.transactiontype=trt.codeid  \n          LEFT JOIN nrlais_sys.t_cl_txstatus trs ON tr.txstatus=trs.codeid\n          LEFT JOIN nrlais_sys.t_regions r ON tr.csaregionid=r.csaregionid\n          LEFT JOIN nrlais_sys.t_zones z ON tr.nrlais_zoneid=z.nrlais_zoneid\n          LEFT JOIN nrlais_sys.t_woredas w ON tr.nrlais_woredaid=w.nrlais_woredaid\n          LEFT JOIN nrlais_sys.t_kebeles k ON tr.nrlais_kebeleid=k.nrlais_kebeleid\n        where tr.transactiontype != 100\n        GROUP BY \n        kebele_id,\n        tr.csaregionid, \n        region_name, \n        tr.nrlais_zoneid,\n        zone_name, \n        tr.nrlais_woredaid,\n        woreda_name, \n        tr.nrlais_kebeleid,\n        kebele_name, \n        year, \n        tr.transactiontype, \n        trtype, \n        trstatus;\n    "));
                    numOfRecs = 1000;
                    return [4 /*yield*/, cursor.read(numOfRecs)];
                case 2:
                    rows = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!rows.length) return [3 /*break*/, 9];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 7, , 8]);
                    return [4 /*yield*/, notifire.notify({
                            index: "nrlais transaction data",
                            extraction_date: new Date(),
                            extraction_status: notifire_1.EXTRACTION_STATUS.COMPLETED,
                            number_of_extracted_records: rows.length,
                            method: notifire_1.EXTRACTION_METHOD.SYSTEMATIC,
                        })];
                case 5:
                    _a.sent();
                    rows.forEach(function (rec) { return __awaiter(_this, void 0, void 0, function () {
                        var id, payload;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    id = "".concat(rec["kebele_id"], "_").concat(rec["transactiontype"], "_").concat(rec["year"]);
                                    payload = __assign(__assign({}, rec), { string_year: String(rec["year"]), transaction_type: rec["trtype"], application_status: rec["trstatus"], result: Number(rec["no_trans"]), area: Number(rec["no_trans"]), id: id });
                                    //nrlais_transaction_party_with_out_gender_information
                                    return [4 /*yield*/, (0, utils_1.insertWithOutGender)("nrlais_transaction_party_with_out_gender_information_annual_report", payload, id)];
                                case 1:
                                    //nrlais_transaction_party_with_out_gender_information
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, cursor.read(1)];
                case 6:
                    rows = _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    cursor.close(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, notifire.notify({
                                        extraction_date: new Date(),
                                        extraction_status: notifire_1.EXTRACTION_STATUS.FAILED,
                                        number_of_extracted_records: 0,
                                        index: "nrlais_data",
                                        method: notifire_1.EXTRACTION_METHOD.SYSTEMATIC,
                                    })];
                                case 1:
                                    _a.sent();
                                    client_1.release();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 3];
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_3 = _a.sent();
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.transactionWithoutGenderInfo = transactionWithoutGenderInfo;
