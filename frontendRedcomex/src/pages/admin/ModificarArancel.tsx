import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Percent, Globe, Package, Save } from 'lucide-react'; // Importar iconos de Lucide React

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paisesRes, productosRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/paises`),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/productos`)
        ]);

        if (!paisesRes.ok) throw new Error('Error al cargar países.');
        if (!productosRes.ok) throw new Error('Error al cargar productos.');

        const paisesData = await paisesRes.json();
        const productosData = await productosRes.json();

        setPaises(paisesData);
        setProductos(productosData);
      } catch (err: any) {
        setMessage({ type: 'error', text: err.message || 'Error al cargar datos iniciales.' });
      }
    };
    fetchData();
  }, []);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); // Limpiar mensajes previos

    if (!paisSeleccionado || !productoSeleccionado || nuevaTasa === '') {
      setMessage({ type: 'error', text: 'Por favor, complete todos los campos.' });
      setLoading(false);
      return;
    }

    const payload = {
      idPais: parseInt(paisSeleccionado),
      idProducto: parseInt(productoSeleccionado),
      tasaArancel: parseFloat(nuevaTasa)
    };

    try {
      const respuesta = await fetch(`${import.meta.env.VITE_API_BASE_URL}/modificar-arancel`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        setMessage({ type: 'success', text: resultado.mensaje || 'Tasa arancelaria actualizada exitosamente.' });
        // Limpiar los campos después de la actualización
        setPaisSeleccionado('');
        setProductoSeleccionado('');
        setNuevaTasa('');
        // Navegar después de un pequeño retraso para que el usuario vea el mensaje
        setTimeout(() => navigate('/menu-admin'), 1500);
      } else {
        setMessage({ type: 'error', text: resultado.error || 'Error al modificar la tasa arancelaria.' });
      }
    } catch (error) {
      console.error('Error de red:', error);
      setMessage({ type: 'error', text: 'Error al conectar con el servidor. Por favor, inténtalo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-10 px-4 flex justify-center items-center">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-lg p-8 border border-emerald-100">
        <div className="flex items-center justify-center mb-8">
          <Percent className="w-10 h-10 text-emerald-600 mr-3" /> {/* Icono representativo */}
          <h2 className="text-3xl font-bold text-emerald-800">Modificar Tasa Arancelaria</h2>
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded-lg text-center ${
            message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 
            'bg-red-100 text-red-800 border border-red-300'
          }`}>
            <p>{message.text}</p>
          </div>
        )}

        <form onSubmit={manejarEnvio} className="space-y-6"> {/* Espaciado consistente */}
          {/* Campo País */}
          <div>
            <label htmlFor="pais" className="block text-gray-700 text-sm font-semibold mb-2">
              <Globe className="inline-block w-4 h-4 mr-2 text-emerald-500" /> País:
            </label>
            <select
              id="pais"
              value={paisSeleccionado}
              onChange={e => setPaisSeleccionado(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
            >
              <option value="">-- Seleccione un país --</option> {/* Mejor texto para placeholder */}
              {paises.length > 0 ? (
                paises.map(p => (
                  <option key={p.idPais} value={p.idPais}>{p.nombre}</option>
                ))
              ) : (
                <option disabled>Cargando países...</option>
              )}
            </select>
          </div>

          {/* Campo Producto */}
          <div>
            <label htmlFor="producto" className="block text-gray-700 text-sm font-semibold mb-2">
              <Package className="inline-block w-4 h-4 mr-2 text-emerald-500" /> Producto:
            </label>
            <select
              id="producto"
              value={productoSeleccionado}
              onChange={e => setProductoSeleccionado(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
            >
              <option value="">-- Seleccione un producto --</option> {/* Mejor texto para placeholder */}
              {productos.length > 0 ? (
                productos.map(p => (
                  <option key={p.idProducto} value={p.idProducto}>{p.nombre}</option>
                ))
              ) : (
                <option disabled>Cargando productos...</option>
              )}
            </select>
          </div>

          {/* Campo Nueva Tasa Arancelaria */}
          <div>
            <label htmlFor="nuevaTasa" className="block text-gray-700 text-sm font-semibold mb-2">
              <Percent className="inline-block w-4 h-4 mr-2 text-emerald-500" /> Nueva Tasa Arancelaria (%):
            </label>
            <input
              type="number"
              id="nuevaTasa"
              step="0.01"
              min="0"
              value={nuevaTasa}
              onChange={e => setNuevaTasa(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
              placeholder="Ej: 15.75" // Placeholder para guía
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-4 pt-4">

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 flex items-center shadow-md"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              {loading ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}