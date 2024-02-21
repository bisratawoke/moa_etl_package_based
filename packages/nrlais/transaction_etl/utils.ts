import { AxiosError } from "axios";
import axios from "axios";
import config from "config";
import etlExceptions, { etlExceptionType } from "etl-exception";
import * as fs from "fs";
import * as path from "path";
// export const indexName =
//   "nrlais_land_admin_system_parcels_weekly_extracted_data_test";

/**
 * 
 * @param indexName   // case 14:
          //   record.transaction_type = "Boundary Correction";
          //   break;
 * @param rec 
 * @param id 
 * @returns 
 */

function getRelationshipText(number) {
  switch (number) {
    case 1:
      return "Husband";
    case 2:
      return "Wife";
    case 3:
      return "Brother";
    case 4:
      return "Sister";
    case 5:
      return "Female Headed Household";
    case 6:
      return "Male Headed Household";
    case 7:
      return "Under Age";
    case 8:
      return "Other";
    case 9:
      return "Not Available";
    default:
      return "Unknown Relationship";
  }
}

export function partyTypeConv(code: Number) {
  let partyTypeText: string | null = null;
  switch (code) {
    case 1:
      partyTypeText = "Natural Person";
      break;
    case 2:
      partyTypeText = "Non-natural person";
      break;
    case 3:
      partyTypeText = "State";
      break;
    case 4:
      partyTypeText = "Community";
      break;
    case 5:
      partyTypeText = "Tribe";
      break;
    case 6:
      partyTypeText = "Group Party";
      break;
    case 7:
      partyTypeText = "Financial Institution";
      break;
    default:
      partyTypeText = "Undefined";
  }

  return partyTypeText;
}

export const insertWithOutGender = async (
  indexName: string,
  rec: Record<string, any>,
  id: string
) => {
  try {
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
    console.log(result.status);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
      console.log(error.response?.data);
    }
    return;
  }
};

export const insertIntoElastic = async (
  indexName: string,
  rec: Record<string, any>
) => {
  return new Promise(async (resolve, reject) => {
    try {
      delete rec.tx_data;

      console.log("====== in insert baby =====");
      let partyTypeText = partyTypeConv(rec.partyType);
      let partyTextRole = getRelationshipText(rec.mreg_familyrole);

      let payload = {
        ...rec,
        partyTypeText,
        partyTextRole,
      };

      console.log("====== in insert baby ======");
      console.log(payload);
      const result = await axios.post(
        `${config.ELASTIC_URL}/${indexName}/_doc`,
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

      // if (rec.mreg_familyrole) {
      //   const result = await axios.post(
      //     `${config.ELASTIC_URL}/${indexName}/_doc`,
      //     rec,
      //     {
      //       auth: {
      //         username: config.ELASTIC_USERNAME,
      //         password: config.ELASTIC_PASSWORD,
      //       },
      //     }
      //   );
      //   console.log(result.status);
      //   resolve(true);
      // } else {
      //   console.log("mreg_familyrole does not exist");
      //   resolve(true);
      // }
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
