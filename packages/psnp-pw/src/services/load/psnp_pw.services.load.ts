import axios from "axios";
import config from "moa_config";
import etlExceptions, { etlExceptionType } from "etl-exception";
const { v4: uuidv4 } = require("uuid");

export async function insertIntoElastic(obj: any, indexname: any, id?: any) {
  try {
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
    const exp = new etlExceptions(error.message, etlExceptionType.LOADING);
    throw exp;
  }
}
