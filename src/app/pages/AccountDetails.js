import React, { Component } from "react";
import axios from "axios";
import { accountnew } from "../service/ApiUrls";
export class AccountDetails extends Component {
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
              <h4 className="card-title">Savings Account (Individual)</h4>
              <div className="card-body">
                <div className="col-md-12">
                  <p>
                    A savings account is a basic type of bank account that
                    allows to deposit money, keep it safe, and withdraw funds,
                    all while earning interest.
                  </p>
                  <p>
                    <b>Rate of Interest:</b>3.50%
                  </p>
                  <p>
                    Account under Green Banking and CSR 1 % above of Savings
                    rate.
                  </p>
                  <p>
                    <b>Features:</b> Cheque-book, ATM Service, Real time Online
                    Banking facility.
                  </p>
                  <p
                    style={{ fontWeight: "bold", textDecoration: "underline" }}
                  >
                    Savings Account may be opened in the name of
                  </p>
                  <ul>
                    <li>Individual (Single).</li>
                    <li>Two or more individuals (joint)</li>
                    <li>Minor jointly with Natural / Legal Guardian.</li>
                  </ul>
                  <p>
                    Clubs / Societies / Associations or Similar Institutions /
                    non-profit organizations.
                  </p>
                  <p
                    style={{ fontWeight: "bold", textDecoration: "underline" }}
                  >
                    Required Documents
                  </p>
                  <ul>
                    <li>
                      Name of applicant(s) together with name(s) of parents and
                      spouse(s).
                    </li>
                    <li>Present and Permanent Address.</li>
                    <li>Date of Birth.</li>
                    <li>Nationality.</li>
                    <li>TIN (if any).</li>
                  </ul>
                  <p>
                    Duly attested photocopy of valid Passport / Employer’s
                    Certificate / ID Card / Driving License /National ID Card or
                    Certificate about credentials by the local Ward Commissioner
                    / Chairman of Union Parishad.
                  </p>
                  <p>
                    Two copies of recent passport size Photographs of account
                    holder duly attested by the Introducer. One copy of Passport
                    Size Photograph of Nominee duly attested by the Account
                    Holder.
                  </p>
                </div>
                <div className="col-md-12 mt-3" style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      axios.defaults.withCredentials = true;
                      axios.post(accountnew, { productId: 1 }).then((res) => {
                        if (res.data.isError === false) {
                          this.props.history.push({
                            pathname: "/tp-profile",
                            state: { applicationData: res.data.returnObject },
                          });
                        }
                      });
                    }}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AccountDetails;
