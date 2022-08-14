import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { instance, baseURL } from "../service/ApiUrls";
import Loader from "../components/Loader";
import { confirmAlert } from "react-confirm-alert";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import ReactTooltip from "react-tooltip";

let xx = [];
export class AppUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderShow: false,
      loaderText: "Loading....",
      page: 0,
      count: 1,
      total: -1,
      rowsPerPage: 10,
    };
  }
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyRow: {
          root: {
            "&:nth-child(odd)": {
              backgroundColor: "#FFFCBC",
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
          },
        },
      },
    });

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

  callgetAppUser = ({
    first = 0,
    limit = this.state.rowsPerPage,
    filter = null,
  } = {}) => {
    instance
      .get(baseURL + "/appuserlist", {
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
      })
      .catch((err) => {
        this.setState({ loaderShow: false });
      });
  };
  userStatusUpdate = ({
    userId = this.state.statusCheck.id,
    lockStatus = false,
  } = {}) => {
    this.setState({ loaderShow: true }, () => {
      console.log("Data to send", this.state.statusCheck.id);
      instance
        .put(baseURL + "/updatelockstatus", {
          userId: userId,
          lockStatus: lockStatus,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.result.error === false) {
            this.setState({ loaderShow: false }, () => {
              confirmAlert({
                title: "Success Message",
                message: (
                  <p className="mod-sp">
                    {lockStatus === true ? "Inactive " : "Active "} User
                    Successfully
                  </p>
                ),
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {
                      this.callgetAppUser();
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
        });
    });
  };
  componentDidMount() {
    this.setState({ loaderShow: true }, () => {
      this.callgetAppUser();
    });
  }

  changePage = (page) => {
    this.setState({
      // isLoading: true
    });
    console.log(page);
    this.callgetAppUser({
      first: page,
      limit: this.state.rowsPerPage,
    });
  };

  render() {
    const { page } = this.state;
    const columns = [
      {
        name: "fullName",
        label: "Name",
        searchable: true,
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "cbsCustId",
        label: "CBS ID",
        searchable: true,
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "email",
        label: "Email Address",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => {
            return (
              <div>{value !== null && value !== undefined ? value : "N/A"}</div>
            );
          },
        },
      },
      {
        name: "phoneNo",
        label: "Mobile Number",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "locked",
        label: "Account Status",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => {
            return (
              <div>
                {value === false ? (
                  <span className="badge badge-success">Active</span>
                ) : (
                  <span className="badge badge-danger">Inactive</span>
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
          customBodyRenderLite: (dataIndex) => {
            let statusCheck = this.state.content.find((obj) => {
              return xx[dataIndex] !== undefined &&
                obj !== undefined &&
                xx[dataIndex].id !== undefined &&
                obj.id !== undefined
                ? obj.id === xx[dataIndex].id
                : "";
            });
            console.log("status", statusCheck);
            // this.setState({ statusCheck: statusCheck });

            return (
              <div style={{ textAlign: "center", width: "100px" }}>
                {statusCheck !== null &&
                statusCheck !== undefined &&
                statusCheck.locked === true ? (
                  <i
                    className="mdi mdi-key-variant"
                    style={{
                      fontSize: "18px",
                      cursor: "pointer",
                      color: "green",
                      marginRight: "5px",
                    }}
                    data-tip
                    data-for="resetI"
                    onClick={() => {
                      this.setState({ statusCheck: statusCheck }, () => {
                        this.userStatusUpdate({ lockStatus: false });
                      });
                    }}
                  >
                    <ReactTooltip id="resetI" type="info">
                      <span>Active User</span>
                    </ReactTooltip>
                  </i>
                ) : (
                  // <button
                  //   className="btn btn-outline-success"
                  //   onClick={() => {
                  //     this.setState({ statusCheck: statusCheck }, () => {
                  //       this.userStatusUpdate({ lockStatus: false });
                  //     });
                  //   }}
                  // >
                  //   Active User
                  // </button>
                  <i
                    className="mdi mdi-close-circle"
                    style={{
                      fontSize: "18px",
                      cursor: "pointer",
                      color: "red",
                      marginRight: "10px",
                    }}
                    data-tip
                    data-for="resetI"
                    onClick={() => {
                      this.setState({ statusCheck: statusCheck }, () => {
                        this.userStatusUpdate({ lockStatus: true });
                      });
                    }}
                  >
                    <ReactTooltip id="resetI" type="info">
                      <span>Inactive User</span>
                    </ReactTooltip>
                  </i>
                  // <button
                  //   className="btn btn-outline-danger"
                  //   onClick={() => {
                  //     this.setState({ statusCheck: statusCheck }, () => {
                  //       this.userStatusUpdate({ lockStatus: true });
                  //     });
                  //   }}
                  // >
                  //   Inactive User
                  // </button>
                )}
                <i
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
                      let userMobile = statusCheck.phoneNo;
                      let userEmail = statusCheck.email;
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
                                          "/managementappuser-list"
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
                </i>
              </div>
            );
          },
        },
      },
    ];

    const options = {
      filterType: "checkbox",
      serverSide: true,
      filter: false,
      download: false,
      print: false,
      rowsPerPage: this.state.rowsPerPage,
      rowsPerPageOptions: [1, 5, 10],
      selectableRows: "none",
      onSearchChange: (searchText) => {
        console.log("search: " + searchText);
        this.callgetAppUser({ filter: searchText });
      },
      count: this.state.total, // Unknown number of items
      page,
      onTableChange: (action, tableState) => {
        console.log(action, tableState);

        switch (action) {
          case "changeRowsPerPage":
            this.callgetAppUser({ limit: tableState.rowsPerPage });
            break;
          case "changePage":
            this.changePage(tableState.page);
            break;
          case "filterChange":
            console.log("filter change", tableState);
            break;
        }

        if (action === "changePage") {
          console.log("Go to page", tableState.page);
          this.changePage(tableState.page);
        }
      },
    };
    return (
      <div>
        <div className="row proBanner">
          <div className="col-12">
            <div className="card">
              <h4 className="card-title">App User List</h4>

              <div className="card-body">
                <div className="row justify-content-md-center">
                  <div className="col-md-12">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable
                        title={"App User List"}
                        data={this.state.converted}
                        columns={columns}
                        options={options}
                      />
                    </MuiThemeProvider>
                  </div>
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
export default AppUserList;
