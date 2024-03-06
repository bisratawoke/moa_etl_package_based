const { Pool } = require("pg");
const Cursor = require("pg-cursor");
const fs = require("fs");
const axios = require("axios");
import config from "moa_config";
import {
  transformer,
  insertIntoElastic,
  indexName,
  insertIntoElasticNotDuplication,
} from "./utils";
import { insertIntoElastic as insert } from "../admin_location_etl/extract";
async function conn(pool: any) {
  try {
    console.log("====== in connection pool =====");
    pool.query("select 1", (err: any, result: any) => {
      if (err) console.log(err);
      else {
        console.log(result);
      }
    });
  } catch (error) {
    console.log("=== in connection pool error ===");
    console.error(error);
  }
}
export default async function sync() {
  const pool = new Pool({
    host: config.NRLAIS_DB_HOST,
    port: config.NRLAIS_DB_PORT,
    password: config.NRLAIS_DB_PASSWORD,
    user: config.NRLAIS_DB_USER,
    database: config.NRLAIS_DB_NAME,
  });
  const client = await pool.connect();
  // ST_AsText(ST_Transform(t_parcels.geometry,4326)) as location,
  // ST_AsText(ST_Transform(t_woreda.geometry,4326)) as woreda_location ,
  const cursor = client.query(
    new Cursor(
      `select 
      ST_AsText(ST_Transform(t_parcels.geometry,4326)) as location,
       familyrole.en,t_parcels.syscreatedate as created_at, 
       t_parcels.syslastmoddate as updated_at, 
       t_parcels.uid as id,  
       t_parcels.syscreatedate as date,
       t_party.gender as gender, 
       t_party.partytype,
       t_rights.partyuid,
       t_reg.csaregionnameeng as region_name, 
       t_zone.csazonenameeng as zone_name, 
       t_woreda.woredanameeng as woreda_name, 
       t_kebeles.kebelenameeng as kebele_name, 
       t_holdings.holdingtype, 
       t_parcels.areageom  
       from nrlais_inventory.t_parcels as t_parcels 
       left join nrlais_inventory.fdconnector as fd on fd.wfsid = t_parcels.uid 
       left join nrlais_inventory.t_sys_fc_holding as t_sys on t_sys.fdc_uid = fd.uid  
       left join nrlais_inventory.t_holdings as t_holdings on t_sys.holdinguid = t_holdings.uid 
       left join nrlais_sys.t_regions as t_reg on t_parcels.csaregionid = t_reg.csaregionid 
       left join nrlais_sys.t_zones as t_zone on t_parcels.nrlais_zoneid = t_zone.nrlais_zoneid 
       left join nrlais_sys.t_woredas as t_woreda on t_parcels.nrlais_woredaid = t_woreda.nrlais_woredaid 
       left join nrlais_sys.t_kebeles as t_kebeles on t_parcels.nrlais_kebeleid = t_kebeles.nrlais_kebeleid 
       left join nrlais_inventory.t_rights as t_rights on t_rights.parceluid = t_parcels.uid 
       left join nrlais_inventory.t_party as t_party on t_rights.partyuid = t_party.uid 
       inner join nrlais_sys.t_cl_familyrole as familyrole on familyrole.codeid = t_party.mreg_familyrole`
      // "select t_parcels.uid as id , t_parcels.syscreatedate as date ,t_party.gender as gender, t_party.partytype ,t_rights.partyuid , t_reg.csaregionnameeng as region_name ,  t_zone.csazonenameeng as zone_name , t_woreda.woredanameeng as woreda_name , t_kebeles.kebelenameeng as kebele_name , t_holdings.holdingtype , t_parcels.areageom  from nrlais_inventory.t_parcels as t_parcels left join nrlais_inventory.fdconnector as fd on fd.wfsid = t_parcels.uid left join nrlais_inventory.t_sys_fc_holding as t_sys on t_sys.fdc_uid = fd.uid  left join nrlais_inventory.t_holdings as t_holdings on t_sys.holdinguid = t_holdings.uid left join nrlais_sys.t_regions as t_reg on t_parcels.csaregionid = t_reg.csaregionid left join nrlais_sys.t_zones as t_zone on t_parcels.nrlais_zoneid = t_zone.nrlais_zoneid left join nrlais_sys.t_woredas as t_woreda on t_parcels.nrlais_woredaid = t_woreda.nrlais_woredaid left join nrlais_sys.t_kebeles as t_kebeles on t_parcels.nrlais_kebeleid = t_kebeles.nrlais_kebeleid left join nrlais_inventory.t_rights as t_rights on t_rights.parceluid = t_parcels.uid left join nrlais_inventory.t_party as t_party on t_rights.partyuid = t_party.uid"
    )
  );
  console.log("========= in here ======");
  let rows = await cursor.read(1);
  while (rows.length) {
    const rec = await transformer(rows[0]);
    await insertIntoElasticNotDuplication(indexName, rec);
    rows = await cursor.read(1);
  }
  console.log("===== im done ======");
  cursor.close(() => {
    client.release();
  });
}

