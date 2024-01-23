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
exports.EXTRACTION_STATUS = exports.EXTRACTION_METHOD = void 0;
var axios_1 = require("axios");
var nodemailer = require("nodemailer");
var config_1 = require("config");
var EXTRACTION_METHOD;
(function (EXTRACTION_METHOD) {
    EXTRACTION_METHOD["SYSTEMATIC"] = "systematic";
    EXTRACTION_METHOD["MANUAL"] = "manual";
})(EXTRACTION_METHOD || (exports.EXTRACTION_METHOD = EXTRACTION_METHOD = {}));
var EXTRACTION_STATUS;
(function (EXTRACTION_STATUS) {
    EXTRACTION_STATUS["IN_PROGRESS"] = "in progress";
    EXTRACTION_STATUS["COMPLETED"] = "completed";
    EXTRACTION_STATUS["FAILED"] = "failed";
})(EXTRACTION_STATUS || (exports.EXTRACTION_STATUS = EXTRACTION_STATUS = {}));
var Notifier = /** @class */ (function () {
    function Notifier(elasticConfig) {
        this.elasticConfig = elasticConfig;
    }
    Notifier.prototype.getEmailCred = function () {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var headers, result, err_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 2, , 3]);
                        console.log({
                            auth: {
                                username: (_a = this.elasticConfig) === null || _a === void 0 ? void 0 : _a.username,
                                password: (_b = this.elasticConfig) === null || _b === void 0 ? void 0 : _b.password,
                            },
                        });
                        headers = {
                            auth: {
                                username: (_c = this.elasticConfig) === null || _c === void 0 ? void 0 : _c.username,
                                password: (_d = this.elasticConfig) === null || _d === void 0 ? void 0 : _d.password,
                            },
                        };
                        return [4 /*yield*/, axios_1.default.get("".concat((_e = this.elasticConfig) === null || _e === void 0 ? void 0 : _e.host, "/notifier/_search"), headers)];
                    case 1:
                        result = _g.sent();
                        return [2 /*return*/, result.data.hits.hits[0]._source];
                    case 2:
                        err_1 = _g.sent();
                        console.log((_f = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _f === void 0 ? void 0 : _f.data);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Notifier.prototype.sendEmail = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, mailTransporter, mailDetails, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        console.log("=============== in send email =================");
                        return [4 /*yield*/, this.getEmailCred()];
                    case 1:
                        _a = _b.sent(), email = _a.email, password = _a.password;
                        console.log(email, password);
                        mailTransporter = nodemailer.createTransport({
                            service: "hotmail",
                            auth: {
                                user: email,
                                pass: password,
                            },
                        });
                        mailDetails = {
                            from: email,
                            to: email,
                            subject: "Notification",
                            text: JSON.stringify(message),
                        };
                        mailTransporter.sendMail(mailDetails, function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("Email sent successfully");
                            }
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Notifier.prototype.sendToElasticLog = function (message) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var result, err_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat((_a = this.elasticConfig) === null || _a === void 0 ? void 0 : _a.host, "/logs/_doc"), __assign(__assign({ "@timestamp": new Date(), message: "".concat(message.index, " ").concat(message.extraction_status, " ").concat(message.number_of_extracted_records, " ").concat(message.method, " ").concat(message.user ? message.user : "System") }, message), { user: message.user ? message.user : "System" }), {
                                auth: {
                                    username: String((_b = this.elasticConfig) === null || _b === void 0 ? void 0 : _b.username),
                                    password: String((_c = this.elasticConfig) === null || _c === void 0 ? void 0 : _c.password),
                                },
                            })];
                    case 1:
                        result = _d.sent();
                        console.log(result.status);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _d.sent();
                        console.log(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Notifier.prototype.notify = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.sendEmail(message)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.sendToElasticLog(message)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Notifier;
}());
exports.default = Notifier;
var notifier = new Notifier({
    username: config_1.default.ELASTIC_USERNAME,
    password: config_1.default.ELASTIC_PASSWORD,
    host: config_1.default.ELASTIC_URL,
});
