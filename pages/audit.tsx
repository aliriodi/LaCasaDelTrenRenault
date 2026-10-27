import { useMemo, useState } from "react";
import { BOLETOS_INICIALES } from "./rifa5";

type Boleto = {
  numero: string;
  juega: boolean;
  nombre?: string;
  responsable?: string;
};

type Diferencia = {
    numero: string;
    responsable?: string;
    observacion:string
  };
  const Diferencias = [
    {responsable:"Beatriz",numero:"0",observacion:"Ninguna"},
    {responsable:"Carolina",numero:"-1",observacion:"Linea D9 dice 7 y son 6. Error contando"},
    {responsable:"Daro",numero:"0",observacion:"Ninguna"},
    {responsable:"Dayner",numero:"-1",observacion:"Celda D12 dice 2 y es 1. Error contando"},
    {responsable:"Diana",numero:"0",observacion:"Ninguna"},
    {responsable:"Diocelis",numero:"18",observacion:"No esta cargada en Drive"},
    {responsable:"Eliana",numero:"0",observacion:"Ninguna"},
    {responsable:"Génesis",numero:"0",observacion:"Ninguna"},
    {responsable:"Jenny Franco",numero:"0",observacion:"Ninguna"},
    {responsable:"Johana",numero:"0",observacion:"Ninguna"},
    {responsable:"Kenimar",numero:"0",observacion:"Ninguna"},
    {responsable:"Kimberly",numero:"0",observacion:"Ninguna"},
    {responsable:"Lhismar",numero:"0",observacion:"Ninguna"},
    {responsable:"Mariana y Krisbel",numero:"+1",observacion:"En los datos pasados el 475 esta vendido y en drive el 475 esta en rojo"},
    {responsable:"Marie",numero:"0",observacion:"Ninguna"},
    {responsable:"Megri",numero:"2",observacion:"La data que esta en Watsapp es diferente a la de Drive 655,680"},
    {responsable:"Melissa",numero:"0",observacion:"Ninguna"},
    {responsable:"Mychell",numero:"0",observacion:"Ninguna"},
    {responsable:"Nelsy",numero:"6",observacion:"Aunque en el drive dice 35 hay 30 numeros, los numeros faltantes son 44,48,54,60,68,72"},
    {responsable:"Valentina",numero:"-1",observacion:"Aunque dice 40 solo hay 39 num cargados falta en el drive aparece 000,000 en el sistema falta el 632"},
    {responsable:"Vanessa",numero:"0",observacion:"Ninguna"},
    {responsable:"Vaoska",numero:"0",observacion:"Ninguna"},
  ]
  
