import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Lightbulb, Handshake, BriefcaseBusiness, TrendingUp, DollarSign } from 'lucide-react'; // Añadimos iconos para financiación/créditos

export default function SobreNosotros() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // Navega a la página de inicio (o a donde sea apropiado)
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 md:p-10 border border-emerald-100 relative">
        {/* Botón de retroceso */}
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-full transition duration-200 flex items-center shadow-sm"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver
        </button>

        <div className="text-center mb-10 mt-12 md:mt-0"> {/* Ajuste de margen superior */}
          <Building2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-emerald-800 mb-4">Sobre Nuestra Plataforma</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Impulsando el éxito global de las empresas colombianas y apoyando el crecimiento de las PYMES a través de la innovación en la gestión y el análisis de datos de exportaciones.
          </p>
        </div>

        <div className="space-y-10">
          {/* Nuestra Misión */}
          <section className="flex flex-col md:flex-row items-center bg-emerald-50 rounded-lg p-6 shadow-sm border border-emerald-100">
            <Lightbulb className="w-16 h-16 text-emerald-600 md:mr-6 mb-4 md:mb-0 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-emerald-800 mb-3">Nuestra Misión</h2>
              <p className="text-gray-700 leading-relaxed">
                Nuestra misión es doble: por un lado, **empoderar a las empresas colombianas**, facilitando y optimizando sus procesos de exportación para que alcancen nuevos mercados internacionales. Por otro lado, buscamos ser una **herramienta estratégica para el gobierno nacional**, permitiendo el análisis de datos de exportación para el diseño de políticas de apoyo a las PYMES.
              </p>
            </div>
          </section>

          {/* Impacto en PYMES y el Gobierno */}
          <section className="flex flex-col md:flex-row items-center bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <DollarSign className="w-16 h-16 text-green-600 md:mr-6 mb-4 md:mb-0 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Apoyo Estratégico para PYMES y Gobierno</h2>
              <p className="text-gray-700 leading-relaxed">
                Más allá de la gestión de exportaciones, nuestra plataforma sirve como un **recurso vital para el gobierno nacional**. Mediante el **análisis profundo de los datos** recopilados, las entidades gubernamentales pueden identificar patrones, detectar necesidades específicas y diseñar programas de **financiación, créditos y capacitaciones dirigidas** que impulsen el crecimiento y la competitividad de las Pequeñas y Medianas Empresas (PYMES) colombianas en el mercado global. Esta sinergia asegura que el apoyo llegue donde más se necesita, fomentando un ecosistema exportador más robusto y equitativo.
              </p>
            </div>
          </section>

          {/* Nuestros Valores */}
          <section className="flex flex-col md:flex-row items-center bg-emerald-50 rounded-lg p-6 shadow-sm border border-emerald-100">
            <Handshake className="w-16 h-16 text-blue-600 md:mr-6 mb-4 md:mb-0 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-emerald-800 mb-3">Nuestros Valores</h2>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                <li><span className="font-semibold text-blue-700">Integridad:</span> Actuamos con honestidad y transparencia en todas nuestras operaciones.</li>
                <li><span className="font-semibold text-blue-700">Innovación:</span> Buscamos constantemente nuevas y mejores formas de servir a nuestros clientes y al país.</li>
                <li><span className="font-semibold text-blue-700">Compromiso Social:</span> Contribuimos activamente al desarrollo económico de Colombia apoyando a las PYMES.</li>
                <li><span className="font-semibold text-blue-700">Excelencia:</span> Nos esforzamos por ofrecer servicios y análisis de la más alta calidad.</li>
              </ul>
            </div>
          </section>

          {/* ¿Por Qué Elegirnos? */}
          <section className="flex flex-col md:flex-row items-center bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <BriefcaseBusiness className="w-16 h-16 text-emerald-600 md:mr-6 mb-4 md:mb-0 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">¿Por Qué Elegirnos?</h2>
              <p className="text-gray-700 leading-relaxed">
                Con años de experiencia en el sector y un equipo de expertos dedicados, ofrecemos una plataforma intuitiva y herramientas poderosas que transformarán la manera en que gestionas tus exportaciones. Desde la simplificación de trámites hasta el análisis de datos en tiempo real y el apoyo gubernamental estratégico, estamos aquí para asegurarnos de que tu negocio prospere en el escenario global y contribuya al desarrollo nacional.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}