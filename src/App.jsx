import React, { useState, useEffect } from 'react';
import './App.css';
import CalculatorSelector from './components/CalculatorSelector';
import ResultBox from './components/ResultBox';
import RateConverter from './components/RateConverter';
import PeriodCalculator from './components/PeriodCalculator';
import RentaAnticipadaCalculator from './components/RentaAnticipadaCalculator';
import RentaVencidaCalculator from './components/RentaVencidaCalculator';
import CalculadoraValorFuturo from './components/CalculadoraValorFuturo';
import ValorPresente from './components/ValorPresente';


export default function App() {
  const [calcType, setCalcType] = useState('rate'); // ✅ empieza con una opción válida
  const [result, setResult] = useState('');

  useEffect(() => {
    setResult(null); // limpiar el resultado cuando cambie el tipo
  }, [calcType]);

  return (
    <div className="calculator">
      <h2>Calculadora Financiera</h2>

      <CalculatorSelector
        calcType={calcType}
        setCalcType={setCalcType}
      />

      {calcType === 'rate' && (
        <RateConverter setResult={setResult} />
      )}

      {calcType === 'periods' && (
        <PeriodCalculator setResult={setResult} />
      )}

      {calcType === 'renta_anticipada' && (
        <RentaAnticipadaCalculator setResult={setResult} />
      )}
      
      {calcType === 'renta_vencida' && (
        <RentaVencidaCalculator setResult={setResult} />
      )}

      {calcType === 'vf' && (
        <CalculadoraValorFuturo setResult={setResult} />
      )}
      
       {calcType === 'vp' && (
        <ValorPresente setResult={setResult} />
      )}

      {/* Solo muestra el resultado si existe */}
      {result && <ResultBox result={result} />}
    </div>
  );
}