export async function syncWithOutGeom() {
  const pool = new Pool({
    host: config.NRLAIS_DB_HOST,
    port: config.NRLAIS_DB_PORT,
    password: config.NRLAIS_DB_PASSWORD,
    user: config.NRLAIS_DB_USER,
    database: config.NRLAIS_DB_NAME,
  });
  const client = await pool.connect();
  // ST_AsText(ST_Transform(t_parcels.geometry,4326)) as location,
  // ST_AsText(ST_Transform(t_woreda.geometry,4326)) as woreda_location ,
  const cursor = client.query(
    new Cursor(
      `select
        t_parcels.syslastmoddate as updated_at, 
        t_parcels.uid as id,  
        t_parcels.syscreatedate as date,
        t_reg.csaregionnameeng as region_name,  
        t_zone.csazonenameeng as zone_name,
        t_woreda.woredanameeng as woreda_name,  
        t_kebeles.kebelenameeng as kebele_name, 
        t_parcels.areageom 
      from nrlais_inventory.t_parcels as t_parcels
      left join nrlais_inventory.fdconnector as fd on fd.wfsid = t_parcels.uid
      left join nrlais_inventory.t_sys_fc_holding as t_sys on t_sys.fdc_uid = fd.uid
      left join nrlais_inventory.t_holdings as t_holdings on t_sys.holdinguid = t_holdings.uid
      left join nrlais_sys.t_regions as t_reg on t_parcels.csaregionid = t_reg.csaregionid
      left join nrlais_sys.t_zones as t_zone on t_parcels.nrlais_zoneid = t_zone.nrlais_zoneid 
      left join nrlais_sys.t_woredas as t_woreda on t_parcels.nrlais_woredaid = t_woreda.nrlais_woredaid 
      left join nrlais_sys.t_kebeles as t_kebeles on t_parcels.nrlais_kebeleid = t_kebeles.nrlais_kebeleid 
`
      // "select t_parcels.uid as id , t_parcels.syscreatedate as date ,t_party.gender as gender, t_party.partytype ,t_rights.partyuid , t_reg.csaregionnameeng as region_name ,  t_zone.csazonenameeng as zone_name , t_woreda.woredanameeng as woreda_name , t_kebeles.kebelenameeng as kebele_name , t_holdings.holdingtype , t_parcels.areageom  from nrlais_inventory.t_parcels as t_parcels left join nrlais_inventory.fdconnector as fd on fd.wfsid = t_parcels.uid left join nrlais_inventory.t_sys_fc_holding as t_sys on t_sys.fdc_uid = fd.uid  left join nrlais_inventory.t_holdings as t_holdings on t_sys.holdinguid = t_holdings.uid left join nrlais_sys.t_regions as t_reg on t_parcels.csaregionid = t_reg.csaregionid left join nrlais_sys.t_zones as t_zone on t_parcels.nrlais_zoneid = t_zone.nrlais_zoneid left join nrlais_sys.t_woredas as t_woreda on t_parcels.nrlais_woredaid = t_woreda.nrlais_woredaid left join nrlais_sys.t_kebeles as t_kebeles on t_parcels.nrlais_kebeleid = t_kebeles.nrlais_kebeleid left join nrlais_inventory.t_rights as t_rights on t_rights.parceluid = t_parcels.uid left join nrlais_inventory.t_party as t_party on t_rights.partyuid = t_party.uid"
    )
  );
  let numOrRow = 10000;
  let rows = await cursor.read(numOrRow);
  while (rows.length) {
    for (let x = 0; x < rows.length; x++) {
      await insert("nrlais_parcel_without_geom", rows[x], rows[x]["id"]);
    }
    rows = await cursor.read(numOrRow);
    // const rec = await transformer(rows[0]);
    // await insertIntoElasticNotDuplication(indexName, rec);
  }
  cursor.close(() => {
    client.release();
  });
}
