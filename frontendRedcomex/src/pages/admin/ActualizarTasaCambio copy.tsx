import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Pais {
  idPais: number;
  nombre: string;
  tasaCambio: number;
}

export default function ActualizarTasaCambio() {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [nuevaTasa, setNuevaTasa] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4567/paises')
      .then(res => res.json())
      .then(data => setPaises(data));
  }, []);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const respuesta = await fetch('http://localhost:4567/actualizar-tasa-cambio', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idPais: parseInt(paisSeleccionado),
        tasaCambio: parseFloat(nuevaTasa)
      })
    });
    const resultado = await respuesta.json();
    alert(resultado.mensaje || resultado.error);
    navigate('/menu-admin');
  };
  const handleCancel = () => {navigate('/menu-admin');};
  return (
    <div>
      <h2>Actualizar Tasa de Cambio</h2>
      <form onSubmit={manejarEnvio}>
        <label>País:</label><br />
        <select value={paisSeleccionado} onChange={e => setPaisSeleccionado(e.target.value)} required>
          <option value="">Seleccione un país</option>
          {paises.map(p => (
            <option key={p.idPais} value={p.idPais}>{p.nombre}</option>
          ))}
        </select><br /><br />

        <label>Nueva Tasa de Cambio (COP por unidad de moneda extranjera):</label><br />
        <input
          type="number"
          step="0.01"
          min="0"
          value={nuevaTasa}
          onChange={e => setNuevaTasa(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Actualizar</button>
        <button onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
}