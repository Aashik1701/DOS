// src/components/WaterQualityMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useWaterData from '../hooks/useWaterData';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markBlue from '../assets/markBlue.png'; // Adjust the path as necessary

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: import('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: import('leaflet/dist/images/marker-icon.png'),
    shadowUrl: import('leaflet/dist/images/marker-shadow.png'),
});

// Create a custom icon
const customIcon = L.icon({
    iconUrl: markBlue, // Path to your custom marker image
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

const WaterQualityMap = () => {
    const { data, loading, error } = useWaterData();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <MapContainer center={[46.0, -65.0]} zoom={8} style={{ height: "600px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=''
            />
            // src/components/WaterQualityMap.jsx
{data.map((location, index) => (
    <Marker 
        key={`${location.MonitoringLocationID}-${index}`} // Make key unique
        position={[location.MonitoringLocationLatitude, location.MonitoringLocationLongitude]} 
        icon={customIcon}
    >
        <Popup>
            <strong>{location.MonitoringLocationName}</strong><br />
            Salinity: {location.Salinity} ppth<br />
            Dissolved Oxygen: {location.Dissolved_Oxygen} mg/L<br />
            Total Coliform: {location.Total_Coliform} MPN<br />
        </Popup>
    </Marker>
))}
        </MapContainer>
    );
};

export default WaterQualityMap;