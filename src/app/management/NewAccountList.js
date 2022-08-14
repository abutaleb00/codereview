import React, { Component } from "react";
import { baseURL, instance } from "../service/ApiUrls";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Loader from "../components/Loader";
let xx = [];

class NewAccountList extends Component {
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
  callAccountsApi = ({
    datediff,
    branchId,
    first = 0,
    limit = 10,
    filter = null,
  } = {}) => {
    this.setState({ loaderShow: true }, () => {
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
            // this.setState({
            //   showAccount: { ...res.data.data.content.account },
            //   content: res.data.data.content,
            //   // showAccount: res.data.data.total,
            // });
          }
        });
    });
  };
  componentDidMount() {
    instance
      .post(baseURL + "/getloggedinuser")
      .then((res) => {
        if (res.data.result.error === false) {
          //   localStorage.setItem("loggedIn", true);
          //   localStorage.setItem("username", res.data.data.username);
          //this.setState({ getlogged: { ...res.data.data } });
          this.callAccountsApi({
            datediff: 1,
            branchId: res.data.data.branchId,
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
  changePage = (page) => {
    this.setState({ page: page }, () => {
      this.callAccountsApi({ first: page, limit: this.state.perPage });
    });
  };
  render() {
    const { page } = this.state;
    const columns = [
      {
        name: "account.accountNumber",
        label: "Account Number",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "listCustomers.0.cp.name",
        label: "Account Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "listCustomers.0.cp.customerT24Id",
        label: "Customer Id",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "branch.name",
        label: "Branch Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      // {
      //   name: "Action",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     empty: true,
      //     customBodyRenderLite: (dataIndex) => {
      //       let dataToPass = null;
      //       this.state.content.map((v) => {
      //         if (
      //           v !== undefined &&
      //           v !== null &&
      //           xx[dataIndex] !== undefined &&
      //           xx[dataIndex] !== null &&
      //           v.id === xx[dataIndex].id
      //         ) {
      //           dataToPass = v;
      //         }
      //       });
      //       return (
      //         <>
      //           <div style={{ textAlign: "center" }}>
      //             <Link
      //               to={{
      //                 pathname: "/user",
      //                 state: {
      //                   datToload: dataToPass,
      //                   isView: true,
      //                 },
      //               }}
      //             >
      //               <i
      //                 className="mdi mdi-eye"
      //                 style={{ fontSize: "18px" }}
      //                 data-tip
      //                 data-for="cusView"
      //               ></i>
      //               <ReactTooltip id="cusView" type="info">
      //                 <span>View</span>
      //               </ReactTooltip>
      //             </Link>
      //             <Link
      //               to={{
      //                 pathname: "/user",
      //                 state: {
      //                   datToload: dataToPass,
      //                 },
      //               }}
      //             >
      //               <i
      //                 className="mdi mdi-pencil-box-outline"
      //                 style={{ fontSize: "18px" }}
      //                 data-tip
      //                 data-for="cusEdit"
      //               ></i>
      //               <ReactTooltip id="cusEdit" type="info">
      //                 <span>Edit User</span>
      //               </ReactTooltip>
      //             </Link>
      //             <i
      //               className="mdi mdi-delete"
      //               style={{
      //                 color: "red",
      //                 fontSize: "18px",
      //                 marginLeft: "2px",
      //                 cursor: "pointer",
      //               }}
      //               data-tip
      //               data-for="cusDelete"
      //               onClick={() => {
      //                 console.log(this.state.content[dataIndex]);
      //                 this.setState({
      //                   modalDelete: true,
      //                   e: this.state.content[dataIndex],
      //                 });
      //               }}
      //             ></i>
      //             <ReactTooltip id="cusDelete" type="error">
      //               <span>Delete</span>
      //             </ReactTooltip>
      //           </div>
      //         </>
      //       );
      //     },
      //   },
      // },
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
        this.callAccountsApi({ filter: searchText });
      },
      onTableChange: (action, tableState) => {
        console.log(action, tableState);

        switch (action) {
          case "changeRowsPerPage":
            this.setState({ perPage: tableState.rowsPerPage }, () => {
              this.callAccountsApi({ first: 0, limit: this.state.perPage });
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
            New Accunt List{" "}
          </h3>
        </div>
        <div className="row proBanner mt-3">
          <div className="col-12">
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable
                title={"New Accunt List"}
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

export default NewAccountList;
