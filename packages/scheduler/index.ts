const schedule = require("node-schedule");
import kmis from "kmis";
import irrigation from "irrigation";
import calm from "calm";
import {
  OPERATION_TYPE,
  nrlais_parcel_elt,
  nrlais_transaction_elt,
  TRANSACTION_OPERATION_TYPE,
  nrlais_mortgage_sync,
  admin_location_etl,
} from "nrlais";
import psnp_etl, { OPERATION_TYPE as PSNP_OP_TYPE } from "psnp-pw";
import jobber from "./job";
import config from "moa_config";

// kmis schedules
schedule.scheduleJob(
  config.KMIS_API_ETL_FREQUENCY,
  jobber("kmis etl", kmis, config.KMIS_API_ETL_RETRY_RATE)
);

// calm etl schedule
schedule.scheduleJob(
  config.CALM_DB_ETL_FREQUENCY,
  jobber("CALM MIS", calm, config.CALM_DB_ETL_RETRY_RATE)
);

// irrigation schedule
schedule.scheduleJob(
  config.IRRIGATION_ETL_FREQUENCY,
  jobber(
    "small_holder_irrigation",
    irrigation,
    config.IRRIGATION_ETL_RETRY_RATE
  )
);

// psnp pw schedules
schedule.scheduleJob(
  config.PSNP_PW_DB_ETL_FREQUENCY,
  jobber(
    "psnp pw activities etl",
    psnp_etl(PSNP_OP_TYPE.ACTIVITIES),
    config.PSNP_PW_DB_ETL_RETRY_RATE
  )
);

schedule.scheduleJob(
  config.PSNP_PW_DB_ETL_FREQUENCY,
  jobber(
    "psnp pw admin location etl",
    psnp_etl(PSNP_OP_TYPE.LOCATION),
    config.PSNP_PW_DB_ETL_RETRY_RATE
  )
);

schedule.scheduleJob(
  config.PSNP_PW_DB_ETL_FREQUENCY,
  jobber(
    "psnp pw major watershed etl",
    psnp_etl(PSNP_OP_TYPE.MAJOR_WATERSHED),
    config.PSNP_PW_DB_ETL_RETRY_RATE
  )
);

schedule.scheduleJob(
  config.PSNP_PW_DB_ETL_FREQUENCY,
  jobber(
    "psnp pw micro watershed etl",
    psnp_etl(PSNP_OP_TYPE.MICRO_WATERSHED),
    config.PSNP_PW_DB_ETL_RETRY_RATE
  )
);

// nrlais etl
schedule.scheduleJob(
  config.NRLAIS_DB_ETL_FREQUENCY,
  jobber(
    "nrlias_data",
    nrlais_parcel_elt(OPERATION_TYPE.SYNC),
    config.NRLAIS_DB_ETL_RETRY_RATE
  )
);

schedule.scheduleJob(
  config.NRLAIS_DB_ETL_FREQUENCY,
  jobber(
    "nrlias_data",
    nrlais_parcel_elt(OPERATION_TYPE.SYNC_WITHOUT_GEOM),
    config.NRLAIS_DB_ETL_RETRY_RATE
  )
);

/**
 * @description
 *  - nrlais transaction etl
 */
schedule.scheduleJob(
  config.NRLAIS_DB_ETL_FREQUENCY,
  jobber(
    "nrlais_transaction_data",
    nrlais_transaction_elt(TRANSACTION_OPERATION_TYPE.WITHGENDER_INFO),
    config.NRLAIS_DB_ETL_RETRY_RATE
  )
);

schedule.scheduleJob(
  config.NRLAIS_DB_ETL_FREQUENCY,
  jobber(
    "nrlais_admin_location",
    admin_location_etl,
    config.NRLAIS_DB_ETL_FREQUENCY
  )
);

schedule.scheduleJob(
  config.NRLAIS_DB_ETL_FREQUENCY,
  jobber(
    "nrlais_transction_data",
    nrlais_transaction_elt(TRANSACTION_OPERATION_TYPE.WITHOUT_GENGER_INFO),
    config.NRLAIS_DB_ETL_RETRY_RATE
  )
);

schedule.scheduleJob(
  config.NRLAIS_DB_ETL_FREQUENCY,
  jobber(
    "nrlais_watershed_link",
    nrlais_parcel_elt(OPERATION_TYPE.WATERSHED_SYNC),
    config.NRLAIS_DB_ETL_RETRY_RATE
  )
);

schedule.scheduleJob(
  config.NRLAIS_DB_ETL_FREQUENCY,
  jobber(
    "nrlais_mortgage_data",
    nrlais_mortgage_sync,
    config.NRLAIS_DB_ETL_RETRY_RATE
  )
);
