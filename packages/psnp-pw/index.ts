import { extract_activites_info } from "./src/services/extract/psnp_pw.services.extract.activites";
import { admin_location_info_extraction } from "./src/services/extract/psnp_pw.services.extract.location";
import { insertIntoElastic } from "./src/services/load/psnp_pw.services.load";
export enum OPERATION_TYPE {
  LOCATION = "LOCATION",
  ACTIVITIES = "ACTIVITIES",
}
export default async function main(optType: OPERATION_TYPE) {
  try {
    if (optType === OPERATION_TYPE.LOCATION) {
      let count = 0;
      for await (const location of admin_location_info_extraction()) {
        setTimeout(async () => {
          await insertIntoElastic(
            location,
            "psnp_swc_treatment_result_scheduler_test",
            location.id
          );
        }, count * 3000);
      }
    } else if (optType === OPERATION_TYPE.ACTIVITIES) {
      let count = 0;

      for await (const activity of extract_activites_info()) {
        setTimeout(async () => {
          await insertIntoElastic(
            activity,
            "psnp_swc_treatment_result_scheduler_test",
            activity.id
          );
        }, count * 3000);
      }
    } else {
      console.log("Please specify a proper OPERATION_TYPE");
    }
  } catch (error) {
    console.log(error);
  }
}
