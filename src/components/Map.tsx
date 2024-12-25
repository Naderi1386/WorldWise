import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, useMap,  useMapEvents } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import useCities from "./Contexts/CustomContext";
import { useGeolocation } from "./useGeolocation";
import Button from "./Button";
import { useParams } from "../CustomParams";
import User from "./User";
import { useAuth } from "./Contexts/useAuth";

const Map = () => {
  const [position, setPosition] = useState<number[]>([40, 0]);
  const { lat, lng } = useParams();
  // const navigate = useNavigate();
  const { cities } = useCities();
  const { isLoading, getPosition, Position } = useGeolocation();
  const {user}=useAuth()

  useEffect(() => {
    if (lat && lng) setPosition([Number(lat), Number(lng)]);
  }, [lat, lng]);
  useEffect(() => {
    if (Position?.lat && Position.lng)
      setPosition([Position.lat, Position.lng]);
  }, [Position]);

  return (
    <div className={styles.mapContainer}>
      {!Position && (
        <Button type="position" onClick={getPosition}>
          {isLoading ? "...Loading" : "Use your position"}
        </Button>
      )}
      {user && <User user={user} />}

      <MapContainer
        className={styles.map}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities &&
          cities.map((c) => (
            <Marker key={c.id} position={[c.position.lat, c.position.lng]}>
              <Popup>
                <span>
                  {c.emoji} {c.cityName}
                </span>
              </Popup>
            </Marker>
          ))}
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};
interface ChangeCenterPropType {
  position: number[];
}
const ChangeCenter = ({ position }: ChangeCenterPropType) => {
  const map = useMap();
  map.setView(position);
  return null;
};
interface latlngType {
  lat: number;
  lng: number;
}
interface onCityClicked {
  latlng: latlngType;
}
const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e: onCityClicked) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
};

export default Map;
