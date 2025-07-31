import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgregarEmpresa() {
  const [nit, setNit] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();
  const handleCancel = () => {navigate('/menu-usuario');};

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

    const respuesta = await fetch(`${import.meta.env.VITE_API_BASE_URL}/empresa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaEmpresa),
    });

    const resultado = await respuesta.json();
    alert(resultado.mensaje || resultado.error);
    navigate('/menu-usuario');
  };

  return (
    <div>
      <h2>Registrar Nueva Empresa</h2>
      <form onSubmit={manejarEnvio}>
        <label>NIT:</label><br />
        <input type="text" value={nit} onChange={e => setNit(e.target.value)} required /><br /><br />

        <label>Nombre de la Empresa:</label><br />
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required /><br /><br />

        <label>Descripción:</label><br />
        <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} required /><br /><br />

        <button type="submit">Registrar Empresa</button>
        <button onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
}