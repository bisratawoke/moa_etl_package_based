import { extract_activites_info } from "./src/services/extract/psnp_pw.extract";

export default async function main() {
  try {
    await extract_activites_info();
  } catch (error) {
    console.log(error);
  }
}

main();
