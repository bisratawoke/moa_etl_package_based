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
function actTransformer(record) {
    console.log("====== in transformer ====");
    console.log(record.unit);
    console.log("====== out transformer ====");
    return __assign(__assign({}, record), { location: JSON.parse(record.location), Unit: record.unit ? record.unit.toLowerCase() : "", area: record.unit && record.unit.toLowerCase() == "ha"
            ? record.area / 10000
            : record.area });
}
exports.default = actTransformer;
