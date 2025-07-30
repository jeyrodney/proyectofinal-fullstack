import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:4567/login', {
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

      // Puedes guardar en localStorage si deseas mantener sesión
      localStorage.setItem('usuario', JSON.stringify(data));
      console.log(rol);
      if (rol === '1') {
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

  // Animación similar a la original
  const [dots, setDots] = useState<Array<any>>([]);

  useEffect(() => {
    const newDots = [];
    for (let i = 0; i < 1000; i++) {
      newDots.push(
        <div key={i} className="transition-colors duration-[1.5s] hover:duration-[0s] border-[#00FF00] h-[calc(5vw-2px)] w-[calc(5vw-2px)] md:h-[calc(4vw-2px)] md:w-[calc(4vw-2px)] lg:h-[calc(3vw-4px)] lg:w-[calc(3vw-4px)] bg-gray-900 hover:bg-[#00FF00]"></div>
      );
    }
    setDots(newDots);
  }, []);

  return (
    <div className="bg-black before:animate-pulse before:bg-gradient-to-b before:from-gray-900 overflow-hidden before:via-[#00FF00] before:to-gray-900 before:absolute min-h-screen flex items-center justify-center px-4">
      <div className="w-full sm:w-1/2 lg:2/3 px-6 bg-gray-500 bg-opacity-20 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4 rounded-lg">
        <div className="w-full flex justify-center text-[#00FF00] text-xl mb-2 md:mb-5">
          Sign In
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white text-xs font-medium">Your email</label>
            <input
              type="email"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@neurolink.com"
            />
          </div>
          <div>
            <label className="block text-white text-xs font-medium">Your password</label>
            <input
              type="password"
              value={clave}
              onChange={e => setClave(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-[#00FF00] text-white px-4 py-2 rounded-md hover:bg-[#00FF00] transition duration-200"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-[#00FF00] text-sm md:text-md"
            >
              Cancelar
            </button>
          </div>
        </form>
        <div className="flex flex-row justify-between mt-4">
          <div className="text-white text-sm md:text-md">Forgot Password</div>
          <div className="text-[#00FF00] text-sm md:text-md">Signup</div>
        </div>
      </div>

      {/* Animación de puntos */}
      <div className="flex flex-wrap gap-0.5 h-screen items-center justify-center relative">
        {dots}
      </div>
    </div>
  );
}

export default Login;
