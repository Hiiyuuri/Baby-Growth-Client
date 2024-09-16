import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MarkerComponent from "../components/MarkerComponent";
import Navigation from "../components/Navigation";
import { fetchMotherListOnly } from "../store/actions/actionCreator";
import Footer from "../components/Footer";

function MapMarkers() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [coords, setCoords] = useState([]);
  useEffect(() => {
    dispatch(fetchMotherListOnly()).then(data => {
      setCoords(data);
    });
  }, []);

  return (
    <div>
      <Navigation />

      <div className="position-relative">
        <div className="position-absolute">
          <span
            className="h3 px-2 py-1 text-white"
            style={{
              position: 'absolute', top: 20, left: "40%", elevation: 100, zIndex: 1000, background: "#29b57d",
              borderRadius: "5px 5px 5px 5px", 
            }}
          >Lokasi-Lokasi Ibu Terdaftar</span>
          <div className="position-relative">
            <Map
              initialViewState={{
                longitude: 106.582581,
                latitude: -5.776457,
                zoom: 9
              }}
              style={{ width: "100vw", height: "100vh", margin: "auto" }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken="pk.eyJ1IjoicmF5aGFubXVzdG9mYSIsImEiOiJjbDVtZ2p1MHQwOWQwM2pwMjNmdmlzNjgwIn0.x5rAaXLjR6yQDLuNQGinlQ"
            >
              {coords.map(el => {
                return <MarkerComponent el={el} key={el.id} />;
              })}
            </Map>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MapMarkers;
