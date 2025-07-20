import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:4567/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, clave })
      });

      if (!res.ok) {
        setError('Correo o clave inválidos');
        return;
      }

      const data = await res.json();
      const rol = data.rol;

      // Puedes guardar en localStorage si deseas mantener sesión
      localStorage.setItem('usuario', JSON.stringify(data));
      console.log(rol)
      if (rol == '1') {
        navigate('/menu-admin');
      } else {
        navigate('/menu-usuario');
      }

    } catch (err) {
      setError('Error al conectar con el servidor');
    }

  };

    const handleCancel = () => {
    navigate('/');
};

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Correo:</label><br />
          <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} required />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Contraseña:</label><br />
          <input type="password" value={clave} onChange={e => setClave(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: '1.5rem' }}>Ingresar</button>
        <button onClick={handleCancel}>Cancelar</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}

export default Login;
