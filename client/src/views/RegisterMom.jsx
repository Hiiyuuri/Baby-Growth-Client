import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Navigation from "../components/Navigation";
import { registerMother } from "../store/actions/actionCreator";
import Swal from "sweetalert2";
import { Card } from "react-bootstrap";
import Footer from "../components/Footer";

function RegisterMom() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [initCoords, setInitCoords] = useState({ lat: null, lng: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setInitCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.log("error");
      }
    );
  }, []);

  const setLocationInput = (event) => {
    setInputCreate({
      ...inputCreate,
      lat: event.lngLat.lat,
      lng: event.lngLat.lng,
    });
  };

  const [inputCreate, setInputCreate] = useState({
    name: "",
    NIK: "",
    password: "",
    address: "",
    lat: "",
    lng: "",
  });

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(registerMother(inputCreate))
      .then((created) => {
        navigate(`/register-pregnancy?motherId=${created.data.id}`);
        Swal.fire({
          title: "Mother's profile created!",
          text: "Please fill the pregnancy form",
          icon: "success",
        });
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 400") {
          Swal.fire({
            title: "Invalid Input!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#29b57d",
          });
        }
      });
  };

  return (
    <div
      className="h-full"
      style={{
        backgroundColor: "#eeee",
        minHeight: "100vh",
        paddingBottom: "10px",
      }}
    >
      <Navigation />

      <Card
        className="mx-auto"
        style={{
          width: "40vw",
          marginTop: "30px",
          marginBottom: "50px",
          borderRadius: "10px",
        }}
      >
        <Card.Header
          className="h2 text-white"
          style={{
            background: "#29b57d",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          Register Profil Ibu Baru
        </Card.Header>
        <Card.Body className="p-4" style={{ padding: "10px" }}>
          <form
            onSubmit={handleCreate}
            className="flex flex-col mb-4 text-gray-700 text-left"
          >
            <div className="w-full mb-4 text-black">
              <label className="block mb-1 font-semibold">Nama</label>
              <input
                onChange={(e) => {
                  setInputCreate({
                    ...inputCreate,
                    name: e.target.value,
                  });
                }}
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="w-full mb-4 text-black">
              <label className="block mb-1 font-semibold">NIK</label>
              <input
                onChange={(e) => {
                  setInputCreate({
                    ...inputCreate,
                    NIK: e.target.value,
                  });
                }}
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="w-full mb-4 text-black">
              <label className="block mb-1 font-semibold">Password</label>
              <input
                onChange={(e) => {
                  setInputCreate({
                    ...inputCreate,
                    password: e.target.value,
                  });
                }}
                type="password"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="w-full mb-4 text-black">
              <label className="block mb-1 font-semibold">Alamat</label>
              <input
                onChange={(e) => {
                  setInputCreate({
                    ...inputCreate,
                    address: e.target.value,
                  });
                }}
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div className="w-full mb-4 text-black">
              <label className="block mb-1 font-semibold">
                Pinpoint Lokasi
              </label>

              {initCoords.lat && (
                <Map
                  initialViewState={{
                    longitude: initCoords.lng,
                    latitude: initCoords.lat,
                    zoom: 12,
                  }}
                  style={{ width: "w-full", height: "30vh", margin: "auto" }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  mapboxAccessToken="pk.eyJ1IjoicmF5aGFubXVzdG9mYSIsImEiOiJjbDVtZ2p1MHQwOWQwM2pwMjNmdmlzNjgwIn0.x5rAaXLjR6yQDLuNQGinlQ"
                  onClick={setLocationInput}
                >
                  {inputCreate.lng && (
                    <Marker
                      longitude={inputCreate.lng}
                      latitude={inputCreate.lat}
                      anchor="bottom"
                    >
                      <img
                        src="https://i.ibb.co/6yv3wHz/pngwing-com-1.png"
                        width={40}
                        height={40}
                        alt=""
                      />
                    </Marker>
                  )}
                </Map>
              )}
            </div>

            <button
              className="btn btn-primary btn-lg btn-block "
              style={{
                background: "#29b57d",
              }}
            >
              Submit
            </button>
          </form>
          <button
            className="btn btn-danger btn-lg btn-block "
            onClick={() => {
              navigate(`/`);
            }}
          >
            Cancel
          </button>
        </Card.Body>
      </Card>

      <Footer />
    </div>
  );
}

export default RegisterMom;
