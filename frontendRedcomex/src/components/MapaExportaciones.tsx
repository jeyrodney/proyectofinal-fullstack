// src/components/MapaExportaciones.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Globe, RefreshCw, XCircle } from 'lucide-react'; // Importar iconos de Lucide React

interface VolumenExportacion {
  pais: string;
  volumen: number;
}

interface Coordenada {
  lat: number;
  lng: number;
}

// Reemplazo del icono por defecto de Leaflet para usar los de Leaflet directamente
// No es necesario modificar L.Icon.Default.prototype._getIconUrl si las URLs son correctas.
// Sin embargo, si los iconos no se muestran, esta es la forma correcta de asegurar que se carguen.
// Asegúrate de que las rutas a los iconos sean accesibles desde donde se sirve tu aplicación.
// Si estás usando Vite, 'import.meta.url' es la forma correcta.
if (typeof L !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString(),
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString(),
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString(),
  });
}


// Mapeo de países a coordenadas manuales (puede crecer, idealmente venir de una DB)
const coordenadasPorPais: Record<string, Coordenada> = {
  'Afganistán': { lat: 33.9391, lng: 67.7100 },
  'Alemania': { lat: 51.1657, lng: 10.4515 },
  'Argentina': { lat: -38.4161, lng: -63.6167 },
  'Australia': { lat: -25.2744, lng: 133.7751 },
  'Brasil': { lat: -14.2350, lng: -51.9253 },
  'Canadá': { lat: 56.1304, lng: -106.3468 },
  'Chile': { lat: -35.6751, lng: -71.5430 },
  'China': { lat: 35.8617, lng: 104.1954 },
  'Corea del Sur': { lat: 35.9078, lng: 127.7669 },
  'Cuba': { lat: 21.5218, lng: -77.7812 },
  'Ecuador': { lat: -1.8312, lng: -78.1834 },
  'España': { lat: 40.4637, lng: -3.7492 },
  'Estados Unidos': { lat: 37.0902, lng: -95.7129 },
  'Francia': { lat: 46.6034, lng: 1.8883 },
  'India': { lat: 20.5937, lng: 78.9629 },
  'Italia': { lat: 41.8719, lng: 12.5674 },
  'Japón': { lat: 36.2048, lng: 138.2529 },
  'México': { lat: 23.6345, lng: -102.5528 },
  'Panamá': { lat: 8.5380, lng: -80.7821 },
  'Paraguay': { lat: -23.4425, lng: -58.4438 },
  'Perú': { lat: -9.1900, lng: -75.0152 },
  'Reino Unido': { lat: 55.3781, lng: -3.4360 },
  'Rusia': { lat: 61.5240, lng: 105.3188 },
  'Sudáfrica': { lat: -30.5595, lng: 22.9375 },
  'Uruguay': { lat: -32.5228, lng: -55.7658 },
  'Venezuela': { lat: 6.4238, lng: -66.5897 },
  'Colombia': { lat: 4.5709, lng: -74.2973 } // Añadimos Colombia
};

export default function MapaExportaciones() {
  const [volumenes, setVolumenes] = useState<VolumenExportacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVolumenes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/volumen-exportaciones`);
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        const data = await res.json();
        setVolumenes(data);
      } catch (err: any) {
        console.error('Error al cargar datos de exportación:', err);
        setError('No se pudieron cargar los datos de exportación. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchVolumenes();
  }, []);

  return (
    <div className="bg-gray-50 py-12 px-4"> {/* Fondo y padding consistentes */}
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-8 border border-emerald-100"> {/* Contenedor con estilo global */}
        <div className="flex items-center justify-center mb-8">
          <Globe className="w-10 h-10 text-emerald-600 mr-3" /> {/* Icono representativo */}
          <h2 className="text-3xl font-bold text-emerald-800">Mapa Global de Exportaciones</h2> {/* Título estilizado */}
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-lg">
            <RefreshCw className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
            <p className="text-lg text-emerald-700">Cargando datos del mapa...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-96 bg-red-100 border border-red-400 text-red-700 rounded-lg p-6">
            <XCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="font-bold text-xl mb-2">¡Error al cargar el mapa!</p>
            <p className="text-center">{error}</p>
            <p className="text-sm mt-2">Asegúrate de que el servidor de datos esté funcionando correctamente.</p>
          </div>
        )}

        {!loading && !error && (
          volumenes.length > 0 ? (
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md"> {/* Borde y sombra al mapa */}
              <MapContainer
                center={[20, 0]} // Centro del mapa (latitud, longitud)
                zoom={2}          // Nivel de zoom inicial
                minZoom={1.5}     // Zoom mínimo para no salirse del globo
                maxBounds={[[ -90, -180 ], [ 90, 180 ]]} // Limitar el mapa al mundo
                maxBoundsViscosity={1.0} // Evita que se arrastre el mapa fuera de los límites
                style={{ height: '600px', width: '100%', borderRadius: '8px' }} // Altura y bordes redondeados
              >
                <TileLayer
                  // Usando un TileLayer más neutral y moderno de CartoDB Positron
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CartoDB</a>'
                  url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" // Light map without labels
                />
                <TileLayer
                  // Capa adicional para las etiquetas de los países (para que no se superpongan con los marcadores si usas un basemap sin etiquetas)
                  attribution='' // No necesitamos atribución duplicada
                  url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" // Solo etiquetas
                />

                {volumenes.map((item, index) => {
                  const coords = coordenadasPorPais[item.pais];
                  if (!coords) {
                    console.warn(`Coordenadas no encontradas para el país: ${item.pais}`);
                    return null; // No renderizar si no hay coordenadas
                  }

                  // Calcular el tamaño del icono o el color basado en el volumen (ejemplo)
                  // const markerSize = Math.max(10, Math.min(30, item.volumen / 100)); // Ajusta según tus datos
                  // const customIcon = new L.Icon({
                  //   iconUrl: 'URL_DE_TU_ICONO_PERSONALIZADO.png',
                  //   iconSize: [markerSize, markerSize],
                  //   iconAnchor: [markerSize / 2, markerSize],
                  //   popupAnchor: [0, -markerSize],
                  // });

                  return (
                    <Marker key={index} position={[coords.lat, coords.lng]} /*icon={customIcon}*/>
                      <Popup>
                        <strong className="text-emerald-700">{item.pais}</strong><br />
                        Volumen de Exportación: <span className="font-semibold">{item.volumen.toLocaleString()}</span> unidades {/* Formato de número */}
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-20 bg-gray-100 rounded-lg">
              <p className="text-xl mb-4">No hay datos de exportaciones disponibles para mostrar en el mapa.</p>
              <Globe className="inline-block w-16 h-16 text-emerald-400" />
            </div>
          )
        )}
      </div>
    </div>
  );
}