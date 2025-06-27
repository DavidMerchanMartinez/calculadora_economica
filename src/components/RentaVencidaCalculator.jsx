import React, { useState } from 'react';

const RentaVencidaCalculator = ({ setResult }) => {
  const [renta, setRenta] = useState('');
  const [interes, setInteres] = useState('');
  const [periodos, setPeriodos] = useState('');
  const [procedimiento, setProcedimiento] = useState('');

  const calcularRentaVencida = () => {
    const R = parseFloat(renta);
    const i = parseFloat(interes) / 100;
    const n = parseInt(periodos);

    if (isNaN(R) || isNaN(i) || isNaN(n) || i === 0) {
      setResult('Por favor ingrese valores válidos y asegúrese de que la tasa no sea 0.');
      return;
    }

    const VF = R * ((Math.pow(1 + i, n) - 1) / i);

    const procedimientoTexto = `Fórmula: VF = R * [(1 + i)^n - 1] / i

Donde:
R = ${R}
i = ${i} (tasa por período)
n = ${n} períodos

Desarrollo:
VF = ${R} * [(1 + ${i})^${n} - 1] / ${i}
VF = ${R} * [${Math.pow(1 + i, n).toFixed(5)} - 1] / ${i}
VF = ${R} * [${(Math.pow(1 + i, n) - 1).toFixed(5)}] / ${i}
VF = ${VF.toFixed(2)}
`;

    setProcedimiento(procedimientoTexto);
     setResult(`Valor Futuro: $${VF.toFixed(2)} (número de períodos en meses)`);
  };

  return (
    <div>
      <h3>Renta Vencida</h3>
      <label>Renta ($):</label>
      <input
        type="number"
        value={renta}
        onChange={(e) => setRenta(e.target.value)}
      />

      <label>Tasa de interés por período (%):</label>
      <input
        type="number"
        value={interes}
        onChange={(e) => setInteres(e.target.value)}
      />

      <label>Número de períodos (meses):</label>
      <input
        type="number"
        value={periodos}
        onChange={(e) => setPeriodos(e.target.value)}
      />

      <button onClick={calcularRentaVencida}>Calcular</button>

      {procedimiento && (
        <pre style={{ whiteSpace: 'pre-wrap', background: '#fff', color: '#000', padding: '1em', borderRadius: '8px', marginTop: '1em' }}>
          {procedimiento}
        </pre>
      )}
    </div>
  );
};

export default RentaVencidaCalculator;
