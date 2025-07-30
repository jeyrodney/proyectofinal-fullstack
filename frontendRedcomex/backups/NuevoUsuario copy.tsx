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

  const handleCancel = () => {navigate('/');};

  return (
    <div>
      <h2>Registro de Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo de Documento:</label>
          <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange}>
            <option value="Cédula">Cédula</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
        </div>
        <div>
          <label>Número de Documento:</label>
          <input
            type="text"
            name="numDocumento"
            value={formData.numDocumento}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Celular:</label>
          <input
            type="text"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="passwordUser"
            value={formData.passwordUser}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Registrar</button>
        <button onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default NuevoUsuario;
