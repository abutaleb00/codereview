import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TextBox from "../components/TextBox";
import Loader from "../components/Loader";
import {
  listofFirst,
  listofSecond,
  listofThird,
  listofForth,
  listofThirdEdit,
  passportPresent,
  passportPermanent,
  listofProfession,
  listofIntroducer,
} from "../components/customers";
import "react-tabs/style/react-tabs.css";
import { DOCUMENTCHECKLIST } from "../Enum";
import { instance, errorCompute } from "../service/ApiUrls";
import { baseURL } from "../service/ApiService";
import { confirmAlert } from "react-confirm-alert";

export class CustomerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.location.state.datToload,
      loaderShow: false,
      loaderText: "Loading....",
      isEdit: false,
    };
    // this._handleFile = this._handleFile.bind(this);
  }
  callGetCustomerDetail = () => {
    this.setState({ loaderShow: true }, () => {
      instance
        .post(
          baseURL + "/getCustomerProfile/" + this.state.cp.id + "?withPic=true"
        )
        .then((res) => {
          if (res.data.result.error === false) {
            this.setState({ ...res.data.data, loaderShow: false }, () => {
              this.convertDocumentLists();
            });
          } else if (res.data.result.error === true) {
            this.setState({ loaderShow: false }, () => {
              confirmAlert({
                title: "Error Message",
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
        .catch((err) => console.log(err));
    });
  };
  _handleFileChange = (type) => async (e) => {
    e.preventDefault();
    switch (type) {
      case "uploadFile":
        document.getElementById("fileCross").style.display = "block";
        this._handleFile(e);
        break;
      default:
        break;
    }
  };

  _handleFile = (e) => {
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
          uploadFile: file,
          fileToShow: file.name,
          filebase64: result,
        },
        () => {
          if (
            this.state.uploadFile !== undefined &&
            this.state.uploadFile !== null
          ) {
            console.log("uploadFile");
            // this.upPictureToServer("lock")(e);
          }
        }
      );
    };
    reader.readAsDataURL(file);
  };
  resetFile = () => {
    this.setState({
      uploadFile: null,
      fileToShow: undefined,
      filebase64: null,
    });
  };

  convertDocumentLists = () => {
    if (this.state.documentDetailList !== null) {
      this.state.documentDetailList.map((v) => {
        if (Number(v.documentType) === DOCUMENTCHECKLIST.PHOTO.value) {
          this.setState({ customerPhoto: v.base64Content });
        } else if (
          Number(v.documentType) === DOCUMENTCHECKLIST.SIGNATURE.value
        ) {
          this.setState({ customerSignature: v.base64Content });
          console.log("signature", this.state.customerSignature);
        } else if (
          Number(v.documentType) === DOCUMENTCHECKLIST.NIDFRONT.value
        ) {
          this.setState({ customerNIDFRONT: v.base64Content });
        } else if (Number(v.documentType) === DOCUMENTCHECKLIST.NIDBACK.value) {
          this.setState({ customerNIDBACK: v.base64Content });
        } else if (
          Number(v.documentType) === DOCUMENTCHECKLIST.PASSPORT.value
        ) {
          this.setState({ customerPASSPORT: v.base64Content });
        } else if (
          Number(v.documentType) === DOCUMENTCHECKLIST.ADHARCARD.value
        ) {
          this.setState({ customerPASSPORT: v.base64Content });
        }
      });
      console.log(this.state.customerPhoto);
    }
  };
  ChangeHandler = (e) => {
    // console.log("Change handler", e.target, this.state.presentAddress);
    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
    let presentAddress = {
      ...this.state.presentAddress,
      [e.target.name]: e.target.value,
    };
    this.setState({ presentAddress: presentAddress }, () =>
      console.log("Set", this.state.presentAddress)
    );
    console.log(this.state.presentAddress);
  };
  submitAddress = (e) => {
    console.log(e);
  };
  callDocumentList = () => {
    instance
      .post(baseURL + "/api/filesusingreferencebase64", null, {
        params: {
          uniquereference:
            this.state.cp.passportDetail !== undefined &&
            this.state.cp.passportDetail !== null
              ? this.state.cp.passportDetail.documentReference
              : null,
        },
      })
      .then((res) => {
        if (res.data.result.error === false) {
          let data = res.data.data;
          //console.log("picdata", data);
          data.map((pic) => {
            this.setState({ customerPASSPORT: pic.base64Content });
          });
        } else {
          this.setState({ loaderShow: false });
        }
      })
      .catch((err) => this.setState({ loaderShow: false }));
  };
  submitAddress = (e) => {
    this.setState({ loaderShow: true }, () => {
      instance
        .post(baseURL + "/updatepresentaddress", this.state.presentAddress)
        .then((res) => {
          console.log(this.state.presentAddress.country);
          if (res.data.result.error === false) {
            this.setState({ loaderShow: false, isEdit: false }, () => {
              confirmAlert({
                title: "Success Message",
                message: (
                  <p className="mod-sp">Present Address Updated Successfully</p>
                ),
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {},
                  },
                ],
                closeOnClickOutside: false,
              });
            });
          } else if (res.data.result.error === true) {
            this.setState({ loaderShow: false }, () => {
              confirmAlert({
                title: "Error Message",
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
        .catch((err) => errorCompute(err));
    });
  };
  componentDidMount() {
    this.callGetCustomerDetail();
    this.callDocumentList();
  }

  render() {
    return (
      <div>
        <div className="row align-items-start proBanner mt-4">
          <div className="col-md-12 mb-2" style={{ textAlign: "right" }}>
            <button
              className="btn btn-secondary"
              onClick={() => {
                this.props.history.push({ pathname: "/customer-list" });
              }}
            >
              <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>{" "}
              Back to Customer List
            </button>
          </div>
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <Tabs>
                  <TabList>
                    <Tab>Personal Information</Tab>
                    <Tab>Present Address</Tab>
                    <Tab>Permanent Address</Tab>
                    <Tab>Professional</Tab>
                    <Tab>Introducer</Tab>
                    <Tab>Documents</Tab>

                    {/* <Tab>Additional Documents</Tab> */}
                  </TabList>

                  <TabPanel>
                    <div
                      className="row justify-content-md-start mb-2 mt-4 p-3"
                      id="submit1"
                    >
                      <div className="col-md-3" style={{ textAlign: "center" }}>
                        <img
                          src={
                            this.state.customerPhoto !== undefined &&
                            this.state.customerPhoto !== null
                              ? `data:image/png;base64,${this.state.customerPhoto}`
                              : process.env.PUBLIC_URL + "/no-image.jpg"
                          }
                          className="rounded mx-auto d-block"
                          alt="user image"
                          width="50%"
                          style={{ maxHeight: "180px" }}
                        />
                      </div>
                      <div className="col-md-9">
                        {listofFirst.map((v, k) => {
                          //console.log(v, k);
                          return (
                            <TextBox
                              key={k}
                              dim={v.dim}
                              id={v.id}
                              type={v.type}
                              maxLength={v.maxLength}
                              title={v.title}
                              isMandatory={v.isMandatory}
                              placeholder={v.placeholder}
                              disable={v.disable}
                              val={
                                v.id === "identityDocId"
                                  ? this.state.cp.identityDocType === 3
                                    ? this.state.cp.nidDetail.nationalId10 !==
                                      null
                                      ? this.state.cp.nidDetail.nationalId10
                                      : this.state.cp.nidDetail.nationalId17
                                    : this.state.cp.passportDetail !==
                                        undefined &&
                                      this.state.cp.passportDetail !== null
                                    ? this.state.cp.passportDetail
                                        .passportNumber
                                    : ""
                                  : this.state.cp[v.id] !== undefined &&
                                    this.state.cp[v.id] !== null
                                  ? this.state.cp[v.id]
                                  : ""
                              }
                            />
                          );
                        })}
                      </div>
                      <div className="col-md-12">
                        <p className="preview-p">Personal Info</p>
                      </div>
                      {listofSecond.map((v, k) => {
                        //console.log(v, k);
                        {
                          return (
                            <TextBox
                              key={k}
                              dim={v.dim}
                              id={v.id}
                              title={v.title}
                              type={v.type}
                              maxLength={v.maxLength}
                              isMandatory={v.isMandatory}
                              placeholder={v.placeholder}
                              disable={v.disable}
                              val={
                                this.state.cp[v.id] !== undefined &&
                                this.state.cp[v.id] !== null
                                  ? this.state.cp[v.id]
                                  : "N/A"
                              }
                            />
                          );
                        }
                      })}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div
                      className="row justify-content-md-start mb-2 mt-4 p-3"
                      id={this.state.isEdit ? "" : "submit1"}
                    >
                      {this.state.isEdit ? (
                        <>
                          {this.state.cp?.identityDocType === 3 ? (
                            <>
                              {listofThirdEdit.map((v, k) => {
                                //console.log(v, k);
                                {
                                  return (
                                    <TextBox
                                      key={k}
                                      dim={v.dim}
                                      id={v.id}
                                      type={v.type}
                                      maxLength={v.maxLength}
                                      name={v.id}
                                      title={v.title}
                                      isMandatory={v.isMandatory}
                                      placeholder={v.placeholder}
                                      disable={v.disable}
                                      val={
                                        this.state.presentAddress[v.id] !==
                                          undefined &&
                                        this.state.presentAddress[v.id] !== null
                                          ? this.state.presentAddress[v.id]
                                          : "N/A"
                                      }
                                      ChangeHandler={(e) =>
                                        this.ChangeHandler(e)
                                      }
                                    />
                                  );
                                }
                              })}
                              <div
                                className="col-md-12 mt-2"
                                style={{ textAlign: "right" }}
                              >
                                <button
                                  className="btn btn-danger mr-2"
                                  onClick={() => {
                                    this.setState({ isEdit: false });
                                  }}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="btn btn-success mr-2"
                                  onClick={() => {
                                    this.submitAddress();
                                  }}
                                >
                                  Update
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              {passportPresent.map((v, k) => {
                                //console.log(v, k);
                                {
                                  return (
                                    <TextBox
                                      key={k}
                                      dim={v.dim}
                                      id={v.id}
                                      type={v.type}
                                      maxLength={v.maxLength}
                                      name={v.id}
                                      title={v.title}
                                      isMandatory={v.isMandatory}
                                      placeholder={v.placeholder}
                                      disable={v.disable}
                                      val={
                                        this.state.presentAddress[v.id] !==
                                          undefined &&
                                        this.state.presentAddress[v.id] !== null
                                          ? this.state.presentAddress[v.id]
                                          : "N/A"
                                      }
                                      ChangeHandler={(e) =>
                                        this.ChangeHandler(e)
                                      }
                                    />
                                  );
                                }
                              })}
                              <div
                                className="col-md-12 mt-2"
                                style={{ textAlign: "right" }}
                              >
                                <button
                                  className="btn btn-danger mr-2"
                                  onClick={() => {
                                    this.setState({ isEdit: false });
                                  }}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="btn btn-success mr-2"
                                  onClick={() => {
                                    this.submitAddress();
                                  }}
                                >
                                  Update
                                </button>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {this.state.cp?.identityDocType === 3 ? (
                            <>
                              {listofThird.map((v, k) => {
                                //console.log(v, k);
                                {
                                  return (
                                    <TextBox
                                      key={k}
                                      dim={v.dim}
                                      id={v.id}
                                      type={v.type}
                                      maxLength={v.maxLength}
                                      title={v.title}
                                      isMandatory={v.isMandatory}
                                      placeholder={v.placeholder}
                                      disable={v.disable}
                                      val={
                                        this.state.presentAddress[v.id] !==
                                          undefined &&
                                        this.state.presentAddress[v.id] !== null
                                          ? this.state.presentAddress[v.id]
                                          : "N/A"
                                      }
                                    />
                                  );
                                }
                              })}
                            </>
                          ) : (
                            <>
                              {passportPresent.map((v, k) => {
                                //console.log(v, k);
                                {
                                  return (
                                    <TextBox
                                      key={k}
                                      dim={v.dim}
                                      id={v.id}
                                      type={v.type}
                                      maxLength={v.maxLength}
                                      title={v.title}
                                      isMandatory={v.isMandatory}
                                      placeholder={v.placeholder}
                                      disable={v.disable}
                                      val={
                                        this.state.presentAddress[v.id] !==
                                          undefined &&
                                        this.state.presentAddress[v.id] !== null
                                          ? this.state.presentAddress[v.id]
                                          : "N/A"
                                      }
                                    />
                                  );
                                }
                              })}
                            </>
                          )}
                          <div
                            className="col-md-12 mt-2"
                            style={{ textAlign: "right" }}
                          >
                            <button
                              className="btn btn-success"
                              onClick={() => {
                                this.setState({ isEdit: true });
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div
                      className="row justify-content-md-start mb-2 mt-4 p-3"
                      id="submit1"
                    >
                      {this.state.cp?.identityDocType === 3 ? (
                        <>
                          {listofForth.map((v, k) => {
                            //console.log(v, k);
                            {
                              return (
                                <TextBox
                                  key={k}
                                  dim={v.dim}
                                  id={v.id}
                                  type={v.type}
                                  maxLength={v.maxLength}
                                  title={v.title}
                                  isMandatory={v.isMandatory}
                                  placeholder={v.placeholder}
                                  disable={v.disable}
                                  val={
                                    this.state.permanentAddress[v.id] !==
                                      undefined &&
                                    this.state.permanentAddress[v.id] !== null
                                      ? this.state.permanentAddress[v.id]
                                      : "N/A"
                                  }
                                />
                              );
                            }
                          })}
                        </>
                      ) : (
                        <>
                          {passportPermanent.map((v, k) => {
                            //console.log(v, k);
                            {
                              return (
                                <TextBox
                                  key={k}
                                  dim={v.dim}
                                  id={v.id}
                                  type={v.type}
                                  maxLength={v.maxLength}
                                  title={v.title}
                                  isMandatory={v.isMandatory}
                                  placeholder={v.placeholder}
                                  disable={v.disable}
                                  val={
                                    this.state.permanentAddress[v.id] !==
                                      undefined &&
                                    this.state.permanentAddress[v.id] !== null
                                      ? this.state.permanentAddress[v.id]
                                      : "N/A"
                                  }
                                />
                              );
                            }
                          })}
                        </>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    {listofProfession.map((v, k) => {
                      //console.log(v, k);
                      {
                        return (
                          <TextBox
                            key={k}
                            dim={v.dim}
                            id={v.id}
                            type={v.type}
                            maxLength={v.maxLength}
                            title={v.title}
                            isMandatory={v.isMandatory}
                            placeholder={v.placeholder}
                            disable={v.disable}
                            val={
                              this.state.cp[v.id] !== undefined &&
                              this.state.cp[v.id] !== null
                                ? this.state.cp[v.id]
                                : "N/A"
                            }
                          />
                        );
                      }
                    })}
                  </TabPanel>
                  <TabPanel>
                    {listofIntroducer.map((v, k) => {
                      //console.log(v, k);
                      {
                        return (
                          <TextBox
                            key={k}
                            dim={v.dim}
                            id={v.id}
                            type={v.type}
                            maxLength={v.maxLength}
                            title={v.title}
                            isMandatory={v.isMandatory}
                            placeholder={v.placeholder}
                            disable={v.disable}
                            val={
                              this.state.cp[v.id] !== undefined &&
                              this.state.cp[v.id] !== null
                                ? this.state.cp[v.id]
                                : "N/A"
                            }
                          />
                        );
                      }
                    })}
                  </TabPanel>
                  <TabPanel>
                    <div className="row justify-content-md-start mb-2 mt-4">
                      <div className="col-md-12">
                        <div
                          className="col-md-3 d-inline-block"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            src={
                              this.state?.cp?.documentType === 3
                                ? this.state.customerNIDFRONT !== null &&
                                  this.state.customerNIDFRONT !== undefined
                                  ? "data:image/png;base64," +
                                    this.state.customerNIDFRONT
                                  : process.env.PUBLIC_URL + "/no-img.png"
                                : this.state.customerPASSPORT !== null &&
                                  this.state.customerPASSPORT !== undefined
                                ? "data:image/png;base64," +
                                  this.state.customerPASSPORT
                                : process.env.PUBLIC_URL + "/no-img.png"
                            }
                            className="rounded mx-auto d-block"
                            alt="user image"
                            width="100%"
                            style={{ maxHeight: "220px" }}
                          />
                          <p>
                            {this.state.passportDetail === null
                              ? "Account Owner NID Front"
                              : "Account Owner Document"}
                          </p>
                        </div>
                        <div
                          className="col-md-3 d-inline-block"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            src={
                              this.state.customerSignature !== null &&
                              this.state.customerSignature !== undefined
                                ? "data:image/png;base64," +
                                  this.state.customerSignature
                                : process.env.PUBLIC_URL + "/no-img.png"
                            }
                            className="rounded mx-auto d-block"
                            alt="user image"
                            width="100%"
                            style={{ maxHeight: "220px" }}
                          />
                          <p>Signature</p>
                        </div>
                        <>
                          {" "}
                          <div
                            className="col-md-3 d-inline-block"
                            style={{ textAlign: "center" }}
                          >
                            <img
                              src={
                                this.state.customerPhoto !== null &&
                                this.state.customerPhoto !== undefined
                                  ? "data:image/png;base64," +
                                    this.state.customerPhoto
                                  : process.env.PUBLIC_URL + "/no-img.png"
                              }
                              className="rounded mx-auto d-block"
                              alt="user image"
                              width="100%"
                              style={{ maxHeight: "220px" }}
                            />
                            <p>Own Photo</p>
                          </div>{" "}
                        </>
                      </div>
                    </div>
                  </TabPanel>
                </Tabs>
                <Loader
                  loaderShow={this.state.loaderShow}
                  onHide={() => {}}
                  loaderText={this.state.loaderText}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CustomerView;
