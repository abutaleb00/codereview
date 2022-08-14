import React, { Component } from "react";
import { ekycaddapi, instance } from "../service/ApiUrls";
export class PersonalDetails extends Component {
  constructor(props) {
    super(props);
  }
  saveAndContinue = (e) => {
    e.preventDefault();
    let datatoSend = {
      applicationId: this.props.values.applicationId,
      firstName: this.props.values.firstName,
      middleName: this.props.values.middleName,
      lastName: this.props.values.lastName,
      fullName: this.props.values.fullName,
      fatherName: this.props.values.fatherName,
      motherName: this.props.values.motherName,
      dob: this.props.values.dob,
      nationality: this.props.values.nationality,
      birthPlace: this.props.values.birthPlace,
      spouseName: this.props.values.spouseName,
      identificationType: this.props.values.identificationType,
      identificationNumber: this.props.values.identificationNumber,
      gender: this.props.values.gender,
      preferredProduct: this.props.values.preferredProduct,
      districtId: this.props.values.districtId,
      branchId: this.props.values.branchId,
      residentialStatus: this.props.values.residentialStatus,
      occupation: this.props.values.occupation,
      maritalStatus: this.props.values.maritalStatus,
      phone: this.props.values.phone,
      email: this.props.values.email,
      presentAddress: this.props.values.presentAddress,
      permanentAddress: this.props.values.permanentAddress,
      documentreferenceNumber: this.props.values.documentreferenceNumber,
      customerType: 1,
      branch: this.props.values.branch,
    };
    console.log(datatoSend);
    instance.post(ekycaddapi, datatoSend).then((res) => {
      if (res.data.isError === false) {
        localStorage.setItem("applicationId", this.props.values.applicationId);
        this.props.nextStep();
        console.log(datatoSend);
      }
    });
  };

