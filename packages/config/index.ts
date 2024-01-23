import * as fs from "fs";
import * as path from "path";

let config: any = null;
if (process.env.NODE_ENV?.trim() === "development") {
  config = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "devConfig.json")).toString()
  );
} else if (process.env.NODE_ENV?.trim() === "production") {
  config = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "prodConfig.json")).toString()
  );
} else {
  console.error(
    'Unsupported environment. Set NODE_ENV to "development" or "production".'
  );
  process.exit(1);
}
export default config;
