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
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-indigo-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Registrar Nueva Empresa</h1>
      </header>

      <main className="px-6 py-10 max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={manejarEnvio} className="space-y-6">
            <div>
              <label className="block font-medium text-sm text-gray-700">NIT:</label>
              <input
                type="text"
                value={nit}
                onChange={e => setNit(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700">Nombre de la Empresa:</label>
              <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700">Descripción:</label>
              <textarea
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                rows={4}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300"
              >
                Registrar Empresa
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
