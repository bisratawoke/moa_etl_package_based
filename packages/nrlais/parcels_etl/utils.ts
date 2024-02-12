import axios from "axios";
import config from "config";
import etlExceptions, { etlExceptionType } from "etl-exception";
import * as fs from "fs";
import * as path from "path";
export const indexName =
  "nrlais_land_admin_system_parcels_weekly_extracted_data_test";
// export const indexName =
//   "nrlais_land_admin_system_parcels_weekly_extracted_data_information";

export async function getMaxDate() {
  try {
    let payload = {
      aggs: {
        max_date: {
          max: {
            field: "date",
          },
        },
      },
    };
    const res = await axios.post(
      `${config.ELASTIC_URL}/${indexName}/_search`,
      payload,
      {
        auth: {
          username: config.ELASTIC_USERNAME,
          password: config.ELASTIC_PASSWORD,
        },
      }
    );
    return res.data.aggregations.max_date;
  } catch (error) {
    console.log("============ in get max date =================");
    console.log(error);
  }
}
export const insertIntoElastic = async (
  indexName: string,
  rec: Record<string, any>
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("======== in insertIntoElastic ====");
      let res: any = await doesParcelExist(rec.id);
      if (res) {
        let payload = {
          ...res,
          holders: [...res.holders, rec.gender_name],
        };
        const result = await axios.post(
          `${config.ELASTIC_URL}/${indexName}/_doc/${payload.id}`,
          payload,
          {
            auth: {
              username: config.ELASTIC_USERNAME,
              password: config.ELASTIC_PASSWORD,
            },
          }
        );
        resolve(true);
      } else {
        let payload = {
          ...rec,
          holders: [rec.gender_name],
        };
        const result = await axios.post(
          `${config.ELASTIC_URL}/${indexName}/_doc/${rec.id}`,
          payload,
          {
            auth: {
              username: config.ELASTIC_USERNAME,
              password: config.ELASTIC_PASSWORD,
            },
          }
        );
        resolve(true);
      }
    } catch (error) {
      resolve(true);
    }
  });
};

export const transformer = (
  record: Record<string, any>
): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    record.year = new Date(record.date).getFullYear();
    record.record_type = "nrlais_parcel";
    switch (record.gender) {
      case "f":
        record.gender_name = "Female";
        break;
      case "m":
        record.gender_name = "Male";
        break;
      default:
        record.gender_name = "None";
        break;
    }

    switch (record.holdingtype) {
      case 1:
        record.holdingtype = "Private";
        break;
      case 2:
        record.holdingtype = "Communal";
        break;
      default:
        record.holdingtype = "State";
    }

    switch (record.partytype) {
      case 1:
        record.partytype = "Natural Person";
        break;
      case 2:
        record.partytype = "Non-natural person";
        break;
      case 3:
        record.partytype = "State";
        break;
      case 4:
        record.partytype = "Community";
        break;
      case 5:
        record.partytype = "Tribe";
        break;
      case 6:
        record.partytype = "Group party";
        break;
      case 7:
        record.partytype = "Financial institution";
        break;
    }

    record.area = parseFloat(record.areageom);
    return resolve(record);
  });
};
async function doesParcelExist(parcel_id: string) {
  try {
    const response = await axios.get(
      `http://${config.ELASTIC_URL}/${indexName}/_doc/${parcel_id}`,
      {
        auth: {
          username: config.ELASTIC_USERNAME,
          password: config.ELASTIC_PASSWORD,
        },
      }
    );
    return { source: response.data._source, found: response.data.found };
  } catch (error) {
    return null;
  }
}

export interface IConfig {
  created_at: string;
  updated_at: string;
}

export function readConfig(): IConfig {
  return JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "config.json")).toString()
  );
}
export function updateConfig(data: IConfig) {
  let currentConfig = readConfig();
  fs.writeFileSync(
    path.resolve(__dirname, "config.json"),
    JSON.stringify({ ...currentConfig, ...data })
  );
}

export async function getMaxCreatedAtAndUpdatedAtFromIndex(
  indexName: string
): Promise<IConfig> {
  try {
    const response = await axios.post(
      `${config.ELASTIC_URL}/elastic/gateway/${indexName}/_search`,
      {
        aggs: {
          max_created_at: {
            max: {
              field: "created_at",
            },
          },
          max_updated_at: {
            max: {
              field: "updated_at",
            },
          },
        },
      },
      {
        auth: {
          username: config.ELASTIC_USERNAME,
          password: config.ELASTIC_PASSWORD,
        },
      }
    );

    return {
      created_at: response.data._source.created_at,
      updated_at: response.data._source.updated,
    };
  } catch (error) {
    if (error instanceof etlExceptions) throw error;
    else throw new etlExceptions(error.message, etlExceptionType.UNKNOWN);
  }
}
