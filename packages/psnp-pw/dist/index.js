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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPERATION_TYPE = void 0;
var etl_exception_1 = require("etl-exception");
var psnp_pw_services_extract_activites_1 = require("./src/services/extract/psnp_pw.services.extract.activites");
var psnp_pw_services_extract_location_1 = require("./src/services/extract/psnp_pw.services.extract.location");
var psnp_pw_services_load_1 = require("./src/services/load/psnp_pw.services.load");
var pnsp_pw_services_transform_activities_1 = require("./src/services/transform/pnsp_pw.services.transform.activities");
var psnp_pw_services_transform_location_1 = require("./src/services/transform/psnp_pw.services.transform.location");
var OPERATION_TYPE;
(function (OPERATION_TYPE) {
    OPERATION_TYPE["LOCATION"] = "ADMIN_LOCATION";
    OPERATION_TYPE["MAJOR_WATERSHED"] = "MAJOR_WATERSHEDS";
    OPERATION_TYPE["ACTIVITIES"] = "ACTIVITIES";
    OPERATION_TYPE["MICRO_WATERSHED"] = "MICRO_WATERSHEDS";
})(OPERATION_TYPE || (exports.OPERATION_TYPE = OPERATION_TYPE = {}));
function main(optType) {
    var _this = this;
    return function () { return __awaiter(_this, void 0, void 0, function () {
        var count, _a, _b, _c, _d, location_1, record, e_1_1, _e, _f, _g, location_2, record, e_2_1, _h, _j, _k, location_3, record, e_3_1, _l, _m, _o, activity, record, e_4_1, error_1;
        var _p, e_1, _q, _r, _s, e_2, _t, _u, _v, e_3, _w, _x, _y, e_4, _z, _0;
        return __generator(this, function (_1) {
            switch (_1.label) {
                case 0:
                    _1.trys.push([0, 55, , 56]);
                    count = 0;
                    _a = optType;
                    switch (_a) {
                        case OPERATION_TYPE.LOCATION: return [3 /*break*/, 1];
                        case OPERATION_TYPE.MAJOR_WATERSHED: return [3 /*break*/, 14];
                        case OPERATION_TYPE.MICRO_WATERSHED: return [3 /*break*/, 27];
                        case OPERATION_TYPE.ACTIVITIES: return [3 /*break*/, 40];
                    }
                    return [3 /*break*/, 53];
                case 1:
                    _1.trys.push([1, 7, 8, 13]);
                    _b = true, _c = __asyncValues((0, psnp_pw_services_extract_location_1.admin_location_info_extraction)());
                    _1.label = 2;
                case 2: return [4 /*yield*/, _c.next()];
                case 3:
                    if (!(_d = _1.sent(), _p = _d.done, !_p)) return [3 /*break*/, 6];
                    _r = _d.value;
                    _b = false;
                    location_1 = _r;
                    record = (0, psnp_pw_services_transform_location_1.adminLocationTransformer)(location_1);
                    return [4 /*yield*/, (0, psnp_pw_services_load_1.insertIntoElastic)(record, "psnp_pw_admin_location", record.id)];
                case 4:
                    _1.sent();
                    _1.label = 5;
                case 5:
                    _b = true;
                    return [3 /*break*/, 2];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_1_1 = _1.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _1.trys.push([8, , 11, 12]);
                    if (!(!_b && !_p && (_q = _c.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _q.call(_c)];
                case 9:
                    _1.sent();
                    _1.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [3 /*break*/, 54];
                case 14:
                    _1.trys.push([14, 20, 21, 26]);
                    _e = true, _f = __asyncValues((0, psnp_pw_services_extract_location_1.extractMajorWatershed)());
                    _1.label = 15;
                case 15: return [4 /*yield*/, _f.next()];
                case 16:
                    if (!(_g = _1.sent(), _s = _g.done, !_s)) return [3 /*break*/, 19];
                    _u = _g.value;
                    _e = false;
                    location_2 = _u;
                    record = (0, psnp_pw_services_transform_location_1.majorWatershedTransformer)(location_2);
                    return [4 /*yield*/, (0, psnp_pw_services_load_1.insertIntoElastic)(record, "psnp_pw_major_watershed", record.id)];
                case 17:
                    _1.sent();
                    _1.label = 18;
                case 18:
                    _e = true;
                    return [3 /*break*/, 15];
                case 19: return [3 /*break*/, 26];
                case 20:
                    e_2_1 = _1.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 26];
                case 21:
                    _1.trys.push([21, , 24, 25]);
                    if (!(!_e && !_s && (_t = _f.return))) return [3 /*break*/, 23];
                    return [4 /*yield*/, _t.call(_f)];
                case 22:
                    _1.sent();
                    _1.label = 23;
                case 23: return [3 /*break*/, 25];
                case 24:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 25: return [7 /*endfinally*/];
                case 26: return [3 /*break*/, 54];
                case 27:
                    _1.trys.push([27, 33, 34, 39]);
                    _h = true, _j = __asyncValues((0, psnp_pw_services_extract_location_1.extractMicrowatshed)());
                    _1.label = 28;
                case 28: return [4 /*yield*/, _j.next()];
                case 29:
                    if (!(_k = _1.sent(), _v = _k.done, !_v)) return [3 /*break*/, 32];
                    _x = _k.value;
                    _h = false;
                    location_3 = _x;
                    record = (0, psnp_pw_services_transform_location_1.microwatshedTransformer)(location_3);
                    return [4 /*yield*/, (0, psnp_pw_services_load_1.insertIntoElastic)(record, "psnp_pw_micro_watershed", record.id)];
                case 30:
                    _1.sent();
                    _1.label = 31;
                case 31:
                    _h = true;
                    return [3 /*break*/, 28];
                case 32: return [3 /*break*/, 39];
                case 33:
                    e_3_1 = _1.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 39];
                case 34:
                    _1.trys.push([34, , 37, 38]);
                    if (!(!_h && !_v && (_w = _j.return))) return [3 /*break*/, 36];
                    return [4 /*yield*/, _w.call(_j)];
                case 35:
                    _1.sent();
                    _1.label = 36;
                case 36: return [3 /*break*/, 38];
                case 37:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 38: return [7 /*endfinally*/];
                case 39: return [3 /*break*/, 54];
                case 40:
                    _1.trys.push([40, 46, 47, 52]);
                    _l = true, _m = __asyncValues((0, psnp_pw_services_extract_activites_1.extract_activites_info)());
                    _1.label = 41;
                case 41: return [4 /*yield*/, _m.next()];
                case 42:
                    if (!(_o = _1.sent(), _y = _o.done, !_y)) return [3 /*break*/, 45];
                    _0 = _o.value;
                    _l = false;
                    activity = _0;
                    record = (0, pnsp_pw_services_transform_activities_1.default)(activity);
                    console.log(record);
                    return [4 /*yield*/, (0, psnp_pw_services_load_1.insertIntoElastic)(record, "psnp_swc_treatment_result_scheduler_test", record.id)];
                case 43:
                    _1.sent();
                    _1.label = 44;
                case 44:
                    _l = true;
                    return [3 /*break*/, 41];
                case 45: return [3 /*break*/, 52];
                case 46:
                    e_4_1 = _1.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 52];
                case 47:
                    _1.trys.push([47, , 50, 51]);
                    if (!(!_l && !_y && (_z = _m.return))) return [3 /*break*/, 49];
                    return [4 /*yield*/, _z.call(_m)];
                case 48:
                    _1.sent();
                    _1.label = 49;
                case 49: return [3 /*break*/, 51];
                case 50:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 51: return [7 /*endfinally*/];
                case 52: return [3 /*break*/, 54];
                case 53:
                    console.log("Please specify a proper OPERATION_TYPE");
                    _1.label = 54;
                case 54: return [3 /*break*/, 56];
                case 55:
                    error_1 = _1.sent();
                    console.log("==== i was caught =====");
                    console.log(error_1);
                    if (error_1 instanceof etl_exception_1.default)
                        throw error_1;
                    else
                        throw new etl_exception_1.default(error_1.message, etl_exception_1.etlExceptionType.UNKNOWN);
                    return [3 /*break*/, 56];
                case 56: return [2 /*return*/];
            }
        });
    }); };
}
exports.default = main;
