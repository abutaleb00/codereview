import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import PopUp from "../components/PopUp";
import DocumentUploader from "../components/DocumentUploader";
import camera from "../user-pages/camera.js";
import { nomineeInfo, nomineeParent } from "../components/extra.js";
import DateBox from "../components/DateBox";
const userImg1 = require("../../assets/images/dummy-img.jpg");

class CustomTextBox extends React.Component {
  constructor(props) {
    super(props);
    window.nomineelInformation.transferData(props.id, props.val);
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
      if (e.target.id === "sharePercentage") {
        if (Number(e.target.value) < 101) {
          window.nomineelInformation.transferData(e.target.id, e.target.value);
        }
      } else {
        window.nomineelInformation.transferData(e.target.id, e.target.value);
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
            className="form-control"
            id={this.props.id}
            placeholder={this.props.placeholder}
            autoComplete="off"
            onChange={(e) => this.ChangeHandler(e)}
            disabled={this.props.disable ? true : false}
            required={this.props.isMandatory}
            value={this.props.val}
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
    window.nomineelInformation.transferData(props.id, props.options[0].value);
  }
  ChangeHandler = (e) => {
    console.log(e.target.value);
    window.nomineelInformation.transferData(e.target.id, e.target.value);
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
          >
            {this.props.options.map((v, k) => {
              //console.log(v);
              return (
                <option key={v.id + "_" + k} id={v.id} value={v.value}>
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

export class NomineeInformation extends Component {
  constructor(props) {
    super(props);
    window.nomineelInformation = this;

    // let splittedName = convertedData.fullNameEn.split(" ", 2);
    this.state = {
      modalShow: false,
      option1: true,
      option2: false,
      submitPhoto: false,
      listofNominee: [
        // {
        //   name: "",
        //   dob: "",
        //   relationship: "",
        //   identifierNumber: "",
        //   identifierType: 3,
        //   sharePercentage: 100.0,
        //   photobase64: null,
        // },
      ],
    };
    // this._handlePhoto = this._handlePhoto.bind(this);
  }
  modalShowHandler = () => {
    this.setState({ modalShow: true });
  };
  modalHideHandler = () => {
    this.setState({ modalShow: false, option1: true }, () => {
      // camera.stopCamera();
    });
  };

  nomineeData = () => {
    let data = { ...this.state };
    return data;
  };

  transferData = (k, v) => {
    //console.log(k, v);
    this.setState({ [k]: v });
  };

  ChangeHandler = (date) => {
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
      dob: stringDate,
    });
  };

  calculate_age = (e) => {
    var today = new Date();
    var selectDate = this.state.dob; // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - selectDate.getFullYear();
    var m = today.getMonth() - selectDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < selectDate.getDate())) {
      age_now--;
    }
    console.log("now", selectDate);
    return age_now;
  };

  submitNominee = (e) => {
    e.preventDefault();

    let nominee = {
      name: this.state.name,
      dob: this.state.dob,
      identifierType:
        this.state.identifierType === 3 || this.state.identifierType === "3"
          ? 3
          : this.state.identifierType === 5 || this.state.identifierType === "5"
          ? 5
          : 3,
      identifierNumber: this.state.identifierNumber,
      relationship: this.state.relationship,
      sharePercentage: this.state.sharePercentage,
      photobase64: this.state.ownbase64,
    };

    let newList = [...this.state.listofNominee, nominee];
    this.setState({
      listofNominee: newList,
      name: "",
      dob: "",
      identifierType: "",
      identifierNumber: "",
      relationship: "",
      sharePercentage: "",
      ownbase64: null,
    });
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
  captureSignatureb64 = (data) => {
    this.setState({ capturedSignature: data.substring(22) });
  };

  resetPhoto = () => {
    this.setState({
      photoFile: null,
      photoToShow: undefined,
      photoBase64: null,
    });
  };

  _handleImageChange = (type) => async (e) => {
    e.preventDefault();
    switch (type) {
      case "photo":
        document.getElementById("ownPhotoCross").style.display = "block";
        this._handlePhoto(e);
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
      let result = reader.result;
      if (result.substring(0, 22).includes("jpeg"))
        result = result.substring(23);
      else result = result.substring(22);

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

  callNomineeDob = () => {
    this.setState({
      dob: window.datebox.getNomineeDob(),
      age: window.datebox.getNomineeAge(),
    });
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
    const docSubmitOption = (
      <>
        {this.state.option1 === true ? (
          <>{uploadOption}</>
        ) : (
          <>{this.state.option2 === true ? <>{webCam}</> : <>{fileUpload}</>}</>
        )}
      </>
    );

    return (
      <div className="row proBanner mt-3">
        <div className="col-12">
          <div className="card">
            {this.props.titleToShow !== undefined &&
            this.props.titleToShow === false ? (
              ""
            ) : (
              <h4 className="card-title">Nominee Information</h4>
            )}

            <div className="card-body">
              {/* <form> */}
              <div className="col-md-12">
                <form onSubmit={this.submitNominee}>
                  <div className="row justify-content-md-center mb-2">
                    <div
                      className="col-md-12 mb-4"
                      style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    >
                      <h6 style={{ paddingLeft: "15px" }}>
                        Selected Nominee's
                      </h6>
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Relationship</th>
                            <th>Share Percentage</th>
                            <th>Identifier Type</th>
                            <th>Identifier Number</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.listofNominee.map((nomine, k) => (
                            // {nomine.name=null ? "": }
                            <tr
                              key={k}
                              onClick={() => {
                                //console.log("check", nomine.target.value);
                                this.setState(
                                  {
                                    //listofNominee: newList,
                                    name: nomine.name,
                                    dob: nomine.dob,
                                    identifierType:
                                      nomine.identifierType === "3" ||
                                      nomine.identifierType === 3
                                        ? 3
                                        : 5,
                                    identifierNumber: nomine.identifierNumber,
                                    relationship: nomine.relationship,
                                    sharePercentage: nomine.sharePercentage,
                                    ownbase64: nomine.photobase64,
                                  },
                                  () => {}
                                );
                              }}
                            >
                              <td>{nomine.name}</td>
                              <td>{nomine.dob}</td>
                              <td>{nomine.relationship}</td>
                              <td>{nomine.sharePercentage}</td>
                              <td>
                                {nomine.identifierType === "3" ||
                                nomine.identifierType === 3
                                  ? "Nid"
                                  : "Passport"}
                              </td>
                              <td>{nomine.identifierNumber}</td>
                              <td>
                                <i
                                  className="mdi mdi-close-box"
                                  style={{ color: "red" }}
                                  onClick={() => {
                                    let newList = [...this.state.listofNominee];
                                    newList = newList.filter(
                                      (n) =>
                                        n.identifierNumber !==
                                        nomine.identifierNumber
                                    );
                                    this.setState(
                                      {
                                        listofNominee: newList,
                                        name: "",
                                        dob: "",
                                        identifierType: 3,
                                        identifierNumber: "",
                                        relationship: "",
                                        sharePercentage: "",
                                      },
                                      () => {}
                                    );
                                  }}
                                ></i>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
                        Upload Nominee Photo
                      </button>
                    </div>
                    <div className="col-md-8">
                      {nomineeInfo.map((v, k) => {
                        //console.log(v, k);
                        {
                          return v.options === null ||
                            v.options === undefined ? (
                            v.dateFormat === null ||
                            v.dateFormat === undefined ? (
                              <CustomTextBox
                                key={"nominee_text" + k}
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
                            ) : (
                              <DateBox
                                key={"nominee_date" + k}
                                dim={v.dim}
                                id={v.id}
                                title={v.title}
                                isMandatory={v.isMandatory}
                                placeholder={v.placeholder}
                                disable={v.disable}
                                callparent={this.callNomineeDob}
                                //val={this.state[v.id]}
                              />
                            )
                          ) : (
                            <CustomDropDownBox
                              key={"nominee_drop" + k}
                              dim={v.dim}
                              id={v.id}
                              title={v.title}
                              isMandatory={v.isMandatory}
                              placeholder={v.placeholder}
                              disable={v.disable}
                              options={v.options}
                              // val={}
                            />
                          );
                        }
                      })}
                    </div>
                    {this.state.age < 18 ? (
                      <div className="col-md-12">
                        <p
                          style={{
                            margin: "10px",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          <span style={{ color: "red", paddingRight: "5px" }}>
                            *
                          </span>
                          If Nominee Age less than 18, please fill up below
                          Guardian Information
                        </p>
                        {nomineeParent.map((v, k) => {
                          //console.log(v, k);
                          {
                            return v.options === null ||
                              v.options === undefined ? (
                              v.dateFormat === null ||
                              v.dateFormat === undefined ? (
                                <CustomTextBox
                                  key={"nominee_text" + k}
                                  type={v.type}
                                  maxLength={v.maxLength}
                                  dim={v.dim}
                                  id={v.id}
                                  title={v.title}
                                  onChange={(e) => this.ChangeHandler(e)}
                                  isMandatory={v.isMandatory}
                                  placeholder={v.placeholder}
                                  disable={v.disable}
                                  val={this.state[v.id]}
                                />
                              ) : (
                                <DateBox
                                  key={"nominee_date" + k}
                                  dim={v.dim}
                                  id={v.id}
                                  title={v.title}
                                  isMandatory={v.isMandatory}
                                  placeholder={v.placeholder}
                                  disable={v.disable}
                                  callparent={this.callNomineeDob}
                                  //val={this.state[v.id]}
                                />
                              )
                            ) : (
                              <CustomDropDownBox
                                key={"nominee_drop" + k}
                                dim={v.dim}
                                id={v.id}
                                title={v.title}
                                isMandatory={v.isMandatory}
                                placeholder={v.placeholder}
                                disable={v.disable}
                                options={v.options}
                                // val={}
                              />
                            );
                          }
                        })}
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="col-md-12 text-center mt-4">
                      <button
                        className="btn btn-success"
                        type="submit"

                        // onClick={(e) => {
                        //   e.preventDefault();

                        //   let nominee = {
                        //     name: this.state.name,
                        //     dob: this.state.dob,
                        //     identifierType:
                        //       this.state.identifierType === 3 ||
                        //       this.state.identifierType === "3"
                        //         ? 3
                        //         : this.state.identifierType === 5 ||
                        //           this.state.identifierType === "5"
                        //         ? 5
                        //         : 3,
                        //     identifierNumber: this.state.identifierNumber,
                        //     relationship: this.state.relationship,
                        //     sharePercentage: this.state.sharePercentage,
                        //     photobase64: this.state.ownbase64,
                        //   };
                        //   if (
                        //     this.state.name === "" ||
                        //     this.state.name === undefined
                        //   ) {
                        //     confirmAlert({
                        //       title: "Error Message",
                        //       message: (
                        //         <p className="mod-p">
                        //           {" "}
                        //           Nominee Name field can't be empty{" "}
                        //         </p>
                        //       ),
                        //       buttons: [
                        //         {
                        //           label: "Ok",
                        //           onClick: () => {},
                        //         },
                        //       ],
                        //       closeOnClickOutside: false,
                        //     });
                        //   } else {
                        //     let newList = [...this.state.listofNominee, nominee];
                        //     this.setState({
                        //       listofNominee: newList,
                        //       name: "",
                        //       dob: "",
                        //       identifierType: "",
                        //       identifierNumber: "",
                        //       relationship: "",
                        //       sharePercentage: "",
                        //     });
                        //   }
                        // }}
                      >
                        {" "}
                        Add to Nominee List
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {this.props.fromaccordian !== undefined &&
              this.props.fromaccordian === false ? (
                <div
                  className="col-md-12 mt-5 pb-3"
                  style={{ textAlign: "center" }}
                >
                  {/* <Link to="/nominee-information"> */}
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      let dataToSend = { ...this.state };
                      console.log(dataToSend);
                      // instance
                      //   .post(baseURL + "/captureProfileData", dataToSend)
                      //   .then((res) => {
                      //     console.log(res);
                      //   });
                    }}
                  >
                    {" "}
                    Save And Continue
                  </button>
                  {/* </Link> */}
                </div>
              ) : (
                ""
              )}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NomineeInformation;
