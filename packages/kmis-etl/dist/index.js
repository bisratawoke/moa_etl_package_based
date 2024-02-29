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
var uuidv4 = require("uuid").v4;
// import {v4 as uuidv4} from "uuid"
var axios_1 = require("axios");
var etl_exception_1 = require("etl-exception");
var moa_config_1 = require("moa_config");
var elasticUrl = moa_config_1.default.ELASTIC_URL;
var username = moa_config_1.default.ELASTIC_USERNAME;
var password = moa_config_1.default.ELASTIC_PASSWORD;
function insertIntoElastic(obj, indexname, id) {
    return __awaiter(this, void 0, void 0, function () {
        var indexName, result, error_1, exp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    indexName = indexname;
                    console.log("==== in insertIntoElastic ===");
                    return [4 /*yield*/, axios_1.default.post("".concat(elasticUrl, "/").concat(indexName, "/_doc/").concat(id ? id : uuidv4()), obj, {
                            auth: {
                                username: username,
                                password: password,
                            },
                        })];
                case 1:
                    result = _a.sent();
                    console.log(result.status);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    exp = new etl_exception_1.default(error_1.message, etl_exception_1.etlExceptionType.LOADING);
                    throw exp;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function ethiopianToGregorian(ethiopianYear) {
    // The Ethiopian calendar is about 7-8 years behind the Gregorian calendar
    var gregorianOffset = 7;
    // Calculate the Gregorian year by adding the offset
    var gregorianYear = ethiopianYear + gregorianOffset;
    return gregorianYear;
}
function ethiopianQuarterToGregorian(ethiopianYear, ethiopianQuarter) {
    // The Ethiopian calendar is about 7-8 years behind the Gregorian calendar
    var gregorianOffset = 7;
    // Calculate the Gregorian year by adding the offset
    var gregorianYear = ethiopianYear + gregorianOffset;
    // Adjust the Gregorian year and quarter based on the Ethiopian quarter
    if (ethiopianQuarter > 1) {
        gregorianYear += 1;
    }
    var gregorianQuarter = ((ethiopianQuarter + 2) % 4) + 1;
    return {
        gregorianYear: gregorianYear,
        gregorianQuarter: gregorianQuarter,
    };
}
// function ethiopianQuarterToGregorian(
//   ethiopianYear: any,
//   ethiopianQuarter: any
// ) {
//   // The Ethiopian calendar is about 7-8 years behind the Gregorian calendar
//   const gregorianOffset = 7;
//   // Calculate the Gregorian year by adding the offset
//   const gregorianYear = ethiopianYear + gregorianOffset;
//   // Calculate the Gregorian quarter
//   const gregorianQuarter = ((ethiopianQuarter + 3) % 4) + 1;
//   return {
//     gregorianYear,
//     gregorianQuarter,
//   };
// }
function dateTransformer(record) {
    return __assign(__assign({}, record), { year: Number(ethiopianQuarterToGregorian(record.year, record.quarter).gregorianYear), string_year: String(ethiopianQuarterToGregorian(record.year, record.quarter).gregorianYear), quarter: record.quarter, eth_quarter: record.quarter, eth_year: Number(record.year) });
}
function hectarOfAreaClosureWithinEtlCalendar() {
    return __awaiter(this, void 0, void 0, function () {
        var result, response, error_2, exp;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, removePreviousData("slm_hectar_of_area_closure_testing_scheduler"
                        // "slm_hectar_of_area_closure_in_eth_calendar"
                        )];
                case 1:
                    result = _a.sent();
                    console.log("=====finished removing previous data =====");
                    return [4 /*yield*/, axios_1.default.get("http://slmpkmis.gov.et/api-slm-vis/public/woreda-quarterly-indicators-project-aggregated?indicator_code=IR3")];
                case 2:
                    response = _a.sent();
                    console.log("=====finished fetching data from server =====");
                    console.log(response.data._embedded);
                    response.data._embedded.woreda_quarterly_indicators_project_aggregated.forEach(function (rec, indx) { return __awaiter(_this, void 0, void 0, function () {
                        var dateAddedRecord, payload;
                        var _this = this;
                        return __generator(this, function (_a) {
                            dateAddedRecord = dateTransformer(rec);
                            payload = __assign(__assign({}, dateAddedRecord), { record_type: "SLMP", area: parseFloat(rec.value) });
                            if (parseInt(payload.string_year) > parseInt("2022")) {
                                console.log(payload);
                            }
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, insertIntoElastic(payload, "slm_hectar_of_area_closure_testing_scheduler"
                                            // "slm_hectar_of_area_closure_in_eth_calendar"
                                            )];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 2000 * indx);
                            return [2 /*return*/];
                        });
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    if (error_2 instanceof etl_exception_1.default)
                        throw error_2;
                    else {
                        exp = new etl_exception_1.default(error_2.message, etl_exception_1.etlExceptionType.LOADING);
                        throw exp;
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function insertNumberOfWoredasWithEth() {
    return __awaiter(this, void 0, void 0, function () {
        var res, response, error_3, exp;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, removePreviousData(
                        // "slm_number_of_woredas_in_eth_calendar"
                        "slm_number_of_woredas_in_eth_calendar_scheduler_test")];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, axios_1.default.get("http://slmpkmis.gov.et/api-slm-vis/public/region-mid-end-indicators-region-project-aggregated?indicator_code=IR8")];
                case 2:
                    response = _a.sent();
                    response.data._embedded.region_mid_end_indicators_region_project_aggregated.forEach(function (rec, indx) { return __awaiter(_this, void 0, void 0, function () {
                        var dateAddedRecord, payload;
                        var _this = this;
                        return __generator(this, function (_a) {
                            dateAddedRecord = dateTransformer(rec);
                            payload = __assign(__assign({}, dateAddedRecord), { value: parseFloat(rec.value), record_type: "SLMP" });
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, insertIntoElastic(payload, 
                                            // "slm_number_of_woredas_in_eth_calendar"
                                            "slm_number_of_woredas_in_eth_calendar_scheduler_test")];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 300 * indx);
                            return [2 /*return*/];
                        });
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    if (error_3 instanceof etl_exception_1.default)
                        throw error_3;
                    exp = new etl_exception_1.default(error_3.message, etl_exception_1.etlExceptionType.LOADING);
                    throw exp;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function insertCommunityWaterShedsCoopWithEthCalendar() {
    return __awaiter(this, void 0, void 0, function () {
        var res, dataFromKmisApi, error_4, exp;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, removePreviousData("watercoopsinethcalendar_calendar_test")];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, axios_1.default.get("http://slmpkmis.gov.et/api-slm-vis/public/woreda-quarterly-indicators-project-aggregated?indicator_code=IR7")];
                case 2:
                    dataFromKmisApi = _a.sent();
                    dataFromKmisApi.data._embedded.woreda_quarterly_indicators_project_aggregated.forEach(function (rec, idx) { return __awaiter(_this, void 0, void 0, function () {
                        var dateAddedRecord, payload_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            try {
                                dateAddedRecord = dateTransformer(rec);
                                payload_1 = __assign(__assign({}, dateAddedRecord), { record_type: "SLMP", result: String(rec.value), quarter: rec.quarter });
                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, insertIntoElastic(payload_1, "watercoopsinethcalendar_calendar_test")];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, idx * 300);
                            }
                            catch (error) {
                                console.log(error);
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    if (error_4 instanceof etl_exception_1.default)
                        throw error_4;
                    exp = new etl_exception_1.default(error_4.message, etl_exception_1.etlExceptionType.LOADING);
                    throw exp;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function lswi() {
    return __awaiter(this, void 0, void 0, function () {
        var result, dataFromKmisApi, error_5, exp;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, removePreviousData("slm_land_surface_water_index_scheduler_test")];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, axios_1.default.get("http://slmpkmis.gov.et/api-slm-vis/public/mws-mid-end-indicators-mws-project-aggregated?indicator_code=PDO3")];
                case 2:
                    dataFromKmisApi = _a.sent();
                    dataFromKmisApi.data._embedded.mws_mid_end_indicators_mws_project_aggregated.forEach(function (rec, indx) { return __awaiter(_this, void 0, void 0, function () {
                        var dateAddedRecord, result, data;
                        var _this = this;
                        return __generator(this, function (_a) {
                            dateAddedRecord = dateTransformer(rec);
                            result = rec.numerator / rec.denominator;
                            data = __assign(__assign({}, dateAddedRecord), { record_type: "SLMP", result: parseFloat(result), value: parseFloat(rec.value) });
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, insertIntoElastic(data, "slm_land_surface_water_index_scheduler_test", data.id)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, indx * 100);
                            return [2 /*return*/];
                        });
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    if (error_5 instanceof etl_exception_1.default)
                        throw error_5;
                    exp = new etl_exception_1.default(error_5.message, etl_exception_1.etlExceptionType.LOADING);
                    throw exp;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function insertMicroWatershed() {
    return __awaiter(this, void 0, void 0, function () {
        var result, response, error_6, exp;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, removePreviousData("microwatersheds_information_slmp")];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, axios_1.default.get("http://slmpkmis.gov.et/api-slm-vis/public/mws_basic")];
                case 2:
                    response = _a.sent();
                    response.data._embedded.mws_basic.forEach(function (rec, indx) { return __awaiter(_this, void 0, void 0, function () {
                        var dateAddedRecord, payload;
                        var _this = this;
                        return __generator(this, function (_a) {
                            dateAddedRecord = dateTransformer(rec);
                            payload = __assign(__assign({}, dateAddedRecord), { record_type: "SLMP", "Micro Watershed": "".concat(rec.mws_name, "-").concat(indx), "Major Watershed": rec.cws_name });
                            //smlp_major_watershed_schedular_test
                            //smlp_major_watershed
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, insertIntoElastic(payload, "microwatersheds_information_slmp", 
                                            // payload.id
                                            indx)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 300 * indx);
                            return [2 /*return*/];
                        });
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    if (error_6 instanceof etl_exception_1.default)
                        throw error_6;
                    exp = new etl_exception_1.default(error_6.message, etl_exception_1.etlExceptionType.LOADING);
                    throw exp;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function insertMajorWatershed() {
    return __awaiter(this, void 0, void 0, function () {
        var result, response, error_7, exp;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, removePreviousData("smlp_major_watershed_schedular_test")];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, axios_1.default.get("http://slmpkmis.gov.et/api-slm-vis/public/cws_basic")];
                case 2:
                    response = _a.sent();
                    response.data._embedded.cws_basic.forEach(function (rec, indx) { return __awaiter(_this, void 0, void 0, function () {
                        var dateAddedRecord, payload;
                        var _this = this;
                        return __generator(this, function (_a) {
                            dateAddedRecord = dateTransformer(rec);
                            payload = __assign(__assign({}, dateAddedRecord), { record_type: "SLMP", cws_id: String(indx) });
                            //smlp_major_watershed_schedular_test
                            //smlp_major_watershed
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, insertIntoElastic(payload, "smlp_major_watershed_schedular_test", indx
                                            // payload.id
                                            )];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 300 * indx);
                            return [2 /*return*/];
                        });
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _a.sent();
                    if (error_7 instanceof etl_exception_1.default)
                        throw error_7;
                    exp = new etl_exception_1.default(error_7.message, etl_exception_1.etlExceptionType.LOADING);
                    throw exp;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function removePreviousData(indexName) {
    return __awaiter(this, void 0, void 0, function () {
        var opts, response, error_8, exp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("======= in remove previous data =====");
                    console.log(indexName);
                    opts = {
                        query: {
                            match_all: {},
                        },
                    };
                    console.log("".concat(elasticUrl, "/").concat(indexName, "/_delete_by_query"));
                    return [4 /*yield*/, axios_1.default.post("".concat(elasticUrl, "/").concat(indexName, "/_delete_by_query"), opts, {
                            auth: {
                                username: username,
                                password: password,
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _a.sent();
                    if (error_8 instanceof etl_exception_1.default)
                        throw error_8;
                    exp = new etl_exception_1.default(error_8.message, etl_exception_1.etlExceptionType.LOADING);
                    throw exp;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            try {
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var error_9;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, insertMajorWatershed()];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                error_9 = _a.sent();
                                if (error_9 instanceof etl_exception_1.default)
                                    throw error_9;
                                else {
                                    throw new etl_exception_1.default(error_9.message, etl_exception_1.etlExceptionType.UNKNOWN);
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, 15000);
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var error_10;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, insertMicroWatershed()];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                error_10 = _a.sent();
                                if (error_10 instanceof etl_exception_1.default)
                                    throw error_10;
                                else {
                                    throw new etl_exception_1.default(error_10.message, etl_exception_1.etlExceptionType.UNKNOWN);
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, 20000);
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var error_11;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, hectarOfAreaClosureWithinEtlCalendar()];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                error_11 = _a.sent();
                                if (error_11 instanceof etl_exception_1.default)
                                    throw error_11;
                                else {
                                    throw new etl_exception_1.default(error_11.message, etl_exception_1.etlExceptionType.UNKNOWN);
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, 35000);
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var error_12;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, lswi()];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                error_12 = _a.sent();
                                if (error_12 instanceof etl_exception_1.default)
                                    throw error_12;
                                else {
                                    throw new etl_exception_1.default(error_12.message, etl_exception_1.etlExceptionType.UNKNOWN);
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, 45000);
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var error_13;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, insertNumberOfWoredasWithEth()];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                error_13 = _a.sent();
                                if (error_13 instanceof etl_exception_1.default)
                                    throw error_13;
                                else {
                                    throw new etl_exception_1.default(error_13.message, etl_exception_1.etlExceptionType.UNKNOWN);
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, 55000);
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var error_14;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, insertCommunityWaterShedsCoopWithEthCalendar()];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                error_14 = _a.sent();
                                if (error_14 instanceof etl_exception_1.default)
                                    throw error_14;
                                else {
                                    throw new etl_exception_1.default(error_14.message, etl_exception_1.etlExceptionType.UNKNOWN);
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, 65000);
            }
            catch (error) {
                if (error instanceof etl_exception_1.default)
                    throw error;
                else {
                    throw new etl_exception_1.default(error.message, etl_exception_1.etlExceptionType.UNKNOWN);
                }
            }
            return [2 /*return*/];
        });
    });
}
exports.default = main;
