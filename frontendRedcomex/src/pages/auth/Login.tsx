import { useState } from 'react';
 import { useNavigate } from 'react-router-dom';

 export default function Login() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, clave })
      });

      if (!res.ok) {
        setError('Correo o clave inválidos');
        return;
      }

      const data = await res.json();
      const rol = data.rol;

      localStorage.setItem('usuario', JSON.stringify(data));
      if (rol == '1') {
        navigate('/menu-admin');
      } else {
        navigate('/menu-usuario');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-emerald-700 mb-8">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="correo" className="block text-gray-700 text-sm font-bold mb-2">Correo:</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="clave" className="block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
            <input
              type="password"
              id="clave"
              value={clave}
              onChange={e => setClave(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs italic text-center">{error}</p>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Ingresar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
 }