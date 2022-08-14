import React, { Component } from "react";
import "../../assets/styles/signup.css";
import { login } from "../service/ApiService";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      isLogin: false,
      isRedirect: false,
      isLoading: false,
      error: false,
      errorMessage: "Someting Worng!",
    };
    //camera.startCamera();
  }

  componentDidMount() {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      this.props.history.push({ pathname: "/dashboard" });
    }
  }

  ChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    //console.log(this.state);
  };

  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  loginButtonAction = (e) => {
    e.preventDefault();
    if (this.state.username === "") {
      this.setState({ error: true, errorMessage: "Username can't be Empty" });
      // alert("Username can't be empty");
      return;
    }
    if (this.state.password === "") {
      this.setState({ error: true, errorMessage: "Password can't be Empty" });
      // alert("Username can't be empty");
      return;
    }
    let params = {
      username: this.state.username,
      password: this.state.password,
    };
    // let config = { headers: {} };
    // axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    //axios.defaults.withCredentials = true;
    this.setState({ isLoading: true }, () => {
      login(params.username, params.password, (response) => {
        console.log("response", response.status);

        if (response.status === 202) {
          this.setState(
            {
              error: true,
              toDashboard: false,
              isLoading: false,
              errorMessage: "Network Unreachable",
            },
            () => {
              localStorage.setItem("loggedIn", false);
              this.props.history.push("/banklogin");
            }
          );
        }

        const {
          data,
          // config: { url },
          status,
          error,
          error_description = "Worng Username or Password !",
        } = response;
        console.log(
          "status",
          status,
          "data",
          data,
          error,
          data.error_description
        );

        if (status !== 200) {
          this.setState(
            {
              // username: "",
              // password: "",
              error: true,
              toDashboard: false,
              isLoading: false,
              errorMessage:
                status === 405 ? data.error_description : error_description,
            },
            () => {
              if (
                status === 405 &&
                data.error_description.indexOf("multiple login attempt by") !==
                  -1
              ) {
                this.loginButtonAction(e);
              } else {
                localStorage.setItem("loggedIn", false);
                this.props.history.push("/banklogin");
              }
            }
          );
        } else if (status === 200) {
          this.setState(
            { error: false, toDashboard: true, isLoading: false },
            () => {
              localStorage.setItem("loggedIn", true);
              localStorage.setItem("username", this.state.username);
              // this.props.history.push("/dashboard");
              window.location.href = process.env.PUBLIC_URL + "/dashboard";
            }
          );
        }
      });
    });
  };

  render() {
    return (
      <div>
        <div className="container main">
          <img
            className="center"
            src={process.env.PUBLIC_URL + "/sbi-i.png"}
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
                <p style={{ color: "#ffffff" }}>
                  Online Account Opening / E-KYC Portal
                </p>
              </div>
              <div className="col-md-9 register-right">
                <div className="tab-content" id="myTabContent">
                  <h3 className="register-heading">Sign In</h3>
                  <form onSubmit={this.loginButtonAction}>
                    <div className="row register-form">
                      <div
                        className="col-md-12"
                        style={{ textAlign: "center" }}
                      >
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
                                style={{
                                  fontSize: "16px",
                                  marginBottom: "0px",
                                }}
                              >
                                {this.state.errorMessage}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            // minlength="10"
                            // maxlength="10"
                            autoComplete="off"
                            name="username"
                            maxLength={40}
                            className="form-control"
                            placeholder="Username"
                            onChange={this.ChangeHandler}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            autoComplete="off"
                            className="form-control"
                            maxLength={40}
                            placeholder="Enter Password"
                            onChange={this.ChangeHandler}
                            required
                          />
                        </div>
                      </div>
                      <div
                        className="col-md-12"
                        style={{ textAlign: "center" }}
                      >
                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn-success"
                            // onClick={() => {
                            //   this.loginButtonAction();
                            //   //camera.takeSnapshot();
                            // }}
                            // onSubmit={this.loginButtonAction}
                            disabled={this.state.isLoading}
                          >
                            {this.state.isLoading ? (
                              <span>
                                <i className="fa fa-spinner fa-spin mr-3"></i>
                                Signing...
                              </span>
                            ) : (
                              "Sign In"
                            )}{" "}
                          </button>
                          {/* <button
                          type="button"
                          className="btnlogin"
                          onClick={() => {
                            //this.loginButtonAction();
                            //camera.stopCamera();
                          }}
                        >
                          Stop Camera
                        </button> */}
                        </div>
                      </div>

                      <div
                        className="col-md-12"
                        style={{ textAlign: "center" }}
                      >
                        <div className="form-group">
                          {/* <Link className="sign-btn" to="/forget-password">
                            Forgot Password?
                          </Link> */}
                          {/* <Link className="signup" to="/signup">
                          Sign Up
                        </Link> */}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
