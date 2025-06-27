import React, { useState } from "react";

const ValorFuturo = () => {
  const [tipoCalculo, setTipoCalculo] = useState("");
  const [vp, setVp] = useState("");
  const [renta, setRenta] = useState("");
  const [tasa, setTasa] = useState("");
  const [periodos, setPeriodos] = useState("");
  const [tipoPeriodo, setTipoPeriodo] = useState("Mensual");
  const [capitalizacion, setCapitalizacion] = useState("Vencida");
  const [resultado, setResultado] = useState("");
  const [procedimiento, setProcedimiento] = useState("");

  const tasasPorAno = {
    Mensual: 12,
    Bimestral: 6,
    Trimestral: 4,
    Cuatrimestral: 3,
    Semestral: 2,
    Anual: 1,
  };

  const calcular = () => {
    const i = parseFloat(tasa) / 100 / tasasPorAno[tipoPeriodo];
    const n = parseFloat(periodos);
    let resultadoFinal = 0;
    let procedimientoTexto = "";

    if (tipoCalculo === "ValorPresente" && vp !== "") {
      resultadoFinal = parseFloat(vp) * Math.pow(1 + i, n);
      if (capitalizacion === "Anticipada") resultadoFinal *= 1 + i;

      procedimientoTexto = `Fórmula: VF = VP * (1 + i)^n${
        capitalizacion === "Anticipada" ? " * (1 + i)" : ""
      }
Donde:
  VP = ${vp}
  i = ${i.toFixed(5)}
  n = ${n}
  Tipo de capitalización: ${capitalizacion.toLowerCase()}

Desarrollo:
  VF = ${vp} * (1 + ${i.toFixed(5)})^${n}${
        capitalizacion === "Anticipada"
          ? ` * (1 + ${i.toFixed(5)})`
          : ""
      }
VF = ${resultadoFinal.toFixed(2)}`;
    } else if (tipoCalculo === "Renta" && renta !== "") {
      const factor = capitalizacion === "Anticipada" ? (1 + i) : 1;
      resultadoFinal =
        parseFloat(renta) * (((Math.pow(1 + i, n) - 1) / i) * factor);

      procedimientoTexto = `Fórmula: VF = R * [(1 + i)^n - 1]/i${
        capitalizacion === "Anticipada" ? " * (1 + i)" : ""
      }
Donde:
  R = ${renta}
  i = ${i.toFixed(5)}
  n = ${n}
  Tipo de capitalización: ${capitalizacion.toLowerCase()}

Desarrollo:
  VF = ${renta} * [((1 + ${i.toFixed(5)})^${n} - 1) / ${i.toFixed(5)}]${
        capitalizacion === "Anticipada"
          ? ` * (1 + ${i.toFixed(5)})`
          : ""
      }
VF = ${resultadoFinal.toFixed(2)}`;
    }

    const resultadoConPuntos = resultadoFinal
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      .replace(".", ",")
      .replace(/,(\d{2})$/, (m) => "," + m.slice(1)); // para mantener 2 decimales después de la coma

    setResultado(
      `Valor Futuro: $${resultadoConPuntos} (${n} períodos de tipo ${tipoPeriodo.toLowerCase()})`
    );
    setProcedimiento(procedimientoTexto);
  };

  return (
    <div>
      <h2>Calculadora de Valor Futuro</h2>

      <label>Selecciona el tipo de cálculo:</label>
      <select value={tipoCalculo} onChange={(e) => setTipoCalculo(e.target.value)}>
        <option value="">-- Selecciona --</option>
        <option value="ValorPresente">Valor Presente (pago único)</option>
        <option value="Renta">Renta periódica (varios pagos)</option>
      </select>

      {tipoCalculo === "ValorPresente" && (
        <div>
          <label>Valor Presente ($):</label>
          <input type="number" value={vp} onChange={(e) => setVp(e.target.value)} />
        </div>
      )}

      {tipoCalculo === "Renta" && (
        <div>
          <label>Renta periódica ($):</label>
          <input type="number" value={renta} onChange={(e) => setRenta(e.target.value)} />
        </div>
      )}

      <label>Tasa de interés anual (%):</label>
      <input type="number" value={tasa} onChange={(e) => setTasa(e.target.value)} />

      <label>Número de períodos:</label>
      <input type="number" value={periodos} onChange={(e) => setPeriodos(e.target.value)} />

      <label>Tipo de período:</label>
      <select value={tipoPeriodo} onChange={(e) => setTipoPeriodo(e.target.value)}>
        {Object.keys(tasasPorAno).map((tipo) => (
          <option key={tipo} value={tipo}>{tipo}</option>
        ))}
      </select>

      <label>Tipo de capitalización:</label>
      <select value={capitalizacion} onChange={(e) => setCapitalizacion(e.target.value)}>
        <option value="Vencida">Vencida</option>
        <option value="Anticipada">Anticipada</option>
      </select>

      <button onClick={calcular}>Calcular</button>

      {procedimiento && (
        <pre style={{ backgroundColor: "#f4f4f4", color: "black", padding: "10px" }}>
          {procedimiento}
        </pre>
      )}

      {resultado && <p><strong>{resultado}</strong></p>}
    </div>
  );
};

export default ValorFuturo;
