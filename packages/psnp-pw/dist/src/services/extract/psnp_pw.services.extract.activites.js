"use strict";
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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract_activites_info = void 0;
var Pool = require("pg").Pool;
var Cursor = require("pg-cursor");
var etl_exception_1 = require("etl-exception");
var psnp_pw_services_database_1 = require("../database/psnp_pw.services.database");
function extract_activites_info() {
    return __asyncGenerator(this, arguments, function extract_activites_info_1() {
        var client_1, cursor, rows, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    console.log("========= in extract_activites_info ========");
                    return [4 /*yield*/, __await(psnp_pw_services_database_1.default.connect())];
                case 1:
                    client_1 = _a.sent();
                    cursor = client_1.query(new Cursor("select\n            act.id as id ,\n            kebele.name as kebele_name ,\n            woreda.name as woreda_name ,\n            zone.name as zone_name ,\n            region.name as region_name ,\n            act.status, act_type.name as activity_name ,\n            act_type.unit as Unit ,\n            act_type.name as treatment ,\n            act_type.feature_type as feature_type , 'PSNP PW' as record_type ,\n            ST_AsGeoJson(act.geom) as location ,\n            mws.name as \"Micro Watershed\" ,\n            cws.name as \"Major Watershed\" ,\n            cws.id as cws_id  ,\n            act.started start_date , \n            act.completed  end_date ,\n            act.status activity_status , \n            ST_Area(act.geom) as area,\n            EXTRACT(YEAR FROM act.created_at) AS year,\n            CAST(EXTRACT(YEAR FROM act.created_at) AS VARCHAR) AS string_year,\n            'PSNP PW' as record_type\n            from activities as act\n            inner join activity_types as act_type on act_type.id = act.activity_type_id\n            inner join kebeles as kebele on act.kebele_id = kebele.id\n            inner join woredas as woreda on kebele.parent_id = woreda.id\n            inner join zones as zone on zone.id = woreda.parent_id\n            inner join regions as region on region.id = zone.parent_id\n            left join microwatersheds as mws on act.microwatershed_id = mws.id\n            left join watersheds as cws on mws.parent_id = cws.id\n        "));
                    return [4 /*yield*/, __await(cursor.read(1))];
                case 2:
                    rows = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!rows.length) return [3 /*break*/, 7];
                    console.log("====== in extract activities info =====");
                    return [4 /*yield*/, __await(rows[0])];
                case 4: return [4 /*yield*/, _a.sent()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, __await(cursor.read(1))];
                case 6:
                    rows = _a.sent();
                    return [3 /*break*/, 3];
                case 7:
                    cursor.close(function () {
                        client_1.release();
                    });
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    throw new etl_exception_1.default(error_1.message, etl_exception_1.etlExceptionType.EXTRACTION);
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.extract_activites_info = extract_activites_info;
