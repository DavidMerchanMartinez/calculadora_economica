import { useState } from "react";
import './CapitalizationCalculator.css';

const CapitalizationCalculator = () => {
  const [tabla, setTabla] = useState([]); // ✅ define 'tabla'
  const [monto, setMonto] = useState(5000);
  const [plazo, setPlazo] = useState(12);
  const [tasa, setTasa] = useState(5);
  const [periodo, setPeriodo] = useState("Mensual");

  const calcular = () => {
    const tasaDecimal = tasa / 100;
    const n = plazo;
    const tasaPeriodo = periodo === "Mensual" ? tasaDecimal / 12 : tasaDecimal / 4;
    const cuota = (monto * tasaPeriodo) / (1 - Math.pow(1 + tasaPeriodo, -n));

    let saldo = monto;
    const nuevaTabla = [];

    for (let i = 1; i <= n; i++) {
      const interes = saldo * tasaPeriodo;
      const amortizacion = cuota - interes;
      const saldoFinal = saldo - amortizacion;

      nuevaTabla.push({
        periodo: i,
        saldoInicial: saldo.toFixed(2),
        interes: interes.toFixed(2),
        cuota: cuota.toFixed(2),
        amortizacion: amortizacion.toFixed(2),
        saldoFinal: saldoFinal.toFixed(2),
      });

      saldo = saldoFinal;
    }

    setTabla(nuevaTabla); // ✅ actualiza 'tabla'
  };

  return (
    <div className="capital-container">
      <h2 className="capital-title">Calculadora de Capitalización</h2>
      <div className="capital-form">
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(+e.target.value)}
          placeholder="Monto"
        />
        <input
          type="number"
          value={plazo}
          onChange={(e) => setPlazo(+e.target.value)}
          placeholder="Plazo"
        />
        <input
          type="number"
          value={tasa}
          onChange={(e) => setTasa(+e.target.value)}
          placeholder="Tasa de Interés"
        />
        <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
          <option value="Mensual">Mensual</option>
          <option value="Trimestral">Trimestral</option>
        </select>
        <button onClick={calcular}>Calcular</button>
      </div>

      {/* ✅ Envolver la tabla para responsive */}
      {tabla.length > 0 && (
        <div className="responsive-table">
          <table className="capital-table">
            <thead>
              <tr>
                <th>Periodo</th>
                <th>Saldo inicial</th>
                <th>Interés</th>
                <th>Cuota</th>
                <th>Amortización</th>
                <th>Saldo final</th>
              </tr>
            </thead>
            <tbody>
              {tabla.map((fila, index) => (
                <tr key={index}>
                  <td>{fila.periodo}</td>
                  <td>{fila.saldoInicial}</td>
                  <td>{fila.interes}</td>
                  <td>{fila.cuota}</td>
                  <td>{fila.amortizacion}</td>
                  <td>{fila.saldoFinal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CapitalizationCalculator;
