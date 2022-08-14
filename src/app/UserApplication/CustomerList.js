import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { instance, baseURL } from "../service/ApiUrls";
import { IDENTITYLIST } from "../Enum";
import Loader from "../components/Loader";
import ReactTooltip from "react-tooltip";
import { confirmAlert } from "react-confirm-alert";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

let xx = [];
export class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      count: 1,
      total: -1,
      rowsPerPage: 10,
      value: IDENTITYLIST[0],
      loaderShow: false,
      loaderText: "Loading....",
      documentType: 3,
    };
  }

  onChangeHandler = (e) => {
    this.setState(
      { documentvalue: e.target.value, documentType: e.target.value },
      () => {
        //console.log(this.state.value.value);
        this.callApiToShowList({ documentType: this.state.documentvalue });
      }
    );
  };

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

  callApiToShowList = ({
    documentType = 3,
    first = 0,
    limit = this.state.rowsPerPage,
    filter = null,
  } = {}) => {
    let dataToSend = {
      documentType: documentType,
    };
    instance
      .post(baseURL + "/getcustomerlist", dataToSend, {
        params: {
          first: first,
          limit: limit,
          withPic: false,
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
        this.setState({ loaderShow: false });
      });
  };

  callDelete = ({ id = id, isDeleted = true } = {}) => {
    this.setState({ loaderShow: true }, () => {
      instance
        .post(baseURL + "/updatecustomerprofile", {
          id: id,
          isDeleted: isDeleted,
        })
        .then((res) => {
          if (res.data.result.error === false) {
            this.setState({ loaderShow: false }, () => {
              confirmAlert({
                title: "Success Message",
                message: <p className="mod-sp">Deleted User Successfully</p>,
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {
                      this.callApiToShowList();
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
      this.callApiToShowList();
    });
  }

  changePage = (page) => {
    this.setState({
      // isLoading: true
    });
    console.log(page);
    this.callApiToShowList({
      documentType: this.state.documentType,
      first: page,
      limit: this.state.rowsPerPage,
    });
  };

  render() {
    const { page } = this.state;
    const columns = [
      {
        name: "cp.name",
        label: "Customer Name",
        searchable: true,
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "cp.nameBn",
        label: "Customer Name(Bangla)",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "cp.nidDetail.nationalId10",
        label: "Nid 10 digit",
        options: {
          // display: this.state?.nidDetail?.nationalId10 ? "true" : "excluded",
          filter: true,
          sort: true,
        },
      },
      {
        name: "cp.nidDetail.nationalId17",
        label: "Nid 17 digit",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "cp.passportDetail.passportNumber",
        label:
          this.state.documentType != undefined &&
          this.state.documentType === "5"
            ? "Passport Number"
            : this.state.documentType != undefined &&
              this.state.documentType === "8"
            ? "Driving License"
            : this.state.documentType != undefined &&
              this.state.documentType === "6"
            ? "Birth Certificate"
            : this.state.documentType != undefined &&
              this.state.documentType === "10"
            ? "PAN / Aadhar Card No"
            : " ",
        options: {
          // customHeadRender: () => null,
          filter: true,
          sort: true,
        },
      },
      {
        name: "cp.customerT24Id",
        label: "Customer CBS ID",
        options: {
          filter: true,
          sort: true,
        },
      },
      // {
      //   name: "accountType",
      //   label: "Account Type",
      //   options: {
      //     filter: true,
      //     sort: false,
      //   },
      // },
      {
        name: "Report",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex) => {
            //console.log(xx[dataIndex]);
            // let dataToPass = this.state.content.find((obj) => {
            //   return xx[dataIndex].cp !== undefined && obj.cp !== undefined
            //     ? obj.cp.id === xx[dataIndex].cp.id
            //     : "";
            // });
            // console.log(dataToPass);
            let dataToPass = null;
            this.state.content.map((v) => {
              if (
                v.cp !== undefined &&
                v.cp !== null &&
                xx[dataIndex] !== undefined &&
                xx[dataIndex] !== null &&
                v.cp.id === xx[dataIndex]["cp.id"]
              ) {
                dataToPass = v;
              }
            });
            return (
              <div style={{ textAlign: "center" }}>
                <Link
                  to={{
                    pathname: "/cust-form",
                    state: {
                      fromCustomerList: true,
                      datToload: dataToPass,
                    },
                  }}
                >
                  {/* Generate Form */}
                  <i
                    className="mdi mdi-file-pdf"
                    style={{ fontSize: "18px" }}
                    data-tip
                    data-for="genForm"
                  ></i>
                  <ReactTooltip id="genForm" type="info">
                    <span>Generate Form</span>
                  </ReactTooltip>
                </Link>
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
            //console.log(xx[dataIndex]);
            // let dataToPass = this.state.content.find((obj) => {
            //   return xx[dataIndex].cp !== undefined && obj.cp !== undefined
            //     ? obj.cp.id === xx[dataIndex].cp.id
            //     : "";
            // });
            // console.log(dataToPass);
            let dataToPass = null;
            this.state.content.map((v) => {
              if (
                v.cp !== undefined &&
                v.cp !== null &&
                xx[dataIndex] !== undefined &&
                xx[dataIndex] !== null &&
                v.cp.id === xx[dataIndex]["cp.id"]
              ) {
                dataToPass = v;
              }
            });
            return (
              <>
                <div style={{ textAlign: "center" }}>
                  <Link
                    to={{
                      pathname: "/customer-view",
                      state: {
                        fromCustomerList: true,
                        datToload: dataToPass,
                      },
                    }}
                  >
                    <i
                      className="mdi mdi-eye"
                      style={{ fontSize: "18px" }}
                      data-tip
                      data-for="cusView"
                    ></i>
                    <ReactTooltip id="cusView" type="info">
                      <span>View</span>
                    </ReactTooltip>
                  </Link>
                  {dataToPass !== null &&
                  dataToPass.cp.customerT24Id !== null &&
                  dataToPass.cp.customerT24Id !== undefined ? (
                    ""
                  ) : (
                    <>
                      <i
                        className="mdi mdi-delete"
                        style={{
                          color: "red",
                          fontSize: "18px",
                          marginLeft: "2px",
                          cursor: "pointer",
                        }}
                        data-tip
                        data-for="deleteU"
                        onClick={() => {
                          this.callDelete({ id: dataToPass.cp.id });
                        }}
                      ></i>
                      <ReactTooltip id="deleteU" type="error">
                        <span>Delete</span>
                      </ReactTooltip>
                    </>
                  )}
                </div>
              </>
            );
          },
        },
      },
      {
        name: "Create Account",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex) => {
            //console.log(xx[dataIndex]);
            // let dataToPass = this.state.content.find((obj) => {
            //   return xx[dataIndex].cp !== undefined && obj.cp !== undefined
            //     ? obj.cp.id === xx[dataIndex].cp.id
            //     : "";
            // });
            // console.log(dataToPass);
            let dataToPass = null;
            this.state.content.map((v) => {
              if (
                v.cp !== undefined &&
                v.cp !== null &&
                xx[dataIndex] !== undefined &&
                xx[dataIndex] !== null &&
                v.cp.id === xx[dataIndex]["cp.id"]
              ) {
                dataToPass = v;
              }
              // console.log("api", dataToPass);
            });
            return (
              <div style={{ textAlign: "center" }}>
                <Link
                  to={{
                    pathname: "/new-application",
                    state: {
                      fromCustomerList: true,
                      datToload: dataToPass,
                      from: "customerlist",
                    },
                  }}
                >
                  {/* Create Account */}
                  <i
                    className="mdi mdi-note-plus"
                    style={{ fontSize: "18px" }}
                    data-tip
                    data-for="createAccount"
                  ></i>
                  <ReactTooltip id="createAccount" type="info">
                    <span>Create Account</span>
                  </ReactTooltip>
                </Link>
              </div>
            );
          },
        },
      },
    ];

    const options = {
      // filter: true,
      filterType: "checkbox",
      filter: false,
      download: false,
      print: false,
      rowsPerPage: this.state.rowsPerPage,
      rowsPerPageOptions: [1, 5, 10],
      selectableRows: "none",
      // pagination: {
      //   next: "Next Page",
      //   previous: "Previous Page",
      //   rowsPerPage: "Rows per page:",
      //   displayRows: "of",
      // },

      serverSide: true,
      onSearchChange: (searchText) => {
        console.log("search: " + searchText);
        this.callApiToShowList({
          filter: searchText,
          documentType: this.state.documentvalue,
        });
      },
      //count, // Use total number of items
      count: this.state.total, // Unknown number of items
      page,
      onTableChange: (action, tableState) => {
        console.log(action, tableState);

        switch (action) {
          case "changeRowsPerPage":
            this.callApiToShowList({
              limit: tableState.rowsPerPage,
              documentType: this.state.documentvalue,
            });
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
              <h4 className="card-title">Customer List</h4>

              <div className="card-body">
                <div className="row justify-content-md-center">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="documnet_type">
                        Select Document Type
                      </label>
                      <select
                        className="form-control"
                        id="documnet_type"
                        onChange={this.onChangeHandler}
                      >
                        {IDENTITYLIST.map((v, k) => {
                          return (
                            <option
                              key={v.name + "_" + k}
                              name={v.name}
                              value={v.value}
                            >
                              {v.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable
                        title={"Customer List"}
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
export default CustomerList;
