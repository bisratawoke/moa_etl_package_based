const { v4: uuidv4 } = require("uuid");
// import {v4 as uuidv4} from "uuid"
import axios from "axios";
import etlExceptions, { etlExceptionType } from "etl-exception";
import config from "moa_config";

const elasticUrl = config.ELASTIC_URL;
const username: any = config.ELASTIC_USERNAME;
const password: any = config.ELASTIC_PASSWORD;

async function insertIntoElastic(obj: any, indexname: any, id?: any) {
  try {
    let indexName = indexname;

    console.log("==== in insertIntoElastic ===");
    const result = await axios.post(
      `${elasticUrl}/${indexName}/_doc/${id ? id : uuidv4()}`,
      obj,
      {
        auth: {
          username: username,
          password: password,
        },
      }
    );
    console.log(result.status);
  } catch (error: any) {
    const exp = new etlExceptions(error.message, etlExceptionType.LOADING);
    throw exp;
  }
}

function ethiopianToGregorian(ethiopianYear) {
  // The Ethiopian calendar is about 7-8 years behind the Gregorian calendar
  const gregorianOffset = 7;

  // Calculate the Gregorian year by adding the offset
  const gregorianYear = ethiopianYear + gregorianOffset;

  return gregorianYear;
}

function ethiopianQuarterToGregorian(ethiopianYear, ethiopianQuarter) {
  // The Ethiopian calendar is about 7-8 years behind the Gregorian calendar
  const gregorianOffset = 7;

  // Calculate the Gregorian year by adding the offset
  let gregorianYear = ethiopianYear + gregorianOffset;

  // Adjust the Gregorian year and quarter based on the Ethiopian quarter
  if (ethiopianQuarter > 1) {
    gregorianYear += 1;
  }
  const gregorianQuarter = ((ethiopianQuarter + 2) % 4) + 1;

  return {
    gregorianYear,
    gregorianQuarter,
  };
}
// function ethiopianQuarterToGregorian(
//   ethiopianYear: any,
//   ethiopianQuarter: any
// ) {
//   // The Ethiopian calendar is about 7-8 years behind the Gregorian calendar
//   const gregorianOffset = 7;

//   // Calculate the Gregorian year by adding the offset
//   const gregorianYear = ethiopianYear + gregorianOffset;

//   // Calculate the Gregorian quarter
//   const gregorianQuarter = ((ethiopianQuarter + 3) % 4) + 1;

//   return {
//     gregorianYear,
//     gregorianQuarter,
//   };
// }
function dateTransformer(record: Record<string, any>) {
  return {
    ...record,
    year: Number(
      ethiopianQuarterToGregorian(record.year, record.quarter).gregorianYear
    ),
    string_year: String(
      ethiopianQuarterToGregorian(record.year, record.quarter).gregorianYear
    ),
    quarter: record.quarter,
    eth_quarter: record.quarter,
    eth_year: Number(record.year),
  };
}
async function hectarOfAreaClosureWithinEtlCalendar() {
  try {
    const result = await removePreviousData(
      "slm_hectar_of_area_closure_testing_scheduler"
      // "slm_hectar_of_area_closure_in_eth_calendar"
    );

    console.log("=====finished removing previous data =====");
    const response = await axios.get(
      "http://slmpkmis.gov.et/api-slm-vis/public/woreda-quarterly-indicators-project-aggregated?indicator_code=IR3"
    );
    console.log("=====finished fetching data from server =====");
    console.log(response.data._embedded);

    response.data._embedded.woreda_quarterly_indicators_project_aggregated.forEach(
      async (rec: any, indx: any) => {
        let dateAddedRecord = dateTransformer(rec);
        let payload: any = {
          ...dateAddedRecord,
          record_type: "SLMP",
          area: parseFloat(rec.value),
        };

        if (parseInt(payload.string_year) > parseInt("2022")) {
          console.log(payload);
        }
        setTimeout(async () => {
          await insertIntoElastic(
            payload,
            "slm_hectar_of_area_closure_testing_scheduler"
            // "slm_hectar_of_area_closure_in_eth_calendar"
          );
        }, 2000 * indx);
      }
    );
  } catch (error: any) {
    if (error instanceof etlExceptions) throw error;
    else {
      const exp = new etlExceptions(error.message, etlExceptionType.LOADING);
      throw exp;
    }
  }
}

