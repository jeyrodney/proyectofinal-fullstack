import { useState, useEffect } from 'react';
import ChartsHome from './ChartsHome'; // Importa el componente de las gráficas

const Dashboard = ({ usuarioId }: { usuarioId: number }) => {
  const [topEmpresas, setTopEmpresas] = useState<any[]>([]);
  const [topPaises, setTopPaises] = useState<any[]>([]);
  const [topAranceles, setTopAranceles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga
  const [error, setError] = useState<string | null>(null); // Nuevo estado para errores

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Obtener datos de las 3 consultas
        const empresasRes = await fetch('http://localhost:4567/dashboard/top-empresas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario_id: usuarioId }),
        });
        if (!empresasRes.ok) throw new Error('Error al obtener Top Empresas');
        const empresasData = await empresasRes.json();
        setTopEmpresas(empresasData);

        const paisesRes = await fetch('http://localhost:4567/dashboard/top-paises', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario_id: usuarioId }),
        });
        if (!paisesRes.ok) throw new Error('Error al obtener Top Países');
        const paisesData = await paisesRes.json();
        setTopPaises(paisesData);

        const arancelesRes = await fetch('http://localhost:4567/dashboard/top-aranceles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario_id: usuarioId }),
        });
        if (!arancelesRes.ok) throw new Error('Error al obtener Top Aranceles');
        const arancelesData = await arancelesRes.json();
        setTopAranceles(arancelesData);

      } catch (err: any) {
        setError(err.message || 'Ocurrió un error al cargar los datos del dashboard.');
      } finally {
        setLoading(false);
      }
    };

    if (usuarioId) { // Asegúrate de que usuarioId esté definido antes de hacer el fetch
      fetchData();
    }
  }, [usuarioId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"></div>
        <p className="ml-4 text-emerald-700">Cargando datos del Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <p className="font-bold">¡Error!</p>
        <p>{error}</p>
        <p className="mt-2 text-sm">Por favor, inténtalo de nuevo más tarde o contacta a soporte.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      <main className="max-w-6xl mx-auto py-8"> {/* Ajuste del padding y ancho máximo */}
        <h1 className="text-4xl font-extrabold text-emerald-800 mb-8 text-center">
          Resumen de Exportaciones <span className="text-emerald-600">Administrativo</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"> {/* Más separación vertical */}
          {/* Tarjeta de Top 5 Empresas */}
          <div className="bg-white shadow-xl rounded-lg p-6 border border-emerald-100 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-center text-emerald-700 mb-5 border-b pb-3 border-emerald-200">
              Top 5 Empresas Exportadoras
            </h2>
            <ul className="divide-y divide-gray-200"> {/* Divisores entre ítems */}
              {topEmpresas.length > 0 ? topEmpresas.map((empresa, index) => (
                <li key={empresa.empresaNombre || index} className="flex justify-between items-center py-3 text-lg">
                  <span className="font-medium text-gray-700">{empresa.empresaNombre}</span>
                  <span className="text-emerald-600 font-semibold">{empresa.totalExportaciones} unidades</span>
                </li>
              )) : <p className="text-gray-500 text-center py-4">No hay datos de empresas.</p>}
            </ul>
          </div>

          {/* Tarjeta de Top 5 Países */}
          <div className="bg-white shadow-xl rounded-lg p-6 border border-emerald-100 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-center text-emerald-700 mb-5 border-b pb-3 border-emerald-200">
              Top 5 Países Destino
            </h2>
            <ul className="divide-y divide-gray-200">
              {topPaises.length > 0 ? topPaises.map((pais, index) => (
                <li key={pais.paisNombre || index} className="flex justify-between items-center py-3 text-lg">
                  <span className="font-medium text-gray-700">{pais.paisNombre}</span>
                  <span className="text-emerald-600 font-semibold">{pais.totalExportaciones} unidades</span>
                </li>
              )) : <p className="text-gray-500 text-center py-4">No hay datos de países.</p>}
            </ul>
          </div>

          {/* Tarjeta de Top 5 Aranceles */}
          <div className="bg-white shadow-xl rounded-lg p-6 border border-emerald-100 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-center text-emerald-700 mb-5 border-b pb-3 border-emerald-200">
              Top 5 Aranceles por Producto/País
            </h2>
            <ul className="divide-y divide-gray-200">
              {topAranceles.length > 0 ? topAranceles.map((arancel, index) => (
                <li key={arancel.productoNombre + arancel.paisNombre || index} className="flex justify-between items-center py-3 text-lg">
                  <span className="font-medium text-gray-700">{arancel.productoNombre} ({arancel.paisNombre})</span>
                  <span className="text-emerald-600 font-semibold">{arancel.tasaArancel}%</span>
                </li>
              )) : <p className="text-gray-500 text-center py-4">No hay datos de aranceles.</p>}
            </ul>
          </div>
        </div>

        {/* Sección de Gráficas (ChartsHome) */}
        <section className="bg-white p-8 rounded-xl shadow-xl border border-emerald-100"> {/* Fondo blanco, padding, bordes redondeados, sombra más suave */}
          <h3 className="text-3xl font-extrabold text-center mb-8 text-emerald-800">
            Estadísticas Globales de <span className="text-emerald-600">Exportaciones</span>
          </h3>
          <ChartsHome /> {/* Tu componente de gráficas */}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;