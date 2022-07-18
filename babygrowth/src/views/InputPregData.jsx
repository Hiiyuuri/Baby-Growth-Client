import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


function InputPregData() {
    // const dispatch = useDispatch()
    let navigate = useNavigate()
    let { PregnancyId } = useParams()

    const [inputCreate, setInputCreate] = useState({
        PregnancyId: PregnancyId,
        beratAwal: '',
        beratBulanan: '',
    })


    const handleInput = (e) => {
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

        <div className="flex-col w-[40%] mx-auto mt-10 border-2 border-slate-200 justify-center p-7 block bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-5 text-center"> Input Pregnancy Data</h1>

            <form
                onSubmit={handleInput}
                className="flex flex-col mb-4 text-gray-700 text-left">

                <div className="w-full mb-4 text-black">
                    <label className="block mb-1 font-semibold">Pregnancy ID</label>
                    <input
                        readOnly type="text"
                        value={inputCreate.PregnancyId}
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
                    <label className="block mb-1 font-semibold">Initial Weight</label>

                    <input
                        onChange={(e) => {
                            setInputCreate({
                                ...inputCreate,
                                beratBulanan: e.target.value
                            })
                        }}
                        type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                </div>

                <button className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md bg-emerald-400 hover:bg-emerald-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3">
                    Submit
                </button>


            </form>



        </div>
    );
}

export default InputPregData;
