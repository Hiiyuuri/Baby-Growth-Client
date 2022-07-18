import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Navigation from "../components/Navigation";


function RegisterMom() {
    // const dispatch = useDispatch()
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

        // dispatch(createMother(inputCreate)) // =============== Nanti tinggal post axios lewat store/action
        //     .then(() => {
        //         navigate(`/`)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })

    }



    return (
<>
<Navigation />
        <div className="flex-col w-[40%] mx-auto mt-10 border-2 border-slate-200 justify-center p-7 block bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-5 text-center"> Register Mother's Profile</h1>

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
                                    height={40} />
                            </Marker>}
                        </Map>
                    }
                </div>


                <button className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md bg-emerald-400 hover:bg-emerald-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3">
                    Submit
                </button>


            </form>



        </div>
        </>
    );
}

export default RegisterMom;
