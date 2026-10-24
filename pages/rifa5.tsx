"use client";
import { useEffect, useRef, useState } from "react";

// Sustituye estos EJEMPLOS por tus boletos. Conserva numero como texto.
// true = vendido y habilitado; false = no participa.
// Puedes agregar teléfono, comprador u otros campos.
const imagen = "https://res.cloudinary.com/dvy9qircy/image/upload/v1792797066/forex/forex_academy_professional_logoAGUILAS.jpg"
// const BOLETOS_INICIALES = [
//   { numero: "007", juega: true, nombre: "Participante de ejemplo A" },
//   { numero: "008", juega: true, nombre: "Participante de ejemplo A" },
//   { numero: "012", juega: true, nombre: "Participante de ejemplo B" },
//   { numero: "013", juega: true, nombre: "Participante de ejemplo A" },
//   { numero: "019", juega: false, nombre: "No vendido" },
//   { numero: "125", juega: true, nombre: "Participante de ejemplo C" },
//   { numero: "128", juega: true, nombre: "Participante de ejemplo D" },
//   { numero: "247", juega: true, nombre: "Participante de ejemplo E" },
//   { numero: "249", juega: false, nombre: "No vendido" },
//   { numero: "580", juega: true, nombre: "Participante de ejemplo F" },
//   { numero: "999", juega: true, nombre: "Participante de ejemplo G" },
// ];
const BOLETOS_INICIALES = [
  { numero: "321", juega: true, nombre: "Adriana Diaz" },
  { numero: "329", juega: true, nombre: "Adriana Diaz" },
  { numero: "322", juega: true, nombre: "Jonny Franco" },
  { numero: "345", juega: true, nombre: "Jonny Franco" },
  { numero: "333", juega: true, nombre: "Genexis Zambrano" },
  { numero: "356", juega: true, nombre: "Arella Franco" },
  { numero: "346", juega: true, nombre: "Jenny Franco" },
  { numero: "358", juega: true, nombre: "Lisbhet Romero" },
  { numero: "323", juega: true, nombre: "Benja Carigaris" },
  { numero: "337", juega: true, nombre: "Benja Carigaris" },
  { numero: "357", juega: true, nombre: "Emiliano Franco" },
  { numero: "334", juega: true, nombre: "Gustavo Salva" }, 
  { numero: "355", juega: true, nombre: "Gustavo Salva" },
  { numero: "343", juega: true, nombre: "Sofia Luna" },
  { numero: "331", juega: true, nombre: "Mica Acevedo" },
  { numero: "344", juega: true, nombre: "Mica Acevedo" }, 
  { numero: "327", juega: true, nombre: "Arella Franco" },
  { numero: "352", juega: true, nombre: "Marcelo Bertone" },
  { numero: "353", juega: true, nombre: "Angeles Moscaro" },
  { numero: "354", juega: true, nombre: "Daniel Martinez" },
];
// Cambia este identificador al comenzar una rifa DIFERENTE.
const RIFA_ID = "mi-rifa-001";
const STORAGE_KEY = `rifa-tres-digitos:${RIFA_ID}`;

type Boleto = { numero: string; juega: boolean; nombre?: string; [campo: string]: unknown };
type Ganador = { numero: string; fecha: string };
type Estado = { boletos: Boleto[]; historial: Ganador[] };

export function validarBoletos(entrada: unknown): Boleto[] {
  if (!Array.isArray(entrada)) throw new Error("La lista debe ser un array.");
  const vistos = new Set<string>();
  return entrada.map((item, index) => {
    if (!item || typeof item !== "object") throw new Error(`Boleto ${index + 1} inválido.`);
    const numero = typeof item.numero === "number" && Number.isInteger(item.numero)
      ? String(item.numero).padStart(3, "0") : item.numero;
    if (typeof numero !== "string" || !/^\d{3}$/.test(numero))
      throw new Error(`Número inválido en boleto ${index + 1}: usa 000–999.`);
    if (typeof item.juega !== "boolean") throw new Error(`juega debe ser true o false en ${numero}.`);
    if (vistos.has(numero)) throw new Error(`Número duplicado: ${numero}.`);
    vistos.add(numero);
    return { ...item, numero };
  });
}

export function digitosValidos(boletos: Boleto[], prefijo: string, posicion: number): string[] {
  return [...new Set(boletos.filter(b => b.juega && b.numero.startsWith(prefijo))
    .map(b => b.numero[posicion]))].sort();
}

