import React, { Component } from "react";
import { instance, baseURL } from "../service/ApiUrls";
import { confirmAlert } from "react-confirm-alert";
import CustomMultiSelect from "../components/CustomMultiSelect";
import Loader from "../components/Loader";
let xx = [];
class ViewUser extends Component {
  constructor(props) {
    super(props);
    let featureIds = [];
    this.props.location.state.datToload.webfeaturelist.map((v) => {
      featureIds.push(v.id);
    });
    this.state = {
      ...props.location.state.datToload,
      content: [],
      optionsss: [],
      featureIds: featureIds,
    };
  }

  handleChange = (e) => {
    console.log("Before", e.target.id);
    this.setState({ [e.target.id]: e.target.value });
    console.log("After", e.target.id);
  };
  dropChange = (e) => {
    console.log(e.target.value);
    this.setState({ ...this.state, [e.target.id]: e.target.value });
    console.log("After", e.target.id);
  };
  parentMultiFunc = (e) => {
    console.log("featureIds", e);
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
            //console.log("contentData", this.state.contentData);
            this.setState({ optionsss: optionsss });
            //console.log("UserId", this.state.optionsss);
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

  updateUser = () => {
    let dataTosend = {
      userId: this.state.id,
      featureId: this.state.featureIds,
      branchName: this.state.branchName,
    };
    this.setState({ loaderShow: true }, () => {
      instance
        .post(baseURL + "/insertfeaturelistwithuser", dataTosend)
        .then((res) => {
          if (res.data.result.error === false) {
            this.setState({ loaderShow: false }, () => {
              confirmAlert({
                title: "Success Message",
                message: <p className="mod-sp">Updated Successfully</p>,
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {
                      this.props.history.push("/users-list");
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
  };
  componentDidMount() {
    console.log("component did mount call");
    let featureIds = [];
    this.state.webfeaturelist.map((v) => {
      featureIds.push(v.id);
    });
    this.setState({ loaderShow: true, featureIds: featureIds }, () => {
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
                <div className="row justify-content-md-start">
                  <div className="col-md-6 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="userid">User ID</label>
                      <input
                        type="text"
                        className="form-control form-control"
                        id="userid"
                        autoComplete="off"
                        name="userid"
                        placeholder="Enter User ID"
                        value={this.state.username}
                        onChange={(e) => this.handleChange(e)}
                        disabled
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
                        autoComplete="off"
                        placeholder="Enter Email Address"
                        value={this.state.email}
                        onChange={(e) => this.handleChange(e)}
                        disabled
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
                        placeholder="Enter Full Name"
                        value={this.state.fullName}
                        onChange={(e) => this.handleChange(e)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="">Phone Number</label>
                      <input
                        type="text"
                        className="form-control form-control"
                        id="phoneNo"
                        autoComplete="off"
                        name="phoneNo"
                        placeholder="Enter Phone Number"
                        value={this.state.phoneNo}
                        onChange={(e) => this.handleChange(e)}
                        disabled
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
                        value={this.state.branchName}
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
                      <label htmlFor="featureIds">Features</label>
                      <CustomMultiSelect
                        options={this.state.optionsss}
                        // value={
                        //   this.state.webfeaturelist[this.state.featureIds].id
                        // }
                        parentCall={this.parentMultiFunc}
                        feature={this.state.featureIds}
                        // selected={this.state.webfeaturelist.id}
                        disabled={this.props.location.state.isView}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={
                    this.props.location.state.isView === true
                      ? "d-none"
                      : "col-md-12 mt-3"
                  }
                  style={{ textAlign: "center" }}
                >
                  <button
                    className="btn btn-success mt-2"
                    style={{ padding: "12px 20px" }}
                    onClick={() => {
                      this.updateUser();
                    }}
                  >
                    Update
                  </button>
                </div>
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

export default ViewUser;
