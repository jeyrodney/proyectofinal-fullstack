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

  const handleCancel = () => {
    navigate('/menu-admin');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Actualizar Tasa de Cambio</h2>

        <form onSubmit={manejarEnvio} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">País:</label>
            <select
              value={paisSeleccionado}
              onChange={e => setPaisSeleccionado(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
            >
              <option value="">Seleccione un país</option>
              {paises.map(p => (
                <option key={p.idPais} value={p.idPais}>{p.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Nueva Tasa de Cambio (COP por unidad de moneda extranjera):
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={nuevaTasa}
              onChange={e => setNuevaTasa(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Actualizar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
