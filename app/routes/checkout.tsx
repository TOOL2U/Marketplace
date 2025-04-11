import React, { useEffect, useRef, useState } from 'react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDRDTFpVwaAjihQ1SLUuCeZLuIRhBj4seY';

export default function Checkout() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const existingScript = document.getElementById('google-maps-script');

      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => initializeMap();
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (mapRef.current && !map) {
        const newMap = new google.maps.Map(mapRef.current, {
          center: { lat: 9.751085, lng: 99.975936 }, // Default location
          zoom: 12,
        });
        setMap(newMap);
      }
    };

    loadGoogleMapsScript();
  }, [map]);

  return (
    <div className="checkout-page">
      <h1>Checkout Page</h1>
      <div
        ref={mapRef}
        style={{ width: '100%', height: '400px', marginTop: '20px' }}
      ></div>
    </div>
  );
}