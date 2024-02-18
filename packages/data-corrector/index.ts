// const obj = require("./data.js");
const axios = require("axios");
// const fetch = require("node-fetch");
import config from "config";

const elasticUrl = config.ELASTIC_URL;
const username = config.ELASTIC_USERNAME;
const password = config.ELASTIC_PASSWORD;
async function updateIndex(obj, id, indexName) {
  try {
    const result = await axios.post(
      `${elasticUrl}/${indexName}/_doc/${id}`,
      obj,
      {
        auth: {
          username: username,
          password: password,
        },
      }
    );
    // if (result.status != 200) throw result.status;
    // else
    console.log(result.status);
  } catch (error) {
    console.log("============ error in updateIndex =================");
    console.log(error);

    process.exit(1);
  }
}

async function insertIntoElastic(obj, indexName) {
  try {
    const result = await axios.post(`${elasticUrl}/${indexName}/_doc/`, obj, {
      auth: {
        username: username,
        password: password,
      },
    });
    if (result.status != 201) throw result.status;
    else console.log(result.status);
  } catch (error) {
    console.log("============ error in updateIndex =================");
    console.log(error);
    process.exit(1);
  }
}

async function getInfoElastic(url) {
  try {
    const result = await axios.get(`${url}`, {
      auth: {
        username: username,
        password: password,
      },
    });

    if (result.status != 200) throw new Error(result);
    else return result.data;
  } catch (error) {
    console.log("============ error in getInfoElastic =================");
    console.log(error);
    process.exit(1);
  }
}

async function getCount(indexName) {
  const count = await getInfoElastic(`${elasticUrl}/${indexName}/_count`);
  return count;
}

async function createMapping(indexName, properties) {
  try {
    const result = await axios.put(
      `${elasticUrl}/${indexName}/`,
      {
        mappings: {
          properties,
        },
      },
      {
        auth: {
          username: username,
          password: password,
        },
      }
    );
    if (result.status != 200) throw new Error(result);
    else console.log("sucessfully created mapping");
  } catch (error) {
    console.log("============== error in createMapping =================");
    console.log(error);
  }
}

async function reindex(originalIndexName, newIndexName) {
  const { count } = await getCount(originalIndexName);
  console.log(count);
  const result = await getInfoElastic(
    `${elasticUrl}/${originalIndexName}/_search?size=${count}`
  );

  result.hits.hits.forEach(async (rec, indx) => {
    let payload = {
      ...rec._source,
      record_type: "SLMP",
    };

    console.log(payload);
    console.log(rec._id);
    setTimeout(async () => {
      await insertIntoElastic(payload, newIndexName), indx * 200;
    });
  });
}

function ethiopianToGregorians(ethiopianYear) {
  // Ethiopian calendar has an 8-year difference until September 10, and 7-year difference after that
  const gregorianDifference = 8;

  // Adjust the year based on the difference
  const gregorianYear = ethiopianYear + gregorianDifference;

  return gregorianYear;
}

main("slmp_2001_2015_swc_treatments_result");
async function main(indexName) {
  try {
    const { count } = await getCount(indexName);
    // let count = 4113;
    console.log(count);

    const result = await getInfoElastic(
      `${elasticUrl}/${indexName}/_search?size=${count}`
    );
    // console.log(result);
    console.log(`${result.hits.hits.length} ${count}`);

    result.hits.hits.forEach(async (rec, indx) => {
      if (rec._source.old_year) {
        console.log("old year exists");
        // let payload = {
        //   ...rec._source,
        //   old_year: rec._source.year,
        //   year: ethiopianToGregorian(rec._source.year),
        //   string_year: String(ethiopianToGregorian(rec._source.year)),
        // };
        // console.log(payload);
      } else {
        // console.log("===== no old year ======");
        // console.log(rec._source.year);
        console.log("no old year");
        // console.log(payload);
        let payload = {
          ...rec._source,
          old_year: rec._source.year,
          year: ethiopianToGregorian(rec._source.year),
          string_year: String(ethiopianToGregorian(rec._source.year)),
        };
        console.log(payload);
        setTimeout(async () => {
          await updateIndex(payload, rec._id, indexName);
        }, indx * 300);
      }

      // setTimeout(async () => {
      //   await updateIndex(payload, rec._id, indexName);
      // }, indx * 200);
    });
  } catch (err) {
    console.error(err.response);
  }
}

// function dateTransformer(record) {
//   return {
//     ...record,
//     year: Number(
//       ethiopianQuarterToGregorian(record.year, record.quarter).gregorianYear
//     ),
//     string_year: String(
//       ethiopianQuarterToGregorian(record.year, record.quarter).gregorianYear
//     ),
//     quarter: record.quarter,
//     eth_quarter: record.quarter,
//     eth_year: Number(record.year),
//   };
// }

function ethiopianToGregorian(ethiopianYear) {
  // Offset between Ethiopian and Gregorian calendars
  const gregorianOffset = 8;

  // Convert Ethiopian year to Gregorian year
  const gregorianYear = ethiopianYear + gregorianOffset;

  return gregorianYear;
}

