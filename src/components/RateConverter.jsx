import React, { useState } from "react";

const RateConverter = () => {
  const [fromType, setFromType] = useState("Efectiva");
  const [fromPeriod, setFromPeriod] = useState("mensual");
  const [toType, setToType] = useState("Efectiva");
  const [toPeriod, setToPeriod] = useState("anual");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const periodsPerYear = {
    mensual: 12,
    bimestral: 6,
    trimestral: 4,
    cuatrimestral: 3,
    semestral: 2,
    anual: 1,
  };

  const convertRate = () => {
    const r = parseFloat(rate);
    if (isNaN(r) || r <= 0) {
      setError("Ingresa una tasa válida");
      setResult(null);
      return;
    }

    setError("");

    const tasaDecimal = r / 100;
    const nOrigen = periodsPerYear[fromPeriod];
    const nDestino = periodsPerYear[toPeriod];

    let tasaConvertida;

    if (fromType === "Efectiva" && toType === "Efectiva") {
      // Efectiva a Efectiva
      tasaConvertida = Math.pow(1 + tasaDecimal, nOrigen / nDestino) - 1;
    } else if (fromType === "Nominal" && toType === "Efectiva") {
      // Nominal a Efectiva
      tasaConvertida = Math.pow(1 + tasaDecimal / nOrigen, nOrigen / nDestino) - 1;
    } else if (fromType === "Efectiva" && toType === "Nominal") {
      // Efectiva a Nominal
      const tasaEfectivaDestino = Math.pow(1 + tasaDecimal, nOrigen / nDestino) - 1;
      tasaConvertida = tasaEfectivaDestino * nDestino;
    } else {
      setError("Conversión no válida");
      setResult(null);
      return;
    }

    const tasaFinal = (tasaConvertida * 100).toFixed(4);

    setResult(
      `Convertido de ${fromType.toLowerCase()} ${fromPeriod} a ${toType.toLowerCase()} ${toPeriod}: ${tasaFinal}%`
    );
  };

  return (
    <div>
      <h2>Conversión de Tasa</h2>

      <div>
        <label>Desde (tipo):</label>
        <select value={fromType} onChange={(e) => setFromType(e.target.value)}>
          <option value="Efectiva">Efectiva</option>
          <option value="Nominal">Nominal</option>
        </select>
      </div>

      <div>
        <label>Periodicidad Origen:</label>
        <select value={fromPeriod} onChange={(e) => setFromPeriod(e.target.value)}>
          {Object.keys(periodsPerYear).map((period) => (
            <option key={period} value={period}>
              {period}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Hacia (tipo):</label>
        <select value={toType} onChange={(e) => setToType(e.target.value)}>
          <option value="Efectiva">Efectiva</option>
          <option value="Nominal">Nominal</option>
        </select>
      </div>

      <div>
        <label>Periodicidad Destino:</label>
        <select value={toPeriod} onChange={(e) => setToPeriod(e.target.value)}>
          {Object.keys(periodsPerYear).map((period) => (
            <option key={period} value={period}>
              {period}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Tasa a convertir (%):</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
      </div>

      <button onClick={convertRate}>Convertir</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && <p style={{ color: "lightgreen" }}>{result}</p>}
    </div>
  );
};

export default RateConverter;
