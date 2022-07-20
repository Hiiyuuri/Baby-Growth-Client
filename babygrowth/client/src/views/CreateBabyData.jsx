import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navigation from "../components/Navigation";
import { createBabyData } from "../store/actions/actionCreator";



function CreateBabyData() {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    // let { PregnancyId } = useParams()

    let [searchParams, setSearchParams] = useSearchParams();
    let [query, setQuery] = useState(
        searchParams.get("PregnancyId")
    );

    useEffect(() => {
        if (+query) {
            setInputCreate({ ...inputCreate, PregnancyId: +query })
        }

    }, [])

    const [inputCreate, setInputCreate] = useState({
        PregnancyId: '',
        beratAwal: '',
        beratBulanan: '',
    })


    const handleInput = (e) => {
        e.preventDefault()
        // console.log(inputCreate)

        dispatch(createBabyData(inputCreate)) // =============== Nanti tinggal post axios lewat store/action
            .then((created) => {
                navigate(`/`)
                Swal.fire({
                    title: `Success!`,
                    text: `Success creating baby data with ID: ${created.data.id} `,
                    icon: "success",
                });
            })
            .catch((err) => {
                console.log(err)
            })

    }



    return (
        <div className="h-full" style={{
            backgroundColor: "#eeee",
            minHeight: "100vh"
        }}>
            <Navigation />

            <Card className="mx-auto" style={{ width: "40vw", marginTop: "30px", marginBottom: "10px", borderRadius: "10px" }}>
                <Card.Header className="h2 text-white"
                    style={{
                        background: "#29b57d",
                        borderRadius: "10px 10px 0px 0px"
                    }}>
                    Buat Data Bayi Baru

                </Card.Header>
                <Card.Body className="p-4" style={{ padding: "10px" }}>
                    <form
                        onSubmit={handleInput}
                        className="flex flex-col mb-4 text-gray-700 text-left">

                        <div className="w-full mb-4 text-black">
                            <label className="block mb-1 font-semibold">ID Kehamilan (Pregnancy ID)</label>
                            <input
                                value={inputCreate.PregnancyId}
                                onChange={(e) => {
                                    setInputCreate({
                                        ...inputCreate,
                                        PregnancyId: e.target.value
                                    })
                                }}
                                type="text"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                        </div>

                        <div className="w-full mb-4 text-black">
                            <label className="block mb-1 font-semibold">Berat Awal Bayi</label>

                            <input
                                onChange={(e) => {
                                    setInputCreate({
                                        ...inputCreate,
                                        beratAwal: e.target.value
                                    })
                                }}
                                type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                        </div>


                        <button
                            className="btn btn-primary btn-lg btn-block "
                            style={{
                                background: "#29b57d"
                            }}>
                            Submit
                        </button>


                    </form>


                </Card.Body>
            </Card>



        </div>

    );
}

export default CreateBabyData;
