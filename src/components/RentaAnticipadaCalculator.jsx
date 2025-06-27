// components/AnnuityDueCalculator.jsx
import React, { useState } from 'react';

export default function AnnuityDueCalculator({ setResult }) {
  const [payment, setPayment] = useState('');
  const [rate, setRate] = useState('');
  const [periods, setPeriods] = useState('');
  const [procedure, setProcedure] = useState('');

  const calculateAnnuityDue = () => {
    const R = parseFloat(payment);
    const i = parseFloat(rate) / 100;
    const n = parseInt(periods);

    if (isNaN(R) || isNaN(i) || isNaN(n) || R <= 0 || i <= 0 || n <= 0) {
      setResult('Por favor ingrese valores válidos.');
      setProcedure('');
      return;
    }

    const factor = ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const VF = R * factor;

    const stepByStep = `
Fórmula: VF = R * ((1 + i)^n - 1) / i) * (1 + i)

1. Convertir tasa a decimal: i = ${rate}% = ${i}
2. Número de períodos: n = ${n} meses
3. Calcular (1 + i)^n = (1 + ${i})^${n} = ${Math.pow(1 + i, n).toFixed(6)}
4. Restar 1: ${Math.pow(1 + i, n).toFixed(6)} - 1 = ${(Math.pow(1 + i, n) - 1).toFixed(6)}
5. Dividir por i: ${(Math.pow(1 + i, n) - 1).toFixed(6)} / ${i} = ${( (Math.pow(1 + i, n) - 1) / i ).toFixed(6)}
6. Multiplicar por (1 + i): ${( (Math.pow(1 + i, n) - 1) / i ).toFixed(6)} * (1 + ${i}) = ${factor.toFixed(6)}
7. Multiplicar por R: ${R} * ${factor.toFixed(6)} = ${VF.toFixed(2)}
    `;

    setResult(`Valor Futuro: $${VF.toFixed(2)}`);
    setProcedure(stepByStep);
  };

  return (
    <div className="calculator-box">
      <h3>Renta Anticipada - Valor Futuro</h3>
      <label>Renta (R):</label>
      <input
        type="number"
        value={payment}
        onChange={e => setPayment(e.target.value)}
      />

      <label>Tasa de interés (% mensual):</label>
      <input
        type="number"
        value={rate}
        onChange={e => setRate(e.target.value)}
      />

      <label>Número de períodos (en meses):</label>
      <input
        type="number"
        value={periods}
        onChange={e => setPeriods(e.target.value)}
      />

      <button onClick={calculateAnnuityDue}>Calcular</button>

      {procedure && (
        <pre className="procedure-box">
          {procedure}
        </pre>
      )}
    </div>
  );
}
