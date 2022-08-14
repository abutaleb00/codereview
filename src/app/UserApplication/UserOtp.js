import React, { Component } from "react";
import Timer from "otp-timer";
import "../../assets/styles/signup.css";
import { instance, baseURL, errorCompute } from "../service/ApiUrls";

export class UserOtp extends Component {
  constructor(props) {
    super(props);
    window.mobileNumber = this;
    this.state = {
      ...props.location.state,
      error: false,
      errorMessage: "Someting Worng!",
    };
  }
  ChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  componentDidMount() {}
  callOtpGen = () => {
    let datatoSend = {
      phone: this.state.mobileNumber,
      email: "",
      otpType: "1",
    };

    instance
      .post(baseURL + "/api/otpgen", datatoSend)
      .then((res) => {
        if (res.data.result.error === false) {
          this.setState({ isLoading: false }, () => {
            localStorage.setItem("mobile", this.state.mobileNumber);
            this.props.history.push({
              pathname: "/user-otp",
              //search: '?query=abc',
              state: {
                mobileNumber: this.state.mobileNumber,
                otpDetails: res.data.data,
              },
            });
          });
        } else if (res.data.result.error === true) {
          this.setState({
            error: true,
            isLoading: false,
            errorMessage: res.data.result.errorMsg,
          });
        }
      })
      .catch((err) => {
        errorCompute(err);
      });
  };
  render() {
    return (
      <div>
        <div className="container main">
          <div className="register">
            <div className="row">
              <div className="col-md-2 register-left">
                {/* <img
                  className="center"
                  src={process.env.PUBLIC_URL + "/logo-dbs.png"}
                  alt="logo"
                  width="170px"
                />
                <h3>Welcome to</h3>
                <p>Digital Banking System!</p> */}
              </div>
              <div className="col-md-10 register-right">
                <div className="tab-content" id="myTabContent">
                  <h3 className="register-heading">Mobile OTP</h3>
                  <div className="row register-form">
                    <div className="col-md-12" style={{ textAlign: "center" }}>
                      <div className="row justify-content-md-center">
                        <div className="form-group col-md-8 mb-0">
                          <div
                            className={
                              this.state.error === true
                                ? "alert alert-danger alert-dismissible fade show"
                                : "d-none"
                            }
                            role="alert"
                          >
                            <p
                              style={{ fontSize: "16px", marginBottom: "0px" }}
                            >
                              {this.state.errorMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 offset-md-2 mb-1">
                      <div
                        className="form-group"
                        style={{ marginBottom: "10px" }}
                      >
                        <input
                          type="number"
                          maxLength={40}
                          name="otp"
                          autoComplete="off"
                          className="form-control"
                          placeholder="Enter OTP"
                          onChange={this.ChangeHandler}
                        />
                      </div>
                      <div style={{ float: "right" }}>
                        <Timer
                          className="btn btn-success"
                          seconds={59}
                          minutes={4}
                          text="Resend OTP in"
                          ButtonText="Resend OTP"
                          textColor={"#000000"}
                          buttonColor={"#fff"}
                          background={"#000000"}
                          resend={this.callOtpGen}
                        />
                      </div>
                    </div>
                    <div className="col-md-12" style={{ textAlign: "center" }}>
                      <div className="form-group">
                        {/* <Link to="/add-profile"> */}
                        <button
                          type="button"
                          className="btn btn-success"
                          style={{ padding: "5px 20px", borderRadius: "20px" }}
                          onClick={() => {
                            this.setState({ isLoading: true }, () => {
                              let dataToSend = {
                                otpId: this.state.otpDetails.otpId,
                                otpNumber: this.state.otp,
                              };
                              instance
                                .post(baseURL + "/api/otpverify", dataToSend)
                                .then((res) => {
                                  if (res.data.result.error === false) {
                                    this.setState({ isLoading: false }, () => {
                                      this.props.history.push({
                                        pathname: "/document-type",
                                        //search: '?query=abc',
                                        state: {
                                          mobileNumber: this.state.mobileNumber,
                                        },
                                      });
                                    });
                                  } else if (res.data.result.error === true) {
                                    this.setState({
                                      error: true,
                                      errorMessage: res.data.result.errorMsg,
                                    });
                                  }
                                })
                                .catch((err) => errorCompute(err));
                            });
                          }}
                          disabled={this.state.isLoading}
                        >
                          {this.state.isLoading ? (
                            <span>
                              <i className="fa fa-spinner fa-spin mr-3"></i>
                              Submitting...
                            </span>
                          ) : (
                            "Submit"
                          )}{" "}
                        </button>
                        {/* </Link> */}
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

export default UserOtp;
