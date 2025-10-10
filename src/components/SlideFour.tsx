"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function SlideFour() {
   const [LeafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    import("leaflet").then(L => {
      import("leaflet/dist/images/marker-icon-2x.png").then(({ default: markerIcon2x }) => {
        import("leaflet/dist/images/marker-icon.png").then(({ default: markerIcon }) => {
          import("leaflet/dist/images/marker-shadow.png").then(({ default: markerShadow }) => {
            L.Icon.Default.mergeOptions({
              iconRetinaUrl: markerIcon2x,
              iconUrl: markerIcon,
              shadowUrl: markerShadow,
            });
            setLeafletLoaded(true); 
          });
        });
      });
    });
  }, []);
  const positions: [number, number][] = [
    [51.505, -0.09],//uk
    [40.505, -0.09],//spain
    [30.505, -0.09],//algeria
    [20.505, -0.09],//mali
  ];

  const [countries, setCountries] = useState<{ [key: string]: string }>({});

  const fetchCountry = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      return data.address?.country || "Unknown";
    } catch (error) {
      console.error("Error fetching country:", error);
      return "Unknown";
    }
  };

  useEffect(() => {
    const fetchAllCountries = async () => {
      const countryPromises = positions.map(async ([lat, lon]) => {
        const country = await fetchCountry(lat, lon);
        return { key: `${lat},${lon}`, country };
      });
      
      const results = await Promise.all(countryPromises);
      const newCountries: { [key: string]: string } = {};
      results.forEach(({ key, country }) => {
        newCountries[key] = country;
      });
      
      setCountries(newCountries);
    };

    if (LeafletLoaded) {
      fetchAllCountries();
    }
  }, [LeafletLoaded]);

  if (!LeafletLoaded) return <div className="h-[80vh] w-[80vw] flex items-center justify-center">Loading map...</div>;
  return (
    <section className="flex items-center justify-center h-screen w-full snap-start">
      <div className="w-[80vw] h-[80vh]">
        <MapContainer
          center={positions[2]}
          zoom={4}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {positions.map(([lat, lon], index) => (
            <Marker 
              key={`${lat},${lon}`} 
              position={[lat, lon]}
              data-cy={`marker-${lat}-${lon}`}
            >
              <Popup>
                Country: {countries[`${lat},${lon}`] || "Loading..."}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
