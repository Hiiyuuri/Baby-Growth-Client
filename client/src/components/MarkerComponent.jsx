import React, { useState } from "react";
import Map, { Marker } from 'react-map-gl';
import './Modal/Modal.css'
import { Modal, Button } from 'react-bootstrap';



const MarkerComponent = ({ el }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };



  return (
    <div>
      <Marker longitude={el.longitude} latitude={el.latitude} anchor="bottom">
        <img
          src="https://i.ibb.co/6yv3wHz/pngwing-com-1.png"
          width={40}
          height={40}
          onClick={handleShow}
          style={{ cursor: "pointer" }}
        />
      </Marker>


      <Modal show={show} onHide={handleClose} className="h-100 d-flex align-items-center justify-content-center">
        <Modal.Header>
          <Modal.Title>Detail Ibu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Nama: {el.name} </div>
          <div>NIK: {el.NIK} </div>
          <div>Alamat: {el.address} </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={()=> { openInNewTab(`https://www.google.com/maps/place/${el.latitude},${el.longitude}`)}}>
            Arahkan ke Lokasi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>


  );
};

export default MarkerComponent;
