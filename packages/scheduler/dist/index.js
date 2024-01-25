"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schedule = require("node-schedule");
var kmis_1 = require("kmis");
var job_1 = require("./job");
// (async (job) => {
//   try {
//     await job();
//   } catch (error) {
//     console.log(error);
//   }
// })(nrlais_parcel_elt(OPERATION_TYPE.ETL));
// schedule.scheduleJob(
//   "1/ * * * *",
//   jobber("nrlias_data", nrlais_parcel_elt(OPERATION_TYPE.ETL), 3600000)
// );
// schedule.scheduleJob(
//   "54 10 * * *",
//   jobber("small_holder_irrigation", irrigation, 3600000)
// );
schedule.scheduleJob("40 10 * * *", (0, job_1.default)("kmis", kmis_1.default, 3600000));
// schedule.scheduleJob("", jobber("calm", calm, 3600000));
