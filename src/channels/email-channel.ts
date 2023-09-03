import nodemailer from "nodemailer";
import { NotificationChannel } from "./notification";

export class EmailChannel implements NotificationChannel {
  private transporter: nodemailer.Transporter;
  constructor(public to: string, public message: string) {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async send(): Promise<void> {
    return await this.transporter.sendMail({
      from: "postmaster@sandbox80c5093e490144dabd5f5c7d6043e8d9.mailgun.org",
      to: this.to,
      subject: "Hello",
      text: this.message,
    });
  }
}