// function ethiopianQuarterToGregorian(ethiopianYear, ethiopianQuarter) {
//   // The Ethiopian calendar is about 7-8 years behind the Gregorian calendar
//   const gregorianOffset = 7;

//   // Calculate the Gregorian year by adding the offset
//   let gregorianYear = ethiopianYear + gregorianOffset;

//   // Adjust the Gregorian year and quarter based on the Ethiopian quarter
//   if (ethiopianQuarter > 1) {
//     gregorianYear += 1;
//   }
//   const gregorianQuarter = ((ethiopianQuarter + 2) % 4) + 1;

//   return {
//     gregorianYear,
//     gregorianQuarter,
//   };
// }
/**
 * pasdip
 * calm
 */
// main("");
// main("meret_swc_result");
// main("calm_soil_water_conservation_treatments");
// main("mlm_biological_swc_treatment_result");
// main("biological_meret_result");
// main("physical_pasdip_map_data_result");
// main("smlp_major_watershed");
// main("land_grade_graph_llup");
// main("land_graph_with_admin_untis_report");
// main("ca_soil_v2");
// main("nrlais_transaction_party_with_date");
// main("nrlais_parcels_data");
// main("psnp_pw_biological_treatments_all");
// main("mlm_physical_swc_treatments_result");
// main("pw_total_cash_transfer_report");
async function updateSlmpAroforestryRegionName() {
  try {
    let requestOpts = {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
          "base64"
        )}`,
      },
      body: JSON.stringify({
        query: {
          match: {
            region_name: "SWE",
          },
        },
      }),
    };
    const currentData = await fetch(
      `${elasticUrl}/slm_agroforestry_result`,
      requestOpts
    );
    console.log(currentData.status);
  } catch (error) {
    console.log(
      "========== in updated slmp agroforestry regio name ==========="
    );
    console.log(error);
    process.exit(1);
  }
}

// async function fixMicrowatershedsRegionNameIssue() {
//   try {
//     const username = "elastic";
//     const password = "e4Tbmjluy4FpkJYbFFVM";
//     let indexName = "microwatersheds_information_psnp_pw";
//     obj.forEach(async (rec, indx) => {
//       let payload = {
//         ...rec._source,
//         region_name: "SNNP",
//       };

//       setTimeout(async () => {
//         await updateIndex(payload, rec._id, indexName);
//       }, indx * 1000);
//     });
//   } catch (error) {
//     console.log(
//       "==================== in fixMicrowatershedsRegionNameIssue ================="
//     );
//     console.log(error);
//     process.exit(1);
//   }
// }

// async function updateSoilAcidityIndex() {
//   try {
//     let acidityIndex = {
//       5: "Strongly acidic",
//       4.6: "Strongly acidic",
//       5.5: "Moderately acidic",
//       4.6: "Strongly acidic",
//     };
//     const { count } = await getCount("acidity");
//     let url = `${elasticUrl}/${"acidity"}/_search?size=${count}`;
//     const results = await getInfoElastic(url);

//     results.hits.hits.forEach(async (rec) => {
//       try {
//         let payload = {
//           ...rec._source,
//           category: acidityIndex[rec._source.soil_ph_level],
//           area: parseFloat(rec._source.area),
//         };
//         console.log(rec._id);
//         await updateIndex(payload, rec._id, "acidity");
//       } catch (error) {
//         console.log("============== error in insert data =================");
//         console.log(error);
//         process.exit(1);
//       }
//     });
//   } catch (error) {
//     console.log(
//       "=================== in update soil acidity index ================="
//     );
//     console.log(error);
//     process.exit(1);
//   }
// }

async function updateNumberOfClientsGivenLoansSocioEconomic() {
  try {
    const { count } = await getCount("socioeconomics_credit");
    const result = await getInfoElastic(
      `${elasticUrl}/socioeconomics_credit/_search?size=${count}`
    );
    result.hits.hits.forEach(async (rec) => {
      let payload = {
        ...rec._source,
        Date: "2015",
        quarter: "4th Quarter",
      };
      await updateIndex(payload, rec._id, "socioeconomics_credit");
    });
  } catch (error) {
    console.log(
      "================ in update number of clients given loan ================="
    );
    console.log(error);
    process.exit(1);
  }
}

async function correctRegionName() {
  try {
    const response = await axios.post(
      `${elasticUrl}/slmp_seedling_production_result_2012/_search`,
      {
        query: {
          term: {
            "region_name.keyword": "Amhara\t",
          },
        },
      },
      {
        auth: {
          username: username,
          password: password,
        },
      }
    );
    response.data.hits.hits.forEach(async (rec) => {
      const result = await axios.post(
        `${elasticUrl}/slmp_seedling_production_result_2012/_doc/${rec._id}`,
        {
          ...rec._source,
          region_name: "Amhara",
        },
        {
          auth: {
            username: username,
            password: password,
          },
        }
      );
      if (result.status != 200) throw result.status;
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
// correctRegionName();
// main("carbon_sequestered_slmp");
// updateSlmpAroforestryRegionName();
// updateNumberOfClientsGivenLoansSocioEconomic();
// fixMicrowatershedsRegionNameIssue();
// updateSoilAcidityIndex();
