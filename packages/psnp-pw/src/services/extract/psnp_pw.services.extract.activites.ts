const { Pool } = require("pg");
const Cursor = require("pg-cursor");
import etlExceptions, { etlExceptionType } from "etl-exception";
import pool from "../database/psnp_pw.services.database";

export async function* extract_activites_info(): AsyncGenerator<
  any,
  void,
  unknown
> {
  try {
    const client = await pool.connect();
    const cursor = client.query(
      new Cursor(`select
            act.id as id ,
            kebele.name as kebele_name ,
            woreda.name as woreda_name ,
            zone.name as zone_name ,
            region.name as region_name ,
            act.status, act_type.name as activity_name ,
            act_type.unit as Unit ,
            act_type.name as treatment ,
            act_type.feature_type as feature_type , 'PSNP PW' as record_type ,
            ST_AsGeoJson(act.geom) as location ,
            mws.name as "Micro Watershed" ,
            cws.name as "Major Watershed" ,
            cws.id as cws_id ,
            act.attribs as activity_attribs ,
            act.started start_date , 
            act.completed  end_date ,
            act.status activity_status , 
            ST_Area(act.geom) as area,
            EXTRACT(YEAR FROM act.created_at) AS year,
            CAST(EXTRACT(YEAR FROM act.created_at) AS VARCHAR) AS string_year,
            'PSNP PW' as record_type
            from activities as act
            inner join activity_types as act_type on act_type.id = act.activity_type_id
            inner join kebeles as kebele on act.kebele_id = kebele.id
            inner join woredas as woreda on kebele.parent_id = woreda.id
            inner join zones as zone on zone.id = woreda.parent_id
            inner join regions as region on region.id = zone.parent_id
            left join microwatersheds as mws on act.microwatershed_id = mws.id
            left join watersheds as cws on mws.parent_id = cws.id
        `)
    );
    let rows = await cursor.read(1);
    while (rows.length) {
      yield rows[0];
      rows = await cursor.read(1);
    }
    cursor.close(() => {
      client.release();
    });
  } catch (error) {
    throw new etlExceptions(error.message, etlExceptionType.EXTRACTION);
  }
}
