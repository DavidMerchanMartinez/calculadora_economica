// App.jsx
import React, { useState } from 'react';
import './App.css';
import RateConverter from './components/RateConverter';
import CalculatorSelector from './components/CalculatorSelector';
import ResultBox from './components/ResultBox';

export default function App() {
  const [calcType, setCalcType] = useState('vp');
  const [fromRate, setFromRate] = useState('efectiva');
  const [toRate, setToRate] = useState('nominal');
  const [fromPeriodicity, setFromPeriodicity] = useState(1);
  const [toPeriodicity, setToPeriodicity] = useState(1);
  const [tasa, setTasa] = useState('');
  const [result, setResult] = useState('');

  const calculate = () => {
    const iInput = parseFloat(tasa) / 100;
    const mFrom = parseInt(fromPeriodicity, 10);
    const mTo = parseInt(toPeriodicity, 10);
    let res = '';

    if (calcType === 'rate') {
      if (isNaN(iInput)) {
        setResult('Ingresa una tasa válida');
        return;
      }

      if (fromRate === 'nominal' && toRate === 'efectiva') {
        const ie = Math.pow(1 + iInput / mFrom, mFrom) - 1;
        res = `Efectiva anual: ${(ie * 100).toFixed(2)}%`;
      } else if (fromRate === 'efectiva' && toRate === 'nominal') {
        const j = mTo * (Math.pow(1 + iInput, 1 / mTo) - 1);
        res = `Nominal anual: ${(j * 100).toFixed(2)}%`;
      } else if (fromRate === 'efectiva' && toRate === 'efectiva') {
        const perEff = Math.pow(1 + iInput, 1 / mTo) - 1;
        res = `Efectiva por periodo (${mTo}): ${(perEff * 100).toFixed(2)}%`;
      } else if (fromRate === 'nominal' && toRate === 'nominal') {
        const ie = Math.pow(1 + iInput / mFrom, mFrom) - 1;
        const jNew = mTo * (Math.pow(1 + ie, 1 / mTo) - 1);
        res = `Nominal anual (${mTo}): ${(jNew * 100).toFixed(2)}%`;
      } else {
        res = 'Conversión no soportada';
      }

      setResult(res);
      return;
    }

    setResult('Funcionalidad en desarrollo');
  };

  return (
    <div className="calculator">
      <h2>Calculadora Financiera</h2>
      <CalculatorSelector calcType={calcType} setCalcType={setCalcType} />

      {calcType === 'rate' && (
        <RateConverter
          fromRate={fromRate}
          toRate={toRate}
          fromPeriodicity={fromPeriodicity}
          toPeriodicity={toPeriodicity}
          tasa={tasa}
          setFromRate={setFromRate}
          setToRate={setToRate}
          setFromPeriodicity={setFromPeriodicity}
          setToPeriodicity={setToPeriodicity}
          setTasa={setTasa}
        />
      )}

      <button onClick={calculate}>Calcular</button>
      <ResultBox result={result} />
    </div>
  );
}
