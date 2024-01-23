const { v4: uuidv4 } = require("uuid");
// import {v4 as uuidv4} from "uuid"
import axios from "axios";
import etlExceptions, { etlExceptionType } from "etl-exception";
import config from "config";

const elasticUrl = config.ELASTIC_URL;
const username: any = config.ELASTIC_USERNAME;
const password: any = config.ELASTIC_PASSWORD;

async function insertIntoElastic(obj: any, indexname: any, id?: any) {
  try {
    let indexName = indexname;

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
        let payload = {
          ...rec,
          record_type: "SLMP",
          area: parseFloat(rec.value),
          year: Number(rec.year),
          string_year: String(rec.year),
        };

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
      "slm_number_of_woredas_in_eth_calendar"
    );
    const response = await axios.get(
      "http://slmpkmis.gov.et/api-slm-vis/public/region-mid-end-indicators-region-project-aggregated?indicator_code=IR8"
    );

    response.data._embedded.region_mid_end_indicators_region_project_aggregated.forEach(
      async (rec: any, indx: any) => {
        console.log(rec);
        let payload = {
          ...rec,
          value: parseFloat(rec.value),
          record_type: "SLMP",
          year: Number(rec.year),
          string_year: String(rec.year),
        };

        setTimeout(async () => {
          await insertIntoElastic(
            payload,
            "slm_number_of_woredas_in_eth_calendar"
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
    let res = await removePreviousData("watercoopsinethcalendar");
    const dataFromKmisApi = await axios.get(
      "http://slmpkmis.gov.et/api-slm-vis/public/woreda-quarterly-indicators-project-aggregated?indicator_code=IR7"
    );

    dataFromKmisApi.data._embedded.woreda_quarterly_indicators_project_aggregated.forEach(
      async (rec: any, idx: any) => {
        try {
          const payload = {
            ...rec,
            record_type: "SLMP",
            result: String(rec.value),
            year: Number(rec.year),
            string_year: String(rec.year),
            quarter: rec.quarter,
          };
          setTimeout(async () => {
            await insertIntoElastic(payload, "watercoopsinethcalendar");
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
    const result = await removePreviousData("slm_land_surface_water_index");
    const dataFromKmisApi = await axios.get(
      "http://slmpkmis.gov.et/api-slm-vis/public/mws-mid-end-indicators-mws-project-aggregated?indicator_code=PDO3"
    );
    dataFromKmisApi.data._embedded.mws_mid_end_indicators_mws_project_aggregated.forEach(
      async (rec: any, indx: any) => {
        let result: any = rec.numerator / rec.denominator;
        let data: any = {
          ...rec,
          record_type: "SLMP",
          result: parseFloat(result),
          value: parseFloat(rec.value),
          year: Number(rec.year),
          string_year: rec.year,
        };

        setTimeout(async () => {
          await insertIntoElastic(
            data,
            "slm_land_surface_water_index",
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

async function insertMajorWatershed() {
  try {
    const response = await axios.get(
      "http://slmpkmis.gov.et/api-slm-vis/public/cws_basic"
    );
    response.data._embedded.cws_basic.forEach(async (rec: any, indx: any) => {
      let payload = {
        ...rec,
        record_type: "SLMP",
      };

      setTimeout(async () => {
        await insertIntoElastic(payload, "smlp_major_watershed", payload.id);
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
    console.log("========== in main =========");
    await hectarOfAreaClosureWithinEtlCalendar();
    // await lswi();
    // await insertNumberOfWoredasWithEth();
    // await insertCommunityWaterShedsCoopWithEthCalendar();
    // await insertMajorWatershed();
  } catch (error) {
    // console.log(error);
    throw error;
  }
}
