import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { inputBabyDataAct } from "../store/actions/actionCreator";



function InputBabyData() {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    // let { PregnancyId } = useParams()

    const [inputCreate, setInputCreate] = useState({
        PregnancyId: '',
        beratAwal: '',
        beratBulanan: '',
    })


    const handleInput = (e) => {
        e.preventDefault()
        console.log(inputCreate)

        dispatch(inputBabyDataAct(inputCreate)) // =============== Nanti tinggal post axios lewat store/action
            .then(() => {
                navigate(`/`)
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
                <h1 className="text-2xl font-bold mb-5 text-center"> Input Baby Data</h1>

                <form
                    onSubmit={handleInput}
                    className="flex flex-col mb-4 text-gray-700 text-left">

                    <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold">Pregnancy ID</label>
                        <input
                            // readOnly 
                            // value={inputCreate.PregnancyId}
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
                        <label className="block mb-1 font-semibold">Initial Weight</label>

                        <input
                            onChange={(e) => {
                                setInputCreate({
                                    ...inputCreate,
                                    beratAwal: e.target.value
                                })
                            }}
                            type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                    </div>

                    <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold">Monthly Weight</label>

                        <input
                            onChange={(e) => {
                                setInputCreate({
                                    ...inputCreate,
                                    beratBulanan: e.target.value
                                })
                            }}
                            type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
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

export default InputBabyData;
