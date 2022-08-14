import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
const backend_url = "https://rp-portal.bistasolutions.ae/";
const basbe_url = "http://localhost:3000/";

export class AccountActivation extends Component {
  constructor() {
    super();
    this.state = { password: "", confirmPassword: "", isRedirect: false };
  }

  componentDidMount() {
    // const {
    //   match: { params },
    // } = this.props;
    axios
      .get(
        backend_url +
          "backend/api/v1/portal/users/validate-token/account-activation/${id}/${token}/",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Get Data", response);
        // if (response.data.success_data.is_password_already_set === 1) {
        //   console.log("Account activated successfully")
        // } else {
        //  console.log("Error")
        // }
      });
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
        password_1: this.state.password,
        password_2: this.state.confirmPassword,
      },
    ];
    const {
      match: { params },
    } = this.props;
    if (
      this.state.password === this.state.confirmPassword &&
      this.state.password.length > 4
    ) {
      axios
        .post(
          basbe_url +
            "backend/api/v1/portal/users/users/confirm-password-reset/" +
            `${params.id}` +
            "/" +
            `${params.token}` +
            "/",
          tempDATA,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        // axios({
        //   url: basbe_url + 'users/confirm-password-reset/' + `${params.id}` + '/' + `${params.token}` + '/',
        //   method: 'put',
        //   data: tempDATA,
        //   headers: {

        //   }
        // })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("Else");
    }
  };
  render() {
    if (this.state.isRedirect) {
      return <Redirect to={"/dashboard"} />;
    }
    if (sessionStorage.getItem("userData")) {
      return <Redirect to={"/dashboard"} />;
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
                <h6 className="text-center login-h pb-4">
                  Confirm Password for your Account
                </h6>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    maxLength={40}
                    type="password"
                    id="password"
                    autoComplete="off"
                    name="password"
                    value={this.state.password}
                    onChange={this.ChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    className="form-control"
                    maxLength={40}
                    type="password"
                    id="confirmPassword"
                    autoComplete="off"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.ChangeHandler}
                  />
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-block btn-primary a-btn-lg font-weight-medium"
                    type="submit"
                    onClick={this.onSubmit}
                  >
                    CONFIRM
                  </button>
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

export default AccountActivation;
