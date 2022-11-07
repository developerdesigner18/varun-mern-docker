/* eslint-disable jsx-a11y/anchor-is-valid */
import "./header-nav.css";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

const HeaderNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fetchLocalStorageData = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      return true;
    }
    return false;
  };

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ padding: "0.5em 2em", marginBottom: "1em" }}
    >
      <a className="navbar-brand" href="#">
        Logo
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-between"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink to="/">
              <div className="header__logo">
                <a className="nav-link">Home</a>
              </div>
            </NavLink>
          </li>
          <li className="nav-item">
            {!fetchLocalStorageData() && (
              <NavLink to="/login">
                <div className="header__logo">
                  <a className="nav-link" href="#">
                    Login
                  </a>
                </div>
              </NavLink>
            )}
          </li>
          <li className="nav-item">
            {!fetchLocalStorageData() && (
              <NavLink to="/signup">
                <div className="header__logo">
                  <a className="nav-link" href="#">
                    Sign Up
                  </a>
                </div>
              </NavLink>
            )}
          </li>
          <li className="nav-item">
            {fetchLocalStorageData() && (
              <NavLink to="/profile">
                <div className="header__logo">
                  <a className="nav-link" href="#">
                    Profile
                  </a>
                </div>
              </NavLink>
            )}
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          {fetchLocalStorageData() && (
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={() => logOut()}
            >
              Log Out
            </button>
          )}
        </form>
      </div>
    </nav>
  );
};

export default HeaderNav;
