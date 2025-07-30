import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MenuAdmin() {
  const navigate = useNavigate();
  const [info, setInfo] = useState<{ usuario: string; correo: string } | null>(null);

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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        {info && (
          <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded mb-6 text-sm">
            <p><strong>Nombre:</strong> {info.usuario}</p>
            <p><strong>Correo:</strong> {info.correo}</p>
          </div>
        )}

        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Menú del Administrador</h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/nuevo-admin')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Agregar Administrador
          </button>

          <button
            onClick={() => navigate('/modificar-arancel')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Modificar Aranceles
          </button>

          <button
            onClick={() => navigate('/actualizar-tasa-cambio')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Actualizar Tasa de Cambio
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition mt-4"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
