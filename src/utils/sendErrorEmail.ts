// src/utils/sendErrorEmail.ts
import nodemailer from 'nodemailer';

export const sendErrorEmail = async (subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS_OR_APP_PASSWORD
    },
  });

  const recipients = process.env.ALERT_RECIPIENTS || process.env.EMAIL_USER;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: recipients,
    subject,
    text
  });
};
