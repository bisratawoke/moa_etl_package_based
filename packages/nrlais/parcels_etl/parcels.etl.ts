import client from "../dbConnection";
import etlExceptions, { etlExceptionType } from "etl-exception";
import { readConfig, updateConfig } from "./utils";

export default async function etl() {
  try {
    let config = readConfig();
    client.query(
      `select * from account where created_at > ${config.created_at} or updated_at > ${config.update_at}`,
      (err: any, result: any) => {
        if (err) {
          throw new etlExceptions(err.message, etlExceptionType.EXTRACTION);
        } else {
          console.log(result.rows);
        }
      }
    );
  } catch (error) {
    if (error instanceof etlExceptions) throw error;
    else throw new etlExceptions(error.message, etlExceptionType.UNKNOWN);
  }
}
