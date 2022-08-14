import React, { Component } from "react";

export class AdditionalQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption1: "yes",
      selectedOption2: "no",
      selectedOption3: "no",
      selectedOption4: "no",
      selectedOption5: "yes",
      selectedOption6: "yes",
    };
  }

  handleChange = (e) => {
    if (this.props.fromaccordian === true) {
      this.props.handle(e.target.id, e.target.value);
    }
  };
  onValueChange = (e, id) => {
    console.log("additional", id);
    switch (id) {
      case 1:
        this.setState({
          selectedOption1: e.target.value,
        });
        break;
      case 2:
        this.setState({
          selectedOption2: e.target.value,
        });
        break;
      case 3:
        this.setState({
          selectedOption3: e.target.value,
        });
        break;
      case 4:
        this.setState({
          selectedOption4: e.target.value,
        });
        break;
      case 5:
        this.setState({
          selectedOption5: e.target.value,
        });
        break;
      case 6:
        this.setState({
          selectedOption6: e.target.value,
        });
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div>
        <div className="row proBanner mt-3">
          <div className="col-12">
            <div className="card">
              {this.props.titleToShow !== undefined &&
              this.props.titleToShow === false ? (
                ""
              ) : (
                <h4 className="card-title">Additional Question</h4>
              )}
              <div className="card-body">
                <div className="row justify-content-md-start pl-2">
                  <div className="cus-p">
                    <b>1.</b> Has UNSCRs check done?{" "}
                    <div className="form-check-inline ml-2">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="unscr"
                          id="unscr"
                          className="form-check-input"
                          value={"yes"}
                          checked={this.state.selectedOption1 === "yes"}
                          onChange={(e) => this.onValueChange(e, 1)}
                        />
                        Yes
                      </label>
                    </div>
                    <div className="form-check-inline">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="unscr"
                          id="unscr"
                          className="form-check-input"
                          value={"no"}
                          checked={this.state.selectedOption1 === "no"}
                          onChange={(e) => this.onValueChange(e, 1)}
                        />
                        No
                      </label>
                    </div>
                  </div>
                  <div className="cus-p">
                    <b>2.</b> Has risk grading done?{" "}
                    <div className="form-check-inline ml-2">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="riskGrading"
                          className="form-check-input"
                          value="yes"
                          checked={this.state.selectedOption2 === "yes"}
                          onChange={(e) => this.onValueChange(e, 2)}
                        />
                        Yes
                      </label>
                    </div>
                    <div className="form-check-inline">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="riskGrading"
                          className="form-check-input"
                          value="no"
                          checked={this.state.selectedOption2 === "no"}
                          onChange={(e) => this.onValueChange(e, 2)}
                        />
                        No
                      </label>
                    </div>{" "}
                    (If assessed risk high then conduct EDD as per BFIU
                    circular.)
                  </div>
                  <div className="cus-p">
                    <b>3.</b> Is the customer is IPs/PEPs?{" "}
                    <div className="form-check-inline ml-2">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="ipsPep"
                          className="form-check-input"
                          value="yes"
                          checked={this.state.selectedOption3 === "yes"}
                          onChange={(e) => this.onValueChange(e, 3)}
                        />
                        Yes
                      </label>
                    </div>
                    <div className="form-check-inline">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="ipsPep"
                          className="form-check-input"
                          value="no"
                          checked={this.state.selectedOption3 === "no"}
                          onChange={(e) => this.onValueChange(e, 3)}
                        />
                        No
                      </label>
                    </div>{" "}
                    (If client is PEPs or IPs with higher risk, then conduct EDD
                    as per BFIU circular. )
                  </div>
                  <div className="cus-p">
                    <b>4.</b> Is there any adverse media news against the
                    customer?{" "}
                    <div className="form-check-inline ml-2">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="mediaNews"
                          className="form-check-input"
                          value="yes"
                          checked={this.state.selectedOption4 === "yes"}
                          onChange={(e) => this.onValueChange(e, 4)}
                        />
                        Yes
                      </label>
                    </div>
                    <div className="form-check-inline">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="mediaNews"
                          className="form-check-input"
                          value="no"
                          checked={this.state.selectedOption4 === "no"}
                          onChange={(e) => this.onValueChange(e, 4)}
                        />
                        No
                      </label>
                    </div>{" "}
                    (If any then conduct EDD. )
                  </div>
                  <div className="cus-p">
                    <b>5.</b> Has the source of fund verified/justified?{" "}
                    <div className="form-check-inline ml-2">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="sourceOfFundVerify"
                          className="form-check-input"
                          value="yes"
                          checked={this.state.selectedOption5 === "yes"}
                          onChange={(e) => this.onValueChange(e, 5)}
                        />
                        Yes
                      </label>
                    </div>
                    <div className="form-check-inline">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="sourceOfFundVerify"
                          className="form-check-input"
                          value="no"
                          checked={this.state.selectedOption5 === "no"}
                          onChange={(e) => this.onValueChange(e, 5)}
                        />
                        No
                      </label>
                    </div>
                  </div>
                  <div className="cus-p">
                    <b>6.</b> Has the beneficial ownership checked?{" "}
                    <div className="form-check-inline ml-2">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="ownershipChecked"
                          id="ownershipChecked"
                          className="form-check-input"
                          value="yes"
                          checked={this.state.selectedOption6 === "yes"}
                          onChange={(e) => this.onValueChange(e, 6)}
                        />
                        Yes
                      </label>
                    </div>
                    <div className="form-check-inline">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="ownershipChecked"
                          className="form-check-input"
                          value="no"
                          checked={this.state.selectedOption6 === "no"}
                          onChange={(e) => this.onValueChange(e, 6)}
                        />
                        No
                      </label>
                    </div>{" "}
                    (If there any beneficial owner found, then conduct CDD on
                    beneficial owner. If beneficial owner is PEPs, then conduct
                    EDD. )
                  </div>
                  {/* <p className="cus-p">
                    <b>7.</b> Are any other documents obtained{" "}
                    <div className="form-check-inline ml-2">
                      <input
                        type="text"
                        name="obtained"
                        id="obtained"
                        className="form-check-input"
                        placeholder="Enter here"
                        onChange={() => this.handleChange}
                      />
                    </div>
                  </p> */}
                  {/* <p className="cus-p">
                    <b>8.</b> Nominee details{" "}
                    <div className="form-check-inline ml-2">
                      <input
                        type="text"
                        name="nomineeDetails"
                        id="nomineeDetails"
                        className="form-check-input"
                        placeholder="Enter here"
                        onChange={() => this.handleChange}
                      />
                    </div>
                  </p> */}
                  {/* <p className="cus-p">
                    <b>8.</b> Has review of customer profile done (existing
                    customer)?{" "}
                    <div className="form-check-inline ml-2">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="prfileDone"
                          className="form-check-input"
                          value="yes"
                          //   checked={this.state.selectedOption === "yes"}
                          onChange={this.onValueChange}
                        />
                        Yes
                      </label>
                    </div>
                    <div className="form-check-inline">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="prfileDone"
                          className="form-check-input"
                          value="no"
                          //   checked={this.state.selectedOption === "no"}
                          onChange={this.onValueChange}
                        />
                        No
                      </label>
                    </div>
                    if so, date of review
                    <div className="form-check-inline ml-2">
                      <input
                        type="date"
                        name="nomineeDetails"
                        id="nomineeDetails"
                        className="form-check-input"
                        placeholder="Enter Date"
                        onChange={() => this.handleChange}
                      />
                    </div>
                  </p>
                  <p className="cus-p">
                    <b>9.</b> What is the average range and usual pattern of
                    customer transaction (over 6/12 months)?{" "}
                    <div className="form-check-inline ml-2">
                      <input
                        type="text"
                        name="averageRange"
                        id="averageRange"
                        className="form-check-input"
                        placeholder="Enter here"
                        onChange={() => this.handleChange}
                      />
                    </div>
                  </p> */}
                  {/* <p className="cus-p">
                    <b>11.</b> Any other relevant field may be add here{" "}
                    <div className="form-check-inline ml-2">
                      <input
                        type="text"
                        name="otherField"
                        id="otherField"
                        className="form-check-input"
                        placeholder="Enter here"
                        onChange={() => this.handleChange}
                      />
                    </div>
                    An efficient
                  </p> */}
                </div>
                {this.props.fromaccordian !== undefined &&
                this.props.fromaccordian === false ? (
                  <div
                    className="col-md-12 mt-3"
                    style={{ textAlign: "center" }}
                  >
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        console.log();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AdditionalQuestion;
