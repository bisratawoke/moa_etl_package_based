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
exports.nrlais_mortgage_sync = exports.insertIntoElastic = void 0;
var Pool = require("pg").Pool;
var Cursor = require("pg-cursor");
var fs = require("fs");
var axios = require("axios");
var axios_1 = require("axios");
var moa_config_1 = require("moa_config");
var notifire_1 = require("notifire");
var notifire = new notifire_1.default({
    host: moa_config_1.default.ELASTIC_URL,
    username: moa_config_1.default.ELASTIC_USERNAME,
    password: moa_config_1.default.ELASTIC_PASSWORD,
});
var insertIntoElastic = function (indexName, payload, id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var result, error_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios.post("".concat(moa_config_1.default.ELASTIC_URL, "/").concat(indexName, "/_doc/").concat(id), payload, {
                                    auth: {
                                        username: moa_config_1.default.ELASTIC_USERNAME,
                                        password: moa_config_1.default.ELASTIC_PASSWORD,
                                    },
                                })];
                        case 1:
                            result = _b.sent();
                            console.log(result.status);
                            resolve(true);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _b.sent();
                            if (error_1 instanceof axios_1.AxiosError) {
                                console.log(error_1.message);
                                console.log((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data);
                            }
                            console.log(error_1);
                            reject(true);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
exports.insertIntoElastic = insertIntoElastic;
function nrlais_mortgage_sync() {
    return __awaiter(this, void 0, void 0, function () {
        var pool, client, cursor, rows, rec, record;
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
                    cursor = client.query(new Cursor("select \n       EXTRACT(YEAR FROM t_res.syscreatedate) AS year,\n      t_res.syscreatedate,\n\tt_res.uid res_uid,\n\trespartytype.en as restrictor,\n\ttpartyres.partytype as rest_partytype,\n\tpartytype.en as righttype,\n\tt_party.partytype,\n\tfamilyrole.en as owner_type,\n\tCASE \n\tWHEN t_party.gender = 'f'\n\tTHEN 'Female'\n\tWHEN t_party.gender = 'm' \n\tTHEN 'Male' ELSE 'Unknown' \n\tEND AS gender_name, \n\tt_party.Name as name ,\n\tt_acm_mort_res.area as area , \n\tt_parcel.uid as id ,\n\tt_region.csaregionnameeng as region_name , \n\tt_zone.csazonenameeng as zone_name , \n\tt_woreda.woredanameeng as woreda_name , \n\tt_kebele.kebelenameeng as kebele_name,\n    \tt_party.uid as partyuid\n    from nrlais_inventory.t_acm_mortgage  as t_acm_mort \n    left join nrlais_inventory.t_acm_mortgage_restriction as t_acm_mort_res on  t_acm_mort.uid = t_acm_mort_res.mortgage_uid \n    inner join nrlais_inventory.t_restrictions as t_res on t_acm_mort_res.restriction_uid = t_res.uid\n     inner join nrlais_inventory.t_party as tpartyres on t_res.partyuid = tpartyres.uid \n     inner join nrlais_inventory.t_parcels as t_parcel on t_res.parceluid = t_parcel.uid \n     inner join nrlais_inventory.t_rights as t_rights on t_parcel.uid = t_rights.parceluid \n     inner join nrlais_inventory.t_party as t_party on t_rights.partyuid = t_party.uid \n     inner join nrlais_sys.t_regions as t_region on t_region.csaregionid = t_parcel.csaregionid \n     inner join nrlais_sys.t_zones as t_zone on t_zone.nrlais_zoneid = t_parcel.nrlais_zoneid \n     inner join nrlais_sys.t_woredas as t_woreda on t_woreda.nrlais_woredaid = t_parcel.nrlais_woredaid \n     inner join nrlais_sys.t_kebeles as t_kebele on t_kebele.nrlais_kebeleid = t_parcel.nrlais_kebeleid \n     inner join nrlais_sys.t_cl_familyrole as familyrole on familyrole.codeid = t_party.mreg_familyrole \n     inner join nrlais_sys.t_cl_partytype as respartytype on tpartyres.partytype = respartytype.codeid \n     inner join nrlais_sys.t_cl_partytype as partytype on t_party.partytype = partytype.codeid\n"));
                    return [4 /*yield*/, cursor.read(1000)];
                case 2:
                    rows = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!rows.length) return [3 /*break*/, 7];
                    return [4 /*yield*/, notifire.notify({
                            index: "nrlais parcels data",
                            extraction_date: new Date(),
                            extraction_status: notifire_1.EXTRACTION_STATUS.COMPLETED,
                            number_of_extracted_records: rows.length,
                            method: notifire_1.EXTRACTION_METHOD.SYSTEMATIC,
                        })];
                case 4:
                    _a.sent();
                    rec = rows[0];
                    console.log(rec);
                    record = __assign(__assign({}, rec), { string_year: String(rec.year) });
                    return [4 /*yield*/, (0, exports.insertIntoElastic)("mortage_data_with_restrictor_info_annual_report", record, "".concat(record.res_uid, "-").concat(record.string_year, "-").concat(record.partyuid))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, cursor.read(1000)];
                case 6:
                    rows = _a.sent();
                    return [3 /*break*/, 3];
                case 7:
                    console.log("===== im done ======");
                    cursor.close(function () {
                        client.release();
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.nrlais_mortgage_sync = nrlais_mortgage_sync;
