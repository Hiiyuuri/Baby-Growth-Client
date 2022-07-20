import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { registerUser } from "../store/actions/actionCreator";
import Card from "react-bootstrap/Card";



function RegisterAdmin() {
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const [inputCreate, setInputCreate] = useState({
        username: '',
        password: '',
        email: '',
        RT: '',
    })


    const handleCreate = (e) => {
        e.preventDefault()
        console.log(inputCreate)

        dispatch(registerUser(inputCreate)) // =============== Nanti tinggal post axios lewat store/action
            .then(() => {
                navigate(`/`)
            })
            .catch((err) => {
                console.log(err)
            })

    }



    return (
        <div className="h-full" style={{
            backgroundColor: "#eeee",
            height: "100vh"
        }}>
            <Navigation />


            <Card className="mx-auto " style={{ width: "40vw", marginTop: "50px", borderRadius: "10px" }}>
                <Card.Header className="h2 text-white"
                    style={{
                        background: "#29b57d",
                        borderRadius: "10px 10px 0px 0px"
                    }}>
                    Register Admin Baru

                </Card.Header>
                <Card.Body className="p-4" style={{ padding: "10px" }}>
                    <form
                        onSubmit={handleCreate}
                        className="flex flex-col mb-4 text-gray-700 text-left">

                        <div className="w-full mb-4 text-black">
                            <label className="block mb-1 font-semibold">Username</label>
                            <input
                                onChange={(e) => {
                                    setInputCreate({
                                        ...inputCreate,
                                        username: e.target.value
                                    })
                                }}
                                type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                        </div>

                        <div className="w-full mb-4 text-black">
                            <label className="block mb-1 font-semibold">Email</label>
                            <input
                                onChange={(e) => {
                                    setInputCreate({
                                        ...inputCreate,
                                        email: e.target.value
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

                        {/* <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold">RT</label>
                        <input
                            onChange={(e) => {
                                setInputCreate({
                                    ...inputCreate,
                                    RT: e.target.value
                                })
                            }}
                            type="number" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                    </div> */}

                        <div className="w-full mb-4 text-black">
                            <label className="d-block">Pilih Pulau</label>
                            <select
                                onChange={(e) => {
                                    setInputCreate({
                                        ...inputCreate,
                                        RT: e.target.value
                                    })
                                }}
                                defaultValue="blumDiisi"
                                className="selectpicker block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                                <option value="blumDiisi" disabled>
                                    Select your option ...
                                </option>
                                <option value="1">Pulau Pari</option>
                                <option value="2">Pulau Tidung</option>
                                <option value="3">Pulau Panggang</option>
                                <option value="4">Pulau Kelapa</option>
                                <option value="5">Pulau Putri</option>
                                <option value="6">Pulau Harapan</option>
                                <option value="7">Pulau Untung Jawa</option>
                                <option value="8">Pulau Lancang Besar</option>
                                <option value="9">Pulau Pramuka</option>
                            </select>

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

            {/* <div className="col-md-5 p-3 mx-auto border rounded flex-column"
                style={{
                    marginTop: "50px",
                    backgroundColor: "white"
                }}>

                <div className="">
                    <h1 className="text-2xl font-bold mb-5 text-center"> Register New Admin</h1>

                </div>

                <form
                    onSubmit={handleCreate}
                    className="flex flex-col mb-4 text-gray-700 text-left">

                    <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold">Username</label>
                        <input
                            onChange={(e) => {
                                setInputCreate({
                                    ...inputCreate,
                                    username: e.target.value
                                })
                            }}
                            type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></input>
                    </div>

                    <div className="w-full mb-4 text-black">
                        <label className="block mb-1 font-semibold">Email</label>
                        <input
                            onChange={(e) => {
                                setInputCreate({
                                    ...inputCreate,
                                    email: e.target.value
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
                        <label className="d-block">Pilih Pulau</label>
                        <select
                            onChange={(e) => {
                                setInputCreate({
                                    ...inputCreate,
                                    RT: e.target.value
                                })
                            }}
                            defaultValue="blumDiisi"
                            className="selectpicker block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                            <option value="blumDiisi" disabled>
                                Select your option ...
                            </option>
                            <option value="1">Pulau Pari</option>
                            <option value="2">Pulau Tidung</option>
                            <option value="3">Pulau Panggang</option>
                            <option value="4">Pulau Kelapa</option>
                            <option value="5">Pulau Putri</option>
                            <option value="6">Pulau Harapan</option>
                            <option value="7">Pulau Untung Jawa</option>
                            <option value="8">Pulau Lancang Besar</option>
                            <option value="9">Pulau Pramuka</option>
                        </select>

                    </div>


                    <button
                        className="btn btn-primary btn-lg btn-block bg-success">
                        Submit
                    </button>


                </form>



            </div> */}
        </div>



    );
}

export default RegisterAdmin;
