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
exports.getMaxCreatedAtAndUpdatedAtFromIndex = exports.updateConfig = exports.readConfig = exports.transformer = exports.insertIntoElastic = exports.insertWithOutGender = exports.partyTypeConv = void 0;
var axios_1 = require("axios");
var axios_2 = require("axios");
var config_1 = require("config");
var etl_exception_1 = require("etl-exception");
var fs = require("fs");
var path = require("path");
// export const indexName =
//   "nrlais_land_admin_system_parcels_weekly_extracted_data_test";
/**
 *
 * @param indexName   // case 14:
          //   record.transaction_type = "Boundary Correction";
          //   break;
 * @param rec
 * @param id
 * @returns
 */
function getRelationshipText(number) {
    switch (number) {
        case 1:
            return "Husband";
        case 2:
            return "Wife";
        case 3:
            return "Brother";
        case 4:
            return "Sister";
        case 5:
            return "Female Headed Household";
        case 6:
            return "Male Headed Household";
        case 7:
            return "Under Age";
        case 8:
            return "Other";
        case 9:
            return "Not Available";
        default:
            return "Unknown Relationship";
    }
}
function partyTypeConv(code) {
    var partyTypeText = null;
    switch (code) {
        case 1:
            partyTypeText = "Natural Person";
            break;
        case 2:
            partyTypeText = "Non-natural person";
            break;
        case 3:
            partyTypeText = "State";
            break;
        case 4:
            partyTypeText = "Community";
            break;
        case 5:
            partyTypeText = "Tribe";
            break;
        case 6:
            partyTypeText = "Group Party";
            break;
        case 7:
            partyTypeText = "Financial Institution";
            break;
        default:
            partyTypeText = "Undefined";
    }
    return partyTypeText;
}
exports.partyTypeConv = partyTypeConv;
var insertWithOutGender = function (indexName, rec, id) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_2.default.post("".concat(config_1.default.ELASTIC_URL, "/").concat(indexName, "/_doc"), rec, {
                        auth: {
                            username: config_1.default.ELASTIC_USERNAME,
                            password: config_1.default.ELASTIC_PASSWORD,
                        },
                    })];
            case 1:
                result = _b.sent();
                console.log(result.status);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                if (error_1 instanceof axios_1.AxiosError) {
                    console.log(error_1.message);
                    console.log((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data);
                }
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.insertWithOutGender = insertWithOutGender;
var insertIntoElastic = function (indexName, rec) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var partyTypeText, partyTextRole, payload, result, error_2;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            delete rec.tx_data;
                            console.log("====== in insert baby =====");
                            partyTypeText = partyTypeConv(rec.partyType);
                            partyTextRole = getRelationshipText(rec.mreg_familyrole);
                            payload = __assign(__assign({}, rec), { partyTypeText: partyTypeText, partyTextRole: partyTextRole });
                            console.log("====== in insert baby ======");
                            console.log(payload);
                            return [4 /*yield*/, axios_2.default.post("".concat(config_1.default.ELASTIC_URL, "/").concat(indexName, "/_doc"), payload, {
                                    auth: {
                                        username: config_1.default.ELASTIC_USERNAME,
                                        password: config_1.default.ELASTIC_PASSWORD,
                                    },
                                })];
                        case 1:
                            result = _b.sent();
                            console.log(result.status);
                            resolve(true);
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _b.sent();
                            if (error_2 instanceof axios_1.AxiosError) {
                                console.log(error_2.message);
                                console.log((_a = error_2.response) === null || _a === void 0 ? void 0 : _a.data);
                            }
                            console.log(error_2);
                            reject(true);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
exports.insertIntoElastic = insertIntoElastic;
var transformer = function (record) {
    return new Promise(function (resolve, reject) {
        record.year = new Date(record.date).getFullYear();
        record.record_type = "nrlais_parcel";
        switch (record.gender) {
            case "f":
                record.gender_name = "Female";
                break;
            case "m":
                record.gender_name = "Male";
                break;
            default:
                record.gender_name = "None";
                break;
        }
        switch (record.holdingtype) {
            case 1:
                record.holdingtype = "Private";
                break;
            case 2:
                record.holdingtype = "Communal";
                break;
            default:
                record.holdingtype = "State";
        }
        switch (record.partytype) {
            case 1:
                record.partytype = "Natural Person";
                break;
            case 2:
                record.partytype = "Non-natural person";
                break;
            case 3:
                record.partytype = "State";
                break;
            case 4:
                record.partytype = "Community";
                break;
            case 5:
                record.partytype = "Tribe";
                break;
            case 6:
                record.partytype = "Group party";
                break;
            case 7:
                record.partytype = "Financial institution";
                break;
        }
        record.area = parseFloat(record.areageom);
        return resolve(record);
    });
};
exports.transformer = transformer;
function readConfig() {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, "config.json")).toString());
}
exports.readConfig = readConfig;
function updateConfig(data) {
    var currentConfig = readConfig();
    fs.writeFileSync(path.resolve(__dirname, "config.json"), JSON.stringify(__assign(__assign({}, currentConfig), data)));
}
exports.updateConfig = updateConfig;
function getMaxCreatedAtAndUpdatedAtFromIndex(indexName) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_2.default.post("".concat(config_1.default.ELASTIC_URL, "/elastic/gateway/").concat(indexName, "/_search"), {
                            aggs: {
                                max_created_at: {
                                    max: {
                                        field: "created_at",
                                    },
                                },
                                max_updated_at: {
                                    max: {
                                        field: "updated_at",
                                    },
                                },
                            },
                        }, {
                            auth: {
                                username: config_1.default.ELASTIC_USERNAME,
                                password: config_1.default.ELASTIC_PASSWORD,
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, {
                            created_at: response.data._source.created_at,
                            updated_at: response.data._source.updated,
                        }];
                case 2:
                    error_3 = _a.sent();
                    if (error_3 instanceof etl_exception_1.default)
                        throw error_3;
                    else
                        throw new etl_exception_1.default(error_3.message, etl_exception_1.etlExceptionType.UNKNOWN);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getMaxCreatedAtAndUpdatedAtFromIndex = getMaxCreatedAtAndUpdatedAtFromIndex;
