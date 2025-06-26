// components/CalculatorSelector.jsx
import React from 'react';

export default function CalculatorSelector({ calcType, setCalcType }) {
  return (
    <>
      <label>Tipo de Cálculo:</label>
      <select value={calcType} onChange={e => setCalcType(e.target.value)}>
        <option value="vp">Valor Presente</option>
        <option value="vf">Valor Futuro</option>
        <option value="renta_vencida">Renta Vencida</option>
        <option value="renta_anticipada">Renta Anticipada</option>
        <option value="periods">Calcular Períodos</option>
        <option value="rate">Conversión de Tasa</option>
      </select>
    </>
  );
}