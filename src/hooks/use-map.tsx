import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { TOffer } from '../types/offer';

const TILE_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  location: TOffer['location']
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      const layer = new TileLayer(
        TILE_LAYER,
        {
          attribution:
            COPYRIGHT,
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, location]);

  return map;
}

export default useMap;
