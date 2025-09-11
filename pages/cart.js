// pages/cart.jsx
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Layout1 from "@/components/Layout1";
import { useCart } from "@/components/context/CartContext";

export default function CartPage() {
  const { items, updateQty, removeItem, clear, subtotal } = useCart();
  const [stockMap, setStockMap] = useState({}); // opcional: stock fresco desde API

  // (Opcional) Refrescar stock desde tu backend
  useEffect(() => {
    if (!items?.length) return;
    const ids = [...new Set(items.map(i => i.id))].join(",");
    // Implementa esta ruta si quieres stock en vivo
    fetch(`/api/products/stock?ids=${encodeURIComponent(ids)}`)
      .then(r => (r.ok ? r.json() : Promise.reject(null)))
      .then(json => setStockMap(json?.stock || {}))
      .catch(() => {});
  }, [items]);

  const getMaxFor = (it) => {
    // Prioridad: stock de API -> maxStock del item -> infinito
    const fromApi = Number(stockMap[it.id]);
    if (Number.isFinite(fromApi)) return fromApi;
    const fromItem = Number(it.maxStock);
    if (Number.isFinite(fromItem)) return fromItem;
    return Infinity;
  };

  const lineTotal = (it) => (Number(it.price || 0) * Number(it.qty || 0));
  const total = useMemo(() => items.reduce((s, it) => s + lineTotal(it), 0), [items]);

  if (!items || items.length === 0) {
    return (
      <Layout1>
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">Tu carrito</h1>
          <div className="p-6 rounded border text-gray-600">
            Tu carrito está vacío.
          </div>
          <div className="mt-4">
            <Link href="/products/Renault" className="px-4 py-2 rounded bg-black text-white">Seguir comprando</Link>
          </div>
        </div>
      </Layout1>
    );
  }

  return (
    <Layout1>
      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Tu carrito</h1>
          <button
            onClick={clear}
            className="text-red-600 hover:underline"
            type="button"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="border rounded-lg divide-y">
          {items.map((it, idx) => {
            const max = getMaxFor(it);
            const clamped = Math.max(1, Math.min(Number(it.qty || 1), max));
            // Si por alguna razón superó el stock, lo bajamos visualmente
            const showStockWarn = Number(it.qty) > max && Number.isFinite(max);

            return (
              <div key={it.id + (it.variant || "") + idx} className="p-4 flex gap-4 items-start">
                {/* Imagen */}
                <div className="w-20 h-20 bg-gray-50 border rounded overflow-hidden flex items-center justify-center">
                  {it.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.image} alt={it.name} className="object-contain w-full h-full" />
                  ) : (
                    <span className="text-xs text-gray-500">Sin imagen</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{it.name}</div>
                  {it.variant && (
                    <div className="text-sm text-gray-500">Variante: {it.variant}</div>
                  )}

                  <div className="mt-2 flex items-center gap-3">
                    <div className="text-sm text-gray-600">
                      Precio unitario: <b>${Number(it.price || 0).toFixed(2)}</b>
                    </div>

                    {/* Cantidad */}
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Cant.</label>
                      <input
                        type="number"
                        min={1}
                        max={Number.isFinite(max) ? Math.max(1, max) : undefined}
                        value={clamped}
                        onChange={(e) => {
                          const raw = Number(e.target.value || 1);
                          const nextQty = Math.max(1, Number.isFinite(max) ? Math.min(raw, max) : raw);
                          updateQty(it.id, nextQty, it.variant);
                        }}
                        className="w-20 border rounded px-2 py-1"
                      />
                      {Number.isFinite(max) && (
                        <span className="text-xs text-gray-500">Stock: {max}</span>
                      )}
                    </div>
                  </div>

                  {showStockWarn && (
                    <div className="mt-2 text-xs text-amber-700 bg-amber-50 inline-block px-2 py-1 rounded">
                      Supera el stock disponible. Ajusta la cantidad.
                    </div>
                  )}
                </div>

                {/* Acciones / Totales */}
                <div className="text-right min-w-[140px]">
                  <div className="font-semibold">${lineTotal({ ...it, qty: clamped }).toFixed(2)}</div>
                  <button
                    onClick={() => removeItem(it.id, it.variant)}
                    className="mt-2 text-sm text-red-600 hover:underline"
                    type="button"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumen */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <Link href="/products/Renault" className="text-gray-700 hover:underline">← Seguir comprando</Link>
          <div className="w-full md:w-auto">
            <div className="flex items-center justify-between">
              <div className="text-lg">Subtotal</div>
              <div className="text-xl font-bold">${subtotal.toFixed(2)}</div>
            </div>
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
