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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxCreatedAtAndUpdatedAtFromIndex = exports.updateConfig = exports.readConfig = exports.doesParcelExist = exports.transformer = exports.insertIntoElastic = exports.insertIntoElasticNotDuplication = exports.getMaxDate = exports.getParcelsThatIntersectWatersheds = exports.getMicroWatershed = exports.getIndexCount = exports.watershedIndexName = exports.indexName = void 0;
var axios_1 = require("axios");
var config_1 = require("config");
var etl_exception_1 = require("etl-exception");
var fs = require("fs");
var path = require("path");
//nrlais_land_admin_system_parcels_weekly_extracted_data_information
// export const indexName =
//   "nrlais_land_admin_system_parcels_weekly_extracted_data_test";
exports.indexName = "nrlais_land_admin_system_parcels_weekly_extracted_data_information";
exports.watershedIndexName = "kmismws";
function getIndexCount(indexName, query) {
    return __awaiter(this, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("".concat(config_1.default.ELASTIC_URL, "/").concat(indexName, "/_count"), query ? query : {}, {
                            auth: {
                                username: config_1.default.ELASTIC_USERNAME,
                                password: config_1.default.ELASTIC_PASSWORD,
                            },
                        })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.data.count];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getIndexCount = getIndexCount;
function getMicroWatershed() {
    return __awaiter(this, void 0, void 0, function () {
        var count, result, watershedList, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, getIndexCount(exports.watershedIndexName)];
                case 1:
                    count = _a.sent();
                    return [4 /*yield*/, axios_1.default.post("".concat(config_1.default.ELASTIC_URL, "/").concat(exports.watershedIndexName, "/_search?size=").concat(count), {}, {
                            auth: {
                                username: config_1.default.ELASTIC_USERNAME,
                                password: config_1.default.ELASTIC_PASSWORD,
                            },
                        })];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, result.data.hits.hits];
                case 3:
                    watershedList = _a.sent();
                    return [2 /*return*/, watershedList];
                case 4:
                    error_2 = _a.sent();
                    console.log("============ in get micro watersheds =================");
                    console.log(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getMicroWatershed = getMicroWatershed;
function getParcelsThatIntersectWatersheds(watershedIndexName) {
    return __awaiter(this, void 0, void 0, function () {
        var watershedInfo, count_1, _loop_1, x, error_3;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getMicroWatershed()];
                case 1:
                    watershedInfo = _a.sent();
                    count_1 = 0;
                    _loop_1 = function (x) {
                        var id = watershedInfo[x]._id;
                        var query = {
                            query: {
                                bool: {
                                    filter: {
                                        geo_shape: {
                                            location: {
                                                indexed_shape: {
                                                    index: watershedIndexName,
                                                    id: id,
                                                    path: "location",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                            script: {
                                source: "ctx._source._watershed = true",
                                lang: "painless",
                            },
                        };
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var result, error_4;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, axios_1.default.post("".concat(config_1.default.ELASTIC_URL, "/").concat(exports.indexName, "/_update_by_query"), query, {
                                                auth: {
                                                    username: config_1.default.ELASTIC_USERNAME,
                                                    password: config_1.default.ELASTIC_PASSWORD,
                                                },
                                            })];
                                    case 1:
                                        result = _a.sent();
                                        console.log(result.status);
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_4 = _a.sent();
                                        count_1 += 1;
                                        console.log("");
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }, x * 500);
                        console.log(count_1);
                    };
                    for (x = 0; x < watershedInfo.length; x++) {
                        _loop_1(x);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getParcelsThatIntersectWatersheds = getParcelsThatIntersectWatersheds;
function getMaxDate() {
    return __awaiter(this, void 0, void 0, function () {
        var payload, res, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    payload = {
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
                    };
                    return [4 /*yield*/, axios_1.default.post("".concat(config_1.default.ELASTIC_URL, "/").concat(exports.indexName, "/_search"), payload, {
                            auth: {
                                username: config_1.default.ELASTIC_USERNAME,
                                password: config_1.default.ELASTIC_PASSWORD,
                            },
                        })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, {
                            max_created_at: res.data.aggregations.max_created_at,
                            max_updated_at: res.data.aggregations.max_updated_at,
                        }];
                case 2:
                    error_5 = _a.sent();
                    console.log("============ in get max date =================");
                    console.log(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getMaxDate = getMaxDate;
var insertIntoElasticNotDuplication = function (indexName, rec) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var res, result, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, doesParcelExist(rec.id, rec.partyuid)];
                        case 1:
                            res = _a.sent();
                            console.log(res);
                            if (!!res) return [3 /*break*/, 3];
                            console.log("======= found one ========");
                            return [4 /*yield*/, axios_1.default.post("".concat(config_1.default.ELASTIC_URL, "/").concat(indexName, "/_doc"), rec, {
                                    auth: {
                                        username: config_1.default.ELASTIC_USERNAME,
                                        password: config_1.default.ELASTIC_PASSWORD,
                                    },
                                })];
                        case 2:
                            result = _a.sent();
                            console.log(result.status);
                            _a.label = 3;
                        case 3:
                            resolve(true);
                            return [3 /*break*/, 5];
                        case 4:
                            error_6 = _a.sent();
                            console.log(error_6);
                            console.log("========= error while inserting elastic ===== ");
                            resolve(true);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
exports.insertIntoElasticNotDuplication = insertIntoElasticNotDuplication;
var insertIntoElastic = function (indexName, rec) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var res, payload, result, payload, result, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            console.log("======== in insertIntoElastic ====");
                            return [4 /*yield*/, doesParcelExist(rec.id, rec.partyuid)];
                        case 1:
                            res = _a.sent();
                            if (!res) return [3 /*break*/, 3];
                            payload = __assign(__assign({}, res), { holders: __spreadArray(__spreadArray([], res.holders, true), [rec.gender_name], false) });
                            return [4 /*yield*/, axios_1.default.post("".concat(config_1.default.ELASTIC_URL, "/").concat(indexName, "/_doc/").concat(payload.id), payload, {
                                    auth: {
                                        username: config_1.default.ELASTIC_USERNAME,
                                        password: config_1.default.ELASTIC_PASSWORD,
                                    },
                                })];
                        case 2:
                            result = _a.sent();
                            resolve(true);
                            return [3 /*break*/, 5];
                        case 3:
                            payload = __assign(__assign({}, rec), { holders: [rec.gender_name] });
                            return [4 /*yield*/, axios_1.default.post("".concat(config_1.default.ELASTIC_URL, "/").concat(indexName, "/_doc/").concat(rec.id), payload, {
                                    auth: {
                                        username: config_1.default.ELASTIC_USERNAME,
                                        password: config_1.default.ELASTIC_PASSWORD,
                                    },
                                })];
                        case 4:
                            result = _a.sent();
                            resolve(true);
                            _a.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            error_7 = _a.sent();
                            resolve(true);
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
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
function doesParcelExist(parcel_id, party_id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("".concat(config_1.default.ELASTIC_URL, "/").concat(exports.indexName, "/_search"), {
                            query: {
                                bool: {
                                    must: [
                                        {
                                            match_phrase: {
                                                id: parcel_id,
                                            },
                                        },
                                        {
                                            match_phrase: {
                                                partyuid: party_id,
                                            },
                                        },
                                    ],
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
                    return [2 /*return*/, response.data.hits.hits.length > 0 ? true : false];
                case 2:
                    error_8 = _a.sent();
                    console.log(error_8);
                    throw new etl_exception_1.default(error_8.message, etl_exception_1.etlExceptionType.UNKNOWN);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.doesParcelExist = doesParcelExist;
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
        var response, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("".concat(config_1.default.ELASTIC_URL, "/elastic/gateway/").concat(indexName, "/_search"), {
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
                    error_9 = _a.sent();
                    if (error_9 instanceof etl_exception_1.default)
                        throw error_9;
                    else
                        throw new etl_exception_1.default(error_9.message, etl_exception_1.etlExceptionType.UNKNOWN);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getMaxCreatedAtAndUpdatedAtFromIndex = getMaxCreatedAtAndUpdatedAtFromIndex;
