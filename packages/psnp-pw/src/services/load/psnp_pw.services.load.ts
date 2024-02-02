import axios from "axios";
import config from "moa_config";
import etlExceptions, { etlExceptionType } from "etl-exception";
const { v4: uuidv4 } = require("uuid");

//slmp_2001_2015_swc_treatments_result,psnp_phy_swc_treatment_result,mass_mobilization_physical_swc_treatment_report,calm_soil_water_conservation_treatments,pasidp_swc_treatments*
export async function insertIntoElastic(obj: any, indexname: any, id?: any) {
  try {
    throw new Error("i throw it insertIntoElastic...thats me");
    let indexName = indexname;
    const result = await axios.post(
      `${config.ELASTIC_URL}/${indexName}/_doc/${id ? id : uuidv4()}`,
      obj,
      {
        auth: {
          username: config.ELASTIC_USERNAME,
          password: config.ELASTIC_PASSWORD,
        },
      }
    );
    console.log(result.status);
  } catch (error: any) {
    console.log("== in here ==");
    const exp = new etlExceptions(
      error.message,
      // JSON.stringify(error.response.data),
      etlExceptionType.LOADING
    );
    throw exp;
  }
}
