import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { registerPregnancy } from "../store/actions/actionCreator";
import Swal from "sweetalert2";




function RegisterPregnancy() {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    // let { motherId } = useQuery()
    // let { motherId } = useParams()

    let [searchParams, setSearchParams] = useSearchParams();
    let [query, setQuery] = useState(
        searchParams.get("motherId")
    );

    useEffect(() => {
        if (+query) {
            setInputCreate({ ...inputCreate, MotherProfileId: +query })
        }

    }, [])

    const [inputCreate, setInputCreate] = useState({
        MotherProfileId: '',
        name: '',
        sudahLahir: Boolean,
    })


    const handleCreate = (e) => {
        e.preventDefault()
        console.log(inputCreate)

        dispatch(registerPregnancy(inputCreate)) // =============== Nanti tinggal post axios lewat store/action
            .then((created) => {
                // console.log(created)
                if (!created.sudahLahir) {
                    navigate(`/create-preg-data?PregnancyId=${created.data.id}`)
                }else{
                    navigate(`/create-baby-data?PregnancyId=${created.data.id}`)
                }
                Swal.fire({
                    title: `Success!`,
                    text: `Pregnancy with ID : ${created.data.id} Created !`,
                    icon: "success",
                });
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
                <h1 className="text-2xl font-bold mb-5 text-center"> Register New Pregnancy</h1>

                <form
                    onSubmit={handleCreate}
                    className="flex flex-col mb-4 text-gray-700 text-left">

                    <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold">Mother's ID</label>
                        <input
                            // readOnly type="text"
                            value={query ? query : ''}
                            onChange={(e) => {
                                setInputCreate({
                                    ...inputCreate,
                                    MotherProfileId: e.target.value
                                })
                            }}
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                    </div>

                    {/* <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold">Mother's Name</label>
                        <input
                            readOnly type="text"
                            value="**nanti ambil dr fetch slur (optional, cm utk tampilan)"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                    </div> */}

                    <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold d-block">Pregnancy Name</label>


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
                        <label className="d-block">Pregnancy Status</label>
                        <select
                            onChange={(e) => {
                                setInputCreate({
                                    ...inputCreate,
                                    sudahLahir: e.target.value
                                })
                            }}
                            defaultValue="blumDiisi"
                            className="selectpicker">
                            <option value="blumDiisi" disabled>
                                Select your option ...
                            </option>
                            <option value={false}>Baby not born yet</option>
                            <option value={true}>Baby already born</option>
                        </select>

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

export default RegisterPregnancy;
