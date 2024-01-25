const { Pool } = require("pg");
const Cursor = require("pg-cursor");
import config from "moa_config";
import etlExceptions, { etlExceptionType } from "etl-exception";
//psnp_water_shed_activities_schedular_test
const pool = new Pool({
  host: "196.188.234.214",
  port: config.PSNP_PW_DB_PORT,
  password: config.PSNP_PW_DB_PASSWORD,
  user: config.PSNP_PW_DB_USER,
  database: config.PSNP_PW_DB_NAME,
});

export async function extract_activites_info() {
  try {
    console.log({
      host: config.PSNP_PW_DB_HOST,
      port: config.PSNP_PW_DB_PORT,
      password: config.PSNP_PW_DB_PASSWORD,
      user: config.PSNP_PW_DB_USER,
      database: config.PSNP_PW_DB_NAME,
    });
    const client = await pool.connect();
    const cursor = client.query(
      new Cursor(`select
            act.id as act_id ,
            kebele.name as kebele_name ,
            woreda.name as woreda_name ,
            zone.name as zone_name ,
            region.name as region_name ,
            act.status, act_type.name as activity_name ,
            act_type.unit as Unit ,
            act_type.feature_type as feature_type , 'PSNP PW' as record_type ,
            ST_AsGeoJson(act.geom) as Activity_location ,
            ST_AsGeoJSON(kebele.geom) as kebele_location ,
            ST_AsGeoJSON(woreda.geom) as woreda_location,
            ST_AsGeoJSON(zone.geom) as zone_location ,
            ST_AsGeoJSON(region.geom) as region_location,
            mws.name as "Micro Watershed",
            cws.name as "cws_name",
            cws.id as cws_id,
            ST_AsGeoJSON(mws.geom) as microwatershed_location,
            ST_Area(mws.geom)/10000 as area,
            EXTRACT(YEAR FROM act.created_at) AS year
            from activities as act
            inner join activity_types as act_type on act_type.id = act.activity_type_id
            inner join kebeles as kebele on act.kebele_id = kebele.id
            inner join woredas as woreda on kebele.parent_id = woreda.id
            inner join zones as zone on zone.id = woreda.parent_id
            inner join regions as region on region.id = zone.parent_id
            left join microwatersheds as mws on act.microwatershed_id = mws.id
            left join watersheds as cws on mws.parent_id = cws.id
            limit 1
        `)
    );
    let rows = await cursor.read(1);
    while (rows.length) {
      let rec = rows[0];
      console.log(rec);
      rows = await cursor.read(1);
    }
    cursor.close(() => {
      client.release();
    });
  } catch (error) {
    throw new etlExceptions(error.message, etlExceptionType.EXTRACTION);
  }
}