export default function Audit() {
  const [responsableAbierto, setResponsableAbierto] = useState<string | null>(
    null
  );

  const [observacionAbierta, setObservacionAbierta] = useState<string | null>(
    null
  );

  const grupos = useMemo(() => {
    const resultado: Record<string, Boleto[]> = {};

    BOLETOS_INICIALES.forEach((boleto: Boleto) => {
      // Solo contamos los boletos habilitados.
      if (!boleto.juega) return;

      const responsable = boleto.responsable?.trim() || "Sin responsable";

      if (!resultado[responsable]) {
        resultado[responsable] = [];
      }

      resultado[responsable].push(boleto);
    });

    return Object.entries(resultado)
      .map(([responsable, boletos]) => ({
        responsable,
        boletos: [...boletos].sort((a, b) =>
          a.numero.localeCompare(b.numero)
        ),
      }))
      .sort((a, b) => a.responsable.localeCompare(b.responsable));
  }, []);

  const totalVendidos = grupos.reduce(
    (total, grupo) => total + grupo.boletos.length,
    0
  );

  function cambiarResponsable(responsable: string) {
    setResponsableAbierto((actual) =>
      actual === responsable ? null : responsable
    );
  }

  return (
    <main className="auditoria">
      <div className="contenedor">
        <h1>Auditoría de boletos</h1>
        <p>Ventas por responsable</p>

        <div className="resumen">
          <div>
            <span>Total de boletos vendidos</span>
            <strong>{totalVendidos}</strong>
          </div>

          <div>
            <span>Responsables</span>
            <strong>{grupos.length}</strong>
          </div>
        </div>

   
        <div className="tabla">
  <div className="cabecera">
    <span>Responsable</span>
    <span>Vendidos</span>
    <span>Detalle</span>
    <span>Observación</span>
  </div>

  {grupos.map((grupo) => {
    const abierto = responsableAbierto === grupo.responsable;

    const diferencia = Diferencias.find(
      (item) => item.responsable === grupo.responsable
    );

    const textoObservacion = diferencia?.observacion ?? "Sin información";
    const tieneObservacion =
      textoObservacion.toLowerCase().trim() !== "ninguna";

    const observacionVisible =
      observacionAbierta === grupo.responsable;

    return (
      <section className="grupo" key={grupo.responsable}>
        <div className="fila">
          <strong>{grupo.responsable}</strong>

          <span>{grupo.boletos.length}</span>

          <button
            type="button"
            className="boton-detalle"
            onClick={() => cambiarResponsable(grupo.responsable)}
            aria-expanded={abierto}
          >
            {abierto ? "Cerrar ▲" : "Ver ▼"}
          </button>

          <button
            type="button"
            className={
              tieneObservacion
                ? "boton-observacion con-observacion"
                : "boton-observacion sin-observacion"
            }
            onClick={() =>
              setObservacionAbierta((actual) =>
                actual === grupo.responsable ? null : grupo.responsable
              )
            }
            aria-expanded={observacionVisible}
          >
            {tieneObservacion ? "⚠ Observación" : "Observación"}
          </button>
        </div>

        {observacionVisible && (
          <div
            className={
              tieneObservacion
                ? "mensaje-observacion mensaje-rosa"
                : "mensaje-observacion mensaje-amarillo"
            }
          >
            <strong>Observación:</strong> {textoObservacion}

            {diferencia && diferencia.numero !== "0" && (
              <div>
                <strong>Diferencia:</strong> {diferencia.numero}
              </div>
            )}
          </div>
        )}

        {abierto && (
          <div className="detalle">
            <h2>Boletos vendidos por {grupo.responsable}</h2>

            <table>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Participante</th>
                </tr>
              </thead>

              <tbody>
                {grupo.boletos.map((boleto) => (
                  <tr key={boleto.numero}>
                    <td>{boleto.numero}</td>
                    <td>{boleto.nombre || "Sin nombre"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    );
  })}
</div>
      </div>
      <div>
         
      </div>

      <style jsx>{`
        .auditoria {
            min-height: 100vh;
            padding: 32px 16px;
            background: #0b1220;
            color: #e8eef9;
            font-family: Arial, sans-serif;
            box-sizing: border-box;
          }
          
          .contenedor {
            max-width: 950px;
            margin: 0 auto;
          }
          
          h1 {
            margin: 0 0 8px;
            color: #f8ce66;
            font-size: 30px;
          }
          
          p {
            margin: 0;
            color: #b8c9e2;
          }
          
          .resumen {
            display: flex;
            gap: 14px;
            margin: 24px 0;
            flex-wrap: wrap;
          }
          
          .resumen div {
            flex: 1;
            min-width: 180px;
            padding: 18px;
            background: #16243a;
            border: 1px solid #33435d;
            border-radius: 14px;
          }
          
          .resumen span,
          .resumen strong {
            display: block;
          }
          
          .resumen span {
            color: #b8c9e2;
            font-size: 14px;
          }
          
          .resumen strong {
            margin-top: 8px;
            color: #f8ce66;
            font-size: 28px;
          }
          
          .tabla {
            overflow: hidden;
            border: 1px solid #33435d;
            border-radius: 14px;
          }
          
          .cabecera,
          .fila {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 80px 75px 135px;
            gap: 10px;
            align-items: center;
          }
          
          .cabecera {
            padding: 15px 16px;
            background: #233550;
            color: #f8ce66;
            font-size: 14px;
            font-weight: bold;
          }
          
          .fila {
            padding: 12px 16px;
            background: #16243a;
            border-top: 1px solid #33435d;
            color: #fff;
            font-size: 15px;
          }
          
          .fila:hover {
            background: #223550;
          }
          
          .boton-detalle,
          .boton-observacion {
            border: 0;
            border-radius: 8px;
            padding: 10px 8px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
          }
          
          .boton-detalle {
            background: #334966;
            color: #fff;
          }
          
          .con-observacion {
            background: #f7c5cf;
            color: #732b3b;
          }
          
          .sin-observacion {
            background: #fff0ad;
            color: #695500;
          }
          
          .mensaje-observacion {
            margin: 10px 16px;
            padding: 12px 14px;
            border-radius: 8px;
            font-size: 14px;
            line-height: 1.5;
          }
          
          .mensaje-rosa {
            background: #f7c5cf;
            color: #732b3b;
          }
          
          .mensaje-amarillo {
            background: #fff0ad;
            color: #695500;
          }
          
          .detalle {
            padding: 20px;
            background: #0e1b2d;
          }
          
          .detalle h2 {
            margin: 0 0 14px;
            color: #f8ce66;
            font-size: 16px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            color: #e8eef9;
          }
          
          th,
          td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #33435d;
          }
          
          th {
            color: #b8c9e2;
          }
          
          td:first-child {
            width: 100px;
            color: #f8ce66;
            font-weight: bold;
          }
          
          @media (max-width: 480px) {
            .auditoria {
              padding: 20px 8px;
            }
          
            .cabecera,
            .fila {
              grid-template-columns: minmax(0, 1fr) 48px 58px 105px;
              gap: 5px;
              padding-left: 8px;
              padding-right: 8px;
              font-size: 12px;
            }
          
            .boton-detalle,
            .boton-observacion {
              padding: 8px 4px;
              font-size: 11px;
            }
          }
      `}</style>
    </main>
  );
}