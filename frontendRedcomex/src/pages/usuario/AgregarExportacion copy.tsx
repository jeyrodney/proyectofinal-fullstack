import { useEffect, useState } from 'react';

interface Pais {
  idPais: number;
  nombre: string;
}

interface Producto {
  idProducto: number;
  nombre: string;
}

interface Empresa {
  idEmpresa: number;
  nombre: string;
}

export default function AgregarExportacion() {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  const [pais, setPais] = useState('');
  const [producto, setProducto] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [estado, setEstado] = useState('');

  const usuarioInfo = JSON.parse(localStorage.getItem('usuario') || '{}');

  useEffect(() => {
    fetch('http://localhost:4567/paises')
      .then(res => res.json())
      .then(data => setPaises(data));

    fetch('http://localhost:4567/productos')
      .then(res => res.json())
      .then(data => setProductos(data));

    // Cargar empresas del usuario autenticado
    if (usuarioInfo && usuarioInfo.correo) {
      fetch(`http://localhost:4567/empresas-usuario/${usuarioInfo.correo}`)
        .then(res => res.json())
        .then(data => setEmpresas(data));
    }
  }, []);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    const exportacion = {
      cantidad: parseInt(cantidad),
      fechaExp: fecha,
      valorUnitario: parseFloat(valorUnitario),
      estadoExportacion: estado,
      fkEmpresa: parseInt(empresa),
      fkProducto: parseInt(producto),
      fkPais: parseInt(pais)
    };

    const res = await fetch('http://localhost:4567/exportacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exportacion)
    });

    const resultado = await res.json();
    alert(resultado.mensaje || resultado.error);
  };

  return (
    <div>
      <h2>Agregar Exportación</h2>
      <form onSubmit={manejarEnvio}>
        <label>Empresa:</label><br />
        <select value={empresa} onChange={e => setEmpresa(e.target.value)} required>
          <option value="">Seleccione una empresa</option>
          {empresas.map(emp => (
            <option key={emp.idEmpresa} value={emp.idEmpresa}>{emp.nombre}</option>
          ))}
        </select><br /><br />

        <label>Producto:</label><br />
        <select value={producto} onChange={e => setProducto(e.target.value)} required>
          <option value="">Seleccione un producto</option>
          {productos.map(p => (
            <option key={p.idProducto} value={p.idProducto}>{p.nombre}</option>
          ))}
        </select><br /><br />

        <label>País destino:</label><br />
        <select value={pais} onChange={e => setPais(e.target.value)} required>
          <option value="">Seleccione un país</option>
          {paises.map(p => (
            <option key={p.idPais} value={p.idPais}>{p.nombre}</option>
          ))}
        </select><br /><br />

        <label>Cantidad:</label><br />
        <input
          type="number"
          value={cantidad}
          onChange={e => setCantidad(e.target.value)}
          required
        /><br /><br />

        <label>Fecha de Exportación:</label><br />
        <input
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          required
        /><br /><br />

        <label>Valor Unitario:</label><br />
        <input
          type="number"
          step="0.01"
          value={valorUnitario}
          onChange={e => setValorUnitario(e.target.value)}
          required
        /><br /><br />

        <label>Estado de Exportación:</label><br />
        <input
          type="text"
          value={estado}
          onChange={e => setEstado(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Registrar Exportación</button>
      </form>
    </div>
  );
}
