// src/components/ChartsHome.tsx
import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend, Cell
} from 'recharts';

interface ProductoPais {
  pais: string;
  producto: string;
  volumen: number;
}

interface VolumenMes {
  mes: string;
  volumen: number;
}

export default function ChartsHome() {
  const [topDatos, setTopDatos] = useState<ProductoPais[]>([]);
  const [mesDatos, setMesDatos] = useState<VolumenMes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [topRes, mesRes] = await Promise.all([
          fetch('http://localhost:4567/top-productos-por-pais'),
          fetch('http://localhost:4567/volumen-por-mes')
        ]);

        if (!topRes.ok) throw new Error('Error al cargar datos de productos por país.');
        if (!mesRes.ok) throw new Error('Error al cargar datos de volumen mensual.');

        const topData = await topRes.json();
        const mesData = await mesRes.json();

        setTopDatos(topData);
        setMesDatos(mesData);
      } catch (err: any) {
        setError(err.message || 'No se pudieron cargar las gráficas.');
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const PRODUCTO_COLORS: Record<string, string> = {
    Aguacate: '#22C55E', // Un verde más vibrante
    Café: '#7C2D12', // Un marrón oscuro más rico
    Banano: '#FACC15', // Un amarillo más intenso
    Flores: '#EC4899', // Un rosa más vívido
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-emerald-400"></div>
        <p className="ml-4 text-emerald-600">Cargando gráficas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-50 border border-red-300 text-red-600 rounded-lg">
        <p className="font-bold">¡Error al cargar las gráficas!</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10"> {/* Mayor separación entre gráficas */}
      {/* Gráfica de Productos más exportados por país */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h3 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
          Productos más exportados por país (Top 5)
        </h3>
        {topDatos.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topDatos} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" /> {/* Color de rejilla más suave */}
              <XAxis dataKey="pais" tick={{ fill: '#374151', fontSize: 13 }} />
              <YAxis tick={{ fill: '#374151', fontSize: 13 }} />
              <Tooltip cursor={{ fill: '#d1fae5', opacity: 0.6 }} /> {/* Fondo del tooltip más suave */}
              <Bar dataKey="volumen" name="Volumen" isAnimationActive={true} animationDuration={1200}>
                {topDatos.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={PRODUCTO_COLORS[entry.producto] || '#34D399'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-10">No hay datos disponibles para esta gráfica.</p>
        )}

        {/* Leyenda para Productos por País */}
        {topDatos.length > 0 && (
          <div className="flex flex-wrap justify-center mt-4 gap-4"> {/* Mejor espaciado y wrap */}
            {Object.entries(PRODUCTO_COLORS).map(([prod, color]) => (
              <div key={prod} className="flex items-center space-x-2 text-sm text-gray-700">
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} /> {/* Puntos de color redondeados */}
                <span>{prod}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gráfica de Volumen mensual de exportaciones */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h3 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
          Volumen mensual de exportaciones
        </h3>
        {mesDatos.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mesDatos}>
              <XAxis dataKey="mes" tick={{ fill: '#374151', fontSize: 13 }} />
              <YAxis tick={{ fill: '#374151', fontSize: 13 }} />
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <Tooltip cursor={{ fill: '#d1fae5', opacity: 0.6 }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="volumen"
                stroke="#10B981" // Un verde más vibrante para la línea
                name="Volumen (unidades)"
                strokeWidth={3} // Línea un poco más gruesa
                dot={{ stroke: '#10B981', strokeWidth: 2, r: 4 }} // Puntos más visibles
                activeDot={{ r: 6, fill: '#10B981', stroke: '#10B981', strokeWidth: 2 }} // Punto activo
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-10">No hay datos disponibles para esta gráfica.</p>
        )}
      </div>
    </div>
  );
}