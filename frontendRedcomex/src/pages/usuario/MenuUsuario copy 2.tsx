import { useState } from 'react';
import { LogOut, Briefcase, Truck, FileText } from 'lucide-react';
import AgregarEmpresa from './AgregarEmpresa';
import AgregarExportacion from './AgregarExportacion';
import HistorialExportaciones from './HistorialExportaciones';
import { useNavigate } from 'react-router-dom';

function MenuUsuario() {
  const [usuario, setUsuario] = useState<{ usuario: string; correo: string } | null>(null);
  const [seccionActiva, setSeccionActiva] = useState<string>(''); // Controlar qué sección mostrar
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null); // Limpiar los datos del usuario
    setSeccionActiva(''); // Restablecer la sección activa
    navigate('/'); // Redirigir al inicio o a la página de login
  };

  const manejarNavegacion = (seccion: string) => {
    setSeccionActiva(seccion);  // Cambiar la sección activa
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-indigo-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-2xl font-bold">Menú del Usuario</h1>
          {usuario && (
            <p className="text-sm text-indigo-200">
              Bienvenido <strong>{usuario.usuario}</strong> | {usuario.correo}
            </p>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition text-sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar sesión
        </button>
      </header>

      {/* Opciones */}
      <main className="px-6 py-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            className="bg-white shadow hover:shadow-lg rounded-lg p-6 cursor-pointer border border-gray-100 transition"
            onClick={() => manejarNavegacion('agregarEmpresa')}
          >
            <Briefcase className="text-indigo-600 w-6 h-6 mb-2" />
            <h3 className="font-bold text-lg">Agregar Empresa</h3>
            <p className="text-sm text-gray-600 mt-1">Registrar una nueva empresa vinculada a tu usuario.</p>
          </div>

          <div
            className="bg-white shadow hover:shadow-lg rounded-lg p-6 cursor-pointer border border-gray-100 transition"
            onClick={() => manejarNavegacion('agregarExportacion')}
          >
            <Truck className="text-green-600 w-6 h-6 mb-2" />
            <h3 className="font-bold text-lg">Agregar Exportación</h3>
            <p className="text-sm text-gray-600 mt-1">Registra una nueva exportación de tus productos.</p>
          </div>

          <div
            className="bg-white shadow hover:shadow-lg rounded-lg p-6 cursor-pointer border border-gray-100 transition"
            onClick={() => manejarNavegacion('historialExportaciones')}
          >
            <FileText className="text-blue-600 w-6 h-6 mb-2" />
            <h3 className="font-bold text-lg">Historial Exportaciones</h3>
            <p className="text-sm text-gray-600 mt-1">Consulta el resumen de tus exportaciones registradas.</p>
          </div>
        </div>

        {/* Mostrar el componente correspondiente basado en el estado */}
        {seccionActiva === 'agregarEmpresa' && <AgregarEmpresa />}
        {seccionActiva === 'agregarExportacion' && <AgregarExportacion />}
        {seccionActiva === 'historialExportaciones' && <HistorialExportaciones />}
      </main>
    </div>
  );
}

export default MenuUsuario;
