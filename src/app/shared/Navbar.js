import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { instance, baseURL } from "../service/ApiUrls";
import { Redirect } from "react-router-dom";

let username = "";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogout: false };
  }
  componentDidMount() {
    username = localStorage.getItem("username");
  }
  Logout = (e) => {
    // sessionStorage.setItem("userData", "");
    // sessionStorage.clear();
    //localStorage.clear();
    // localStorage.setItem("loggedIn", false);
    // localStorage.clear();
    instance.delete(baseURL + "/oauth/revoke").then((res) => {
      if (res.data.result.error === false) {
        localStorage.setItem("loggedIn", false);
        localStorage.clear();
        window.location.href = "/banklogin";
      } else if (res.data.result.error === true) {
        localStorage.setItem("loggedIn", false);
        localStorage.clear();
        window.location.href = "/banklogin";
      }
    });
  };
  toggleOffcanvas() {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  }
  render() {
    if (this.state.isLogout) {
      return <Redirect to={"/user-pages/login"} />;
    }
    return (
      <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
          <a
            className="navbar-brand brand-logo-mini align-self-center d-lg-none"
            href="!#"
            onClick={(evt) => evt.preventDefault()}
          ></a>

          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="logo"
              width="130px"
            />
          </Link>

          <ul className="navbar-nav navbar-nav-left header-links">
            {" "}
            <button
              className="navbar-toggler navbar-toggler align-self-center"
              type="button"
              onClick={() =>
                document.body.classList.toggle("sidebar-icon-only")
              }
            >
              <i className="mdi mdi-menu"></i>
            </button>
          </ul>
          <ul className="navbar-nav navbar-nav-right ml-lg-auto">
            <li className="nav-item  nav-profile border-0">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator bg-transparent">
                  <span className="profile-text">{username}</span>
                  {/* <img
                    className="img-xs rounded-circle"
                    src={require("../../assets/images/faces/face8.jpg")}
                    alt="Profile"
                  /> */}
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown pb-3">
                  {/* <Dropdown.Item
                    className="dropdown-item preview-item d-flex align-items-center border-0 mt-2"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <i className="fa fa-user-circle"></i>Manage Profile
                  </Dropdown.Item> */}
                  <Dropdown.Item
                    className="dropdown-item preview-item d-flex align-items-center border-0"
                    onClick={(evt) =>
                      (window.location =
                        process.env.PUBLIC_URL + "/change-password")
                    }
                  >
                    <i className="fa fa-lock"></i> Change Password
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdown-item preview-item d-flex align-items-center border-0"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <a
                      onClick={() => {
                        this.Logout();
                      }}
                      style={{ color: "#525456" }}
                    >
                      <i className="fa fa-power-off"></i>
                      Sign Out
                    </a>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={this.toggleOffcanvas}
          >
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
