import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-wizard.png";
import "../style/styleNavbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="navbar-all container-fluid">
          <Link to="/" className="navbar-brand">
            <img style={{ height: 120, width: 120 }} src={logo} />
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/favourites" className="nav-link">My Favourites</Link>
              </li>
              <li className="nav-item">
                <Link to="/characters" className="nav-link">Characters</Link>
              </li>
            </ul>
            <button
              className="btn"
              onClick={() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("email");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
