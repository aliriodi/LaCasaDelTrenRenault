"use client";
import { useState } from "react";
import { useCart } from "@/lib/useCart";

export default function CheckoutPage() {
  const { items, subtotal, total, updateQty, removeItem, clear } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    documentId: "",     // CI/RIF
    address: "",
    notes: "",
    paymentMethod: "ZELLE", // "ZELLE" | "PAGOMOVIL" | "EFECTIVO" | "TRANSFER" | "STRIPE"
    paymentRef: "",
  });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async () => {
    if (!form.email || !form.name || items.length === 0) {
      alert("Completa nombre, email y agrega productos al carrito.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          items,
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            documentId: form.documentId,
            address: form.address,
          },
          notes: form.notes,
          payment: { method: form.paymentMethod, reference: form.paymentRef },
          totals: { subtotal, shipping: 0, total },
          currency: "USD",
        }),
      });
      if (!res.ok) throw new Error("Error al crear la orden");
      const data = await res.json();
      setOk(`Orden creada: ${data.orderNumber || data._id}`);
      clear();
    } catch (e:any) {
      alert(e.message || "No se pudo crear la orden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Checkout</h1>

      {/* Items */}
      <div className="border rounded p-3 space-y-3">
        {items.length === 0 ? <p>Tu carrito está vacío.</p> :
          items.map((it) => (
            <div key={it.id + (it.variant || "")} className="flex items-center gap-3">
              {it.image && <img src={it.image} alt={it.name} className="w-16 h-16 object-cover rounded" />}
              <div className="flex-1">
                <div className="font-medium">{it.name} {it.variant ? `(${it.variant})` : ""}</div>
                <div className="text-sm opacity-70">${it.price.toFixed(2)} x</div>
              </div>
              <input
                type="number" min={1} value={it.qty}
                onChange={e => updateQty(it.id, parseInt(e.target.value || "1", 10), it.variant)}
                className="w-20 border rounded px-2 py-1"
              />
              <div className="w-24 text-right">${(it.price * it.qty).toFixed(2)}</div>
              <button onClick={() => removeItem(it.id, it.variant)} className="text-red-600">Eliminar</button>
            </div>
          ))
        }
        <div className="text-right font-semibold">Subtotal: ${subtotal.toFixed(2)}</div>
      </div>

      {/* Datos del cliente */}
      <div className="grid md:grid-cols-2 gap-3">
        <input name="name" placeholder="Nombre y Apellido" value={form.name} onChange={onChange} className="border rounded px-3 py-2" />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} className="border rounded px-3 py-2" />
        <input name="phone" placeholder="Teléfono" value={form.phone} onChange={onChange} className="border rounded px-3 py-2" />
        <input name="documentId" placeholder="CI/RIF" value={form.documentId} onChange={onChange} className="border rounded px-3 py-2" />
        <textarea name="address" placeholder="Dirección de entrega" value={form.address} onChange={onChange} className="border rounded px-3 py-2 md:col-span-2" />
        <textarea name="notes" placeholder="Notas adicionales" value={form.notes} onChange={onChange} className="border rounded px-3 py-2 md:col-span-2" />
      </div>

      {/* Pago */}
      <div className="grid md:grid-cols-3 gap-3">
        <select name="paymentMethod" value={form.paymentMethod} onChange={onChange} className="border rounded px-3 py-2">
          <option value="ZELLE">Zelle</option>
          <option value="PAGOMOVIL">Pago Móvil</option>
          <option value="EFECTIVO">Efectivo en tienda</option>
          <option value="TRANSFER">Transferencia bancaria</option>
          <option value="STRIPE">Tarjeta (Stripe)</option>
        </select>
        <input name="paymentRef" placeholder="Referencia/Últimos 4 dígitos" value={form.paymentRef} onChange={onChange} className="border rounded px-3 py-2 md:col-span-2" />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
        <button onClick={submit} disabled={loading || items.length === 0} className="px-4 py-2 rounded bg-black text-white">
          {loading ? "Procesando..." : "Confirmar pedido"}
        </button>
      </div>

      {ok && <div className="p-3 rounded bg-green-50 text-green-700">{ok}</div>}
    </div>
  );
}
