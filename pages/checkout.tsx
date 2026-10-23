// "use client";
// import { useEffect, useState } from "react";
// import Layout1 from "@/components/Layout1";
// import { useCart } from "@/components/context/CartContext"; // usa SIEMPRE el mismo hook

// export default function CheckoutPage() {
//   1) TODOS los hooks SIEMPRE al tope y sin condicionales
//   const { items, subtotal, updateQty, removeItem, clear } = useCart();
//   const total = subtotal;

//   const [mounted, setMounted] = useState(false);
//   const [form, setForm] = useState({
//     name: "", email: "", phone: "", documentId: "", address: "",
//     notes: "", paymentMethod: "ZELLE", paymentRef: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [ok, setOk] = useState("");

//   useEffect(() => { setMounted(true); }, []);

//   2) El return condicional puede ir AHORA, porque ya declaraste los hooks
//   if (!mounted) return null;

//   const onChange = (e: any) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
//   function EvalItems() {
//     if(Array.isArray(items)){return items}
//     else {return [] }
//   }

//   const submit = async () => {
   
//     if (!form.email || !form.name || EvalItems().length === 0) {
//       alert("Completa nombre, email y agrega productos al carrito.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({
//           items,
//           customer: { name: form.name, email: form.email, phone: form.phone, documentId: form.documentId, address: form.address },
//           notes: form.notes,
//           payment: { method: form.paymentMethod, reference: form.paymentRef },
//           totals: { subtotal, shipping: 0, total },
//           currency: "USD",
//         }),
//       });
//       if (!res.ok) throw new Error("Error al crear la orden");
//       const data = await res.json();
//       setOk(`Orden creada: ${data.orderNumber || data._id}`);
//       clear();
//     } catch (e: any) {
//       alert(e.message || "No se pudo crear la orden");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout1>
//       {/* ... tu JSX igual ... */}
//       <div className="max-w-4xl mx-auto p-4 space-y-6">
//         <h1 className="text-2xl font-semibold">Checkout</h1>

//         {/* Items */}
//         <div className="border rounded p-3 space-y-3">
//           {EvalItems().length === 0 ? (
//             <p>Tu carrito está vacío.</p>
//           ) : (
//             EvalItems().map((it) => (
//               <div key={it.id + (it.variant || "")} className="flex items-center gap-3">
//                 {it.image && <img src={it.image} alt={it.name} className="w-16 h-16 object-cover rounded" />}
//                 <div className="flex-1">
//                   <div className="font-medium">
//                     {it.name} {it.variant ? `(${it.variant})` : ""}
//                   </div>
//                   <div className="text-sm opacity-70">${Number(it.price).toFixed(2)} x</div>
//                 </div>
//                 <input
//                   type="number"
//                   min={1}
//                   value={it.qty}
//                   onChange={e => {
//                     const v = parseInt(e.target.value || "1", 10);
//                     Si tienes stock máximo en el item (maxStock), clampa:
//                     const max = Number.isFinite(it.maxStock) ? Math.max(1, Number(it.maxStock)) : undefined;
//                     const next = Math.max(1, max ? Math.min(v, max) : v);
//                     updateQty(it.id, next, it.variant);
//                   }}
//                   className="w-20 border rounded px-2 py-1"
//                 />
//                 <div className="w-24 text-right">${(Number(it.price) * Number(it.qty)).toFixed(2)}</div>
//                 <button onClick={() => removeItem(it.id, it.variant)} className="text-red-600">Eliminar</button>
//               </div>
//             ))
//           )}
//           <div className="text-right font-semibold">Subtotal: ${subtotal.toFixed(2)}</div>
//         </div>

//         {/* Datos del cliente */}
//         <div className="grid md:grid-cols-2 gap-3">
//           <input name="name" placeholder="Nombre y Apellido" value={form.name} onChange={onChange} className="border rounded px-3 py-2" />
//           <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} className="border rounded px-3 py-2" />
//           <input name="phone" placeholder="Teléfono" value={form.phone} onChange={onChange} className="border rounded px-3 py-2" />
//           <input name="documentId" placeholder="CI/RIF" value={form.documentId} onChange={onChange} className="border rounded px-3 py-2" />
//           <textarea name="address" placeholder="Dirección de entrega" value={form.address} onChange={onChange} className="border rounded px-3 py-2 md:col-span-2" />
//           <textarea name="notes" placeholder="Notas adicionales" value={form.notes} onChange={onChange} className="border rounded px-3 py-2 md:col-span-2" />
//         </div>

//         {/* Pago */}
//         <div className="grid md:grid-cols-3 gap-3">
//           <select name="paymentMethod" value={form.paymentMethod} onChange={onChange} className="border rounded px-3 py-2">
//             <option value="ZELLE">Zelle</option>
//             <option value="PAGOMOVIL">Pago Móvil</option>
//             <option value="EFECTIVO">Efectivo en tienda</option>
//             <option value="TRANSFER">Transferencia bancaria</option>
//             <option value="STRIPE">Tarjeta (Stripe)</option>
//           </select>
//           <input name="paymentRef" placeholder="Referencia/Últimos 4 dígitos" value={form.paymentRef} onChange={onChange} className="border rounded px-3 py-2 md:col-span-2" />
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
//           <button onClick={submit} disabled={loading || items.length === 0} className="px-4 py-2 rounded bg-black text-white">
//             {loading ? "Procesando..." : "Confirmar pedido"}
//           </button>
//         </div>

//         {ok && <div className="p-3 rounded bg-green-50 text-green-700">{ok}</div>}
//       </div>
//     </Layout1>
//   );
// }
// pages/cart.jsx
import Link from "next/link";
import Layout1 from "@/components/Layout1";

export default function CartPage() {
 
  return (
    <Layout1>
     
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Tu carrito</h1>
          <button
           
            className="text-red-600 hover:underline"
            type="button"
          >
            Vaciar carrito
          </button>
        </div>

      

        {/* Resumen */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <Link href="/products/Renault" className="text-gray-700 hover:underline">← Seguir comprando</Link>
          <div className="w-full md:w-auto">
            <div className="flex items-center justify-between">
              <div className="text-lg">Subtotal</div>
            
            {/* Si luego agregas envío/impuestos, calcúlalos aquí */}
            <div className="mt-3 flex justify-end">
              <Link
                href="/checkout"
                className="px-5 py-2 rounded bg-black text-white hover:opacity-90"
              >
                Ir al checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout1>
  );
}
