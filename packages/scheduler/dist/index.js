"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schedule = require("node-schedule");
var psnp_pw_1 = require("psnp-pw");
schedule.scheduleJob("1 10 * * *", (0, psnp_pw_1.default)(psnp_pw_1.OPERATION_TYPE.ACTIVITIES));
schedule.scheduleJob("1 10 * * *", (0, psnp_pw_1.default)(psnp_pw_1.OPERATION_TYPE.LOCATION));
schedule.scheduleJob("1 10 * * *", (0, psnp_pw_1.default)(psnp_pw_1.OPERATION_TYPE.MAJOR_WATERSHED));
schedule.scheduleJob("1 10 * * *", (0, psnp_pw_1.default)(psnp_pw_1.OPERATION_TYPE.MICRO_WATERSHED));
// schedule.scheduleJob(
//   "1/ * * * *",
//   jobber("nrlias_data", nrlais_parcel_elt(OPERATION_TYPE.ETL), 3600000)
// );
// schedule.scheduleJob(
//   "54 10 * * *",
//   jobber("small_holder_irrigation", irrigation, 3600000)
// );
// schedule.scheduleJob("40 10 * * *", jobber("kmis", kmis, 3600000));
// schedule.scheduleJob("", jobber("calm", calm, 3600000));