async function insertNumberOfWoredasWithEth() {
  try {
    const res = await removePreviousData(
      // "slm_number_of_woredas_in_eth_calendar"
      "slm_number_of_woredas_in_eth_calendar_scheduler_test"
    );
    const response = await axios.get(
      "http://slmpkmis.gov.et/api-slm-vis/public/region-mid-end-indicators-region-project-aggregated?indicator_code=IR8"
    );

    response.data._embedded.region_mid_end_indicators_region_project_aggregated.forEach(
      async (rec: any, indx: any) => {
        let dateAddedRecord = dateTransformer(rec);

        let payload = {
          ...dateAddedRecord,
          value: parseFloat(rec.value),
          record_type: "SLMP",
        };

        setTimeout(async () => {
          await insertIntoElastic(
            payload,
            // "slm_number_of_woredas_in_eth_calendar"
            "slm_number_of_woredas_in_eth_calendar_scheduler_test"
          );
        }, 300 * indx);
      }
    );
  } catch (error: any) {
    if (error instanceof etlExceptions) throw error;

    const exp = new etlExceptions(error.message, etlExceptionType.LOADING);
    throw exp;
  }
}

async function insertCommunityWaterShedsCoopWithEthCalendar() {
  try {
    //watercoopsinethcalendar_calendar_test
    //watercoopsinethcalendar
    let res = await removePreviousData("watercoopsinethcalendar_calendar_test");
    const dataFromKmisApi = await axios.get(
      "http://slmpkmis.gov.et/api-slm-vis/public/woreda-quarterly-indicators-project-aggregated?indicator_code=IR7"
    );

    dataFromKmisApi.data._embedded.woreda_quarterly_indicators_project_aggregated.forEach(
      async (rec: any, idx: any) => {
        try {
          let dateAddedRecord = dateTransformer(rec);

          const payload = {
            ...dateAddedRecord,
            record_type: "SLMP",
            result: String(rec.value),
            quarter: rec.quarter,
          };
          setTimeout(async () => {
            await insertIntoElastic(
              payload,
              "watercoopsinethcalendar_calendar_test"
            );
          }, idx * 300);
        } catch (error) {
          console.log(error);
        }
      }
    );
  } catch (error: any) {
    if (error instanceof etlExceptions) throw error;
    const exp = new etlExceptions(error.message, etlExceptionType.LOADING);
    throw exp;
  }
}

async function lswi() {
  try {
    const result = await removePreviousData(
      "slm_land_surface_water_index_scheduler_test"
    );
    const dataFromKmisApi = await axios.get(
      "http://slmpkmis.gov.et/api-slm-vis/public/mws-mid-end-indicators-mws-project-aggregated?indicator_code=PDO3"
    );

    dataFromKmisApi.data._embedded.mws_mid_end_indicators_mws_project_aggregated.forEach(
      async (rec: any, indx: any) => {
        let dateAddedRecord = dateTransformer(rec);

        let result: any = rec.numerator / rec.denominator;
        let data: any = {
          ...dateAddedRecord,
          record_type: "SLMP",
          result: parseFloat(result),
          value: parseFloat(rec.value),
        };
        setTimeout(async () => {
          await insertIntoElastic(
            data,
            "slm_land_surface_water_index_scheduler_test",
            data.id
          );
        }, indx * 100);
      }
    );
  } catch (error: any) {
    if (error instanceof etlExceptions) throw error;

    const exp = new etlExceptions(error.message, etlExceptionType.LOADING);
    throw exp;
  }
}

async function insertMicroWatershed() {
  try {
    const result = await removePreviousData("microwatersheds_information_slmp");
    const response = await axios.get(
      "http://slmpkmis.gov.et/api-slm-vis/public/mws_basic"
    );
    response.data._embedded.mws_basic.forEach(async (rec: any, indx: any) => {
      let dateAddedRecord: any = dateTransformer(rec);

      let payload = {
        ...dateAddedRecord,
        record_type: "SLMP",
        "Micro Watershed": `${rec.mws_name}-${indx}`,
        "Major Watershed": rec.cws_name,
      };

      //smlp_major_watershed_schedular_test
      //smlp_major_watershed
      setTimeout(async () => {
        await insertIntoElastic(
          payload,
          "microwatersheds_information_slmp",
          // payload.id
          indx
        );
      }, 300 * indx);
    });
  } catch (error: any) {
    if (error instanceof etlExceptions) throw error;

    const exp = new etlExceptions(error.message, etlExceptionType.LOADING);
    throw exp;
  }
}

