import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/signup.css";
import { otpgen, instance } from "../service/ApiUrls";

export class SignUp extends Component {
  constructor() {
    super();
    this.state = {};
  }
  ChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  render() {
    return (
      <div>
        <div className="container main">
          <div className="register">
            <div className="row">
              <div className="col-md-3 register-left">
                <img
                  className="center"
                  src={process.env.PUBLIC_URL + "/logo-dbs.png"}
                  alt="logo"
                  width="170px"
                />
                <h3>Welcome to</h3>
                <p>Digital Banking System!</p>
                <Link to="/login">
                  <button className="s-login" type="button" name="">
                    Login
                  </button>
                  <br />
                </Link>
              </div>
              <div className="col-md-9 register-right">
                <div className="tab-content" id="myTabContent">
                  <h3 className="register-heading">Sign Up as a Customer</h3>
                  <div className="row register-form">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="mobilePhone"
                          autoComplete="off"
                          placeholder="Phone number *"
                          onChange={this.ChangeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          autoComplete="off"
                          placeholder="Email Address *"
                          onChange={this.ChangeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password *"
                          autoComplete="off"
                          name="password"
                          onChange={this.ChangeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          autoComplete="off"
                          placeholder="Confirm Password *"
                          onChange={this.ChangeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-md-12" style={{ textAlign: "center" }}>
                      <div className="form-group">
                        <button
                          type="button"
                          className="btnotp"
                          onClick={() => {
                            let datatoOtpGen = {
                              email: "",
                              phone: "",
                              otpType: 1,
                            };
                            if (this.validateEmail(this.state.email)) {
                              datatoOtpGen["email"] = this.state.email;
                            }
                            if (/^[0-9]{11}$/.test(this.state.mobilePhone)) {
                              datatoOtpGen["phone"] = this.state.mobilePhone;
                            }

                            let signupState = {
                              datatoOtpGen: datatoOtpGen,
                              dataOfSignup: this.state,
                              from: "signup",
                            };

                            instance.post(otpgen, datatoOtpGen).then((res) => {
                              if (res.data.isError === false) {
                                this.props.history.push({
                                  pathname: "/otpemail",
                                  state: {
                                    datatoOtpGen: datatoOtpGen,
                                    otpEmailId: res.data.returnObject.otpId,
                                    datatopropagate: signupState.dataOfSignup,
                                  },
                                });
                              }
                            });
                          }}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
