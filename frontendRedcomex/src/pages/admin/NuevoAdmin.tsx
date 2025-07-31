import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Save } from 'lucide-react'; // Importar iconos de Lucide React

export default function NuevoAdmin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tipoDocumento: 'Cédula',
    numDocumento: '',
    nombre: '',
    correo: '',
    celular: '',
    passwordUser: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); // Limpiar mensajes previos

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/nuevo-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Administrador registrado exitosamente.' });
        // Limpiar los campos después del registro
        setFormData({
          tipoDocumento: 'Cédula',
          numDocumento: '',
          nombre: '',
          correo: '',
          celular: '',
          passwordUser: ''
        });
        // Podrías añadir un pequeño delay antes de navegar para que el usuario vea el mensaje
        setTimeout(() => navigate('/menu-admin'), 1500);
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al registrar administrador.' });
      }
    } catch (error) {
      console.error('Error de red:', error);
      setMessage({ type: 'error', text: 'Error al conectar con el servidor. Por favor, inténtalo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-gray-50 py-10 px-4 flex justify-center items-center"> {/* Centrar el formulario */}
      <div className="max-w-xl w-full bg-white shadow-xl rounded-lg p-8 border border-emerald-100"> {/* Sombra más profunda, bordes redondeados, borde verde */}
        <div className="flex items-center justify-center mb-8">
          <UserPlus className="w-10 h-10 text-emerald-600 mr-3" /> {/* Icono grande y verde */}
          <h2 className="text-3xl font-bold text-emerald-800">Registrar Nuevo Administrador</h2> {/* Título más grande y bold */}
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded-lg text-center ${
            message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 
            'bg-red-100 text-red-800 border border-red-300'
          }`}>
            <p>{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6"> {/* Mayor espaciado entre campos */}
          {/* Campo Tipo de Documento */}
          <div>
            <label htmlFor="tipoDocumento" className="block text-gray-700 text-sm font-semibold mb-2">Tipo de Documento:</label>
            <select
              id="tipoDocumento"
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
            >
              <option value="Cédula">Cédula de Ciudadanía</option> {/* Texto más completo */}
              <option value="Pasaporte">Pasaporte</option>
              <option value="Cédula de Extranjería">Cédula de Extranjería</option> {/* Opción adicional */}
            </select>
          </div>

          {/* Campo Número de Documento */}
          <div>
            <label htmlFor="numDocumento" className="block text-gray-700 text-sm font-semibold mb-2">Número de Documento:</label>
            <input
              type="text"
              id="numDocumento"
              name="numDocumento"
              value={formData.numDocumento}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
            />
          </div>

          {/* Campo Nombre Completo */}
          <div>
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-semibold mb-2">Nombre Completo:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
            />
          </div>

          {/* Campo Correo Electrónico */}
          <div>
            <label htmlFor="correo" className="block text-gray-700 text-sm font-semibold mb-2">Correo Electrónico:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
            />
          </div>

          {/* Campo Celular */}
          <div>
            <label htmlFor="celular" className="block text-gray-700 text-sm font-semibold mb-2">Celular:</label>
            <input
              type="text"
              id="celular"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label htmlFor="passwordUser" className="block text-gray-700 text-sm font-semibold mb-2">Contraseña:</label>
            <input
              type="password"
              id="passwordUser"
              name="passwordUser"
              value={formData.passwordUser}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-4 pt-4"> {/* Alinear botones a la derecha, más padding superior */}

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 flex items-center shadow-md"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}