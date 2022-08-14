import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { instance, baseURL } from "../service/ApiUrls";
import Loader from "../components/Loader";
import ReactTooltip from "react-tooltip";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { confirmAlert } from "react-confirm-alert";
const FileDownload = require("js-file-download");

let xx = [];
export class AccountList extends Component {
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
          root: { color: "#000 !important", fontWeight: "bold !important" },
          data: {
            color: "#000 !important",
            fontWeight: "bold !important",
          },
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

  apiTocallAccounts = ({
    branchName = this.state.branchName,
    first = 0,
    limit = this.state.rowsPerPage,
    filter = null,
  } = {}) => {
    instance
      .post(baseURL + "/getAllAccountsbybranchName", null, {
        params: {
          first: first,
          limit: limit,
          branchName: branchName,
          withPic: false,
          filter: filter,
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

  apiforReport = () => {
    instance
      .post(baseURL + "/post-report", this.state.content, {
        responseType: "blob",
      })
      .then((res) => {
        FileDownload(res.data, "report.pdf");
      });
  };

  apiforReportExcel = () => {
    instance
      .post(baseURL + "/post-report-excel", this.state.content, {
        responseType: "blob",
      })
      .then((res) => {
        FileDownload(res.data, "report.xlsx");
      });
  };

  callgetLoggedinUser = () => {
    instance
      .post(baseURL + "/getloggedinuser")
      .then((res) => {
        if (res.data.result.error === false) {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("username", res.data.data.username);
          this.setState({ ...res.data.data }, () => {
            this.apiTocallAccounts();
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
  };

  componentDidMount() {
    this.setState({ loaderShow: true }, () => {
      this.callgetLoggedinUser();
    });
  }

  changePage = (page) => {
    this.setState({
      // isLoading: true
    });
    console.log(page);
    this.apiTocallAccounts({
      first: page,
      limit: this.state.rowsPerPage,
    });
  };

  render() {
    const { page } = this.state;
    const columns = [
      {
        name: "product.name",
        label: "Product",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "branch.name",
        label: "Branch",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "account.accountNumber",
        label: "Account Number",
        options: {
          filter: true,
          sort: true,
          // customBodyRenderLite: (dataIndex) => {
          //   console.log(xx[dataIndex]);
          //   return (
          //     <>
          //       {xx[dataIndex]["account.accountType"] === false
          //         ? "Single"
          //         : "Joint"}
          //     </>
          //   );
          // },
        },
      },
      {
        name: "account.accountType",
        label: "Account Type",
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex) => {
            console.log(xx[dataIndex]);
            return (
              <>
                {xx[dataIndex] !== undefined &&
                xx[dataIndex] !== null &&
                xx[dataIndex]["account.accountType"] === false
                  ? "Single"
                  : "Joint"}
              </>
            );
          },
        },
      },
      {
        name: "listCustomers.0.cp.name",
        label: "Account Owner",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Action",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex) => {
            console.log(xx[dataIndex]);
            // let dataToPass = this.state.content.find((obj) => {
            //   return xx[dataIndex].cp !== undefined && obj.cp !== undefined
            //     ? obj.cp.id === xx[dataIndex].cp.id
            //     : "";
            // });
            // console.log(dataToPass);
            let dataToPass = null;
            this.state.content.map((v) => {
              if (
                v !== undefined &&
                v !== null &&
                xx[dataIndex] !== undefined &&
                xx[dataIndex] !== null &&
                v.account.id === xx[dataIndex]["account.id"]
              ) {
                dataToPass = v;
              }
            });
            return (
              <Link
                to={{
                  pathname: "/account-view",
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
            );
          },
        },
      },
      {
        name: "Report PDF",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex) => {
            console.log(xx[dataIndex]);
            // let dataToPass = this.state.content.find((obj) => {
            //   return xx[dataIndex].cp !== undefined && obj.cp !== undefined
            //     ? obj.cp.id === xx[dataIndex].cp.id
            //     : "";
            // });
            // console.log(dataToPass);
            let dataToPass = null;
            this.state.content.map((v) => {
              if (
                v !== undefined &&
                v !== null &&
                xx[dataIndex] !== undefined &&
                xx[dataIndex] !== null &&
                v.account.id === xx[dataIndex]["account.id"]
              ) {
                dataToPass = v;
              }
            });
            return (
              <Link
                to={{
                  pathname: "/sbiaccountform",
                  state: {
                    fromCustomerList: true,
                    datToload: dataToPass,
                  },
                }}
                onClick={() => {
                  this.setState({ loaderShow: true });
                }}
              >
                <i
                  className="mdi mdi-file-pdf"
                  style={{ fontSize: "18px" }}
                  data-tip
                  data-for="cReport"
                ></i>
                <ReactTooltip id="cReport" type="info">
                  <span>Report</span>
                </ReactTooltip>
              </Link>
            );
          },
        },
      },
    ];

    const options = {
      filterType: "checkbox",
      selectableRows: "none",
      // filter: true,
      filter: false,
      download: false,
      print: false,
      rowsPerPage: this.state.rowsPerPage,
      rowsPerPageOptions: [1, 5, 10],

      // pagination: {
      //   next: "Next Page",
      //   previous: "Previous Page",
      //   rowsPerPage: "Rows per page:",
      //   displayRows: "of",
      // },

      serverSide: true,
      onSearchChange: (searchText) => {
        console.log("search: " + searchText);
        this.apiTocallAccounts({ filter: searchText });
      },

      //count, // Use total number of items
      count: this.state.total, // Unknown number of items
      page,
      onTableChange: (action, tableState) => {
        console.log(action, tableState);

        switch (action) {
          case "changeRowsPerPage":
            this.apiTocallAccounts({ limit: tableState.rowsPerPage });
            break;
        }

        if (action === "changePage") {
          console.log("Go to page", tableState.page);
          this.changePage(tableState.page);
        }
      },
      // downloadOptions: {
      //   filename: "excel-format.csv",
      //   separator: ";",
      //   filterOptions: {
      //     useDisplayedColumnsOnly: true,
      //     useDisplayedRowsOnly: true,
      //   },
      // },
      onDownload: (buildHead, buildBody, columns, data) => {
        console.log("download", columns, data, this.state.content);
        this.apiforReportExcel();
        this.apiforReport();
        // this makes a REST call to the server and downloads the data
        //return "\uFEFF" + buildHead(columns) + buildBody(data);
        return false;
      },
    };
    return (
      <div>
        <div className="row proBanner">
          <div className="col-12">
            <div className="card">
              <h4 className="card-title">Account List</h4>

              <div className="card-body">
                <div className="row justify-content-md-center">
                  <div className="col-md-12">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable
                        title={"Account List"}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AccountList;
