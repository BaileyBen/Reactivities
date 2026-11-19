import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, Point } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

type Props = {
  position: [number, number];
  venue: string;
};

export default function MapComponent({ position, venue }: Props) {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={position}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            shadowUrl: markerShadowPng,
            iconSize: new Point(25, 41),
            iconAnchor: new Point(12, 41),
          })
        }
      >
        <Popup>{venue}</Popup>
      </Marker>
    </MapContainer>
  );
}
