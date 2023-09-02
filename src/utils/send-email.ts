import nodemailer from "nodemailer";

export async function sendEmail(to: string) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "quinten.von@ethereal.email",
      pass: "xxUnMkpwk2azmfNemn",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "quinten.von@ethereal.email",
    to: to,
    subject: "Hello",
    text: "This is a test",
  });

  console.log("Message sent: %s", info.messageId);
}
