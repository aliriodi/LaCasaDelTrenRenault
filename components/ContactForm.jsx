"use client"; // si usas App Router, esto asegura que es cliente
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [MAIL, setMail] = useState(null);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/sendemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_CONTACT_TO || form.email , // opcional: usa un .env público para el destino
          subject: `Nuevo mensaje de ${form.name}`,
          html: `
            <h2>Contacto desde La Casa del Tren Renault</h2>
            <p><b>Nombre:</b> ${form.name}</p>
            <p><b>Email:</b> ${form.email}</p>
            <p><b>Mensaje:</b> ${form.message}</p>
          `,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        
        setResult({ ok: true, msg: "✅ ¡Correo enviado con éxito!" });
      } else {
        setResult({ ok: false, msg: "❌ Error: " + data.error });
        
      }
    } catch (err) {
        
      setResult({ ok: false, msg: "❌ Error: " + err.message });
    } finally {
        
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">📩 Contáctanos</h2>

      <input
        type="text"
        name="name"
        placeholder="Tu nombre"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Tu email"
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2"
        required
      />

      <textarea
        name="message"
        placeholder="Tu requerimiento"
        value={form.message}
        onChange={handleChange}
        rows={4}
        className="w-full border rounded-md px-3 py-2"
        required
      />
       

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>

      {result && (
        <p
          className={`text-center mt-3 ${
            result.ok ? "text-green-600" : "text-red-600"
          }`}
        >
          {result.msg}
        </p>
      )}
    </form>
  );
}
