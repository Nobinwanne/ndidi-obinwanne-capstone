import React, { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet"; // Leaflet.js for rendering maps

const MapWithVacantLots = () => {
  const [coords, setCoords] = useState(null); // Store fetched coordinates (longitude, latitude)
  const [lots, setLots] = useState([]); // Store vacant lots data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch longitude and latitude data from your backend
    const fetchCoordinates = async () => {
      try {
        // Replace this with your backend endpoint to get longitude/latitude data
        const response = await axios.get("/api/location"); // Example API request
        const { longitude, latitude } = response.data;
        setCoords({ longitude, latitude });
      } catch (err) {
        setError("Failed to fetch coordinates from backend");
        console.error(err);
      }
    };

    fetchCoordinates();
  }, []);

  useEffect(() => {
    if (!coords) return; // Wait for coords to be fetched

    const overpassUrl = "http://overpass-api.de/api/interpreter";

    // Bounding box coordinates (min_lat, min_lon, max_lat, max_lon) - a small area around the coordinates
    const bbox = `
      [bbox:${coords.latitude - 0.01},${coords.longitude - 0.01},${
      coords.latitude + 0.01
    },${coords.longitude + 0.01}];
    `;

    const overpassQuery = `
      [out:json];
      ${bbox}
      (
        way["landuse"="residential"];
        way["landuse"="commercial"];
        way["landuse"="industrial"];
        way["landuse"="brownfield"];
        way["vacant"="yes"];
      );
      out body;
      >;
      out skel qt;
    `;

    // Fetch data from Overpass API using bounding box
    const fetchVacantLots = async () => {
      try {
        const response = await axios.post(overpassUrl, {
          data: overpassQuery,
        });
        setLots(response.data.elements); // Save the response data (vacant lots)
      } catch (err) {
        setError("Failed to fetch vacant lots from Overpass API");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVacantLots();
  }, [coords]); // Fetch vacant lots once coordinates are available

  // Render a Leaflet map once the vacant lots and coordinates are loaded
  useEffect(() => {
    if (!coords || lots.length === 0) return;

    // Initialize Leaflet map
    const map = L.map("map").setView([coords.latitude, coords.longitude], 13);

    // Add tile layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add vacant lots to the map
    lots.forEach((lot) => {
      if (lot.type === "way" && lot.geometry) {
        const latlngs = lot.geometry.map((node) => [node.lat, node.lon]);
        L.polygon(latlngs, { color: "blue" }).addTo(map); // Draw polygon for each lot
      }
    });
  }, [coords, lots]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Vacant Lots for Development</h1>
      <div id="map" style={{ height: "500px", width: "100%" }}></div>{" "}
      {/* Map container */}
    </div>
  );
};

export default MapWithVacantLots;
