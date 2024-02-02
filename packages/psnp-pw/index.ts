import etlExceptions, { etlExceptionType } from "etl-exception";
import { extract_activites_info } from "./src/services/extract/psnp_pw.services.extract.activites";
import {
  admin_location_info_extraction,
  extractMajorWatershed,
  extractMicrowatshed,
} from "./src/services/extract/psnp_pw.services.extract.location";
import { insertIntoElastic } from "./src/services/load/psnp_pw.services.load";
import actTransformer from "./src/services/transform/pnsp_pw.services.transform.activities";
import {
  microwatshedTransformer,
  majorWatershedTransformer,
  adminLocationTransformer,
} from "./src/services/transform/psnp_pw.services.transform.location";
export enum OPERATION_TYPE {
  LOCATION = "ADMIN_LOCATION",
  MAJOR_WATERSHED = "MAJOR_WATERSHEDS",
  ACTIVITIES = "ACTIVITIES",
  MICRO_WATERSHED = "MICRO_WATERSHEDS",
}

export default function main(optType: OPERATION_TYPE) {
  return async () => {
    try {
      let count = 0;
      switch (optType) {
        case OPERATION_TYPE.LOCATION:
          for await (const location of admin_location_info_extraction()) {
            setTimeout(async () => {
              let record: any = adminLocationTransformer(location);
              await insertIntoElastic(
                record,
                "psnp_pw_admin_location",
                record.id
              );
            }, count * 3000);
          }
          break;
        case OPERATION_TYPE.MAJOR_WATERSHED:
          for await (const location of extractMajorWatershed()) {
            setTimeout(async () => {
              let record: any = majorWatershedTransformer(location);
              await insertIntoElastic(
                record,
                "psnp_pw_major_watershed",
                record.id
              );
            }, count * 3000);
          }
          break;
        case OPERATION_TYPE.MICRO_WATERSHED:
          for await (const location of extractMicrowatshed()) {
            setTimeout(async () => {
              let record = microwatshedTransformer(location);
              await insertIntoElastic(
                record,
                "psnp_pw_micro_watershed",
                record.id
              );
            }, count * 3000);
          }
          break;
        case OPERATION_TYPE.ACTIVITIES:
          for await (const activity of extract_activites_info()) {
            let record = actTransformer(activity);

            console.log("==== in here ===");
            await insertIntoElastic(
              record,
              "psnp_swc_treatment_result_scheduler_test",
              record.id
            );
          }
          break;
        default:
          console.log("Please specify a proper OPERATION_TYPE");
      }
    } catch (error) {
      console.log("==== i was caught =====");
      if (error instanceof etlExceptions) throw error;
      else throw new etlExceptions(error.message, etlExceptionType.UNKNOWN);
    }
  };
}
