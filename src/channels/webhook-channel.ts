import axios from "axios";
import { NotificationChannel } from "./notification";

export class WebhookChannel implements NotificationChannel {
  constructor(private url: string, private message: string) {}
  async send() {
    return await axios.post(this.url, { message: this.message });
  }
}
