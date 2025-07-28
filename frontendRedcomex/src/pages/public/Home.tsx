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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased"> {/* Fondo más suave, tipografía sans-serif, suavizado de fuentes */}

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-lg"> {/* Sticky top, z-index, sombra más pronunciada */}
        <nav className="container mx-auto flex justify-between items-center px-6 py-4"> {/* Contenedor centrado, padding ajustado */}
          <Link to="/" className="text-3xl font-extrabold text-indigo-700 hover:text-indigo-800 transition-colors duration-300"> {/* Tamaño de fuente, negrita extrema, hover effect */}
            RedComex
          </Link>
          <div className="space-x-4 flex items-center"> {/* Alineación de botones */}
            <Link to="/login">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"> {/* Botones redondeados, sombra, hover con escala, focus states */}
                Iniciar Sesión
              </button>
            </Link>
            <Link to="/registro">
              <button className="bg-gray-100 text-indigo-600 px-6 py-2 rounded-full border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"> {/* Botones redondeados, borde, hover más sutil, focus states */}
                Registrarse
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 bg-gradient-to-br from-blue-50 to-indigo-100 text-center"> {/* Más padding, degradado más vibrante */}
        <div className="absolute inset-0 bg-pattern-light opacity-5"></div> {/* Patrón de fondo sutil */}
        <div className="relative z-10 max-w-4xl mx-auto"> {/* Contenido del Hero en una capa superior */}
          <h2 className="text-5xl font-extrabold text-indigo-900 leading-tight mb-6 animate-fadeInDown"> {/* Fuente más grande, negrita extrema, leading ajustado, animación */}
            Impulsamos las Exportaciones de las <span className="text-indigo-600">PYMEs colombianas</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 animate-fadeInUp"> {/* Fuente más grande, texto más oscuro, animación */}
            Una plataforma integral para la **gestión, análisis y promoción** estratégica de productos colombianos en los mercados internacionales.
          </p>
          <div className="flex justify-center space-x-4 animate-fadeIn"> {/* Animación para los botones */}
            <Link to="/acerca-de"> {/* Nuevo botón de CTA */}
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg shadow-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-80">
                Conoce Más
              </button>
            </Link>
            <Link to="/registro">
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg border border-indigo-300 shadow-xl hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-80">
                Empieza Ahora
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Seccion de "Nuestros Productos" */}
      <section className="py-16 px-6 bg-white"> {/* Más padding vertical, fondo blanco */}
        <div className="container mx-auto"> {/* Contenedor centrado */}
          <h3 className="text-4xl font-extrabold text-center mb-12 text-indigo-800">
            Explora Nuestros <span className="text-indigo-600">Productos de Exportación</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"> {/* Mayor separación entre tarjetas */}
            {productos.map((producto, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"> {/* Bordes redondeados más suaves, sombra más fuerte al hover, pequeña elevación */}
                <img src={producto.imagen} alt={producto.nombre} className="h-48 w-full object-cover object-center" /> {/* Imagen un poco más alta, centrado de objeto */}
                <div className="p-5"> {/* Más padding interno */}
                  <h4 className="text-2xl font-bold text-indigo-800 mb-2">{producto.nombre}</h4> {/* Fuente más grande, negrita, margen */}
                  <p className="text-gray-700 text-base leading-relaxed">{producto.descripcion}</p> {/* Texto más oscuro, tamaño de fuente normal, interlineado */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seccion de Gráficas de Reportes */}
      <section className="py-16 px-6 bg-indigo-50"> {/* Fondo ligeramente diferente para destacar la sección */}
        <div className="container mx-auto"> {/* Contenedor centrado */}
          <h3 className="text-4xl font-extrabold text-center mb-12 text-indigo-800">
            Datos Clave de las <span className="text-indigo-600">Exportaciones Colombianas</span>
          </h3>
          <ChartsHome /> {/* Tu componente de gráficas */}
        </div>
      </section>

      {/* Seccion de Mapa Interactivo */}
      <section className="py-16 px-6 bg-white"> {/* Fondo blanco */}
        <div className="container mx-auto"> {/* Contenedor centrado */}
          <h3 className="text-4xl font-extrabold text-center mb-12 text-indigo-800">
            Descubre Nuestros <span className="text-indigo-600">Destinos Globales</span>
          </h3>
          <MapaExportaciones /> {/* Tu componente de mapa */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8"> {/* Footer oscuro para contraste */}
        <div className="container mx-auto text-sm">
          <p>&copy; {new Date().getFullYear()} RedComex. Todos los derechos reservados.</p>
          <p className="mt-2">Diseñado con ❤️ en Colombia</p> {/* Pequeño detalle extra */}
        </div>
      </footer>
    </div>
  );
}

export default Home;