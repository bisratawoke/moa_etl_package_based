const { Pool } = require("pg");
const Cursor = require("pg-cursor");
const fs = require("fs");
const axios = require("axios");
import { AxiosError } from "axios";
import config from "moa_config";
import Notifier, { EXTRACTION_METHOD, EXTRACTION_STATUS } from "notifire";

const notifire = new Notifier({
  host: config.ELASTIC_URL,
  username: config.ELASTIC_USERNAME,
  password: config.ELASTIC_PASSWORD,
});

export const insertIntoElastic = async (
  indexName: string,
  payload: Record<string, any>,
  id: String
) => {
  return new Promise(async (resolve, reject) => {
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
      console.log(result.status);
      resolve(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        console.log(error.response?.data);
      }
      console.log(error);
      reject(true);
    }
  });
};
export async function nrlais_mortgage_sync() {
  const pool = new Pool({
    host: config.NRLAIS_DB_HOST,
    port: config.NRLAIS_DB_PORT,
    password: config.NRLAIS_DB_PASSWORD,
    user: config.NRLAIS_DB_USER,
    database: config.NRLAIS_DB_NAME,
  });
  const client = await pool.connect();

  const cursor = client.query(
    new Cursor(
      `select 
       EXTRACT(YEAR FROM t_res.syscreatedate) AS year,
      t_res.syscreatedate,
	t_res.uid res_uid,
	respartytype.en as restrictor,
	tpartyres.partytype as rest_partytype,
	partytype.en as righttype,
	t_party.partytype,
	familyrole.en as owner_type,
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
	t_kebele.kebelenameeng as kebele_name,
    	t_party.uid as partyuid
    from nrlais_inventory.t_acm_mortgage  as t_acm_mort 
    left join nrlais_inventory.t_acm_mortgage_restriction as t_acm_mort_res on  t_acm_mort.uid = t_acm_mort_res.mortgage_uid 
    inner join nrlais_inventory.t_restrictions as t_res on t_acm_mort_res.restriction_uid = t_res.uid
     inner join nrlais_inventory.t_party as tpartyres on t_res.partyuid = tpartyres.uid 
     inner join nrlais_inventory.t_parcels as t_parcel on t_res.parceluid = t_parcel.uid 
     inner join nrlais_inventory.t_rights as t_rights on t_parcel.uid = t_rights.parceluid 
     inner join nrlais_inventory.t_party as t_party on t_rights.partyuid = t_party.uid 
     inner join nrlais_sys.t_regions as t_region on t_region.csaregionid = t_parcel.csaregionid 
     inner join nrlais_sys.t_zones as t_zone on t_zone.nrlais_zoneid = t_parcel.nrlais_zoneid 
     inner join nrlais_sys.t_woredas as t_woreda on t_woreda.nrlais_woredaid = t_parcel.nrlais_woredaid 
     inner join nrlais_sys.t_kebeles as t_kebele on t_kebele.nrlais_kebeleid = t_parcel.nrlais_kebeleid 
     inner join nrlais_sys.t_cl_familyrole as familyrole on familyrole.codeid = t_party.mreg_familyrole 
     inner join nrlais_sys.t_cl_partytype as respartytype on tpartyres.partytype = respartytype.codeid 
     inner join nrlais_sys.t_cl_partytype as partytype on t_party.partytype = partytype.codeid
`
    )
  );
  let rows = await cursor.read(1000);
  while (rows.length) {
    await notifire.notify({
      index: "nrlais mortgage data",
      extraction_date: new Date(),
      extraction_status: EXTRACTION_STATUS.COMPLETED,
      number_of_extracted_records: rows.length,
      method: EXTRACTION_METHOD.SYSTEMATIC,
    });
    let rec = rows[0];
    console.log(rec);

    let record = {
      ...rec,
      string_year: String(rec.year),
    };

    await insertIntoElastic(
      "mortage_data_with_restrictor_info_annual_report",
      record,
      `${record.res_uid}-${record.string_year}-${record.partyuid}`
    );

    rows = await cursor.read(1000);
  }
  console.log("===== im done ======");
  cursor.close(() => {
    client.release();
  });
}
