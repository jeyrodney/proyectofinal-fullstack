import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Briefcase, Truck, FileText, LayoutDashboard } from 'lucide-react';
import NuevoAdmin from './NuevoAdmin'; // Asegúrate de importar las vistas que mostrarás
import ModificarArancel from './ModificarArancel'; // Importar la vista de Modificar Arancel
import ActualizarTasaCambio from './ActualizarTasaCambio'; // Importar la vista de Actualizar Tasa de Cambio
import GenerarReporte from '../../components/ReportesAdmin'; // Importar la vista para Reportes
import Dashboard from '../../components/Dashboard';

const MenuAdmin = () => {
  const [info, setInfo] = useState<{ usuario_id: number; usuario: string; correo: string } | null>(null);
  const [seccionActiva, setSeccionActiva] = useState<string>(''); // Controlar qué sección mostrar
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      //setInfo(parsedUser);
      setInfo({
        usuario_id: parsedUser.usuario_id, // Asegúrate de que esta propiedad esté presente en localStorage
        usuario: parsedUser.usuario,
        correo: parsedUser.correo,
      });
    }
  }, []);

  const usuarioId = JSON.parse(localStorage.getItem('usuario') || '{}').usuario_id;

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const manejarNavegacion = (seccion: string) => {
    setSeccionActiva(seccion);  // Cambiar la sección activa
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-indigo-700 text-white flex flex-col">
        <div className="flex items-center justify-center py-6">
          <h1 className="text-2xl font-semibold">RedComex</h1>
        </div>

        <div className="flex-grow px-4 py-6">
          <div className="space-y-4">
            <button 
              onClick={() => manejarNavegacion('dashboard')} 
              className="w-full text-left text-white py-2 px-4 rounded hover:bg-indigo-600"
            >
              <LayoutDashboard className="inline-block mr-2" /> Dashboard
            </button>
            <button 
              onClick={() => manejarNavegacion('nuevoAdmin')} 
              className="w-full text-left text-white py-2 px-4 rounded hover:bg-indigo-600"
            >
              <Briefcase className="inline-block mr-2" /> Agregar Administrador
            </button>

            <button 
              onClick={() => manejarNavegacion('modificarArancel')} 
              className="w-full text-left text-white py-2 px-4 rounded hover:bg-indigo-600"
            >
              <FileText className="inline-block mr-2" /> Modificar Aranceles
            </button>

            <button 
              onClick={() => manejarNavegacion('actualizarTasaCambio')} 
              className="w-full text-left text-white py-2 px-4 rounded hover:bg-indigo-600"
            >
              <Truck className="inline-block mr-2" /> Actualizar Tasa de Cambio
            </button>

            <button 
              onClick={() => manejarNavegacion('generarReporte')} 
              className="w-full text-left text-white py-2 px-4 rounded hover:bg-indigo-600"
            >
              <FileText className="inline-block mr-2" /> Generar Reporte
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Barra superior */}
        <div className="bg-indigo-700 text-white flex justify-between items-center p-4 rounded-t-lg">
          <h2 className="text-2xl font-semibold">Menú del Administrador</h2>
                    {info && (
            <p className="text-sm text-indigo-200">
              Bienvenido <strong>{info.usuario}</strong> | {info.correo}
            </p>
          )}
          <button 
            onClick={handleLogout} 
            className="hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            <LogOut className="inline-block mr-2" /> Cerrar Sesión
          </button>
        </div>

        <div className="mt-4">
          {seccionActiva === 'dashboard' && <Dashboard usuarioId={usuarioId} />}
          {seccionActiva === 'nuevoAdmin' && <NuevoAdmin />}
          {seccionActiva === 'modificarArancel' && <ModificarArancel />}
          {seccionActiva === 'actualizarTasaCambio' && <ActualizarTasaCambio />}
          {seccionActiva === 'generarReporte' && <GenerarReporte />}
        </div>
      </div>
    </div>
  );
};

export default MenuAdmin;

