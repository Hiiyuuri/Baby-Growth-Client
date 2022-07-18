import { Link, useNavigate } from "react-router-dom";
// import { useUser } from "../store/actions";

export default function Navbar() {
  const navigate = useNavigate();
  //   const { logout } = useUser();

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top bg-gradient bg-success text-white"
      id="navbar"
    >
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse d-flex"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link" aria-current="page">
              Home
            </Link>
          </li>
        </ul>
        <li className="form-inline my-2 my-lg-0 nav-item active">
          <Link
            to="/login"
            className="nav-link"
            aria-current="page"
            // onClick={logout}
          >
            Logout
          </Link>
        </li>
      </div>
    </nav>
  );
}
