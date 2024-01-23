import axios from "axios";
const nodemailer = require("nodemailer");
import config from "config";

export interface IElasticConfig {
  host: string;
  username: string;
  password: string;
}

export interface IMessage {
  index: string;
  extraction_status: EXTRACTION_STATUS;
  extraction_date: Date;
  number_of_extracted_records: number;
  method: EXTRACTION_METHOD;
  user?: string;
}

export enum EXTRACTION_METHOD {
  SYSTEMATIC = "systematic",
  MANUAL = "manual",
}

export enum EXTRACTION_STATUS {
  IN_PROGRESS = "in progress",
  COMPLETED = "completed",
  FAILED = "failed",
}

export default class Notifier {
  private readonly elasticConfig?: IElasticConfig;
  constructor(elasticConfig?: IElasticConfig) {
    this.elasticConfig = elasticConfig;
  }

  private async getEmailCred() {
    try {
      console.log({
        auth: {
          username: this.elasticConfig?.username,
          password: this.elasticConfig?.password,
        },
      });
      const headers: any = {
        auth: {
          username: this.elasticConfig?.username,
          password: this.elasticConfig?.password,
        },
      };
      const result = await axios.get(
        `${this.elasticConfig?.host}/notifier/_search`,
        headers
      );

      return result.data.hits.hits[0]._source;
    } catch (err: any) {
      console.log(err?.response?.data);
      // console.log(err);
    }
  }

  private async sendEmail(message: IMessage) {
    try {
      console.log("=============== in send email =================");
      const { email, password } = await this.getEmailCred();
      console.log(email, password);
      let mailTransporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: email,
          pass: password,
        },
      });

      let mailDetails = {
        from: email,
        to: email,
        subject: "Notification",
        text: JSON.stringify(message),
      };

      mailTransporter.sendMail(mailDetails, function (err: any, data: any) {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent successfully");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  private async sendToElasticLog(message: IMessage) {
    try {
      const result = await axios.post(
        `${this.elasticConfig?.host}/logs/_doc`,
        {
          "@timestamp": new Date(),
          message: `${message.index} ${message.extraction_status} ${
            message.number_of_extracted_records
          } ${message.method} ${message.user ? message.user : "System"}`,
          ...message,
          user: message.user ? message.user : "System",
        },
        {
          auth: {
            username: String(this.elasticConfig?.username),
            password: String(this.elasticConfig?.password),
          },
        }
      );
      console.log(result.status);
    } catch (err) {
      console.log(err);
    }
  }

  public async notify(message: IMessage) {
    try {
      await this.sendEmail(message);
      await this.sendToElasticLog(message);
    } catch (error) {
      console.log(error);
    }
  }
}

let notifier = new Notifier({
  username: config.ELASTIC_USERNAME,
  password: config.ELASTIC_PASSWORD,
  host: config.ELASTIC_URL,
});
