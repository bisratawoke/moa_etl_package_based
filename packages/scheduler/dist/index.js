"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schedule = require("node-schedule");
var kmis_1 = require("kmis");
var irrigation_1 = require("irrigation");
var calm_1 = require("calm");
var psnp_pw_1 = require("psnp-pw");
var job_1 = require("./job");
var moa_config_1 = require("moa_config");
// kmis schedules
schedule.scheduleJob(moa_config_1.default.KMIS_API_ETL_FREQUENCY, (0, job_1.default)("kmis etl", kmis_1.default, moa_config_1.default.KMIS_API_ETL_RETRY_RATE));
// calm etl schedule
schedule.scheduleJob(moa_config_1.default.CALM_DB_ETL_FREQUENCY, (0, job_1.default)("CALM MIS", calm_1.default, moa_config_1.default.CALM_DB_ETL_RETRY_RATE));
//irrigation schedule
schedule.scheduleJob(moa_config_1.default.IRRIGATION_ETL_FREQUENCY, (0, job_1.default)("small_holder_irrigation", irrigation_1.default, moa_config_1.default.IRRIGATION_ETL_RETRY_RATE));
// // // //psnp pw schedules
schedule.scheduleJob(moa_config_1.default.PSNP_PW_DB_ETL_FREQUENCY, (0, job_1.default)("psnp pw activities etl", (0, psnp_pw_1.default)(psnp_pw_1.OPERATION_TYPE.ACTIVITIES), moa_config_1.default.PSNP_PW_DB_ETL_RETRY_RATE));
schedule.scheduleJob(moa_config_1.default.PSNP_PW_DB_ETL_FREQUENCY, (0, job_1.default)("psnp pw admin location etl", (0, psnp_pw_1.default)(psnp_pw_1.OPERATION_TYPE.LOCATION), moa_config_1.default.PSNP_PW_DB_ETL_RETRY_RATE));
schedule.scheduleJob(moa_config_1.default.PSNP_PW_DB_ETL_FREQUENCY, (0, job_1.default)("psnp pw major watershed etl", (0, psnp_pw_1.default)(psnp_pw_1.OPERATION_TYPE.MAJOR_WATERSHED), moa_config_1.default.PSNP_PW_DB_ETL_RETRY_RATE));
schedule.scheduleJob(moa_config_1.default.PSNP_PW_DB_ETL_FREQUENCY, (0, job_1.default)("psnp pw micro watershed etl", (0, psnp_pw_1.default)(psnp_pw_1.OPERATION_TYPE.MICRO_WATERSHED), moa_config_1.default.PSNP_PW_DB_ETL_RETRY_RATE));
// schedule.scheduleJob(
//   config.NRLAIS_DB_ETL_FREQUENCY,
//   jobber(
//     "nrlias_data",
//     nrlais_parcel_elt(OPERATION_TYPE.SYNC),
//     config.NRLAIS_DB_ETL_RETRY_RATE
//   )
// );
