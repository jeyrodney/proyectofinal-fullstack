import { useState, useEffect } from 'react';
import { LogOut, Building2, Package, History, BarChart3, UserCircle, Home } from 'lucide-react'; // Cambié Briefcase por Building2 y Truck por Package, FileText por History, y agregué BarChart3 y Home.
import AgregarEmpresa from './AgregarEmpresa';
import AgregarExportacion from './AgregarExportacion';
import HistorialExportaciones from './HistorialExportaciones';
import Dashboard from '../../components/DashboardUsuario'; // Importamos el componente de Reportes
import { useNavigate } from 'react-router-dom';
import DashboardUsuario from '../../components/DashboardUsuario';

function MenuUsuario() {
  const [usuario, setUsuario] = useState<{ usuario_id: number; usuario: string; correo: string } | null>(null);
  const [seccionActiva, setSeccionActiva] = useState<string>('home'); // Inicia en una sección 'home' o de bienvenida
  const navigate = useNavigate();

  useEffect(() => {
    const datos = localStorage.getItem('usuario');
    if (datos) {
      const info = JSON.parse(datos);
      setUsuario({
        usuario_id: info.usuario_id, // Asegúrate de que esta propiedad esté presente en localStorage
        usuario: info.usuario,
        correo: info.correo,
      });
    } else {
      // Si no hay usuario en localStorage, redirigir al login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null); // Limpiar los datos del usuario
    setSeccionActiva(''); // Restablecer la sección activa
    navigate('/'); // Redirigir al inicio o a la página de login
  };

  const manejarNavegacion = (seccion: string) => {
    setSeccionActiva(seccion); // Cambiar la sección activa
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-emerald-800 text-white px-8 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center">
          <Home className="w-8 h-8 mr-3 text-emerald-200" /> {/* Icono de Home/Dashboard */}
          <h1 className="text-3xl font-extrabold text-emerald-200">Panel de Usuario</h1>
        </div>
        <div className="flex items-center space-x-4">
          {usuario && (
            <div className="flex items-center text-emerald-100">
              <UserCircle className="w-8 h-8 mr-2 text-emerald-200" /> {/* Icono de usuario */}
              <div className="text-right">
                <p className="font-semibold text-lg truncate">{usuario.usuario}</p>
                <p className="text-sm truncate">{usuario.correo}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 shadow-md"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 px-6 py-10 max-w-6xl mx-auto w-full"> {/* Usamos max-w-6xl y w-full para centrar mejor */}
        {/* Opciones (botones de navegación) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"> {/* 4 columnas en pantallas grandes */}
          <button
            className={`flex flex-col items-center justify-center bg-white shadow-lg hover:shadow-xl rounded-lg p-6 cursor-pointer border transition-all duration-200
                       ${seccionActiva === 'agregarEmpresa' ? 'border-emerald-500 ring-2 ring-emerald-300' : 'border-gray-100 hover:border-emerald-300'}`}
            onClick={() => manejarNavegacion('agregarEmpresa')}
          >
            <Building2 className="text-emerald-600 w-10 h-10 mb-3" /> {/* Icono más grande y color verde */}
            <h3 className="font-bold text-xl text-gray-800">Agregar Empresa</h3>
            <p className="text-sm text-gray-600 mt-1 text-center">Registra una nueva empresa vinculada a tu perfil.</p>
          </button>

          <button
            className={`flex flex-col items-center justify-center bg-white shadow-lg hover:shadow-xl rounded-lg p-6 cursor-pointer border transition-all duration-200
                       ${seccionActiva === 'agregarExportacion' ? 'border-emerald-500 ring-2 ring-emerald-300' : 'border-gray-100 hover:border-emerald-300'}`}
            onClick={() => manejarNavegacion('agregarExportacion')}
          >
            <Package className="text-emerald-600 w-10 h-10 mb-3" /> {/* Icono más grande y color verde */}
            <h3 className="font-bold text-xl text-gray-800">Agregar Exportación</h3>
            <p className="text-sm text-gray-600 mt-1 text-center">Registra un nuevo movimiento de exportación.</p>
          </button>

          <button
            className={`flex flex-col items-center justify-center bg-white shadow-lg hover:shadow-xl rounded-lg p-6 cursor-pointer border transition-all duration-200
                       ${seccionActiva === 'historialExportaciones' ? 'border-emerald-500 ring-2 ring-emerald-300' : 'border-gray-100 hover:border-emerald-300'}`}
            onClick={() => manejarNavegacion('historialExportaciones')}
          >
            <History className="text-emerald-600 w-10 h-10 mb-3" /> {/* Icono más grande y color verde */}
            <h3 className="font-bold text-xl text-gray-800">Historial Exportaciones</h3>
            <p className="text-sm text-gray-600 mt-1 text-center">Consulta el resumen de todas tus exportaciones.</p>
          </button>

          <button
            className={`flex flex-col items-center justify-center bg-white shadow-lg hover:shadow-xl rounded-lg p-6 cursor-pointer border transition-all duration-200
                       ${seccionActiva === 'reportes' ? 'border-emerald-500 ring-2 ring-emerald-300' : 'border-gray-100 hover:border-emerald-300'}`}
            onClick={() => manejarNavegacion('reportes')}
          >
            <BarChart3 className="text-emerald-600 w-10 h-10 mb-3" /> {/* Icono más grande y color verde */}
            <h3 className="font-bold text-xl text-gray-800">Dashboard</h3>
            <p className="text-sm text-gray-600 mt-1 text-center">Visualiza informes gráficos de tus operaciones.</p>
          </button>
        </div>

        {/* Área de contenido dinámico */}
        <div className="bg-white p-6 rounded-xl shadow-lg min-h-[calc(100vh-280px)]"> {/* Altura mínima ajustada */}
          {seccionActiva === 'home' && (
            <div className="text-center text-gray-600 py-20 flex flex-col items-center justify-center">
              <img src="../../public/export.png" alt="Bienvenido al panel de usuario" className="w-64 h-64 mb-8 object-contain" /> {/* Añade una ilustración */}
              <h2 className="text-3xl font-bold text-emerald-700 mb-4">¡Bienvenido a tu Panel de RedComex!</h2>
              <p className="text-lg max-w-2xl">Aquí podrás gestionar tus empresas, registrar nuevas exportaciones, revisar tu historial y generar reportes detallados. <br />Selecciona una opción en el menú superior para comenzar.</p>
              <BarChart3 className="inline-block w-20 h-20 text-emerald-400 mt-8" />
            </div>
          )}
          {seccionActiva === 'agregarEmpresa' && <AgregarEmpresa />}
          {seccionActiva === 'agregarExportacion' && <AgregarExportacion />}
          {seccionActiva === 'historialExportaciones' && <HistorialExportaciones />}
          {seccionActiva === 'reportes' && <DashboardUsuario usuarioId={usuario ? usuario.usuario_id : 0} />}
        </div>
      </main>
    </div>
  );
}

export default MenuUsuario;