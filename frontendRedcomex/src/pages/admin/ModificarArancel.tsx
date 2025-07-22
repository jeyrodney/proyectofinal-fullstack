import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Pais {
  idPais: number;
  nombre: string;
}

interface Producto {
  idProducto: number;
  nombre: string;
}

export default function ModificarArancel() {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [nuevaTasa, setNuevaTasa] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4567/paises')
      .then(res => res.json())
      .then(data => setPaises(data));

    fetch('http://localhost:4567/productos')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      idPais: parseInt(paisSeleccionado),
      idProducto: parseInt(productoSeleccionado),
      tasaArancel: parseFloat(nuevaTasa)
    };

    console.log("JSON que se envía al backend:", JSON.stringify(payload));

    const respuesta = await fetch('http://localhost:4567/modificar-arancel', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
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
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Modificar Tasa Arancelaria</h2>

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
            <label className="block font-medium mb-1">Producto:</label>
            <select
              value={productoSeleccionado}
              onChange={e => setProductoSeleccionado(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
            >
              <option value="">Seleccione un producto</option>
              {productos.map(p => (
                <option key={p.idProducto} value={p.idProducto}>{p.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Nueva Tasa Arancelaria (%):</label>
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
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
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
