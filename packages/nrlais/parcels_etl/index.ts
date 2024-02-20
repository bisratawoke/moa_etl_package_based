import sync from "./parcels.sync";
import etl from "./parcels.etl";

export enum OPERATION_TYPE {
  SYNC = "SYNC",
  ETL = "ETL",
}

export function nrlais_parcel_elt(opType: OPERATION_TYPE): any {
  return async () => {
    try {
      if (opType == OPERATION_TYPE.SYNC) {
        await sync();
      } else if (opType == OPERATION_TYPE.ETL) {
        await etl();
      } else {
        console.log("error please specify the operation type");
      }
    } catch (error) {
      console.log(error);
    }
  };
}
