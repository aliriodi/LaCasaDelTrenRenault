import nodemailer from "nodemailer";
import { google } from "googleapis";

//const nodemailer = require("nodemailer");
//const { google } = require("googleapis");

export async function getGmailTransporter() {
  const { GMAIL_USER, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;

  console.log("GMAIL_USER:", GMAIL_USER);
  console.log("CLIENT_ID ends with:", (GOOGLE_CLIENT_ID || "").slice(-8));
  console.log("Has REFRESH_TOKEN:", !!GOOGLE_REFRESH_TOKEN);

  const oAuth2 = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
  oAuth2.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
  const accessToken = await oAuth2.getAccessToken();
  console.log("Access token len:", accessToken?.token?.length || 0);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: GMAIL_USER,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken?.token || "",
    },
    logger: true,
    debug: true,
  });

  try {
    await transporter.verify();
    console.log("✅ verify OK");
  } catch (e) {
    console.error("❌ verify ERROR:", e);
    process.exit(1);
  }

  try {
    const info = await transporter.sendMail({
      from: `"La Casa del Tren Renault" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: "Test OAuth2",
      text: "Hola! Probando OAuth2 con Gmail.",
    });
    console.log("📨 Enviado:", info.messageId);
  } catch (e) {
    console.error("❌ sendMail ERROR:", e);
  }
}

getGmailTransporter().catch(console.error);
