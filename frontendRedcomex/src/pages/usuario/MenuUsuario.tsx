import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function MenuUsuario() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<{ usuario: string; correo: string } | null>(null);
  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
    };

  useEffect(() => {
    const datos = localStorage.getItem('usuario');
    if (datos) {
      const info = JSON.parse(datos);
      console.log(info.correo);
      setUsuario({
        usuario: info.usuario,
        correo: info.correo,
      });
    }
  }, []);

  const manejarNavegacion = (ruta: string) => {
    navigate(ruta);
  };

  return (
    <div>
    {usuario && (
        <div style={{ backgroundColor: '#e6f7ff', padding: '1rem', marginBottom: '1rem' }}>
        <strong>Bienvenido:</strong> {usuario.usuario} | <strong>Correo:</strong> {usuario.correo}
        </div>
    )}

    <h1>Menú del Usuario</h1>
    <button onClick={() => manejarNavegacion('/crear-empresa')}>Agregar Empresa</button>
    <button onClick={() => manejarNavegacion('/agregar-exportacion')}>Agregar Exportación</button>
    <button onClick={() => manejarNavegacion('/reporte-exportaciones')}>Generar Reporte Exportaciones</button>

    <button onClick={cerrarSesion} style={{ marginTop: '1rem', backgroundColor: 'red', color: 'white' }}>
        Cerrar sesión
    </button>
    </div>
  );
}

export default MenuUsuario;
