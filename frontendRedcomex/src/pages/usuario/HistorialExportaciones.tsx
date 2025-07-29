import { useState, useEffect } from 'react';
import type { Exportacion } from '../../types/ExportacionType';

const HistorialExportaciones = () => {
  const [historial, setHistorial] = useState<Exportacion[]>([]);  // Especificamos el tipo del estado
  
  useEffect(() => {
    const usuarioId = JSON.parse(localStorage.getItem('usuario') || '{}').usuario_id;
    fetch(`http://localhost:4567/historial-exportaciones/${usuarioId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Respuesta del backend:', data);  // Ver la respuesta completa
        setHistorial(data);
      })
      .catch((error) => console.error('Error fetching historial:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-indigo-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Historial de Exportaciones</h1>
      </header>

      <main className="px-6 py-10 max-w-5xl mx-auto">
        {historial.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-left">Producto</th>
                <th className="border-b px-4 py-2 text-left">País</th>
                <th className="border-b px-4 py-2 text-left">Cantidad</th>
                <th className="border-b px-4 py-2 text-left">Fecha</th>
                <th className="border-b px-4 py-2 text-left">Total</th>
                <th className="border-b px-4 py-2 text-left">Arancel Cobrado</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((exportacion) => (
                <tr key={exportacion.idExportacion} className="hover:bg-gray-100">
                  <td className="border-b px-4 py-2">{exportacion.producto}</td>
                  <td className="border-b px-4 py-2">{exportacion.pais}</td>
                  <td className="border-b px-4 py-2">{exportacion.cantidad}</td>
                  <td className="border-b px-4 py-2">{exportacion.fechaExp}</td>
                  <td className="border-b px-4 py-2">{exportacion.total}</td>
                  <td className="border-b px-4 py-2">{exportacion.arancelCobrado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron exportaciones registradas.</p>
        )}
      </main>
    </div>
  );
};

export default HistorialExportaciones;
