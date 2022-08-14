import React, { Component } from "react";
import PersonalDetails from "./PersonalDetails";
import NomineeInfo from "./NomineeInfo";
import PreviewSubmit from "./PreviewSubmit";

export class EkycProcess extends Component {
  constructor(props) {
    super(props);
    let nidData = props.history.location.state.nidDetail;
    this.state = {
      step: 1,
      applicationId: props.history.location.state.applicationData.applicationId,
      firstName: "",
      middleName: "",
      lastName: "",
      fullName: nidData.name,
      fatherName: nidData.fathername,
      motherName: nidData.mothername,
      dob: nidData.dob,
      nationality: 0,
      birthPlace: "",
      spouseName: "",
      identificationType: 0,
      identificationNumber: nidData.nid,
      gender: nidData.gender === "male" ? 0 : 1,
      // preferredProduct: "saccount",
      districtId: "",
      branchId: "",
      residentialStatus: 0,
      occupation: "",
      maritalStatus: 0,
      phone: nidData.phoneNo,
      email: nidData.email,
      presentAddress: nidData.presentAddress,
      permanentAddress: nidData.permanentAddress,
      documentreferenceNumber: "Ref-Test",
      customerType: 1,
      branch: 1,
      facematchscore: nidData.facematchscore,
      nomineeInfo: [
        {
          applicationId: 8050,
          name: "name-97",
          fatherName: "father name",
          motherName: "mother name",
          dob: new Date(),
          occupation: "occupation",
          identityType: 1,
          identityNumber: "9797979797",
          presentAddress: "present address-8050",
          permanentAddress: "permanent address-8050",
          sharePercent: 22.5,
          relation: "Brother",
          spouseName: "spouseName",
          minorNomineeDob: "23-02-2010",
          documentReferenceNumber: "Doc-1",
          minorNomineePresentAddress: "present address Nominee-8050",
          minorReferenceName: "ReferenceNameM",
          minorNomineeIdentityNumber: "9797979797",
          minorNomineeIdentityType: 1,
          minorNomineeRelation: "Other",
          minorNomineeName: "Minor Nominee",
        },
      ],
    };
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };
  handleDateChange = (date) => {
    this.setState({
      dob: date,
    });
  };
  render() {
    const { step } = this.state;
    const {
      firstName,
      lastName,
      fullName,
      fatherName,
      motherName,
      dob,
      nationality,
      birthPlace,
      spouseName,
      identificationType,
      identificationNumber,
      preferredProduct,
      districtId,
      branchId,
      residentStatus,
      residentialStatus,
      occupation,
      maritalStatus,
      gender,
      phone,
      email,
      presentAddress,
      permanentAddress,
    } = this.state;
    const {
      name,
      minorNomineeDob,
      identityType,
      identityNumber,
      sharePercent,
      relation,
    } = this.state.nomineeInfo;
    const values = {
      firstName,
      lastName,
      fatherName,
      motherName,
      fullName,
      dob,
      nationality,
      birthPlace,
      spouseName,
      identificationType,
      identificationNumber,
      preferredProduct,
      districtId,
      branchId,
      residentStatus,
      residentialStatus,
      occupation,
      maritalStatus,
      gender,
      phone,
      email,
      presentAddress,
      permanentAddress,
      name,
      minorNomineeDob,
      identityType,
      identityNumber,
      sharePercent,
      relation,
    };
    switch (step) {
      case 1:
        return (
          <PersonalDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={{ ...values, applicationId: this.state.applicationId }}
          />
        );
      case 2:
        return (
          <NomineeInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <PreviewSubmit
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <p>Success</p>;
    }
  }
}

export default EkycProcess;
