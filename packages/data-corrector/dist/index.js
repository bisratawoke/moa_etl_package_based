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
// const obj = require("./data.js");
var axios = require("axios");
// const fetch = require("node-fetch");
var config_1 = require("config");
var elasticUrl = config_1.default.ELASTIC_URL;
var username = config_1.default.ELASTIC_USERNAME;
var password = config_1.default.ELASTIC_PASSWORD;
function updateIndex(obj, id, indexName) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.post("".concat(elasticUrl, "/").concat(indexName, "/_doc/").concat(id), obj, {
                            auth: {
                                username: username,
                                password: password,
                            },
                        })];
                case 1:
                    result = _a.sent();
                    // if (result.status != 200) throw result.status;
                    // else
                    console.log(result.status);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log("============ error in updateIndex =================");
                    console.log(error_1);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function insertIntoElastic(obj, indexName) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.post("".concat(elasticUrl, "/").concat(indexName, "/_doc/"), obj, {
                            auth: {
                                username: username,
                                password: password,
                            },
                        })];
                case 1:
                    result = _a.sent();
                    if (result.status != 201)
                        throw result.status;
                    else
                        console.log(result.status);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log("============ error in updateIndex =================");
                    console.log(error_2);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getInfoElastic(url) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("".concat(url), {
                            auth: {
                                username: username,
                                password: password,
                            },
                        })];
                case 1:
                    result = _a.sent();
                    if (result.status != 200)
                        throw new Error(result);
                    else
                        return [2 /*return*/, result.data];
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log("============ error in getInfoElastic =================");
                    console.log(error_3);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getCount(indexName) {
    return __awaiter(this, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getInfoElastic("".concat(elasticUrl, "/").concat(indexName, "/_count"))];
                case 1:
                    count = _a.sent();
                    return [2 /*return*/, count];
            }
        });
    });
}
function createMapping(indexName, properties) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.put("".concat(elasticUrl, "/").concat(indexName, "/"), {
                            mappings: {
                                properties: properties,
                            },
                        }, {
                            auth: {
                                username: username,
                                password: password,
                            },
                        })];
                case 1:
                    result = _a.sent();
                    if (result.status != 200)
                        throw new Error(result);
                    else
                        console.log("sucessfully created mapping");
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log("============== error in createMapping =================");
                    console.log(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function reindex(originalIndexName, newIndexName) {
    return __awaiter(this, void 0, void 0, function () {
        var count, result;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCount(originalIndexName)];
                case 1:
                    count = (_a.sent()).count;
                    console.log(count);
                    return [4 /*yield*/, getInfoElastic("".concat(elasticUrl, "/").concat(originalIndexName, "/_search?size=").concat(count))];
                case 2:
                    result = _a.sent();
                    result.hits.hits.forEach(function (rec, indx) { return __awaiter(_this, void 0, void 0, function () {
                        var payload;
                        var _this = this;
                        return __generator(this, function (_a) {
                            payload = __assign(__assign({}, rec._source), { record_type: "SLMP" });
                            console.log(payload);
                            console.log(rec._id);
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, insertIntoElastic(payload, newIndexName)];
                                        case 1:
                                            _a.sent(), indx * 200;
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
function ethiopianToGregorians(ethiopianYear) {
    // Ethiopian calendar has an 8-year difference until September 10, and 7-year difference after that
    var gregorianDifference = 8;
    // Adjust the year based on the difference
    var gregorianYear = ethiopianYear + gregorianDifference;
    return gregorianYear;
}
main("slmp_2001_2015_swc_treatments_result");
function main(indexName) {
    return __awaiter(this, void 0, void 0, function () {
        var count, result, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getCount(indexName)];
                case 1:
                    count = (_a.sent()).count;
                    // let count = 4113;
                    console.log(count);
                    return [4 /*yield*/, getInfoElastic("".concat(elasticUrl, "/").concat(indexName, "/_search?size=").concat(count))];
                case 2:
                    result = _a.sent();
                    // console.log(result);
                    console.log("".concat(result.hits.hits.length, " ").concat(count));
                    result.hits.hits.forEach(function (rec, indx) { return __awaiter(_this, void 0, void 0, function () {
                        var payload_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            if (rec._source.old_year) {
                                console.log("old year exists");
                                // let payload = {
                                //   ...rec._source,
                                //   old_year: rec._source.year,
                                //   year: ethiopianToGregorian(rec._source.year),
                                //   string_year: String(ethiopianToGregorian(rec._source.year)),
                                // };
                                // console.log(payload);
                            }
                            else {
                                // console.log("===== no old year ======");
                                // console.log(rec._source.year);
                                console.log("no old year");
                                payload_1 = __assign(__assign({}, rec._source), { old_year: rec._source.year, year: ethiopianToGregorian(rec._source.year), string_year: String(ethiopianToGregorian(rec._source.year)) });
                                console.log(payload_1);
                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, updateIndex(payload_1, rec._id, indexName)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, indx * 300);
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1.response);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// function dateTransformer(record) {
//   return {
//     ...record,
//     year: Number(
//       ethiopianQuarterToGregorian(record.year, record.quarter).gregorianYear
//     ),
//     string_year: String(
//       ethiopianQuarterToGregorian(record.year, record.quarter).gregorianYear
//     ),
//     quarter: record.quarter,
//     eth_quarter: record.quarter,
//     eth_year: Number(record.year),
//   };
// }
function ethiopianToGregorian(ethiopianYear) {
    // Offset between Ethiopian and Gregorian calendars
    var gregorianOffset = 8;
    // Convert Ethiopian year to Gregorian year
    var gregorianYear = ethiopianYear + gregorianOffset;
    return gregorianYear;
}
// function ethiopianQuarterToGregorian(ethiopianYear, ethiopianQuarter) {
//   // The Ethiopian calendar is about 7-8 years behind the Gregorian calendar
//   const gregorianOffset = 7;
//   // Calculate the Gregorian year by adding the offset
//   let gregorianYear = ethiopianYear + gregorianOffset;
//   // Adjust the Gregorian year and quarter based on the Ethiopian quarter
//   if (ethiopianQuarter > 1) {
//     gregorianYear += 1;
//   }
//   const gregorianQuarter = ((ethiopianQuarter + 2) % 4) + 1;
//   return {
//     gregorianYear,
//     gregorianQuarter,
//   };
// }
/**
 * pasdip
 * calm
 */
// main("");
// main("meret_swc_result");
// main("calm_soil_water_conservation_treatments");
// main("mlm_biological_swc_treatment_result");
// main("biological_meret_result");
// main("physical_pasdip_map_data_result");
// main("smlp_major_watershed");
// main("land_grade_graph_llup");
// main("land_graph_with_admin_untis_report");
// main("ca_soil_v2");
// main("nrlais_transaction_party_with_date");
// main("nrlais_parcels_data");
// main("psnp_pw_biological_treatments_all");
// main("mlm_physical_swc_treatments_result");
// main("pw_total_cash_transfer_report");
function updateSlmpAroforestryRegionName() {
    return __awaiter(this, void 0, void 0, function () {
        var requestOpts, currentData, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    requestOpts = {
                        method: "GET",
                        headers: {
                            Authorization: "Basic ".concat(Buffer.from("".concat(username, ":").concat(password)).toString("base64")),
                        },
                        body: JSON.stringify({
                            query: {
                                match: {
                                    region_name: "SWE",
                                },
                            },
                        }),
                    };
                    return [4 /*yield*/, fetch("".concat(elasticUrl, "/slm_agroforestry_result"), requestOpts)];
                case 1:
                    currentData = _a.sent();
                    console.log(currentData.status);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.log("========== in updated slmp agroforestry regio name ===========");
                    console.log(error_5);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// async function fixMicrowatershedsRegionNameIssue() {
//   try {
//     const username = "elastic";
//     const password = "e4Tbmjluy4FpkJYbFFVM";
//     let indexName = "microwatersheds_information_psnp_pw";
//     obj.forEach(async (rec, indx) => {
//       let payload = {
//         ...rec._source,
//         region_name: "SNNP",
//       };
//       setTimeout(async () => {
//         await updateIndex(payload, rec._id, indexName);
//       }, indx * 1000);
//     });
//   } catch (error) {
//     console.log(
//       "==================== in fixMicrowatershedsRegionNameIssue ================="
//     );
//     console.log(error);
//     process.exit(1);
//   }
// }
// async function updateSoilAcidityIndex() {
//   try {
//     let acidityIndex = {
//       5: "Strongly acidic",
//       4.6: "Strongly acidic",
//       5.5: "Moderately acidic",
//       4.6: "Strongly acidic",
//     };
//     const { count } = await getCount("acidity");
//     let url = `${elasticUrl}/${"acidity"}/_search?size=${count}`;
//     const results = await getInfoElastic(url);
//     results.hits.hits.forEach(async (rec) => {
//       try {
//         let payload = {
//           ...rec._source,
//           category: acidityIndex[rec._source.soil_ph_level],
//           area: parseFloat(rec._source.area),
//         };
//         console.log(rec._id);
//         await updateIndex(payload, rec._id, "acidity");
//       } catch (error) {
//         console.log("============== error in insert data =================");
//         console.log(error);
//         process.exit(1);
//       }
//     });
//   } catch (error) {
//     console.log(
//       "=================== in update soil acidity index ================="
//     );
//     console.log(error);
//     process.exit(1);
//   }
// }
function updateNumberOfClientsGivenLoansSocioEconomic() {
    return __awaiter(this, void 0, void 0, function () {
        var count, result, error_6;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getCount("socioeconomics_credit")];
                case 1:
                    count = (_a.sent()).count;
                    return [4 /*yield*/, getInfoElastic("".concat(elasticUrl, "/socioeconomics_credit/_search?size=").concat(count))];
                case 2:
                    result = _a.sent();
                    result.hits.hits.forEach(function (rec) { return __awaiter(_this, void 0, void 0, function () {
                        var payload;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    payload = __assign(__assign({}, rec._source), { Date: "2015", quarter: "4th Quarter" });
                                    return [4 /*yield*/, updateIndex(payload, rec._id, "socioeconomics_credit")];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    console.log("================ in update number of clients given loan =================");
                    console.log(error_6);
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function correctRegionName() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_7;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.post("".concat(elasticUrl, "/slmp_seedling_production_result_2012/_search"), {
                            query: {
                                term: {
                                    "region_name.keyword": "Amhara\t",
                                },
                            },
                        }, {
                            auth: {
                                username: username,
                                password: password,
                            },
                        })];
                case 1:
                    response = _a.sent();
                    response.data.hits.hits.forEach(function (rec) { return __awaiter(_this, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, axios.post("".concat(elasticUrl, "/slmp_seedling_production_result_2012/_doc/").concat(rec._id), __assign(__assign({}, rec._source), { region_name: "Amhara" }), {
                                        auth: {
                                            username: username,
                                            password: password,
                                        },
                                    })];
                                case 1:
                                    result = _a.sent();
                                    if (result.status != 200)
                                        throw result.status;
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    console.log(error_7);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// correctRegionName();
// main("carbon_sequestered_slmp");
// updateSlmpAroforestryRegionName();
// updateNumberOfClientsGivenLoansSocioEconomic();
// fixMicrowatershedsRegionNameIssue();
// updateSoilAcidityIndex();
