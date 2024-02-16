import * as sql from "mssql";
import config from "moa_config";
import {
  extract_pds_member,
  extract_pds_total_cash_transfer,
  extract_pw_member,
  extract_pw_total_cash_transfer,
} from "./services/socioecon.services.extract";
import { timeInfo } from "./services/socioecon.services.transform";
import { insertIntoElastic } from "./services/socioecon.services.load";

export default async function main() {
  try {
    let db_config = {
      server: String(config.PSNP_MIS_HOST),
      database: String(config.PSNP_MIS_DATABASE),
      user: config.PSNP_MIS_USER,
      password: config.PSNP_MIS_PASSWORD,
      options: {
        trustServerCertificate: true,
      },
    };
    console.log(db_config);
    const db_conn = await sql.connect(db_config);
    // const pds_member = await extract_pds_member(db_conn);
    const pw_member = await extract_pw_member(db_conn);
    // const pds_cash_transfer = await extract_pds_total_cash_transfer(db_conn);
    // const pw_cash_transfer = await extract_pw_total_cash_transfer(db_conn);

    // for (let x = 0; x < pds_member.length; x++) {
    //   setTimeout(async () => {
    //     const payload = {
    //       ...pds_member[x],
    //       project_name: "PDS",
    //       ...timeInfo(pds_member[x].RegistrationDate),
    //     };
    //     console.log(payload);
    //     await insertIntoElastic("socioconomic_clients", payload, payload.Id);
    //   }, x);
    // }

    for (let x = 0; x < pw_member.length; x++) {
      setTimeout(async () => {
        const payload = {
          ...pw_member[x],
          project_name: "PW",
          ...timeInfo(pw_member[x].RegistrationDate),
        };
        await insertIntoElastic("socioconomic_clients", payload, payload.Id);
      }, 300 * x);
    }

    // for (let x = 0; x < pds_cash_transfer.length; x++) {
    //   setTimeout(async () => {
    //     const payload = {
    //       ...pds_cash_transfer[x],
    //       project_name: "PDS",
    //       ...timeInfo(pds_cash_transfer[x].CreatedDate),
    //     };

    //     console.log(payload);
    //     await insertIntoElastic(
    //       // "socioeconomic_cash_transfer_with_gender_info",
    //       "socioeconomic_cash_transfer_with_gender_and_quarter",
    //       // "socioeconomic_cash_transfer",
    //       payload,
    //       payload.Id
    //     );
    //   }, 800 * x);
    // }

    // for (let x = 0; x < pw_cash_transfer.length; x++) {
    //   setTimeout(async () => {
    //     const payload = {
    //       ...pw_cash_transfer[x],
    //       project_name: "PW",
    //       ...timeInfo(pw_cash_transfer[x].CreatedDate),
    //     };

    //     console.log(payload);
    //     await insertIntoElastic(
    //       "socioeconomic_cash_transfer_with_gender_and_quarter",
    //       // "socioeconomic_cash_transfer",
    //       payload,
    //       payload.Id
    //     );
    //   }, 800 * x);
    // }
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
}

(async () => {
  await main();
})();
