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
var sql = require("mssql");
var moa_config_1 = require("moa_config");
var socioecon_services_extract_1 = require("./services/socioecon.services.extract");
var socioecon_services_transform_1 = require("./services/socioecon.services.transform");
var socioecon_services_load_1 = require("./services/socioecon.services.load");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var db_config, db_conn, pds_cash_transfer_1, pw_cash_transfer_1, _loop_1, x, _loop_2, x, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    db_config = {
                        server: String(moa_config_1.default.PSNP_MIS_HOST),
                        database: String(moa_config_1.default.PSNP_MIS_DATABASE),
                        user: moa_config_1.default.PSNP_MIS_USER,
                        password: moa_config_1.default.PSNP_MIS_PASSWORD,
                        options: {
                            trustServerCertificate: true,
                        },
                    };
                    return [4 /*yield*/, sql.connect(db_config)];
                case 1:
                    db_conn = _a.sent();
                    return [4 /*yield*/, (0, socioecon_services_extract_1.extract_pds_total_cash_transfer)(db_conn)];
                case 2:
                    pds_cash_transfer_1 = _a.sent();
                    return [4 /*yield*/, (0, socioecon_services_extract_1.extract_pw_total_cash_transfer)(db_conn)];
                case 3:
                    pw_cash_transfer_1 = _a.sent();
                    _loop_1 = function (x) {
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var payload;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        payload = __assign(__assign(__assign({}, pds_cash_transfer_1[x]), { project_name: "PDS" }), (0, socioecon_services_transform_1.timeInfo)(pds_cash_transfer_1[x].CreatedDate));
                                        console.log(payload);
                                        return [4 /*yield*/, (0, socioecon_services_load_1.insertIntoElastic)(
                                            // "socioeconomic_cash_transfer_with_gender_info",
                                            "socioeconomic_cash_transfer_with_gender_and_quarter", 
                                            // "socioeconomic_cash_transfer",
                                            payload, payload.Id)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 100 * x);
                    };
                    // for (let x = 0; x < pds_member.length; x++) {
                    //   setTimeout(async () => {
                    //     const payload = {
                    //       ...pds_member[x],
                    //       project_name: "PDS",
                    //       ...timeInfo(pds_member[x].RegistrationDate),
                    //     };
                    //     console.log(payload);
                    //     await insertIntoElastic("socioconomic_clients", payload, payload.Id);
                    //   }, x);
                    // }
                    // for (let x = 0; x < pw_member.length; x++) {
                    //   setTimeout(async () => {
                    //     const payload = {
                    //       ...pw_member[x],
                    //       project_name: "PW",
                    //       ...timeInfo(pw_member[x].RegistrationDate),
                    //     };
                    //     await insertIntoElastic("socioconomic_clients", payload, payload.Id);
                    //   }, 300 * x);
                    // }
                    for (x = 0; x < pds_cash_transfer_1.length; x++) {
                        _loop_1(x);
                    }
                    _loop_2 = function (x) {
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var payload;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        payload = __assign(__assign(__assign({}, pw_cash_transfer_1[x]), { project_name: "PW" }), (0, socioecon_services_transform_1.timeInfo)(pw_cash_transfer_1[x].CreatedDate));
                                        console.log(payload);
                                        return [4 /*yield*/, (0, socioecon_services_load_1.insertIntoElastic)("socioeconomic_cash_transfer_with_gender_and_quarter", 
                                            // "socioeconomic_cash_transfer",
                                            payload, payload.Id)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 100 * x);
                    };
                    for (x = 0; x < pw_cash_transfer_1.length; x++) {
                        _loop_2(x);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.log(err_1);
                    process.exit(-1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = main;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, main()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
