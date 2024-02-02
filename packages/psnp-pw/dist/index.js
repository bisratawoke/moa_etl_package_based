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
    var _a, e_1, _b, _c, _d, e_2, _e, _f, _g, e_3, _h, _j, _k, e_4, _l, _m;
    return __awaiter(this, void 0, void 0, function () {
        var count, _o, _loop_1, _p, _q, _r, e_1_1, _loop_2, _s, _t, _u, e_2_1, _loop_3, _v, _w, _x, e_3_1, _loop_4, _y, _z, _0, e_4_1, error_1;
        var _this = this;
        return __generator(this, function (_1) {
            switch (_1.label) {
                case 0:
                    _1.trys.push([0, 51, , 52]);
                    count = 0;
                    _o = optType;
                    switch (_o) {
                        case OPERATION_TYPE.LOCATION: return [3 /*break*/, 1];
                        case OPERATION_TYPE.MAJOR_WATERSHED: return [3 /*break*/, 13];
                        case OPERATION_TYPE.MICRO_WATERSHED: return [3 /*break*/, 25];
                        case OPERATION_TYPE.ACTIVITIES: return [3 /*break*/, 37];
                    }
                    return [3 /*break*/, 49];
                case 1:
                    _1.trys.push([1, 6, 7, 12]);
                    _loop_1 = function () {
                        _c = _r.value;
                        _p = false;
                        var location_1 = _c;
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
                    _p = true, _q = __asyncValues((0, psnp_pw_services_extract_location_1.admin_location_info_extraction)());
                    _1.label = 2;
                case 2: return [4 /*yield*/, _q.next()];
                case 3:
                    if (!(_r = _1.sent(), _a = _r.done, !_a)) return [3 /*break*/, 5];
                    _loop_1();
                    _1.label = 4;
                case 4:
                    _p = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _1.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _1.trys.push([7, , 10, 11]);
                    if (!(!_p && !_a && (_b = _q.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _b.call(_q)];
                case 8:
                    _1.sent();
                    _1.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [3 /*break*/, 50];
                case 13:
                    _1.trys.push([13, 18, 19, 24]);
                    _loop_2 = function () {
                        _f = _u.value;
                        _s = false;
                        var location_2 = _f;
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
                    _s = true, _t = __asyncValues((0, psnp_pw_services_extract_location_1.extractMajorWatershed)());
                    _1.label = 14;
                case 14: return [4 /*yield*/, _t.next()];
                case 15:
                    if (!(_u = _1.sent(), _d = _u.done, !_d)) return [3 /*break*/, 17];
                    _loop_2();
                    _1.label = 16;
                case 16:
                    _s = true;
                    return [3 /*break*/, 14];
                case 17: return [3 /*break*/, 24];
                case 18:
                    e_2_1 = _1.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 24];
                case 19:
                    _1.trys.push([19, , 22, 23]);
                    if (!(!_s && !_d && (_e = _t.return))) return [3 /*break*/, 21];
                    return [4 /*yield*/, _e.call(_t)];
                case 20:
                    _1.sent();
                    _1.label = 21;
                case 21: return [3 /*break*/, 23];
                case 22:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 23: return [7 /*endfinally*/];
                case 24: return [3 /*break*/, 50];
                case 25:
                    _1.trys.push([25, 30, 31, 36]);
                    _loop_3 = function () {
                        _j = _x.value;
                        _v = false;
                        var location_3 = _j;
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
                    _v = true, _w = __asyncValues((0, psnp_pw_services_extract_location_1.extractMicrowatshed)());
                    _1.label = 26;
                case 26: return [4 /*yield*/, _w.next()];
                case 27:
                    if (!(_x = _1.sent(), _g = _x.done, !_g)) return [3 /*break*/, 29];
                    _loop_3();
                    _1.label = 28;
                case 28:
                    _v = true;
                    return [3 /*break*/, 26];
                case 29: return [3 /*break*/, 36];
                case 30:
                    e_3_1 = _1.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 36];
                case 31:
                    _1.trys.push([31, , 34, 35]);
                    if (!(!_v && !_g && (_h = _w.return))) return [3 /*break*/, 33];
                    return [4 /*yield*/, _h.call(_w)];
                case 32:
                    _1.sent();
                    _1.label = 33;
                case 33: return [3 /*break*/, 35];
                case 34:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 35: return [7 /*endfinally*/];
                case 36: return [3 /*break*/, 50];
                case 37:
                    _1.trys.push([37, 42, 43, 48]);
                    _loop_4 = function () {
                        _m = _0.value;
                        _y = false;
                        var activity = _m;
                        var record = (0, pnsp_pw_services_transform_activities_1.default)(activity);
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, psnp_pw_services_load_1.insertIntoElastic)(record, "psnp_swc_treatment_result_scheduler_test", record.id)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, count * 3000);
                    };
                    _y = true, _z = __asyncValues((0, psnp_pw_services_extract_activites_1.extract_activites_info)());
                    _1.label = 38;
                case 38: return [4 /*yield*/, _z.next()];
                case 39:
                    if (!(_0 = _1.sent(), _k = _0.done, !_k)) return [3 /*break*/, 41];
                    _loop_4();
                    _1.label = 40;
                case 40:
                    _y = true;
                    return [3 /*break*/, 38];
                case 41: return [3 /*break*/, 48];
                case 42:
                    e_4_1 = _1.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 48];
                case 43:
                    _1.trys.push([43, , 46, 47]);
                    if (!(!_y && !_k && (_l = _z.return))) return [3 /*break*/, 45];
                    return [4 /*yield*/, _l.call(_z)];
                case 44:
                    _1.sent();
                    _1.label = 45;
                case 45: return [3 /*break*/, 47];
                case 46:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 47: return [7 /*endfinally*/];
                case 48: return [3 /*break*/, 50];
                case 49:
                    console.log("Please specify a proper OPERATION_TYPE");
                    _1.label = 50;
                case 50: return [3 /*break*/, 52];
                case 51:
                    error_1 = _1.sent();
                    if (error_1 instanceof etl_exception_1.default)
                        throw error_1;
                    else
                        throw new etl_exception_1.default(error_1.message, etl_exception_1.etlExceptionType.UNKNOWN);
                    return [3 /*break*/, 52];
                case 52: return [2 /*return*/];
            }
        });
    });
}
exports.default = main;
