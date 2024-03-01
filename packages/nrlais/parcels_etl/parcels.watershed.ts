import {
  getIndexCount,
  getMicroWatershed,
  getParcelsThatIntersectWatersheds,
  watershedIndexName,
} from "./utils";

export default async function main() {
  try {
    const watershed = await getParcelsThatIntersectWatersheds(
      watershedIndexName
    );
    console.log(watershed);
  } catch (error) {}
}
