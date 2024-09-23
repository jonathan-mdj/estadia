import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Mapa = ({ setLocation }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 19.4326, lng: -99.1332 }); // Centrado en Ciudad de México
  const [markerPosition, setMarkerPosition] = useState(mapCenter); // Posición del marcador

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newPosition = { lat, lng };

    setLocation(newPosition); // Actualiza la ubicación en el estado del formulario
    setMarkerPosition(newPosition); // Actualiza la posición del marcador
    setMapCenter(newPosition); // Centra el mapa en la nueva ubicación
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyB8L3adDqDcAuk3xT_HiIEwzptzG-ziPXU"> {/* Reemplaza con tu clave de API */}
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={mapCenter}
        zoom={10}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} /> {/* Muestra el marcador en la posición seleccionada */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Mapa;
