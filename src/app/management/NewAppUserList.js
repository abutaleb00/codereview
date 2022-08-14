import React, { Component } from "react";
import { baseURL, instance } from "../service/ApiUrls";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Loader from "../components/Loader";
let xx = [];

class NewAppUserList extends Component {
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
  callAppUserList = ({
    datediff = 30,
    branchId = 9,
    first = 0,
    limit = 10,
    filter = null,
  } = {}) => {
    this.setState({ loaderShow: true }, () => {
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
          this.callAppUserList();
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
      this.callAppUserList({ first: page, limit: this.state.perPage });
    });
  };
  render() {
    const { page } = this.state;
    const columns = [
      {
        name: "username",
        label: "Username",
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
        },
      },
      {
        name: "mobile",
        label: "Mobile Number",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "lockStatus",
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
        this.callAppUserList({ filter: searchText });
      },
      onTableChange: (action, tableState) => {
        console.log(action, tableState);

        switch (action) {
          case "changeRowsPerPage":
            this.setState({ perPage: tableState.rowsPerPage }, () => {
              this.callAppUserList({
                first: 0,
                limit: this.state.perPage,
              });
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
            New Customer List{" "}
          </h3>
        </div>
        <div className="row proBanner mt-3">
          <div className="col-12">
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable
                title={"New App User List"}
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

export default NewAppUserList;
