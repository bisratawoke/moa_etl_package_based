import axios from "axios";
import config from "moa_config";
import etlExceptions, { etlExceptionType } from "etl-exception";
const { v4: uuidv4 } = require("uuid");

export async function insertIntoElastic(obj: any, indexname: any, id?: any) {
  try {
    let indexName = indexname;
    console.log(obj.region_name == "SNNPR" ? obj : "");
    // const result = await axios.post(
    //   `${config.ELASTIC_URL}/${indexName}/_doc/${id ? id : uuidv4()}`,
    //   obj,
    //   {
    //     auth: {
    //       username: config.ELASTIC_USERNAME,
    //       password: config.ELASTIC_PASSWORD,
    //     },
    //   }
    // );
    // console.log(result.status);
  } catch (error: any) {
    console.log("== in here ==");
    console.log(error);
    const exp = new etlExceptions(
      error.message,
      // JSON.stringify(error.response.data),
      etlExceptionType.LOADING
    );
    throw exp;
  }
}
