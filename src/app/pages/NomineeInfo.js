import React, { Component } from "react";
import { nomineeaddapi, instance } from "../service/ApiUrls";
export class NomineeInfo extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    let datatoSend = {
      applicationId: this.props.applicationId,
      name: this.props.name,
      fatherName: this.props.fatherName,
      motherName: this.props.motherName,
      dob: this.props.dob,
      occupation: this.props.occupation,
      identityType: this.props.identityType,
      identityNumber: this.props.identityNumber,
      presentAddress: this.props.presentAddress,
      permanentAddress: this.props.permanentAddress,
      sharePercent: this.props.sharePercent,
      relation: this.props.relation,
      spouseName: this.props.spouseName,
      minorNomineeDob: this.props.minorNomineeDob,
      documentReferenceNumber: this.props.documentReferenceNumber,
      minorNomineePresentAddress: this.props.minorNomineePresentAddress,
      minorReferenceName: this.props.minorReferenceName,
      minorNomineeIdentityNumber: this.props.minorNomineeIdentityNumber,
      minorNomineeIdentityType: this.props.minorNomineeIdentityType,
      minorNomineeRelation: this.props.minorNomineeRelation,
      minorNomineeName: this.props.minorNomineeName,
    };
    instance.post(nomineeaddapi, datatoSend).then((res) => {
      if (res.data.isError === false) {
        localStorage.setItem("applicationId", this.props.applicationId);
        this.props.nextStep();
      }
    });
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values } = this.props;
    return (
      <div className="row proBanner">
        <div className="col-12">
          <div className="card">
            <h4 className="card-title">Nominee Information</h4>
            <div className="card-body">
              <form>
                <div className="col-md-12">
                  <div className="col-md-6 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="name">Nominee’s Name</label>

                      <input
                        type="text"
                        maxLength={40}
                        className="form-control"
                        id="name"
                        autoComplete="off"
                        placeholder="Enter Nominee’s Name"
                        onChange={this.props.handleChange("name")}
                        defaultValue={values.name}
                      />
                    </div>
                  </div>
                  {/* <div className="col-md-6 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="mothersName">Date of Birth</label>

                      <DatePicker
                        className="form-control"
                        selected={this.props.noDob}
                        placeholder="Date of Birth"
                        onChange={this.props.handleDateChange}
                        defaultValue={values.noDob}
                      />
                    </div>
                  </div> */}
                  <div className="col-md-6 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="relation">
                        Relation with Account Holder
                      </label>

                      <input
                        type="text"
                        maxLength={40}
                        className="form-control"
                        id="relation"
                        autoComplete="off"
                        placeholder="Enter Relation"
                        onChange={this.props.handleChange("relation")}
                        defaultValue={values.relation}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="sharePercent">Share Percentage</label>

                      <input
                        type="number"
                        maxLength={40}
                        className="form-control"
                        id="sharePercent"
                        autoComplete="off"
                        placeholder="Enter Share Percentage"
                        onChange={this.props.handleChange("sharePercent")}
                        defaultValue={values.sharePercent}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="identityType">
                        dentification of Nominee
                      </label>

                      <select
                        className="form-control"
                        onChange={this.props.handleChange("identityType")}
                        defaultValue={values.identityType}
                      >
                        <option value="nid">National ID</option>
                        <option value="passport">Passport</option>
                        <option value="passport">Electronic Tax Number</option>
                        <option value="passport">Driving License Number</option>
                        <option value="birthr">Birth Registration</option>
                        <option value="birthr">Others (to be specified)</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="identityNumber">Identity Number</label>

                      <input
                        type="number"
                        maxLength={40}
                        className="form-control"
                        id="identityNumber"
                        autoComplete="off"
                        placeholder="Enter Identity Number"
                        onChange={this.props.handleChange("identityNumber")}
                        defaultValue={values.identityNumber}
                      />
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
                    {" "}
                    Save And Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NomineeInfo;
