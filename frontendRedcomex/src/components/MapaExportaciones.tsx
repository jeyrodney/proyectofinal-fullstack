// src/components/MapaExportaciones.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

interface VolumenExportacion {
  pais: string;
  volumen: number;
}

interface Coordenada {
  lat: number;
  lng: number;
}

// Reemplazo del icono por defecto de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString(),
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString(),
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString(),
});

// Mapeo de países a coordenadas manuales
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
  'Venezuela': { lat: 6.4238, lng: -66.5897 }
};

export default function MapaExportaciones() {
  const [volumenes, setVolumenes] = useState<VolumenExportacion[]>([]);

  useEffect(() => {
    fetch('http://localhost:4567/volumen-exportaciones')
      .then(res => res.json())
      .then(data => setVolumenes(data))
      .catch(err => console.error('Error al cargar datos:', err));
  }, []);

  return (
    <div className="px-4 mt-12">
      <h3 className="text-2xl font-semibold text-center text-indigo-700 mb-4">Mapa de Exportaciones por País</h3>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
        <TileLayer
        attribution='&copy; <a href="https://carto.com/">Carto</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {volumenes.map((item, index) => {
          const coords = coordenadasPorPais[item.pais];
          if (!coords) return null;

          return (
            <Marker key={index} position={[coords.lat, coords.lng]}>
              <Popup>
                <strong>{item.pais}</strong><br />
                Volumen: {item.volumen}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
