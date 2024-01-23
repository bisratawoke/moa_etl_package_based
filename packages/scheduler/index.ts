const schedule = require("node-schedule");
import kmis from "kmis";
import irrigation from "irrigation";
import calm from "calm";
import { OPERATION_TYPE, nrlais_parcel_elt } from "nrlais";
import jobber from "./job";

schedule.scheduleJob(
  "42 4 * * *",
  jobber("nrlias_data", await nrlais_parcel_elt(OPERATION_TYPE.ETL), 3600000)
);
// schedule.scheduleJob(
//   "54 10 * * *",
//   jobber("small_holder_irrigation", irrigation, 3600000)
// );

// schedule.scheduleJob("54 10 * * *", jobber("kmis", kmis, 3600000));

// schedule.scheduleJob("", jobber("calm", calm, 3600000));
