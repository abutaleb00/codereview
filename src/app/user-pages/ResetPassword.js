import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const backend_url = "https://rp-portal.bistasolutions.ae/";

export class ResetPassword extends Component {
  constructor() {
    super();
    this.state = { email: "", mobile: "", isRedirect: false };
  }
  ChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };
  onSubmit = (e) => {
    //   console.log("submit work")
    e.preventDefault();
    const tempDATA = [
      {
        email: this.state.email,
      },
    ];

    axios
      .post(
        backend_url + "backend/api/v1/portal/users/request-password-reset/",
        tempDATA,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.statusText === "Created") {
          this.setState({ isRedirect: true });
          NotificationManager.success(
            "Password Reset Successfully",
            "Successful"
          );
          console.log("Please check your email");
          console.log(response);
        } else {
          console.log("Bad Request");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  render() {
    if (this.state.isRedirect) {
      return <Redirect to={"/emailsuccess"} />;
    }

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
          className="d-flex align-items-center pt-5 mt-3 px-0"
          style={{ background: "#EBE8F0" }}
        >
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="text-left pt-1 px-4 px-sm-5">
                <h6 className="text-center login-h pb-4">Reset Password</h6>
                <div className="form-group">
                  <label htmlFor="password">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    maxLength={40}
                    autoComplete="off"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.ChangeHandler}
                  />
                </div>
                <div className="mt-3">
                  <div className="col-md-6 d-inline-block">
                    {" "}
                    <button
                      className="btn btn-block btn-primary a-btn-lg font-weight-medium"
                      type="submit"
                      onClick={this.onSubmit}
                    >
                      CONFIRM
                    </button>
                  </div>
                  <div className="col-md-6 d-inline-block">
                    {" "}
                    <Link
                      className="btn btn-block btn-outline-primary a-btn-lg font-weight-medium"
                      type="button"
                      to="/login"
                    >
                      LOGIN
                    </Link>
                  </div>
                </div>
              </div>
              <NotificationContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
