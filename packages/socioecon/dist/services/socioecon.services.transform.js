"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthToText = exports.getQuarter = exports.timeInfo = void 0;
function timeInfo(date) {
    return {
        year: new Date(date).getFullYear(),
        text_date: String(new Date(date).getFullYear()),
        month: monthToText(new Date(date).getMonth()),
        day: new Date(date).getDate(),
        quarter: getQuarter(new Date(date).getMonth()),
    };
}
exports.timeInfo = timeInfo;
function getQuarter(month) {
    if (month < 1 || month > 12 || isNaN(month)) {
        return "Invalid month. Please enter a number between 1 and 12.";
    }
    var quarters = {
        1: "First",
        2: "First",
        3: "First",
        4: "Second",
        5: "Second",
        6: "Second",
        7: "Third",
        8: "Third",
        9: "Third",
        10: "Fourth",
        11: "Fourth",
        12: "Fourth",
    };
    return quarters[month];
}
exports.getQuarter = getQuarter;
function monthToText(month) {
    if (month < 1 || month > 12 || isNaN(month)) {
        return "Invalid month. Please enter a number between 1 and 12.";
    }
    var months = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
    };
    return months[month];
}
exports.monthToText = monthToText;
