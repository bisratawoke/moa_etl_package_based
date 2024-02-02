export function microwatshedTransformer(
  record: Record<string, any>
): Record<string, any> {
  return {
    ...record,
    kebele_location: JSON.parse(record.kebele_location),
    microwatershed_location: JSON.parse(record.microwatershed_location),
    woreda_location: JSON.parse(record.woreda_location),
    zone_location: JSON.parse(record.zone_location),
    region_location: JSON.parse(record.region_location),
    watershed_location: JSON.parse(record.watershed_location),
  };
}

export function majorWatershedTransformer(record: Record<string, any>) {
  return {
    ...record,
    location: JSON.parse(record.location),
  };
}

export function adminLocationTransformer(record: Record<string, any>) {
  return {
    ...record,
    kebele_location: JSON.parse(record.kebele_location),
    woreda_location: JSON.parse(record.woreda_location),
    zone_location: JSON.parse(record.zone_location),
    region_location: JSON.parse(record.region_location),
    microwatershed_location: JSON.parse(record.microwatershed_location),
    watershed_location: JSON.parse(record.microwatershed_location),
  };
}
