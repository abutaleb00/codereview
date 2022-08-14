import React, { Component } from "react";
import "../../assets/styles/signup.css";

export class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
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
            src={process.env.PUBLIC_URL + "/sbi-logo2.png"}
            alt="logo"
          />
          <div className="register">
            <div className="row">
              <div className="col-md-3 register-left">
                <img
                  className="center"
                  src={process.env.PUBLIC_URL + "/logo-dbs.png"}
                  alt="logo"
                  width="170px"
                />
                <h4 style={{ color: "#ffffff" }}>Welcome to</h4>
                <p style={{ color: "#ffffff" }}>Digital Banking System!</p>
              </div>
              <div className="col-md-9 register-right">
                <div className="tab-content" id="myTabContent">
                  <h3 className="register-heading">Forget Password</h3>
                  <div className="row register-form">
                    <div className="col-md-12" style={{ textAlign: "center" }}>
                      <div className="row justify-content-md-center">
                        <div className="form-group col-md-8 mb-0">
                          <div
                            className={
                              this.state.error === true
                                ? "alert alert-danger fade show"
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
                    <div className="col-md-12 row justify-content-md-center">
                      <div className="form-group">
                        <input
                          type="email"
                          maxLength={40}
                          // minlength="10"
                          // maxlength="10"
                          name="email"
                          autoComplete="off"
                          className="form-control"
                          placeholder="Enter Email Address"
                          onChange={this.ChangeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-md-12" style={{ textAlign: "center" }}>
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {}}
                          disabled={this.state.isLoading}
                        >
                          Reset Password
                        </button>
                      </div>
                    </div>
                    <div className="col-md-12" style={{ textAlign: "center" }}>
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => {
                            window.location.href = "/banklogin";
                          }}
                        >
                          Sign In
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

export default ForgetPassword;
