import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Navigation from "../components/Navigation";
import { registerMother } from "../store/actions/actionCreator";



function RegisterMom() {
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const [coords, setCoords] = useState({ lat: null, lng: null })
    const [initCoords, setInitCoords] = useState({ lat: null, lng: null })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('success')
            console.log(`Latitude : ${position.coords.latitude}`);
            console.log(`Longitude: ${position.coords.longitude}`);
            setInitCoords({ lat: position.coords.latitude, lng: position.coords.longitude })
            console.log(initCoords, `< init coords`)
        },
            () => { console.log('error') });

    }, [])

    const setLocationInput = (event) => {
        console.log(event.lngLat)

        setInputCreate({
            ...inputCreate,
            lat: event.lngLat.lat,
            lng: event.lngLat.lng
        })
    }

    const [inputCreate, setInputCreate] = useState({
        name: '',
        NIK: '',
        password: '',
        address: '',
        lat: '',
        lng: ''
    })


    const handleCreate = (e) => {
        e.preventDefault()
        console.log(inputCreate)

        dispatch(registerMother(inputCreate)) // =============== Nanti tinggal post axios lewat store/action
            .then(() => {
                navigate(`/register-pregnancy`)
            })
            .catch((err) => {
                console.log(err)
            })

    }



    return (
        <div>
            <Navigation />

            <div className="col-md-5 mx-auto border rounded p-5"
                style={{ marginTop: "100px" }}>
                <h2 className="text-2xl font-bold mb-5 text-center font-weight-bold"> Register New Mother Profile</h2>
                {/* <h2 className=""> Register Mother's Profile</h2> */}

                <form
                    onSubmit={handleCreate}
                    className="flex flex-col mb-4 text-gray-700 text-left">

                    <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold">Name</label>
                        <input
                            onChange={(e) => {
                                setInputCreate({
                                    ...inputCreate,
                                    name: e.target.value
                                })
                            }}
                            type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                    </div>

                    <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold">NIK</label>
                        <input
                            onChange={(e) => {
                                setInputCreate({
                                    ...inputCreate,
                                    NIK: e.target.value
                                })
                            }}
                            type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                    </div>

                    <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold">Password</label>
                        <input
                            onChange={(e) => {
                                setInputCreate({
                                    ...inputCreate,
                                    password: e.target.value
                                })
                            }}
                            type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                    </div>

                    <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold">Address</label>
                        <input
                            onChange={(e) => {
                                setInputCreate({
                                    ...inputCreate,
                                    address: e.target.value
                                })
                            }}
                            type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                    </div>
                    <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold">Pinpoint Location</label>

                        {initCoords.lat &&

                            <Map
                                initialViewState={{
                                    longitude: initCoords.lng,
                                    latitude: initCoords.lat,
                                    zoom: 12
                                }}
                                style={{ width: '30vw', height: '30vh', margin: "auto" }}
                                mapStyle="mapbox://styles/mapbox/streets-v9"
                                mapboxAccessToken="pk.eyJ1IjoicmF5aGFubXVzdG9mYSIsImEiOiJjbDVtZ2p1MHQwOWQwM2pwMjNmdmlzNjgwIn0.x5rAaXLjR6yQDLuNQGinlQ"
                                onClick={setLocationInput}
                            >
                                {inputCreate.lng && <Marker longitude={inputCreate.lng} latitude={inputCreate.lat} anchor="bottom" >
                                    <img
                                        src="https://i.ibb.co/6yv3wHz/pngwing-com-1.png"
                                        width={40}
                                        height={40} alt="" />
                                </Marker>}
                            </Map>
                        }
                    </div>

                    <button 
                    className="btn btn-primary btn-lg btn-block bg-success">
                        Submit
                    </button>


                </form>



            </div>
        </div>
    );
}

export default RegisterMom;
