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
  const [form, setForm] = useState({
    cantidad: '',
    fecha_exp: '',
    valor_unitario: '',
    tasa_cambio: '',
    estado_exportacion: '',
    fk_empresa: '',
    fk_producto: '',
    fk_pais: ''
  });

  useEffect(() => {
    fetch('http://localhost:4567/paises')
      .then(res => res.json())
      .then(data => setPaises(data));

    fetch('http://localhost:4567/productos')
      .then(res => res.json())
      .then(data => setProductos(data));

    const usuarioInfo = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (!usuarioInfo || !usuarioInfo.correo) {
      alert('No se encontró información del usuario. Vuelva a iniciar sesión.');
      return;
    }

    fetch(`http://localhost:4567/empresas-usuario/${usuarioInfo.correo}`)
      .then(res => res.json())
      .then(data => setEmpresas(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      cantidad: parseInt(form.cantidad),
      fecha_exp: form.fecha_exp,
      valor_unitario: parseFloat(form.valor_unitario),
      tasa_cambio: parseFloat(form.tasa_cambio),
      estado_exportacion: form.estado_exportacion,
      fk_empresa: parseInt(form.fk_empresa),
      fk_producto: parseInt(form.fk_producto),
      fk_pais: parseInt(form.fk_pais)
    };

    const response = await fetch('http://localhost:4567/registrar-exportacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    alert(data.mensaje || data.error);
  };

  return (
    <div>
      <h2>Registrar Exportación</h2>
      <form onSubmit={handleSubmit}>
        <label>Cantidad:</label><br />
        <input name="cantidad" value={form.cantidad} onChange={handleChange} type="number" required /><br /><br />

        <label>Fecha de Exportación:</label><br />
        <input name="fecha_exp" value={form.fecha_exp} onChange={handleChange} type="date" required /><br /><br />

        <label>Valor Unitario:</label><br />
        <input name="valor_unitario" value={form.valor_unitario} onChange={handleChange} type="number" step="0.01" required /><br /><br />

        <label>Tasa de Cambio:</label><br />
        <input name="tasa_cambio" value={form.tasa_cambio} onChange={handleChange} type="number" step="0.000001" required /><br /><br />

        <label>Estado de Exportación:</label><br />
        <input name="estado_exportacion" value={form.estado_exportacion} onChange={handleChange} required /><br /><br />

        <label>Empresa:</label><br />
        <select name="fk_empresa" value={form.fk_empresa} onChange={handleChange} required>
          <option value="">Seleccione una empresa</option>
          {empresas.map(e => (
            <option key={e.idEmpresa} value={e.idEmpresa}>{e.nombre}</option>
          ))}
        </select><br /><br />

        <label>Producto:</label><br />
        <select name="fk_producto" value={form.fk_producto} onChange={handleChange} required>
          <option value="">Seleccione un producto</option>
          {productos.map(p => (
            <option key={p.idProducto} value={p.idProducto}>{p.nombre}</option>
          ))}
        </select><br /><br />

        <label>País de Destino:</label><br />
        <select name="fk_pais" value={form.fk_pais} onChange={handleChange} required>
          <option value="">Seleccione un país</option>
          {paises.map(p => (
            <option key={p.idPais} value={p.idPais}>{p.nombre}</option>
          ))}
        </select><br /><br />

        <button type="submit">Registrar Exportación</button>
      </form>
    </div>
  );
}
