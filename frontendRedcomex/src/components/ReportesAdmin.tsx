import { useState, useEffect } from 'react';
import { FileText, Users, Building2, Download } from 'lucide-react'; // Importar iconos

const ReportesAdmin = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [empresas, setEmpresas] = useState<any[]>([]);
  const [cantidadUsuarios, setCantidadUsuarios] = useState(0);
  const [cantidadEmpresas, setCantidadEmpresas] = useState(0);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<'usuarios' | 'empresas'>('usuarios');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (opcionSeleccionada === 'usuarios') {
          const resUsuarios = await fetch('http://localhost:4567/reportes/usuarios');
          if (!resUsuarios.ok) throw new Error('Error al cargar el reporte de usuarios.');
          const dataUsuarios = await resUsuarios.json();
          setUsuarios(dataUsuarios.usuarios || []); // Asegurar que sea un array
          setCantidadUsuarios(dataUsuarios.cantidad || 0);
        } else if (opcionSeleccionada === 'empresas') {
          const resEmpresas = await fetch('http://localhost:4567/reportes/empresas');
          if (!resEmpresas.ok) throw new Error('Error al cargar el reporte de empresas.');
          const dataEmpresas = await resEmpresas.json();
          setEmpresas(dataEmpresas.empresas || []); // Asegurar que sea un array
          setCantidadEmpresas(dataEmpresas.cantidad || 0);
        }
      } catch (err: any) {
        setError(err.message || 'Ocurrió un error al cargar los datos del reporte.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [opcionSeleccionada]);

  const exportToCSV = (data: any[], filename: string, columns: string[]) => {
    if (data.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    const csvRows = [];
    // Encabezados
    csvRows.push(columns.join(','));

    // Datos
    for (const row of data) {
      csvRows.push(columns.map(col => {
        // Manejar casos especiales para anidamiento o nombres de propiedades
        if (col === 'nombreRol' && row.nombreRol) return `"${row.nombreRol}"`;
        if (col === 'usuarioNombre' && row.usuarioNombre) return `"${row.usuarioNombre}"`;
        return `"${row[col] || ''}"`; // Asegurar que todos los campos estén entre comillas y manejar undefined
      }).join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    if (opcionSeleccionada === 'usuarios') {
      exportToCSV(usuarios, 'reporte_usuarios.csv', ['nombre', 'nombreRol', 'correo', 'numDocumento', 'celular']); // Incluir todos los campos relevantes
    } else if (opcionSeleccionada === 'empresas') {
      exportToCSV(empresas, 'reporte_empresas.csv', ['nombre', 'nit', 'usuarioNombre', 'telefono', 'direccion']); // Incluir todos los campos relevantes
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 py-10 px-4">
      <main className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-8 border border-emerald-100">
        <div className="flex items-center justify-center mb-8">
          <FileText className="w-10 h-10 text-emerald-600 mr-3" />
          <h1 className="text-3xl font-bold text-emerald-800">Generar Reportes</h1>
        </div>

        {/* Selector de tipo de reporte */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex-grow">
            <label htmlFor="report-select" className="sr-only">Seleccionar tipo de reporte</label>
            <div className="relative">
              <select
                id="report-select"
                value={opcionSeleccionada}
                onChange={(e) => setOpcionSeleccionada(e.target.value as 'usuarios' | 'empresas')}
                className="w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm appearance-none bg-white pr-10
                           focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 text-lg text-gray-700 font-medium"
              >
                <option value="usuarios">Reporte de Usuarios</option>
                <option value="empresas">Reporte de Empresas</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md text-lg"
            disabled={loading || (opcionSeleccionada === 'usuarios' ? usuarios.length === 0 : empresas.length === 0)}
          >
            <Download className="w-5 h-5 mr-2" /> Exportar a CSV
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"></div>
            <p className="ml-4 text-emerald-700">Cargando reporte de {opcionSeleccionada}...</p>
          </div>
        )}

        {error && (
          <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-bold">¡Error!</p>
            <p>{error}</p>
            <p className="mt-2 text-sm">Por favor, inténtalo de nuevo más tarde.</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {opcionSeleccionada === 'usuarios' && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-5 text-emerald-700 flex items-center">
                  <Users className="w-6 h-6 mr-2" /> Reporte de Usuarios ({cantidadUsuarios} totales)
                </h2>
                {usuarios.length > 0 ? (
                  <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-100">
                    <table className="min-w-full table-auto border-collapse">
                      <thead className="bg-emerald-100 text-emerald-800">
                        <tr>
                          <th className="px-5 py-3 border-b-2 border-emerald-200 text-left text-sm font-semibold tracking-wider">Nombre Completo</th>
                          <th className="px-5 py-3 border-b-2 border-emerald-200 text-left text-sm font-semibold tracking-wider">Rol</th>
                          <th className="px-5 py-3 border-b-2 border-emerald-200 text-left text-sm font-semibold tracking-wider">Correo</th>
                          <th className="px-5 py-3 border-b-2 border-emerald-200 text-left text-sm font-semibold tracking-wider">Documento</th>
                          <th className="px-5 py-3 border-b-2 border-emerald-200 text-left text-sm font-semibold tracking-wider">Celular</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuarios.map((usuario, index) => (
                          <tr key={usuario.usuarioId || index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-emerald-50 text-gray-700`}>
                            <td className="px-5 py-3 border-b border-gray-200 text-sm">{usuario.nombre}</td>
                            <td className="px-5 py-3 border-b border-gray-200 text-sm">{usuario.nombreRol}</td>
                            <td className="px-5 py-3 border-b border-gray-200 text-sm">{usuario.correo}</td>
                            <td className="px-5 py-3 border-b border-gray-200 text-sm">{usuario.numDocumento}</td>
                            <td className="px-5 py-3 border-b border-gray-200 text-sm">{usuario.celular}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No hay usuarios registrados.</p>
                )}
              </div>
            )}

            {opcionSeleccionada === 'empresas' && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-5 text-emerald-700 flex items-center">
                  <Building2 className="w-6 h-6 mr-2" /> Reporte de Empresas ({cantidadEmpresas} totales)
                </h2>
                {empresas.length > 0 ? (
                  <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-100">
                    <table className="min-w-full table-auto border-collapse">
                      <thead className="bg-emerald-100 text-emerald-800">
                        <tr>
                          <th className="px-5 py-3 border-b-2 border-emerald-200 text-left text-sm font-semibold tracking-wider">Nombre Empresa</th>
                          <th className="px-5 py-3 border-b-2 border-emerald-200 text-left text-sm font-semibold tracking-wider">NIT</th>
                          <th className="px-5 py-3 border-b-2 border-emerald-200 text-left text-sm font-semibold tracking-wider">Representante</th>
                        </tr>
                      </thead>
                      <tbody>
                        {empresas.map((empresa, index) => (
                          <tr key={empresa.idEmpresa || index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-emerald-50 text-gray-700`}>
                            <td className="px-5 py-3 border-b border-gray-200 text-sm">{empresa.nombre}</td>
                            <td className="px-5 py-3 border-b border-gray-200 text-sm">{empresa.nit}</td>
                            <td className="px-5 py-3 border-b border-gray-200 text-sm">{empresa.usuarioNombre}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No hay empresas registradas.</p>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ReportesAdmin;