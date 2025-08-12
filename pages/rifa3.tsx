"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

// Rifa tipo "ruleta" con INVENTARIO por cantidades
// - Define cada premio una sola vez con su `qty`
// - Si desactivas "Permitir repeticiones", se descuenta del inventario hasta agotar
// - Si activas "Permitir repeticiones", NO descuenta, pero respeta la probabilidad según qty
// - Ubica este archivo en app/rifa/page.tsx y habilita Cloudinary en next.config.js

const INVENTORY_INIT = [
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754271709/La_casa_del_tren_RenaultSOMBRERO.webp", label: "Sombrero", qty: 2 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754271765/La_casa_del_tren_RenaultArepa.jpg", label: "Arepa", qty: 3 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754271786/La_casa_del_tren_RenaultBandera.jpg", label: "Bandera", qty: 10 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754271813/La_casa_del_tren_Renaulttostonxito.png", label: "Tostón", qty: 4 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754958299/La_casa_del_tren_RenaultBANDERAS1RIFA.jpg", label: "Banderas 1", qty: 1 },
];

type Item = { src: string; label?: string; qty: number };

export default function Rifa() {
  const [allowRepeats, setAllowRepeats] = useState(true);
  const [inventory, setInventory] = useState<Item[]>(INVENTORY_INIT);
  const [history, setHistory] = useState<string[]>([]);
  const [winner, setWinner] = useState<Item | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reel (pista con muchas cartas para simular el paso)
  // Usamos solo los ítems de base como visual del carrusel
  const [reel, setReel] = useState<Item[]>(INVENTORY_INIT);

  // Medidas para cálculo de desplazamiento
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);

  const [containerW, setContainerW] = useState(0);
  const [cardW, setCardW] = useState(0);
  const GAP = 12; // px (debe coincidir con gap-3)

  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerW(containerRef.current.clientWidth);
      if (firstCardRef.current) setCardW(firstCardRef.current.clientWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    // Pre-carga ligera de imágenes
    inventory.forEach((it) => {
      const i = new window.Image();
      i.src = it.src;
    });
  }, [inventory]);

  const totalUnits = inventory.reduce((s, it) => s + Math.max(0, it.qty), 0);
  const uniqueCount = inventory.length;

  const reset = () => {
    setInventory(INVENTORY_INIT);
    setHistory([]);
    setWinner(null);
    setError(null);
    setReel(INVENTORY_INIT);
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translate3d(0,0,0)`;
    }
  };

  // Selección ponderada por qty (solo considera qty > 0)
  const pickWeightedIndex = (arr: Item[]) => {
    const total = arr.reduce((s, it) => s + Math.max(0, it.qty), 0);
    if (total <= 0) return -1;
    let r = Math.floor(Math.random() * total) + 1; // 1..total
    for (let i = 0; i < arr.length; i++) {
      r -= Math.max(0, arr[i].qty);
      if (r <= 0) return i;
    }
    return -1;
  };

  const draw = () => {
    if (spinning) return;

    // Fuente de selección: inventario actual (respeta pesos). Si allowRepeats=false, descontamos al final.
    const idx = pickWeightedIndex(inventory);
    if (idx === -1) {
      setError("Inventario agotado. Reinicia o ajusta cantidades.");
      return;
    }

    const choice = inventory[idx];
    setError(null);

    // Base visual: solo válidos si NO hay repeticiones
    const baseRaw = allowRepeats ? inventory : inventory.filter((it) => it.qty > 0);
    const base = (baseRaw.length ? baseRaw : inventory).map(({ src, label }) => ({ src, label, qty: 1 }));

    const rounds = 7; // ajusta para duración
    const longReel: Item[] = [];
    for (let r = 0; r < rounds; r++) longReel.push(...base);

    // Colocar el ganador en el REEL, pero con "cola" a la derecha para que no quede vacío
    const tailCount = Math.min(5, Math.max(1, base.length - 1));
    const winnerBaseIdx = base.findIndex((b) => b.src === choice.src);

    // Pre-head opcional para variar (evita que ganador quede justo al final del loop)
    const baseLen = base.length || 1;
    const preHead = Math.min(3, baseLen);
    longReel.push(...base.slice(0, preHead));

    // Índice del ganador dentro del reel largo
    const winnerIndex = longReel.length;
    longReel.push({ src: choice.src, label: choice.label, qty: 1 });

    // Construir cola de "otras opciones válidas" a la derecha del ganador
    const tail: Item[] = [];
    for (let j = 1; j <= tailCount; j++) {
      const idxInBase = baseLen > 1 && winnerBaseIdx !== -1 ? (winnerBaseIdx + j) % baseLen : 0;
      const candidate = base[idxInBase];
      tail.push({ src: candidate.src, label: candidate.label, qty: 1 });
    }
    longReel.push(...tail);

    setReel(longReel);
    setSpinning(true);
    setWinner(null);

    requestAnimationFrame(() => {
      if (!trackRef.current) return;
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translate3d(0,0,0)`;
      // @ts-ignore
      void trackRef.current.offsetHeight;

      const effectiveCardSpan = cardW + GAP; // ancho de carta + gap
      const centerOffset = Math.max(0, (containerW - cardW) / 2);
      const targetPx = Math.max(0, winnerIndex * effectiveCardSpan - centerOffset);

      const durationMs = 3600; // 3.6s
      trackRef.current.style.transition = `transform ${durationMs}ms cubic-bezier(0.12, 0.8, 0.08, 1)`;
      trackRef.current.style.transform = `translate3d(-${targetPx}px, 0, 0)`;

      const onEnd = () => {
        setSpinning(false);
        setWinner(choice);
        setHistory((h) => [choice.src, ...h]);
        if (!allowRepeats) {
          // Descontar 1 unidad del premio
          setInventory((inv) => inv.map((it, i) => (i === idx ? { ...it, qty: Math.max(0, it.qty - 1) } : it)));
        }
        trackRef.current?.removeEventListener("transitionend", onEnd);
      };
      trackRef.current.addEventListener("transitionend", onEnd);
    });
  };

  const remainingLabel = allowRepeats
    ? `Premios posibles (únicos): ${uniqueCount} | Probabilidades ponderadas por qty`
    : `Unidades restantes en inventario: ${totalUnits}`;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-3 gap-6 items-start">
        {/* Panel principal (ocupa 2 columnas en desktop) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-yellow-600">🎯 Rifa Venezolana</h1>
              <p className="text-sm text-gray-500">{remainingLabel}</p>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                className="toggle toggle-sm"
                checked={allowRepeats}
                onChange={(e) => setAllowRepeats(e.target.checked)}
              />
              Permitir repeticiones (no descuenta)
            </label>
          </div>

          {/* Ventana de la ruleta */}
          <div ref={containerRef} className="mt-5 relative overflow-hidden rounded-xl border bg-gray-50">
            {/* Indicador centrado */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-yellow-500/80" />

            {/* Pista */}
            <div ref={trackRef} className="flex items-center gap-3 p-4 will-change-transform">
              {reel.map((it, i) => (
                <div
                  key={`${it.src}-${i}`}
                  ref={i === 0 ? firstCardRef : undefined}
                  className="relative w-[clamp(140px,45vw,220px)] aspect-[3/4] shrink-0 rounded-xl overflow-hidden bg-white shadow"
                >
                  <Image src={it.src} alt={`card-${i}`} fill sizes="(max-width: 768px) 45vw, 220px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

          <div className="mt-5 flex gap-3">
            <button
              onClick={draw}
              disabled={spinning || (!allowRepeats && totalUnits === 0)}
              className="px-5 py-3 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50"
            >
              {spinning ? "Girando…" : "¡Sacar!"}
            </button>
            <button
              onClick={reset}
              disabled={spinning}
              className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              Reiniciar
            </button>
          </div>

          {winner && (
            <div className="mt-4 text-center">
              <div className="text-sm text-neutral-500">Resultado</div>
              <div className="text-lg font-semibold">{winner.label ?? "Premio"}</div>
            </div>
          )}
        </div>

        {/* Inventario / Historial */}
        <div className="bg-white rounded-2xl shadow p-5 space-y-5">
          <div>
            <h2 className="font-semibold mb-2">Inventario</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inventory.map((it, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg border">
                  <div className="relative w-12 h-16 rounded overflow-hidden bg-gray-100">
                    <Image src={it.src} alt={it.label ?? `inv-${i}`} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{it.label ?? "Premio"}</div>
                    <div className="text-xs text-gray-500">Qty: {it.qty}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold">Historial</h2>
            {history.length === 0 ? (
              <p className="text-sm text-gray-500 mt-2">Aún no has sorteado ninguna imagen.</p>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {history.map((src, i) => (
                  <div key={i} className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border">
                    <Image src={src} alt={`hist-${i}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Estilos para el toggle */}
      <style jsx>{`
        input[type="checkbox"].toggle { appearance: none; width: 38px; height: 22px; background: #e5e7eb; border-radius: 999px; position: relative; transition: background .2s; }
        input[type="checkbox"].toggle:checked { background: #f59e0b; }
        input[type="checkbox"].toggle::after { content: ""; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; background: #fff; border-radius: 999px; transition: transform .2s; box-shadow: 0 1px 2px rgba(0,0,0,.2); }
        input[type="checkbox"].toggle:checked::after { transform: translateX(16px); }
      `}</style>
    </div>
  );
}

/*
NOTA next.config.js:

module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
};
*/
