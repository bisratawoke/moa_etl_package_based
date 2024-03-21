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
Object.defineProperty(exports, "__esModule", { value: true });
exports.normailizeRegionName = exports.adminLocationTransformer = exports.majorWatershedTransformer = exports.microwatshedTransformer = void 0;
function microwatshedTransformer(record) {
    return __assign(__assign({}, record), { kebele_location: JSON.parse(record.kebele_location), microwatershed_location: JSON.parse(record.microwatershed_location), woreda_location: JSON.parse(record.woreda_location), zone_location: JSON.parse(record.zone_location), region_location: JSON.parse(record.region_location), watershed_location: JSON.parse(record.watershed_location) });
}
exports.microwatshedTransformer = microwatshedTransformer;
function majorWatershedTransformer(record) {
    return __assign(__assign({}, record), { location: JSON.parse(record.location) });
}
exports.majorWatershedTransformer = majorWatershedTransformer;
function adminLocationTransformer(record) {
    return __assign(__assign({}, record), { kebele_location: JSON.parse(record.kebele_location), woreda_location: JSON.parse(record.woreda_location), zone_location: JSON.parse(record.zone_location), region_location: JSON.parse(record.region_location), microwatershed_location: JSON.parse(record.microwatershed_location), watershed_location: JSON.parse(record.microwatershed_location) });
}
exports.adminLocationTransformer = adminLocationTransformer;
function normailizeRegionName(record) {
    var new_region_name = "";
    switch (record.region_name) {
        case "SNNPR":
            new_region_name = "SNNP";
        default:
            new_region_name = record.region_name;
    }
    return __assign(__assign({}, record), { region_name: new_region_name });
}
exports.normailizeRegionName = normailizeRegionName;
