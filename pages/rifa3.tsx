"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

// Rifa tipo "ruleta" con:
// - Inventario por cantidades (probabilidad ponderada por qty)
// - Previsualización: cartas antes y después del ganador
// - Fades en bordes
// - Highlight verde (glow) en la carta GANADORA
// - Indicadores con flechas arriba/abajo en el centro

const INVENTORY_INIT = [
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755542247/La_casa_del_tren_Renaultpulsera1.jpg", label: "Pulsera tipo 1 venezolana", qty: 21 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755442450/La_casa_del_tren_Renaulttest3.jpg", label: "Intente 1 Vez mas", qty: 10 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755542300/La_casa_del_tren_Renaultpulsera2.jpg", label: "Pulsera tipo 2 venezolana", qty: 16 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755441892/La_casa_del_tren_Renaulttest2.jpg", label: "Gracias por pariticipar", qty: 16 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755543478/La_casa_del_tren_RenaultllaveCG2.jpg", label: "Llavero Crear Good", qty: 1 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1756156753/Shiva_Camiones_LlaveroTipo3.jpg", label: "Llavero Crear Good", qty: 3 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755542365/La_casa_del_tren_Renaultpulsera3LLAVERO.jpg", label: "Pulsera Llavero venezolana", qty: 5 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755543496/La_casa_del_tren_RenaultllaveCG3.jpg", label: "Llavero Crear Good", qty: 1 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755732761/La_casa_del_tren_Renaultmalta.jpg", label: "Malta", qty: 6 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755732874/La_casa_del_tren_Renault-Palitos.jpg", label: "Palitos", qty: 3 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755733120/La_casa_del_tren_Renault-Pirulin.jpg", label: "Mini Pirulin", qty: 3 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755733184/La_casa_del_tren_Renault-Toronto.jpg", label: "Toronto", qty: 3 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755543365/La_casa_del_tren_RenaultllaveCG1.jpg", label: "Llavero Crear Good", qty: 1 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755733425/La_casa_del_tren_Renault-Tostonxitos.jpg", label: "Tostonxito", qty: 3 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755733634/La_casa_del_tren_Renault-Uva.jpg", label: "Uva", qty: 4 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755733590/La_casa_del_tren_Renault-Rekolita.jpg", label: "Rekolita", qty: 6 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755733726/La_casa_del_tren_Renault-Dani.jpg", label: "Galletas Dani", qty: 32 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755733890/La_casa_del_tren_Renault-BonBonBun.jpg", label: "Chupetas Bon Bon Bun", qty: 24 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755733948/La_casa_del_tren_Renault-Cocosete.jpg", label: "Cocosete", qty: 3 },
  { src: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755733975/La_casa_del_tren_Renault-Susy.jpg", label: "Susy", qty: 1 },

];

type Item = { src: string; label?: string; qty: number };

export default function Rifa() {
  const [allowRepeats, setAllowRepeats] = useState(false);
  const [inventory, setInventory] = useState<Item[]>(INVENTORY_INIT);
  const [history, setHistory] = useState<string[]>([]);
  const [winner, setWinner] = useState<Item | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reel visual
  const [reel, setReel] = useState<Item[]>(INVENTORY_INIT);
  const [winnerReelIndex, setWinnerReelIndex] = useState<number | null>(null);

  // Medidas
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);

  const [containerW, setContainerW] = useState(0);
  const [cardW, setCardW] = useState(0);
  const GAP = 12; // px (gap-3)

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
    // Pre-carga
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
    setWinnerReelIndex(null);
    setError(null);
    setReel(INVENTORY_INIT);
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translate3d(0,0,0)`;
    }
  };

  // Selección ponderada por qty (solo qty>0)
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
    setWinner(null);
    if (spinning) return;
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

    const rounds = 6; // vueltas previas
    const longReel: Item[] = [];
    for (let r = 0; r < rounds; r++) longReel.push(...base);

    // Visibilidad antes/después
    const baseLen = Math.max(1, base.length);
    const winnerBaseIdx = base.findIndex((b) => b.src === choice.src);

    const effectiveCardSpan = (cardW || 180) + GAP;
    const approxVisible = Math.max(2, Math.floor(containerW / effectiveCardSpan));
    const leftCount = Math.min(3, Math.max(1, Math.floor((approxVisible - 1) / 2))); // antes del ganador
    const rightCount = Math.min(5, Math.max(1, approxVisible)); // después del ganador

    // Pre-head (cartas antes del ganador)
    for (let j = leftCount; j >= 1; j--) {
      const idxInBase = baseLen > 1 && winnerBaseIdx !== -1 ? (winnerBaseIdx - j + baseLen) % baseLen : 0;
      const candidate = base[idxInBase];
      longReel.push({ src: candidate.src, label: candidate.label, qty: 1 });
    }

    // Índice del ganador dentro del reel largo
    const winnerIndex = longReel.length;
    longReel.push({ src: choice.src, label: choice.label, qty: 1 });

    // Cola (cartas después del ganador)
    for (let j = 1; j <= rightCount; j++) {
      const idxInBase = baseLen > 1 && winnerBaseIdx !== -1 ? (winnerBaseIdx + j) % baseLen : 0;
      const candidate = base[idxInBase];
      longReel.push({ src: candidate.src, label: candidate.label, qty: 1 });
    }

    setReel(longReel);
    setSpinning(true);
    setWinner(null);
    setWinnerReelIndex(winnerIndex);

    requestAnimationFrame(() => {
      if (!trackRef.current) return;
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translate3d(0,0,0)`;
      // @ts-ignore
      void trackRef.current.offsetHeight;

      const centerOffset = Math.max(0, (containerW - (cardW || 180)) / 2);
      const targetPx = Math.max(0, winnerIndex * effectiveCardSpan - centerOffset);

      const durationMs = 3800;
      trackRef.current.style.transition = `transform ${durationMs}ms cubic-bezier(0.12, 0.8, 0.08, 1)`;
      trackRef.current.style.transform = `translate3d(-${targetPx}px, 0, 0)`;

      const onEnd = () => {
        setSpinning(false);
        setWinner(choice);
        setHistory((h) => [choice.src, ...h]);
        if (!allowRepeats) {
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
          <div className="flex items-start justify-between gap-4">
            
            {CreditsBar()}
            
            <div>

              <h1 className="text-2xl font-bold text-yellow-600">🎯 Rifa Venezolana</h1>
              <p className="text-sm text-gray-500">{remainingLabel}</p>
            </div>
            {/* <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                className="toggle toggle-sm"
                checked={allowRepeats}
                onChange={(e) => setAllowRepeats(e.target.checked)}
              />
              Permitir repeticiones (no descuenta)
            </label> */}
          </div>

          {/* Ventana de la ruleta */}
          <div ref={containerRef} className="mt-5 relative overflow-hidden rounded-xl border bg-gray-50">
            {/* Indicador centrado (línea + flechas arriba/abajo) */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-red-500" />
            {/* Flecha superior (apunta hacia abajo) */}
            <div className="pointer-events-none absolute bottom-1  left-1/2 -translate-x-1/2">
              <div
                className="w-0 h-0"
                style={{
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  //borderBottom: "14px solid  rgba(220,38,38,0.9)",
                  borderBottom: "14px solid #0F00FF",
                  filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.25))",
                }}
              />
            </div>
            {/* Flecha inferior (apunta hacia arriba) */}
            <div className="pointer-events-none absolute top-1 left-1/2 -translate-x-1/2">
              <div
                className="w-0 h-0"
                style={{
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  //borderTop: "14px solid rgba(220,38,38,0.9)",
                  borderTop: "14px solid #0F00FF",
                  filter: "drop-shadow(0 -2px 2px rgba(0,0,0,0.25))",
                }}
              />
            </div>

            {/* Fades de los bordes */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white-500 to-transparent" />



            {/* Pista */}
            <div ref={trackRef} className="flex items-center gap-3 p-4 will-change-transform">
              {reel.map((it, i) => {
                const isWinnerCard = winnerReelIndex !== null && i === winnerReelIndex && !spinning;
                return (
                  <div
                    key={`${it.src}-${i}`}
                    ref={i === 0 ? firstCardRef : undefined}
                    className={`relative w-[clamp(140px,45vw,220px)] aspect-[3/4] shrink-0 rounded-xl bg-white overflow-hidden  shadow transition-transform ${isWinnerCard ? 'scale-100 z-20' : 'scale-90'}`}
                  >
                    {/* Glow verde detrás de la imagen cuando es ganador */}
                    {isWinnerCard && (
                      <div className="absolute inset-10 rounded-xl " style={{
                        boxShadow: "0 0 0 4px rgba(16,185,129,0.45), 0 0 300px 100px rgba(16,185,129,0.35)",
                        background: "radial-gradient(ellipse at center, rgba(16,185,129,0.18), transparent 10%)",
                        zIndex: 1,
                      }} />
                    )}
                    <Image src={it.src} alt={`card-${i}`} fill sizes="(max-width: 768px) 45vw, 2020px" className="object-cover  relative z-10" />
                  </div>
                );
              })}
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

function CreditsBar() {
  return (
    // <div className="fixed top-0  left-0 w-full bg-zinc-900/95 text-white text-sm py-2 px-4 flex items-center justify-center gap-2 shadow-lg z-50">
    <div className="fixed top-0 left-0 w-full text-white text-sm py-2 px-4 flex items-center justify-center gap-2 shadow-lg z-50 
bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600">
    
      <span>Creado por</span>
      <div className="relative w-[110px] h-auto">
        {/* <Image
          src="/arquicom-aj.png"   // pon el logo en /public
          alt="Arquicom AJ"
          fill
          className="object-contain"
          sizes="110px"
        /> */}
        <span className="text-lg"><strong>
          @Arquicom_AJ
        </strong></span>
      </div>
      <span className="mx-2 opacity-60">•</span>
      <span>Patrocinado por</span>
      <div className="relative w-[120px] h-auto">
        {/* <Image
          src="/creargood.png"     // pon el logo en /public
          alt="Creargood"
          fill
          className="object-contain"
          sizes="120px"
        /> */}
        <span className="text-lg"><strong>
          @Crear_Good
        </strong></span>
      </div>
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
