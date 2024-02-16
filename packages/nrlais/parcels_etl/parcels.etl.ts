import etlExceptions, { etlExceptionType } from "etl-exception";
import {
  readConfig,
  updateConfig,
  getMaxCreatedAtAndUpdatedAtFromIndex,
  indexName,
} from "./utils";
import env from "moa_config";
import { Pool } from "pg";
import { getMaxDate } from "./utils";
/**
 * select 
	respartytype.en as res_type,
	tpartyres.partytype,
	partytype.en,
	t_party.partytype,
	familyrole.en,
	CASE 
	WHEN t_party.gender = 'f'
	THEN 'Female'
	WHEN t_party.gender = 'm' 
	THEN 'Male' ELSE 'Unknown' 
	END AS gender_name, 
	t_party.Name as name ,
	t_acm_mort_res.area as area , 
	t_parcel.uid as id ,
	t_region.csaregionnameeng as region_name , 
	t_zone.csazonenameeng as zone_name , 
	t_woreda.woredanameeng as woreda_name , 
	t_kebele.kebelenameeng as kebele_name
from nrlais_inventory.t_acm_mortgage  as t_acm_mort left join nrlais_inventory.t_acm_mortgage_restriction as t_acm_mort_res on  t_acm_mort.uid = t_acm_mort_res.mortgage_uid inner join nrlais_inventory.t_restrictions as t_res on t_acm_mort_res.restriction_uid = t_res.uid inner join nrlais_inventory.t_party as tpartyres on t_res.partyuid = tpartyres.uid inner join nrlais_inventory.t_parcels as t_parcel on t_res.parceluid = t_parcel.uid inner join nrlais_inventory.t_rights as t_rights on t_parcel.uid = t_rights.parceluid inner join nrlais_inventory.t_party as t_party on t_rights.partyuid = t_party.uid inner join nrlais_sys.t_regions as t_region on t_region.csaregionid = t_parcel.csaregionid inner join nrlais_sys.t_zones as t_zone on t_zone.nrlais_zoneid = t_parcel.nrlais_zoneid inner join nrlais_sys.t_woredas as t_woreda on t_woreda.nrlais_woredaid = t_parcel.nrlais_woredaid inner join nrlais_sys.t_kebeles as t_kebele on t_kebele.nrlais_kebeleid = t_parcel.nrlais_kebeleid inner join nrlais_sys.t_cl_familyrole as familyrole on familyrole.codeid = t_party.mreg_familyrole inner join nrlais_sys.t_cl_partytype as respartytype on tpartyres.partytype = respartytype.codeid inner join nrlais_sys.t_cl_partytype as partytype on t_party.partytype = partytype.codeid

 */
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
    let max_query_result = await getMaxDate();
    console.log(max_query_result);
    client.query(
      `select t_parcels.syscreatedate as created_at, t_parcels.syslastmoddate as updated_at, t_parcels.uid as id, ST_AsText(ST_Transform(t_parcels.geometry,4326)) as location, t_parcels.syscreatedate as date ,t_party.gender as gender, t_party.partytype ,t_rights.partyuid , t_reg.csaregionnameeng as region_name ,  t_zone.csazonenameeng as zone_name , t_woreda.woredanameeng as woreda_name  , t_kebeles.kebelenameeng as kebele_name  , t_holdings.holdingtype , t_parcels.areageom  from nrlais_inventory.t_parcels as t_parcels left join nrlais_inventory.fdconnector as fd on fd.wfsid = t_parcels.uid left join nrlais_inventory.t_sys_fc_holding as t_sys on t_sys.fdc_uid = fd.uid  left join nrlais_inventory.t_holdings as t_holdings on t_sys.holdinguid = t_holdings.uid left join nrlais_sys.t_regions as t_reg on t_parcels.csaregionid = t_reg.csaregionid left join nrlais_sys.t_zones as t_zone on t_parcels.nrlais_zoneid = t_zone.nrlais_zoneid left join nrlais_sys.t_woredas as t_woreda on t_parcels.nrlais_woredaid = t_woreda.nrlais_woredaid left join nrlais_sys.t_kebeles as t_kebeles on t_parcels.nrlais_kebeleid = t_kebeles.nrlais_kebeleid left join nrlais_inventory.t_rights as t_rights on t_rights.parceluid = t_parcels.uid left join nrlais_inventory.t_party as t_party on t_rights.partyuid = t_party.uid where t_parcels.syscreatedate > '${max_query_result.value_as_string}' or t_parcels.syslastmoddate > '${max_query_result.value_as_string}'`,
      async (err: any, result: any) => {
        if (err) {
          console.log(err);
          console.log(err.message);
          throw new etlExceptions(err.message, etlExceptionType.EXTRACTION);
        } else {
          console.log(result.rows.length);
        }
      }
    );
    // let config = readConfig();
    // client.query(
    //   `select * from account where created_at > '${config.created_at}' or updated_at > '${config.updated_at}'`,
    //   async (err: any, result: any) => {
    //     if (err) {
    //       throw new etlExceptions(err.message, etlExceptionType.EXTRACTION);
    //     } else {
    //       for (let x = 0; x < result.rows.length; x++) {
    //         /**
    //          * TODO: transform , check if record already exists , insert record
    //          *
    //          */
    //         console.log(result.rows[x]);
    //       }

    //       let max_created_at_updated_at =
    //         await getMaxCreatedAtAndUpdatedAtFromIndex(indexName);
    //       updateConfig(max_created_at_updated_at);
    //     }
    //   }
    // );
  } catch (error) {
    if (error instanceof etlExceptions) throw error;
    else throw new etlExceptions(error.message, etlExceptionType.UNKNOWN);
  }
}
