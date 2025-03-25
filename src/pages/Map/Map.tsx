import React, { useEffect, useState } from "react";
import { 
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonBackButton, IonItem, IonLabel, IonList, IonButtons
} from "@ionic/react";
import { Geolocation } from "@capacitor/geolocation";
import { Device } from "@capacitor/device";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import axios from "axios";
import "./Map.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const TravelDashboard: React.FC = () => {
    const [destination, setDestination] = useState<string>("");
    const [map, setMap] = useState<L.Map | null>(null);
    const [routeControl, setRouteControl] = useState<L.Routing.Control | null>(null);
    const [distance, setDistance] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
    const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
    const [userMarker, setUserMarker] = useState<L.Marker | null>(null);
    const [journeys, setJourneys] = useState<any[]>([]);

    useEffect(() => {
        const fetchBatteryInfo = async () => {
            try {
                const info = await Device.getBatteryInfo();
                setBatteryLevel(Math.round(info.batteryLevel! * 100));
            } catch (error) {
                console.error("Error fetching battery info:", error);
            }
        };
        fetchBatteryInfo();
    }, []);

    useEffect(() => {
        const initializeMap = async () => {
            try {
                const position = await Geolocation.getCurrentPosition();
                const { latitude, longitude } = position.coords;
                setCurrentLocation([latitude, longitude]);

                const leafletMap = L.map("map").setView([latitude, longitude], 15);

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "© OpenStreetMap contributors",
                }).addTo(leafletMap);

                const defaultIcon = L.icon({
                    iconUrl: icon,
                    shadowUrl: iconShadow,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                });

                L.Marker.prototype.options.icon = defaultIcon;

                const marker = L.marker([latitude, longitude], { icon: defaultIcon })
                    .addTo(leafletMap)
                    .bindPopup("📍 You are here")
                    .openPopup();

                setUserMarker(marker);
                setMap(leafletMap);
            } catch (error) {
                console.error("Error fetching current location:", error);
                alert("Failed to get GPS location. Please enable location services.");
            }
        };

        initializeMap();
    }, []);

    const handleRoute = async () => {
        if (!map || !currentLocation) return;
        setDistance(null);
        setTime(null);

        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`);
            if (response.data.length === 0) throw new Error("Address not found");
            const { lat, lon } = response.data[0];

            if (routeControl) map.removeControl(routeControl);

            const control = L.Routing.control({
                waypoints: [L.latLng(...currentLocation), L.latLng(parseFloat(lat), parseFloat(lon))],
                routeWhileDragging: true,
            }).addTo(map);

            control.on("routesfound", (e) => {
                const { totalDistance, totalTime } = e.routes[0].summary;
                setDistance(`${(totalDistance / 1000).toFixed(2)} km`);
                setTime(`${(totalTime / 60).toFixed(2)} mins`);
            });

            setRouteControl(control);
        } catch (error) {
            console.error("Error calculating route:", error);
            alert("Failed to calculate route. Please check the addresses.");
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>MAP</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2>📌 Travel Summary</h2>
                <p>🔋 Battery Level: {batteryLevel !== null ? `${batteryLevel}%` : "Loading..."}</p>
                
                <IonList>
                    <IonItem>
                        <IonLabel position="floating">Enter Destination</IonLabel>
                        <IonInput value={destination} onIonChange={(e) => setDestination(e.detail.value!)} />
                    </IonItem>
                </IonList>
                
                <IonButton expand="full" onClick={handleRoute}>Show Route</IonButton>
                {distance && time && (
                    <div>
                        <p>🛣️ Total Distance: {distance}</p>
                        <p>⏳ Estimated Time: {time}</p>
                    </div>
                )}
                
                <div id="map" className="map-container"></div>
                
                <h3>📅 Travel History</h3>
                <IonList>
                    {journeys.map((journey, index) => (
                        <IonItem key={index}>
                            <IonLabel>
                                <h3>{journey.date}</h3>
                                <p>Start: {journey.startTime} | End: {journey.endTime} | Distance: {journey.distance} km</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default TravelDashboard;
