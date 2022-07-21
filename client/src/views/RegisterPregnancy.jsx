import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { registerPregnancy } from "../store/actions/actionCreator";
import Swal from "sweetalert2";
import { Card } from "react-bootstrap";
import Footer from "../components/Footer";

function RegisterPregnancy() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();
  let [query, setQuery] = useState(searchParams.get("motherId"));

  useEffect(() => {
    if (+query) {
      setInputCreate({ ...inputCreate, MotherProfileId: +query });
    }
  }, []);

  const [inputCreate, setInputCreate] = useState({
    MotherProfileId: "",
    name: "",
    sudahLahir: Boolean,
  });

  const handleCreate = (e) => {
    e.preventDefault();

    dispatch(registerPregnancy(inputCreate))
      .then((created) => {
        if (!created.sudahLahir) {
          navigate(`/create-preg-data?PregnancyId=${created.data.id}`);
        } else {
          navigate(`/create-baby-data?PregnancyId=${created.data.id}`);
        }
        Swal.fire({
          title: `Success!`,
          text: `Pregnancy with ID : ${created.data.id} Created !`,
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
      }}
    >
      <Navigation />
      <Card
        className="mx-auto"
        style={{
          width: "40vw",
          marginTop: "30px",
          marginBottom: "10px",
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
          Register Kehamilan Baru
        </Card.Header>
        <Card.Body className="p-4" style={{ padding: "10px" }}>
          <form
            onSubmit={handleCreate}
            className="flex flex-col mb-4 text-gray-700 text-left"
          >
            {query && (
              <div className="w-full mb-4 text-black">
                <label className="block mb-1 font-semibold">ID Ibu</label>
                <input
                  value={query}
                  onChange={(e) => {
                    setInputCreate({
                      ...inputCreate,
                      MotherProfileId: e.target.value,
                    });
                  }}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
            )}

            {!query && (
              <div className="w-full mb-4 text-black">
                <label className="block mb-1 font-semibold">Id Ibu</label>
                <input
                  onChange={(e) => {
                    setInputCreate({
                      ...inputCreate,
                      MotherProfileId: e.target.value,
                    });
                  }}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
            )}
            <div className="w-full mb-4 text-black">
              <label className="block mb-1 font-semibold d-block">
                Nama Kehamilan
              </label>

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
              <label className="d-block">Status Kehamilan</label>
              <select
                onChange={(e) => {
                  setInputCreate({
                    ...inputCreate,
                    sudahLahir: e.target.value,
                  });
                }}
                defaultValue="blumDiisi"
                className="selectpicker"
              >
                <option value="blumDiisi" disabled>
                  Select your option ...
                </option>
                <option value={false}>Bayi belum lahir</option>
                <option value={true}>Bayi sudah lahir</option>
              </select>
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
        </Card.Body>
      </Card>
      <Footer />
    </div>
  );
}

export default RegisterPregnancy;
