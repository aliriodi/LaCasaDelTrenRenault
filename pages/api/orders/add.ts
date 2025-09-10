export const runtime = "nodejs";

import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
// (opcional) import { sendOrderEmails } from "@/lib/email";

function isEmail(x: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validaciones mínimas (suma servidor)
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return new Response("Carrito vacío", { status: 400 });
    }
    if (!body?.customer?.email || !isEmail(body.customer.email)) {
      return new Response("Email inválido", { status: 400 });
    }

    // Calcular totales en servidor (no confiar 100% en cliente)
    const subtotal = body.items.reduce((s: number, i: any) => s + (Number(i.price) || 0) * (Number(i.qty) || 0), 0);
    const shipping = Number(body?.totals?.shipping || 0);
    const total = subtotal + shipping;

    await dbConnect();

    // (opcional) generar número de orden simple
    const orderNumber = "R-" + Date.now().toString(36).toUpperCase();

    const order = await Order.create({
      orderNumber,
      items: body.items.map((i: any) => ({
        id: String(i.id),
        name: String(i.name || ""),
        price: Number(i.price || 0),
        qty: Number(i.qty || 0),
        image: i.image || "",
        variant: i.variant || "",
      })),
      currency: body.currency || "USD",
      totals: { subtotal, shipping, total },
      customer: {
        name: body.customer.name || "",
        email: body.customer.email,
        phone: body.customer.phone || "",
        documentId: body.customer.documentId || "",
        address: body.customer.address || "",
      },
      payment: {
        method: body?.payment?.method || "ZELLE",
        reference: body?.payment?.reference || "",
        status: "pending",
      },
      notes: body?.notes || "",
      status: "new",
    });

    // (opcional) correo de confirmación:
    // await sendOrderEmails(order);

    return new Response(JSON.stringify({ _id: order._id, orderNumber }), { status: 200 });
  } catch (err: any) {
    console.error("Order POST error:", err);
    return new Response("Error al crear la orden", { status: 500 });
  }
}