async function insertMajorWatershed() {
  try {
    const result = await removePreviousData(
      "smlp_major_watershed_schedular_test"
    );
    const response = await axios.get(
      "http://slmpkmis.gov.et/api-slm-vis/public/cws_basic"
    );
    response.data._embedded.cws_basic.forEach(async (rec: any, indx: any) => {
      let dateAddedRecord: any = dateTransformer(rec);

      let payload = {
        ...dateAddedRecord,
        record_type: "SLMP",
        cws_id: String(indx),
      };

      //smlp_major_watershed_schedular_test
      //smlp_major_watershed
      setTimeout(async () => {
        await insertIntoElastic(
          payload,
          "smlp_major_watershed_schedular_test",
          indx
          // payload.id
        );
      }, 300 * indx);
    });
  } catch (error: any) {
    if (error instanceof etlExceptions) throw error;

    const exp = new etlExceptions(error.message, etlExceptionType.LOADING);
    throw exp;
  }
}

async function removePreviousData(indexName: string) {
  try {
    console.log("======= in remove previous data =====");
    console.log(indexName);
    const opts = {
      query: {
        match_all: {},
      },
    };

    console.log(`${elasticUrl}/${indexName}/_delete_by_query`);
    const response = await axios.post(
      `${elasticUrl}/${indexName}/_delete_by_query`,
      opts,
      {
        auth: {
          username: username,
          password: password,
        },
      }
    );
  } catch (error: any) {
    if (error instanceof etlExceptions) throw error;

    const exp = new etlExceptions(error.message, etlExceptionType.LOADING);
    throw exp;
  }
}

export default async function main() {
  try {
    setTimeout(async () => {
      try {
        await insertMajorWatershed();
      } catch (error) {
        if (error instanceof etlExceptions) throw error;
        else {
          throw new etlExceptions(error.message, etlExceptionType.UNKNOWN);
        }
      }
    }, 5000);

    setTimeout(async () => {
      try {
        await insertMicroWatershed();
      } catch (error) {
        if (error instanceof etlExceptions) throw error;
        else {
          throw new etlExceptions(error.message, etlExceptionType.UNKNOWN);
        }
      }
    }, 10000);

    // setTimeout(async () => {
    //   try {
    //     await hectarOfAreaClosureWithinEtlCalendar();
    //   } catch (error) {
    //     if (error instanceof etlExceptions) throw error;
    //     else {
    //       throw new etlExceptions(error.message, etlExceptionType.UNKNOWN);
    //     }
    //   }
    // }, 15000);

    // setTimeout(async () => {
    //   try {
    //     await lswi();
    //   } catch (error) {
    //     if (error instanceof etlExceptions) throw error;
    //     else {
    //       throw new etlExceptions(error.message, etlExceptionType.UNKNOWN);
    //     }
    //   }
    // }, 20000);

    // setTimeout(async () => {
    //   try {
    //     await insertNumberOfWoredasWithEth();
    //   } catch (error) {
    //     if (error instanceof etlExceptions) throw error;
    //     else {
    //       throw new etlExceptions(error.message, etlExceptionType.UNKNOWN);
    //     }
    //   }
    // }, 25000);

    // setTimeout(async () => {
    //   try {
    //     await insertCommunityWaterShedsCoopWithEthCalendar();
    //   } catch (error) {
    //     if (error instanceof etlExceptions) throw error;
    //     else {
    //       throw new etlExceptions(error.message, etlExceptionType.UNKNOWN);
    //     }
    //   }
    // }, 30000);
  } catch (error) {
    if (error instanceof etlExceptions) throw error;
    else {
      throw new etlExceptions(error.message, etlExceptionType.UNKNOWN);
    }
  }
}

(async () => {
  await main();
})();
