import { etl_kebele, etl_region, etl_woreda, etl_zone } from "./extract";

export default async function admin_location_etl() {
  // await etl_region();
  await etl_zone();
  // await etl_woreda();
  // await etl_kebele();
}

(async () => {
  await admin_location_etl();
})();
