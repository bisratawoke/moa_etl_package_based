const schedule = require("node-schedule");
import kmis from "kmis";
import irrigation from "irrigation";
import calm from "calm";
import { OPERATION_TYPE, nrlais_parcel_elt } from "nrlais";
import jobber from "./job";

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

schedule.scheduleJob("40 10 * * *", jobber("kmis", kmis, 3600000));

// schedule.scheduleJob("", jobber("calm", calm, 3600000));
