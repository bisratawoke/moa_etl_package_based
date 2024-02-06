"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schedule = require("node-schedule");
var nrlais_1 = require("nrlais");
var job_1 = require("./job");
var moa_config_1 = require("moa_config");
// //kmis schedules
// schedule.scheduleJob(
//   config.KMIS_API_ETL_FREQUENCY,
//   jobber("kmis etl", kmis, config.KMIS_API_ETL_RETRY_RATE)
// );
// //psnp pw schedules
// schedule.scheduleJob(
//   config.PSNP_PW_DB_ETL_FREQUENCY,
//   jobber(
//     "psnp pw activities etl",
//     psnp_etl(PSNP_OP_TYPE.ACTIVITIES),
//     config.PSNP_PW_DB_ETL_RETRY_RATE
//   )
// );
// schedule.scheduleJob(
//   config.PSNP_PW_DB_ETL_FREQUENCY,
//   jobber(
//     "psnp pw admin location etl",
//     psnp_etl(PSNP_OP_TYPE.LOCATION),
//     config.PSNP_PW_DB_ETL_RETRY_RATE
//   )
// );
// schedule.scheduleJob(
//   config.PSNP_PW_DB_ETL_FREQUENCY,
//   jobber(
//     "psnp pw major watershed etl",
//     psnp_etl(PSNP_OP_TYPE.MAJOR_WATERSHED),
//     config.PSNP_PW_DB_ETL_RETRY_RATE
//   )
// );
// schedule.scheduleJob(
//   config.PSNP_PW_DB_ETL_FREQUENCY,
//   jobber(
//     "psnp pw micro watershed etl",
//     psnp_etl(PSNP_OP_TYPE.MICRO_WATERSHED),
//     config.PSNP_PW_DB_ETL_RETRY_RATE
//   )
// );
// //calm etl
// schedule.scheduleJob(
//   config.CALM_DB_ETL_FREQUENCY,
//   jobber("calm", calm, config.CALM_DB_ETL_RETRY_RATE)
// );
//12:25
schedule.scheduleJob(moa_config_1.default.NRLAIS_DB_ETL_FREQUENCY, (0, job_1.default)("nrlias_data", (0, nrlais_1.nrlais_parcel_elt)(nrlais_1.OPERATION_TYPE.SYNC), moa_config_1.default.NRLAIS_DB_ETL_RETRY_RATE));
// schedule.scheduleJob(
//   "54 10 * * *",
//   jobber("small_holder_irrigation", irrigation, 3600000)
// );
// schedule.scheduleJob("40 10 * * *", jobber("kmis", kmis, 3600000));
// schedule.scheduleJob("", jobber("calm", calm, 3600000));
