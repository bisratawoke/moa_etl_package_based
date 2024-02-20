import { Pool } from "pg";
import config from "config";

class dbConn {
  private pool: Pool;
  public client: any;
  constructor() {
    this.pool = new Pool({
      host: config.NRLAIS_DB_HOST,
      port: config.NRLAIS_DB_PORT,
      password: config.NRLAIS_DB_PASSWORD,
      user: config.NRLAIS_DB_USER,
      database: config.NRLAIS_DB_NAME,
    });
    this.connect();
  }

  private connect() {
    this.pool
      .connect()
      .then((con) => {
        this.client = con;
        this.client.query("select 1", (err: any, result: any) => {
          if (err) {
            console.log("====== error in connect ======");
            console.log(err);
          } else {
            console.log(result.rows);
          }
        });
      })
      .catch((err) => {
        console.log("=== error connecting to database ====");
        console.log(err);
      });
  }
}

export default new dbConn();
