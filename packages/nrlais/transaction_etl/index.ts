import sync from "./transaction.sync";

export function nrlais_transaction_elt(): any {
  return async () => {
    try {
      await sync();
    } catch (error) {
      console.log(error);
    }
  };
}
