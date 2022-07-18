import React from "react";
import Navigation from "../components/Navigation";
import Pic1 from "../asset/pic1.png";
import Pic2 from "../asset/pic2.png";
import "./MainPage.css";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <>
      <Navigation />

      <div
        className="d-flex flex-row"
        style={{ justifyContent: "center", paddingTop: "150px" }}
      >
        <div className="hover-zoomin" style={{ maxWidth: "22rem" }}>
            <Link to={'/dashboard'}>
          <img
            src={Pic2}
            alt=""
            style={{
              height: "200px",
              width: "200px",
              marginRight: "50px",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
              display: "inline-block",
            }}
          />
            </Link>
        </div>
        <div className="hover-zoomin" style={{ maxWidth: "22rem" }}>
          <Link to={'/register-mom'}>
          <img
            src={Pic1}
            alt=""
            style={{
              height: "200px",
              width: "200px",
              marginLeft: "50px",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
              display: "inline-block",
            }}
          />
          </Link>
        </div>
      </div>
      <div
        className="d-flex flex-row"
        style={{ justifyContent: "center", paddingTop: "20px" }}
      >
        <div
          style={{
            width: "200px",
            fontSize: "30px",
            fontWeight: "bold",
            color: "teal",
            marginRight: "50px",
          }}
        >
          DATA
        </div>
        <div
          style={{
            width: "200px",
            fontSize: "30px",
            fontWeight: "bold",
            color: "teal",
            marginLeft: "50px",
          }}
        >
          FORM INPUT
        </div>
      </div>
    </>
  );
}

export default MainPage;
