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
exports.extract_activites_info = void 0;
var Pool = require("pg").Pool;
var Cursor = require("pg-cursor");
var moa_config_1 = require("moa_config");
var etl_exception_1 = require("etl-exception");
//psnp_water_shed_activities_schedular_test
var pool = new Pool({
    host: "196.188.234.214",
    port: moa_config_1.default.PSNP_PW_DB_PORT,
    password: moa_config_1.default.PSNP_PW_DB_PASSWORD,
    user: moa_config_1.default.PSNP_PW_DB_USER,
    database: moa_config_1.default.PSNP_PW_DB_NAME,
});
function extract_activites_info() {
    return __awaiter(this, void 0, void 0, function () {
        var client_1, cursor, rows, rec, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    console.log({
                        host: moa_config_1.default.PSNP_PW_DB_HOST,
                        port: moa_config_1.default.PSNP_PW_DB_PORT,
                        password: moa_config_1.default.PSNP_PW_DB_PASSWORD,
                        user: moa_config_1.default.PSNP_PW_DB_USER,
                        database: moa_config_1.default.PSNP_PW_DB_NAME,
                    });
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    client_1 = _a.sent();
                    cursor = client_1.query(new Cursor("select\n            act.id as act_id ,\n            kebele.name as kebele_name ,\n            woreda.name as woreda_name ,\n            zone.name as zone_name ,\n            region.name as region_name ,\n            act.status, act_type.name as activity_name ,\n            act_type.unit as Unit ,\n            act_type.name as treatment,\n            act_type.feature_type as feature_type , 'PSNP PW' as record_type ,\n            ST_AsGeoJson(act.geom) as Activity_location ,\n            ST_AsGeoJSON(kebele.geom) as kebele_location ,\n            ST_AsGeoJSON(woreda.geom) as woreda_location,\n            ST_AsGeoJSON(zone.geom) as zone_location ,\n            ST_AsGeoJSON(region.geom) as region_location,\n            mws.name as \"Micro Watershed\",\n            cws.name as \"cws_name\",\n            cws.id as cws_id,\n            ST_AsGeoJSON(mws.geom) as microwatershed_location,\n            ST_Area(mws.geom)/10000 as area,\n            EXTRACT(YEAR FROM act.created_at) AS year\n            from activities as act\n            inner join activity_types as act_type on act_type.id = act.activity_type_id\n            inner join kebeles as kebele on act.kebele_id = kebele.id\n            inner join woredas as woreda on kebele.parent_id = woreda.id\n            inner join zones as zone on zone.id = woreda.parent_id\n            inner join regions as region on region.id = zone.parent_id\n            left join microwatersheds as mws on act.microwatershed_id = mws.id\n            left join watersheds as cws on mws.parent_id = cws.id\n            limit 1\n        "));
                    return [4 /*yield*/, cursor.read(1)];
                case 2:
                    rows = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!rows.length) return [3 /*break*/, 5];
                    rec = rows[0];
                    console.log(rec);
                    return [4 /*yield*/, cursor.read(1)];
                case 4:
                    rows = _a.sent();
                    return [3 /*break*/, 3];
                case 5:
                    cursor.close(function () {
                        client_1.release();
                    });
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    throw new etl_exception_1.default(error_1.message, etl_exception_1.etlExceptionType.EXTRACTION);
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.extract_activites_info = extract_activites_info;
