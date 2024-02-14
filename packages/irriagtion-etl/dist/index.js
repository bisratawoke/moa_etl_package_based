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
var axios_1 = require("axios");
var uuidv4 = require("uuid").v4;
var etl_exception_1 = require("etl-exception");
var moa_config_1 = require("moa_config");
var elasticUrl = moa_config_1.default.ELASTIC_URL;
var indexName = moa_config_1.default.irrigationIndexName;
var username = moa_config_1.default.ELASTIC_USERNAME;
var password = moa_config_1.default.ELASTIC_PASSWORD;
var irrigationBaseUrl = moa_config_1.default.irrigationBaseUrl;
function insertIntoElastic(obj, indexName, id) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("".concat(elasticUrl, "/").concat(indexName, "/_doc/").concat(id ? id : uuidv4()), obj, {
                            auth: {
                                username: username,
                                password: password,
                            },
                        })];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    throw new etl_exception_1.default(error_1.message, etl_exception_1.etlExceptionType.LOADING);
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getIrrigationFromApi() {
    return __awaiter(this, void 0, void 0, function () {
        var baseData, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("".concat(irrigationBaseUrl, "/irrigation/"))];
                case 1:
                    baseData = _a.sent();
                    return [2 /*return*/, baseData.data];
                case 2:
                    err_1 = _a.sent();
                    throw new etl_exception_1.default(err_1.message, etl_exception_1.etlExceptionType.EXTRACTION);
                case 3: return [2 /*return*/];
            }
        });
    });
}
function makePostRequest(requestBody) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resovle, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var res, error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, axios_1.default.post("".concat(irrigationBaseUrl, "/generate_detailed_report/"), requestBody)];
                                    case 1:
                                        res = _a.sent();
                                        return [2 /*return*/, resovle(res.data)];
                                    case 2:
                                        error_2 = _a.sent();
                                        throw new etl_exception_1.default(error_2.message, etl_exception_1.etlExceptionType.LOADING);
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }, 3000);
                        return [2 /*return*/];
                    });
                }); })];
        });
    });
}
function constructRequestBody(rec) {
    return {
        region: rec.region.id,
        zone: rec.zone.id,
        woreda: rec.woreda.id,
        basin: "all",
        agro_ecology: "all",
        start_date: "2015-01-01",
        end_date: "2022-01-01",
    };
}
function sync(records) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            try {
                records.forEach(function (data, indx) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var payload, res, elasticPayload;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        payload = constructRequestBody(data);
                                        return [4 /*yield*/, makePostRequest(payload)];
                                    case 1:
                                        res = _a.sent();
                                        elasticPayload = constructElasticPayload(data, res);
                                        return [4 /*yield*/, getCropProductionData(data)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, insertIntoElastic(elasticPayload, "small_holder_irrigation", elasticPayload.id)];
                                    case 3:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, indx * 3000);
                        return [2 /*return*/];
                    });
                }); });
            }
            catch (error) {
                if (error instanceof etl_exception_1.default)
                    throw error;
                throw new etl_exception_1.default(error.message, etl_exception_1.etlExceptionType.LOADING);
            }
            return [2 /*return*/];
        });
    });
}
function constructElasticPayload(baseData, postDataRec) {
    var femaleHeadedBeneficiaries = getFemaleHeadedBeneficiaries(postDataRec).value;
    var maleHeadedBeneficiaries = getActualNumberOfIrrigationBeneficiaries(postDataRec).value -
        getFemaleHeadedBeneficiaries(postDataRec).value;
    var IWUAs = getWaterAssociationDataIWUAS(postDataRec).data;
    return __assign({ id: baseData.id, region_name: baseData.region.name, zone_name: baseData.zone.name, woreda_name: baseData.woreda.name, irrigatedArea: getIrrigatedArea(baseData), landOwnedByMale: getTotalLand(postDataRec) - getFemaleOwnerLand(postDataRec).value, landOwnedByFemale: getFemaleOwnerLand(postDataRec).value, maleHeadedBeneficiaries: maleHeadedBeneficiaries, isUtilizingPumps: isUtilizingPumps(baseData), waterAbstractionMethod: baseData.WAMethod.name, annualInvestmentCost: baseData.invActualCost, year: baseData.invActualYear, IWUAs: IWUAs, grossWaterWithDrawal: getMeasuredGrossWaterWithDrawal(baseData), netWaterWithdrawal: getTotalActualNetWaterWithdrawal(baseData), irrigationBeneficaiars: getActualNumberOfIrrigationBeneficiaries(postDataRec).value, household_irrigation_structure_developed: postDataRec.totalAreaByOwnership[0].data[0].equipped > 0 ? true : false, household_irrigation_structure_developed_area: postDataRec.totalAreaByOwnership[0].data[0].actual }, baseData);
}
function getIrrigatedArea(data) {
    var area = 0;
    for (var x = 0; x < data.reports.length; x++) {
        area = area + data.reports[x].irrigatedArea;
    }
    return area;
}
function getTotalLand(data) {
    var area = 0;
    for (var x = 0; x < data.totalAreaByOwnership.length; x++) {
        if (data.totalAreaByOwnership[x].name == "HH" ||
            data.totalAreaByOwnership[x].name == "Public" ||
            data.totalAreaByOwnership[x].name == "Community")
            area = area + data.totalAreaByOwnership[x].data[0].harvested;
        else
            continue;
    }
    return area;
}
// create and insert crop production as a different index then use data view to bind them together
function getCropProductionData(data) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            try {
                data.reports.forEach(function (report) {
                    report.crop_production.forEach(function (cropInfo, indx) { return __awaiter(_this, void 0, void 0, function () {
                        var payload;
                        var _this = this;
                        return __generator(this, function (_a) {
                            payload = __assign({ crop_name: cropInfo.crop.name, region_name: data.region.name, zone_name: data.zone.name, woreda_name: data.woreda.name, year: new Date(cropInfo.harvestDate).getFullYear() }, cropInfo);
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                var result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, insertIntoElastic(payload, "small_holder_crop_production", "".concat(cropInfo.crop.id, "-").concat(new Date(cropInfo.harvestDate).getFullYear(), "-").concat(cropInfo.crop.name, "-").concat(data.woreda.name, "-").concat(new Date(cropInfo.harvestDate)))];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, indx * 300);
                            return [2 /*return*/];
                        });
                    }); });
                });
            }
            catch (error) {
                throw new etl_exception_1.default(error.message, etl_exception_1.etlExceptionType.EXTRACTION);
            }
            return [2 /*return*/];
        });
    });
}
function getMeasuredGrossWaterWithDrawal(data) {
    return data.MeasuredGrossWaterWithdrawal == null
        ? 0
        : data.MeasuredGrossWaterWithdrawal;
}
function getTotalActualNetWaterWithdrawal(data) {
    return data.ActualNetWaterWithdrawal == null
        ? 0
        : data.ActualNetWaterWithdrawal;
}
function isUtilizingPumps(data) {
    return data.WAMethod.name.includes("pump") ? true : false;
}
function getWaterAssociationDataIWUAS(data) {
    return data.water_association_data.find(function (data) { return data.name == "Number of registered IWUAs members"; });
}
function getFemaleOwnerLand(data) {
    return data.IrrigationBeneficiaries.find(function (data) { return data.name == "Irrigated area managed by female (ha)"; });
}
function getActualNumberOfIrrigationBeneficiaries(data) {
    return data.IrrigationBeneficiaries.find(function (data) { return data.name == "Number of actual beneficiaries"; });
}
function getFemaleHeadedBeneficiaries(data) {
    return data.IrrigationBeneficiaries.find(function (data) { return data.name == "Number of female-headed beneficiaries"; });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var baseData, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getIrrigationFromApi()];
                case 1:
                    baseData = _a.sent();
                    return [4 /*yield*/, sync(baseData)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    if (error_3 instanceof etl_exception_1.default)
                        throw error_3;
                    else
                        throw new etl_exception_1.default(error_3.message, etl_exception_1.etlExceptionType.EXTRACTION);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = main;