  render() {
    const { values } = this.props;
    return (
      <div className="row proBanner">
        <div className="col-12">
          <div className="card">
            <h4 className="card-title">Savings Account (Individual)</h4>
            <div className="card-body">
              <form>
                <div className="col-md-12">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="nidimg">Photo Matching Score : </label>
                      <span className="m-score">
                        {this.props.facematchscore}
                      </span>
                    </div>
                  </div>
                  <div className="form-header">
                    <h3 className="box-title">Personal Info</h3>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        First Name <span style={{ color: "red" }}>*</span>
                      </label>

                      <input
                        type="text"
                        maxLength={40}
                        className="form-control"
                        id="firstName"
                        autoComplete="off"
                        placeholder="Enter First Name"
                        onChange={this.props.handleChange("firstName")}
                        defaultValue={values.firstName}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        Last Name <span style={{ color: "red" }}>*</span>
                      </label>

                      <input
                        type="text"
                        maxLength={40}
                        className="form-control"
                        id="lastName"
                        autoComplete="off"
                        placeholder="Enter Last Name"
                        onChange={this.props.handleChange("lastName")}
                        defaultValue={values.lastName}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="fullName">
                        Full Name <span style={{ color: "red" }}>*</span>
                      </label>

                      <input
                        type="text"
                        maxLength={40}
                        className="form-control"
                        id="fullName"
                        autoComplete="off"
                        placeholder="Enter Full Name"
                        onChange={this.props.handleChange("fullName")}
                        defaultValue={values.fullName}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="fatherName">
                        Fathers Name <span style={{ color: "red" }}>*</span>
                      </label>

                      <input
                        type="text"
                        maxLength={40}
                        className="form-control"
                        id="fatherName"
                        autoComplete="off"
                        placeholder="Enter Fathers Name"
                        onChange={this.props.handleChange("fatherName")}
                        defaultValue={values.fatherName}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="motherName">
                        Mothers Name <span style={{ color: "red" }}>*</span>
                      </label>

                      <input
                        type="text"
                        maxLength={40}
                        className="form-control"
                        id="motherName"
                        autoComplete="off"
                        placeholder="Enter Mothers Name"
                        onChange={this.props.handleChange("motherName")}
                        defaultValue={values.motherName}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="spouseName">Spouse Name</label>

                      <input
                        type="text"
                        maxLength={40}
                        className="form-control"
                        id="spouseName"
                        autoComplete="off"
                        placeholder="Enter Spouse Name"
                        onChange={this.props.handleChange("spouseName")}
                        defaultValue={values.spouseName}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="dob">
                        Date of Birth <span style={{ color: "red" }}>*</span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        id="dob"
                        autoComplete="off"
                        placeholder="Enter Date of Birth"
                        onChange={this.props.handleChange("dob")}
                        defaultValue={values.dob}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="spouseName">
                        Nationality <span style={{ color: "red" }}>*</span>
                      </label>

                      <select
                        className="form-control"
                        disabled
                        onChange={this.props.handleChange("nationality")}
                        defaultValue={values.nationality}
                      >
                        <option id="nationality" value="bangladeshi">
                          BANGLADESHI
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="birthPlace">Birth Place</label>

                      <input
                        type="text"
                        maxLength={40}
                        className="form-control"
                        id="birthPlace"
                        autoComplete="off"
                        placeholder="Enter Birth Place"
                        onChange={this.props.handleChange("birthPlace")}
                        defaultValue={values.birthPlace}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="identificationType">
                        identificationType of Applicant{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>

                      <select
                        className="form-control"
                        disabled
                        onChange={this.props.handleChange("identificationType")}
                        defaultValue={values.identificationType}
                      >
                        <option id="nationality" value="nid">
                          National ID
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="identificationNumber">
                        Identity Number <span style={{ color: "red" }}>*</span>
                      </label>

                      <input
                        type="number"
                        maxLength={40}
                        className="form-control"
                        id="identificationNumber"
                        autoComplete="off"
                        placeholder="Enter Identity Number"
                        onChange={this.props.handleChange(
                          "identificationNumber"
                        )}
                        defaultValue={values.identificationNumber}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="gender">
                        Gender <span style={{ color: "red" }}>*</span>
                      </label>

                      <select
                        className="form-control"
                        disabled
                        onChange={this.props.handleChange("gender")}
                        defaultValue={values.gender}
                      >
                        <option id="male" value="male">
                          Male
                        </option>

                        <option id="female" value="female">
                          Female
                        </option>

                        <option id="third" value="third">
                          Third
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="preferredProduct">
                        Preferred Product{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>

                      <select
                        className="form-control"
                        disabled
                        onChange={this.props.handleChange("preferredProduct")}
                        defaultValue={values.preferredProduct}
                      >
                        <option id="saccount" value="saccount">
                          Saving Account
                        </option>

                        <option id="caccount" value="caccount">
                          Current Account
                        </option>

                        <option id="fdraccount" value="fdraccount">
                          FDR Account
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="districtId">Presently Resided City</label>

                      <select
                        className="form-control"
                        onChange={this.props.handleChange("districtId")}
                        defaultValue={values.districtId}
                      >
                        <option id="saccount" value="saccount">
                          Resident
                        </option>

                        <option id="ctg" value="ctg">
                          Chattogram City Corporation
                        </option>

                        <option id="dhk" value="dhk">
                          Dhaka City Corporation
                        </option>

                        <option id="khl" value="khl">
                          Khulna City Corporation
                        </option>

                        <option id="nar" value="nar">
                          Narayangonj City Corporation
                        </option>

                        <option id="raj" value="raj">
                          Rajshahi City Corporation
                        </option>

                        <option id="syl" value="syl">
                          Sylhet City Corporation
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="branchId">Preferred Branch</label>

                      <select
                        className="form-control"
                        onChange={this.props.handleChange("branchId")}
                        defaultValue={values.branchId}
                      >
                        <option id="gulshan" value="gulshan">
                          Branch A
                        </option>
                        <option id="gulshan" value="gulshan">
                          Branch B
                        </option>
                        <option id="gulshan" value="gulshan">
                          Branch C
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="residentStatus">Resident Status</label>

                      <select
                        className="form-control"
                        onChange={this.props.handleChange("residentStatus")}
                        defaultValue={values.residentStatus}
                      >
                        <option id="resident" value="resident">
                          Resident
                        </option>

                        <option id="nonresident" value="nonresident">
                          Non-Resident
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="residentialStatus">
                        Residential Status
                      </label>

                      <select
                        className="form-control"
                        onChange={this.props.handleChange("residentialStatus")}
                        defaultValue={values.residentialStatus}
                      >
                        <option id="none" value="">
                          select
                        </option>
                        <option id="own" value="own">
                          Own
                        </option>
                        <option id="rented" value="rented">
                          Rented
                        </option>
                        <option id="others" value="others">
                          Others
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="occupation">Occupation</label>

                      <select
                        className="form-control"
                        onChange={this.props.handleChange("occupation")}
                        defaultValue={values.occupation}
                      >
                        <option value="">select</option>
                        <option value="service">Service</option>
                        <option value="business">Business</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="maritalStatus">
                        Marital Status <span style={{ color: "red" }}>*</span>
                      </label>

                      <select
                        className="form-control"
                        onChange={this.props.handleChange("maritalStatus")}
                        defaultValue={values.maritalStatus}
                      >
                        <option id="none" value="">
                          select
                        </option>
                        <option id="married" value="married">
                          Married
                        </option>
                        <option id="singale" value="singale">
                          Singale
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="phone">
                        Mobile Number <span style={{ color: "red" }}>*</span>
                      </label>

                      <input
                        type="number"
                        maxLength={13}
                        className="form-control"
                        id="phone"
                        autoComplete="off"
                        placeholder="Enter Mobile Number"
                        onChange={this.props.handleChange("phone")}
                        defaultValue={values.phone}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="email">
                        Email Address <span style={{ color: "red" }}>*</span>
                      </label>

                      <input
                        type="email"
                        maxLength={40}
                        className="form-control"
                        id="email"
                        autoComplete="off"
                        placeholder="Enter Email"
                        onChange={this.props.handleChange("email")}
                        defaultValue={values.email}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="presentAddress">
                        Present Address <span style={{ color: "red" }}>*</span>
                      </label>
                      <textarea
                        type="text"
                        rows="3"
                        id="permanentAddress"
                        className="form-control"
                        onChange={this.props.handleChange("presentAddress")}
                        defaultValue={values.presentAddress}
                        placeholder="Enter Present Address"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-6 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="permanentAddress">
                        Permanent Address{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <textarea
                        type="text"
                        rows="3"
                        id="permanentAddress"
                        className="form-control"
                        onChange={this.props.handleChange("permanentAddress")}
                        defaultValue={values.permanentAddress}
                        placeholder="Enter Permanent Address"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-12 mt-3 pb-3"
                  style={{ textAlign: "center" }}
                >
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

export default PersonalDetails;
