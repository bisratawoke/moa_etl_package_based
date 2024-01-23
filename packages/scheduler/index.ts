const schedule = require("node-schedule");
import kmis from "kmis";
import irrigation from "irrigation";
import jobber from "./job";

schedule.scheduleJob(
  "54 10 * * *",
  jobber("small_holder_irrigation", irrigation, 3600000)
);

schedule.scheduleJob("54 10 * * *", jobber("kmis", kmis, 3600000));
