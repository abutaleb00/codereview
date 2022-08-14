import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { instance, baseURL } from "../service/ApiUrls";
import Loader from "../components/Loader";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

let xx = [];
export class AtmList extends Component {
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

  callAtmList = ({
    first = 0,
    limit = this.state.rowsPerPage,
    filter = null,
  } = {}) => {
    instance
      .post(baseURL + "/getatms", null, {
        params: {
          first: first,
          limit: limit,
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
          console.log("state", this.state.converted);
        }
      })
      .catch((err) => {
        this.setState({ loaderShow: false });
      });
  };

  deleteAtm = ({ id = id, isDeleted = true } = {}, dataObject) => {
    this.setState({ loaderShow: true }, () => {
      console.log("Delete", this.state.datToload);
      instance
        .post(baseURL + "/addorupdateatm", {
          ...dataObject,
          id: id,
          isDeleted: isDeleted,
        })
        .then((res) => {
          if (res.data.result.error === false) {
            this.setState({ loaderShow: false, isEdit: false }, () => {
              confirmAlert({
                title: "Success Message",
                message: <p className="mod-sp">Deleted ATM Successfully</p>,
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {
                      this.callAtmList();
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
    this.setState({ loaderShow: true }, () => {
      this.callAtmList();
    });
  }

  changePage = (page) => {
    this.setState({
      // isLoading: true
    });
    console.log(page);
    this.callAtmList({
      first: page,
      limit: this.state.rowsPerPage,
    });
  };

  render() {
    const { page } = this.state;
    const columns = [
      {
        name: "name",
        label: "Branch Name",
        searchable: true,
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "branchCode",
        label: "Branch Code",
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
        name: "latitude",
        label: "Latitude",
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
        name: "longitude",
        label: "Longitude",
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
        name: "address",
        label: "Address",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => {
            return (
              <div style={{ width: "auto" }}>
                {value !== null && value !== undefined ? value : "N/A"}
              </div>
            );
          },
        },
      },
      {
        name: "Action",
        options: {
          filter: true,
          sort: true,
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
            return (
              <div style={{ textAlign: "center" }}>
                <Link
                  to={{
                    pathname: "/managementatm",
                    state: {
                      datToload: dataToPass,
                    },
                  }}
                >
                  <i
                    className="mdi mdi-pencil-box-outline"
                    style={{ fontSize: "18px" }}
                    data-tip
                    data-for="cusView"
                  ></i>
                  <ReactTooltip id="cusView" type="info">
                    <span>Edit</span>
                  </ReactTooltip>
                </Link>
                <i
                  className="mdi mdi-delete"
                  style={{
                    color: "red",
                    fontSize: "18px",
                    marginLeft: "2px",
                    cursor: "pointer",
                  }}
                  data-tip
                  data-for="cusDelete"
                  onClick={() => {
                    this.deleteAtm({ id: dataToPass.id }, dataToPass);
                  }}
                ></i>
                <ReactTooltip id="cusDelete" type="error">
                  <span>Delete</span>
                </ReactTooltip>
              </div>
            );
          },
        },
      },
    ];

    const options = {
      filterType: "checkbox",
      serverSide: true,
      rowsPerPage: this.state.rowsPerPage,
      rowsPerPageOptions: [1, 5, 10, 20],
      filter: false,
      selectableRows: "none",
      onSearchChange: (searchText) => {
        console.log("search: " + searchText);
        this.callAtmList({ filter: searchText });
      },
      count: this.state.total,
      page,

      onTableChange: (action, tableState) => {
        console.log(action, tableState);

        switch (action) {
          case "changeRowsPerPage":
            this.callAtmList({ limit: tableState.rowsPerPage });
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
              <h4 className="card-title">
                ATM List{" "}
                <Link
                  className="btn btn-success"
                  style={{ float: "right" }}
                  to={{
                    pathname: "/managementatm",
                    state: {
                      fromNew: true,
                      datToload: null,
                    },
                  }}
                >
                  + Add New
                </Link>
              </h4>

              <div className="card-body">
                <div className="row justify-content-md-start">
                  <div className="col-md-12">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable
                        title={"ATM List"}
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
export default AtmList;
