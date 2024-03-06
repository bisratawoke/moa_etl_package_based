export async function removeNullLocation(record: Record<string, any>) {
  if (record.location == null) delete record.location;
  return record;
}
