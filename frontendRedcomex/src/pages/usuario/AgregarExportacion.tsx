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
  const navigate = useNavigate();

  const usuarioInfo = JSON.parse(localStorage.getItem('usuario') || '{}');

  useEffect(() => {
    fetch('http://localhost:4567/paises')
      .then(res => res.json())
      .then(data => setPaises(data));

    fetch('http://localhost:4567/productos')
      .then(res => res.json())
      .then(data => setProductos(data));

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

    // Limpiar todos los campos después de guardar la exportación
    setPais('');
    setProducto('');
    setEmpresa('');
    setCantidad('');
    setFecha('');
    setValorUnitario('');
    setEstado('');

    // Redirigir al menú de usuario
    navigate('/menu-usuario');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-indigo-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Registrar Nueva Exportación</h1>
      </header>

      <main className="px-6 py-10 max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={manejarEnvio} className="space-y-6">
            <div>
              <label className="block font-medium text-sm text-gray-700">Empresa:</label>
              <select
                value={empresa}
                onChange={e => setEmpresa(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Seleccione una empresa</option>
                {empresas.map(emp => (
                  <option key={emp.idEmpresa} value={emp.idEmpresa}>{emp.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700">Producto:</label>
              <select
                value={producto}
                onChange={e => setProducto(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Seleccione un producto</option>
                {productos.map(p => (
                  <option key={p.idProducto} value={p.idProducto}>{p.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700">País destino:</label>
              <select
                value={pais}
                onChange={e => setPais(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Seleccione un país</option>
                {paises.map(p => (
                  <option key={p.idPais} value={p.idPais}>{p.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700">Cantidad:</label>
              <input
                type="number"
                value={cantidad}
                onChange={e => setCantidad(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700">Fecha de Exportación:</label>
              <input
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700">Valor Unitario (COP):</label>
              <input
                type="number"
                step="0.01"
                value={valorUnitario}
                onChange={e => setValorUnitario(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700">Estado de Exportación:</label>
              <input
                type="text"
                value={estado}
                onChange={e => setEstado(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300"
              >
                Registrar Exportación
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
