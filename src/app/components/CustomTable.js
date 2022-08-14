import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class CustomTable extends Component {
  render() {
    const columns = [
      {
        Header: "Nominee Name",
        accessor: "nomineeName",
      },
      {
        Header: "Date of Birth",
        accessor: "dateBirth",
      },
      {
        Header: "Relation with A/C Holder",
        accessor: "relationHolder",
      },
      {
        Header: "Share Percentage",
        accessor: "sharePercentage",
      },
      {
        Header: "Identification Number",
        accessor: "identificationNumber",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ];
    if (this.props.variants && this.props.variants.length > 0) {
      return (
        <div>
          <div>
            <ReactTable
              striped
              bordered
              data={this.props.variants}
              columns={columns}
              defaultPageSize={1}
              pageSizeOptions={[3, 5, 10, 50, 100]}
            />
          </div>
        </div>
      );
    } else {
      return [];
    }
  }
}

export default CustomTable;
