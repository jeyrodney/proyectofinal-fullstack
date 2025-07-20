import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Pais {
  idPais: number;
  nombre: string;
}

interface Producto {
  idProducto: number;
  nombre: string;
}

export default function ModificarArancel() {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [nuevaTasa, setNuevaTasa] = useState('');
  const navigate = useNavigate();


  // Cargar países y productos al montar el componente
  useEffect(() => {
    fetch('http://localhost:4567/paises')
      .then(res => res.json())
      .then(data => setPaises(data));

    fetch('http://localhost:4567/productos')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
        idPais: parseInt(paisSeleccionado),
        idProducto: parseInt(productoSeleccionado),
        tasaArancel: parseFloat(nuevaTasa)
    };

    console.log("JSON que se envía al backend:", JSON.stringify(payload));

    const respuesta = await fetch('http://localhost:4567/modificar-arancel', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idPais: parseInt(paisSeleccionado),
        idProducto: parseInt(productoSeleccionado),
        tasaArancel: parseFloat(nuevaTasa)
      })
    });

    const resultado = await respuesta.json();
    alert(resultado.mensaje || resultado.error);
    navigate('/menu-admin');
  };

  return (
    <div>
      <h2>Modificar Tasa Arancelaria</h2>
      <form onSubmit={manejarEnvio}>
        <label>País:</label><br />
        <select value={paisSeleccionado} onChange={e => setPaisSeleccionado(e.target.value)} required>
          <option value="">Seleccione un país</option>
          {paises.map(p => (
            <option key={p.idPais} value={p.idPais}>{p.nombre}</option>
          ))}
        </select><br /><br />

        <label>Producto:</label><br />
        <select value={productoSeleccionado} onChange={e => setProductoSeleccionado(e.target.value)} required>
          <option value="">Seleccione un producto</option>
          {productos.map(p => (
            <option key={p.idProducto} value={p.idProducto}>{p.nombre}</option>
          ))}
        </select><br /><br />

        <label>Nueva Tasa Arancelaria (%):</label><br />
        <input
          type="number"
          step="0.01"
          min="0"
          value={nuevaTasa}
          onChange={e => setNuevaTasa(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}
