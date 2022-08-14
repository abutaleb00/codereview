import React, { Component } from "react";
import "../../assets/styles/signup.css";
import { instance, baseURL, errorCompute } from "../service/ApiUrls";
import { confirmAlert } from "react-confirm-alert";

export class MobileNumber extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      isLoading: false,
      error: false,
      errorMessage: "Someting Worng!",
    };
    window.mobileNumber = this;
    this.state = {
      mobileNumber: "",
      code: +880,
    };
  }
  getMobileNumber = () => {
    let data = { mobile: this.state.mobileNumber };
    return data;
  };
  ChangeHandler = (e) => {
    e.target.value = e.target.value.replace(/[^\d]/gi, "");
    if (e.target.value.length > 10) {
      confirmAlert({
        title: "Error",
        message: <p className="mod-p">Invalid Phone Number</p>,
        buttons: [
          {
            label: "Ok",
            onClick: () => {},
          },
        ],
        closeOnClickOutside: false,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        mobileNumber: this.state.code + e.target.value,
      });
      console.log(this.state);
    }
  };

  checkMobileExists = () => {
    if (this.state.mobileNumber === "") {
      this.setState({ isLoading: false }, () => {
        confirmAlert({
          title: "Message",
          message: <p className="mod-p"> Mobile number can't be empty </p>,
          buttons: [
            {
              label: "Ok",
              onClick: () => {},
            },
          ],
          closeOnClickOutside: false,
        });
      });
    } else if (this.state.mobileNumber.length !== 13) {
      this.setState({ isLoading: false }, () => {
        confirmAlert({
          title: "Message",
          message: (
            <p className="mod-p"> Please enter a valid mobile number </p>
          ),
          buttons: [
            {
              label: "Ok",
              onClick: () => {},
            },
          ],
          closeOnClickOutside: false,
        });
      });
    } else {
      let dataToSend = {
        property: "mobile",
        value: this.state.mobileNumber,
      };
      instance
        .post(baseURL + "/getCustomerByPropertyValue", dataToSend)
        .then((res) => {
          if (res.data.result.error === false) {
            if (res.data.data === null) {
              // this.callOtpGen();
              this.props.history.push({
                pathname: "/document-type",
                //search: '?query=abc',
                state: {
                  mobileNumber: this.state.mobileNumber,
                },
              });
            } else {
              this.setState({ isLoading: false }, () => {
                confirmAlert({
                  title: "Message",
                  message: <p className="mod-p"> {"User Already Exists"} </p>,
                  buttons: [
                    {
                      label: "Ok",
                      onClick: () => {},
                    },
                  ],
                  closeOnClickOutside: false,
                });
              });
            }
          } else if (res.data.result.error === true) {
            this.setState({ isLoading: false }, () => {
              confirmAlert({
                title: "Message",
                message: <p className="mod-p"> {res.data.result.errorMsg} </p>,
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {},
                  },
                ],
                closeOnClickOutside: false,
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
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
                /> */}
                {/* <h3>Welcome to</h3>
                <p>Digital Banking System!</p> */}
              </div>
              <div className="col-md-10 register-right">
                <div className="tab-content" id="myTabContent">
                  <h3 className="register-heading">Mobile Number</h3>
                  <div className="row register-form">
                    <div className="form-group col-md-8 mb-0">
                      <div
                        className={
                          this.state.error === true
                            ? "alert alert-danger alert-dismissible fade show"
                            : "d-none"
                        }
                        role="alert"
                      >
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          {this.state.errorMessage}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-8 offset-md-2">
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <select
                              className="form-control form-control-sm"
                              id="mobileNumber"
                              onChange={(e) =>
                                this.setState({
                                  code: e.target.value,
                                })
                              }
                            >
                              <option value={+880}>+880</option>
                              <option value={+91}>+91</option>
                            </select>
                          </div>
                          <input
                            type="number"
                            // pattern="[0-9]*"
                            name="mobileNumber"
                            autoComplete="off"
                            className="form-control small-input"
                            placeholder="Enter Mobile Number"
                            onChange={this.ChangeHandler}
                            // minLength={10}
                            maxLength={10}
                            max="10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12" style={{ textAlign: "center" }}>
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-success"
                          style={{ padding: "5px 20px", borderRadius: "20px" }}
                          onClick={() => {
                            this.setState({ isLoading: true }, () => {
                              this.checkMobileExists();
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

export default MobileNumber;
