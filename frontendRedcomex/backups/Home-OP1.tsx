// src/pages/public/Home.tsx
import { Link } from 'react-router-dom';
import MapaExportaciones from '../../components/MapaExportaciones';
import ChartsHome from '../../components/ChartsHome';

function Home() {
  const productos = [
    { nombre: 'Café', imagen: 'https://www.nescafe.com/es/sites/default/files/2023-10/coffee-beans-header-desktop.jpg', descripcion: 'Exportamos el mejor café colombiano al mundo.' },
    { nombre: 'Banano', imagen: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Bananas.jpg', descripcion: 'Banano fresco cultivado con calidad y sostenibilidad.' },
    { nombre: 'Aguacate', imagen: 'https://yosoyciclista.s3.amazonaws.com/documentos/smartweb/contenido_propio/416/aguacate_2_thumb.jpg', descripcion: 'Aguacate Hass de exportación premium.' },
    { nombre: 'Flores', imagen: 'https://rieggo.com/blog/wp-content/uploads/2023/02/flores-en-invernaderos_Mesa-de-trabajo-1_Mesa-de-trabajo-1.png', descripcion: 'Flores colombianas que alegran el mundo.' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
        <h1 className="text-2xl font-bold text-indigo-700">RedComex</h1>
        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
              Iniciar Sesión
            </button>
          </Link>
          <Link to="/registro">
            <button className="bg-gray-100 text-indigo-600 px-4 py-2 rounded hover:bg-gray-200 transition">
              Registrarse
            </button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-16 px-4 bg-gradient-to-br from-indigo-50 to-white">
        <h2 className="text-4xl font-bold text-indigo-800 mb-4">Impulsamos las Exportaciones de las PYMEs colombianas</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Plataforma para la gestión, análisis y promoción de productos colombianos hacia mercados internacionales.
        </p>
      </section>

      {/* Productos */}
      <section className="px-8 py-10">
        <h3 className="text-2xl font-semibold text-center mb-8 text-indigo-700">Nuestros Productos de Exportación</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {productos.map((producto, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition">
              <img src={producto.imagen} alt={producto.nombre} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-bold text-indigo-700">{producto.nombre}</h4>
                <p className="text-gray-600 mt-2 text-sm">{producto.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Graficas de reportes */}
      <div>
        <ChartsHome />
      </div>

      {/* Mapa interactivo */}
      <section className="px-8">
        <MapaExportaciones />
      </section>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500 border-t mt-10">
        &copy; {new Date().getFullYear()} RedComex. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default Home;
