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
        var count, _a, _loop_1, _b, _c, _d, e_1_1, _loop_2, _e, _f, _g, e_2_1, _loop_3, _h, _j, _k, e_3_1, _l, _m, _o, activity, record, e_4_1, error_1;
        var _this = this;
        var _p, e_1, _q, _r, _s, e_2, _t, _u, _v, e_3, _w, _x, _y, e_4, _z, _0;
        return __generator(this, function (_1) {
            switch (_1.label) {
                case 0:
                    _1.trys.push([0, 52, , 53]);
                    count = 0;
                    _a = optType;
                    switch (_a) {
                        case OPERATION_TYPE.LOCATION: return [3 /*break*/, 1];
                        case OPERATION_TYPE.MAJOR_WATERSHED: return [3 /*break*/, 13];
                        case OPERATION_TYPE.MICRO_WATERSHED: return [3 /*break*/, 25];
                        case OPERATION_TYPE.ACTIVITIES: return [3 /*break*/, 37];
                    }
                    return [3 /*break*/, 50];
                case 1:
                    _1.trys.push([1, 6, 7, 12]);
                    _loop_1 = function () {
                        _r = _d.value;
                        _b = false;
                        var location_1 = _r;
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var record;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        record = (0, psnp_pw_services_transform_location_1.adminLocationTransformer)(location_1);
                                        return [4 /*yield*/, (0, psnp_pw_services_load_1.insertIntoElastic)(record, "psnp_pw_admin_location", record.id)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, count * 3000);
                    };
                    _b = true, _c = __asyncValues((0, psnp_pw_services_extract_location_1.admin_location_info_extraction)());
                    _1.label = 2;
                case 2: return [4 /*yield*/, _c.next()];
                case 3:
                    if (!(_d = _1.sent(), _p = _d.done, !_p)) return [3 /*break*/, 5];
                    _loop_1();
                    _1.label = 4;
                case 4:
                    _b = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _1.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _1.trys.push([7, , 10, 11]);
                    if (!(!_b && !_p && (_q = _c.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _q.call(_c)];
                case 8:
                    _1.sent();
                    _1.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [3 /*break*/, 51];
                case 13:
                    _1.trys.push([13, 18, 19, 24]);
                    _loop_2 = function () {
                        _u = _g.value;
                        _e = false;
                        var location_2 = _u;
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var record;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        record = (0, psnp_pw_services_transform_location_1.majorWatershedTransformer)(location_2);
                                        return [4 /*yield*/, (0, psnp_pw_services_load_1.insertIntoElastic)(record, "psnp_pw_major_watershed", record.id)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, count * 3000);
                    };
                    _e = true, _f = __asyncValues((0, psnp_pw_services_extract_location_1.extractMajorWatershed)());
                    _1.label = 14;
                case 14: return [4 /*yield*/, _f.next()];
                case 15:
                    if (!(_g = _1.sent(), _s = _g.done, !_s)) return [3 /*break*/, 17];
                    _loop_2();
                    _1.label = 16;
                case 16:
                    _e = true;
                    return [3 /*break*/, 14];
                case 17: return [3 /*break*/, 24];
                case 18:
                    e_2_1 = _1.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 24];
                case 19:
                    _1.trys.push([19, , 22, 23]);
                    if (!(!_e && !_s && (_t = _f.return))) return [3 /*break*/, 21];
                    return [4 /*yield*/, _t.call(_f)];
                case 20:
                    _1.sent();
                    _1.label = 21;
                case 21: return [3 /*break*/, 23];
                case 22:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 23: return [7 /*endfinally*/];
                case 24: return [3 /*break*/, 51];
                case 25:
                    _1.trys.push([25, 30, 31, 36]);
                    _loop_3 = function () {
                        _x = _k.value;
                        _h = false;
                        var location_3 = _x;
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var record;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        record = (0, psnp_pw_services_transform_location_1.microwatshedTransformer)(location_3);
                                        return [4 /*yield*/, (0, psnp_pw_services_load_1.insertIntoElastic)(record, "psnp_pw_micro_watershed", record.id)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, count * 3000);
                    };
                    _h = true, _j = __asyncValues((0, psnp_pw_services_extract_location_1.extractMicrowatshed)());
                    _1.label = 26;
                case 26: return [4 /*yield*/, _j.next()];
                case 27:
                    if (!(_k = _1.sent(), _v = _k.done, !_v)) return [3 /*break*/, 29];
                    _loop_3();
                    _1.label = 28;
                case 28:
                    _h = true;
                    return [3 /*break*/, 26];
                case 29: return [3 /*break*/, 36];
                case 30:
                    e_3_1 = _1.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 36];
                case 31:
                    _1.trys.push([31, , 34, 35]);
                    if (!(!_h && !_v && (_w = _j.return))) return [3 /*break*/, 33];
                    return [4 /*yield*/, _w.call(_j)];
                case 32:
                    _1.sent();
                    _1.label = 33;
                case 33: return [3 /*break*/, 35];
                case 34:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 35: return [7 /*endfinally*/];
                case 36: return [3 /*break*/, 51];
                case 37:
                    _1.trys.push([37, 43, 44, 49]);
                    _l = true, _m = __asyncValues((0, psnp_pw_services_extract_activites_1.extract_activites_info)());
                    _1.label = 38;
                case 38: return [4 /*yield*/, _m.next()];
                case 39:
                    if (!(_o = _1.sent(), _y = _o.done, !_y)) return [3 /*break*/, 42];
                    _0 = _o.value;
                    _l = false;
                    activity = _0;
                    record = (0, pnsp_pw_services_transform_activities_1.default)(activity);
                    console.log("==== in here ===");
                    return [4 /*yield*/, (0, psnp_pw_services_load_1.insertIntoElastic)(record, "psnp_swc_treatment_result_scheduler_test", record.id)];
                case 40:
                    _1.sent();
                    _1.label = 41;
                case 41:
                    _l = true;
                    return [3 /*break*/, 38];
                case 42: return [3 /*break*/, 49];
                case 43:
                    e_4_1 = _1.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 49];
                case 44:
                    _1.trys.push([44, , 47, 48]);
                    if (!(!_l && !_y && (_z = _m.return))) return [3 /*break*/, 46];
                    return [4 /*yield*/, _z.call(_m)];
                case 45:
                    _1.sent();
                    _1.label = 46;
                case 46: return [3 /*break*/, 48];
                case 47:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 48: return [7 /*endfinally*/];
                case 49: return [3 /*break*/, 51];
                case 50:
                    console.log("Please specify a proper OPERATION_TYPE");
                    _1.label = 51;
                case 51: return [3 /*break*/, 53];
                case 52:
                    error_1 = _1.sent();
                    console.log("==== i was caught =====");
                    if (error_1 instanceof etl_exception_1.default)
                        throw error_1;
                    else
                        throw new etl_exception_1.default(error_1.message, etl_exception_1.etlExceptionType.UNKNOWN);
                    return [3 /*break*/, 53];
                case 53: return [2 /*return*/];
            }
        });
    }); };
}
exports.default = main;
