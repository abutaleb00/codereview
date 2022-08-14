import React, { Component } from "react";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

class SuccessfulFailed extends Component {
  constructor() {
    super();
    this.state = {
      formDate: new Date(),
      toDate: new Date(),
    };
  }
  render() {
    const data = [
      {
        id: 1,
        slno: "1",
        date: "20.05.21",
        application_id: "1254825",
        customer_name: "Asruf-Ul-Jubair",
        product_type: "Current",
        nid: "1985123489",
        occupation: "Service",
        initial_deposit: "2000",
        ac_number: "012-12548-54876",
        ekyc_status: <span className="text-success">Successful</span>,
        ekyc_type: "Regular",
        onboarding_type: "Self",
        view: <Link>View</Link>,
      },
      {
        id: 2,
        slno: "2",
        date: "18.05.21",
        application_id: "1254455",
        customer_name: "Moin Mostakin",
        product_type: "Saving",
        nid: "19456723489",
        occupation: "Business",
        initial_deposit: "5000",
        ac_number: "012-12548-54674",
        ekyc_status: <span className="text-success">Successful</span>,
        ekyc_type: "Simplified",
        onboarding_type: "Assisted",
        view: <Link>View</Link>,
      },
      {
        id: 3,
        slno: "3",
        date: "16.05.21",
        application_id: "1254345",
        customer_name: "Mohammad Abu Taleb",
        product_type: "Current",
        nid: "1995123345",
        occupation: "Service",
        initial_deposit: "3000",
        ac_number: "012-12548-54123",
        ekyc_status: <span className="text-danger">Failed</span>,
        ekyc_type: "Regular",
        onboarding_type: "Self",
        view: <Link>View</Link>,
      },
      {
        id: 4,
        slno: "4",
        date: "19.05.21",
        application_id: "1254423",
        customer_name: "Abdul Aziz",
        product_type: "Saving",
        nid: "1985123489",
        occupation: "Service",
        initial_deposit: "2500",
        ac_number: "012-12458-5566",
        ekyc_status: <span className="text-success">Successful</span>,
        ekyc_type: "Simplified",
        onboarding_type: "Assisted",
        view: <Link>View</Link>,
      },
    ];
    const columns = [
      {
        name: "Sl. NO",
        selector: "slno",
        sortable: true,
      },
      {
        name: "Date",
        selector: "date",
        sortable: true,
        right: true,
      },
      {
        name: "Application ID",
        selector: "application_id",
        sortable: true,
        right: true,
      },
      {
        name: "Customer Name",
        selector: "customer_name",
        sortable: true,
        right: true,
      },
      {
        name: "Product Type",
        selector: "product_type",
        sortable: true,
        right: true,
      },
      {
        name: "NID",
        selector: "nid",
        sortable: true,
        right: true,
      },
      {
        name: "Occupation",
        selector: "occupation",
        sortable: true,
        right: true,
      },
      {
        name: "Initial Deposit",
        selector: "initial_deposit",
        sortable: true,
        right: true,
      },
      {
        name: "A/C Number",
        selector: "ac_number",
        sortable: true,
        right: true,
      },
      {
        name: "eKYC Status",
        selector: "ekyc_status",
        sortable: true,
        right: true,
      },
      {
        name: "eKYC Type",
        selector: "ekyc_type",
        sortable: true,
        right: true,
      },
      {
        name: "Onboarding Type",
        selector: "onboarding_type",
        sortable: true,
        right: true,
      },
      {
        name: "Action",
        selector: "view",
        sortable: false,
      },
    ];
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> eKYC Report</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Reports
                </a>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  eKYC Report
                </a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="col-md-3 d-inline-block">
              <div className="form-group">
                <label htmlFor="identityType">eKYC Status</label>

                <select
                  className="form-control"
                  // onChange={this.props.handleChange("identityType")}
                  // defaultValue={values.identityType}
                >
                  <option value="All">All eKYC</option>
                  <option value="Successful">Successful eKYC</option>
                  <option value="Failled">Failled eKYC</option>
                </select>
              </div>
            </div>
            <div className="col-md-3  d-inline-block">
              <div className="form-group">
                <label htmlFor="formDate">From Date</label>
                <div className="input-group date">
                  <DatePicker
                    className="form-control"
                    selected={this.state.formDate}
                    onChange={this.handleChange}
                    value={this.state.formDate}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3  d-inline-block">
              <div className="form-group">
                <label htmlFor="dob">To Date</label>
                <div className="input-group date">
                  <DatePicker
                    className="form-control"
                    selected={this.state.toDate}
                    onChange={this.handleChange}
                    value={this.state.toDate}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3  d-inline-block">
              <div className="form-group">
                <button
                  className="btn btn-dark mr-1"
                  style={{ padding: "10px" }}
                >
                  Export
                </button>
                <button
                  className="btn btn-success"
                  style={{ padding: "10px 15px" }}
                >
                  Print
                </button>
              </div>
            </div>
            <DataTable
              title="All eKYC Reports"
              columns={columns}
              data={data}
              striped={true}
              persistTableHead={true}
              pagination={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SuccessfulFailed;
