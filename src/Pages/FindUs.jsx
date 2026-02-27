import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./FindUs.css";

// Ensure default marker assets are found in Vite build
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const FindUs = () => {
  const position = [59.19445, 18.13245];

  return (
    <div className="page-shell findus-shell">
      <div className="findus-header">
        <span className="section-label">Polarmotor</span>
        <h1 className="section-heading">Hitta oss</h1>
        <p className="findus-lede">Polarvägen 7, 136 49 Haninge</p>
      </div>

      <div className="map-card card-surface">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          className="findus-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <div className="popup-content">
                <strong>Polarmotor</strong>
                <div>Polarvägen 7, 136 49 Haninge</div>
                <a
                  href="https://www.google.com/maps?q=59.19445,18.13245"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Öppna i Google Maps
                </a>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default FindUs;
