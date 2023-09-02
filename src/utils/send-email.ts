import nodemailer from "nodemailer";
import { Sender } from "./notification";
export class EmailSender implements Sender {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      auth: {
        user: "postmaster@sandbox80c5093e490144dabd5f5c7d6043e8d9.mailgun.org",
        pass: "b4f97900ad3808145b415a545fc55840-451410ff-28b6d86c",
      },
    });
  }
  async send(to: string, message: string): Promise<void> {
    return await this.transporter.sendMail({
      from: "postmaster@sandbox80c5093e490144dabd5f5c7d6043e8d9.mailgun.org",
      to,
      subject: "Hello",
      text: message,
    });
  }
}
