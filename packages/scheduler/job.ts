import Notifier, { EXTRACTION_STATUS, EXTRACTION_METHOD } from "notifire";
import etlExceptions from "etl-exception";
import config from "config";

let notifier = new Notifier({
  username: config.ELASTIC_USERNAME,
  password: config.ELASTIC_PASSWORD,
  host: config.ELASTIC_URL,
});

export default function jobber(
  indexName: any,
  job: () => Promise<void> | any,
  retryInterval?: any
): () => Promise<void> {
  return async () => {
    try {
      await notifier.notify({
        index: indexName,
        extraction_status: EXTRACTION_STATUS.IN_PROGRESS,
        extraction_date: new Date(),
        number_of_extracted_records: 0,
        method: EXTRACTION_METHOD.SYSTEMATIC,
      });
      await job();
      await notifier.notify({
        index: indexName,
        extraction_status: EXTRACTION_STATUS.COMPLETED,
        extraction_date: new Date(),
        number_of_extracted_records: 0,
        method: EXTRACTION_METHOD.SYSTEMATIC,
      });
    } catch (error) {
      if (error instanceof etlExceptions) {
        await notifier.notify({
          index: indexName,
          extraction_status: EXTRACTION_STATUS.FAILED,
          extraction_date: new Date(),
          number_of_extracted_records: 0,
          method: EXTRACTION_METHOD.SYSTEMATIC,
        });
      }
      setTimeout(async () => {
        await jobber(indexName, job);
      }, retryInterval);
    }
  };
}
