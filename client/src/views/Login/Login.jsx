import React from "react";
import Logo from "../../asset/logo.png";
import "./Login.css";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {useState} from "react"
import Swal from "sweetalert2";
import {useLogin} from '../../store/actions/actionCreator'
function Login() {
  const {PostLogin} = useLogin()

  const [inputFormLogin, setInputFormLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(PostLogin(inputFormLogin))
  };
  return (
    <>
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eeee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src={Logo} style={{ width: "185px" }} alt="logo" />
                        <h4
                          className="mt-1 mb-5 pb-1"
                          style={{ color: "#00b099" }}
                        >
                          BabyGrowth
                        </h4>
                      </div>

                      <form onSubmit={handleSubmitLogin}>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Email Address" value={inputFormLogin.email} onChange={(e)=>{
                              setInputFormLogin({
                                ...inputFormLogin,
                                email: e.target.value
                              })
                            }}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            placeholder="Password" value={inputFormLogin.password} onChange={(e)=>{
                              setInputFormLogin({
                                ...inputFormLogin,
                                password: e.target.value
                              })
                            }}
                          />
                        </div>

                        <div className="text-center pt-2 mb-5 pb-2">
                          <button
                            className="btn btn-primary btn-block fa-lg mb-3"
                            type="submit"
                            style={{
                              backgroundColor: "#29b57d",
                              borderColor: "teal",
                              fontSize: "14px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              fontWeight: "bold",
                            }} 
                          >
                            Log in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-1 p-md-5 mx-md-2">
                      <h4 className="mb-4">About Our Apps</h4>
                      <p
                        className="small mb-0"
                        style={{ textAlign: "justify", fontSize: "16px" }}
                      >
                        BabyGrowth is a web and mobile application for
                        collecting and processing data related to public health.
                        It aims to be used primarily by DKI Jakarta Health
                        Agency, especially in the Kepulauan Seribu Regency as a
                        tool to monitor the rates of expecting mother and infant
                        nutritional development inside the community. The
                        aforementioned data is collected through the web and
                        mobile application. It is input by the leader of RT from
                        early pregnancy until the first 1000 days of the baby's
                        life, and is to be used as a measurement to aid the DKI
                        Jakarta Health Agency in their policy making process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
