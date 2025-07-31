import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Save, XCircle, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react'; // Iconos para el formulario

const NuevoUsuario = () => {
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
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Para errores de validación de campos

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.numDocumento.trim()) newErrors.numDocumento = 'El número de documento es obligatorio.';
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre completo es obligatorio.';
    if (!formData.correo.trim()) newErrors.correo = 'El correo electrónico es obligatorio.';
    else if (!/\S+@\S+\.\S+/.test(formData.correo)) newErrors.correo = 'El correo electrónico no es válido.';
    if (!formData.celular.trim()) newErrors.celular = 'El número de celular es obligatorio.';
    else if (!/^\d{7,10}$/.test(formData.celular)) newErrors.celular = 'El celular debe tener entre 7 y 10 dígitos.'; // Asumiendo formato colombiano
    if (!formData.passwordUser.trim()) newErrors.passwordUser = 'La contraseña es obligatoria.';
    else if (formData.passwordUser.length < 6) newErrors.passwordUser = 'La contraseña debe tener al menos 6 caracteres.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar el error del campo cuando el usuario empieza a escribir
    if (errors[e.target.name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
    setMessage(null); // Limpiar mensajes de éxito/error al cambiar inputs
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Limpiar mensajes previos
    if (!validateForm()) {
      setMessage({ type: 'error', text: 'Por favor, corrija los errores en el formulario.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: data.mensaje || 'Usuario registrado exitosamente. Redirigiendo al inicio...' });
        setTimeout(() => navigate('/'), 1500); // Redirigir al login
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al registrar usuario. Intente de nuevo.' });
      }
    } catch (error) {
      console.error('Error de red al registrar usuario:', error);
      setMessage({ type: 'error', text: 'No se pudo conectar con el servidor. Por favor, verifique su conexión.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/'); // Volver al inicio (login)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-emerald-100"> {/* Contenedor con estilo global */}
        <div className="flex flex-col items-center justify-center mb-8">
          <UserPlus className="w-12 h-12 text-emerald-600 mb-3" /> {/* Icono grande */}
          <h2 className="text-3xl font-bold text-emerald-800 text-center">Registro de Usuario</h2>
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded-lg text-center ${
            message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' :
            'bg-red-100 text-red-800 border border-red-300'
          }`}>
            <p>{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5"> {/* Espaciado mejorado */}

          {/* Tipo de Documento */}
          <div>
            <label htmlFor="tipoDocumento" className="block text-sm font-semibold text-gray-700 mb-1">Tipo de Documento:</label>
            <select
              id="tipoDocumento"
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
            >
              <option value="Cédula">Cédula de Ciudadanía</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="Cédula de Extranjería">Cédula de Extranjería</option> {/* Opción adicional común en Colombia */}
            </select>
          </div>

          {/* Número de Documento */}
          <div>
            <label htmlFor="numDocumento" className="block text-sm font-semibold text-gray-700 mb-1">Número de Documento:</label>
            <input
              type="text"
              id="numDocumento"
              name="numDocumento"
              value={formData.numDocumento}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border ${errors.numDocumento ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm`}
              placeholder="Ej: 123456789"
            />
            {errors.numDocumento && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" /> {errors.numDocumento}
              </p>
            )}
          </div>

          {/* Nombre Completo */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-1">Nombre Completo:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm`}
              placeholder="Ej: Juan Pérez"
            />
            {errors.nombre && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" /> {errors.nombre}
              </p>
            )}
          </div>

          {/* Correo Electrónico */}
          <div>
            <label htmlFor="correo" className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border ${errors.correo ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm`}
              placeholder="Ej: usuario@ejemplo.com"
            />
            {errors.correo && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" /> {errors.correo}
              </p>
            )}
          </div>

          {/* Celular */}
          <div>
            <label htmlFor="celular" className="block text-sm font-semibold text-gray-700 mb-1">Celular:</label>
            <input
              type="tel" // Usar type="tel" para móviles
              id="celular"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border ${errors.celular ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm`}
              placeholder="Ej: 3001234567"
              maxLength={10} // Asumiendo 10 dígitos para celular en Colombia
            />
            {errors.celular && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" /> {errors.celular}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="passwordUser" className="block text-sm font-semibold text-gray-700 mb-1">Contraseña:</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="passwordUser"
                name="passwordUser"
                value={formData.passwordUser}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border ${errors.passwordUser ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm pr-10`} // pr-10 para el ojo
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.passwordUser && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" /> {errors.passwordUser}
              </p>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between pt-5">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 flex items-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5 mr-2 text-white" />
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg transition-colors duration-200 flex items-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <XCircle className="w-5 h-5 mr-2" /> Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoUsuario;