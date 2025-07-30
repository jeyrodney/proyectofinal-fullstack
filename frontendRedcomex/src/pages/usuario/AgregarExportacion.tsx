import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Save, XCircle, Loader2, RefreshCw } from 'lucide-react'; // Iconos para el formulario y estados de carga/error

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

  const [loadingPaises, setLoadingPaises] = useState(true);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [loadingEmpresas, setLoadingEmpresas] = useState(true);
  const [errorPaises, setErrorPaises] = useState<string | null>(null);
  const [errorProductos, setErrorProductos] = useState<string | null>(null);
  const [errorEmpresas, setErrorEmpresas] = useState<string | null>(null);

  const [pais, setPais] = useState('');
  const [producto, setProducto] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [estado, setEstado] = useState('');

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  const usuarioInfo = JSON.parse(localStorage.getItem('usuario') || '{}');

  useEffect(() => {
    const fetchPaises = async () => {
      setLoadingPaises(true);
      setErrorPaises(null);
      try {
        const res = await fetch('http://localhost:4567/paises');
        if (!res.ok) throw new Error('Error al cargar países.');
        const data = await res.json();
        setPaises(data);
      } catch (err: any) {
        console.error('Error fetching paises:', err);
        setErrorPaises('No se pudieron cargar los países.');
      } finally {
        setLoadingPaises(false);
      }
    };

    const fetchProductos = async () => {
      setLoadingProductos(true);
      setErrorProductos(null);
      try {
        const res = await fetch('http://localhost:4567/productos');
        if (!res.ok) throw new Error('Error al cargar productos.');
        const data = await res.json();
        setProductos(data);
      } catch (err: any) {
        console.error('Error fetching productos:', err);
        setErrorProductos('No se pudieron cargar los productos.');
      } finally {
        setLoadingProductos(false);
      }
    };

    const fetchEmpresasUsuario = async () => {
      setLoadingEmpresas(true);
      setErrorEmpresas(null);
      if (usuarioInfo && usuarioInfo.correo) {
        try {
          const res = await fetch(`http://localhost:4567/empresas-usuario/${usuarioInfo.correo}`);
          if (!res.ok) throw new Error('Error al cargar empresas del usuario.');
          const data = await res.json();
          setEmpresas(data);
        } catch (err: any) {
          console.error('Error fetching empresas-usuario:', err);
          setErrorEmpresas('No se pudieron cargar tus empresas.');
        } finally {
          setLoadingEmpresas(false);
        }
      } else {
        setErrorEmpresas('Información de usuario no disponible para cargar empresas.');
        setLoadingEmpresas(false);
      }
    };

    fetchPaises();
    fetchProductos();
    fetchEmpresasUsuario();
  }, [usuarioInfo.correo]); // Dependencia del correo para recargar si cambia el usuario

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setMessage(null);

    // Validación de campos antes de enviar
    if (!pais || !producto || !empresa || !cantidad || !fecha || !valorUnitario || !estado) {
      setMessage({ type: 'error', text: 'Todos los campos son obligatorios.' });
      setLoadingSubmit(false);
      return;
    }

    if (isNaN(parseInt(cantidad)) || parseInt(cantidad) <= 0) {
      setMessage({ type: 'error', text: 'La cantidad debe ser un número positivo.' });
      setLoadingSubmit(false);
      return;
    }

    if (isNaN(parseFloat(valorUnitario)) || parseFloat(valorUnitario) <= 0) {
      setMessage({ type: 'error', text: 'El valor unitario debe ser un número positivo.' });
      setLoadingSubmit(false);
      return;
    }
    
    const exportacion = {
      cantidad: parseInt(cantidad),
      fechaExp: fecha,
      valorUnitario: parseFloat(valorUnitario),
      estadoExportacion: estado,
      fkEmpresa: parseInt(empresa),
      fkProducto: parseInt(producto),
      fkPais: parseInt(pais)
    };

    try {
      const res = await fetch('http://localhost:4567/exportacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exportacion)
      });

      const resultado = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: resultado.mensaje || 'Exportación registrada exitosamente.' });
        // Limpiar todos los campos después de guardar la exportación
        setPais('');
        setProducto('');
        setEmpresa('');
        setCantidad('');
        setFecha('');
        setValorUnitario('');
        setEstado('');
        // Redirigir después de un breve retraso
        setTimeout(() => navigate('/menu-usuario'), 1500);
      } else {
        setMessage({ type: 'error', text: resultado.error || 'Error al registrar la exportación. Intente de nuevo.' });
      }
    } catch (error) {
      console.error('Error de red al registrar exportación:', error);
      setMessage({ type: 'error', text: 'No se pudo conectar con el servidor. Por favor, verifique su conexión.' });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleCancel = () => {
    navigate('/menu-usuario'); // Volver al menú de usuario
  };

  return (
    <div className="bg-gray-50 py-10 px-4 flex justify-center items-start">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-lg p-8 border border-emerald-100">
        <div className="flex items-center justify-center mb-8">
          <Package className="w-10 h-10 text-emerald-600 mr-3" />
          <h2 className="text-3xl font-bold text-emerald-800">Registrar Nueva Exportación</h2>
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded-lg text-center ${
            message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' :
            'bg-red-100 text-red-800 border border-red-300'
          }`}>
            <p>{message.text}</p>
          </div>
        )}

        <form onSubmit={manejarEnvio} className="space-y-6">
          {/* Empresa Select */}
          <div>
            <label htmlFor="empresa" className="block text-gray-700 text-sm font-semibold mb-2">Empresa:</label>
            {loadingEmpresas ? (
              <div className="flex items-center justify-center py-2 text-emerald-600">
                <Loader2 className="animate-spin mr-2" /> Cargando empresas...
              </div>
            ) : errorEmpresas ? (
              <div className="text-red-600 text-sm flex items-center">
                <XCircle className="w-4 h-4 mr-1" /> {errorEmpresas}
              </div>
            ) : (
              <select
                id="empresa"
                value={empresa}
                onChange={e => setEmpresa(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
              >
                <option value="">Seleccione una empresa</option>
                {empresas.map(emp => (
                  <option key={emp.idEmpresa} value={emp.idEmpresa}>{emp.nombre}</option>
                ))}
              </select>
            )}
          </div>

          {/* Producto Select */}
          <div>
            <label htmlFor="producto" className="block text-gray-700 text-sm font-semibold mb-2">Producto:</label>
            {loadingProductos ? (
              <div className="flex items-center justify-center py-2 text-emerald-600">
                <Loader2 className="animate-spin mr-2" /> Cargando productos...
              </div>
            ) : errorProductos ? (
              <div className="text-red-600 text-sm flex items-center">
                <XCircle className="w-4 h-4 mr-1" /> {errorProductos}
              </div>
            ) : (
              <select
                id="producto"
                value={producto}
                onChange={e => setProducto(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
              >
                <option value="">Seleccione un producto</option>
                {productos.map(p => (
                  <option key={p.idProducto} value={p.idProducto}>{p.nombre}</option>
                ))}
              </select>
            )}
          </div>

          {/* País destino Select */}
          <div>
            <label htmlFor="pais" className="block text-gray-700 text-sm font-semibold mb-2">País destino:</label>
            {loadingPaises ? (
              <div className="flex items-center justify-center py-2 text-emerald-600">
                <Loader2 className="animate-spin mr-2" /> Cargando países...
              </div>
            ) : errorPaises ? (
              <div className="text-red-600 text-sm flex items-center">
                <XCircle className="w-4 h-4 mr-1" /> {errorPaises}
              </div>
            ) : (
              <select
                id="pais"
                value={pais}
                onChange={e => setPais(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
              >
                <option value="">Seleccione un país</option>
                {paises.map(p => (
                  <option key={p.idPais} value={p.idPais}>{p.nombre}</option>
                ))}
              </select>
            )}
          </div>

          {/* Cantidad Input */}
          <div>
            <label htmlFor="cantidad" className="block text-gray-700 text-sm font-semibold mb-2">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              onChange={e => setCantidad(e.target.value)}
              required
              min="1" // No permitir cantidades menores a 1
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
              placeholder="Ej: 100"
            />
          </div>

          {/* Fecha de Exportación Input */}
          <div>
            <label htmlFor="fecha" className="block text-gray-700 text-sm font-semibold mb-2">Fecha de Exportación:</label>
            <input
              type="date"
              id="fecha"
              value={fecha}
              onChange={e => setFecha(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
            />
          </div>

          {/* Valor Unitario Input */}
          <div>
            <label htmlFor="valorUnitario" className="block text-gray-700 text-sm font-semibold mb-2">Valor Unitario (COP):</label>
            <input
              type="number"
              id="valorUnitario"
              step="0.01"
              value={valorUnitario}
              onChange={e => setValorUnitario(e.target.value)}
              required
              min="0.01" // No permitir valores menores a 0.01
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
              placeholder="Ej: 15000.50"
            />
          </div>

          {/* Estado de Exportación Input (Considerar un select o enum si los estados son fijos) */}
          <div>
            <label htmlFor="estado" className="block text-gray-700 text-sm font-semibold mb-2">Estado de Exportación:</label>
            <input
              type="text"
              id="estado"
              value={estado}
              onChange={e => setEstado(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 shadow-sm"
              placeholder="Ej: En tránsito, Entregado, Pendiente"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-4 pt-4">

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 flex items-center shadow-md"
              disabled={loadingSubmit || loadingPaises || loadingProductos || loadingEmpresas} // Deshabilitar si aún se están cargando datos iniciales
            >
              {loadingSubmit ? (
                <Loader2 className="animate-spin h-5 w-5 mr-3 text-white" />
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              {loadingSubmit ? 'Registrando...' : 'Registrar Exportación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}