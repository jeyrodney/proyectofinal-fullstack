import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';

// Función para obtener los datos de exportaciones por empresa
const fetchExportacionesPorEmpresa = async (usuarioId: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reportes/exportaciones-por-empresa`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ usuario_id: usuarioId }),
  });
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
};

// Función para obtener los datos de exportaciones por país
const fetchExportacionesPorPais = async (usuarioId: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reportes/exportaciones-por-pais`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ usuario_id: usuarioId }),
  });
  const data = await res.json();
  return data;
};

const Reportes = ({ usuarioId }: { usuarioId: number }) => {
  const [exportacionesPorEmpresa, setExportacionesPorEmpresa] = useState<any[]>([]);
  const [exportacionesPorPais, setExportacionesPorPais] = useState<any[]>([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const dataEmpresa = await fetchExportacionesPorEmpresa(usuarioId);
      setExportacionesPorEmpresa(dataEmpresa);

      const dataPais = await fetchExportacionesPorPais(usuarioId);
      setExportacionesPorPais(dataPais);
    };

    obtenerDatos();
  }, [usuarioId]);

  // Función para agrupar los datos por empresa
  const agruparPorEmpresa = (data: any[]) => {
    return data.reduce((agrupado: any, item: any) => {
      const { empresa_nombre } = item;
      if (!agrupado[empresa_nombre]) {
        agrupado[empresa_nombre] = [];
      }
      agrupado[empresa_nombre].push(item);
      return agrupado;
    }, {});
  };

  // Gráfica de línea de tiempo por empresa
  const renderLineCharts = () => {
    const empresasAgrupadas = agruparPorEmpresa(exportacionesPorEmpresa);
    
    return Object.keys(empresasAgrupadas).map((empresa) => {
      const dataEmpresa = empresasAgrupadas[empresa];
      return (
        <div key={empresa} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{empresa}</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={dataEmpresa} margin={{ top: 20, right: 30, left: 50, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis tickFormatter={(tick) => tick.toLocaleString()} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total_exportaciones" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    });
  };

  // Gráfica de barras por país
  const renderBarChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={exportacionesPorPais}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="pais" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-indigo-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Reportes</h1>
      </header>

      <main className="px-6 py-10 max-w-5xl mx-auto">
        {/* Graficas de línea de tiempo */}
        <h2 className="text-xl font-bold mb-4">Ganancias Totales Mensuales</h2>
        {renderLineCharts()}

        {/* Gráfica de barras */}
        <h2 className="text-xl font-bold mb-4 mt-8">Exportaciones por País</h2>
        {renderBarChart()}
      </main>
    </div>
  );
};

export default Reportes;
