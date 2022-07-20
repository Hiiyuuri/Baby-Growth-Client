import { useNavigate } from "react-router-dom";
// import { useUser } from "../store/actions";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../asset/logo.png";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import { useConverter, fetchUserDetail } from "../store/actions/actionCreator";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { islandConverter } = useConverter();

  useEffect(() => {
    dispatch(fetchUserDetail());
  }, []);

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

  const userDetail = useSelector((state) => state.user.userDetail);

  let userId = +userDetail.id - 1;

  let islandName = islandConverter(userId);

  if (userDetail.id === 1) {
    islandName = "";
  }

  return (
    <Navbar
      expand="lg"
      style={{
        background:
          "linear-gradient(to right, #03a786, #29b57d, #008a45, #00753b)",
      }}
    >
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate(`/`);
          }}
        >
          <img src={Logo} style={{ width: "48px" }} alt="" />
          <b style={{ color: "whitesmoke" }}>BabyGrowth</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto"
            style={{ paddingRight: "10px", paddingLeft: "10px" }}
          >
            <Nav.Link
              class="hover-bold"
              style={{ color: "white", fontSize: "18px", alignSelf: "center" }}
              onClick={() => {
                navigate(`/`);
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#D3D3D3";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              style={{ color: "white", fontSize: "18px" }}
              onClick={() => {
                navigate(`/register-admin`);
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#D3D3D3";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
              hidden={userDetail.role !== "SuperAdmin" ? true : false}
            >
              Register Admin
            </Nav.Link>
            <Nav.Link
              style={{ color: "white", fontSize: "18px" }}
              onClick={() => {
                navigate(`/map-markers`);
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#D3D3D3";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
            >
              Maps
            </Nav.Link>
            <Nav.Link
              style={{ color: "white", fontSize: "18px" }}
              onClick={HandleLogout}
              onMouseEnter={(e) => {
                e.target.style.color = "#D3D3D3";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <Container>
            <Col style={{ color: "white", fontWeight: "bold" }}>
              Welcome, {userDetail.username}!
            </Col>
            <Col style={{ color: "white" }}>
              {userDetail.role} {islandName}
            </Col>
          </Container>
        </Nav>
      </Container>
    </Navbar>
  );
}
