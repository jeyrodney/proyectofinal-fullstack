// src/pages/public/Home.tsx
import { Link } from 'react-router-dom';
import MapaExportaciones from '../../components/MapaExportaciones';
import ChartsHome from '../../components/ChartsHome'; // Asumiendo que ChartsHome es tu componente de gráficas

function Home() {
  const productos = [
    { nombre: 'Café', imagen: 'https://www.nescafe.com/es/sites/default/files/2023-10/coffee-beans-header-desktop.jpg', descripcion: 'Exportamos el mejor café colombiano al mundo, con granos seleccionados y el aroma que nos distingue.' },
    { nombre: 'Banano', imagen: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Bananas.jpg', descripcion: 'Banano fresco cultivado con calidad y sostenibilidad, listo para los mercados internacionales.' },
    { nombre: 'Aguacate', imagen: 'https://yosoyciclista.s3.amazonaws.com/documentos/smartweb/contenido_propio/416/aguacate_2_thumb.jpg', descripcion: 'Aguacate Hass de exportación premium, reconocido por su sabor y valor nutricional.' },
    { nombre: 'Flores', imagen: 'https://rieggo.com/blog/wp-content/uploads/2023/02/flores-en-invernaderos_Mesa-de-trabajo-1_Mesa-de-trabajo-1.png', descripcion: 'Hermosas flores colombianas que alegran el mundo, símbolo de la diversidad de nuestra tierra.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-lg">
        <nav className="container mx-auto flex justify-between items-center px-6 py-4">
          <Link to="/" className="text-3xl font-extrabold text-emerald-700 hover:text-emerald-800 transition-colors duration-300">
            RedComex
          </Link>
          <div className="space-x-4 flex items-center">
            <Link to="/login">
              <button className="bg-emerald-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75">
                Iniciar Sesión
              </button>
            </Link>
            <Link to="/registro">
              <button className="bg-gray-100 text-emerald-600 px-6 py-2 rounded-full border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75">
                Registrarse
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 bg-gradient-to-br from-green-50 to-emerald-100 text-center">
        <div className="absolute inset-0 bg-pattern-light opacity-5"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold text-emerald-900 leading-tight mb-6 animate-fadeInDown">
            Impulsamos las Exportaciones de las <span className="text-emerald-600">PYMEs colombianas</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 animate-fadeInUp">
            Una plataforma integral para la gestión, análisis y promoción estratégica de productos colombianos en los mercados internacionales.
          </p>
          <div className="flex justify-center space-x-4 animate-fadeIn">
            <Link to="/sobre-nosotros">
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-full text-lg shadow-xl hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-80">
                Conoce Más
              </button>
            </Link>
            <Link to="/registro">
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-full text-lg border border-emerald-300 shadow-xl hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-80">
                Empieza Ahora
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Seccion de "Nuestros Productos" */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <h3 className="text-4xl font-extrabold text-center mb-12 text-emerald-800">
            Explora Nuestros <span className="text-emerald-600">Productos de Exportación</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {productos.map((producto, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <img src={producto.imagen} alt={producto.nombre} className="h-48 w-full object-cover object-center" />
                <div className="p-5">
                  <h4 className="text-2xl font-bold text-emerald-800 mb-2">{producto.nombre}</h4>
                  <p className="text-gray-700 text-base leading-relaxed">{producto.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seccion de Gráficas de Reportes */}
      <section className="py-16 px-6 bg-emerald-50">
        <div className="container mx-auto">
          <h3 className="text-4xl font-extrabold text-center mb-12 text-emerald-800">
            Datos Clave de las <span className="text-emerald-600">Exportaciones Colombianas</span>
          </h3>
          <ChartsHome />
        </div>
      </section>

      {/* Seccion de Mapa Interactivo */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <h3 className="text-4xl font-extrabold text-center mb-12 text-emerald-800">
            Descubre Nuestros <span className="text-emerald-600">Destinos Globales</span>
          </h3>
          <MapaExportaciones />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8">
        <div className="container mx-auto text-sm">
          <p>&copy; {new Date().getFullYear()} RedComex. Todos los derechos reservados.</p>
          <p className="mt-2">Diseñado con ❤️ en Colombia</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;