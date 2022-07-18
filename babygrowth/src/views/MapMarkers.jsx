import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MarkerComponent from "../components/MarkerComponent";



function MapMarkers() {
    // const dispatch = useDispatch()
    let navigate = useNavigate()

    const [coords, setCoords] = useState([
        { id: 1, lat: -5.794452, lng: 106.484141, name: 'suparjo' },
        { id: 2, lat: -5.798108, lng: 106.497670, name: 'sutiyem' },
        { id: 3, lat: -5.857511, lng: 106.619297, name: 'tsunade' },
        { id: 4, lat: -5.655742, lng: 106.566803, name: 'wanwan' },
        { id: 5, lat: -5.653082, lng: 106.580337, name: 'vexana' },
    ]
    )

    return (

        <div className="flex-col w-[80%] mx-auto mt-10 border-2 border-slate-200 justify-center p-7 block bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-5 text-center">Registered Mother Locations</h1>
            <div className="w-full mb-4 text-black">


                <Map 
                    initialViewState={{
                        longitude: 106.582581,
                        latitude: -5.776457,
                        zoom: 9
                    }}
                    style={{ width: '70vw', height: '70vh', margin: "auto" }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken="pk.eyJ1IjoicmF5aGFubXVzdG9mYSIsImEiOiJjbDVtZ2p1MHQwOWQwM2pwMjNmdmlzNjgwIn0.x5rAaXLjR6yQDLuNQGinlQ"
                >

                    {coords.map((el) => {
                        return <MarkerComponent el={el} key={el.id} />
                    })}
                </Map>

            </div>





        </div>
    );
}

export default MapMarkers;
