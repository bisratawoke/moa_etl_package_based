const { Pool } = require("pg");
const Cursor = require("pg-cursor");
const fs = require("fs");
const axios = require("axios");
import config from "moa_config";
import {
  insertIntoElastic,
  insertWithOutGender,
  partyTypeConv,
  getRelationshipText,
} from "./utils";
import {
  InheritanceWithWillTransformer,
  InheritanceWithWillTransformer_v2,
  InheritanceWithOutTransformerWill,
  divorceTransformer,
  giftTransfomer,
  reallocationTransformer,
  specialCaseTransformer,
  registerMorgageTransform,
  cancelMorgageTransform,
  marrageTransformer,
  getQuarter,
} from "./transformer";

const pool = new Pool({
  host: config.NRLAIS_DB_HOST,
  port: config.NRLAIS_DB_PORT,
  password: config.NRLAIS_DB_PASSWORD,
  user: config.NRLAIS_DB_USER,
  database: config.NRLAIS_DB_NAME,
});

const transformer = async (record: any) =>
  new Promise(async (resovle, reject) => {
    try {
      let result: any = null;
      if (!Number.isNaN(record.transactiontype) && record.tx_data != null) {
        switch (record.transactiontype) {
          case 26:
            record.transaction_type = "Inheritance with will";
            result = InheritanceWithWillTransformer(record.tx_data.data);

            // result.forEach(async (rec) => {
            //   try {
            //     console.log(result);
            // await insertIntoElastic(
            //   "transaction_houshold_information_with_party_type_info",
            //   {
            //     ...rec,
            //     region_name: record.region_name,
            //     zone_name: record.zone_name,
            //     woreda_name: record.woreda_name,
            //     kebele_name: record.kebele_name,
            //     ...record,
            //   }
            // );
            //   } catch (error) {
            //     console.log(error);
            //   }
            // });

            break;
          case 27:
            record.transaction_type = "Inheritance without will";
            result = InheritanceWithWillTransformer(record.tx_data.data);
            // console.log({
            //   ...result[0],
            //   region_name: record.region_name,
            //   zone_name: record.zone_name,
            //   woreda_name: record.woreda_name,
            //   kebele_name: record.kebele_name,
            // });
            // console.log(record["info"]);
            //   try {
            //     result = InheritanceWithWillTransformer(record.tx_data.data);
            //     result.forEach(async (rec) => {
            //       await insertIntoElastic(
            //         "transaction_houshold_information_with_party_type_info",
            //         {
            //           ...rec,
            //           region_name: record.region_name,
            //           zone_name: record.zone_name,
            //           woreda_name: record.woreda_name,
            //           kebele_name: record.kebele_name,
            //           ...record,
            //         }
            //       );
            //     });
            //   } catch (error) {
            //     console.log(error);
            // }

            break;

          //does not have beneficary holding
          case 3:
            record.transaction_type = "Divorce";
            // console.log(record.tx_data.data);

            // record["info"] = divorceTransformer(record.tx_data.data);
            // console.log(record["info"]);
            break;
          case 24:
            record.transaction_type = "Gift";

            // result.forEach((res) => {
            //   console.log({
            //     ...result[0],
            //     region_name: record.region_name,
            //     zone_name: record.zone_name,
            //     woreda_name: record.woreda_name,
            //     kebele_name: record.kebele_name,
            //   });
            // });
            try {
              result = giftTransfomer(record.tx_data.data);
              // result.forEach(async (rec) => {
              //   await insertIntoElastic(
              //     "transaction_houshold_information_with_party_type_info",
              //     {
              //       ...rec,
              //       region_name: record.region_name,
              //       zone_name: record.zone_name,
              //       woreda_name: record.woreda_name,
              //       kebele_name: record.kebele_name,
              //       ...record,
              //     }
              //   );
              // });
            } catch (error) {
              console.log(error);
            }

            // console.log(record["info"]);
            break;
          //empty
          case 5:
            record.transaction_type = "Exchange";
            break;
          //empty
          case 6:
            record.transaction_type = "Expropriation";
            break;
          case 7:
            record.transaction_type = "Reallocation";

            // console.log({
            //   ...result[0],
            //   region_name: record.region_name,
            //   zone_name: record.zone_name,
            //   woreda_name: record.woreda_name,
            //   kebele_name: record.kebele_name,
            // });
            try {
              result = reallocationTransformer(record.tx_data.data);
              // result.forEach(async (rec) => {
              //   await insertIntoElastic(
              //     "transaction_houshold_information_with_party_type_info",
              //     {
              //       ...result[0],
              //       region_name: record.region_name,
              //       zone_name: record.zone_name,
              //       woreda_name: record.woreda_name,
              //       kebele_name: record.kebele_name,
              //       ...record,
              //     }
              //   );
              // });
            } catch (error) {
              console.log(error);
            }

            break;
          case 8:
            // at
            record.transaction_type = "Special case";

            result = specialCaseTransformer(record.tx_data.data);
            break;
          case 9:
            record.transaction_type = "Rent/Lease";
            break;
          case 10:
            record.transaction_type = "Servitude/Easement";
            break;
          case 11:
            record.transaction_type = "Restrictive Interest";
            break;
          case 12:
            record.transaction_type = "Parcel split";
            break;
          case 13:
            record.transaction_type = "Parcel Consolidation/Merge";
            break;

          case 20:
            record.transaction_type = "Register Mortgage";
            // console.log(record.tx_data.data);

            result = registerMorgageTransform(record.tx_data.data);
            // console.log({
            //   ...result[0],
            //   region_name: record.region_name,
            //   zone_name: record.zone_name,
            //   woreda_name: record.woreda_name,
            //   kebele_name: record.kebele_name,
            // });
            // console.log(record["info"]);
            // if(result[0].)
            // await insertIntoElastic("transaction_houshold_information_with_party_type_info", {
            //   ...result[0],
            //   region_name: record.region_name,
            //   zone_name: record.zone_name,
            //   woreda_name: record.woreda_name,
            //   kebele_name: record.kebele_name,
            //   ...record,
            // });

            break;
          case 21:
            record.transaction_type = "Modify Mortgage";
            break;
          case 22:
            record.transaction_type = "Cancel Mortgage";
            try {
              result = cancelMorgageTransform(record.tx_data.data);
            } catch (error) {
              console.log("====== in cancelMorgageTransform =======");
              console.log(error);
            }
            // console.log({
            //   ...result[0],
            //   region_name: record.region_name,
            //   zone_name: record.zone_name,
            //   woreda_name: record.woreda_name,
            //   kebele_name: record.kebele_name,
            // });
            // await insertIntoElastic("transaction_houshold_information_with_party_type_info", {
            //   ...result[0],
            //   region_name: record.region_name,
            //   zone_name: record.zone_name,
            //   woreda_name: record.woreda_name,
            //   kebele_name: record.kebele_name,
            //   ...record,
            // });

            break;
          case 25:
            record.transaction_type = "Marriage";

            // console.log({
            //   ...result[0],
            //   region_name: record.region_name,
            //   zone_name: record.zone_name,
            //   woreda_name: record.woreda_name,
            //   kebele_name: record.kebele_name,
            // });
            // console.log(record["info"]);
            try {
              result = marrageTransformer(record.tx_data.data);
              // result.forEach(async (rec) => {
              //   await insertIntoElastic(
              //     "transaction_houshold_information_with_party_type_info",
              //     {
              //       ...rec,
              //       region_name: record.region_name,
              //       zone_name: record.zone_name,
              //       woreda_name: record.woreda_name,
              //       kebele_name: record.kebele_name,
              //       ...record,
              //     }
              //   );
              // });
            } catch (error) {
              console.log(error);
            }

            break;
          default:
            record.transaction_type = "Initial";
            break;
        }

        resovle({ ...record, parties: result });
      }
    } catch (error) {
      console.log(error);
      console.log("skipped");
    }
  });

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
  await conn(pool);

  const client = await pool.connect();
  const cursor = client.query(
    new Cursor(
      `select	
         t_transaction.syscreatedate AS date,
    EXTRACT(YEAR FROM t_transaction.syscreatedate) AS year,
        t_transaction.syscreatedate as created_at,
        t_transaction.syslastmoddate as updated_at,
        t_transactiontype.en as transaction_type,
        t_transaction.uid as id ,
        t_regions.csaregionnameeng as region_name, 
        t_kebeles.kebelenameeng as kebele_name , 
        t_woredas.woredanameeng as woreda_name ,
        t_zones.csazonenameeng as zone_name, 
        transactiontype , 
        t_transaction_data.tx_data as tx_data 
        from nrlais_inventory.t_transaction as t_transaction  
        left join nrlais_sys.t_cl_transactiontype as t_transactiontype on t_transaction.transactiontype =  t_transactiontype.codeid 
        left join nrlais_sys.t_regions as t_regions on t_transaction.csaregionid = t_regions.csaregionid 
        left join nrlais_sys.t_zones as t_zones on t_transaction.nrlais_zoneid = t_zones.csazoneid 
        left join nrlais_sys.t_woredas as t_woredas on t_transaction.nrlais_woredaid = t_woredas.woredaid 
        left join nrlais_sys.t_kebeles as t_kebeles on t_transaction.nrlais_kebeleid = t_kebeles.kebeleid 
        left join nrlais_inventory.t_transaction_data as t_transaction_data on t_transaction.uid = t_transaction_data.tx_uid 
        where transactiontype != 100 
        and transactiontype != 15
        and transactiontype != 18
        and tx_data is not null 
		`
    )
    // "select t_parcels.uid as id , t_parcels.syscreatedate as date ,t_party.gender as gender, t_party.partytype ,t_rights.partyuid , t_reg.csaregionnameeng as region_name ,  t_zone.csazonenameeng as zone_name , t_woreda.woredanameeng as woreda_name , t_kebeles.kebelenameeng as kebele_name , t_holdings.holdingtype , t_parcels.areageom  from nrlais_inventory.t_parcels as t_parcels left join nrlais_inventory.fdconnector as fd on fd.wfsid = t_parcels.uid left join nrlais_inventory.t_sys_fc_holding as t_sys on t_sys.fdc_uid = fd.uid  left join nrlais_inventory.t_holdings as t_holdings on t_sys.holdinguid = t_holdings.uid left join nrlais_sys.t_regions as t_reg on t_parcels.csaregionid = t_reg.csaregionid left join nrlais_sys.t_zones as t_zone on t_parcels.nrlais_zoneid = t_zone.nrlais_zoneid left join nrlais_sys.t_woredas as t_woreda on t_parcels.nrlais_woredaid = t_woreda.nrlais_woredaid left join nrlais_sys.t_kebeles as t_kebeles on t_parcels.nrlais_kebeleid = t_kebeles.nrlais_kebeleid left join nrlais_inventory.t_rights as t_rights on t_rights.parceluid = t_parcels.uid left join nrlais_inventory.t_party as t_party on t_rights.partyuid = t_party.uid"
  );
  let rows = await cursor.read(1);
  while (rows.length) {
    try {
      let result: any = await transformer(rows[0]);
      if (result.parties) {
        result.parties.forEach(async (rec: Record<string, any>, indx: any) => {
          console.log("============= start ==============");
          let houseHoldType = getRelationshipText(rec["mreg_familyrole"]);

          if (rec["sex"]) console.log(rec["sex"]);
          let payload = {
            ...rec,
            ...result,
            houseHoldType: houseHoldType,
          };
          delete payload.tx_data;

          payload = { ...payload, string_year: String(payload.year) };
          console.log(payload.year);
          // console.log(payload["region_name"]);
          // console.log(payload["zone_name"]);
          // console.log(payload["woreda_name"]);
          // console.log(payload["kebele_name"]);
          // console.log(payload["transactiontype"]);
          // console.log(payload["transaction_type"]);
          // console.log(houseHoldType);
          // console.log(payload["partyTypeText"]);
          // console.log(payload["gender_name"]);
          // console.log(payload["mreg_familyrole"]);
          // console.log("============= end ==============");
          setTimeout(async () => {
            await insertIntoElastic(
              "transaction_houshold_information_with_party_type_info",
              payload
            );
          }, indx * 100);
        });
      }
      rows = await cursor.read(1);
    } catch (error) {
      console.log(error);
      cursor.close(() => {
        client.release();
      });
    }
  }
}

