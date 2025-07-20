import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MenuUsuario() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<{ usuario: string; correo: string } | null>(null);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  useEffect(() => {
    const datos = localStorage.getItem('usuario');
    if (datos) {
      const info = JSON.parse(datos);
      setUsuario({
        usuario: info.usuario,
        correo: info.correo,
      });
    }
  }, []);

  const manejarNavegacion = (ruta: string) => {
    navigate(ruta);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        {usuario && (
          <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded mb-6 text-sm">
            <p><strong>Bienvenido:</strong> {usuario.usuario} | <strong>Correo:</strong> {usuario.correo}</p>
          </div>
        )}

        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Menú del Usuario</h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => manejarNavegacion('/crear-empresa')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Agregar Empresa
          </button>

          <button
            onClick={() => manejarNavegacion('/agregar-exportacion')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Agregar Exportación
          </button>

          <button
            onClick={() => manejarNavegacion('/reporte-exportaciones')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Generar Reporte Exportaciones
          </button>

          <button
            onClick={cerrarSesion}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition mt-4"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

