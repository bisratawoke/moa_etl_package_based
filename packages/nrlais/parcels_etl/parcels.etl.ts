import etlExceptions, { etlExceptionType } from "etl-exception";
import {
  readConfig,
  updateConfig,
  getMaxCreatedAtAndUpdatedAtFromIndex,
  indexName,
} from "./utils";
import env from "moa_config";
import { Pool } from "pg";

export default async function etl() {
  try {
    const pool = new Pool({
      host: env.NRLAIS_DB_HOST,
      port: env.NRLAIS_DB_PORT,
      password: env.NRLAIS_DB_PASSWORD,
      user: env.NRLAIS_DB_USER,
      database: env.NRLAIS_DB_NAME,
    });

    const client = await pool.connect();
    let config = readConfig();
    client.query(
      `select * from account where created_at > '${config.created_at}' or updated_at > '${config.updated_at}'`,
      async (err: any, result: any) => {
        if (err) {
          throw new etlExceptions(err.message, etlExceptionType.EXTRACTION);
        } else {
          for (let x = 0; x < result.rows.length; x++) {
            /**
             * TODO: transform , check if record already exists , insert record
             *
             */
            console.log(result.rows[x]);
          }

          let max_created_at_updated_at =
            await getMaxCreatedAtAndUpdatedAtFromIndex(indexName);
          updateConfig(max_created_at_updated_at);
        }
      }
    );
  } catch (error) {
    if (error instanceof etlExceptions) throw error;
    else throw new etlExceptions(error.message, etlExceptionType.UNKNOWN);
  }
}
