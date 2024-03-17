import { normailizeRegionName } from "./psnp_pw.services.transform.location";

export default function actTransformer(
  record: Record<string, any>
): Record<string, any> {
  console.log("====== in transformer ====");
  console.log(record.unit.toLowerCase());
  console.log("====== out transformer ====");
  record = normailizeRegionName(record);
  return {
    ...record,
    location: JSON.parse(record.location),
    Unit: record.unit ? record.unit.toLowerCase() : "",
    area:
      record.unit && record.unit.toLowerCase() == "ha"
        ? record.area / 10000
        : record.area,
  };
}
