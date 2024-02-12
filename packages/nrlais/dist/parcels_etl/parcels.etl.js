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
var etl_exception_1 = require("etl-exception");
var moa_config_1 = require("moa_config");
var pg_1 = require("pg");
var utils_1 = require("./utils");
/**
 * select
    respartytype.en as res_type,
    tpartyres.partytype,
    partytype.en,
    t_party.partytype,
    familyrole.en,
    CASE
    WHEN t_party.gender = 'f'
    THEN 'Female'
    WHEN t_party.gender = 'm'
    THEN 'Male' ELSE 'Unknown'
    END AS gender_name,
    t_party.Name as name ,
    t_acm_mort_res.area as area ,
    t_parcel.uid as id ,
    t_region.csaregionnameeng as region_name ,
    t_zone.csazonenameeng as zone_name ,
    t_woreda.woredanameeng as woreda_name ,
    t_kebele.kebelenameeng as kebele_name
from nrlais_inventory.t_acm_mortgage  as t_acm_mort left join nrlais_inventory.t_acm_mortgage_restriction as t_acm_mort_res on  t_acm_mort.uid = t_acm_mort_res.mortgage_uid inner join nrlais_inventory.t_restrictions as t_res on t_acm_mort_res.restriction_uid = t_res.uid inner join nrlais_inventory.t_party as tpartyres on t_res.partyuid = tpartyres.uid inner join nrlais_inventory.t_parcels as t_parcel on t_res.parceluid = t_parcel.uid inner join nrlais_inventory.t_rights as t_rights on t_parcel.uid = t_rights.parceluid inner join nrlais_inventory.t_party as t_party on t_rights.partyuid = t_party.uid inner join nrlais_sys.t_regions as t_region on t_region.csaregionid = t_parcel.csaregionid inner join nrlais_sys.t_zones as t_zone on t_zone.nrlais_zoneid = t_parcel.nrlais_zoneid inner join nrlais_sys.t_woredas as t_woreda on t_woreda.nrlais_woredaid = t_parcel.nrlais_woredaid inner join nrlais_sys.t_kebeles as t_kebele on t_kebele.nrlais_kebeleid = t_parcel.nrlais_kebeleid inner join nrlais_sys.t_cl_familyrole as familyrole on familyrole.codeid = t_party.mreg_familyrole inner join nrlais_sys.t_cl_partytype as respartytype on tpartyres.partytype = respartytype.codeid inner join nrlais_sys.t_cl_partytype as partytype on t_party.partytype = partytype.codeid

 */
function etl() {
    return __awaiter(this, void 0, void 0, function () {
        var pool, client, max_query_result, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    pool = new pg_1.Pool({
                        host: moa_config_1.default.NRLAIS_DB_HOST,
                        port: moa_config_1.default.NRLAIS_DB_PORT,
                        password: moa_config_1.default.NRLAIS_DB_PASSWORD,
                        user: moa_config_1.default.NRLAIS_DB_USER,
                        database: moa_config_1.default.NRLAIS_DB_NAME,
                    });
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, (0, utils_1.getMaxDate)()];
                case 2:
                    max_query_result = _a.sent();
                    console.log(max_query_result);
                    client.query("select t_parcels.syscreatedate as created_at, t_parcels.syslastmoddate as updated_at, t_parcels.uid as id, ST_AsText(ST_Transform(t_parcels.geometry,4326)) as location, t_parcels.syscreatedate as date ,t_party.gender as gender, t_party.partytype ,t_rights.partyuid , t_reg.csaregionnameeng as region_name ,  t_zone.csazonenameeng as zone_name , t_woreda.woredanameeng as woreda_name ,  ST_AsText(ST_Transform(t_woreda.geometry,4326)) as woreda_location , t_kebeles.kebelenameeng as kebele_name  , t_holdings.holdingtype , t_parcels.areageom  from nrlais_inventory.t_parcels as t_parcels left join nrlais_inventory.fdconnector as fd on fd.wfsid = t_parcels.uid left join nrlais_inventory.t_sys_fc_holding as t_sys on t_sys.fdc_uid = fd.uid  left join nrlais_inventory.t_holdings as t_holdings on t_sys.holdinguid = t_holdings.uid left join nrlais_sys.t_regions as t_reg on t_parcels.csaregionid = t_reg.csaregionid left join nrlais_sys.t_zones as t_zone on t_parcels.nrlais_zoneid = t_zone.nrlais_zoneid left join nrlais_sys.t_woredas as t_woreda on t_parcels.nrlais_woredaid = t_woreda.nrlais_woredaid left join nrlais_sys.t_kebeles as t_kebeles on t_parcels.nrlais_kebeleid = t_kebeles.nrlais_kebeleid left join nrlais_inventory.t_rights as t_rights on t_rights.parceluid = t_parcels.uid left join nrlais_inventory.t_party as t_party on t_rights.partyuid = t_party.uid where t_parcels.syscreatedate > '".concat(max_query_result.value_as_string, "' or t_parcels.syslastmoddate > '").concat(max_query_result.value_as_string, "'"), function (err, result) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (err) {
                                console.log(err);
                                console.log(err.message);
                                throw new etl_exception_1.default(err.message, etl_exception_1.etlExceptionType.EXTRACTION);
                            }
                            else {
                                console.log(result.rows.length);
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if (error_1 instanceof etl_exception_1.default)
                        throw error_1;
                    else
                        throw new etl_exception_1.default(error_1.message, etl_exception_1.etlExceptionType.UNKNOWN);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = etl;
