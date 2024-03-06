import sync, { syncWithOutGeom } from "./parcels.sync";
import etl from "./parcels.etl";
import parcelWaterShedSync from "./parcels.watershed";
export enum OPERATION_TYPE {
  SYNC = "SYNC",
  ETL = "ETL",
  WATERSHED_SYNC = "WATERSHED_SYNC",
  SYNC_WITHOUT_GEOM = "SYNC_WITHOUT_GEOM",
}

export function nrlais_parcel_elt(opType: OPERATION_TYPE): any {
  return async () => {
    try {
      if (opType == OPERATION_TYPE.SYNC) {
        console.log("======= sync is called =======");
        await sync();
      } else if (opType == OPERATION_TYPE.ETL) {
        // await etl();
      } else if (opType == OPERATION_TYPE.WATERSHED_SYNC) {
        await parcelWaterShedSync();
      } else if (opType == OPERATION_TYPE.SYNC_WITHOUT_GEOM) {
        await syncWithOutGeom();
      } else {
        console.log("error please specify the operation type");
      }
    } catch (error) {
      console.log(error);
    }
  };
}

(async () => {
  await nrlais_parcel_elt(OPERATION_TYPE.SYNC_WITHOUT_GEOM)();
})();
