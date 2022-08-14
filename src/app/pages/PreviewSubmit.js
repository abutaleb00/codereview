import React, { Component } from "react";

export class PreviewSubmit extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: {
        firstName,
        lastName,
        fullName,
        fathersName,
        mothersName,
        dob,
        nationality,
        birthPlace,
        spouseName,
        identification,
        identityNumber,
        preferredProduct,
        preferredBranch,
        residentStatus,
        residentialStatus,
        occupation,
        maritalStatus,
        gender,
        mobileNumber,
        email,
        presentAddress,
        permanentAddress,
        nomineeName,
        accountRelation,
        sharePercentage,
        nomineeIdent,
        noIdentiyNo,
      },
    } = this.props;

    return (
      <div className="row proBanner">
        <div className="col-12">
          <div className="card">
            <h4 className="card-title">Nominee Information</h4>
            <div className="card-body">
              <div className="col-md-12">
                <div className="form-header">
                  <h3 className="box-title">Personal Info</h3>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlFor="firstname">
                      First Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{firstName}</p>
                  </div>
                </div>
                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlFor="lastName">
                      Last Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{lastName}</p>
                  </div>
                </div>
                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlFor="fullName">
                      Full Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{fullName}</p>
                  </div>
                </div>
                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlFor="exampletext">
                      Fathers Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{fathersName}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlFor="exampletext">
                      Mothers Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{mothersName}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlFor="exampletext">Spouse Name</label>
                    <p>{spouseName}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label>
                      Date of Birth <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{dob}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlFor="exampletext">
                      Nationality <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{nationality}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlFor="exampletext">BIRTH PLACE</label>
                    <p>{birthPlace}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label>
                      Identification of Applicant{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{identification}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlFor="exampletext">
                      Identity Number <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{identityNumber}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label>
                      Gender <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{gender}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label>
                      Preferred Product <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{preferredProduct}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label>Presently Resided City</label>
                    <p>presentlyResided</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label>Preferred Branch</label>
                    <p>{preferredBranch}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label>Resident Status</label>
                    <p>{residentStatus}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label>Residential Status</label>
                    <p>{residentialStatus}</p>
                  </div>
                </div>
                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label>Occupation </label>
                    <p>{occupation}</p>
                  </div>
                </div>
                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label>
                      Marital status <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{maritalStatus}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlFor="mobile">
                      Mobile Number <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{mobileNumber}</p>
                  </div>
                </div>
                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{email}</p>
                  </div>
                </div>
                <div className="col-md-6 d-inline-block">
                  <div className="form-group">
                    <label>
                      Present Address <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{presentAddress}</p>
                  </div>
                </div>
                <div className="col-md-6 d-inline-block">
                  <div className="form-group">
                    <label>
                      Permanent Address <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{permanentAddress}</p>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-header">
                    <h3 className="box-title">Transaction Profile</h3>
                  </div>
                  <div className="col-md-6 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="firstname">
                        Monthly Transection Amount{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <p>Up to 100,000BDT</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="exampletext">
                        Account Type <span style={{ color: "red" }}>*</span>
                      </label>
                      <p>Single</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="exampletext">
                        Initial Deposit <span style={{ color: "red" }}>*</span>
                      </label>
                      <p>4000</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-inline-block">
                    <div className="form-group" style={{ marginBottom: "5px" }}>
                      <label htmlFor="Additional">Additional Services</label>
                    </div>
                    <div className="form-check form-check-inline d-p">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        value="option1"
                        checked
                        readOnly
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
                        value="option2"
                        checked
                        readOnly
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
                        value="option2"
                        checked
                        readOnly
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
              </div>
              <div className="col-md-12">
                <div className="form-header">
                  <h3 className="box-title">Nominee Info</h3>
                </div>
                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlhtmlFor="nomineeName">
                      Nominee’s Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{nomineeName}</p>
                  </div>
                </div>
                {/* <div className="col-md-4">
                  <div className="form-group">
                    <label htmlhtmlFor="noDob">
                      Date of Birth <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{noDob}</p>
                  </div>
                </div> */}

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlhtmlFor="accountRelation">
                      Relation with Account Holder{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{accountRelation}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlhtmlFor="sharePercentage">
                      Share Percentage <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{sharePercentage}</p>
                  </div>
                </div>

                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlhtmlFor="nomineeIdent">
                      Identification of Nominee{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <p> {nomineeIdent}</p>
                  </div>
                </div>
                <div className="col-md-4 d-inline-block">
                  <div className="form-group">
                    <label htmlhtmlFor="noIdentiyNo">
                      Identity Number <span style={{ color: "red" }}>*</span>
                    </label>
                    <p>{noIdentiyNo}</p>
                  </div>
                </div>
              </div>
              <div
                className="col-md-12 mt-3 pb-3"
                style={{ textAlign: "center" }}
              >
                <button
                  className="btn btn-light"
                  onClick={this.back}
                  style={{ background: "#2b2a2a", marginRight: "5px" }}
                >
                  Back
                </button>
                <button
                  className="btn btn-light"
                  onClick={this.saveAndContinue}
                >
                  Confirm Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PreviewSubmit;
