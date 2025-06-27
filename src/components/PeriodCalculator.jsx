import React, { useState } from 'react';

export default function PeriodCalculator({ setResult }) {
  const [rate, setRate] = useState('');
  const [futureValue, setFutureValue] = useState('');
  const [presentValue, setPresentValue] = useState('');
  const [frequency, setFrequency] = useState('mensual');

  const handleCalculate = () => {
    const r = parseFloat(rate);
    const FV = parseFloat(futureValue);
    const PV = parseFloat(presentValue);

    if (isNaN(r) || isNaN(FV) || isNaN(PV) || r <= 0) {
      setResult("⚠️ Por favor ingrese valores válidos y una tasa mayor a 0.");
      return;
    }

    if (PV >= FV) {
      setResult("⚠️ El valor presente debe ser menor que el valor futuro.");
      return;
    }

    // Conversión de tasa a decimal
    const i = r / 100;

    const logNumerador = Math.log(FV / PV);
    const logDenominador = Math.log(1 + i);
    const n = logNumerador / logDenominador;

    let freqLabel = 'meses';
    let nYears = n;

    switch (frequency) {
      case 'mensual':
        freqLabel = 'meses';
        nYears = n / 12;
        break;
      case 'trimestral':
        freqLabel = 'trimestres';
        nYears = n / 4;
        break;
      case 'semestral':
        freqLabel = 'semestres';
        nYears = n / 2;
        break;
      case 'anual':
        freqLabel = 'años';
        break;
    }

    const formulaMath = `n = log(${FV} / ${PV}) / log(1 + ${i.toFixed(4)})`;
    const formulaEval = `n = ${logNumerador.toFixed(4)} / ${logDenominador.toFixed(4)} = ${n.toFixed(2)}`;

    setResult(
      <>
        <div><strong>Fórmula:</strong> n = log(VF / VP) / log(1 + i)</div>
        <div><strong>Reemplazo:</strong> {formulaMath}</div>
        <div><strong>Cálculo:</strong> {formulaEval}</div>
        <br />
        <div><strong>Resultado:</strong> {n.toFixed(2)} períodos ≈ {n.toFixed(1)} {freqLabel} ≈ {nYears.toFixed(2)} años</div>
      </>
    );
  };

  return (
    <>
      <label>Tasa (%):</label>
      <input type="number" value={rate} onChange={e => setRate(e.target.value)} />

      <label>Valor Presente:</label>
      <input type="number" value={presentValue} onChange={e => setPresentValue(e.target.value)} />

      <label>Valor Futuro:</label>
      <input type="number" value={futureValue} onChange={e => setFutureValue(e.target.value)} />
      
      <label>Frecuencia:</label>
      <select value={frequency} onChange={e => setFrequency(e.target.value)}>
        <option value="mensual">Mensual</option>
        <option value="trimestral">Trimestral</option>
        <option value="semestral">Semestral</option>
        <option value="anual">Anual</option>
      </select>

      <button onClick={handleCalculate}>Calcular Períodos</button>
    </>
  );
}
