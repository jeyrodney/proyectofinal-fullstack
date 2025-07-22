import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Bienvenido a RedComex</h1>
      <p className="text-lg text-gray-700 mb-8">
        Facilitamos las exportaciones de las PYMEs colombianas
      </p>

      <div className="flex space-x-4">
        <Link to="/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            Iniciar Sesión
          </button>
        </Link>
        <Link to="/registro">
          <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200">
            Registrarse
          </button>
        </Link>
      </div>
    </div>
  );
}
