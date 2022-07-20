import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navigation from "../components/Navigation";
import { fetchBabyData, fetchPregnancyData, inputBabyDataAct, inputPregnancyData } from "../store/actions/actionCreator";



function EditPregnancyData() {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    let { PregnancyDataId } = useParams()

    const [loading, setLoading] = useState(true)

    const [inputCreate, setInputCreate] = useState({
        beratAwal: '',
        b1: '',
        b2: '',
        b3: '',
        b4: '',
        b5: '',
        b6: '',
        b7: '',
        b8: '',
        b9: '',
    })

    const [beratBulanan, setBeratBulanan] = useState([])

    useEffect(() => {
        dispatch(fetchPregnancyData(PregnancyDataId))
            .then((data) => {
                console.log(data.data.data, `TEST`)
                let arr = data.data.data.beratBulanan.split(',')
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
                })

            })
            .finally(() => {
                setLoading(false)
            })

    }, [loading])


    const handleInput = (e) => {
        e.preventDefault()
        // console.log(inputCreate)

        dispatch(inputPregnancyData({ ...inputCreate, PregnancyDataId })) // =============== Nanti tinggal post axios lewat store/action
            .then(() => {
                navigate(`/`)
                Swal.fire({
                    title: `Success!`,
                    text: `Success updating pregnancy data `,
                    icon: "success",
                });
            })
            .catch((err) => {
                console.log(err)
            })
    }

    if (loading) {
        return <h1> Loading ...</h1>
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
                    Perbarui Data Kehamilan

                </Card.Header>
                <Card.Body className="p-4" style={{ padding: "10px" }}>
                    <form
                        onSubmit={handleInput}
                        className="flex flex-col mb-4 text-gray-700 text-left">

                        <div className="w-full mb-4 text-black">
                            <label className="block mb-1 font-weight-bold">ID Data Kehamilan (Pregnancy Data ID)</label>
                            <input
                                readOnly
                                value={PregnancyDataId}

                                type="text"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                        </div>

                        <div className="w-full mb-4 text-black">
                            <label className="block mb-1 font-weight-bold">Berat Awal Ibu (kg)</label>

                            <input
                                value={inputCreate.beratAwal}
                                onChange={(e) => {
                                    setInputCreate({
                                        ...inputCreate,
                                        beratAwal: e.target.value
                                    })
                                }}
                                type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                        </div>

                        <div className="w-full mb-4 text-black">
                            <p className="block mb-1 font-weight-bold">Berat Bulanan (kg)</p>

                            <div >
                                <label className="px-2">Month 1 :</label>
                                <input
                                    value={inputCreate.b1}
                                    onChange={(e) => {
                                        setInputCreate({
                                            ...inputCreate,
                                            b1: e.target.value
                                        })
                                    }}
                                    type="text" className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                            </div>
                            <div >
                                <label className="px-2">Month 2 :</label>
                                <input
                                    value={inputCreate.b2}
                                    onChange={(e) => {
                                        setInputCreate({
                                            ...inputCreate,
                                            b2: e.target.value
                                        })
                                    }}
                                    type="text" className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                            </div>
                            <div >
                                <label className="px-2">Month 3 :</label>
                                <input
                                    value={inputCreate.b3}
                                    onChange={(e) => {
                                        setInputCreate({
                                            ...inputCreate,
                                            b3: e.target.value
                                        })
                                    }}
                                    type="text" className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                            </div>

                            <div >
                                <label className="px-2">Month 4 :</label>
                                <input
                                    value={inputCreate.b4}
                                    onChange={(e) => {
                                        setInputCreate({
                                            ...inputCreate,
                                            b4: e.target.value
                                        })
                                    }}
                                    type="text" className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                            </div>

                            <div >
                                <label className="px-2">Month 5 :</label>
                                <input
                                    value={inputCreate.b5}
                                    onChange={(e) => {
                                        setInputCreate({
                                            ...inputCreate,
                                            b5: e.target.value
                                        })
                                    }}
                                    type="text" className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                            </div>

                            <div >
                                <label className="px-2">Month 6 :</label>
                                <input
                                    value={inputCreate.b6}
                                    onChange={(e) => {
                                        setInputCreate({
                                            ...inputCreate,
                                            b6: e.target.value
                                        })
                                    }}
                                    type="text" className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                            </div>

                            <div >
                                <label className="px-2">Month 7 :</label>
                                <input
                                    value={inputCreate.b7}
                                    onChange={(e) => {
                                        setInputCreate({
                                            ...inputCreate,
                                            b7: e.target.value
                                        })
                                    }}
                                    type="text" className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                            </div>

                            <div >
                                <label className="px-2">Month 8 :</label>
                                <input
                                    value={inputCreate.b8}
                                    onChange={(e) => {
                                        setInputCreate({
                                            ...inputCreate,
                                            b8: e.target.value
                                        })
                                    }}
                                    type="text" className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                            </div>

                            <div >
                                <label className="px-2">Month 9 :</label>
                                <input
                                    value={inputCreate.b9}
                                    onChange={(e) => {
                                        setInputCreate({
                                            ...inputCreate,
                                            b9: e.target.value
                                        })
                                    }}
                                    type="text" className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                            </div>



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



        </div >

    );
}

export default EditPregnancyData;
