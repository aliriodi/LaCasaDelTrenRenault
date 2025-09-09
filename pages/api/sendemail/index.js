import { getGmailTransporter } from "@/config/transporter";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  try {
    const { to, subject, html } = req.body;

    const transporter = await getGmailTransporter();
    const info = await transporter.sendMail({
      from: `"La Casa del Tren Renault" <${process.env.GMAIL_USER}>`,
      to: to || process.env.GMAIL_USER,
      subject: subject || "🚗 Test de correo",
      html: html || "<h1>Funciona el transporter 🚀</h1><p>Correo de prueba</p>",
    });

    return res.status(200).json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
