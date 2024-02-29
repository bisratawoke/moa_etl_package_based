import axios from "axios";
import config from "config";
import etlExceptions, { etlExceptionType } from "etl-exception";
import * as fs from "fs";
import * as path from "path";
//nrlais_land_admin_system_parcels_weekly_extracted_data_information
// export const indexName =
//   "nrlais_land_admin_system_parcels_weekly_extracted_data_test";
export const indexName =
  "nrlais_land_admin_system_parcels_weekly_extracted_data_information";
export const watershedIndexName = "kmismws";

export async function getIndexCount(
  indexName: string,
  query?: Record<any, any>
) {
  try {
    const res = await axios.post(
      `${config.ELASTIC_URL}/${indexName}/_count`,
      query ? query : {},
      {
        auth: {
          username: config.ELASTIC_USERNAME,
          password: config.ELASTIC_PASSWORD,
        },
      }
    );

    return res.data.count;
  } catch (error) {
    console.log(error);
  }
}

export async function getMicroWatershed() {
  try {
    const count = await getIndexCount(watershedIndexName);
    const result = await axios.post(
      `${config.ELASTIC_URL}/${watershedIndexName}/_search?size=${count}`,
      {},
      {
        auth: {
          username: config.ELASTIC_USERNAME,
          password: config.ELASTIC_PASSWORD,
        },
      }
    );
    const watershedList = await result.data.hits.hits;
    return watershedList;
  } catch (error) {
    console.log("============ in get micro watersheds =================");
    console.log(error);
  }
}

export async function getParcelsThatIntersectWatersheds(
  watershedIndexName: string
) {
  try {
    const watershedInfo = await getMicroWatershed();

    let count = 0;
    for (let x = 0; x < watershedInfo.length; x++) {
      let id = watershedInfo[x]._id;
      let query = {
        query: {
          bool: {
            filter: {
              geo_shape: {
                location: {
                  indexed_shape: {
                    index: watershedIndexName,
                    id: id,
                    path: "location",
                  },
                },
              },
            },
          },
        },
        script: {
          source: `ctx._source._watershed = true`,
          lang: "painless",
        },
      };

      setTimeout(async () => {
        try {
          const result = await axios.post(
            `${config.ELASTIC_URL}/${indexName}/_update_by_query`,
            query,
            {
              auth: {
                username: config.ELASTIC_USERNAME,
                password: config.ELASTIC_PASSWORD,
              },
            }
          );
          console.log(result.status);
        } catch (error) {
          count += 1;
          console.log("");
        }
      }, x * 500);
      console.log(count);

      // console.log(id);
    }
  } catch (error) {}
}
export async function getMaxDate() {
  try {
    let payload = {
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
    return {
      max_created_at: res.data.aggregations.max_created_at,
      max_updated_at: res.data.aggregations.max_updated_at,
    };
  } catch (error) {
    console.log("============ in get max date =================");
    console.log(error);
  }
}

export const insertIntoElasticNotDuplication = async (
  indexName: string,
  rec: Record<string, any>
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await doesParcelExist(rec.id, rec.partyuid);

      if (!res) {
        const result = await axios.post(
          `${config.ELASTIC_URL}/${indexName}/_doc`,
          rec,
          {
            auth: {
              username: config.ELASTIC_USERNAME,
              password: config.ELASTIC_PASSWORD,
            },
          }
        );
      }
      resolve(true);
    } catch (error) {
      console.log("========= error while inserting elastic ===== ");
      resolve(true);
    }
  });
};

export const insertIntoElastic = async (
  indexName: string,
  rec: Record<string, any>
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("======== in insertIntoElastic ====");
      let res: any = await doesParcelExist(rec.id, rec.partyuid);
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
export async function doesParcelExist(
  parcel_id: string,
  party_id: string
): Promise<any> {
  try {
    const response = await axios.post(
      `http://${config.ELASTIC_URL}/${indexName}/_search`,
      {
        query: {
          bool: {
            must: [
              {
                match_phrase: {
                  id: parcel_id,
                },
              },
              {
                match_phrase: {
                  partyuid: party_id,
                },
              },
            ],
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

    return response.data.hits.hits.length > 0 ? true : false;
  } catch (error: any) {
    throw new etlExceptions(error.message, etlExceptionType.UNKNOWN);
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
