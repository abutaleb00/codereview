import React, { Component } from "react";
import { instance, baseURL } from "../service/ApiUrls";
import { confirmAlert } from "react-confirm-alert";
import CustomMultiSelect from "../components/CustomMultiSelect";
import Loader from "../components/Loader";
let xx = [];
class UserWithFeatures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  ...props.location.state.datToload,
      content: [],
      optionsss: [],
      roleName: "1",
    };
  }

  handleChange = (e) => {
    // console.log("Before", e.target.id);
    this.setState({ [e.target.id]: e.target.value });
    //console.log("After", e.target.id);
  };
  dropChange = (e) => {
    //console.log(e.target.value);
    this.setState({ ...this.state, [e.target.id]: e.target.value });
    //console.log("After", e.target.id);
  };
  parentMultiFunc = (e) => {
    this.setState({ featureIds: e });
  };

  flattenObject = (ob) => {
    const toReturn = {};

    Object.keys(ob).map((i) => {
      if (typeof ob[i] === "object" && ob[i] !== null) {
        const flatObject = this.flattenObject(ob[i]);
        Object.keys(flatObject).map((x) => {
          toReturn[`${i}.${x}`] = flatObject[x];
          return x;
        });
      } else {
        toReturn[i] = ob[i];
      }
      return i;
    });
    return toReturn;
  };
  callGetFeatures = () => {
    instance
      .post(baseURL + "/getAllWebFeatures")
      .then((res) => {
        if (res.data.result.error === false) {
          this.setState({ contentData: res.data.data.content }, () => {
            let optionsss = [];
            this.state.contentData.map((v, k) => {
              optionsss.push({
                label: v.title,
                value: v.id,
              });
            });
            console.log("contentData", this.state.contentData);
            this.setState({ optionsss: optionsss });
            console.log("UserId", this.state.optionsss);
          });
        } else if (res.data.result.error === true) {
          this.setState({}, () => {
            confirmAlert({
              title: "Error Message",
              message: <p className="mod-p">{res.data.result.errorMsg}</p>,
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
  };
  callBranchList = ({ first = 0, limit = 1000 } = {}) => {
    instance
      .post(baseURL + "/getbranches", null, {
        params: {
          first: first,
          limit: limit,
        },
      })
      .then((res) => {
        if (res.data.result.error === false) {
          this.setState(
            { ...res.data.data, loaderShow: false, rowsPerPage: limit },
            () => {
              xx = [];
              this.state.content.map((v) => {
                xx.push(this.flattenObject(v));
              });
              this.setState({ converted: xx });
            }
          );
          console.log("state", this.state.converted);
        } else if (res.data.result.error === true) {
          this.setState({ loaderShow: false }, () => {
            confirmAlert({
              title: "Error Message",
              message: <p className="mod-p">{res.data.result.errorMsg}</p>,
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
        this.setState({ loaderShow: false });
      });
  };

  updateUser = (e) => {
    e.preventDefault();
    let dataTosend = {
      username: this.state.username,
      email: this.state.email,
      branchName: this.state.branchName,
      fullName: this.state.fullName,
      mobile: this.state.mobile,
      featureIds: this.state.featureIds,
      plainpassword: this.state.password,
      roleName: this.state.roleName,
    };
    const pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!pattern.test(this.state.password)) {
      confirmAlert({
        title: "Error Message",
        message: (
          <p className="mod-p">
            Your password is not complex enough. Please follow the guidelines.{" "}
          </p>
        ),
        buttons: [
          {
            label: "Ok",
            onClick: () => {},
          },
        ],
      });
    } else {
      this.setState({ loaderShow: true }, () => {
        instance
          .post(baseURL + "/insertuserwithfeatures", dataTosend)
          .then((res) => {
            if (res.data.result.error === false) {
              this.setState({ loaderShow: false }, () => {
                confirmAlert({
                  title: "Success Message",
                  message: <p className="mod-sp">Create Successfully</p>,
                  buttons: [
                    {
                      label: "Ok",
                      onClick: () => {
                        this.props.history.push("/user-management");
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
                  message: <p className="mod-p">{res.data.result.errorMsg}</p>,
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
            this.setState({ loaderShow: false });
          });
      });
    }
  };
  componentDidMount() {
    this.setState({ loaderShow: true }, () => {
      this.callBranchList();
      this.callGetFeatures();
    });
  }

  render() {
    return (
      <div>
        <div className="page-header mt-2">
          <h3 className="page-title" style={{ width: "100%" }}>
            Users Information{" "}
            <button
              className="btn btn-secondary"
              style={{ float: "right" }}
              onClick={() => {
                this.props.history.push({
                  pathname: "/users-list",
                });
              }}
            >
              <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>{" "}
              Back to User List
            </button>
          </h3>
        </div>
        <div className="row proBanner mt-3">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={this.updateUser}>
                  <div className="row justify-content-md-center">
                    <div className="col-md-6 d-inline-block">
                      <div className="form-group">
                        <label htmlFor="">User ID</label>
                        <input
                          type="text"
                          className="form-control form-control"
                          id="username"
                          name="username"
                          maxLength={40}
                          autoComplete="off"
                          placeholder="Enter User ID"
                          value={this.state.name}
                          onChange={(e) => this.handleChange(e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 d-inline-block">
                      <div className="form-group">
                        <label htmlFor="">Email Address</label>
                        <input
                          type="email"
                          className="form-control form-control"
                          id="email"
                          name="email"
                          maxLength={40}
                          autoComplete="off"
                          placeholder="Enter Email Address"
                          value={this.state.name}
                          onChange={(e) => this.handleChange(e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 d-inline-block">
                      <div className="form-group">
                        <label htmlFor="">User Full Name</label>
                        <input
                          type="text"
                          className="form-control form-control"
                          id="fullName"
                          autoComplete="off"
                          name="fullName"
                          maxLength={40}
                          placeholder="Enter User Full Name"
                          value={this.state.name}
                          onChange={(e) => this.handleChange(e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 d-inline-block">
                      <div className="form-group">
                        <label htmlFor="">Mobile Number</label>
                        <input
                          type="number"
                          className="form-control form-control"
                          id="mobile"
                          autoComplete="off"
                          name="mobile"
                          pattern="[0-9]*"
                          maxLength={13}
                          placeholder="Enter Mobile Number"
                          value={this.state.name}
                          onChange={(e) => this.handleChange(e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 d-inline-block">
                      <div className="form-group">
                        <label htmlFor="">Branch Name</label>
                        <select
                          id="branchName"
                          name="branchName"
                          className="form-control"
                          disabled={this.state.disable}
                          onChange={(e) => this.dropChange(e)}
                          value={this.state.name}
                          required
                          //defaultValue={window.PersonalInformation.state[this.props.id]}
                          // defaultValue={values.gender}
                        >
                          {this.state.content.map((v, k) => {
                            //console.log(v);
                            return (
                              <option
                                key={v.id + "_" + k}
                                id={v.id}
                                value={v.name}
                              >
                                {v.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 d-inline-block">
                      <div className="form-group">
                        <label htmlFor="">Role Name</label>
                        <select
                          id="roleName"
                          name="roleName"
                          className="form-control"
                          disabled={this.state.disable}
                          onChange={(e) => this.dropChange(e)}
                          value={this.state.roleName}
                          required
                          //defaultValue={window.PersonalInformation.state[this.props.id]}
                          // defaultValue={values.gender}
                        >
                          <option value="1">Maker Admin</option>
                          <option value="4">Checker Admin</option>
                          <option value="2">Maker</option>
                          <option value="3">Checker</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 d-inline-block">
                      <div className="form-group">
                        <label htmlFor="featureIds">Feature Ids</label>
                        <CustomMultiSelect
                          options={this.state.optionsss}
                          parentCall={this.parentMultiFunc}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 d-inline-block">
                      <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input
                          type="password"
                          className="form-control form-control"
                          id="password"
                          name="password"
                          autoComplete="off"
                          placeholder="Enter Password"
                          value={this.state.name}
                          onChange={(e) => this.handleChange(e)}
                          minLength="8"
                          maxLength={40}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-12 mt-3"
                    style={{ textAlign: "center" }}
                  >
                    <button
                      className="btn btn-success mt-2"
                      style={{ padding: "12px 20px" }}
                      type="submit"
                      // onClick={() => {
                      //   this.updateUser();
                      // }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <Loader
              loaderShow={this.state.loaderShow}
              onHide={() => {}}
              loaderText={this.state.loaderText}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserWithFeatures;
