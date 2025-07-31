import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCcw, DollarSign, Globe, Save } from 'lucide-react'; // Importar iconos

interface Pais {
  idPais: number;
  nombre: string;
  tasaCambio: number; // Asegúrate de que esta propiedad venga del backend si quieres mostrar la tasa actual
}

export default function ActualizarTasaCambio() {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [nuevaTasa, setNuevaTasa] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/paises`);
        if (!res.ok) throw new Error('Error al cargar países.');
        const data = await res.json();
        setPaises(data);
      } catch (err: any) {
        setMessage({ type: 'error', text: err.message || 'Error al cargar los países para la tasa de cambio.' });
      }
    };
    fetchPaises();
  }, []);

  // Opcional: Cargar la tasa actual del país seleccionado al cambiar la selección
  useEffect(() => {
    if (paisSeleccionado) {
      const selectedPais = paises.find(p => p.idPais.toString() === paisSeleccionado);
      if (selectedPais?.tasaCambio) {
        setNuevaTasa(selectedPais.tasaCambio.toString()); // Establece la tasa actual como valor inicial
      } else {
        setNuevaTasa(''); // Limpia si no hay tasa o el país no tiene una
      }
    } else {
      setNuevaTasa(''); // Limpiar cuando no hay país seleccionado
    }
  }, [paisSeleccionado, paises]);


  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); // Limpiar mensajes previos

    if (!paisSeleccionado || nuevaTasa === '') {
      setMessage({ type: 'error', text: 'Por favor, seleccione un país y/o ingrese una nueva tasa.' });
      setLoading(false);
      return;
    }

    // Validar que la nueva tasa sea un número positivo
    const tasaValidada = parseFloat(nuevaTasa);
    if (isNaN(tasaValidada) || tasaValidada < 0) {
      setMessage({ type: 'error', text: 'Por favor, ingrese una tasa de cambio válida y positiva.' });
      setLoading(false);
      return;
    }

    try {
      const respuesta = await fetch(`${import.meta.env.VITE_API_BASE_URL}/actualizar-tasa-cambio`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idPais: parseInt(paisSeleccionado),
          tasaCambio: tasaValidada // Usar la tasa validada
        })
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        setMessage({ type: 'success', text: resultado.mensaje || 'Tasa de cambio actualizada exitosamente.' });
        // Actualizar la tasa en el estado 'paises' para reflejar el cambio en la UI sin refetch completo
        setPaises(prevPaises =>
          prevPaises.map(p =>
            p.idPais.toString() === paisSeleccionado ? { ...p, tasaCambio: tasaValidada } : p
          )
        );
        // Limpiar los campos después de la actualización exitosa
        setPaisSeleccionado('');
        setNuevaTasa('');
        
        // Redirigir al menú del administrador después de un pequeño retraso
        setTimeout(() => navigate('/menu-admin'), 1500);
      } else {
        setMessage({ type: 'error', text: resultado.error || 'Error al actualizar la tasa de cambio.' });
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
          <RefreshCcw className="w-10 h-10 text-emerald-600 mr-3" /> {/* Icono de actualización */}
          <h2 className="text-3xl font-bold text-emerald-800">Actualizar Tasa de Cambio</h2>
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded-lg text-center ${
            message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 
            'bg-red-100 text-red-800 border border-red-300'
          }`}>
            <p>{message.text}</p>
          </div>
        )}

        <form onSubmit={manejarEnvio} className="space-y-6">
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
              <option value="">-- Seleccione un país --</option>
              {paises.length > 0 ? (
                paises.map(p => (
                  <option key={p.idPais} value={p.idPais}>{p.nombre}</option>
                ))
              ) : (
                <option disabled>Cargando países...</option>
              )}
            </select>
          </div>

          {/* Campo Nueva Tasa de Cambio */}
          <div>
            <label htmlFor="nuevaTasa" className="block text-gray-700 text-sm font-semibold mb-2">
              <DollarSign className="inline-block w-4 h-4 mr-2 text-emerald-500" /> Nueva Tasa de Cambio (moneda extranjera equivalente a 1 COP):
            </label>
            <input
              type="number"
              id="nuevaTasa"
              step="0.000001"
              min="0"
              value={nuevaTasa}
              onChange={e => setNuevaTasa(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
              placeholder="Ej: 0.0024"
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