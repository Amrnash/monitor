export interface NotificationChannel {
  send(): Promise<any>;
}

export class NotificationManager {
  constructor(private channels: NotificationChannel[]) {}

  async sendNotification() {
    for (const channel of this.channels) {
      channel.send();
    }
  }
}
