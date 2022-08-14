import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/signup.css";
import { otpVerify, otpgen } from "../service/ApiUrls";
import axios from "axios";

export class OtpEmail extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {};
  }
  ChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <div className="container main">
          <img
            className="center"
            src={process.env.PUBLIC_URL + "/gib-logo.jpg"}
            alt="logo"
          />
          <div className="register">
            <div className="row">
              <div className="col-md-3 register-left">
                <img
                  className="center"
                  src={process.env.PUBLIC_URL + "/logo-dbs-black.png"}
                  alt="logo"
                  width="170px"
                />
                <h4 style={{ color: "#000000" }}>Welcome to</h4>
                <p style={{ color: "#000000" }}>Digital Banking System!</p>
              </div>
              <div className="col-md-9 register-right">
                <div className="tab-content" id="myTabContent">
                  <h3 className="register-heading">Email OTP</h3>
                  <div className="row register-form">
                    <div className="col-md-8 offset-md-2">
                      <div className="form-group">
                        <input
                          type="number"
                          name="otp"
                          maxLength={40}
                          autoComplete="off"
                          className="form-control"
                          placeholder="Enter OTP"
                          onChange={this.ChangeHandler}
                        />
                      </div>
                      <Link
                        style={{
                          float: "right",
                          paddingBottom: "10px",
                          fontSize: "14px",
                        }}
                        id="resent"
                      >
                        Resend OTP
                      </Link>
                    </div>
                    <div className="col-md-12" style={{ textAlign: "center" }}>
                      <div className="form-group">
                        <button
                          type="button"
                          className="btnotp"
                          onClick={() => {
                            let data = {
                              otpId:
                                this.props.history.location.state.otpEmailId,
                              otpNumber: this.state.otp,
                            };
                            axios.post(otpVerify, data).then((res) => {
                              if (res.data.isError === false) {
                                let datatoOtpGen = {
                                  email: "",
                                  phone: "",
                                  otpType: 1,
                                };
                                if (
                                  /^[0-9]{11}$/.test(
                                    this.props.history.location.state
                                      .datatopropagate.mobilePhone
                                  )
                                ) {
                                  datatoOtpGen["phone"] =
                                    this.props.history.location.state.datatopropagate.mobilePhone;
                                }

                                let signupState = {
                                  datatoOtpGen: datatoOtpGen,
                                  otpEmailId:
                                    this.props.history.location.state
                                      .otpEmailId,
                                  from: "signup",
                                  dataOfSignup:
                                    this.props.history.location.state
                                      .datatopropagate,
                                };

                                axios.post(otpgen, datatoOtpGen).then((res) => {
                                  if (res.data.isError === false) {
                                    this.props.history.push({
                                      pathname: "/otpphone",
                                      state: {
                                        datatoOtpGen: datatoOtpGen,
                                        otpPhoneId: res.data.returnObject.otpId,
                                        otpEmailId:
                                          this.props.history.location.state
                                            .otpEmailId,
                                        datatopropagate:
                                          signupState.dataOfSignup,
                                      },
                                    });
                                  }
                                });
                              }
                            });
                          }}
                        >
                          Submit
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

export default OtpEmail;
