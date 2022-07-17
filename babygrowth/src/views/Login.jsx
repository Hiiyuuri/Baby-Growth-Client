import React from "react";
import logo from '../asset/logo.png'

function Login() {
  return (
    <section className="h-full gradient-form bg-gray-200 md:h-screen">
      <div className="container py-12 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="lg:flex lg:flex-wrap g-0">
                <div className="lg:w-6/12 px-4 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src={logo}
                        alt="logo"
                      />
                      <h4 className="text-xl font-semibold mt-3 mb-12 pb-1 text-teal-500">
                        BabyGrowth
                      </h4>
                    </div>
                    <form>
                      <p className="mb-4">Please login to your account</p>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput1"
                          placeholder="Email"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput1"
                          placeholder="Password"
                        />
                      </div>
                      <div className="text-center pt-1 mb-12 pb-1">
                        <button
                          className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md bg-emerald-400 hover:bg-emerald-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                          type="submit"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                        >
                          Log in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-gradient-to-r from-emerald-500 to-teal-500"
                >
                  <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                    <h4 className="text-2xl font-semibold mb-6">
                      Sekilas Program ini
                    </h4>
                    <p className="text-l text-justify leading-loose">
                      Gizi buruk merupakan kondisi yang terjadi ketika tubuh
                      mendapatkan asupan nutrisi terlalu sedikit atau justru
                      terlalu banyak. Dampak gizi buruk bagi kesehatan tidak
                      boleh disepelekan. Selain melemahkan daya tahan tubuh,
                      kondisi ini bisa memicu berbagai penyakit. Saat ini
                      tercatat ada 403 bayi lahir yang tumbuh dengan gizi buruk
                      pada tahun 2021 di wilayah Kepulauan Seribu. Jika
                      dipresentase sebesar 23% dari total bayi dengan gizi buruk
                      di wilayah DKI Jakarta. Dengan adanya masalah ini kami
                      mencoba untuk berkordinasi kepada Dinas Kesehatan Provinsi
                      DKI Jakarta untuk mengidentifikasi pokok dari permasalahan
                      terkait gizi buruk. Dari pokok permasalahan terkait pengumpulan dan pengolahan data tersebut yang 
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
