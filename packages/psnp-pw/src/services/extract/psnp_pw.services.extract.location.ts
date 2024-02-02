import etlExceptions, { etlExceptionType } from "etl-exception";
const Cursor = require("pg-cursor");
import pool from "../database/psnp_pw.services.database";

//TODO: Maybe consider created a general/common postgres extract that all packages can use

export async function* admin_location_info_extraction(): AsyncGenerator<
  any,
  void,
  unknown
> {
  try {
    const client = await pool.connect();
    const cursor = client.query(
      new Cursor(`
        select 
            kebele.id as id,
            kebele.name as kebele_name,
            woreda.name as woreda_name,
            zone.name as zone_name,
            region.name as region_name,
            cws.id as cws_id,
            cws.name as "Major Watershed",
            mws.name as "Micro Watershed",
            ST_AsGeoJSON(kebele.geom) as kebele_location,
            ST_AsGeoJSON(woreda.geom) as woreda_location,
            ST_AsGeoJSON(zone.geom) as zone_location,
            ST_AsGeoJSON(region.geom) as region_location,
            ST_AsGeoJSON(mws.geom) as microwatershed_location,
            ST_AsGeoJSON(cws.geom) as watershed_location,
            ST_Area(mws.geom)/10000 as microwatershed_area,
            ST_Area(cws.geom)/10000 as majorwatershed_area,
            'PSNP PW' As record_type
            from kebeles as kebele 
            full join microwatersheds as mws on kebele.parent_id = mws.id 
            full join watersheds as cws on mws.parent_id = cws.id 
            full join woredas as woreda on woreda.id = kebele.parent_id 
            full join zones as zone on zone.id = woreda.parent_id 
            full join regions as region on region.id = zone.parent_id
    `)
    );
    let rows = await cursor.read(1);
    while (rows.length) {
      let rec = rows[0];
      yield rec;
      rows = await cursor.read(1);
    }
    cursor.close(() => {
      client.release();
    });
  } catch (error) {
    throw new etlExceptions(error.message, etlExceptionType.EXTRACTION);
  }
}

//psnp_pw_major_watershed
//Major watershed info
export async function* extractMajorWatershed() {
  try {
    const client = await pool.connect();
    const cursor = client.query(
      new Cursor(`
    select 
      watershed.id as id,
      watershed.id as cws_id,
      watershed.name as Major_watershed , 
      ST_AsGeoJSON(watershed.geom) as location,
      ST_Area(watershed.geom) as area , 
      region.name as region_name ,
      zone.name as zone_name , 
      woreda.name as woreda_name
      from watersheds as watershed 
      full join woredas as woreda on woreda.id = watershed.parent_id 
      full join zones as zone on zone.id = woreda.parent_id
      full join regions as region on region.id = zone.parent_id limit 1
    `)
    );
    let rows = await cursor.read(1);
    while (rows.length) {
      let rec = rows[0];
      yield rec;
      rows = await cursor.read(1);
    }
    cursor.close(() => {
      client.release();
    });
  } catch (error) {
    throw new etlExceptions(error.message, etlExceptionType.EXTRACTION);
  }
}

//psnp_pw_micro_watershed
//Micro watershed
export async function* extractMicrowatshed() {
  try {
    const client = await pool.connect();
    const cursor = client.query(
      new Cursor(`
      select
            mws.id as id,
            mws.id as mws_id,
            kebele.name as kebele_name,
            woreda.name as woreda_name,
            zone.name as zone_name,
            region.name as region_name,
            cws.id as cws_id,
            cws.name as "Major Watershed",
            mws.name as "Micro Watershed",
            ST_AsGeoJSON(kebele.geom) as kebele_location,
            ST_AsGeoJSON(woreda.geom) as woreda_location,
            ST_AsGeoJSON(zone.geom) as zone_location,
            ST_AsGeoJSON(region.geom) as region_location,
            ST_AsGeoJSON(mws.geom) as microwatershed_location,
            ST_AsGeoJSON(cws.geom) as watershed_location,
            ST_Area(mws.geom)/10000 as microwatershed_area,
            ST_Area(cws.geom)/10000 as majorwatershed_area,
            'PSNP PW' As record_type
            from kebeles as kebele 
            full join microwatersheds as mws on kebele.parent_id = mws.id 
            full join watersheds as cws on mws.parent_id = cws.id 
            full join woredas as woreda on woreda.id = kebele.parent_id 
            full join zones as zone on zone.id = woreda.parent_id 
            full join regions as region on region.id = zone.parent_id
    `)
    );
    let rows = await cursor.read(1);
    while (rows.length) {
      let rec = rows[0];
      yield rec;
      rows = await cursor.read(1);
    }
    cursor.close(() => {
      client.release();
    });
  } catch (error) {
    console.log(error.message);
    throw new etlExceptions(error.message, etlExceptionType.EXTRACTION);
  }
}
