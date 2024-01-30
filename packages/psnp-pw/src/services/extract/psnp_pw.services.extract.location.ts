import etlExceptions, { etlExceptionType } from "etl-exception";
const Cursor = require("pg-cursor");
import pool from "../database/psnp_pw.services.database";

export async function* admin_location_info_extraction() {
  try {
    const client = await pool.connect();
    const cursor = client.query(
      new Cursor(`
        select 
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
