import { normailizeRegionName } from "./psnp_pw.services.transform.location";

export default function actTransformer(
  record: Record<string, any>
): Record<string, any> {
  record = normailizeRegionName(record);
  record = {
    ...record,
    location: JSON.parse(record.location),
    Unit: record.unit ? record.unit.toLowerCase() : "",
    area:
      record.unit && record.unit.toLowerCase() == "ha"
        ? record.area / 10000
        : record.area,
  };
  delete record["unit"];
  return record;
}
