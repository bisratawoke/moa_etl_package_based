import sync from "./parcels.sync";
import etl from "./parcels.etl";
import parcelWaterShedSync from "./parcels.watershed";
export enum OPERATION_TYPE {
  SYNC = "SYNC",
  ETL = "ETL",
  WATERSHED_SYNC = "WATERSHED_SYNC",
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
        // await parcelWaterShedSync();
      } else {
        console.log("error please specify the operation type");
      }
    } catch (error) {
      console.log(error);
    }
  };
}
