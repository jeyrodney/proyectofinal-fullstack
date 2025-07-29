import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgregarEmpresa() {
  const [nit, setNit] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    const usuarioInfo = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log('Usuario en localStorage:', usuarioInfo);

    if (!usuarioInfo || !usuarioInfo.usuario_id) {
      alert('No se encontró información del usuario. Vuelva a iniciar sesión.');
      return;
    }

    const nuevaEmpresa = {
      nit,
      nombre,
      descripcion,
      fk_usuario: usuarioInfo.usuario_id,
    };

    const respuesta = await fetch('http://localhost:4567/empresa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaEmpresa),
    });

    const resultado = await respuesta.json();
    alert(resultado.mensaje || resultado.error);

    // Limpiar los campos después de guardar la empresa
    setNit('');
    setNombre('');
    setDescripcion('');

    // Redirigir al menú de usuario
    navigate('/menu-usuario');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Registrar Nueva Empresa</h2>

        <form onSubmit={manejarEnvio} className="space-y-4">
          <div>
            <label className="block font-medium text-sm text-gray-700">NIT:</label>
            <input
              type="text"
              value={nit}
              onChange={e => setNit(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-medium text-sm text-gray-700">Nombre de la Empresa:</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-medium text-sm text-gray-700">Descripción:</label>
            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded resize-none"
              rows={3}
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded transition"
            >
              Registrar Empresa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
