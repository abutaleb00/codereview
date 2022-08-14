import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import Loader from "../components/Loader";

let xx = [];
export class EmployeeList extends Component {
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

  componentDidMount() {
    // this.setState({ loaderShow: true }, () => {
    //   this.callgetLoggedinUser();
    // });
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
    // const { page } = this.state;
    const data = [
      {
        username: "abutaleb00",
        email: "taleb@commlinkinfotech.com",
        phoneNumber: "01925676655",
      },
    ];
    const columns = [
      {
        name: "username",
        label: "Usernme",
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
          sort: true,
        },
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
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
            return (
              <>
                <button className="cus-b btn-secondary">Edit</button>
                <button className="cus-b c-v">View</button>
                <button className="cus-b c-can">Delete</button>
              </>
            );
          },
        },
      },
    ];

    return (
      <div>
        <div className="row proBanner">
          <div className="col-12">
            <div className="card">
              <h4 className="card-title">Employee List</h4>

              <div className="card-body">
                <div className="row justify-content-md-center">
                  <div className="col-md-12">
                    <MUIDataTable
                      title={"Employee List"}
                      data={data}
                      columns={columns}
                    />
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
export default EmployeeList;
