import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { BarChart3, TrendingUp, Globe, Loader2, XCircle } from 'lucide-react'; // Importamos iconos útiles

// Definiciones de tipos para los datos
interface ExportacionPorEmpresa {
  mes: string; // Ya transformado a nombre de mes
  total_exportaciones: number;
  empresa_nombre: string;
}

interface ExportacionPorPais {
  pais: string;
  cantidad: number;
}

// Función para obtener los datos de exportaciones por empresa
const fetchExportacionesPorEmpresa = async (usuarioId: number) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reportes/exportaciones-por-empresa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario_id: usuarioId }),
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();

    // Mapeamos los datos para reemplazar el número del mes por el nombre del mes
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return data.map((item: any) => ({
      ...item,
      mes: meses[item.mes - 1],  // Reemplazar número de mes con nombre del mes
    }));
  } catch (error) {
    console.error('Error al obtener exportaciones por empresa:', error);
    throw error; // Re-lanza el error para que el componente lo maneje
  }
};

// Función para obtener los datos de exportaciones por país
const fetchExportacionesPorPais = async (usuarioId: number) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reportes/exportaciones-por-pais`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario_id: usuarioId }),
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener exportaciones por país:', error);
    throw error; // Re-lanza el error para que el componente lo maneje
  }
};

const DashboardUsuario = ({ usuarioId }: { usuarioId: number }) => {
  const [exportacionesPorEmpresa, setExportacionesPorEmpresa] = useState<ExportacionPorEmpresa[]>([]);
  const [exportacionesPorPais, setExportacionesPorPais] = useState<ExportacionPorPais[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      setLoading(true);
      setError(null);
      if (!usuarioId) {
        setError('ID de usuario no proporcionado.');
        setLoading(false);
        return;
      }
      try {
        const dataEmpresa = await fetchExportacionesPorEmpresa(usuarioId);
        setExportacionesPorEmpresa(dataEmpresa);

        const dataPais = await fetchExportacionesPorPais(usuarioId);
        setExportacionesPorPais(dataPais);

      } catch (err: any) {
        setError('Error al cargar los datos del dashboard. ' + (err.message || 'Verifique su conexión.'));
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, [usuarioId]);

  // Función para agrupar los datos por empresa (para las gráficas de línea)
  const agruparPorEmpresa = (data: ExportacionPorEmpresa[]) => {
    return data.reduce((agrupado: { [key: string]: ExportacionPorEmpresa[] }, item: ExportacionPorEmpresa) => {
      const { empresa_nombre } = item;
      if (!agrupado[empresa_nombre]) {
        agrupado[empresa_nombre] = [];
      }
      agrupado[empresa_nombre].push(item);
      return agrupado;
    }, {});
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Gráfica de línea de tiempo por empresa
  const renderLineCharts = () => {
    if (exportacionesPorEmpresa.length === 0) {
      return (
        <div className="text-center text-gray-600 py-10 bg-gray-50 rounded-lg">
          <p>No hay datos de exportaciones mensuales por empresa disponibles.</p>
        </div>
      );
    }

    const empresasAgrupadas = agruparPorEmpresa(exportacionesPorEmpresa);

    return Object.keys(empresasAgrupadas).map((empresa) => {
      const dataEmpresa = empresasAgrupadas[empresa];
      return (
        <div key={empresa} className="bg-white shadow-md rounded-lg p-6 mb-8 border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-emerald-600" /> Rendimiento Mensual: {empresa}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataEmpresa} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="mes" className="text-sm" />
              <YAxis tickFormatter={(tick) => formatCurrency(tick)} className="text-sm" />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="total_exportaciones"
                stroke="#059669" // Un tono de verde más vivo
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    });
  };

  // Gráfica de barras por país
  const renderBarChart = () => {
    if (exportacionesPorPais.length === 0) {
      return (
        <div className="text-center text-gray-600 py-10 bg-gray-50 rounded-lg">
          <p>No hay datos de exportaciones por país disponibles.</p>
        </div>
      );
    }
    return (
      <div className="bg-white shadow-md rounded-lg p-6 border border-emerald-100">
        <h3 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-emerald-600" /> Exportaciones por País Destino
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={exportacionesPorPais} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="pais" className="text-sm" />
            <YAxis tickFormatter={(tick) => tick.toLocaleString()} className="text-sm" />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#10B981" /> {/* Un tono de verde */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 py-10 px-4 flex justify-center items-start">
      <div className="max-w-7xl w-full bg-white shadow-xl rounded-lg p-8 border border-emerald-100">
        <div className="flex items-center justify-center mb-8">
          <BarChart3 className="w-10 h-10 text-emerald-600 mr-3" />
          <h2 className="text-3xl font-bold text-emerald-800">Dashboard de Exportaciones</h2>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
            <Loader2 className="animate-spin h-12 w-12 text-emerald-500 mb-4" />
            <p className="text-lg text-emerald-700">Cargando datos del dashboard...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-64 bg-red-100 border border-red-400 text-red-700 rounded-lg p-6 text-center">
            <XCircle className="w-14 h-14 text-red-500 mb-4" />
            <p className="font-bold text-xl mb-2">¡Error al cargar el dashboard!</p>
            <p className="text-base">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200">Ganancias Totales Mensuales por Empresa</h2>
            {renderLineCharts()}

            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-10 border-b pb-3 border-gray-200">Volumen de Exportaciones por País</h2>
            {renderBarChart()}

            {/* Mensaje si no hay ningún tipo de dato */}
            {exportacionesPorEmpresa.length === 0 && exportacionesPorPais.length === 0 && (
              <div className="text-center text-gray-600 py-20 flex flex-col items-center justify-center bg-gray-100 rounded-lg mt-8">
                <BarChart3 className="w-20 h-20 text-emerald-400 mb-6" />
                <h3 className="text-2xl font-semibold mb-2">¡No hay datos para mostrar en el dashboard aún!</h3>
                <p className="text-lg max-w-xl">Registra algunas exportaciones y empresas para ver tus estadísticas aquí.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardUsuario;