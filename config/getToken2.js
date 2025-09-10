// config/getToken.js
import http from "http";
import open from "open";
import { google } from "googleapis";
import "dotenv/config";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("Faltan GOOGLE_CLIENT_ID o GOOGLE_CLIENT_SECRET en .env");
  process.exit(1);
}

const PORT = 5555;
const redirectUri = `http://localhost:${PORT}/oauth2callback`;

// 👈 IMPORTANTE: scope completo para SMTP XOAUTH2
const SCOPES = ["https://mail.google.com/"];

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/oauth2callback")) {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const code = url.searchParams.get("code");
    res.end("¡Listo! Volvé a la consola. Podés cerrar esta pestaña.");
    server.close();
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      console.log("\n✅ Tokens obtenidos");
      console.log("Access Token:", tokens.access_token);
      console.log("Refresh Token:", tokens.refresh_token); // <- guarda este en .env
      console.log("Scope:", tokens.scope);
      console.log("Expiry (ms):", tokens.expiry_date);
      if (!tokens.refresh_token) {
        console.warn("⚠️ Google no devolvió refresh_token. Revocá accesos previos y repetí con prompt=consent.");
      }
      process.exit(0);
    } catch (err) {
      console.error("❌ Error al intercambiar el code:", err?.response?.data || err);
      process.exit(1);
    }
  } else {
    res.end("Esperando autorización de Google…");
  }
});

server.listen(PORT, async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline", // pide refresh_token
    prompt: "consent",      // fuerza a Google a dar refresh_token
    scope: SCOPES,
  });
  console.log("Abriendo navegador…\n", authUrl, "\n");
  await open(authUrl);
});
