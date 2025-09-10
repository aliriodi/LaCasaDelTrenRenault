import nodemailer from "nodemailer";
import { google } from "googleapis";
//import type { OrderDoc } from "@/models/Order";

export async function getGmailTransporter() {
  const oAuth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oAuth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  const accessToken = await oAuth2.getAccessToken();

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // STARTTLS
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: (typeof accessToken === "string" ? accessToken : accessToken?.token) || "",
    },
  });
}

export async function sendOrderEmails(order) {
  const t = await getGmailTransporter();
  const toAdmins = (process.env.CONTACT_TO || process.env.GMAIL_USER || "").split(/[;,]/).map(s => s.trim()).filter(Boolean);

  const subject = `Nueva Orden ${order.orderNumber}`;
  const plain = `Orden ${order.orderNumber}\nCliente: ${order?.customer?.name} - ${order?.customer?.email}\nTotal: ${order?.totals?.total} ${order.currency}`;
  const html = `<h2>Orden ${order.orderNumber}</h2>
  <p><b>Cliente:</b> ${order?.customer?.name} - ${order?.customer?.email} - ${order?.customer?.phone}</p>
  <p><b>Total:</b> ${order?.totals?.total} ${order.currency}</p>`;

  // a Admin
  await t.sendMail({ from: `"La Casa del Tren Renault" <${process.env.GMAIL_USER}>`, to: toAdmins, subject, text: plain, html });
  // a Cliente
  await t.sendMail({ from: `"La Casa del Tren Renault" <${process.env.GMAIL_USER}>`, to: order?.customer?.email, subject: `Confirmación ${order.orderNumber}`, text: plain, html });
}