export async function transactionWithoutGenderInfo() {
  try {
    const client = await pool.connect();
    const cursor = client.query(
      new Cursor(`
    SELECT 
    tr.csaregionid,
    r.csaregionnameeng as region_name,
    tr.nrlais_zoneid,
    z.csazonenameeng as zone_name,
    tr.nrlais_woredaid,
    w.woredanameeng as woreda_name,
    tr.nrlais_kebeleid,
    k.kebelenameeng as kebele_name,
    DATE_PART('year', tr.syscreatedate::date) as year,
    tr.transactiontype,
    trt.en as trtype,
    trs.en as trstatus,
    COUNT(tr.transactiontype) as no_trans
FROM nrlais_inventory.t_transaction tr
LEFT JOIN nrlais_sys.t_cl_transactiontype trt ON tr.transactiontype=trt.codeid  
LEFT JOIN nrlais_sys.t_cl_txstatus trs ON tr.txstatus=trs.codeid
LEFT JOIN nrlais_sys.t_regions r ON tr.csaregionid=r.csaregionid
LEFT JOIN nrlais_sys.t_zones z ON tr.nrlais_zoneid=z.nrlais_zoneid
LEFT JOIN nrlais_sys.t_woredas w ON tr.nrlais_woredaid=w.nrlais_woredaid
LEFT JOIN nrlais_sys.t_kebeles k ON tr.nrlais_kebeleid=k.nrlais_kebeleid
where tr.transactiontype != 100
GROUP BY 
    tr.csaregionid, 
    region_name, 
    tr.nrlais_zoneid,
    zone_name, 
    tr.nrlais_woredaid,
    woreda_name, 
    tr.nrlais_kebeleid,
    kebele_name, 
    year, 
    tr.transactiontype, 
    trtype, 
    trstatus;`)
    );

    let rows = await cursor.read(1);
    while (rows.length) {
      try {
        rows.forEach(async (rec) => {
          let id = `${rec["nrlais_kebeleid"]}_${rec["transactiontype"]}_${rec["year"]}`;
          let payload = {
            ...rec,
            string_year: String(rec["year"]),
            transaction_type: rec["trtype"],
            application_status: rec["trstatus"],
            result: Number(rec["no_trans"]),
            area: Number(rec["no_trans"]),
            id,
          };

          await insertWithOutGender(
            "nrlais_transaction_party_with_out_gender_information",
            payload,
            id
          );
        });
        rows = await cursor.read(1);
      } catch (error) {
        cursor.close(() => {
          client.release();
        });
      }
    }
  } catch (error) {}
}