// Rechazo del excedente para evitar sesgo por módulo.
export function indiceAleatorio(total: number): number {
  if (!Number.isInteger(total) || total < 1 || total > 1000) throw new Error("Cantidad inválida.");
  const limite = Math.floor(4294967296 / total) * total;
  const buffer = new Uint32Array(1);
  do { crypto.getRandomValues(buffer); } while (buffer[0] >= limite);
  return buffer[0] % total;
}

const firmaInicial = JSON.stringify(BOLETOS_INICIALES);

export default function RifaTresDigitos() {
  const [estado, setEstado] = useState<Estado>({ boletos: [], historial: [] });
  const [listo, setListo] = useState(false);
  const [error, setError] = useState("");
  const [girando, setGirando] = useState(false);
  const [digitos, setDigitos] = useState(["0", "0", "0"]);
  const [posicion, setPosicion] = useState(-1);
  const [prefijo, setPrefijo] = useState("");
  const [ganador, setGanador] = useState<Boleto | null>(null);
  const ocupado = useRef(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);
  const originalGuardado = useRef<string | null>(null);

  const reiniciarRifa = () => {
    if (ocupado.current) return;
  
    if (!window.confirm("¿Reiniciar la rifa? Se borrarán los ganadores.")) return;
  
    try {
      localStorage.removeItem(STORAGE_KEY);
      originalGuardado.current = null;
  
      setEstado({
        boletos: validarBoletos(BOLETOS_INICIALES),
        historial: [],
      });
  
      setGanador(null);
      setDigitos(["0", "0", "0"]);
      setPrefijo("");
      setPosicion(-1);
      setGirando(false);
      setError("");
      setListo(true);
    } catch {
      setError("No se pudo reiniciar la rifa.");
    }
  };

  useEffect(() => {
    try {
      const iniciales = validarBoletos(BOLETOS_INICIALES);
      const raw = localStorage.getItem(STORAGE_KEY);
      originalGuardado.current = raw;
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.firma !== firmaInicial)
          throw new Error("Cambió la lista inicial. Usa otro RIFA_ID para la nueva lista o restaura la anterior.");
        const boletos = validarBoletos(saved.boletos);
        if (!Array.isArray(saved.historial)) throw new Error("Historial guardado inválido.");
        const numeros = new Set<string>();
        for (const h of saved.historial) {
          if (!h || typeof h.numero !== "string" || typeof h.fecha !== "string" || numeros.has(h.numero)
            || !boletos.some(b => b.numero === h.numero && !b.juega))
            throw new Error("Historial guardado inconsistente.");
          numeros.add(h.numero);
        }
        if (boletos.length !== iniciales.length || boletos.some(b => {
          const base = iniciales.find(i => i.numero === b.numero);
          return !base || b.juega !== (base.juega && !numeros.has(b.numero));
        })) throw new Error("Los boletos guardados no coinciden con la lista inicial.");
        setEstado({ boletos, historial: saved.historial });
      } else setEstado({ boletos: iniciales, historial: [] });
      setListo(true);
    } catch (e) { setError(e instanceof Error ? e.message : "No se pudo cargar la rifa."); }
    return () => {
      if (temporizador.current !== null) clearTimeout(temporizador.current);
      ocupado.current = false;
    };
  }, []);

  const activos = estado.boletos.filter(b => b.juega);
  const candidatos = activos.filter(b => b.numero.startsWith(prefijo));

  const sortear = () => {
    if (ocupado.current || !listo || activos.length === 0) return;
    ocupado.current = true;
    setGirando(true); setGanador(null); setError(""); setPrefijo(""); setPosicion(0);
    const copia = activos.map(b => ({ ...b }));
    let grupo = copia;
    let p = 0;
    let fijo = "";
    let termina = Date.now() + 2200;
    let pasos = 0;

    const fallar = (e: unknown) => {
      ocupado.current = false; setGirando(false); setPosicion(-1);
      setError(e instanceof Error ? e.message : "No se pudo completar el sorteo.");
    };
    try {
      if (localStorage.getItem(STORAGE_KEY) !== originalGuardado.current)
        throw new Error("La rifa cambió en otra pestaña. Recarga antes de continuar.");
      // Comprobar que se puede guardar ANTES de comenzar.
      const prueba = JSON.stringify({ firma: firmaInicial, ...estado });
      localStorage.setItem(STORAGE_KEY, prueba);
      originalGuardado.current = prueba;
    } catch (e) { fallar(e); return; }

    const tick = () => {
      try {
        pasos++;
        if (Date.now() >= termina) {
          // Elegir un BOLETO del grupo, no un dígito equiprobable.
          // Así cada boleto conserva probabilidad 1 / total de participantes.
          const elegido = grupo[indiceAleatorio(grupo.length)];
          fijo += elegido.numero[p];
          grupo = grupo.filter(b => b.numero.startsWith(fijo));
          setPrefijo(fijo);
          if (p === 2) {
            const win = grupo[0];
            const siguiente: Estado = {
              boletos: estado.boletos.map(b => b.numero === win.numero ? { ...b, juega: false } : b),
              historial: [{ numero: win.numero, fecha: new Date().toISOString() }, ...estado.historial],
            };
            if (localStorage.getItem(STORAGE_KEY) !== originalGuardado.current)
              throw new Error("La rifa cambió en otra pestaña durante el giro. Recarga para continuar.");
            const raw = JSON.stringify({ firma: firmaInicial, ...siguiente });
            // Persistir antes de anunciar al ganador.
            localStorage.setItem(STORAGE_KEY, raw);
            originalGuardado.current = raw;
            setEstado(siguiente); setDigitos(win.numero.split("")); setGanador(win);
            setGirando(false); setPosicion(-1); ocupado.current = false;
            temporizador.current = null;
            return;
          }
          p++; setPosicion(p); termina = Date.now() + 2200;
        }
        // Cada tambor pendiente muestra solo dígitos de boletos aún posibles.
        setDigitos([0, 1, 2].map(i => {
          if (i < fijo.length) return fijo[i];
          const opciones = [...new Set(grupo.map(b => b.numero[i]))].sort();
          return opciones[(pasos + i) % opciones.length];
        }));
        temporizador.current = setTimeout(tick, 75);
      } catch (e) { fallar(e); }
    };
    tick();
  };

  return (
   
    <main
      className="rifa"
      // style={{ backgroundImage: `linear-gradient(rgba(11,18,32,0.35), rgba(11,18,32,0.35)), url("${imagen}")` }}
    >
      <section 
      style={{
        backgroundImage: `linear-gradient(rgba(11,18,32,0.55),rgba(11,18,32,0.75)),url("${imagen}")`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", }}
      
        className="panel"
      >
        <header><span className="etiqueta"><b>SORTEO</b> </span><h1>AGUILAS DE CORDOBA</h1>
          <p><b> Solo participan boletos habilitados.</b></p></header>
        <div className="resumen"><span><b>{activos.length}</b> participando</span>
          <span><b>{estado.historial.length}</b> premiados</span></div>
        <div className="tambores" aria-hidden="true">{digitos.map((d, i) => (
          <div key={i} className={`tambor ${girando && i >= posicion ? "gira" : "fijo"}`}>
            <small>{["CENTENAS", "DECENAS", "UNIDADES"][i]}</small>
            <div className="ventana"><span key={girando && i >= posicion ? `${d}-${i}` : `fijo-${d}`}>{d}</span></div>
            <em>{girando ? i < posicion ? "Confirmado" : "Girando…" : ""}</em>
          </div>
        ))}</div>
        <p className="estado" role="status" aria-live="polite">{girando
          ? `Prefijo: ${prefijo || "—"} · ${candidatos.length} boletos posibles · Deteniendo ${["centenas", "decenas", "unidades"][posicion]}`
          : <b>{ganador ? `¡Ganó el ${ganador.numero}!` : "Listo para el próximo premio"}</b>}</p>
        {error && <p className="error" role="alert">{error}</p>}
        <br/><button onClick={sortear} disabled={!listo || girando || !activos.length}>
          {girando ? "Sorteando…" : listo && !activos.length ? "No quedan boletos" : "Sortear premio"}</button>
         
        {ganador && <div className="ganador"><small>BOLETO GANADOR</small><strong>{ganador.numero}</strong>
          <span>{typeof ganador.nombre === "string" ? ganador.nombre : "¡Felicitaciones!"}</span>
          {/* <p>Ya quedó excluido del próximo sorteo.</p> */}
          </div>}
        {/* <p className="nota">Datos de ejemplo: reemplaza BOLETOS_INICIALES antes de tu rifa. */}
          {/* El progreso se guarda en este navegador. Usa una sola pestaña para realizar el sorteo.</p> */}
      </section>
      <aside className="panel"><h2>Boletos</h2><div className="lista">{estado.boletos.map(b => (
        <div className="boleto" key={b.numero}><b>{b.numero}</b>
          <span>{b.juega ? "Participa" : estado.historial.some(h => h.numero === b.numero) ? "Premiado" : "No participa"}</span></div>
      ))}</div><h2>Ganadores</h2>{estado.historial.length === 0 ? <p>Aún no hay ganadores.</p>
        : <ol>{estado.historial.map(h => {
          const boleto = estado.boletos.find(b => b.numero === h.numero);
    
          return (
            <li key={h.numero}>
              <b>{h.numero}</b> · {boleto?.nombre ?? "Sin nombre"}
            </li>
          );
        })}</ol>}</aside>
      <style jsx global>{`
        html, body { margin: 0; padding: 0; min-height: 100%; }
      `}</style>
      <style jsx>{`
        .rifa{min-height:100vh;min-height:100dvh;background-color:#0b1220;background-size:cover;background-position:center;background-repeat:no-repeat;color:#e8eef9;padding:32px 16px;display:grid;grid-template-columns:minmax(0,760px) minmax(240px,340px);gap:24px;justify-content:center;align-items:start;font-family:system-ui,sans-serif;box-sizing:border-box}
        .panel{background:rgba(19,31,51,0.85);border:1px solid #2c3c56;border-radius:24px;padding:28px;min-width:0}header{text-align:center}.etiqueta{color:#f8ce66;font-size:11px;letter-spacing:3px}h1{font-size:clamp(25px,4vw,38px);margin:16px 0}p{color:#acbdd6;line-height:1.6}h2{font-size:19px;margin:4px 0 18px}.resumen{display:flex;justify-content:center;gap:28px;margin:28px 0;color:#acbdd6}.resumen b{color:white}.tambores{display:flex;gap:12px;justify-content:center}.tambor{flex:1;max-width:180px;min-width:0;text-align:center}small{font-size:10px;letter-spacing:1px;color:#b8c9e2}.ventana{height:clamp(110px,22vw,170px);margin:12px 0;background:linear-gradient(#060c16,#22344f 50%,#060c16);border:2px solid #41526e;border-radius:18px;overflow:hidden;display:grid;place-items:center}.ventana span{display:block;font-size:clamp(60px,12vw,110px);font-weight:800;font-variant-numeric:tabular-nums;color:#f8ce66}.gira .ventana span{animation:rodar 75ms linear infinite}.fijo .ventana{border-color:#f8ce66}em{display:block;min-height:20px;color:#aac7a8;font-size:12px;font-style:normal}.estado{text-align:center;min-height:26px}button{width:100%;background:#f8ce66;color:#142039;font-size:18px;font-weight:750;border:0;border-radius:14px;padding:17px;cursor:pointer}button:disabled{opacity:.45;cursor:not-allowed}.ganador{text-align:center;border:1px solid #4b9d82;background:#143b35;border-radius:18px;margin-top:24px;padding:22px}.ganador strong{display:block;font-size:70px;letter-spacing:10px;color:#f8ce66}.ganador span{display:block}.ganador p{margin-bottom:0}.nota{font-size:12px;margin-top:24px}.lista{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:28px;max-height:400px;overflow:auto}.boleto{border:1px solid #33435d;padding:10px;border-radius:10px}.boleto b{font-size:22px;letter-spacing:2px}.boleto span{display:block;font-size:11px;color:#acbdd6}li{padding:8px 0;font-size:13px;line-height:1.5}.error{background:#522736;color:#ffe1e1;border-radius:10px;padding:12px}@keyframes rodar{from{transform:translateY(-16px);filter:blur(1px)}to{transform:translateY(16px);filter:blur(1px)}}@media(max-width:800px){.rifa{grid-template-columns:minmax(0,620px)}.panel{padding:20px}}@media(prefers-reduced-motion:reduce){.gira .ventana span{animation:none}}
        .ventana {background: rgba(11, 18, 32, 0.4);}
        button {
          background: rgba(248, 206, 102, 0.55);
          color: #fff;
          border: 1px solid #f8ce66;
          text-shadow: 0 1px 3px #000;
        }
        
        button:hover:not(:disabled) {
          background: rgba(248, 206, 102, 0.75);
        }
      `}</style>
       <button
  type="button"
  onClick={reiniciarRifa}
  disabled={girando}
  style={{ marginTop: 12, background: "#ef4444", color: "white" }}
>
  Reiniciar rifa
</button>
    </main>
    
  );
}
