import { Check } from "./models/check";
import axios from "axios";
import { UrlBuilder } from "./utils/url-builder";
import { CreateReport } from "./models/report";

export async function poll() {
  const checks = await Check.findAll();
  for (const check of checks) {
    setInterval(async () => {
      const builder = new UrlBuilder();
      builder.setUrl(check.url).setPort(check.port).setPath(check.path);
      const record = {} as CreateReport["history"][0];
      try {
        const startTime = Date.now();
        await axios.get(builder.url, {
          timeout: check.timeout,
          headers: check.httpHeaders,
        });
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        record.isAvailable = true;
        record.date = new Date();
        record.responseTime = responseTime;
      } catch (error) {
        record.isAvailable = false;
        record.responseTime = 0;
        record.date = new Date();
      }
    }, check.interval);
  }
}
