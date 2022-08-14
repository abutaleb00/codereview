import React, { Component } from "react";
import { instance, baseURL, errorCompute } from "../service/ApiUrls";
import Signature from "../components/Signature";
import PopUp from "../components/PopUp";
import Loader from "../components/Loader";
import DocumentUploader from "../components/DocumentUploader";
import camera from "../user-pages/camera.js";
import { confirmAlert } from "react-confirm-alert";
import DatePicker from "react-datepicker";
import {
  listofFirst,
  listofSecond,
  listofThird,
  listofFour,
  convertecDataToPI,
  listofIntroducer,
  listofProfession,
  listofTransaction,
  passportFour,
  passportThird,
  tpbusiness,
  tpService,
} from "../components/passport.js";
import { mappedDistrict } from "../data/division";
// import { mappedUpazila } from "../data/upazila";
import { findUpozella } from "../data/upozillamapped";
const userImg1 = require("../../assets/images/dummy-img.jpg");

class CustomTextBox extends React.Component {
  constructor(props) {
    super(props);
    if (props.Address !== undefined) {
      window.PassportInformation.transferAddressData(
        props.id,
        props.val,
        props.Address === "present" ? true : false
      );
    } else {
      window.PassportInformation.transferData(props.id, props.val);
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
        window.PassportInformation.transferAddressData(
          e.target.id,
          e.target.value,
          this.props.Address === "present" ? true : false
        );
      } else {
        window.PassportInformation.transferData(e.target.id, e.target.value);
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
            maxLength={this.props.maxLength}
            pattern={this.props.type === "tel" ? "[0-9]" : null}
            className="form-control"
            id={this.props.id}
            placeholder={this.props.placeholder}
            onChange={(e) => this.ChangeHandler(e)}
            disabled={this.props.disable ? true : false}
            value={this.props.val}
            required={this.props.isMandatory}
            autoComplete="off"
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
    window.PassportInformation.transferData(props.id, props.options[0].value);
  }
  ChangeHandler = (e) => {
    //console.log(e.target.value);
    window.PassportInformation.transferData(e.target.id, e.target.value);
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

export class PassportInformation extends Component {
  constructor(props) {
    super(props);
    window.PassportInformation = this;

    let convertedData = convertecDataToPI({ ...props.location.state });
    // let splittedName =
    //   convertedData.fullNameEn !== undefined &&
    //   convertedData.fullNameEn.split(" ", 2);
    this.state = {
      firstName: "",
      lastName: "",
      modalShow: false,
      modalShowSign: false,
      option1: true,
      option2: false,
      option3: true,
      option4: false,
      padClick: false,
      submitPhoto: false,
      professionT: "Service",
      documentType: props.location.state.document,
      ...convertedData,
      loaderShow: false,
      loaderText: "Loading...",
      dob: new Date(),
      expairedDate: new Date(),
      documentNo: "",
      pm_country: "bd",
      pr_country: "bd",
    };
    // this._handlePhoto = this._handlePhoto.bind(this);
    // this._handlePassport = this._handlePassport.bind(this);
    // this._signPhoto = this._signPhoto.bind(this);
    this.getMobileNumber();
  }
  loaderHide = () => {
    this.setState({ loaderShow: false });
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
  modalHideHandlerSign = () => {
    this.setState({ modalShowSign: false, option3: true }, () => {
      // camera.stopCamera();
    });
  };
  modalHideHandler = () => {
    this.setState({ modalShow: false, option1: true }, () => {
      // camera.stopCamera();
    });
  };
  handleChangeExpired = (date) => {
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
    let stringDate = dt + "-" + month + "-" + year;
    console.log(year + "-" + month + "-" + dt);
    this.setState({
      expairedDate: stringDate,
    });
  };
  handleChange = (date) => {
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
    let stringDate = dt + "-" + month + "-" + year;
    console.log(year + "-" + month + "-" + dt);
    this.setState({
      dob: stringDate,
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
    this.setState({ [k]: v }, () => {
      if (k === "fullNameEn") {
        let split = v.split(" ", 2);
        this.setState({ firstName: split[0], lastName: split[1] });
      }
    });
  };

  ChangeHandler = (e) => {
    //console.log(this.state);
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
  // captureSignatureb64 = (data) => {
  //   if (data !== undefined && data !== null) {
  //     this.setState({ capturedSignature: data.substring(22) });
  //   }
  // };

  dataSubmit = (e) => {
    e.preventDefault();
    this.setState({ loaderShow: true }, () => {
      console.log(this.state);
      let dataToSend = {
        fullNameEn: this.state.firstName + " " + this.state.lastName,
        personalInformation: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          fullNameEn: this.state.firstName + " " + this.state.lastName,
          father: this.state.father,
          mother: this.state.mother,
          spouse: this.state.spouse,
          nationality: this.state.nationality,
          gender: this.state.gender,
          maritalStatus: this.state.maritalStatus,
          tinNo: this.state.tinNo,
          fullNameBn: this.state.fullNameBn,
          mobile: this.state.mobile,
          email: this.state.email,
          documentType: this.state.documentType,
          documentNo: this.state.documentNo,
          passportNumber: this.state.documentNo,
          expairedDate: this.state.expairedDate,
          dob: this.state.dob,
          // padClick: this.state.padClick,
        },

        ownbase64: this.state.ownbase64,
        passportbase64: this.state.passportbase64,
        passportToShow: this.state.passportToShow,
        capturedSignature: this.state.capturedSignature,
        isCapturedSignatureBool: this.state.padClick,
        // nidFrontbase64: "",
        // nidBackbase64: "",
        permanentAddress: {
          country: this.state.pm_country,
          division_en: this.state.pm_division_en,
          district_en: this.state.pm_district_en,
          upozila_en: this.state.pm_upozila_en,
          cityCorporationOrMunicipality:
            this.state.permanentAddress.pm_cityCorporationOrMunicipality,
          unionOrWard_en: this.state.permanentAddress.pm_unionOrWard_en,
          postOffice: this.state.permanentAddress.pm_postOffice,
          postalCode: this.state.permanentAddress.pm_postalCode,
          additionalMouzaOrMoholla:
            this.state.permanentAddress.pm_additionalMouzaOrMoholla,
          additionalVillageOrRoad:
            this.state.permanentAddress.pm_additionalVillageOrRoad,
          homeOrHoldingNo: this.state.permanentAddress.pm_homeOrHoldingNo,
        },
        presentAddress: {
          country: this.state.pr_country,
          division_en: this.state.pr_division_en,
          district_en: this.state.pr_district_en,
          upozila_en: this.state.pr_upozila_en,
          cityCorporationOrMunicipality:
            this.state.presentAddress.pr_cityCorporationOrMunicipality,
          unionOrWard_en: this.state.presentAddress.pr_unionOrWard_en,
          postOffice: this.state.presentAddress.pr_postOffice,
          postalCode: this.state.presentAddress.pr_postalCode,
          additionalMouzaOrMoholla:
            this.state.presentAddress.pr_additionalMouzaOrMoholla,
          additionalVillageOrRoad:
            this.state.presentAddress.pr_additionalVillageOrRoad,
          homeOrHoldingNo: this.state.presentAddress.pr_homeOrHoldingNo,
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
          sourceofFund: this.state.sourceofFund,
          monthlyIncome: Number(this.state.monthlyIncome),
        },
      };
      console.log("submit", dataToSend);
      // let dataToSend = {
      //   ...this.state,
      //   documentType: "5",
      //   identifierNumber: this.state.passportNumber,
      //   transactionProfile: {
      //     proffession: "Service",
      //     sourceofFund: "own",
      //     monthlyIncome: 123456,
      //   },
      // };
      if (
        this.state.ownbase64 !== undefined &&
        this.state.ownbase64 !== null &&
        this.state.passportbase64 !== undefined &&
        this.state.passportbase64 !== null
      ) {
        instance
          .post(baseURL + "/captureProfileData", dataToSend)
          .then((res) => {
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
          })
          .catch((err) => {
            this.setState({ loaderShow: false });
            errorCompute(err);
          });
      } else {
        this.setState({ loaderShow: false }, () => {
          confirmAlert({
            title: "Error Message",
            message: <p className="mod-p"> Photos Can't be Empty </p>,
            buttons: [
              {
                label: "Ok",
                onClick: () => {},
              },
            ],
          });
        });
      }
    });
  };
  captureSignatureb64 = (data) => {
    this.setState({ capturedSignature: data?.substring(22), padClick: true });
  };

  resetPhoto = () => {
    this.setState({
      photoFile: null,
      photoToShow: undefined,
      photoBase64: null,
    });
  };
  resetPassport = () => {
    this.setState({
      frontFile: null,
      passportToShow: undefined,
      passportbase64: null,
    });
  };
  resetSignature = () => {
    this.setState({
      signFile: null,
      signToShow: undefined,
      captureSignatureb64: null,
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
        document.getElementById("passportCross").style.display = "block";
        this._handlePassport(e);
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
  _handlePassport = (e) => {
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
          passportToShow: file.name,
          passportbase64: result,
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
      this.state.passportbase64 !== null &&
      this.state.passportbase64 !== undefined &&
      this.state.passportbase64;
    let $passportView = null;
    // $imagePreview = (imagePreviewUrl)
    $passportView = (
      <img
        src={
          this.state.passportbase64 !== undefined &&
          this.state.passportbase64 !== userImg1 &&
          this.state.passportbase64 !== null
            ? `data:image/jpeg;base64,${this.state.passportbase64}`
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
    return (
      <div className="row proBanner">
        <div className="col-12">
          <div className="card">
            <h4 className="card-title">Personal Information</h4>
            <div className="card-body">
              <form onSubmit={this.dataSubmit}>
                <div className="col-md-12">
                  <div className="row align-items-start mb-2">
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
                        className="btn btn-success mt-1"
                        onClick={() => this.setState({ modalShow: true })}
                      >
                        Upload Photo
                      </button>
                    </div>
                    <div className="col-md-8">
                      <div className="col-md-6  d-inline-block">
                        <div className="form-group">
                          <label htmlFor="documentNo">
                            {this.state.documentType === 5
                              ? "Passport"
                              : this.state.documentType === 8
                              ? "Driving License"
                              : this.state.documentType === 10
                              ? "PAN / Aadhar Card"
                              : "Birth Certificate"}{" "}
                            Number <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="nid_no"
                            autoComplete="off"
                            maxLength={40}
                            placeholder={
                              this.state.documentType === 5
                                ? "Enter Passport Number"
                                : this.state.documentType === 8
                                ? "Enter Driving License No"
                                : this.state.documentType === 10
                                ? "Enter PAN / Aadhar Card No"
                                : "Birth Certificate No"
                            }
                            onChange={(e) => {
                              this.setState({ documentNo: e.target.value });
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6  d-inline-block">
                        <div className="form-group">
                          <label htmlFor="issueDate">
                            Expiry Date <span style={{ color: "red" }}>*</span>
                          </label>
                          <div className="input-group date">
                            <DatePicker
                              className="form-control"
                              //selected={this.state.issueDate}
                              utcOffset={6}
                              onChange={this.handleChangeExpired}
                              dateFormat="Pp"
                              value={this.state.expairedDate}
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              required
                              placeholderText="Enter Expiry Date"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6  d-inline-block">
                        <div className="form-group">
                          <label htmlFor="issueDate">
                            Date of Birth{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <div className="input-group date">
                            <DatePicker
                              className="form-control"
                              //selected={this.state.issueDate}
                              utcOffset={6}
                              onChange={this.handleChange}
                              dateFormat="Pp"
                              value={this.state.dob}
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              required
                              placeholderText="Enter Date of Birth"
                            />
                          </div>
                        </div>
                      </div>
                      {listofFirst.map((v, k) => {
                        //console.log(v, k);
                        return (
                          <CustomTextBox
                            key={k}
                            dim={v.dim}
                            type={v.type}
                            maxLength={v.maxLength}
                            id={v.id}
                            title={v.title}
                            onChange={(e) => this.ChangeHandler(e)}
                            isMandatory={v.isMandatory}
                            placeholder={v.placeholder}
                            disable={v.disable}
                            val={this.state[v.id]}
                          />
                        );
                      })}
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
                          val={
                            v.id === "fullNameEn"
                              ? this.state.firstName + " " + this.state.lastName
                              : this.state[v.id]
                          }
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
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <select
                        className="form-control"
                        id="pr_country"
                        onChange={(e) =>
                          this.setState({ pr_country: e.target.value })
                        }
                        defaultValue="bd"
                      >
                        <option id="bd" value="bd">
                          Bangladesh
                        </option>
                        <option id="ind" value="ind">
                          India
                        </option>
                      </select>
                    </div>
                  </div>
                  {this.state.pr_country === "bd" ? (
                    <>
                      {listofThird.map((v, k) => {
                        //console.log(v, k);
                        {
                          return v.options === null ||
                            v.options === undefined ? (
                            <CustomTextBox
                              key={k}
                              dim={v.dim}
                              id={v.id}
                              type={v.type}
                              maxLength={v.maxLength}
                              title={v.title}
                              isMandatory={v.isMandatory}
                              onChange={(e) => this.ChangeHandler(e)}
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
                                v.id === "pr_district_en" &&
                                this.state.pr_division_en !== undefined
                                  ? mappedDistrict(this.state.pr_division_en)
                                  : v.id === "pr_upozila_en" &&
                                    this.state.pr_division_en !== undefined &&
                                    this.state.pr_district_en !== undefined
                                  ? findUpozella(
                                      this.state.pr_division_en,
                                      this.state.pr_district_en
                                    )
                                  : v.options
                              }
                            />
                          );
                        }
                      })}
                    </>
                  ) : (
                    <>
                      {passportThird.map((v, k) => {
                        //console.log(v, k);
                        {
                          return v.options === null ||
                            v.options === undefined ? (
                            <CustomTextBox
                              key={k}
                              dim={v.dim}
                              type={v.type}
                              maxLength={v.maxLength}
                              id={v.id}
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
                                v.id === "pr_district_en" &&
                                this.state.pr_division_en !== undefined
                                  ? mappedDistrict(this.state.pr_division_en)
                                  : v.id === "pr_upozila_en" &&
                                    this.state.pr_division_en !== undefined &&
                                    this.state.pr_district_en !== undefined
                                  ? findUpozella(
                                      this.state.pr_division_en,
                                      this.state.pr_district_en
                                    )
                                  : v.options
                              }
                            />
                          );
                        }
                      })}
                    </>
                  )}

                  <div className="form-header">
                    <h3 className="box-title">Permanent Address</h3>
                  </div>
                  <div className="col-md-4 d-inline-block">
                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <select
                        className="form-control"
                        id="pm_country"
                        onChange={(e) =>
                          this.setState({ pm_country: e.target.value })
                        }
                        defaultValue="bd"
                      >
                        <option id="bd" value="bd">
                          Bangladesh
                        </option>
                        <option id="ind" value="ind">
                          India
                        </option>
                      </select>
                    </div>
                  </div>
                  {this.state.pm_country === "bd" ? (
                    <>
                      {listofFour.map((v, k) => {
                        //console.log(v, k);
                        {
                          return v.options === null ||
                            v.options === undefined ? (
                            <CustomTextBox
                              key={k}
                              dim={v.dim}
                              id={v.id}
                              type={v.type}
                              maxLength={v.maxLength}
                              title={v.title}
                              isMandatory={v.isMandatory}
                              onChange={(e) => this.ChangeHandler(e)}
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
                        }
                      })}
                    </>
                  ) : (
                    <>
                      {passportFour.map((v, k) => {
                        //console.log(v, k);
                        {
                          return v.options === null ||
                            v.options === undefined ? (
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
                        }
                      })}
                    </>
                  )}

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
                  {listofTransaction.map((v, k) => {
                    //console.log(v, k);
                    return (
                      <CustomTextBox
                        key={k}
                        dim={v.dim}
                        type={v.type}
                        maxLength={v.maxLength}
                        id={v.id}
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
                    <h3 className="box-title">Professional Address</h3>
                  </div>
                  {listofProfession.map((v, k) => {
                    //console.log(v, k);
                    return (
                      <CustomTextBox
                        key={k}
                        dim={v.dim}
                        type={v.type}
                        maxLength={v.maxLength}
                        id={v.id}
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
                        type={v.type}
                        maxLength={v.maxLength}
                        id={v.id}
                        title={v.title}
                        onChange={(e) => this.ChangeHandler(e)}
                        isMandatory={v.isMandatory}
                        placeholder={v.placeholder}
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
                  <div className="row justify-content-start">
                    <div className="col-md-12">
                      <div className="form-header">
                        <h3 className="box-title">Documents</h3>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="documnet_type">
                          Select Document Type
                        </label>
                        <select
                          className="form-control form-control-sm"
                          id="documentType"
                          onChange={(e) =>
                            this.setState({
                              document: e.target.value,
                            })
                          }
                          defaultValue={this.state.documentType}
                          disabled
                        >
                          <option value="5">Passport</option>
                          <option value="6">
                            Birth Registration Certificate
                          </option>
                          <option value="8">Driving License</option>
                          <option value="10">PAN Card / Aadhar Card</option>
                        </select>
                      </div>
                      <DocumentUploader
                        name=""
                        id="passport"
                        cross="passportCross"
                        handleLock={() => this._handleImageChange("front")}
                        //handleLock={(e) => this._handlePhoto(e)}
                        brandfileNameToShow={this.state.passportToShow}
                        parentCall={() => {
                          this.resetPassport();
                        }}
                      />
                      {$passportView}
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
                  </div>
                </div>
                <div
                  className="col-md-12 mt-5 pb-3"
                  style={{ textAlign: "center" }}
                >
                  {/* <Link to="/nominee-information"> */}
                  <button
                    className="btn btn-success"
                    // onClick={(e) => {

                    // }}
                  >
                    {" "}
                    Save And Continue
                  </button>
                  {/* </Link> */}
                </div>
              </form>
              <Loader
                loaderShow={this.state.loaderShow}
                onHide={this.loaderHide}
                loaderText={this.state.loaderText}
              />
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PassportInformation;
