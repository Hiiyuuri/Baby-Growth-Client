import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navigation from "../components/Navigation";
import {
  fetchBabyData,
  fetchPregnancyData,
  inputBabyDataAct,
} from "../store/actions/actionCreator";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
function EditBabyData() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let { BabyDataId } = useParams();

  const [loading, setLoading] = useState(true);
  const motherId = useSelector((state) => state.detail.motherData.id);

  const [inputCreate, setInputCreate] = useState({
    beratAwal: "",
    b1: "",
    b2: "",
    b3: "",
    b4: "",
    b5: "",
    b6: "",
    b7: "",
    b8: "",
    b9: "",
    b10: "",
    b11: "",
    b12: "",
    b13: "",
    b14: "",
    b15: "",
    b16: "",
    b17: "",
    b18: "",
    b19: "",
    b20: "",
    b21: "",
    b22: "",
    b23: "",
    b24: "",
  });

  useEffect(() => {
    dispatch(fetchBabyData(BabyDataId))
      .then((data) => {
        console.log(data.data.data, `TEST`);
        let arr = data.data.data.beratBulanan.split(",");
        setInputCreate({
          ...inputCreate,
          beratAwal: data.data.data.beratAwal,
          b1: arr[0],
          b2: arr[1],
          b3: arr[2],
          b4: arr[3],
          b5: arr[4],
          b6: arr[5],
          b7: arr[6],
          b8: arr[7],
          b9: arr[8],
          b10: arr[9],
          b11: arr[10],
          b12: arr[11],
          b13: arr[12],
          b14: arr[13],
          b15: arr[14],
          b16: arr[15],
          b17: arr[16],
          b18: arr[17],
          b19: arr[18],
          b20: arr[19],
          b21: arr[20],
          b22: arr[21],
          b23: arr[22],
          b24: arr[23],
        });
      })
      .finally(() => {
        console.log(inputCreate);
        setLoading(false);
      });
  }, [loading]);

  const handleInput = (e) => {
    e.preventDefault();
    // console.log(inputCreate)

    dispatch(inputBabyDataAct({ ...inputCreate, BabyDataId })) // =============== Nanti tinggal post axios lewat store/action
      .then(() => {
        navigate(`/`);
        Swal.fire({
          title: `Success!`,
          text: `Success updating baby data `,
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <h1> Loading ...</h1>;
  }

  return (
    <div>
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
          Perbarui Data Bayi
        </Card.Header>
        <Card.Body className="p-4" style={{ padding: "10px" }}>
          <form
            onSubmit={handleInput}
            className="flex flex-col mb-4 text-gray-700 text-left"
          >
            <div className="w-full mb-4 text-black">
              <label className="block mb-1 font-weight-bold">
                ID Data Bayi (Baby Data ID)
              </label>
              <input
                readOnly
                value={BabyDataId}
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="w-full mb-4 text-black">
              <label className="block mb-1 font-weight-bold">
                Berat Awal Bayi (kg)
              </label>

              <input
                value={inputCreate.beratAwal}
                onChange={(e) => {
                  setInputCreate({
                    ...inputCreate,
                    beratAwal: e.target.value,
                  });
                }}
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="w-full mb-4 text-black">
              <p className="block mb-1 font-weight-bold">
                Berat Bulanan Bayi (kg)
              </p>

              <div className="container">
                <div className="row">
                  <div className="col-sm">
                    <div>
                      <label className="px-2">Month 1 :</label>
                      <input
                        value={inputCreate.b1}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b1: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="px-2">Month 2 :</label>
                      <input
                        value={inputCreate.b2}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b2: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="px-2">Month 3 :</label>
                      <input
                        value={inputCreate.b3}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b3: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 4 :</label>
                      <input
                        value={inputCreate.b4}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b4: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 5 :</label>
                      <input
                        value={inputCreate.b5}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b5: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 6 :</label>
                      <input
                        value={inputCreate.b6}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b6: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 7 :</label>
                      <input
                        value={inputCreate.b7}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b7: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 8 :</label>
                      <input
                        value={inputCreate.b8}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b8: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 9 :</label>
                      <input
                        value={inputCreate.b9}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b9: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 10 :</label>
                      <input
                        value={inputCreate.b10}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b10: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 11 :</label>
                      <input
                        value={inputCreate.b11}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b11: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 12 :</label>
                      <input
                        value={inputCreate.b12}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b12: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    <div>
                      <label className="px-2">Month 13 :</label>
                      <input
                        value={inputCreate.b13}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b13: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="px-2">Month 14 :</label>
                      <input
                        value={inputCreate.b14}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b14: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="px-2">Month 15 :</label>
                      <input
                        value={inputCreate.b15}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b15: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 16 :</label>
                      <input
                        value={inputCreate.b16}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b16: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 17 :</label>
                      <input
                        value={inputCreate.b17}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b17: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 18 :</label>
                      <input
                        value={inputCreate.b18}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b18: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 19 :</label>
                      <input
                        value={inputCreate.b19}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b19: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 20 :</label>
                      <input
                        value={inputCreate.b20}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b20: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 21 :</label>
                      <input
                        value={inputCreate.b21}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b21: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 22 :</label>
                      <input
                        value={inputCreate.b22}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b22: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 23 :</label>
                      <input
                        value={inputCreate.b23}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b23: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="px-2">Month 24 :</label>
                      <input
                        value={inputCreate.b24}
                        onChange={(e) => {
                          setInputCreate({
                            ...inputCreate,
                            b24: e.target.value,
                          });
                        }}
                        type="text"
                        className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
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
              navigate(`../mothers/${motherId}`);
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

export default EditBabyData;
