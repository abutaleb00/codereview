import React, { Component } from "react";
import { Link } from "react-router-dom";

export class EmailSuccess extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light login-nav">
          <Link className="navbar-brand" to="/">
            <img
              src={process.env.PUBLIC_URL + "/logo.jpg"}
              alt="logo"
              width="170px"
            />
          </Link>
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
        </nav>
        <div
          className="d-flex align-items-center px-0"
          style={{ background: "#EBE8F0" }}
        >
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="text-left pt-5 px-4 px-sm-5">
                <p className="text-center">
                  <i
                    className="mdi mdi-near-me"
                    style={{ color: "#3ab44a", fontSize: "60px" }}
                  ></i>
                </p>

                <div className="form-group">
                  <h2
                    className="text-center"
                    style={{ fontSize: "22px", fontWeight: "bold" }}
                  >
                    We have sent you an Email!
                  </h2>
                  <p className="text-center">Please login to your email.</p>
                </div>
              </div>
              <div className="mt-3 row justify-content-md-center">
                <div className="col-12 col-md-8">
                  <Link to="/login">
                    <button className="btn btn-primary btn-md font-weight-medium">
                      LOGIN
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmailSuccess;
