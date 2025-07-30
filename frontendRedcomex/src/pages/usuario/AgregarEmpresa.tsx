import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Save, XCircle, Loader2 } from 'lucide-react'; // Iconos para el formulario

export default function AgregarEmpresa() {
  const [nit, setNit] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); // Limpiar mensajes previos

    const usuarioInfo = JSON.parse(localStorage.getItem('usuario') || '{}');
    // console.log('Usuario en localStorage:', usuarioInfo); // Mantener para depuración si es necesario

    if (!usuarioInfo || !usuarioInfo.usuario_id) {
      setMessage({ type: 'error', text: 'No se encontró información del usuario. Por favor, inicie sesión nuevamente.' });
      setLoading(false);
      // Opcional: Redirigir al login si no hay info de usuario
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    const nuevaEmpresa = {
      nit,
      nombre,
      descripcion,
      fk_usuario: usuarioInfo.usuario_id,
    };

    try {
      const respuesta = await fetch('http://localhost:4567/empresa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaEmpresa),
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        setMessage({ type: 'success', text: resultado.mensaje || 'Empresa registrada exitosamente.' });
        // Limpiar los campos después de guardar la empresa
        setNit('');
        setNombre('');
        setDescripcion('');
        // Redirigir al menú de usuario después de un breve retraso para que el mensaje sea visible
        setTimeout(() => navigate('/menu-usuario'), 1500);
      } else {
        setMessage({ type: 'error', text: resultado.error || 'Error al registrar la empresa. Intente de nuevo.' });
      }
    } catch (error) {
      console.error('Error de red al registrar empresa:', error);
      setMessage({ type: 'error', text: 'No se pudo conectar con el servidor. Por favor, verifique su conexión.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/menu-usuario'); // Volver al menú de usuario sin guardar
  };

  return (
    <div className="bg-gray-50 py-10 px-4 flex justify-center items-start"> {/* flex items-start para que no se centre verticalmente si el contenido es corto */}
      <div className="max-w-lg w-full bg-white shadow-xl rounded-lg p-8 border border-emerald-100"> {/* Contenedor con estilo global */}
        <div className="flex items-center justify-center mb-8">
          <Building2 className="w-10 h-10 text-emerald-600 mr-3" /> {/* Icono de empresa */}
          <h2 className="text-3xl font-bold text-emerald-800">Registrar Nueva Empresa</h2>
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded-lg text-center ${
            message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' :
            'bg-red-100 text-red-800 border border-red-300'
          }`}>
            <p>{message.text}</p>
          </div>
        )}

        <form onSubmit={manejarEnvio} className="space-y-6">
          {/* Campo NIT */}
          <div>
            <label htmlFor="nit" className="block text-gray-700 text-sm font-semibold mb-2">NIT:</label>
            <input
              type="text"
              id="nit"
              value={nit}
              onChange={e => setNit(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
              placeholder="Ej: 900123456-7"
            />
          </div>

          {/* Campo Nombre de la Empresa */}
          <div>
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-semibold mb-2">Nombre de la Empresa:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
              placeholder="Ej: Mi Empresa S.A.S."
            />
          </div>

          {/* Campo Descripción */}
          <div>
            <label htmlFor="descripcion" className="block text-gray-700 text-sm font-semibold mb-2">Descripción:</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm resize-y"
              rows={4}
              placeholder="Breve descripción de la actividad principal de la empresa."
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-4 pt-4">

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 flex items-center shadow-md"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5 mr-3 text-white" />
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              {loading ? 'Registrando...' : 'Registrar Empresa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}