import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { fetchBabyData, inputBabyDataAct } from "../store/actions/actionCreator";



function InputBabyData() {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    let { BabyDataId } = useParams()

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
        dispatch(fetchBabyData(BabyDataId))
            .then((data) => {
                // console.log(data.data.data)

                // console.log(data)




                // console.log(inputCreate,`1`)
                setInputCreate({ ...inputCreate, beratAwal: data.data.data.beratAwal })


                setInputCreate({ ...inputCreate, b1: data.data.data.beratBulanan.split(',')[0] })
                setInputCreate({ ...inputCreate, b2: data.data.data.beratBulanan.split(',')[0] })
                setInputCreate({ ...inputCreate, b1: data.data.data.beratBulanan.split(',')[0] })
                setInputCreate({ ...inputCreate, b1: data.data.data.beratBulanan.split(',')[0] })


                // console.log(inputCreate,`2`)
                // setInputCreate({ ...inputCreate, b2: arr1 })
                // // console.log(inputCreate,`3`)
                // // setInputCreate({ ...inputCreate, b3: arr[2] })
                // // console.log(inputCreate,`4`)
                // // setInputCreate({ ...inputCreate, b4: arr[3] })
                // // setInputCreate({ ...inputCreate, b5: data.data.data.beratBulanan.split(',')[4] })
                // // setInputCreate({ ...inputCreate, b6: data.data.data.beratBulanan.split(',')[5] })
                // // setInputCreate({ ...inputCreate, b7: data.data.data.beratBulanan.split(',')[6] })
                // // setInputCreate({ ...inputCreate, b8: data.data.data.beratBulanan.split(',')[7] })
                // // setInputCreate({ ...inputCreate, b9: data.data.data.beratBulanan.split(',')[8] })

                // // console.log(inputCreate)

                return data
            })
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


                // setInputCreate({ ...inputCreate, b1: `tester`, b2: `tester` })
                // setInputCreate({ ...inputCreate, })
                // setInputCreate({ ...inputCreate, b2: data.data.data.beratBulanan.split(',')[1] })
                // setInputCreate({ ...inputCreate, b3: data.data.data.beratBulanan.split(',')[2] })


            })
            .finally(() => {
                setLoading(false)
            })

    }, [loading])


    const handleInput = (e) => {
        e.preventDefault()
        // console.log(inputCreate)

        dispatch(inputBabyDataAct({...inputCreate, BabyDataId})) // =============== Nanti tinggal post axios lewat store/action
            // .then(() => {
            //     navigate(`/`)
            // })
            // .catch((err) => {
            //     console.log(err)
            // })
    }

    if (loading) {
        return <h1> Loading ...</h1>
    }



    return (
        <div>
            <Navigation />

            <div className="col-md-5 mx-auto border rounded p-5"
                style={{ marginTop: "40px", marginBottom: "40px" }}>
                <h1 className="text-2xl font-bold mb-5 text-center"> Input/Edit Baby Data</h1>

                <form
                    onSubmit={handleInput}
                    className="flex flex-col mb-4 text-gray-700 text-left">

                    <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold">Pregnancy ID</label>
                        <input
                            readOnly
                            value={BabyDataId}

                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                    </div>

                    <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold">Initial Weight (kg)</label>

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
                        <p className="block mb-1 font-weight-bold">Monthly Weight (kg)</p>

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
                        className="btn btn-primary btn-lg btn-block bg-success">
                        Submit
                    </button>


                </form>



            </div >


        </div >

    );
}

export default InputBabyData;
