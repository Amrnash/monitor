export interface Sender {
  send(to: string, message: string): Promise<any>;
}

export class Notification {
  constructor(private sender: Sender) {}

  async sendNotification(to: string, message: string) {
    this.sender.send(to, message);
  }
}
