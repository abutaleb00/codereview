import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import Loader from "../components/Loader";
import { instance } from "../service/ApiUrls";
import { baseURL } from "../service/ApiService";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = { loaderShow: false };
    // if (this.props.location.state === undefined) {
    //   console.log("Redirect to login page ");
    //   window.location = process.env.PUBLIC_URL + "/dashboard";
    // }
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  callChangePassword = (e) => {
    e.preventDefault();
    this.setState({ loaderShow: true }, () => {
      instance
        .post(baseURL + "/user-list/change-password", this.state)
        .then((res) => {
          if (res.data.result.error === false) {
            this.setState({ loaderShow: false }, () => {
              confirmAlert({
                title: "Password Changed",
                message: (
                  <p className="mod-p">
                    {" "}
                    {"Please re-login with new password"}{" "}
                  </p>
                ),
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {
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
                      // localStorage.setItem("loggedIn", false);
                      // this.props.history.push("/banklogin");
                    },
                  },
                ],
                closeOnClickOutside: false,
              });
            });
          } else if (res.data.result.error === true) {
            this.setState({ loaderShow: false }, () => {
              confirmAlert({
                title: "Error Message",
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
        .catch((err) => {});
    });
  };

  render() {
    return (
      <div>
        <div className="row justify-content-center mt-3">
          <div
            className="col-3"
            style={{
              borderRight: "1px dotted gray",
              marginRight: "10px",
            }}
          >
            <div className="page-header">
              <h3 className="page-title"> Change Password</h3>
            </div>
            <p style={{}}>
              {" "}
              In order to <b>protect your account,</b> make sure your password:
            </p>
            <p>
              <i className="fa fa-check mr-1"></i>At least 8 characters
            </p>
            <p>
              <i className="fa fa-check mr-1"></i>At least 1 letters
            </p>
            <p>
              <i className="fa fa-check mr-1"></i>At Least 1 digits
            </p>
            <p>
              <i className="fa fa-check mr-1"></i>Must not contain database name
            </p>
            <p>
              <i className="fa fa-check mr-1"></i>Must not contain user name or
              reverse user name
            </p>
            <p>
              <i className="fa fa-check mr-1"></i>Must not contain oracle
            </p>
            <p>
              <i className="fa fa-check mr-1"></i>Must not be too simple like
              welcome1
            </p>
            <p>
              <i className="fa fa-check mr-1"></i>Password must differ by at
              least 3 characters from the old password
            </p>
          </div>
          <div className="col-4">
            <form onSubmit={this.callChangePassword} className="pt-2">
              <p style={{ fontWeight: "bold" }}>
                Please fillup below Information:
              </p>
              <div className="form-group">
                <input
                  type="password"
                  maxLength={40}
                  className="form-control form-control-lg"
                  id="oldPassword"
                  autoComplete="off"
                  name="currentPassword"
                  onChange={this.handleOnChange}
                  placeholder="Enter Old Password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  maxLength={40}
                  className="form-control form-control-lg"
                  id="newPassword"
                  autoComplete="off"
                  name="newPasswordSt"
                  onChange={this.handleOnChange}
                  placeholder="Enter New Password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  maxLength={40}
                  className="form-control form-control-lg"
                  id="confirmPassword"
                  autoComplete="off"
                  name="confirmedPasswordSt"
                  onChange={this.handleOnChange}
                  placeholder="Enter Confirm Password"
                  required
                />
              </div>
              <div className="mt-3">
                <button
                  className="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   console.log(this.state);
                  //   this.callChangePassword();
                  // }}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <Loader
          loaderShow={this.state.loaderShow}
          onHide={this.loaderHideHandler}
          loaderHideHandler={this.loaderHideHandler}
        />
      </div>
    );
  }
}

export default ChangePassword;
