// components/RateConverter.jsx
import React from 'react';

export default function RateConverter({
  fromRate, toRate,
  fromPeriodicity, toPeriodicity,
  tasa,
  setFromRate, setToRate,
  setFromPeriodicity, setToPeriodicity,
  setTasa
}) {
  return (
    <>
      <label>Desde (tipo):</label>
      <select value={fromRate} onChange={e => setFromRate(e.target.value)}>
        <option value="efectiva">Efectiva</option>
        <option value="nominal">Nominal</option>
      </select>

      <label>Periodicidad Origen (m):</label>
      <input type="number" value={fromPeriodicity} onChange={e => setFromPeriodicity(e.target.value)} />

      <label>Hacia (tipo):</label>
      <select value={toRate} onChange={e => setToRate(e.target.value)}>
        <option value="efectiva">Efectiva</option>
        <option value="nominal">Nominal</option>
      </select>

      <label>Periodicidad Destino (m):</label>
      <input type="number" value={toPeriodicity} onChange={e => setToPeriodicity(e.target.value)} />

      <label>Tasa a convertir (%):</label>
      <input type="number" value={tasa} onChange={e => setTasa(e.target.value)} />
    </>
  );
}