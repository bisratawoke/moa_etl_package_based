import { Pool } from "pg";
import config from "moa_config";

const pool = new Pool({
  host: config.PSNP_PW_DB_HOST,
  port: config.PSNP_PW_DB_PORT,
  password: config.PSNP_PW_DB_PASSWORD,
  user: config.PSNP_PW_DB_USER,
  database: config.PSNP_PW_DB_NAME,
});

export default pool;
