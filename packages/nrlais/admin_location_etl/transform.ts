export async function removeNullLocation(record: Record<string, any>) {
  if (record.location == null) delete record.location;
  else record.location = JSON.parse(record.location);
  return record;
}
