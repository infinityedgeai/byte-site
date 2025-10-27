"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import teamData from "../data/team.json";
const centerofEurope: [number, number] = [50.0, 10.0];
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
const Tooltip = dynamic(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
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

  const positions: [number, number][] = teamData.map(member => member.coordinates as [number, number]);

  const getTeamMemberByCoordinates = (lat: number, lon: number) => {
    return teamData.find(member => 
      member.coordinates[0] === lat && member.coordinates[1] === lon
    );
  };

  if (!LeafletLoaded) return <div className="h-[80vh] w-[80vw] flex items-center justify-center">Loading map...</div>;
  return (
    <section className="flex items-center justify-center h-screen w-full snap-start scrollbar-hide">
      <div className="w-[80vw] h-[80vh] scrollbar-hide">
        <MapContainer
          center={centerofEurope}
          zoom={4}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {positions.map(([lat, lon], index) => {
            const teamMember = getTeamMemberByCoordinates(lat, lon);
            return (
              <Marker 
                key={`${lat},${lon}`} 
                position={[lat, lon]}
                data-cy={`marker-${lat}-${lon}`}
                data-testid={`marker-${index}`}
              >
                <Tooltip permanent={false} direction="top" offset={[-15, -20]}>
                  <div data-testid={`tooltip-${index}`} className="text-center p-2 bg-white rounded shadow-lg border">
                    {teamMember ? (
                      <>
                        <div className="font-bold text-gray-800">{teamMember.name}</div>
                        <div className="text-sm text-gray-600">{teamMember.role}</div>
                        <div className="text-xs text-gray-500">{teamMember.location}</div>
                      </>
                    ) : (
                      <div>Team Member</div>
                    )}
                  </div>
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </section>
  );
}
