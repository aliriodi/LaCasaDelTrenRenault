import nodemailer from "nodemailer";
import { google } from "googleapis";

export async function getGmailTransporter() {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  ); 
  oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

  const accessToken = await oAuth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,   // MISMA cuenta que autorizaste
      clientId: process.env.GOOGLE_CLIENT_ID,
      pass: process.env.MAIL_PASSWD,            
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken?.token || "",
    },
  });
}
