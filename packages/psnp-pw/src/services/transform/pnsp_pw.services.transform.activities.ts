export default function actTransformer(
  record: Record<string, any>
): Record<string, any> {
  return {
    ...record,
    location: JSON.parse(record.location),
    Unit: record.unit ? record.unit.toLowerCase() : "",
  };
}
