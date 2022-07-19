import { useNavigate } from "react-router-dom";
// import { useUser } from "../store/actions";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../asset/logo.png'
import Swal from 'sweetalert2';
export default function Navigation() {
    const navigate = useNavigate();
    const HandleLogout = (e) => {
      e.preventDefault();
      localStorage.clear();
      navigate("/login");
      Swal.fire({
        title: "LOG OUT!",
        text: "Youve been out",
        icon: "success",
      });
    };
  return (
    <>
   <Navbar expand="lg" style={{background:"linear-gradient(to right, #03a786, #29b57d, #008a45, #00753b)"}}>
      <Container>
        <Navbar.Brand href="/"><img src={Logo} style={{width:"48px"}} alt=""/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{paddingRight:"10px", paddingLeft:"10px"}}>
            <Nav.Link href="/" style={{color:"white", fontSize:"18px"}}>Home</Nav.Link>
            <Nav.Link href="/register-admin" style={{color:"white", fontSize:"18px"}}>Register Admin</Nav.Link>
            <Nav.Link href="/map-markers" style={{color:"white", fontSize:"18px"}}>Maps</Nav.Link>
            <Nav.Link href="/" style={{color:"white", fontSize:"18px"}} onClick={HandleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</>
  );
}
