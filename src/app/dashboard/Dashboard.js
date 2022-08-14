import React, { Component } from "react";
import { Link } from "react-router-dom";
import { instance } from "../service/ApiUrls";
import { baseURL } from "../service/ApiService";
import { confirmAlert } from "react-confirm-alert";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  callAccountsApi = ({
    datediff,
    branchId,
    first = 0,
    limit = 10,
    filter = null,
  } = {}) => {
    instance
      .post(
        baseURL + "/todaysaccountsbybranch",

        { datediff: datediff, branchId: branchId },
        {
          params: {
            first,
            limit,
            filter,
          },
        }
      )
      .then((res) => {
        if (res.data.result.error === false) {
          this.setState({
            todaysaccounts: { ...res.data.data },
            todaystotal: res.data.data.total,
          });
        }
      });
  };

  callCustomerProfileCount = ({
    datediff = 30,
    branchId = 3,
    first = 0,
    limit = 10,
    filter = null,
  } = {}) => {
    instance
      .post(
        baseURL + "/customercountsbybranch",

        { datediff: datediff, branchId: branchId },
        {
          params: {
            first,
            limit,
            filter,
          },
        }
      )
      .then((res) => {
        if (res.data.result.error === false) {
          this.setState({
            cpcounts: { ...res.data.data },
            cptotal: res.data.data.total,
          });
        }
      });
  };

  callAppUserProfileCount = ({
    datediff = 30,
    branchId = 9,
    first = 0,
    limit = 10,
    filter = null,
  } = {}) => {
    instance
      .post(
        baseURL + "/appusercreated",

        { datediff: datediff, branchId: branchId },
        {
          params: {
            first,
            limit,
            filter,
          },
        }
      )
      .then((res) => {
        if (res.data.result.error === false) {
          this.setState({
            appusers: { ...res.data.data },
            appusertotal: res.data.data.total,
          });
        }
      });
  };

  componentDidMount() {
    //const loggedIn = localStorage.getItem("loggedIn");
    instance
      .post(baseURL + "/getloggedinuser")
      .then((res) => {
        if (res.data.result.error === false) {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("username", res.data.data.username);
          this.setState({ passExpaired: res.data.data.passwordChange }, () => {
            //console.log(typeof passExpaired);
            this.callAccountsApi({
              datediff: 1,
              branchId: res.data.data.branchId,
            });
            this.callCustomerProfileCount();
            this.callAppUserProfileCount();
          });
        } else {
          localStorage.setItem("loggedIn", false);
          this.props.history.push("/banklogin");
        }
      })
      .catch((err) => {
        localStorage.setItem("loggedIn", false);
        window.location.href = "/banklogin";
      });
    // if (loggedIn === "false") {
    //   this.props.history.push("/banklogin");
    // }
  }
  render() {
    //const { passExpaired } = this.state;
    const errorM =
      this.state.passExpaired !== undefined &&
      this.state.passExpaired !== null &&
      this.state.passExpaired === true
        ? confirmAlert({
            title: "Error Message",
            message: <p className="mod-p">Your password need to be changed.</p>,
            buttons: [
              {
                label: "Change Password",
                onClick: () => {
                  this.props.history.push("/change-password");
                },
              },
            ],
            closeOnClickOutside: false,
          })
        : "";

    return (
      <div>
        <div id="dashboard" className="row align-items-start proBanner mt-4">
          <div className="col-md-4 grid-margin stretch-card dashboard-card">
            <div className="card text-white p-3">
              <div className="card-body">
                <Link to="/new-account-list">
                  <div className="d-flex justify-content-between pb-2 align-items-center">
                    <h2 className="font-weight-semibold mb-0">
                      {this.state.todaystotal}
                    </h2>
                    <div className="icon-holder">
                      <i
                        className="mdi mdi-comment-account"
                        style={{ fontSize: "36px" }}
                      ></i>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5 className="font-weight-semibold mb-0">
                      New Account <br />
                      List
                    </h5>
                    <p className="text-white mb-0">Since Today's</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card dashboard-card">
            <div className="card text-white p-3">
              <div className="card-body">
                <Link to="/new-customer-list">
                  <div className="d-flex justify-content-between pb-2 align-items-center">
                    <h2 className="font-weight-semibold mb-0">
                      {this.state.cptotal}
                    </h2>
                    <div className="icon-holder">
                      <i
                        className="mdi mdi-account-star"
                        style={{ fontSize: "36px" }}
                      ></i>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5 className="font-weight-semibold mb-0">
                      {/* Nid Verified Customer */}
                      New Customer List
                    </h5>
                    <p className="text-white mb-0">Since last month</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card dashboard-card">
            <div className="card text-white p-3">
              <div className="card-body">
                {/* <Link> */}
                <div className="d-flex justify-content-between pb-2 align-items-center">
                  <h2 className="font-weight-semibold mb-0">
                    {this.state.appusertotal}
                  </h2>
                  <div className="icon-holder">
                    <i
                      className="mdi mdi-apps"
                      style={{ fontSize: "36px" }}
                    ></i>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <h5 className="font-weight-semibold mb-0">
                    Existing Customer
                  </h5>
                  <p className="text-white mb-0">Since last month</p>
                </div>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
        {errorM}
        {/* <div className="row align-items-start proBanner mt-2">
          <div className="col-md-6 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mb-0">Incomplete Acount List</h4>
                  <a href="!#" onClick={(evt) => evt.preventDefault()}>
                    <small>Show All</small>
                  </a>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Customer Name</th>
                        <th>Account No</th>
                        <th>Customer ID</th>
                        <th>Branch Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>MD. SABUJ HOSSAIN</td>
                        <td>1120000168766</td>
                        <td>234986755</td>
                        <td>Narayan</td>
                      </tr>
                      <tr>
                        <td>MD. SABUJ HOSSAIN</td>
                        <td>1120000168766</td>
                        <td>234986755</td>
                        <td>Kawranbazar</td>
                      </tr>
                      <tr>
                        <td>MD. SABUJ HOSSAIN</td>
                        <td>1120000168766</td>
                        <td>234986755</td>
                        <td>Narayan Hat</td>
                      </tr>
                      <tr>
                        <td>MD. SABUJ HOSSAIN</td>
                        <td>1120000168766</td>
                        <td>234986755</td>
                        <td>Gulshan</td>
                      </tr>
                      <tr>
                        <td>MD. SABUJ HOSSAIN</td>
                        <td>1120000168766</td>
                        <td>234986755</td>
                        <td>Gulshan</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mb-0">App Pending User List</h4>
                  <a href="!#" onClick={(evt) => evt.preventDefault()}>
                    <small>Show All</small>
                  </a>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>CBS ID</th>
                        <th>Account Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>MD. SABUJ HOSSAIN</td>
                        <td>112000016</td>
                        <td style={{ textAlign: "center" }}>
                          <span className="badge badge-danger">Inactive</span>
                        </td>
                      </tr>
                      <tr>
                        <td>MD. MAHEDI HASAN</td>
                        <td>1120000168766</td>
                        <td style={{ textAlign: "center" }}>
                          <span className="badge badge-danger">Inactive</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
export default Dashboard;
