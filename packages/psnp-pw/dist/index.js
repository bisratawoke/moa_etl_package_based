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
var psnp_pw_services_extract_activites_1 = require("./src/services/extract/psnp_pw.services.extract.activites");
var psnp_pw_services_extract_location_1 = require("./src/services/extract/psnp_pw.services.extract.location");
var psnp_pw_services_load_1 = require("./src/services/load/psnp_pw.services.load");
var OPERATION_TYPE;
(function (OPERATION_TYPE) {
    OPERATION_TYPE["LOCATION"] = "LOCATION";
    OPERATION_TYPE["ACTIVITIES"] = "ACTIVITIES";
})(OPERATION_TYPE || (exports.OPERATION_TYPE = OPERATION_TYPE = {}));
function main(optType) {
    var _a, e_1, _b, _c, _d, e_2, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var count, _loop_1, _g, _h, _j, e_1_1, count, _loop_2, _k, _l, _m, e_2_1, error_1;
        var _this = this;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    _o.trys.push([0, 28, , 29]);
                    if (!(optType === OPERATION_TYPE.LOCATION)) return [3 /*break*/, 13];
                    count = 0;
                    _o.label = 1;
                case 1:
                    _o.trys.push([1, 6, 7, 12]);
                    _loop_1 = function () {
                        _c = _j.value;
                        _g = false;
                        var location_1 = _c;
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, psnp_pw_services_load_1.insertIntoElastic)(location_1, "psnp_swc_treatment_result_scheduler_test", location_1.id)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, count * 3000);
                    };
                    _g = true, _h = __asyncValues((0, psnp_pw_services_extract_location_1.admin_location_info_extraction)());
                    _o.label = 2;
                case 2: return [4 /*yield*/, _h.next()];
                case 3:
                    if (!(_j = _o.sent(), _a = _j.done, !_a)) return [3 /*break*/, 5];
                    _loop_1();
                    _o.label = 4;
                case 4:
                    _g = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _o.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _o.trys.push([7, , 10, 11]);
                    if (!(!_g && !_a && (_b = _h.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _b.call(_h)];
                case 8:
                    _o.sent();
                    _o.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [3 /*break*/, 27];
                case 13:
                    if (!(optType === OPERATION_TYPE.ACTIVITIES)) return [3 /*break*/, 26];
                    count = 0;
                    _o.label = 14;
                case 14:
                    _o.trys.push([14, 19, 20, 25]);
                    _loop_2 = function () {
                        _f = _m.value;
                        _k = false;
                        var activity = _f;
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, psnp_pw_services_load_1.insertIntoElastic)(activity, "psnp_swc_treatment_result_scheduler_test", activity.id)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, count * 3000);
                    };
                    _k = true, _l = __asyncValues((0, psnp_pw_services_extract_activites_1.extract_activites_info)());
                    _o.label = 15;
                case 15: return [4 /*yield*/, _l.next()];
                case 16:
                    if (!(_m = _o.sent(), _d = _m.done, !_d)) return [3 /*break*/, 18];
                    _loop_2();
                    _o.label = 17;
                case 17:
                    _k = true;
                    return [3 /*break*/, 15];
                case 18: return [3 /*break*/, 25];
                case 19:
                    e_2_1 = _o.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 25];
                case 20:
                    _o.trys.push([20, , 23, 24]);
                    if (!(!_k && !_d && (_e = _l.return))) return [3 /*break*/, 22];
                    return [4 /*yield*/, _e.call(_l)];
                case 21:
                    _o.sent();
                    _o.label = 22;
                case 22: return [3 /*break*/, 24];
                case 23:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 24: return [7 /*endfinally*/];
                case 25: return [3 /*break*/, 27];
                case 26:
                    console.log("Please specify a proper OPERATION_TYPE");
                    _o.label = 27;
                case 27: return [3 /*break*/, 29];
                case 28:
                    error_1 = _o.sent();
                    console.log(error_1);
                    return [3 /*break*/, 29];
                case 29: return [2 /*return*/];
            }
        });
    });
}
exports.default = main;
