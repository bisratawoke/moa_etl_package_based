import { Pool } from "pg";
import config from "config";

const pool = new Pool({
  host: config.NRLAIS_DB_HOST,
  port: config.NRLAIS_DB_PORT,
  password: config.NRLAIS_DB_PASSWORD,
  user: config.NRLAIS_DB_USER,
  database: config.NRLAIS_DB_NAME,
});

const client = await pool.connect();

export default client;
