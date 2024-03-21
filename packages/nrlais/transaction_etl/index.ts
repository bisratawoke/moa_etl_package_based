import transactionWithGenderInfo, {
  transactionWithoutGenderInfo,
} from "./transaction.sync";

export enum TRANSACTION_OPERATION_TYPE {
  WITHGENDER_INFO,
  WITHOUT_GENGER_INFO,
}
export function nrlais_transaction_elt(
  opType: TRANSACTION_OPERATION_TYPE
): any {
  return async () => {
    try {
      if (opType == TRANSACTION_OPERATION_TYPE.WITHGENDER_INFO) {
        await transactionWithGenderInfo();
      } else if (opType == TRANSACTION_OPERATION_TYPE.WITHOUT_GENGER_INFO) {
        await transactionWithoutGenderInfo();
      } else {
        console.log("Please specify the operation type");
      }
    } catch (error) {
      console.log(error);
    }
  };
}
