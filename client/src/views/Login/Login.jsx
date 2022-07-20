import React from "react";
import Logo from "../../asset/logo.png";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { useLogin } from "../../store/actions/actionCreator";
function Login() {
  const { PostLogin } = useLogin();

  const [inputFormLogin, setInputFormLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(PostLogin(inputFormLogin));
  };
  return (
    <section
      className="gradient-form"
      style={{
        backgroundColor: "#eeee",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        display: "flex",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container">
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
                          placeholder="Email Address"
                          value={inputFormLogin.email}
                          onChange={(e) => {
                            setInputFormLogin({
                              ...inputFormLogin,
                              email: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          placeholder="Password"
                          value={inputFormLogin.password}
                          onChange={(e) => {
                            setInputFormLogin({
                              ...inputFormLogin,
                              password: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="text-center  mb-5 pb-2">
                        {/* <button
                          className="btn btn-primary btn-block fa-lg mb-3"
                          type="submit"
                          style={{
                            backgroundColor: "#29b57d",
                            borderColor: "white",
                            borderRadius: 5,
                            fontSize: "20px",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          Log in
                        </button> */}
                        <button
                          type="submit"
                          class="btn btn-primary btn-lg btn-block"
                          style={{
                            backgroundColor: "#29b57d",
                            borderColor: "white",
                            borderRadius: 5,
                            fontSize: "20px",
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
                    <h4 className="mb-4">About Our App:</h4>
                    <p
                      className="small"
                      style={{
                        textAlign: "justify",
                        fontSize: "16px",
                      }}
                    >
                      BabyGrowth is a multiplatform application to collect and
                      process data pertaining to public health- specifically
                      data that indicates whether pregnant women and infants are
                      meeting their nutritional requirements. Our app is
                      designed specifically to target stunting in the Kepulauan
                      Seribu Regency.
                    </p>
                    <p
                      className="small"
                      style={{ textAlign: "justify", fontSize: "16px" }}
                    >
                      With BabyGrowth, the DKI Jakarta Health Agency can monitor
                      the rates of nutritional deficiency and obesity in mother
                      and infant populations.
                    </p>
                    <p
                      className="small"
                      style={{ textAlign: "justify", fontSize: "16px" }}
                    >
                      The aforementioned data is input by island leaders through
                      our web and mobile apps- from early pregnancy up to the
                      1000th day of the baby's life, and is aimed to aid federal
                      government policy making.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
