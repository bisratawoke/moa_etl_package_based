"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schedule = require("node-schedule");
var kmis_1 = require("kmis");
var calm_1 = require("calm");
var psnp_pw_1 = require("psnp-pw");
var job_1 = require("./job");
var moa_config_1 = require("moa_config");
//kmsi schedules
schedule.scheduleJob(moa_config_1.default.KMIS_API_ETL_FREQUENCY, (0, job_1.default)("kmis etl", kmis_1.default, moa_config_1.default.KMIS_API_ETL_RETRY_RATE));
//psnp pw schedules
schedule.scheduleJob(moa_config_1.default.PSNP_PW_DB_ETL_FREQUENCY, (0, job_1.default)("psnp pw activities etl", (0, psnp_pw_1.default)(psnp_pw_1.OPERATION_TYPE.ACTIVITIES), moa_config_1.default.PSNP_PW_DB_ETL_RETRY_RATE));
schedule.scheduleJob(moa_config_1.default.PSNP_PW_DB_ETL_FREQUENCY, (0, job_1.default)("psnp pw admin location etl", (0, psnp_pw_1.default)(psnp_pw_1.OPERATION_TYPE.LOCATION), moa_config_1.default.PSNP_PW_DB_ETL_RETRY_RATE));
schedule.scheduleJob(moa_config_1.default.PSNP_PW_DB_ETL_FREQUENCY, (0, job_1.default)("psnp pw major watershed etl", (0, psnp_pw_1.default)(psnp_pw_1.OPERATION_TYPE.MAJOR_WATERSHED), moa_config_1.default.PSNP_PW_DB_ETL_RETRY_RATE));
schedule.scheduleJob(moa_config_1.default.PSNP_PW_DB_ETL_FREQUENCY, (0, job_1.default)("psnp pw micro watershed etl", (0, psnp_pw_1.default)(psnp_pw_1.OPERATION_TYPE.MICRO_WATERSHED), moa_config_1.default.PSNP_PW_DB_ETL_RETRY_RATE));
//calm etl
schedule.scheduleJob(moa_config_1.default.CALM_DB_ETL_FREQUENCY, (0, job_1.default)("calm", calm_1.default, moa_config_1.default.CALM_DB_ETL_RETRY_RATE));
//12:25
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
