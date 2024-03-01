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
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql2");
var fs = require("fs");
var axios = require("axios");
var createCsvWriter = require("csv-writer").createObjectCsvWriter;
var config_1 = require("config");
var etl_exception_1 = require("etl-exception");
var notifire_1 = require("notifire");
/**
 *  {
  host: string;
  username: string;
  password: string;
}
 */
var notifire = new notifire_1.default({
    host: config_1.default.ELASTIC_URL,
    username: config_1.default.ELASTIC_USER,
    password: config_1.default.ELASTIC_PASSWORD,
});
function etl() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, date;
        var _this = this;
        return __generator(this, function (_a) {
            connection = mysql.createConnection({
                host: config_1.default.CALM_MYSQL_HOST,
                port: config_1.default.CALM_MYSQL_PORT,
                user: config_1.default.CALM_MYSQL_USER,
                password: config_1.default.CALM_MYSQL_PASSWORD,
                database: config_1.default.CALM_MYSQL_DB,
            });
            date = readConfigFile().date;
            connection.query("select  \n        woredas.woreda_name , \n        zones.zone_name , \n        regions.region_name ,\n        sum(demarcated) as demarcated ,\n        sum(digitized) as digitized ,\n        sum(certificates_approved) as certificates_approved , \n        sum(certificates_printed) as certificates_printed , \n        sum(certificates_collected) as certificates_collected \n        from weekly_progress_details \n        inner join woredas on woredas.woreda_code = weekly_progress_details.woreda_code \n        inner join zones on woredas.zone_id = zones.id \n        inner join regions on zones.region_id = regions.id \n        where weekly_progress_id in (select id from weekly_progresses where  report_to = '".concat(date, "')  group by woredas.woreda_name,zones.zone_name , regions.region_name;"), function (err, results, fields) { return __awaiter(_this, void 0, void 0, function () {
                var records, _loop_1, x, new_date;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!err) return [3 /*break*/, 1];
                            console.log(err);
                            return [3 /*break*/, 9];
                        case 1: return [4 /*yield*/, notifire.notify({
                                index: "calm",
                                extraction_date: new Date(),
                                extraction_status: notifire_1.EXTRACTION_STATUS.COMPLETED,
                                number_of_extracted_records: results.length,
                                method: notifire_1.EXTRACTION_METHOD.SYSTEMATIC,
                            })];
                        case 2:
                            _a.sent();
                            records = [];
                            _loop_1 = function (x) {
                                var woreda, prev, record, id;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            woreda = results[x];
                                            return [4 /*yield*/, getOldest(date, woreda.woreda_name)];
                                        case 1:
                                            prev = _b.sent();
                                            record = {
                                                woreda_name: woreda.woreda_name,
                                                zone_name: woreda.zone_name,
                                                region_name: woreda.region_name == "SNNP" ? "SNNPR" : woreda.region_name,
                                                demarcated: Number(woreda.demarcated) - Number(prev.demarcated),
                                                digitized: Number(woreda.digitized) - Number(prev.digitized),
                                                certificates_approved: Number(woreda.certificates_approved) -
                                                    Number(prev.certificates_approved),
                                                certificates_printed: Number(woreda.certificates_printed) -
                                                    Number(prev.certificates_printed),
                                                certificates_collected: Number(woreda.certificates_collected) -
                                                    Number(prev.certificates_collected),
                                                date: date,
                                                year: date.split("-")[0],
                                                month: date.split("-")[1],
                                                day: date.split("-")[2],
                                                text_date: date.split("-")[2],
                                            };
                                            id = "".concat(String(record.date), "_").concat(String(record.woreda_name.replace(/\//g, "")));
                                            records.push(record);
                                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                                var error_1, message;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            _a.trys.push([0, 2, , 5]);
                                                            return [4 /*yield*/, insertIntoElastic(record, id)];
                                                        case 1:
                                                            _a.sent();
                                                            return [3 /*break*/, 5];
                                                        case 2:
                                                            error_1 = _a.sent();
                                                            if (!(error_1 instanceof etl_exception_1.default)) return [3 /*break*/, 4];
                                                            message = {
                                                                index: "calm",
                                                                extraction_date: new Date(),
                                                                extraction_status: notifire_1.EXTRACTION_STATUS.COMPLETED,
                                                                number_of_extracted_records: results.length,
                                                                method: notifire_1.EXTRACTION_METHOD.SYSTEMATIC,
                                                                message: error_1.message,
                                                            };
                                                            return [4 /*yield*/, notifire.notify(message)];
                                                        case 3:
                                                            _a.sent();
                                                            _a.label = 4;
                                                        case 4: return [3 /*break*/, 5];
                                                        case 5: return [2 /*return*/];
                                                    }
                                                });
                                            }); }, 300 * x);
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            x = 0;
                            _a.label = 3;
                        case 3:
                            if (!(x < results.length)) return [3 /*break*/, 6];
                            return [5 /*yield**/, _loop_1(x)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            x++;
                            return [3 /*break*/, 3];
                        case 6:
                            new_date = addOneWeek(date);
                            updateConfigFile({ date: new_date });
                            return [4 /*yield*/, updateCsvFile(records)];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, etl()];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
function oneWeekLess(inputDate) {
    var inputDateObj = new Date(inputDate);
    inputDateObj.setDate(inputDateObj.getDate() - 7);
    var resultDate = inputDateObj.toISOString().slice(0, 10);
    return resultDate;
}
function getOldest(date, woreda_name) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var new_date, connection;
        var _this = this;
        return __generator(this, function (_a) {
            new_date = oneWeekLess(date);
            connection = mysql.createConnection({
                host: config_1.default.CALM_MYSQL_HOST,
                port: config_1.default.CALM_MYSQL_PORT,
                user: config_1.default.CALM_MYSQL_USER,
                password: config_1.default.CALM_MYSQL_PASSWORD,
                database: config_1.default.CALM_MYSQL_DB,
            });
            if (new Date(new_date) > new Date("2021-01-01")) {
                connection.query("select woredas.woreda_name , zones.zone_name , regions.region_name ,sum(demarcated) as demarcated , sum(digitized) as digitized , sum(certificates_approved) as certificates_approved , sum(certificates_printed) as certificates_printed , sum(certificates_collected) as certificates_collected  from weekly_progress_details inner join woredas on woredas.woreda_code = weekly_progress_details.woreda_code inner join zones on woredas.zone_id = zones.id inner join regions on zones.region_id = regions.id where weekly_progress_id in (select id from weekly_progresses where  report_to = '".concat(new_date, "') and woredas.woreda_name = '").concat(woreda_name, "' group by woredas.woreda_name,zones.zone_name , regions.region_name;"), function (err, results, fields) { return __awaiter(_this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!err) return [3 /*break*/, 1];
                                if (err.errno == 1525)
                                    resolve({
                                        demarcated: 0,
                                        digitized: 0,
                                        certificates_approved: 0,
                                        certificates_printed: 0,
                                        certificates_collected: 0,
                                    });
                                return [3 /*break*/, 4];
                            case 1:
                                if (!(results.length < 1)) return [3 /*break*/, 3];
                                return [4 /*yield*/, getOldest(new_date, woreda_name)];
                            case 2:
                                res = _a.sent();
                                resolve(res);
                                return [3 /*break*/, 4];
                            case 3:
                                resolve(results[0]);
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
            }
            else {
                resolve({
                    demarcated: 0,
                    digitized: 0,
                    certificates_approved: 0,
                    certificates_printed: 0,
                    certificates_collected: 0,
                });
            }
            return [2 /*return*/];
        });
    }); });
}
function updateConfigFile(data) {
    return fs.writeFileSync("./config.json", JSON.stringify(data));
}
function addOneWeek(inputDate) {
    var inputDateObj = new Date(inputDate);
    inputDateObj.setDate(inputDateObj.getDate() + 7);
    var resultDate = inputDateObj.toISOString().slice(0, 10);
    return resultDate;
}
function readConfigFile() {
    return JSON.parse(Buffer.from(fs.readFileSync("./config.json")).toString());
}
//calm_mis_parcel_info
function insertIntoElastic(rec, id) {
    return __awaiter(this, void 0, void 0, function () {
        var INDEX_NAME, headers, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    INDEX_NAME = "calm_mis_parcel_info_by_status";
                    headers = {
                        auth: {
                            username: config_1.default.ELASTIC_USERNAME,
                            password: config_1.default.ELASTIC_PASSWORD,
                        },
                    };
                    return [4 /*yield*/, axios.post("".concat(config_1.default.ELASTIC_URL, "/").concat(INDEX_NAME, "/_doc/").concat(id), rec, headers)];
                case 1:
                    result = _a.sent();
                    console.log(result.status);
                    return [2 /*return*/];
                case 2:
                    error_2 = _a.sent();
                    throw new etl_exception_1.default(error_2.message, etl_exception_1.etlExceptionType.LOADING);
                case 3: return [2 /*return*/];
            }
        });
    });
}
function initialEtl() {
    return __awaiter(this, void 0, void 0, function () {
        var date, connection;
        var _this = this;
        return __generator(this, function (_a) {
            date = "2021-12-23";
            connection = mysql.createConnection({
                host: config_1.default.CALM_MYSQL_HOST,
                port: config_1.default.CALM_MYSQL_PORT,
                user: config_1.default.CALM_MYSQL_USER,
                password: config_1.default.CALM_MYSQL_PASSWORD,
                database: config_1.default.CALM_MYSQL_DB,
            });
            connection.query("select woredas.woreda_name , zones.zone_name , regions.region_name ,sum(demarcated) as demarcated , sum(digitized) as digitized , sum(certificates_approved) as certificates_approved , sum(certificates_printed) as certificates_printed , sum(certificates_collected) as certificates_collected  from weekly_progress_details inner join woredas on woredas.woreda_code = weekly_progress_details.woreda_code inner join zones on woredas.zone_id = zones.id inner join regions on zones.region_id = regions.id where weekly_progress_id in (select id from weekly_progresses where  report_to = '2021-12-23')  group by woredas.woreda_name,zones.zone_name , regions.region_name;", function (err, results, fields) { return __awaiter(_this, void 0, void 0, function () {
                var records, _loop_2, x, new_date;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!err) return [3 /*break*/, 1];
                            console.log(err);
                            return [3 /*break*/, 5];
                        case 1:
                            records = [];
                            return [4 /*yield*/, notifire.notify({
                                    index: "calm",
                                    extraction_date: new Date(),
                                    extraction_status: notifire_1.EXTRACTION_STATUS.COMPLETED,
                                    number_of_extracted_records: results.length,
                                    method: notifire_1.EXTRACTION_METHOD.SYSTEMATIC,
                                })];
                        case 2:
                            _a.sent();
                            _loop_2 = function (x) {
                                var woreda = results[x];
                                var record = {
                                    woreda_name: woreda.woreda_name,
                                    zone_name: woreda.zone_name,
                                    region_name: woreda.region_name == "SNNP" ? "SNNPR" : woreda.region_name,
                                    demarcated: Number(woreda.demarcated),
                                    digitized: Number(woreda.digitized),
                                    certificates_approved: Number(woreda.certificates_approved),
                                    certificates_printed: Number(woreda.certificates_printed),
                                    certificates_collected: Number(woreda.certificates_collected),
                                    date: date,
                                    year: date.split("-")[0],
                                    month: date.split("-")[1],
                                    day: date.split("-")[2],
                                    text_date: date.split("-")[2],
                                };
                                var id = "".concat(String(record.date), "_").concat(String(record.woreda_name.replace(/\//g, "")));
                                console.log(record, id);
                                records.push(record);
                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var error_3, message;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                _a.trys.push([0, 2, , 5]);
                                                return [4 /*yield*/, insertIntoElastic(record, id)];
                                            case 1:
                                                _a.sent();
                                                return [3 /*break*/, 5];
                                            case 2:
                                                error_3 = _a.sent();
                                                if (!(error_3 instanceof etl_exception_1.default)) return [3 /*break*/, 4];
                                                message = {
                                                    index: "calm",
                                                    extraction_date: new Date(),
                                                    extraction_status: notifire_1.EXTRACTION_STATUS.COMPLETED,
                                                    number_of_extracted_records: results.length,
                                                    method: notifire_1.EXTRACTION_METHOD.SYSTEMATIC,
                                                    message: error_3.message,
                                                };
                                                return [4 /*yield*/, notifire.notify(message)];
                                            case 3:
                                                _a.sent();
                                                _a.label = 4;
                                            case 4: return [3 /*break*/, 5];
                                            case 5: return [2 /*return*/];
                                        }
                                    });
                                }); }, 300 * x);
                            };
                            for (x = 0; x < results.length; x++) {
                                _loop_2(x);
                            }
                            new_date = addOneWeek(date);
                            updateConfigFile({ date: new_date });
                            return [4 /*yield*/, updateCsvFile(records)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, etl()];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.default = initialEtl;
var csvWriter = createCsvWriter({
    path: "./records.csv",
    header: [
        { id: "region_name", title: "region_name" },
        { id: "zone_name", title: "zone_name" },
        { id: "woreda_name", title: "woreda_name" },
        { id: "demarcated", title: "demarcated" },
        { id: "digitized", title: "digitized" },
        { id: "certificates_approved", title: "certificates_approved" },
        { id: "certificates_printed", title: "certificates_printed" },
        { id: "certificates_collected", title: "certificates_collected" },
        { id: "date", title: "date" },
        { id: "year", title: "year" },
        { id: "month", title: "month" },
        { id: "day", title: "day" },
        { id: "text_date", title: "text_date" },
    ],
});
function updateCsvFile(records) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            try {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var error_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, csvWriter.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_4 = _a.sent();
                                    reject(error_4);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            }
            catch (error) {
                console.log(error);
                process.exit(1);
            }
            return [2 /*return*/];
        });
    });
}
