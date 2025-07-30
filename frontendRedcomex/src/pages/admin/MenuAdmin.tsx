import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Briefcase, FileText, LayoutDashboard, DollarSign, BarChart2, UserCircle } from 'lucide-react'; // Añadí UserCircle para el icono de usuario
import NuevoAdmin from './NuevoAdmin'; // Asegúrate de importar las vistas que mostrarás
import ModificarArancel from './ModificarArancel'; // Importar la vista de Modificar Arancel
import ActualizarTasaCambio from './ActualizarTasaCambio'; // Importar la vista de Actualizar Tasa de Cambio
import GenerarReporte from '../../components/ReportesAdmin'; // Importar la vista para Reportes
import Dashboard from '../../components/Dashboard';

const MenuAdmin = () => {
  const [info, setInfo] = useState<{ usuario_id: number; usuario: string; correo: string } | null>(null);
  const [seccionActiva, setSeccionActiva] = useState<string>('dashboard'); // Controlar qué sección mostrar, inicia en dashboard
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setInfo({
        usuario_id: parsedUser.usuario_id,
        usuario: parsedUser.usuario,
        correo: parsedUser.correo,
      });
    } else {
      // Redirigir si no hay usuario logueado
      navigate('/login');
    }
  }, [navigate]);

  const usuarioId = JSON.parse(localStorage.getItem('usuario') || '{}').usuario_id;

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const manejarNavegacion = (seccion: string) => {
    setSeccionActiva(seccion); // Cambiar la sección activa
  };

  // Clase CSS para los botones de navegación activos e inactivos
  const getNavLinkClass = (seccion: string) => (
    `w-full text-left py-3 px-4 rounded-lg flex items-center transition-all duration-200 
     ${seccionActiva === seccion
        ? 'bg-emerald-600 text-white shadow-md'
        : 'text-emerald-100 hover:bg-emerald-700 hover:text-white'}`
  );

  return (
    <div className="flex min-h-screen bg-gray-50"> {/* Fondo más suave para el área de contenido */}
      {/* Sidebar de Navegación */}
      <div className="w-64 bg-emerald-800 text-white flex flex-col shadow-2xl"> {/* Color verde oscuro para sidebar y sombra más profunda */}
        <div className="flex items-center justify-center py-6 border-b border-emerald-700"> {/* Separador sutil */}
          <h1 className="text-3xl font-extrabold text-emerald-200">RedComex</h1> {/* Branding más pronunciado */}
        </div>

        <div className="flex-grow px-4 py-8"> {/* Más padding vertical */}
          <nav className="space-y-3"> {/* Espaciado más compacto entre botones de navegación */}
            <button
              onClick={() => manejarNavegacion('dashboard')}
              className={getNavLinkClass('dashboard')}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
            </button>
            <button
              onClick={() => manejarNavegacion('nuevoAdmin')}
              className={getNavLinkClass('nuevoAdmin')}
            >
              <Briefcase className="w-5 h-5 mr-3" /> Agregar Administrador
            </button>

            <button
              onClick={() => manejarNavegacion('modificarArancel')}
              className={getNavLinkClass('modificarArancel')}
            >
              <FileText className="w-5 h-5 mr-3" /> Modificar Aranceles
            </button>

            <button
              onClick={() => manejarNavegacion('actualizarTasaCambio')}
              className={getNavLinkClass('actualizarTasaCambio')}
            >
              <DollarSign className="w-5 h-5 mr-3" /> Actualizar Tasa de Cambio
            </button>

            <button
              onClick={() => manejarNavegacion('generarReporte')}
              className={getNavLinkClass('generarReporte')}
            >
              <BarChart2 className="w-5 h-5 mr-3" /> Generar Reporte
            </button>
          </nav>
        </div>

        {/* El footer del sidebar se ha eliminado ya que su contenido se movió al header del contenido principal */}
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 p-8"> {/* Más padding general */}
        {/* Barra superior del contenido principal */}
        <div className="bg-emerald-700 text-white flex justify-between items-center p-5 rounded-xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold">Panel de Administración</h2>
          
          {/* Sección de usuario y logout en la parte superior derecha */}
          <div className="flex items-center space-x-4">
            {info && (
              <div className="flex items-center text-emerald-100">
                <UserCircle className="w-8 h-8 mr-2 text-emerald-200" /> {/* Icono de usuario */}
                <div className="text-right">
                  <p className="font-semibold text-lg truncate">{info.usuario}</p> {/* Truncate para nombres largos */}
                  <p className="text-sm truncate">{info.correo}</p> {/* Truncate para correos largos */}
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 shadow-md"
            >
              <LogOut className="w-5 h-5 mr-2" /> Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Área de contenido dinámico */}
        <div className="bg-white p-6 rounded-xl shadow-lg min-h-[calc(100vh-200px)]">
          {seccionActiva === 'dashboard' && <Dashboard usuarioId={usuarioId} />}
          {seccionActiva === 'nuevoAdmin' && <NuevoAdmin />}
          {seccionActiva === 'modificarArancel' && <ModificarArancel />}
          {seccionActiva === 'actualizarTasaCambio' && <ActualizarTasaCambio />}
          {seccionActiva === 'generarReporte' && <GenerarReporte />}
          {seccionActiva === '' && ( // Mensaje inicial si no hay sección activa
            <div className="text-center text-gray-500 py-20">
              <p className="text-xl mb-4">Selecciona una opción del menú lateral para comenzar.</p>
              <LayoutDashboard className="inline-block w-16 h-16 text-emerald-400" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuAdmin;