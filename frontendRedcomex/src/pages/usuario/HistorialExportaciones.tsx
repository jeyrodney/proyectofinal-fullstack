import { useState, useEffect } from 'react';
import type { Exportacion } from '../../types/ExportacionType';
import { History, BarChart3, Loader2, XCircle } from 'lucide-react'; // Importamos más iconos
import { useNavigate } from 'react-router-dom';

const HistorialExportaciones = () => {
  const [historial, setHistorial] = useState<Exportacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistorial = async () => {
      setLoading(true);
      setError(null);
      const usuarioInfo = JSON.parse(localStorage.getItem('usuario') || '{}');

      if (!usuarioInfo || !usuarioInfo.usuario_id) {
        setError('No se encontró información del usuario. Por favor, inicie sesión nuevamente.');
        setLoading(false);
        setTimeout(() => navigate('/login'), 1500); // Redirigir al login
        return;
      }

      try {
        const response = await fetch(`http://localhost:4567/historial-exportaciones/${usuarioInfo.usuario_id}`);
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        // Asegúrate de que los datos tengan la estructura esperada
        if (!Array.isArray(data)) {
          console.error("La respuesta de la API no es un array:", data);
          throw new Error("Formato de datos de historial inesperado.");
        }
        setHistorial(data);
      } catch (err: any) {
        console.error('Error fetching historial:', err);
        setError('No se pudo cargar el historial de exportaciones. Por favor, intente de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [navigate]); // Añadir navigate como dependencia para evitar advertencias

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0, // Ajustar a 0 si solo se manejan números enteros en COP
      maximumFractionDigits: 2, // o 2 si se manejan decimales
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Opciones para formato de fecha. Ejemplo: "25 de julio de 2025"
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('es-ES', options);
    } catch (e) {
      console.error("Error al formatear fecha:", dateString, e);
      return dateString; // Devuelve el string original si hay un error
    }
  };

  return (
    <div className="bg-gray-50 py-10 px-4 flex justify-center items-start">
      <div className="max-w-7xl w-full bg-white shadow-xl rounded-lg p-8 border border-emerald-100"> {/* Mayor ancho para la tabla */}
        <div className="flex items-center justify-center mb-8">
          <History className="w-10 h-10 text-emerald-600 mr-3" />
          <h2 className="text-3xl font-bold text-emerald-800">Historial de Exportaciones</h2>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-lg">
            <Loader2 className="animate-spin h-10 w-10 text-emerald-500 mb-4" />
            <p className="text-lg text-emerald-700">Cargando historial de exportaciones...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-48 bg-red-100 border border-red-400 text-red-700 rounded-lg p-6">
            <XCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="font-bold text-xl mb-2">¡Error al cargar el historial!</p>
            <p className="text-center">{error}</p>
          </div>
        )}

        {!loading && !error && (
          historial.length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200"> {/* Contenedor para scroll horizontal */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-emerald-50"> {/* Cabecera de tabla con color */}
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">País</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">Cantidad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">Valor Unitario</th> {/* Nuevo campo para el valor unitario */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">Total Exportado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">Arancel Cobrado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">Estado</th> {/* Nuevo campo para el estado */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {historial.map((exportacion) => (
                    <tr key={exportacion.idExportacion} className="hover:bg-emerald-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exportacion.producto || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exportacion.pais || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exportacion.cantidad?.toLocaleString() || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(exportacion.fechaExp)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{formatCurrency(exportacion.valorUnitario || 0)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{formatCurrency(exportacion.total || 0)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(exportacion.arancelCobrado || 0)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          exportacion.estadoExportacion === 'Completado' ? 'bg-green-100 text-green-800' :
                          exportacion.estadoExportacion === 'En tránsito' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {exportacion.estadoExportacion || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-600 py-20 flex flex-col items-center justify-center bg-gray-100 rounded-lg">
              <BarChart3 className="w-20 h-20 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-2">¡No tienes exportaciones registradas aún!</h3>
              <p className="text-lg max-w-xl">Comienza a registrar tus operaciones de exportación utilizando la opción "Agregar Exportación" en el menú principal.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default HistorialExportaciones;