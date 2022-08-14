import React, { Component } from "react";
import { instance, additionalaccountinfo } from "../service/ApiUrls";
export class TpProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationId: props.history.location.state.applicationData.applicationId,
      accountType: 0,
      monthlyIncome: "100000",
      initialAmount: "100000",
      initialAmountWords: "One lac only",
      checkBook: false,
      smsAlert: false,
      debitCard: false,
    };
  }

  render() {
    return (
      <div>
        <div className="row proBanner">
          <div className="col-12">
            <div className="card">
              <h4 className="card-title">Savings Account (Individual)</h4>
              <div className="card-body">
                <div className="col-12">
                  <div className="col-md-6 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="Transection">
                        Monthly Transection Amount
                      </label>
                      <select
                        className="form-control"
                        id="Transection"
                        onChange={(event) => {
                          this.setState({ monthlyIncome: event.target.value });
                        }}
                      >
                        <option value="100000">Up to 100,000BDT</option>
                        <option value="200000">Above 100,000 BDT</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6  d-inline-block">
                    <div className="form-group">
                      <label htmlFor="Account">Account Type</label>
                      <select
                        className="form-control"
                        id="Account"
                        onChange={(event) => {
                          this.setState({
                            accountType: Number(event.target.value),
                          });
                        }}
                      >
                        <option value="0">Single</option>
                        <option value="1">Joint</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="nidno">Initial Deposit: </label>
                  </div>
                  <div className="col-md-6  d-inline-block">
                    <div className="form-group">
                      <label htmlFor="nidno">Amount</label>
                      <input
                        type="number"
                        maxLength={40}
                        className="form-control"
                        id="initialAmount"
                        autoComplete="off"
                        placeholder="Enter Amount"
                        onChange={(e) => {
                          this.setState({ initialAmount: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6  d-inline-block">
                    <div className="form-group">
                      <label htmlFor="nidno">In Word</label>
                      <input
                        type="text"
                        maxLength={40}
                        className="form-control"
                        id="initialAmountInWords"
                        placeholder="Enter In Word"
                        autoComplete="off"
                        onChange={(e) => {
                          this.setState({ initialAmountWords: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6  d-inline-block">
                    <div className="form-group">
                      <label htmlFor="Preferred">Preferred branch</label>
                      <select className="form-control" id="Preferred">
                        <option>Branch A</option>
                        <option>Branch B</option>
                        <option>Branch C</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 d-inline-block">
                    <div
                      className="form-group"
                      style={{ marginTop: "5px", marginBottom: "0px" }}
                    >
                      <label htmlFor="Additional">Additional Services</label>
                    </div>
                    <div className="form-check form-check-inline d-p">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        value={this.state.checkBook}
                        onChange={(e) => {
                          this.setState({ checkBook: e.target.checked });
                        }}
                      />

                      <label
                        className="form-check-label p-l"
                        htmlFor="inlineCheckbox1"
                      >
                        Check Book
                      </label>
                    </div>
                    <div className="form-check form-check-inline d-p">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox2"
                        value={this.state.smsAlert}
                        onChange={(e) => {
                          this.setState({ smsAlert: e.target.checked });
                        }}
                      />
                      <label
                        className="form-check-label p-l"
                        htmlFor="inlineCheckbox2"
                      >
                        SMS Alert
                      </label>
                    </div>
                    <div className="form-check form-check-inline d-p">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox2"
                        value={this.state.debitCard}
                        onChange={(e) => {
                          this.setState({ debitCard: e.target.checked });
                        }}
                      />
                      <label
                        className="form-check-label p-l"
                        htmlFor="inlineCheckbox2"
                      >
                        Debit Card
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-3" style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      let datatoSend = {
                        applicationId: this.state.applicationId,
                        accountType: this.state.accountType,
                        monthlyIncome: this.state.monthlyIncome,
                        initialAmount: this.state.initialAmount,
                        initialAmountWords: this.state.initialAmountWords,
                        checkBook: this.state.checkBook,
                        smsAlert: this.state.smsAlert,
                        debitCard: this.state.debitCard,
                      };
                      instance
                        .post(additionalaccountinfo, datatoSend)
                        .then((res) => {
                          if (res.data.isError === false) {
                            localStorage.setItem(
                              "applicationId",
                              this.state.applicationId
                            );
                            this.props.history.push({
                              pathname: "/nid-upload",
                            });
                          }
                        });
                    }}
                  >
                    Submit
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
export default TpProfile;
