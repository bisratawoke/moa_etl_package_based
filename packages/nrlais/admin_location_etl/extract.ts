import { Pool } from "pg";
import config from "moa_config";
import etlExceptions, { etlExceptionType } from "etl-exception";
import { removeNullLocation } from "./transform";
import axios from "axios";

export async function insertIntoElastic(
  indexName: string,
  payload: Record<string, any>,
  id: string
) {
  try {
    const result = await axios.post(
      `${config.ELASTIC_URL}/${indexName}/_doc/${id}`,
      payload,
      {
        auth: {
          username: config.ELASTIC_USERNAME,
          password: config.ELASTIC_PASSWORD,
        },
      }
    );
  } catch (error) {
    console.log(error.response.data);
  }
}

export async function etl_region() {
  try {
    const pool = new Pool({
      host: config.NRLAIS_DB_HOST,
      port: config.NRLAIS_DB_PORT,
      password: config.NRLAIS_DB_PASSWORD,
      user: config.NRLAIS_DB_USER,
      database: config.NRLAIS_DB_NAME,
    });

    const conn = await pool.connect();
    const response = await conn.query(
      `
        select 
          id as region_id,
          csaregionnameeng as region_name,
          csaregionid as region_code,
          ST_AsText(ST_Transform(geometry,4326)) as location
        from nrlais_sys.t_regions;
    `
    );
    for (let x = 0; x < response.rows.length; x++) {
      let trans_record = await removeNullLocation(response.rows[x]);
      await insertIntoElastic(
        "nrlais_regions",
        trans_record,
        trans_record["region_id"]
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function etl_zone() {
  try {
    const pool = new Pool({
      host: config.NRLAIS_DB_HOST,
      port: config.NRLAIS_DB_PORT,
      password: config.NRLAIS_DB_PASSWORD,
      user: config.NRLAIS_DB_USER,
      database: config.NRLAIS_DB_NAME,
    });

    const conn = await pool.connect();
    const response = await conn.query(
      `
        select
          t_zone.id as zone_id, 
          t_zone.nrlais_zoneid as zone_code,
          t_region.csaregionid as region_code,
          t_region.csaregionnameeng as region_name,
          t_zone.csazonenameeng as zone_name,
          ST_AsGeoJson(ST_Transform(t_zone.geometry,4326)) as location
          from nrlais_sys.t_zones as t_zone
          inner join nrlais_sys.t_regions as t_region on t_zone.csaregionid = t_region.csaregionid
    `
    );
    for (let x = 0; x < response.rows.length; x++) {
      let trans_record = await removeNullLocation(response.rows[x]);
      await insertIntoElastic(
        "nrlais_zones",
        trans_record,
        String(trans_record["zone_id"])
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function etl_woreda() {
  try {
    const pool = new Pool({
      host: config.NRLAIS_DB_HOST,
      port: config.NRLAIS_DB_PORT,
      password: config.NRLAIS_DB_PASSWORD,
      user: config.NRLAIS_DB_USER,
      database: config.NRLAIS_DB_NAME,
    });

    const conn = await pool.connect();
    const response = await conn.query(
      `
      select 
        t_woreda.id as woreda_id,
        t_zone.nrlais_zoneid as zone_code,
        t_region.csaregionid as region_code,
        t_region.csaregionnameeng as region_name,
        t_zone.csazonenameeng as zone_name,
        t_woreda.woredanameeng as woreda_name,
        t_woreda.nrlais_woredaid as woreda_code,
        ST_AsText(ST_Transform(t_woreda.geometry,4326)) as location
        from nrlais_sys.t_woredas as t_woreda
        inner join nrlais_sys.t_zones as t_zone on t_zone.nrlais_zoneid = t_woreda.nrlais_zoneid
        inner join nrlais_sys.t_regions as t_region on t_zone.csaregionid = t_region.csaregionid

    `
    );
    for (let x = 0; x < response.rows.length; x++) {
      let trans_record = await removeNullLocation(response.rows[x]);
      await insertIntoElastic(
        "nrlais_woredas",
        trans_record,
        trans_record["woreda_id"]
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function etl_kebele() {
  try {
    const pool = new Pool({
      host: config.NRLAIS_DB_HOST,
      port: config.NRLAIS_DB_PORT,
      password: config.NRLAIS_DB_PASSWORD,
      user: config.NRLAIS_DB_USER,
      database: config.NRLAIS_DB_NAME,
    });

    const conn = await pool.connect();
    const response = await conn.query(
      `
      select 
        t_kebele.id as kebele_id,
        t_zone.nrlais_zoneid as zone_code,
        t_region.csaregionid as region_code,
        t_region.csaregionnameeng as region_name,
        t_zone.csazonenameeng as zone_name,
        t_woreda.woredanameeng as woreda_name,
        t_woreda.nrlais_woredaid as woreda_code,
        t_kebele.nrlais_kebeleid as kebele_code,
        t_kebele.kebelenameeng as kebele_name,
        ST_AsText(ST_Transform(t_kebele.geometry,4326)) as location
        from nrlais_sys.t_kebeles as t_kebele
        inner join nrlais_sys.t_woredas as t_woreda on t_woreda.nrlais_woredaid = t_kebele.nrlais_woredaid
        inner join nrlais_sys.t_zones as t_zone on t_zone.nrlais_zoneid = t_woreda.nrlais_zoneid
        inner join nrlais_sys.t_regions as t_region on t_zone.csaregionid = t_region.csaregionid
    `
    );
    for (let x = 0; x < response.rows.length; x++) {
      let trans_record = await removeNullLocation(response.rows[x]);
      await insertIntoElastic(
        "nrlais_kebeles",
        trans_record,
        trans_record["kebele_id"]
      );
    }
  } catch (error) {
    console.log(error);
  }
}
