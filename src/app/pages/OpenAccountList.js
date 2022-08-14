import React, { Component } from "react";
import { Link } from "react-router-dom";
export class OpenAccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="row proBanner">
          <div className="col-12">
            <div className="card">
              <h4 className="card-title">Open Account List</h4>
              <div className="card-body">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="account_list">Deposit Product</label>
                    <select className="form-control" id="account_list">
                      <option>Select Account Type</option>
                      <option>Savings Bank Account</option>
                      <option>Current Deposit Account</option>
                      <option>Special Noticed Deposit Account</option>
                      <option>Fixed Deposit Account</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <Link to="/account-details">
                      {" "}
                      <button
                        className="btn btn-primary"
                        style={{ width: "35%" }}
                      >
                        Apply
                      </button>
                    </Link>
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
export default OpenAccountList;
