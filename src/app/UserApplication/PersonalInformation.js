import React, { Component } from "react";
import { instance, baseURL } from "../service/ApiUrls";
import Signature from "../components/Signature";
import PopUp from "../components/PopUp";
import DocumentUploader from "../components/DocumentUploader";
import camera from "../user-pages/camera.js";
import DatePicker from "react-datepicker";
import { confirmAlert } from "react-confirm-alert";
import {
  listofFirst,
  listofSecond,
  listofThird,
  listofForth,
  convertecDataToPI,
  tpInfo,
  listofIntroducer,
  listofProfession,
  tpbusiness,
  tpService,
} from "../components/extra.js";
import Loader from "../components/Loader";
import { mappedDistrict } from "../data/division";
// import { mappedUpazila } from "../data/upazila";
import { findUpozella } from "../data/upozillamapped";
const userImg1 = require("../../assets/images/dummy-img.jpg");

class CustomTextBox extends React.Component {
  constructor(props) {
    super(props);
    if (props.Address !== undefined) {
      window.PersonalInformation.transferAddressData(
        props.id,
        props.val,
        props.Address === "present" ? true : false
      );
    } else {
      window.PersonalInformation.transferData(props.id, props.val);
    }
  }
  ChangeHandler = (e) => {
    console.log(e.target.value);
    if (e.target.value.length > 40) {
      confirmAlert({
        title: "Error",
        message: <p className="mod-p">Input Field Max Length 40</p>,
        buttons: [
          {
            label: "Ok",
            onClick: () => {},
          },
        ],
        closeOnClickOutside: false,
      });
    } else {
      if (this.props.Address !== undefined) {
        window.PersonalInformation.transferAddressData(
          e.target.id,
          e.target.value,
          this.props.Address === "present" ? true : false
        );
      } else {
        window.PersonalInformation.transferData(e.target.id, e.target.value);
      }
    }
  };
  render() {
    return (
      <div className={`col-md-${this.props.dim} d-inline-block`}>
        <div className="form-group">
          <label htmlFor="fatherName">
            {this.props.title}{" "}
            {this.props.isMandatory ? (
              <span style={{ color: "red" }}>*</span>
            ) : (
              ""
            )}
          </label>

          <input
            type={this.props.type !== undefined ? this.props.type : "text"}
            className="form-control"
            id={this.props.id}
            placeholder={this.props.placeholder}
            autoComplete="off"
            maxLength={this.props.maxLength}
            onChange={(e) => this.ChangeHandler(e)}
            disabled={this.props.disable ? true : false}
            value={this.props.val}
            required={this.props.isMandatory}
            // defaultValue={values.fatherName}
          />
        </div>
      </div>
    );
  }
}

