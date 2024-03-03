const mysql = require("mysql2");
import * as fs from "fs";
const axios = require("axios");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
import config from "config";
import etlExceptions, { etlExceptionType } from "etl-exception";
import Notifier, { EXTRACTION_METHOD, EXTRACTION_STATUS } from "notifire";

const connection = mysql.createConnection({
  host: config.CALM_MYSQL_HOST,
  port: config.CALM_MYSQL_PORT,
  user: config.CALM_MYSQL_USER,
  password: config.CALM_MYSQL_PASSWORD,
  database: config.CALM_MYSQL_DB,
});

const notifire = new Notifier({
  host: config.ELASTIC_URL,
  username: config.ELASTIC_USER,
  password: config.ELASTIC_PASSWORD,
});

async function etl() {
  const { date } = readConfigFile();
  connection.query(
    `select  
        woredas.woreda_name , 
        zones.zone_name , 
        regions.region_name ,
        sum(demarcated) as demarcated ,
        sum(digitized) as digitized ,
        sum(certificates_approved) as certificates_approved , 
        sum(certificates_printed) as certificates_printed , 
        sum(certificates_collected) as certificates_collected 
        from weekly_progress_details 
        inner join woredas on woredas.woreda_code = weekly_progress_details.woreda_code 
        inner join zones on woredas.zone_id = zones.id 
        inner join regions on zones.region_id = regions.id 
        where weekly_progress_id in (select id from weekly_progresses where  report_to = '${date}')  group by woredas.woreda_name,zones.zone_name , regions.region_name;`,
    async (err: any, results: any, fields: any) => {
      if (err) {
        console.log(err);
      } else {
        await notifire.notify({
          index: "calm",
          extraction_date: new Date(),
          extraction_status: EXTRACTION_STATUS.COMPLETED,
          number_of_extracted_records: results.length,
          method: EXTRACTION_METHOD.SYSTEMATIC,
        });
        let records: any = [];
        for (let x = 0; x < results.length; x++) {
          let woreda = results[x];
          let prev: any = await getOldest(date, woreda.woreda_name);
          let record: any = {
            woreda_name: woreda.woreda_name,
            zone_name: woreda.zone_name,
            region_name:
              woreda.region_name == "SNNP" ? "SNNPR" : woreda.region_name,
            demarcated: Number(woreda.demarcated) - Number(prev.demarcated),
            digitized: Number(woreda.digitized) - Number(prev.digitized),
            certificates_approved:
              Number(woreda.certificates_approved) -
              Number(prev.certificates_approved),
            certificates_printed:
              Number(woreda.certificates_printed) -
              Number(prev.certificates_printed),
            certificates_collected:
              Number(woreda.certificates_collected) -
              Number(prev.certificates_collected),
            date: date,
            year: date.split("-")[0],
            month: date.split("-")[1],
            day: date.split("-")[2],
            text_date: date.split("-")[2],
          };
          let id = `${String(record.date)}_${String(
            record.woreda_name.replace(/\//g, "")
          )}`;
          records.push(record);
          setTimeout(async () => {
            try {
              await insertIntoElastic(record, id);
            } catch (error) {
              if (error instanceof etlExceptions) {
                let message = {
                  index: "calm",
                  extraction_date: new Date(),
                  extraction_status: EXTRACTION_STATUS.COMPLETED,
                  number_of_extracted_records: results.length,
                  method: EXTRACTION_METHOD.SYSTEMATIC,
                  message: error.message,
                };
                await notifire.notify(message);
              }
            }
          }, 300 * x);
        }
        let new_date = addOneWeek(date);
        updateConfigFile({ date: new_date });
        await updateCsvFile(records);
        await etl();
      }
    }
  );
}

function oneWeekLess(inputDate) {
  let inputDateObj = new Date(inputDate);
  inputDateObj.setDate(inputDateObj.getDate() - 7);
  let resultDate = inputDateObj.toISOString().slice(0, 10);
  return resultDate;
}

function getOldest(date, woreda_name) {
  return new Promise(async (resolve, reject) => {
    let new_date = oneWeekLess(date);

    if (new Date(new_date) > new Date("2021-01-01")) {
      connection.query(
        `select woredas.woreda_name , zones.zone_name , regions.region_name ,sum(demarcated) as demarcated , sum(digitized) as digitized , sum(certificates_approved) as certificates_approved , sum(certificates_printed) as certificates_printed , sum(certificates_collected) as certificates_collected  from weekly_progress_details inner join woredas on woredas.woreda_code = weekly_progress_details.woreda_code inner join zones on woredas.zone_id = zones.id inner join regions on zones.region_id = regions.id where weekly_progress_id in (select id from weekly_progresses where  report_to = '${new_date}') and woredas.woreda_name = '${woreda_name}' group by woredas.woreda_name,zones.zone_name , regions.region_name;`,
        async (err, results, fields) => {
          if (err) {
            if (err.errno == 1525)
              resolve({
                demarcated: 0,
                digitized: 0,
                certificates_approved: 0,
                certificates_printed: 0,
                certificates_collected: 0,
              });
          } else {
            if (results.length < 1) {
              let res = await getOldest(new_date, woreda_name);

              resolve(res);
            } else {
              resolve(results[0]);
            }
          }
        }
      );
    } else {
      resolve({
        demarcated: 0,
        digitized: 0,
        certificates_approved: 0,
        certificates_printed: 0,
        certificates_collected: 0,
      });
    }
  });
}

