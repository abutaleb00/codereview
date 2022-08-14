import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { instance } from "../service/ApiUrls";
import { baseURL } from "../service/ApiService";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // permitted: {
      //   "/dashboard": {
      //     url: "/dashboard",
      //     title: "Dashboard",
      //     permit: false,
      //   },
      //   "/management": {
      //     url: "/management",
      //     title: "App Management",
      //     permit: false,
      //   },
      //   "/users": {
      //     url: "/users",
      //     title: "User Management",
      //     permit: false,
      //   },
      //   "/usermobile": {
      //     url: "/usermobile",
      //     title: "New Customer",
      //     permit: false,
      //   },
      //   "/customer-list": {
      //     url: "/customer-list",
      //     title: "Customer List",
      //     permit: false,
      //   },
      //   "/account-list": {
      //     url: "/account-list",
      //     title: "Account List",
      //     permit: false,
      //   },
      // },
      icons: {
        "/usermobile": "mdi mdi-account-multiple-plus menu-icon",
        "/customer-list": "mdi mdi-playlist-plus menu-icon",
        "/account-list": "mdi mdi-view-list menu-icon",
      },
    };
  }

  toggleMenuState = (menuState) => {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        console.log("i value", i);
        if ("icons" === i || "webfeatures" === i || "permitted" === i) {
        } else {
          this.setState({ [i]: false });
        }
      });
      this.setState({ [menuState]: true });
    }
  };
  callLoggedInUser = () => {
    instance
      .post(baseURL + "/getloggedinuser")
      .then((res) => {
        if (res.data.result.error === false) {
          this.setState(
            {
              webfeatures: res.data.data.webfeaturelist,
              otherData: res.data.data,
            },
            () => {
              let permitted = {
                "/dashboard": {
                  url: "/dashboard",
                  title: "Dashboard",
                  permit: false,
                },
                "/management": {
                  url: "/management",
                  title: "App Management",
                  permit: false,
                },
                "/users": {
                  url: "/users",
                  title: "User Management",
                  permit: false,
                },
                "/users-list": {
                  url: "/users-list",
                  title: "User Management",
                  permit: false,
                },
                "/users-checklist": {
                  url: "/users-checklist",
                  title: "User Management",
                  permit: false,
                },
                "/usermobile": {
                  url: "/usermobile",
                  title: "New Customer",
                  permit: false,
                },
                "/customer-list": {
                  url: "/customer-list",
                  title: "Customer List",
                  permit: false,
                },
                "/account-list": {
                  url: "/account-list",
                  title: "Account List",
                  permit: false,
                },
              };
              this.state.webfeatures.map((v) => {
                permitted[v.protectedurl] = {
                  ...permitted[v.protectedurl],
                  permit: true,
                };
              });
              this.setState({ permitted: permitted }, () => {});
            }
          );
        }
      })
      .catch((err) => {
        localStorage.setItem("loggedIn", false);
        window.location.href = "/banklogin";
      });
  };

  // componentDidMount = () => {

  // };

  componentDidUpdate = (prevProps) => {
    //let loggin = localStorage.getItem("loggedIn");
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
      //if (loggin === "true") {
      this.callLoggedInUser();
      //}
    }
  };

  onRouteChanged = () => {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/basic-ui", state: "basicUiMenuOpen" },
      { path: "/form-elements", state: "formElementsMenuOpen" },
      { path: "/management ", state: "managementMenuOpen" },
      { path: "/users ", state: "usermanagementMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/charts", state: "chartsMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  };
  render() {
    //console.log(permitted);
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center"></div>
        <ul className="nav m-t-70">
          {this.state.permitted !== undefined &&
          this.state.permitted["/dashboard"] !== undefined &&
          this.state.permitted["/dashboard"].permit === true ? (
            <li
              className={
                this.isPathActive("/dashboard") ? "nav-item active" : "nav-item"
              }
            >
              <Link className="nav-link" to="/dashboard">
                <i className="mdi mdi-home menu-icon"></i>
                <span className="menu-title">Dashboard</span>
              </Link>
            </li>
          ) : (
            ""
          )}
          {/* {this.state.permitted !== undefined &&
          this.state.permitted["/management"] !== undefined &&
          this.state.permitted["/management"].permit === true ? (
            <li
              className={
                this.isPathActive("/management")
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <div
                className={
                  this.state.managementMenuOpen
                    ? "nav-link menu-expanded"
                    : "nav-link"
                }
                onClick={() => this.toggleMenuState("managementMenuOpen")}
                data-toggle="collapse"
              >
                <i className="mdi mdi-apps menu-icon"></i>
                <span className="menu-title">App Management</span>
                <i className="menu-arrow"></i>
              </div>
              <Collapse in={this.state.managementMenuOpen}>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/managementappuser-list")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/managementappuser-list"
                    >
                      <i className="mdi mdi-account-multiple menu-icon"></i> App
                      User List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/managementfeature-list")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/managementfeature-list"
                    >
                      <i className="mdi mdi-view-grid menu-icon"></i> Features
                      List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/managementbranch-list")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/managementbranch-list"
                    >
                      <i className="mdi mdi-bank menu-icon"></i> Branch List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/managementatm-list")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/managementatm-list"
                    >
                      <i className="mdi mdi-cup menu-icon"></i> ATM List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/managementagents-list")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/managementagents-list"
                    >
                      <i className="mdi mdi-clipboard-account menu-icon"></i>{" "}
                      Agents List
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li>
          ) : (
            ""
          )} */}
          {this.state !== undefined &&
          this.state.permitted !== undefined &&
          this.state.permitted["/users-list"] !== undefined &&
          this.state.otherData?.roleName === "Maker Admin" &&
          this.state.permitted["/users-list"].permit === true ? (
            <>
              <li
                className={
                  this.isPathActive("/users-list")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="/users-list">
                  <i className="mdi mdi mdi-account-box-outline menu-icon"></i>
                  <span className="menu-title">User List</span>
                </Link>
              </li>
              <li
                className={
                  this.isPathActive("/new-user")
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="/new-user">
                  <i className="mdi mdi-account-convert menu-icon"></i>
                  <span className="menu-title">New User</span>
                </Link>
              </li>
            </>
          ) : // <li
          //   className={
          //     this.isPathActive("/users") ? "nav-item active" : "nav-item"
          //   }
          // >
          //   <div
          //     className={
          //       this.state.usermanagementMenuOpen
          //         ? "nav-link menu-expanded"
          //         : "nav-link"
          //     }
          //     onClick={() => this.toggleMenuState("usermanagementMenuOpen")}
          //     data-toggle="collapse"
          //   >
          //     <i className="mdi mdi-account-convert menu-icon"></i>
          //     <span className="menu-title">User Management</span>
          //     <i className="menu-arrow"></i>
          //   </div>
          //   <Collapse in={this.state.usermanagementMenuOpen}>
          //     <ul className="nav flex-column sub-menu">
          //       <li className="nav-item">
          //         <Link
          //           className={
          //             this.isPathActive("/new-user")
          //               ? "nav-link active"
          //               : "nav-link"
          //           }
          //           to="/new-user"
          //         >
          //           <i className="mdi mdi-account-plus menu-icon"></i> New
          //           User
          //         </Link>
          //       </li>
          //       <li className="nav-item">
          //         <Link
          //           className={
          //             this.isPathActive("/users")
          //               ? "nav-link active"
          //               : "nav-link"
          //           }
          //           to="/users-list"
          //         >
          //           <i className="mdi mdi-account-multiple menu-icon"></i>{" "}
          //           Users List
          //         </Link>
          //       </li>
          //     </ul>
          //   </Collapse>
          // </li>
          this.state !== undefined &&
            this.state.permitted !== undefined &&
            this.state.permitted["/users-checklist"] !== undefined &&
            this.state.otherData?.roleName === "Checker Admin" &&
            this.state.permitted["/users-checklist"].permit === true ? (
            <li
              className={
                this.isPathActive("/users-checklist")
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Link className="nav-link" to="/users-checklist">
                <i className="mdi mdi-account-convert menu-icon"></i>
                <span className="menu-title">Users List</span>
              </Link>
            </li>
          ) : (
            // <li
            //   className={
            //     this.isPathActive("/users") ? "nav-item active" : "nav-item"
            //   }
            // >
            //   <div
            //     className={
            //       this.state.usermanagementMenuOpen
            //         ? "nav-link menu-expanded"
            //         : "nav-link"
            //     }
            //     onClick={() => this.toggleMenuState("usermanagementMenuOpen")}
            //     data-toggle="collapse"
            //   >
            //     <i className="mdi mdi-account-convert menu-icon"></i>
            //     <span className="menu-title">User Management</span>
            //     <i className="menu-arrow"></i>
            //   </div>
            //   <Collapse in={this.state.usermanagementMenuOpen}>
            //     <ul className="nav flex-column sub-menu">
            //       <li className="nav-item">
            //         <Link
            //           className={
            //             this.isPathActive("/users")
            //               ? "nav-link active"
            //               : "nav-link"
            //           }
            //           to="/users-checklist"
            //         >
            //           <i className="mdi mdi-account-multiple menu-icon"></i>{" "}
            //           Users List
            //         </Link>
            //       </li>
            //     </ul>
            //   </Collapse>
            // </li>
            ""
          )}
          {/* <li
            className={
              this.isPathActive("/management") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.managementMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("managementMenuOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-apps menu-icon"></i>
              <span className="menu-title">Management</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.managementMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/managementappuser-list")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/managementappuser-list"
                  >
                    <i className="mdi mdi-account-multiple menu-icon"></i> App
                    User List
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li> */}

          {/* {this.state !== undefined &&
            this.state.webfeatures !== undefined &&
            this.state.webfeatures.map((v) => {
              if (
                v.protectedurl === "/dashboard" ||
                v.protectedurl === "/management" ||
                v.protectedurl === "/users"
              ) {
              } else {
                return (
                  <li
                    className={
                      this.isPathActive(v.protectedurl)
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Link className="nav-link" to={v.protectedurl}>
                      <i className={this.state.icons[v.protectedurl]}></i>
                      <span className="menu-title">{v.title}</span>
                    </Link>
                  </li>
                );
              }
            })} */}
          {this.state !== undefined &&
          this.state.permitted !== undefined &&
          this.state.permitted["/usermobile"] !== undefined &&
          this.state.permitted["/usermobile"].permit === true ? (
            <li
              className={
                this.isPathActive("/usermobile")
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Link className="nav-link" to="/usermobile">
                <i className="mdi mdi-playlist-plus menu-icon"></i>
                <span className="menu-title">New Customer</span>
              </Link>
            </li>
          ) : (
            ""
          )}
          {this.state !== undefined &&
          this.state.permitted !== undefined &&
          this.state.permitted["/customer-list"] !== undefined &&
          this.state.permitted["/customer-list"].permit === true ? (
            <li
              className={
                this.isPathActive("/customer-list")
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Link className="nav-link" to="/customer-list">
                <i className="mdi mdi mdi-account-multiple menu-icon"></i>
                <span className="menu-title">Customer List</span>
              </Link>
            </li>
          ) : (
            ""
          )}
          {this.state !== undefined &&
          this.state.permitted !== undefined &&
          this.state.permitted["/new-application"] !== undefined &&
          this.state.permitted["/new-application"].permit === true ? (
            <li
              className={
                this.isPathActive("/new-application")
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Link className="nav-link" to="/new-application">
                <i className="mdi mdi-plus-circle menu-icon"></i>
                <span className="menu-title">New Account</span>
              </Link>
            </li>
          ) : (
            ""
          )}
          {this.state !== undefined &&
          this.state.permitted !== undefined &&
          this.state.permitted["/account-list"] !== undefined &&
          this.state.permitted["/account-list"].permit === true ? (
            <li
              className={
                this.isPathActive("/account-list")
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Link className="nav-link" to="/account-list">
                <i className="mdi mdi-view-list menu-icon"></i>
                <span className="menu-title">Account List</span>
              </Link>
            </li>
          ) : (
            ""
          )}
          {/* <li
            className={
              this.isPathActive("/icons") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.iconsMenuOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("iconsMenuOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-chart-bar menu-icon"></i>
              <span className="menu-title">Reports</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.iconsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link
                    className={
                      this.isPathActive("/reports/success")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/reports/success"
                  >
                    eKYC Report
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      this.isPathActive("/reports/branch-wise-report")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/reports/branch-wise-report"
                  >
                    Branch Wise
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      this.isPathActive("/reports/product-wise-report")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/reports/product-wise-report"
                  >
                    Product Wise
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      this.isPathActive("/reports/onboarding-type-report")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/reports/onboarding-type-report"
                  >
                    Onboarding Type
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      this.isPathActive("/reports/ekyc-type-report")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/reports/ekyc-type-report"
                  >
                    eKYC Type
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li> */}
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount = () => {
    this.onRouteChanged();
    let loggin = localStorage.getItem("loggedIn");
    if (loggin === "true") {
      this.callLoggedInUser();
    }
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  };
}

export default withRouter(Sidebar);