class CustomDropDownBox extends React.Component {
  constructor(props) {
    super(props);
    window.PersonalInformation.transferData(props.id, props.options[0].value);
  }
  ChangeHandler = (e) => {
    console.log(e.target.value);
    window.PersonalInformation.transferData(e.target.id, e.target.value);
  };
  render() {
    return (
      <div className={`col-md-${this.props.dim} d-inline-block`}>
        <div className="form-group">
          <label htmlFor="gender">
            {this.props.title}{" "}
            {this.props.isMandatory ? (
              <span style={{ color: "red" }}>*</span>
            ) : (
              ""
            )}
          </label>

          <select
            id={this.props.id}
            className="form-control"
            disabled={this.props.disable}
            onChange={(e) => this.ChangeHandler(e)}
            required={this.props.isMandatory}
            //value={this.state.defalutval}

            //defaultValue={window.PersonalInformation.state[this.props.id]}
            // defaultValue={values.gender}
          >
            {this.props.options.map((v, k) => {
              //console.log(v);
              return (
                <option id={v.id} value={v.value} key={k}>
                  {v.title}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}

export class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    window.PersonalInformation = this;

    let convertedData = convertecDataToPI({ ...props.location.state });
    // let convertedData = convertecDataToPI({
    //   ...ecData.data.success.data.verificationResponse.voterInfo,
    // });
    let splittedName =
      convertedData.fullNameEn !== undefined &&
      convertedData.fullNameEn.split(" ", 2);
    this.state = {
      firstName: splittedName && splittedName[0],
      lastName: splittedName && splittedName[1],
      modalShow: false,
      modalShowSign: false,
      option1: true,
      option2: false,
      option3: true,
      option4: false,
      option5: true,
      option6: false,
      option7: true,
      option8: false,
      padClick: false,
      submitPhoto: false,
      submitSign: false,
      loaderShow: false,
      branchName: "Dhaka",
      loaderText: "Loading....",
      professionT: "Service",
      issueDate: this.handleChange2(),
      issuePlace: "EC,DHA,BD",
      ...convertedData,
      ...props.location.state,
      documentType: 3,
      // mobile: "01917060123",
    };
    // this._handlePhoto = this._handlePhoto.bind(this);
    // this._signPhoto = this._signPhoto.bind(this);
    // this._frontPhoto = this._frontPhoto.bind(this);
    // this._backPhoto = this._backPhoto.bind(this);
    // this._handleBack = this._handleBack.bind(this);
  }
  componentDidMount = async () => {
    console.log(this.state.father, this.state.mother, { ...this.state });
    let father_en = await this.callBanglaToEnglishConverter(this.state.father);
    let mother_en = await this.callBanglaToEnglishConverter(this.state.mother);
    this.setState({ father_en: father_en, mother_en: mother_en });
  };
  handleChangeT = (e) => {
    console.log(e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };
  getMobileNumber = () => {
    if (window.mobileNumber !== undefined) {
      this.setState({ ...window.mobileNumber.getMobileNumber() });
    }
  };
  modalShowHandler = () => {
    this.setState({ modalShow: true });
  };
  modalShowHandlerSign = () => {
    this.setState({ modalShowSign: true });
  };
  modalHideHandler = () => {
    this.setState({ modalShow: false, option1: true }, () => {
      // camera.stopCamera();
    });
  };
  modalHideHandlerSign = () => {
    this.setState({ modalShowSign: false, option3: true }, () => {
      // camera.stopCamera();
    });
  };
  modalHideHandlerFront = () => {
    this.setState({ modalShowFront: false, option5: true }, () => {
      // camera.stopCamera();
    });
  };
  modalHideHandlerBack = () => {
    this.setState({ modalShowBack: false, option7: true }, () => {
      // camera.stopCamera();
    });
  };

  transferAddressData = (k, v, isPresent) => {
    //console.log(k, v, isPresent);
    if (isPresent === true) {
      const presentAddress = { ...this.state.presentAddress, [k]: v };
      this.setState(() => ({ presentAddress }));
    } else {
      const permanentAddress = { ...this.state.permanentAddress, [k]: v };
      this.setState(() => ({ permanentAddress }));
    }
  };
  transferData = (k, v) => {
    //console.log(k, v);
    this.setState({ [k]: v });
  };

  ChangeHandler = (e) => {
    if (e.target.value.length > 40) {
      confirmAlert({
        title: "Error",
        message: <p className="mod-p">Input Field Max Length 40</p>,
        buttons: [
          {
            label: "Ok",
            onClick: () => {},
          },
        ],
        closeOnClickOutside: false,
      });
    }
  };

  submitHandler = () => {
    if (
      this.state.photoBase64 !== undefined &&
      this.state.photoBase64 !== null
    ) {
      this.setState(
        {
          submitPhoto: true,
          ownbase64: this.state.photoBase64,
          photoBase64: null,
        },
        () => {
          this.resetPhoto();
          this.modalHideHandler();
        }
      );
    } else {
      this.setState({ submitPhoto: true }, () => {
        camera.stopCamera();
        this.modalHideHandler();
      });
    }
  };
  submitHandlerSign = () => {
    if (
      this.state.captureSignatureb64 !== undefined &&
      this.state.captureSignatureb64 !== null
    ) {
      this.setState(
        {
          submitSign: true,
          capturedSignature: this.state.captureSignatureb64,
          captureSignatureb64: null,
        },
        () => {
          this.resetSignature();
          this.modalHideHandlerSign();
        }
      );
    } else {
      this.setState({ submitSign: true }, () => {
        camera.stopCamera();
        this.modalHideHandlerSign();
      });
    }
  };
  submitHandlerFront = () => {
    if (
      this.state.captureFrontb64 !== undefined &&
      this.state.captureFrontb64 !== null
    ) {
      this.setState(
        {
          submitFront: true,
          nidFrontbase64: this.state.captureFrontb64,
          captureFrontb64: null,
        },
        () => {
          this.resetFront();
          this.modalHideHandlerFront();
        }
      );
    } else {
      this.setState({ submitFront: true }, () => {
        camera.stopCamera();
        this.modalHideHandlerFront();
      });
    }
  };
  submitHandlerBack = () => {
    if (
      this.state.captureBackb64 !== undefined &&
      this.state.captureBackb64 !== null
    ) {
      this.setState(
        {
          submitBack: true,
          nidBackbase64: this.state.captureBackb64,
          captureBackb64: null,
        },
        () => {
          this.resetBack();
          this.modalHideHandlerBack();
        }
      );
    } else {
      this.setState({ submitBack: true }, () => {
        camera.stopCamera();
        this.modalHideHandlerBack();
      });
    }
  };
  captureSignatureb64 = (data) => {
    if (data !== undefined && data !== null) {
      this.setState({ capturedSignature: data.substring(22), padClick: true });
    }
  };
  captureFrontb64 = (data) => {
    if (data !== undefined && data !== null) {
      this.setState({ nidFrontbase64: data.substring(22) });
    }
  };
  captureBackb64 = (data) => {
    if (data !== undefined && data !== null) {
      this.setState({ nidBackbase64: data.substring(22) });
    }
  };

  resetPhoto = () => {
    this.setState({
      photoFile: null,
      photoToShow: undefined,
      photoBase64: null,
    });
  };
  resetNidFront = () => {
    this.setState({
      frontFile: null,
      nidFrontToShow: undefined,
      nidFrontbase64: null,
    });
  };
  resetNidBack = () => {
    this.setState({
      backFile: null,
      nidBackToShow: undefined,
      nidBackbase64: null,
    });
  };
  resetSignature = () => {
    this.setState({
      signFile: null,
      signToShow: undefined,
      captureSignatureb64: null,
    });
  };
  resetFront = () => {
    this.setState({
      frontFile: null,
      frontToShow: undefined,
      captureFrontb64: null,
    });
  };
  resetBack = () => {
    this.setState({
      backFile: null,
      backToShow: undefined,
      captureBackb64: null,
    });
  };

  _handleImageChange = (type) => async (e) => {
    e.preventDefault();
    switch (type) {
      case "photo":
        document.getElementById("ownPhotoCross").style.display = "block";
        this._handlePhoto(e);
        break;
      case "sign":
        document.getElementById("signCross").style.display = "block";
        this._signPhoto(e);
        break;
      case "front":
        document.getElementById("frontCross").style.display = "block";
        this._frontPhoto(e);
        break;
      case "back":
        document.getElementById("backCross").style.display = "block";
        this._backPhoto(e);
        break;
      default:
        break;
    }
  };
  _handlePhoto = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      let result = reader.result;
      if (result.substring(0, 22).includes("jpeg"))
        result = result.substring(23);
      else result = result.substring(22);
      if (!allowedExtensions.exec(file.name)) {
        alert("Invalid file type");
        return false;
      }
      this.setState(
        {
          photoFile: file,
          photoToShow: file.name,
          photoBase64: result,
        },
        () => {
          if (
            this.state.photoFile !== undefined &&
            this.state.photoFile !== null
          ) {
            console.log("front");
            // this.upPictureToServer("lock")(e);
          }
        }
      );
    };
    reader.readAsDataURL(file);
  };
  _signPhoto = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      let result = reader.result;
      if (result.substring(0, 22).includes("jpeg"))
        result = result.substring(23);
      else result = result.substring(22);
      if (!allowedExtensions.exec(file.name)) {
        alert("Invalid file type");
        return false;
      }
      this.setState(
        {
          signFile: file,
          signToShow: file.name,
          captureSignatureb64: result,
        },
        () => {
          if (
            this.state.signFile !== undefined &&
            this.state.signFile !== null
          ) {
            console.log("sign");
            // this.upPictureToServer("lock")(e);
          }
        }
      );
    };
    reader.readAsDataURL(file);
  };
  _frontPhoto = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      let result = reader.result;
      if (result.substring(0, 22).includes("jpeg"))
        result = result.substring(23);
      else result = result.substring(22);
      if (!allowedExtensions.exec(file.name)) {
        alert("Invalid file type");
        return false;
      }
      this.setState(
        {
          frontFile: file,
          frontToShow: file.name,
          captureFrontb64: result,
        },
        () => {
          if (
            this.state.frontFile !== undefined &&
            this.state.frontFile !== null
          ) {
            console.log("front");
            // this.upPictureToServer("lock")(e);
          }
        }
      );
    };
    reader.readAsDataURL(file);
  };
  _backPhoto = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      let result = reader.result;
      if (result.substring(0, 22).includes("jpeg"))
        result = result.substring(23);
      else result = result.substring(22);
      if (!allowedExtensions.exec(file.name)) {
        alert("Invalid file type");
        return false;
      }
      this.setState(
        {
          backFile: file,
          backToShow: file.name,
          captureBackb64: result,
        },
        () => {
          if (
            this.state.backFile !== undefined &&
            this.state.backFile !== null
          ) {
            console.log("back");
            // this.upPictureToServer("lock")(e);
          }
        }
      );
    };
    reader.readAsDataURL(file);
  };

  callGetBranchInfo = (e) => {
    e.preventDefault();
    instance
      .post(baseURL + "/getloggedinuser")
      .then((res) => {
        if (res.data.result.error === false) {
          this.setState({ branchName: res.data.data.branchName }, () => {
            this.handleSubmit(e);
          });
        } else {
          this.setState({ branchName: "Gulshan Corporate" }, () => {
            this.handleSubmit(e);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let dataToSend = {
      // ...this.state,
      ownbase64: this.state.ownbase64,
      // passportbase64: "",
      passportToShow: "",
      fullNameEn: this.state.fullNameEn,
      capturedSignature: this.state.capturedSignature,
      isCapturedSignatureBool: this.state.padClick,
      nidFrontbase64: this.state.nidFrontbase64,
      nidBackbase64: this.state.nidBackbase64,
      branchName: this.state.branchName,
      identifierNumber: this.state.identifierNumber,
      personalInformation: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        fullNameEn: this.state.fullNameEn,
        father: this.state.father,
        mother: this.state.mother,
        f_name_en: this.state.father_en,
        m_name_en: this.state.mother_en,
        spouse: this.state.spouse,
        spouse_name_en: this.state.spouse_en,
        nationality: this.state.nationality,
        gender: this.state.gender,
        maritalStatus: this.state.maritalStatus,
        tinNo: this.state.tinNo,
        fullNameBn: this.state.fullNameBn,
        mobile: this.state.mobile,
        email: this.state.email,
        documentType: this.state.documentType,
        documentNo: this.state.identifierNumber,
        identityDocExpiryDate: this.state.issueDate,
        passportNumber: "",
        expairedDate: "",
        dob: this.state.dob,
        // padClick: this.state.padClick,
      },
      permanentAddress: {
        ...this.state.permanentAddress,
        country: this.state.country,
        division_en: this.state.pm_division_en,
        district_en: this.state.pm_district_en,
        upozila_en: this.state.pm_upozila_en,
        cityCorporationOrMunicipality_en:
          this.state.pm_cityCorporationOrMunicipality_en,
        unionOrWard_en: this.state.pm_unionOrWard_en,
        postOffice_en: this.state.pm_postOffice_en,
        additionalMouzaOrMoholla_en: this.state.pm_additionalMouzaOrMoholla_en,
        additionalVillageOrRoad_en: this.state.pm_additionalVillageOrRoad_en,
        homeOrHoldingNo_en: this.state.pm_homeOrHoldingNo_en,
        homeOrHoldingNo_en: this.state.pm_homeOrHoldingNo_en,
      },
      presentAddress: {
        ...this.state.presentAddress,
        country: this.state.country,
        division_en: this.state.pr_division_en,
        district_en: this.state.pr_district_en,
        upozila_en: this.state.pr_upozila_en,
        cityCorporationOrMunicipality_en:
          this.state.pr_cityCorporationOrMunicipality_en,
        unionOrWard_en: this.state.pr_unionOrWard_en,
        postOffice_en: this.state.pr_postOffice_en,
        additionalMouzaOrMoholla_en: this.state.pr_additionalMouzaOrMoholla_en,
        additionalVillageOrRoad_en: this.state.pr_additionalVillageOrRoad_en,
        homeOrHoldingNo_en: this.state.pr_homeOrHoldingNo_en,
        homeOrHoldingNo_en: this.state.pr_homeOrHoldingNo_en,
      },
      professionalAddress: {
        institutionName: this.state.institutionName,
        institutionAddress: this.state.institutionAddress,
        iPhoneNo: this.state.iPhoneNo,
        iEmailAddress: this.state.iEmailAddress,
      },
      introducerInformation: {
        introducerName: this.state.introducerName,
        introducerAccount: this.state.introducerAccount,
      },
      transactionProfile: {
        proffession: this.state.professionT + " : " + this.state.profession,
        sourceofFund: this.state.sourcesofFund,
        monthlyIncome: Number(this.state.monthlyIncome),
      },
    };
    console.log("dataToSend", dataToSend);
    this.setState({ loaderShow: true }, () => {
      instance.post(baseURL + "/captureProfileData", dataToSend).then((res) => {
        if (res.data.result.error === false) {
          this.setState({ loaderShow: false }, () => {
            confirmAlert({
              title: "Successfull",
              message: (
                <p className="mod-sp">Your Profile Created Successfully</p>
              ),
              buttons: [
                {
                  label: "Ok",
                  onClick: () => {
                    this.props.history.push("/customer-list");
                  },
                },
              ],
              closeOnClickOutside: false,
            });
          });
        } else if (res.data.result.error === true) {
          this.setState({ loaderShow: false }, () => {
            confirmAlert({
              title: "Error",
              message: <p className="mod-p">{res.data.result.errorMsg}</p>,
              buttons: [
                {
                  label: "Ok",
                  onClick: () => {},
                },
              ],
              closeOnClickOutside: false,
            });
          });
        }
      });
    });
  };

  handleChange = (date) => {
    //console.log("date ", date.toISOString());
    let date2 = new Date(date.toISOString());
    let year = date2.getFullYear();
    let month = date2.getMonth() + 1;
    let dt = date2.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    let stringDate = year + "-" + month + "-" + dt;
    console.log(year + "-" + month + "-" + dt);
    this.setState({
      issueDate: stringDate,
    });
    return stringDate;
  };

  handleChange2 = (date) => {
    //console.log("date ", date.toISOString());
    let date2 = new Date();
    let year = date2.getFullYear() - 2;
    let month = date2.getMonth() + 1;
    let dt = date2.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    let stringDate = year + "-" + month + "-" + dt;
    console.log(year + "-" + month + "-" + dt);
    return stringDate;
  };

  callBanglaToEnglishConverter = async (text) => {
    let datatoSend = {
      bangla: text,
    };
    let dataToCall = await instance.post(
      baseURL + "/getenglishdata",
      datatoSend
    );
    //console.log(dataToCall);
    // return dataToCall.data.data.english;
  };

  render() {
    let {} =
      this.state.photoBase64 !== null &&
      this.state.photoBase64 !== undefined &&
      this.state.photoBase64;
    let $ownPhotoView = null;
    // $imagePreview = (imagePreviewUrl)
    $ownPhotoView = (
      <img
        src={
          this.state.photoBase64 !== undefined &&
          this.state.photoBase64 !== userImg1 &&
          this.state.photoBase64 !== null
            ? `data:image/jpeg;base64,${this.state.photoBase64}`
            : process.env.PUBLIC_URL + "/dummy-img.jpg"
        }
        className="mx-auto d-block"
        alt="Own Photo"
        style={{
          width: "100%",
          border: "1px solid #ffffff",
          maxHeight: "200px",
        }}
      />
    );
    let {} =
      this.state.captureSignatureb64 !== null &&
      this.state.captureSignatureb64 !== undefined &&
      this.state.captureSignatureb64;
    let $signPhotoView = null;
    // $imagePreview = (imagePreviewUrl)
    $signPhotoView = (
      <img
        src={
          this.state.captureSignatureb64 !== undefined &&
          this.state.captureSignatureb64 !== userImg1 &&
          this.state.captureSignatureb64 !== null
            ? `data:image/jpeg;base64,${this.state.captureSignatureb64}`
            : process.env.PUBLIC_URL + "/dummy-img.jpg"
        }
        className="mx-auto d-block"
        alt="Own Photo"
        style={{
          width: "100%",
          border: "1px solid #ffffff",
          maxHeight: "200px",
        }}
      />
    );
    let {} =
      this.state.captureFrontb64 !== null &&
      this.state.captureFrontb64 !== undefined &&
      this.state.captureFrontb64;
    let $frontPhotoView = null;
    // $imagePreview = (imagePreviewUrl)
    $frontPhotoView = (
      <img
        src={
          this.state.captureFrontb64 !== undefined &&
          this.state.captureFrontb64 !== userImg1 &&
          this.state.captureFrontb64 !== null
            ? `data:image/jpeg;base64,${this.state.captureFrontb64}`
            : process.env.PUBLIC_URL + "/dummy-img.jpg"
        }
        className="mx-auto d-block"
        alt="NID Front Photo"
        style={{
          width: "100%",
          border: "1px solid #ffffff",
          maxHeight: "200px",
        }}
      />
    );
    let {} =
      this.state.captureBackb64 !== null &&
      this.state.captureBackb64 !== undefined &&
      this.state.captureBackb64;
    let $backPhotoView = null;
    // $imagePreview = (imagePreviewUrl)
    $backPhotoView = (
      <img
        src={
          this.state.captureBackb64 !== undefined &&
          this.state.captureBackb64 !== userImg1 &&
          this.state.captureBackb64 !== null
            ? `data:image/jpeg;base64,${this.state.captureBackb64}`
            : process.env.PUBLIC_URL + "/dummy-img.jpg"
        }
        className="mx-auto d-block"
        alt="NID Back Photo"
        style={{
          width: "100%",
          border: "1px solid #ffffff",
          maxHeight: "200px",
        }}
      />
    );

    // const { values } = this.props;
    const uploadOption = (
      <>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          How would you like to submit your Document?
        </p>
        <button
          className="btn btn-outline-info btn-lg btn-block mb-3 mt-4"
          style={{ textAlign: "left" }}
          onClick={() => {
            this.setState({ option1: false, option2: true }, () => {
              camera.startCamera();
            });
          }}
        >
          <i className="mdi mdi-camera"></i>Take Photo with webcam{" "}
          <i
            className="mdi mdi-arrow-right-bold-circle-outline"
            style={{ float: "right" }}
          ></i>
        </button>
        <button
          className="btn btn-outline-info btn-lg btn-block mb-4"
          style={{ textAlign: "left" }}
          onClick={() => {
            this.setState({ option1: false, option2: false });
          }}
        >
          <i className="mdi mdi-cloud-upload"></i>Upload photo from this device{" "}
          <i
            className="mdi mdi-arrow-right-bold-circle-outline"
            style={{ float: "right" }}
          ></i>
        </button>
      </>
    );
    const uploadOptionSign = (
      <>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          How would you like to submit your Document?
        </p>
        <button
          className="btn btn-outline-info btn-lg btn-block mb-3 mt-4"
          style={{ textAlign: "left" }}
          onClick={() => {
            this.setState({ option3: false, option4: true }, () => {});
          }}
        >
          <i className="mdi mdi-tablet-ipad"></i>From Signature Pad{" "}
          <i
            className="mdi mdi-arrow-right-bold-circle-outline"
            style={{ float: "right" }}
          ></i>
        </button>
        <button
          className="btn btn-outline-info btn-lg btn-block mb-4"
          style={{ textAlign: "left" }}
          onClick={() => {
            this.setState({ option3: false, option4: false });
          }}
        >
          <i className="mdi mdi-cloud-upload"></i>Upload photo from this device{" "}
          <i
            className="mdi mdi-arrow-right-bold-circle-outline"
            style={{ float: "right" }}
          ></i>
        </button>
      </>
    );
    const uploadOptionFront = (
      <>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          How would you like to submit your Document?
        </p>
        <button
          className="btn btn-outline-info btn-lg btn-block mb-3 mt-4"
          style={{ textAlign: "left" }}
          onClick={() => {
            this.setState({ option5: false, option6: true }, () => {
              camera.startCamera();
            });
          }}
        >
          <i className="mdi mdi-camera"></i>Take Photo with webcam{" "}
          <i
            className="mdi mdi-arrow-right-bold-circle-outline"
            style={{ float: "right" }}
          ></i>
        </button>
        <button
          className="btn btn-outline-info btn-lg btn-block mb-4"
          style={{ textAlign: "left" }}
          onClick={() => {
            this.setState({ option5: false, option6: false });
          }}
        >
          <i className="mdi mdi-cloud-upload"></i>Upload photo from this device{" "}
          <i
            className="mdi mdi-arrow-right-bold-circle-outline"
            style={{ float: "right" }}
          ></i>
        </button>
      </>
    );
    const uploadOptionBack = (
      <>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          How would you like to submit your Document?
        </p>
        <button
          className="btn btn-outline-info btn-lg btn-block mb-3 mt-4"
          style={{ textAlign: "left" }}
          onClick={() => {
            this.setState({ option7: false, option8: true }, () => {
              camera.startCamera();
            });
          }}
        >
          <i className="mdi mdi-camera"></i>Take Photo with webcam{" "}
          <i
            className="mdi mdi-arrow-right-bold-circle-outline"
            style={{ float: "right" }}
          ></i>
        </button>
        <button
          className="btn btn-outline-info btn-lg btn-block mb-4"
          style={{ textAlign: "left" }}
          onClick={() => {
            this.setState({ option7: false, option8: false });
          }}
        >
          <i className="mdi mdi-cloud-upload"></i>Upload photo from this device{" "}
          <i
            className="mdi mdi-arrow-right-bold-circle-outline"
            style={{ float: "right" }}
          ></i>
        </button>
      </>
    );
    const fileUpload = (
      <>
        <DocumentUploader
          name="Upload Photo"
          id="ownPhoto"
          cross="ownPhotoCross"
          handleLock={() => this._handleImageChange("photo")}
          //handleLock={(e) => this._handlePhoto(e)}
          brandfileNameToShow={this.state.photoToShow}
          parentCall={() => {
            this.resetPhoto();
          }}
        />
        {$ownPhotoView}
      </>
    );
    const signUpload = (
      <>
        <DocumentUploader
          name="Signature Photo"
          id="ownPhoto"
          cross="signCross"
          handleLock={() => this._handleImageChange("sign")}
          //handleLock={(e) => this._handlePhoto(e)}
          brandfileNameToShow={this.state.signToShow}
          parentCall={() => {
            this.resetSignature();
          }}
        />
        {$signPhotoView}
      </>
    );
    const frontUpload = (
      <>
        <DocumentUploader
          name="NID Front Photo"
          id="frontPhoto"
          cross="frontCross"
          handleLock={() => this._handleImageChange("front")}
          //handleLock={(e) => this._handlePhoto(e)}
          brandfileNameToShow={this.state.frontToShow}
          parentCall={() => {
            this.resetFront();
          }}
        />
        {$frontPhotoView}
      </>
    );
    const backUpload = (
      <>
        <DocumentUploader
          name="NID Back Photo"
          id="backPhoto"
          cross="backCross"
          handleLock={() => this._handleImageChange("back")}
          //handleLock={(e) => this._handlePhoto(e)}
          brandfileNameToShow={this.state.BackToShow}
          parentCall={() => {
            this.resetBack();
          }}
        />
        {$backPhotoView}
      </>
    );
    const webCam = (
      <>
        <div className="col-md-6 d-inline-block">
          <div id="web_came"></div>
        </div>
        <div
          id="web_src"
          className="col-md-6 d-inline-block"
          style={{ width: "100%", height: "auto" }}
        ></div>
        <button
          className="btn btn-danger mr-2"
          onClick={() => {
            camera.stopCamera();
            this.modalHideHandler();
          }}
        >
          Stop-Camera
        </button>
        <button
          className="btn btn-success"
          onClick={() => {
            let ownimge = camera.takeSnapshot();
            this.setState({ ownbase64: ownimge.substring(22) });
          }}
        >
          Take Picture
        </button>
      </>
    );
    // const webCamSign = (
    //   <>
    //     <div className="col-md-6 d-inline-block">
    //       <div id="web_came"></div>
    //     </div>
    //     <div
    //       id="web_src"
    //       className="col-md-6 d-inline-block"
    //       style={{ width: "100%", height: "auto" }}
    //     ></div>
    //     <button
    //       className="btn btn-danger mr-2"
    //       onClick={() => {
    //         camera.stopCamera();
    //         this.modalHideHandlerSign();
    //       }}
    //     >
    //       Stop-Camera
    //     </button>
    //     <button
    //       className="btn btn-success"
    //       onClick={() => {
    //         let signimge = camera.takeSnapshot();
    //         this.setState({ capturedSignature: signimge.substring(22) });
    //       }}
    //     >
    //       Take Picture
    //     </button>
    //   </>
    // );
    const signaturepad = (
      <>
        <Signature
          fname={this.state.firstName}
          lname={this.state.lastName}
          capturefuncName={window.capture}
          clearfuncName={window.clearSignature}
          signatureData={this.captureSignatureb64}
        />
      </>
    );
    const webCamFront = (
      <>
        <div className="col-md-6 d-inline-block">
          <div id="web_came"></div>
        </div>
        <div
          id="web_src"
          className="col-md-6 d-inline-block"
          style={{ width: "100%", height: "auto" }}
        ></div>
        <button
          className="btn btn-danger mr-2"
          onClick={() => {
            camera.stopCamera();
            this.modalHideHandlerFront();
          }}
        >
          Stop-Camera
        </button>
        <button
          className="btn btn-success"
          onClick={() => {
            let frontimge = camera.takeSnapshot();
            this.setState({ nidFrontbase64: frontimge.substring(22) });
          }}
        >
          Take Picture
        </button>
      </>
    );
    const webCamBack = (
      <>
        <div className="col-md-6 d-inline-block">
          <div id="web_came"></div>
        </div>
        <div
          id="web_src"
          className="col-md-6 d-inline-block"
          style={{ width: "100%", height: "auto" }}
        ></div>
        <button
          className="btn btn-danger mr-2"
          onClick={() => {
            camera.stopCamera();
            this.modalHideHandlerBack();
          }}
        >
          Stop-Camera
        </button>
        <button
          className="btn btn-success"
          onClick={() => {
            let backimge = camera.takeSnapshot();
            this.setState({ nidBackbase64: backimge.substring(22) });
          }}
        >
          Take Picture
        </button>
      </>
    );
    const docSubmitOption = (
      <>
        {this.state.option1 === true ? (
          <>{uploadOption}</>
        ) : (
          <>{this.state.option2 === true ? <>{webCam}</> : <>{fileUpload}</>}</>
        )}
      </>
    );
    const docSubmitOptionSign = (
      <>
        {this.state.option3 === true ? (
          <>{uploadOptionSign}</>
        ) : (
          <>
            {this.state.option4 === true ? (
              <>{signaturepad}</>
            ) : (
              <>{signUpload}</>
            )}
          </>
        )}
      </>
    );
    const docSubmitOptionFront = (
      <>
        {this.state.option5 === true ? (
          <>{uploadOptionFront}</>
        ) : (
          <>
            {this.state.option6 === true ? (
              <>{webCamFront}</>
            ) : (
              <>{frontUpload}</>
            )}
          </>
        )}
      </>
    );
    const docSubmitOptionBack = (
      <>
        {this.state.option7 === true ? (
          <>{uploadOptionBack}</>
        ) : (
          <>
            {this.state.option8 === true ? (
              <>{webCamBack}</>
            ) : (
              <>{backUpload}</>
            )}
          </>
        )}
      </>
    );
    return (
      <div className="row proBanner">
        <div className="col-12">
          <div className="card">
            <h4 className="card-title">Personal Information</h4>
            <div className="card-body">
              {/* <form> */}
              <form
                onSubmit={
                  this.callGetBranchInfo
                  //this.handleSubmit
                }
              >
                <div className="col-md-12">
                  <div className="row justify-content-md-center mb-2">
                    <div className="col-md-4" style={{ textAlign: "center" }}>
                      <img
                        src={
                          this.state.ownbase64 !== null &&
                          this.state.ownbase64 !== undefined &&
                          this.state.submitPhoto === true
                            ? "data:image/png;base64," + this.state.ownbase64
                            : process.env.PUBLIC_URL + "/user-image.jpg"
                        }
                        className="rounded mx-auto d-block"
                        alt="user image"
                        width="56%"
                      />
                      <button
                        type="button"
                        className={
                          this.state.ownbase64 !== null &&
                          this.state.ownbase64 !== undefined
                            ? "btn btn-successs mt-1"
                            : "btn btn-success mt-1"
                        }
                        onClick={() => this.setState({ modalShow: true })}
                      >
                        Upload Photo
                      </button>
                    </div>
                    <div className="col-md-8">
                      {listofFirst.map((v, k) => {
                        //console.log(v, k);
                        return (
                          <CustomTextBox
                            key={k}
                            dim={v.dim}
                            id={v.id}
                            type={v.type}
                            maxLength={v.maxLength}
                            title={v.title}
                            onChange={(e) => this.ChangeHandler(e)}
                            isMandatory={v.isMandatory}
                            placeholder={v.placeholder}
                            disable={v.disable}
                            val={this.state[v.id]}
                          />
                        );
                      })}
                      <div className="col-md-6  d-inline-block">
                        <div className="form-group">
                          <label htmlFor="issueDate">Issue Date</label>
                          <div className="input-group date">
                            <DatePicker
                              className="form-control"
                              //selected={this.state.issueDate}
                              utcOffset={6}
                              onChange={this.handleChange}
                              dateFormat="Pp"
                              value={this.state.issueDate}
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              placeholderText="Enter Issue Date"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-header">
                    <h3 className="box-title">Personal Info</h3>
                  </div>
                  {listofSecond.map((v, k) => {
                    //console.log(v, k);
                    {
                      return v.options === null || v.options === undefined ? (
                        <CustomTextBox
                          key={k}
                          dim={v.dim}
                          id={v.id}
                          type={v.type}
                          maxLength={v.maxLength}
                          title={v.title}
                          onChange={(e) => this.ChangeHandler(e)}
                          isMandatory={v.isMandatory}
                          placeholder={v.placeholder}
                          disable={v.disable}
                          val={this.state[v.id]}
                        />
                      ) : (
                        <CustomDropDownBox
                          dim={v.dim}
                          id={v.id}
                          title={v.title}
                          isMandatory={v.isMandatory}
                          placeholder={v.placeholder}
                          disable={v.disable}
                          options={v.options}
                        />
                      );
                    }
                  })}
                  <div className="form-header">
                    <h3 className="box-title">Present Address</h3>
                  </div>
                  {listofThird.map((v, k) => {
                    //console.log(v, k);
                    {
                      return v.options === null || v.options === undefined ? (
                        <CustomTextBox
                          key={k}
                          dim={v.dim}
                          id={v.id}
                          type={v.type}
                          maxLength={v.maxLength}
                          title={v.title}
                          onChange={(e) => this.ChangeHandler(e)}
                          isMandatory={v.isMandatory}
                          placeholder={v.placeholder}
                          disable={v.disable}
                          val={this.state.presentAddress[v.id]}
                          Address="present"
                        />
                      ) : (
                        <CustomDropDownBox
                          dim={v.dim}
                          id={v.id}
                          title={v.title}
                          isMandatory={v.isMandatory}
                          placeholder={v.placeholder}
                          disable={v.disable}
                          options={
                            v.id === "professionT" &&
                            this.state.professionT !== undefined
                              ? mappedDistrict(this.state.professionT)
                              : v.id === "profession" &&
                                this.state.professionT !== undefined &&
                                this.state.profession !== undefined
                              ? findUpozella(
                                  this.state.professionT,
                                  this.state.profession
                                )
                              : v.options
                          }
                        />
                      );
                    }
                  })}
                  <div className="form-header">
                    <h3 className="box-title">Permanent Address</h3>
                  </div>
                  {listofForth.map((v, k) => {
                    //console.log(v, k);
                    {
                      return v.options === null || v.options === undefined ? (
                        <CustomTextBox
                          key={k}
                          dim={v.dim}
                          id={v.id}
                          type={v.type}
                          maxLength={v.maxLength}
                          title={v.title}
                          onChange={(e) => this.ChangeHandler(e)}
                          isMandatory={v.isMandatory}
                          placeholder={v.placeholder}
                          disable={v.disable}
                          val={this.state.permanentAddress[v.id]}
                          Address="permanent"
                        />
                      ) : (
                        <CustomDropDownBox
                          dim={v.dim}
                          id={v.id}
                          title={v.title}
                          isMandatory={v.isMandatory}
                          placeholder={v.placeholder}
                          disable={v.disable}
                          options={
                            v.id === "profession" &&
                            this.state.professionT !== undefined
                              ? mappedDistrict(this.state.professionT)
                              : v.id === "pm_upozila_en" &&
                                this.state.pm_division_en !== undefined &&
                                this.state.pm_district_en !== undefined
                              ? findUpozella(
                                  this.state.pm_division_en,
                                  this.state.pm_district_en
                                )
                              : v.options
                          }
                        />
                      );
                    }
                  })}
                  <div className="form-header">
                    <h3 className="box-title">Transaction Profile</h3>
                  </div>
                  <div className="col-md-3 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="profession_type">Profession Type</label>
                      <select
                        className="form-control"
                        id="profession_type"
                        onChange={(e) =>
                          this.setState({ professionT: e.target.value })
                        }
                      >
                        <option name="service" value="Service">
                          Service
                        </option>
                        <option name="business" value="Business">
                          Business
                        </option>
                      </select>
                    </div>
                  </div>
                  {this.state.professionT === "Service"
                    ? tpService.map((v, k) => {
                        //console.log(v, k);
                        return (
                          <CustomDropDownBox
                            dim={v.dim}
                            id={v.id}
                            title={v.title}
                            isMandatory={v.isMandatory}
                            placeholder={v.placeholder}
                            disable={v.disable}
                            options={v.options}
                            onChange={(e) => this.ChangeHandler(e)}
                            defaultValue={v.options[1]}
                          />
                        );
                      })
                    : tpbusiness.map((v, k) => {
                        //console.log(v, k);
                        return (
                          <CustomDropDownBox
                            dim={v.dim}
                            id={v.id}
                            title={v.title}
                            isMandatory={v.isMandatory}
                            placeholder={v.placeholder}
                            disable={v.disable}
                            options={v.options}
                            onChange={(e) => this.ChangeHandler(e)}
                            defaultValue={v.options[1]}
                          />
                        );
                      })}
                  {tpInfo.map((v, k) => {
                    //console.log(v, k);
                    return v.options === null || v.options === undefined ? (
                      <CustomTextBox
                        key={"tp_text" + k}
                        dim={v.dim}
                        id={v.id}
                        type={v.type}
                        maxLength={v.maxLength}
                        title={v.title}
                        onChange={(e) => this.ChangeHandler(e)}
                        isMandatory={v.isMandatory}
                        placeholder={v.placeholder}
                        disable={v.disable}
                        val={v.val}
                        handleChange={this.handleChangeT}
                      />
                    ) : (
                      <CustomDropDownBox
                        dim={v.dim}
                        id={v.id}
                        title={v.title}
                        isMandatory={v.isMandatory}
                        placeholder={v.placeholder}
                        disable={v.disable}
                        options={
                          v.id === "pm_district_en" &&
                          this.state.pm_division_en !== undefined
                            ? mappedDistrict(this.state.pm_division_en)
                            : v.id === "pm_upozila_en" &&
                              this.state.pm_division_en !== undefined &&
                              this.state.pm_district_en !== undefined
                            ? findUpozella(
                                this.state.pm_division_en,
                                this.state.pm_district_en
                              )
                            : v.options
                        }
                      />
                    );
                  })}
                  <div className="form-header">
                    <h3 className="box-title">Professional Address</h3>
                  </div>
                  {listofProfession.map((v, k) => {
                    //console.log(v, k);
                    return (
                      <CustomTextBox
                        key={k}
                        dim={v.dim}
                        id={v.id}
                        type={v.type}
                        maxLength={v.maxLength}
                        title={v.title}
                        onChange={(e) => this.ChangeHandler(e)}
                        isMandatory={v.isMandatory}
                        placeholder={v.placeholder}
                        disable={v.disable}
                        val={this.state[v.id]}
                      />
                    );
                  })}
                  <div className="form-header">
                    <h3 className="box-title">Introducer Information</h3>
                  </div>
                  {listofIntroducer.map((v, k) => {
                    //console.log(v, k);
                    return (
                      <CustomTextBox
                        key={k}
                        dim={v.dim}
                        id={v.id}
                        type={v.type}
                        maxLength={v.maxLength}
                        title={v.title}
                        isMandatory={v.isMandatory}
                        placeholder={v.placeholder}
                        onChange={(e) => this.ChangeHandler(e)}
                        disable={v.disable}
                        val={this.state[v.id]}
                      />
                    );
                  })}
                  {/* <div className="row justify-content-md-center">
                  <div className="col-md-12">
                    <div className="form-header">
                      <h3 className="box-title">Signature</h3>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <Signature
                      fname={this.state.firstName}
                      lname={this.state.lastName}
                      capturefuncName={window.capture}
                      clearfuncName={window.clearSignature}
                      signatureData={this.captureSignatureb64}
                    />
                  </div>
                </div> */}
                  <div className="row justify-content-between">
                    <div className="col-md-12">
                      <div className="form-header">
                        <h3 className="box-title">Documents</h3>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group p-col-12 mb-0">
                        <label>Signature Photo</label>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-success btn-block mb-1"
                        onClick={() =>
                          this.setState({
                            modalShowSign: true,
                            padClick: false,
                          })
                        }
                      >
                        Signature
                      </button>
                      <img
                        src={
                          this.state.capturedSignature !== null &&
                          this.state.capturedSignature !== undefined &&
                          this.state.submitSign === true
                            ? "data:image/png;base64," +
                              this.state.capturedSignature
                            : process.env.PUBLIC_URL + "/dummy-img.jpg"
                        }
                        className="mx-auto d-block"
                        alt="Signature Photo"
                        style={{
                          width: "100%",
                          border: "1px solid #ffffff",
                          maxHeight: "200px",
                        }}
                      />
                    </div>
                    <div className="col-md-4">
                      <div className="form-group p-col-12 mb-0">
                        <label>NID Front Photo</label>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-success btn-block mb-1"
                        onClick={() => this.setState({ modalShowFront: true })}
                      >
                        NID Front
                      </button>
                      <img
                        src={
                          this.state.nidFrontbase64 !== null &&
                          this.state.nidFrontbase64 !== undefined &&
                          this.state.submitFront === true
                            ? "data:image/png;base64," +
                              this.state.nidFrontbase64
                            : process.env.PUBLIC_URL + "/dummy-img.jpg"
                        }
                        className="mx-auto d-block"
                        alt="NID Front Photo"
                        style={{
                          width: "100%",
                          border: "1px solid #ffffff",
                          maxHeight: "200px",
                        }}
                      />
                    </div>
                    <div className="col-md-4">
                      <div className="form-group p-col-12 mb-0">
                        <label>NID Back Photo</label>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-success btn-block mb-1"
                        onClick={() => this.setState({ modalShowBack: true })}
                      >
                        NID Back
                      </button>
                      <img
                        src={
                          this.state.nidBackbase64 !== null &&
                          this.state.nidBackbase64 !== undefined &&
                          this.state.submitBack === true
                            ? "data:image/png;base64," +
                              this.state.nidBackbase64
                            : process.env.PUBLIC_URL + "/dummy-img.jpg"
                        }
                        className="mx-auto d-block"
                        alt="NID Back Photo"
                        style={{
                          width: "100%",
                          border: "1px solid #ffffff",
                          maxHeight: "200px",
                        }}
                      />
                    </div>
                    {/* <div className="col-md-4">
                      <DocumentUploader
                        name="NID Front Photo"
                        id="nidFront"
                        cross="nidFrontCross"
                        handleLock={() => this._handleImageChange("front")}
                        //handleLock={(e) => this._handlePhoto(e)}
                        brandfileNameToShow={this.state.nidFrontToShow}
                        parentCall={() => {
                          this.resetNidFront();
                        }}
                      />
                      {$nidFrontView}
                    </div> */}
                    {/* <div className="col-md-4">
                      <DocumentUploader
                        name="NID Back Photo"
                        id="nidBack"
                        cross="nidBackCross"
                        handleLock={() => this._handleImageChange("back")}
                        //handleLock={(e) => this._handlePhoto(e)}
                        brandfileNameToShow={this.state.nidBackToShow}
                        parentCall={() => {
                          this.resetNidBack();
                        }}
                      />
                      {$nidBackView}
                    </div> */}
                  </div>
                </div>
                <div
                  className="col-md-12 mt-5 pb-3"
                  style={{ textAlign: "center" }}
                >
                  {/* <Link to="/nominee-information"> */}
                  <button className="btn btn-success">
                    {" "}
                    Save And Continue
                  </button>
                  {/* </Link> */}
                </div>
              </form>
              {/* </form> */}
              <PopUp
                modalShow={this.state.modalShow}
                onHide={this.modalHideHandler}
                modalHideHandler={this.modalHideHandler}
                modalHeading="Document Upload"
                modalBody={docSubmitOption}
                submitHandler={() => {
                  this.submitHandler();
                }}
              />
              <PopUp
                modalShow={this.state.modalShowSign}
                onHide={this.modalHideHandlerSign}
                modalHideHandler={this.modalHideHandlerSign}
                modalHeading="Signature Upload"
                modalBody={docSubmitOptionSign}
                submitHandler={() => {
                  this.submitHandlerSign();
                }}
              />
              <PopUp
                modalShow={this.state.modalShowFront}
                onHide={this.modalHideHandlerFront}
                modalHideHandler={this.modalHideHandlerFront}
                modalHeading="NID Front Upload"
                modalBody={docSubmitOptionFront}
                submitHandler={() => {
                  this.submitHandlerFront();
                }}
              />
              <PopUp
                modalShow={this.state.modalShowBack}
                onHide={this.modalHideHandlerBack}
                modalHideHandler={this.modalHideHandlerBack}
                modalHeading="NID Back Upload"
                modalBody={docSubmitOptionBack}
                submitHandler={() => {
                  this.submitHandlerBack();
                }}
              />
            </div>
            <Loader
              loaderShow={this.state.loaderShow}
              onHide={() => {}}
              loaderText={this.state.loaderText}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PersonalInformation;