function updateConfigFile(data) {
  return fs.writeFileSync("./config.json", JSON.stringify(data));
}

function addOneWeek(inputDate) {
  let inputDateObj = new Date(inputDate);
  inputDateObj.setDate(inputDateObj.getDate() + 7);
  let resultDate = inputDateObj.toISOString().slice(0, 10);
  return resultDate;
}

function readConfigFile() {
  return JSON.parse(Buffer.from(fs.readFileSync("./config.json")).toString());
}

//calm_mis_parcel_info
async function insertIntoElastic(rec: any, id: any) {
  try {
    let INDEX_NAME = "calm_mis_parcel_info_by_status";
    const headers = {
      auth: {
        username: config.ELASTIC_USERNAME,
        password: config.ELASTIC_PASSWORD,
      },
    };

    const result = await axios.post(
      `${config.ELASTIC_URL}/${INDEX_NAME}/_doc/${id}`,
      rec,
      headers
    );
    console.log(result.status);
    return;
  } catch (error: any) {
    throw new etlExceptions(error.message, etlExceptionType.LOADING);
  }
}

export default async function initialEtl() {
  let date = "2021-12-23";

  connection.query(
    `select woredas.woreda_name , zones.zone_name , regions.region_name ,sum(demarcated) as demarcated , sum(digitized) as digitized , sum(certificates_approved) as certificates_approved , sum(certificates_printed) as certificates_printed , sum(certificates_collected) as certificates_collected  from weekly_progress_details inner join woredas on woredas.woreda_code = weekly_progress_details.woreda_code inner join zones on woredas.zone_id = zones.id inner join regions on zones.region_id = regions.id where weekly_progress_id in (select id from weekly_progresses where  report_to = '2021-12-23')  group by woredas.woreda_name,zones.zone_name , regions.region_name;`,
    async (err: any, results: any, fields: any) => {
      if (err) {
        console.log(err);
      } else {
        let records: any = [];
        await notifire.notify({
          index: "calm",
          extraction_date: new Date(),
          extraction_status: EXTRACTION_STATUS.COMPLETED,
          number_of_extracted_records: results.length,
          method: EXTRACTION_METHOD.SYSTEMATIC,
        });
        for (let x = 0; x < results.length; x++) {
          let woreda = results[x];

          let record = {
            woreda_name: woreda.woreda_name,
            zone_name: woreda.zone_name,
            region_name:
              woreda.region_name == "SNNP" ? "SNNPR" : woreda.region_name,
            demarcated: Number(woreda.demarcated),
            digitized: Number(woreda.digitized),
            certificates_approved: Number(woreda.certificates_approved),
            certificates_printed: Number(woreda.certificates_printed),
            certificates_collected: Number(woreda.certificates_collected),
            date: date,
            year: date.split("-")[0],
            month: date.split("-")[1],
            day: date.split("-")[2],
            text_date: date.split("-")[2],
          };

          let id = `${String(record.date)}_${String(
            record.woreda_name.replace(/\//g, "")
          )}`;
          console.log(record, id);
          records.push(record);
          setTimeout(async () => {
            try {
              await insertIntoElastic(record, id);
            } catch (error) {
              if (error instanceof etlExceptions) {
                let message = {
                  index: "calm",
                  extraction_date: new Date(),
                  extraction_status: EXTRACTION_STATUS.COMPLETED,
                  number_of_extracted_records: results.length,
                  method: EXTRACTION_METHOD.SYSTEMATIC,
                  message: error.message,
                };
                await notifire.notify(message);
              }
            }
          }, 300 * x);
        }
        let new_date = addOneWeek(date);
        updateConfigFile({ date: new_date });

        await updateCsvFile(records);
        await etl();
      }
    }
  );
}

const csvWriter = createCsvWriter({
  path: "./records.csv",
  header: [
    { id: "region_name", title: "region_name" },
    { id: "zone_name", title: "zone_name" },
    { id: "woreda_name", title: "woreda_name" },
    { id: "demarcated", title: "demarcated" },
    { id: "digitized", title: "digitized" },
    { id: "certificates_approved", title: "certificates_approved" },
    { id: "certificates_printed", title: "certificates_printed" },
    { id: "certificates_collected", title: "certificates_collected" },
    { id: "date", title: "date" },
    { id: "year", title: "year" },
    { id: "month", title: "month" },
    { id: "day", title: "day" },
    { id: "text_date", title: "text_date" },
  ],
});

async function updateCsvFile(records: any) {
  try {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        await csvWriter.writeRecords(records);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
