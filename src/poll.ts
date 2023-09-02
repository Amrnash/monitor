import { Check, CreateCheck } from "./models/check";
import axios from "axios";
import { UrlBuilder } from "./utils/url-builder";
import { PollResult } from "./models/poll-result";
import { EmailSender } from "./utils/send-email";
import { Notification } from "./utils/notification";

async function poll(check: CreateCheck) {
  const builder = new UrlBuilder();
  builder.setUrl(check.url).setPort(check.port).setPath(check.path);
  let pollResult: PollResult;
  try {
    const startTime = Date.now();
    await axios.get(builder.url, {
      timeout: check.timeout,
      headers: check.httpHeaders,
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;
    pollResult = new PollResult({
      date: new Date(),
      isAvailable: true,
      name: check.name,
      responseTime,
    });
  } catch (error) {
    pollResult = new PollResult({
      date: new Date(),
      isAvailable: false,
      name: check.name,
      responseTime: 0,
    });
    const notification = new Notification(new EmailSender());
    notification.sendNotification("", `Service ${check.name} is down`); // currently not working
  }
  pollResult.save();
}

export async function runChecks() {
  const checks = await Check.findAll({});
  for (const check of checks) {
    setInterval(async () => poll(check), check.interval);
  }
}
