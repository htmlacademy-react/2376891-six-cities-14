import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { Offer } from '../../types/offer';

type TMapProps = {
  offers: Offer[];
  selectedOffer: Offer | undefined;
  location: Offer['city']['location'];
  block: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [40, 40],//[28, 40]
  iconAnchor: [20, 40],//[14, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({offers, selectedOffer, location, block}: TMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      map.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [map, location]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.city.location.latitude,
          lng: offer.city.location.longitude,
        });

        marker.setIcon(
          selectedOffer !== undefined && offer.id === selectedOffer.id ? currentCustomIcon : defaultCustomIcon
        )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return (
    <section
      className={`${block}__map map`}
      style={{
        height: '100%',
        minHeight: '500px',
        width: '100%',
        maxWidth: '1144px',
        margin: '0 auto',
      }}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
