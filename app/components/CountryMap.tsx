import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { FullscreenControl } from 'react-leaflet-fullscreen';
import 'react-leaflet-fullscreen/styles.css';
import { LeafletCountry } from '../types/country';

interface CountryMapProps {
  countries: LeafletCountry[];
}

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

const customMarkerIcon = L.icon({
  iconUrl: '/assets/images/marker-icon.png', // The path to your custom marker image
  iconSize: [15, 30], // Size of the icon
  iconAnchor: [10, 20], // Point of the icon which will correspond to marker's location
  popupAnchor: [-3, -36], // Point from which the popup should open relative to the iconAnchor
});

const CountryMap: React.FC<CountryMapProps> = ({ countries }) => {
  const states = (country: LeafletCountry) => {
    if (country.states.length > 0) {
      return (
        <>
          <strong>States:</strong>{' '}
          {country.states.map((state) => state.name).join(', ')}
        </>
      );
    }
  };
  return (
    <MapContainer center={[20, 0]} zoom={2}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {countries?.map((country) => (
        <Marker
          key={country.code}
          position={[country.latitude as number, country.longitude as number]}
          icon={customMarkerIcon}
        >
          <Popup>
            <strong>{country.name}</strong>
            <br />
            <strong>Capital:</strong> {country.capital}
            <br />
            <strong>Languages:</strong>{' '}
            <ul>
              {country.languages.map((lang, index) => (
                <li key={index}>{lang.name}</li>
              ))}
            </ul>
            {states(country)}
          </Popup>
        </Marker>
      ))}
      <FullscreenControl position="topright" />
    </MapContainer>
  );
};
export default CountryMap;
