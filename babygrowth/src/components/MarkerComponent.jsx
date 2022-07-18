import React, { useState } from "react";
import Map, { Marker } from 'react-map-gl';
import './Modal/Modal.css'

const MarkerComponent = ({ el }) => {
  const [modal, setModal] = useState(false);
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };


  const toggleModal = () => {
    console.log('testo')
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <div>

      <Marker longitude={el.lng} latitude={el.lat} anchor="bottom">
        <img
          src="https://i.ibb.co/6yv3wHz/pngwing-com-1.png"
          width={40}
          height={40}
          onClick={toggleModal}
        />
      </Marker>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2 className="font-bold text-md">Mother's Detail</h2>
            <p>Mother's ID : {el.id} </p>
            <p className="pb-2">Mother's Name : {el.name} </p>
            <button
              onClick={(e) => { openInNewTab(`https://www.google.com/maps/place/${el.lat},${el.lng}`) }}
              className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md bg-emerald-400 hover:bg-emerald-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3">
              get direction on google maps
            </button>
            <button className="close-modal bg-red-400 text-white rounded"
              onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>


  );
};

export default MarkerComponent;
