import React, { useState } from 'react';

const ValorPresente = () => {
  const [modo, setModo] = useState('renta'); // 'renta' o 'valorUnico'

  const [R, setR] = useState(0);
  const [iAnual, setIAnual] = useState(0);
  const [n, setN] = useState(0);
  const [VF, setVF] = useState(0);

  const [tipoPeriodo, setTipoPeriodo] = useState('Mensual');
  const [tipoCapitalizacion, setTipoCapitalizacion] = useState('Vencida');
  const [VP, setVP] = useState(0);
  const [procedimiento, setProcedimiento] = useState('');

  const obtenerDivisorPeriodo = (tipo) => {
    switch (tipo) {
      case 'Mensual': return 12;
      case 'Bimestral': return 6;
      case 'Trimestral': return 4;
      case 'Semestral': return 2;
      case 'Anual': return 1;
      default: return 1;
    }
  };

  const calcularVP = () => {
    const divisor = obtenerDivisorPeriodo(tipoPeriodo);
    const i = (iAnual / 100) / divisor;
    let resultado = 0;
    let detalle = '';

    if (modo === 'renta') {
      const factorCapitalizacion = tipoCapitalizacion === 'anticipada' ? (1 + i) : 1;
      const parte1 = 1 - Math.pow(1 + i, -n);
      const parte2 = parte1 / i;
      resultado = R * parte2 * factorCapitalizacion;
      detalle = `
        <strong>Fórmula:</strong> VP = R * [(1 - (1 + i)^-n) / i] ${tipoCapitalizacion === 'anticipada' ? '* (1 + i)' : ''}<br />
        R = ${R}<br />
        Tasa anual = ${iAnual}%<br />
        i (tasa periódica) = ${i.toFixed(6)}<br />
        n = ${n}<br />
        VP = ${resultado.toFixed(2)}
      `;
    } else {
      resultado = VF / Math.pow(1 + i, n);
      detalle = `
        <strong>Fórmula:</strong> VP = VF / (1 + i)^n<br />
        VF = ${VF}<br />
        Tasa anual = ${iAnual}%<br />
        i (tasa periódica) = ${i.toFixed(6)}<br />
        n = ${n}<br />
        VP = ${resultado.toFixed(2)}
      `;
    }

    setVP(resultado);
    setProcedimiento(detalle);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem', color: '#fff' }}>
      <h2>Calculadora de Valor Presente</h2>

      <div>
        <label>Tipo de cálculo:</label>
        <select value={modo} onChange={(e) => setModo(e.target.value)}>
          <option value="renta">Renta periódica</option>
          <option value="valorUnico">Valor futuro único</option>
        </select>
      </div>

      {modo === 'renta' ? (
        <div>
          <label>Renta (R):</label>
          <input type="number" value={R} onChange={(e) => setR(Number(e.target.value))} />
        </div>
      ) : (
        <div>
          <label>Valor Futuro (VF):</label>
          <input type="number" value={VF} onChange={(e) => setVF(Number(e.target.value))} />
        </div>
      )}

      <div>
        <label>Tasa de interés anual (%):</label>
        <input type="number" value={iAnual} onChange={(e) => setIAnual(Number(e.target.value))} />
      </div>
      <div>
        <label>Número de períodos:</label>
        <input type="number" value={n} onChange={(e) => setN(Number(e.target.value))} />
      </div>
      <div>
        <label>Tipo de período:</label>
        <select value={tipoPeriodo} onChange={(e) => setTipoPeriodo(e.target.value)}>
          <option value="Mensual">Mensual</option>
          <option value="Bimestral">Bimestral</option>
          <option value="Trimestral">Trimestral</option>
          <option value="Semestral">Semestral</option>
          <option value="Anual">Anual</option>
        </select>
      </div>

      {modo === 'renta' && (
        <div>
          <label>Tipo de capitalización:</label>
          <select value={tipoCapitalizacion} onChange={(e) => setTipoCapitalizacion(e.target.value)}>
            <option value="Vencida">Vencida</option>
            <option value="anticipada">Anticipada</option>
          </select>
        </div>
      )}

      <button onClick={calcularVP}>Calcular</button>

      {procedimiento && (
        <div
          style={{
            width: '100%',
            marginTop: '1rem',
            overflowWrap: 'break-word',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            padding: '1rem',
            backgroundColor: '#1e1e1e',
            borderRadius: '8px',
            fontFamily: 'monospace',
            color: '#ffffff',
          }}
          dangerouslySetInnerHTML={{ __html: procedimiento }}
        />
      )}

      <h3>
        Valor Presente: ${VP.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} ({tipoPeriodo.toLowerCase()}{modo === 'renta' ? `, ${tipoCapitalizacion.toLowerCase()}` : ''})
      </h3>
    </div>
  );
};

export default ValorPresente;
