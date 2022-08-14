import React, { Component } from "react";
import { baseURL, instance } from "../service/ApiUrls";
import { confirmAlert } from "react-confirm-alert";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Loader from "../components/Loader";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
let xx = [];

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ...props.location.state.datToload
      totalRecords: 0,
      loading: false,
      perPage: 10,
      page: 0,
      count: 1,
      loaderShow: false,
    };
  }

  handleChange = (e) => {
    console.log(e.dataId, e.data);
    this.setState({ [e.dataId]: e.data });
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

  callListofUsers = ({ first = 0, limit = 100, filter = null } = {}) => {
    instance
      .post(baseURL + "/webuserlist", null, {
        params: {
          first: first,
          limit: limit,
          filter: filter,
        },
      })
      .then((res) => {
        if (res.data.result.error === false) {
          this.setState(
            {
              content: res.data.data.content,
              ...res.data.data,
              rowsPerPage: limit,
              loaderShow: false,
            },
            () => {
              xx = [];
              this.state.content.map((v) => {
                xx.push(this.flattenObject(v));
              });
              this.setState({ converted: xx });
            }
          );
          console.log("Data", this.state.converted);
        }
        if (res.data.result.error === true) {
          this.setState(
            {
              loaderShow: false,
            },
            () => {
              confirmAlert({
                title: "Error Message",
                message: <p className="mod-p"> {res.data.result.errorMsg} </p>,
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {},
                  },
                ],
              });
            }
          );
        }
      })
      .catch((err) => {
        this.setState({ loaderShow: false });
      });
  };

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyRow: {
          root: {
            "&:nth-child(odd)": {
              backgroundColor: "#fafbfc",
            },
          },
        },
        MUIDataTableHeadCell: {
          root: {
            color: "#000 !important",
            fontWeight: "bold !important",
            textAlign: "center",
          },
          data: {
            color: "#000 !important",
            fontWeight: "bold !important",
          },
          contentWrapper: { display: "block !important" },
          sortAction: {
            "& path": {
              color: "teal ",
            },
          },
          sortActive: {
            color: "",
          },
        },
        MuiTableCell: {
          body: { textAlign: "center" },
          root: {
            borderColor: "#d3d3d3",
            border: [[1, "solid", "#c0c0c0"]],
            padding: "14px !important",
          },
        },
      },
    });

  componentDidMount() {
    this.setState({ loaderShow: true }, () => {
      this.callListofUsers();
    });
  }
  changePage = (page) => {
    this.setState({ page: page }, () => {
      this.callListofUsers({ first: page, limit: this.state.perPage });
    });
  };
  render() {
    const { page } = this.state;
    const columns = [
      {
        name: "fullName",
        label: "Full Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "username",
        label: "User ID",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "branchName",
        label: "Branch Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "phoneNo",
        label: "Phone Number",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "email",
        label: "Email",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "roleName",
        label: "Role Name",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value) => {
            return (
              <div>
                {value === "Checker Admin" ? (
                  <span className="badge badge-success">Checker Admin</span>
                ) : value === "Maker" ? (
                  <span className="badge badge-primary">Maker</span>
                ) : value === "Checker" ? (
                  <span className="badge badge-success">Checker</span>
                ) : value === "Maker Admin" ? (
                  <span className="badge badge-primary">Maker Admin</span>
                ) : (
                  <span className="badge badge-dark">Admin</span>
                )}
              </div>
            );
          },
        },
      },
      {
        name: "Action",
        options: {
          filter: false,
          sort: false,
          empty: true,
          width: 200,
          customBodyRenderLite: (dataIndex) => {
            let dataToPass = null;
            this.state.content.map((v) => {
              if (
                v !== undefined &&
                v !== null &&
                xx[dataIndex] !== undefined &&
                xx[dataIndex] !== null &&
                v.id === xx[dataIndex].id
              ) {
                dataToPass = v;
              }
            });
            console.log("In custom render body ", dataToPass);
            return (
              <>
                <div style={{ textAlign: "center", width: "100px" }}>
                  <Link
                    to={{
                      pathname: "/user",
                      state: {
                        datToload: dataToPass,
                        isView: true,
                      },
                    }}
                  >
                    <i
                      className="mdi mdi-eye"
                      style={{ fontSize: "18px", marginRight: "5px" }}
                      data-tip
                      data-for="cusView"
                    ></i>
                    <ReactTooltip id="cusView" type="info">
                      <span>View</span>
                    </ReactTooltip>
                  </Link>
                  <Link
                    to={{
                      pathname: "/user",
                      state: {
                        datToload: dataToPass,
                        isView: false,
                      },
                    }}
                  >
                    <i
                      className="mdi mdi-pencil-box-outline"
                      style={{ fontSize: "18px", marginRight: "5px" }}
                      data-tip
                      data-for="cusEdit"
                    ></i>
                    <ReactTooltip id="cusEdit" type="info">
                      <span>Edit User</span>
                    </ReactTooltip>
                  </Link>
                  {/* <i
                    className="mdi mdi-key-variant"
                    style={{
                      fontSize: "18px",
                      cursor: "pointer",
                      color: "#007BFF",
                    }}
                    data-tip
                    data-for="resetP"
                    onClick={() => {
                      this.setState({ loaderShow: true }, () => {
                        let userMobile = dataToPass.phoneNo;
                        let userEmail = dataToPass.email;
                        instance
                          .post(baseURL + "/resetpasswordinitiate", {
                            userMobile: userMobile,
                            userEmail: userEmail,
                          })
                          .then((res) => {
                            if (res.data.result.error === false) {
                              this.setState(
                                {
                                  loaderShow: false,
                                },
                                () => {
                                  confirmAlert({
                                    title: "Success Message",
                                    message: (
                                      <p className="mod-sp">
                                        Reset Password Request Sent Successfully
                                      </p>
                                    ),
                                    buttons: [
                                      {
                                        label: "Ok",
                                        onClick: () => {
                                          this.props.history.push(
                                            "/users-list"
                                          );
                                        },
                                      },
                                    ],
                                  });
                                }
                              );
                            }
                            if (res.data.result.error === true) {
                              this.setState({ loaderShow: false }, () => {
                                confirmAlert({
                                  title: "Error Message",
                                  message: (
                                    <p className="mod-p">
                                      {res.data.result.errorMsg}
                                    </p>
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
                            }
                          })
                          .catch((err) => {
                            this.setState({ loaderShow: false });
                          });
                      });
                    }}
                  >
                    <ReactTooltip id="resetP" type="info">
                      <span>Reset Password</span>
                    </ReactTooltip>
                  </i> */}
                </div>
              </>
            );
          },
        },
      },
    ];

    const options = {
      filterType: "checkbox",
      filter: false,
      download: false,
      print: false,
      selectableRows: "none",
      rowsPerPage: this.state.perPage,
      rowsPerPageOptions: [5, 10, 15, 20],
      serverSide: true,
      //count, // Use total number of items
      count: this.state.totalRecords, // Unknown number of items
      page,
      onSearchChange: (searchText) => {
        console.log("search: " + searchText);
        this.callListofUsers({ filter: searchText });
      },
      onTableChange: (action, tableState) => {
        console.log(action, tableState);

        switch (action) {
          case "changeRowsPerPage":
            this.setState({ perPage: tableState.rowsPerPage }, () => {
              this.callListofUsers({ first: 0, limit: this.state.perPage });
            });
            break;
          case "changePage":
            this.changePage(tableState.page);
            break;
          case "filterChange":
            console.log("filter change", tableState);
            break;
        }
      },
    };
    return (
      <div>
        <div className="page-header mt-2">
          <h3 className="page-title" style={{ width: "100%" }}>
            Users List{" "}
            <button
              className="btn btn-secondary"
              style={{ float: "right" }}
              onClick={() => {
                this.props.history.push({
                  pathname: "/new-user",
                });
              }}
            >
              <i className="mdi mdi-plus"></i> Add New User
            </button>
          </h3>
        </div>
        <div className="row proBanner mt-3">
          <div className="col-12">
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable
                title={"User List"}
                data={this.state.converted}
                columns={columns}
                options={options}
              />
            </MuiThemeProvider>
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

export default UsersList;
