import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4567/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Usuario registrado exitosamente');
        navigate('/');
      } else {
        alert(data.error || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error al conectar con el servidor');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registro de Nuevo Usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Documento:</label>
            <select
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Cédula">Cédula</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Número de Documento:</label>
            <input
              type="text"
              name="numDocumento"
              value={formData.numDocumento}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre Completo:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Celular:</label>
            <input
              type="text"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña:</label>
            <input
              type="password"
              name="passwordUser"
              value={formData.passwordUser}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded transition"
            >
              Registrar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-4 py-2 rounded transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoUsuario;
