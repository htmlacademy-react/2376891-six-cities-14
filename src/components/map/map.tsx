import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { TOffer } from '../../types/offer';

type TMapProps = {
  offers: TOffer[];
  selectedOffer: TOffer | undefined;
  location: TOffer['city']['location'];
  block: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: 'public/img/pin.svg',
});

const currentCustomIcon = new Icon({
  iconUrl: 'public/img/pin-active.svg',
});

function Map({ offers, selectedOffer, location, block }: TMapProps): JSX.Element {
  const viewLocation = selectedOffer ? selectedOffer.city.location : location;
  const mapRef = useRef(null);
  const map = useMap(mapRef, viewLocation);

  useEffect(() => {
    if (map) {
      map.setView([viewLocation.latitude, viewLocation.longitude], viewLocation.zoom);
    }
  }, [map, viewLocation]);

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
