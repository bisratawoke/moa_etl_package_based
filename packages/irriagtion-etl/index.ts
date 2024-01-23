import axios from "axios";
const { v4: uuidv4 } = require("uuid");
import etlExceptions, { etlExceptionType } from "etl-exception";
import config from "config";
const elasticUrl = config.ELASTIC_URL;
const indexName = config.irrigationIndexName;
const username: any = config.ELASTIC_USERNAME;
const password: any = config.ELASTIC_PASSWORD;
const irrigationBaseUrl = config.irrigationBaseUrl;

async function insertIntoElastic(obj: any, indexName: any, id: any) {
  try {
    const result = await axios.post(
      `${elasticUrl}/${indexName}/_doc/${id ? id : uuidv4()}`,
      obj,
      {
        auth: {
          username: username,
          password: password,
        },
      }
    );
  } catch (error: any) {
    throw new etlExceptions(error.message, etlExceptionType.LOADING);
  }
}

async function getIrrigationFromApi() {
  try {
    const baseData = await axios.get(`${irrigationBaseUrl}/irrigation/`);
    return baseData.data;
  } catch (err: any) {
    throw new etlExceptions(err.message, etlExceptionType.EXTRACTION);
  }
}

async function makePostRequest(requestBody: any) {
  return new Promise(async (resovle, reject) => {
    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${irrigationBaseUrl}/generate_detailed_report/`,
          requestBody
        );
        return resovle(res.data);
      } catch (error) {
        throw new etlExceptions(error.message, etlExceptionType.LOADING);
      }
    }, 3000);
  });
}

function constructRequestBody(rec: any) {
  return {
    region: rec.region.id,
    zone: rec.zone.id,
    woreda: rec.woreda.id,
    basin: "all",
    agro_ecology: "all",
    start_date: "2015-01-01",
    end_date: "2022-01-01",
  };
}

async function sync(records: any) {
  try {
    records.forEach(async (data: any, indx: any) => {
      setTimeout(async () => {
        const payload = constructRequestBody(data);
        const res = await makePostRequest(payload);
        const elasticPayload = constructElasticPayload(data, res);

        await getCropProductionData(data);
        await insertIntoElastic(
          elasticPayload,
          "small_holder_irrigation",
          elasticPayload.id
        );
      }, indx * 3000);
    });
  } catch (error: any) {
    if (error instanceof etlExceptions) throw error;
    throw new etlExceptions(error.message, etlExceptionType.LOADING);
  }
}

function constructElasticPayload(baseData: any, postDataRec: any) {
  const femaleHeadedBeneficiaries =
    getFemaleHeadedBeneficiaries(postDataRec).value;
  const maleHeadedBeneficiaries =
    getActualNumberOfIrrigationBeneficiaries(postDataRec).value -
    getFemaleHeadedBeneficiaries(postDataRec).value;
  const IWUAs = getWaterAssociationDataIWUAS(postDataRec).data;

  return {
    id: baseData.id,
    region_name: baseData.region.name,
    zone_name: baseData.zone.name,
    woreda_name: baseData.woreda.name,
    irrigatedArea: getIrrigatedArea(baseData),
    landOwnedByMale:
      getTotalLand(postDataRec) - getFemaleOwnerLand(postDataRec).value,
    landOwnedByFemale: getFemaleOwnerLand(postDataRec).value,
    maleHeadedBeneficiaries,
    isUtilizingPumps: isUtilizingPumps(baseData),
    waterAbstractionMethod: baseData.WAMethod.name,
    annualInvestmentCost: baseData.invActualCost,
    year: baseData.invActualYear,
    IWUAs,
    grossWaterWithDrawal: getMeasuredGrossWaterWithDrawal(baseData),
    netWaterWithdrawal: getTotalActualNetWaterWithdrawal(baseData),
    irrigationBeneficaiars:
      getActualNumberOfIrrigationBeneficiaries(postDataRec).value,
    household_irrigation_structure_developed:
      postDataRec.totalAreaByOwnership[0].data[0].equipped > 0 ? true : false,
    household_irrigation_structure_developed_area:
      postDataRec.totalAreaByOwnership[0].data[0].actual,
    ...baseData,
  };
}

function getIrrigatedArea(data: any) {
  let area = 0;
  for (let x = 0; x < data.reports.length; x++) {
    area = area + data.reports[x].irrigatedArea;
  }
  return area;
}

function getTotalLand(data: any) {
  let area = 0;
  for (let x = 0; x < data.totalAreaByOwnership.length; x++) {
    if (
      data.totalAreaByOwnership[x].name == "HH" ||
      data.totalAreaByOwnership[x].name == "Public" ||
      data.totalAreaByOwnership[x].name == "Community"
    )
      area = area + data.totalAreaByOwnership[x].data[0].harvested;
    else continue;
  }
  return area;
}
// create and insert crop production as a different index then use data view to bind them together
async function getCropProductionData(data: any) {
  try {
    data.reports.forEach((report) => {
      report.crop_production.forEach(async (cropInfo, indx) => {
        const payload = {
          crop_name: cropInfo.crop.name,
          region_name: data.region.name,
          zone_name: data.zone.name,
          woreda_name: data.woreda.name,
          year: new Date(cropInfo.harvestDate).getFullYear(),
          ...cropInfo,
        };
        setTimeout(async () => {
          const result = await insertIntoElastic(
            payload,
            "small_holder_crop_production",
            `${cropInfo.crop.id}-${new Date(
              cropInfo.harvestDate
            ).getFullYear()}-${cropInfo.crop.name}-${
              data.woreda.name
            }-${new Date(cropInfo.harvestDate)}`
          );
        }, indx * 300);
      });
    });
  } catch (error: any) {
    throw new etlExceptions(error.message, etlExceptionType.EXTRACTION);
  }
}

function getMeasuredGrossWaterWithDrawal(data: any) {
  return data.MeasuredGrossWaterWithdrawal == null
    ? 0
    : data.MeasuredGrossWaterWithdrawal;
}

function getTotalActualNetWaterWithdrawal(data: any) {
  return data.ActualNetWaterWithdrawal == null
    ? 0
    : data.ActualNetWaterWithdrawal;
}

function isUtilizingPumps(data: any) {
  return data.WAMethod.name.includes("pump") ? true : false;
}

function getWaterAssociationDataIWUAS(data: any) {
  return data.water_association_data.find(
    (data) => data.name == "Number of registered IWUAs members"
  );
}

function getFemaleOwnerLand(data: any) {
  return data.IrrigationBeneficiaries.find(
    (data) => data.name == "Irrigated area managed by female (ha)"
  );
}

function getActualNumberOfIrrigationBeneficiaries(data: any) {
  return data.IrrigationBeneficiaries.find(
    (data) => data.name == "Number of actual beneficiaries"
  );
}

function getFemaleHeadedBeneficiaries(data: any) {
  return data.IrrigationBeneficiaries.find(
    (data: any) => data.name == "Number of female-headed beneficiaries"
  );
}

export default async function main() {
  try {
    console.log(elasticUrl);
    console.log(irrigationBaseUrl);
    console.log();
    console.log("==== in irrigation etl ====");
    const baseData = await getIrrigationFromApi();
    console.log(baseData);
    // await sync(baseData);
  } catch (error: any) {
    if (error instanceof etlExceptions) throw error;
    else throw new etlExceptions(error.message, etlExceptionType.EXTRACTION);
  }
}
