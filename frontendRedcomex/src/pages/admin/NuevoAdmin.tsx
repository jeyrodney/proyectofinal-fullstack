import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4567/nuevo-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Administrador registrado exitosamente');
        navigate('/menu-admin');
      } else {
        alert(data.error || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error al conectar con el servidor');
    }
  };

  const handleCancel = () => {
    navigate('/menu-admin');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Registrar Nuevo Administrador</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Tipo de Documento:</label>
            <select
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            >
              <option value="Cédula">Cédula</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Número de Documento:</label>
            <input
              type="text"
              name="numDocumento"
              value={formData.numDocumento}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Nombre Completo:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Correo Electrónico:</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Celular:</label>
            <input
              type="text"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Contraseña:</label>
            <input
              type="password"
              name="passwordUser"
              value={formData.passwordUser}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Registrar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
