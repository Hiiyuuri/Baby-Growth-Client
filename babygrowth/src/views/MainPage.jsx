import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Pic1 from "../asset/pic1.png";
import Pic2 from "../asset/pic2.jpg";
function MainPage() {
  return (
    <section
      className="h-screen bg-Hero bg-cover
    font-[Poppins] md:bg-top bg-center"
    >
      <Navbar />
      <div className="flex flex-row justify-center text-center items-center mt-48">
      <div>
      <img
            src={Pic2}
            alt=""
            className="h-64 w-64 scale-[100%] hover:scale-[105%] ease-in duration-500 mr-36"
          />
      </div>
      <div>
      <img
            src={Pic1}
            alt=""
            className="h-64 w-64 scale-[100%] hover:scale-[105%] ease-in duration-500"
          />
      </div>
        </div>
        <div className="flex flex-row justify-center text-center items-center mt-12">
            <div className="w-64 h-10 mr-36 text-3xl text-emerald-700 font-bold">DATA</div>
            <div className="w-64 h-10 text-3xl text-emerald-700 font-bold">INPUT FORM</div>
        </div>
    </section>
  );
}

export default MainPage;
