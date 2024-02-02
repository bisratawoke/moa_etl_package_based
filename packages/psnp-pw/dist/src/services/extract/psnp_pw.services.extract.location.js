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
exports.extractMicrowatshed = exports.extractMajorWatershed = exports.admin_location_info_extraction = void 0;
var etl_exception_1 = require("etl-exception");
var Cursor = require("pg-cursor");
var psnp_pw_services_database_1 = require("../database/psnp_pw.services.database");
//TODO: Maybe consider created a general/common postgres extract that all packages can use
function admin_location_info_extraction() {
    return __asyncGenerator(this, arguments, function admin_location_info_extraction_1() {
        var client_1, cursor, rows, rec, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, __await(psnp_pw_services_database_1.default.connect())];
                case 1:
                    client_1 = _a.sent();
                    cursor = client_1.query(new Cursor("\n        select \n            kebele.id as id,\n            kebele.name as kebele_name,\n            woreda.name as woreda_name,\n            zone.name as zone_name,\n            region.name as region_name,\n            cws.id as cws_id,\n            cws.name as \"Major Watershed\",\n            mws.name as \"Micro Watershed\",\n            ST_AsGeoJSON(kebele.geom) as kebele_location,\n            ST_AsGeoJSON(woreda.geom) as woreda_location,\n            ST_AsGeoJSON(zone.geom) as zone_location,\n            ST_AsGeoJSON(region.geom) as region_location,\n            ST_AsGeoJSON(mws.geom) as microwatershed_location,\n            ST_AsGeoJSON(cws.geom) as watershed_location,\n            ST_Area(mws.geom)/10000 as microwatershed_area,\n            ST_Area(cws.geom)/10000 as majorwatershed_area,\n            'PSNP PW' As record_type\n            from kebeles as kebele \n            full join microwatersheds as mws on kebele.parent_id = mws.id \n            full join watersheds as cws on mws.parent_id = cws.id \n            full join woredas as woreda on woreda.id = kebele.parent_id \n            full join zones as zone on zone.id = woreda.parent_id \n            full join regions as region on region.id = zone.parent_id\n    "));
                    return [4 /*yield*/, __await(cursor.read(1))];
                case 2:
                    rows = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!rows.length) return [3 /*break*/, 7];
                    rec = rows[0];
                    return [4 /*yield*/, __await(rec)];
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
exports.admin_location_info_extraction = admin_location_info_extraction;
//psnp_pw_major_watershed
//Major watershed info
function extractMajorWatershed() {
    return __asyncGenerator(this, arguments, function extractMajorWatershed_1() {
        var client_2, cursor, rows, rec, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, __await(psnp_pw_services_database_1.default.connect())];
                case 1:
                    client_2 = _a.sent();
                    cursor = client_2.query(new Cursor("\n    select \n      watershed.id as id,\n      watershed.id as cws_id,\n      watershed.name as Major_watershed , \n      ST_AsGeoJSON(watershed.geom) as location,\n      ST_Area(watershed.geom) as area , \n      region.name as region_name ,\n      zone.name as zone_name , \n      woreda.name as woreda_name\n      from watersheds as watershed \n      full join woredas as woreda on woreda.id = watershed.parent_id \n      full join zones as zone on zone.id = woreda.parent_id\n      full join regions as region on region.id = zone.parent_id limit 1\n    "));
                    return [4 /*yield*/, __await(cursor.read(1))];
                case 2:
                    rows = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!rows.length) return [3 /*break*/, 7];
                    rec = rows[0];
                    return [4 /*yield*/, __await(rec)];
                case 4: return [4 /*yield*/, _a.sent()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, __await(cursor.read(1))];
                case 6:
                    rows = _a.sent();
                    return [3 /*break*/, 3];
                case 7:
                    cursor.close(function () {
                        client_2.release();
                    });
                    return [3 /*break*/, 9];
                case 8:
                    error_2 = _a.sent();
                    throw new etl_exception_1.default(error_2.message, etl_exception_1.etlExceptionType.EXTRACTION);
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.extractMajorWatershed = extractMajorWatershed;
//psnp_pw_micro_watershed
//Micro watershed
function extractMicrowatshed() {
    return __asyncGenerator(this, arguments, function extractMicrowatshed_1() {
        var client_3, cursor, rows, rec, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, __await(psnp_pw_services_database_1.default.connect())];
                case 1:
                    client_3 = _a.sent();
                    cursor = client_3.query(new Cursor("\n      select\n            mws.id as id,\n            mws.id as mws_id,\n            kebele.name as kebele_name,\n            woreda.name as woreda_name,\n            zone.name as zone_name,\n            region.name as region_name,\n            cws.id as cws_id,\n            cws.name as \"Major Watershed\",\n            mws.name as \"Micro Watershed\",\n            ST_AsGeoJSON(kebele.geom) as kebele_location,\n            ST_AsGeoJSON(woreda.geom) as woreda_location,\n            ST_AsGeoJSON(zone.geom) as zone_location,\n            ST_AsGeoJSON(region.geom) as region_location,\n            ST_AsGeoJSON(mws.geom) as microwatershed_location,\n            ST_AsGeoJSON(cws.geom) as watershed_location,\n            ST_Area(mws.geom)/10000 as microwatershed_area,\n            ST_Area(cws.geom)/10000 as majorwatershed_area,\n            'PSNP PW' As record_type\n            from kebeles as kebele \n            full join microwatersheds as mws on kebele.parent_id = mws.id \n            full join watersheds as cws on mws.parent_id = cws.id \n            full join woredas as woreda on woreda.id = kebele.parent_id \n            full join zones as zone on zone.id = woreda.parent_id \n            full join regions as region on region.id = zone.parent_id\n    "));
                    return [4 /*yield*/, __await(cursor.read(1))];
                case 2:
                    rows = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!rows.length) return [3 /*break*/, 7];
                    rec = rows[0];
                    return [4 /*yield*/, __await(rec)];
                case 4: return [4 /*yield*/, _a.sent()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, __await(cursor.read(1))];
                case 6:
                    rows = _a.sent();
                    return [3 /*break*/, 3];
                case 7:
                    cursor.close(function () {
                        client_3.release();
                    });
                    return [3 /*break*/, 9];
                case 8:
                    error_3 = _a.sent();
                    console.log(error_3.message);
                    throw new etl_exception_1.default(error_3.message, etl_exception_1.etlExceptionType.EXTRACTION);
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.extractMicrowatshed = extractMicrowatshed;
