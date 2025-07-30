import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AgregarAdmin from './NuevoAdmin'; // Asegúrate de importar las vistas que mostrarás
import ModificarArancel from './ModificarArancel'; // Importar la vista de Modificar Arancel
import ActualizarTasaCambio from './ActualizarTasaCambio'; // Importar la vista de Actualizar Tasa de Cambio
import GenerarReporte from '../reportes/ReporteExportaciones'; // Importar la vista para Reportes

export default function MenuAdmin() {
  const navigate = useNavigate();
  const [info, setInfo] = useState<{ usuario: string; correo: string } | null>(null);
  const [seccionActiva, setSeccionActiva] = useState<string>(''); // Controlar qué sección mostrar

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setInfo(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const manejarNavegacion = (seccion: string) => {
    setSeccionActiva(seccion);  // Cambiar la sección activa
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-indigo-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Menú del Administrador</h1>
        {info && (
          <p className="text-sm text-indigo-200">
            Bienvenido <strong>{info.usuario}</strong> | {info.correo}
          </p>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition text-sm"
        >
          Cerrar sesión
        </button>
      </header>

      <main className="px-6 py-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            className="bg-white shadow hover:shadow-lg rounded-lg p-6 cursor-pointer border border-gray-100 transition"
            onClick={() => manejarNavegacion('agregarAdmin')}
          >
            <h3 className="font-bold text-lg">Agregar Administrador</h3>
            <p className="text-sm text-gray-600 mt-1">Registra un nuevo administrador.</p>
          </div>

          <div
            className="bg-white shadow hover:shadow-lg rounded-lg p-6 cursor-pointer border border-gray-100 transition"
            onClick={() => manejarNavegacion('modificarArancel')}
          >
            <h3 className="font-bold text-lg">Modificar Aranceles</h3>
            <p className="text-sm text-gray-600 mt-1">Edita los aranceles de exportación.</p>
          </div>

          <div
            className="bg-white shadow hover:shadow-lg rounded-lg p-6 cursor-pointer border border-gray-100 transition"
            onClick={() => manejarNavegacion('actualizarTasaCambio')}
          >
            <h3 className="font-bold text-lg">Actualizar Tasa de Cambio</h3>
            <p className="text-sm text-gray-600 mt-1">Actualiza las tasas de cambio de las exportaciones.</p>
          </div>

          <div
            className="bg-white shadow hover:shadow-lg rounded-lg p-6 cursor-pointer border border-gray-100 transition"
            onClick={() => manejarNavegacion('generarReporte')}
          >
            <h3 className="font-bold text-lg">Generar Reporte</h3>
            <p className="text-sm text-gray-600 mt-1">Genera reportes de las exportaciones.</p>
          </div>
        </div>

        {/* Mostrar el componente correspondiente basado en el estado */}
        {seccionActiva === 'agregarAdmin' && <AgregarAdmin />}
        {seccionActiva === 'modificarArancel' && <ModificarArancel />}
        {seccionActiva === 'actualizarTasaCambio' && <ActualizarTasaCambio />}
        {seccionActiva === 'generarReporte' && <GenerarReporte />}
      </main>
    </div>
  );
}
