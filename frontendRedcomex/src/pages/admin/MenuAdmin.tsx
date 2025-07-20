import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuAdmin = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<{ usuario: string; correo: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setInfo(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div>
      <h1>Menú Administrador</h1>
      {info && (
        <div>
          <p><strong>Nombre:</strong> {info.usuario}</p>
          <p><strong>Correo:</strong> {info.correo}</p>
        </div>
      )}

      <button onClick={() => navigate('/nuevo-admin')}>Agregar Administrador</button>
      <button onClick={() => navigate('/modificar-arancel')}>Modificar Aranceles</button>
      <button onClick={() => navigate('/reporte-admin')}>Generar Reporte</button>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default MenuAdmin;
