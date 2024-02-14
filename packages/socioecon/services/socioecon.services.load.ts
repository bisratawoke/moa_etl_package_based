import axios from "axios";
import config from "config";

export async function insertIntoElastic(
  indexName: any,
  rec: Record<string, any>,
  id: string
) {
  try {
    const headers: any = {
      auth: {
        username: config.ELASTIC_USERNAME,
        password: config.ELASTIC_PASSWORD,
      },
    };

    console.log(`${config.ELASTIC_URL}/${indexName}/_doc/${id}`);
    const result = await axios.post(
      `${config.ELASTIC_URL}/${indexName}/_doc/${id}`,
      rec,
      headers
    );
    console.log(result.status);
  } catch (error) {
    console.log(error);
    console.log(error.response);
    process.exit(1);
  }
}
