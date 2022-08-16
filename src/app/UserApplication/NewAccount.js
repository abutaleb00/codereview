import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextBox from "../components/TextBox";
import DropBox from "../components/DropBox";
import { instance, baseURL } from "../service/ApiUrls";
import { newAccount } from "../components/extra.js";
import PopUp from "../components/PopUp";
import Loader from "../components/Loader";
import confirmAlert from "react-confirm-alert";
// import Checking from "../components/Checking";
// import {
//   TYPEOFONBOARDING,
//   GeographicRisks,
//   ProductAndChannelRisk,
// } from "../components/riskgrading";
// import { dataToShow } from "../components/dataToShow";

export function makeid(length) {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}

export class NewAccount extends Component {
  constructor(props) {
    super(props);
    window.newAccount = this;
    let propstate = props.passprops.location.state;
    this.state = {
      checkBook: true,
      smsAlert: true,
      debitCard: true,
      internetBanking: true,
      eStatement: true,
      modalShow: false,
      loaderShow: false,
      loaderText: "Loading....",
      accountTypeText: "single",
      addbtn: false,
      identificationType: 10,
      branch: "Dhaka",
      branchOptions: [
        { id: "gaibandha", value: "Gaibandha", title: "Gaibandha" },
      ],
      owner: [],
      ...propstate,
    };
  }

  newAccountData = () => {
    let data = { ...this.state };
    console.log("data from new account ", data);
    return data;
  };

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };
  loaderHide = () => {
    this.setState({ loaderShow: false });
  };
  modalShowHandler = () => {
    this.setState({ modalShow: true });
  };
  modalHideHandler = () => {
    this.setState({ modalShow: false });
  };

  makeNidOrPassportCall = () => {
    this.setState({ loaderShow: true, modalShow: false }, () => {
      let dataToSend = {
        identficationNumber: this.state.nid,
        identificationType: this.state.identificationType,
      };
      instance
        .post(baseURL + "/getcustomerdata", dataToSend)
        .then((res) => {
          console.log(res.data);
          if (res.data.result.error === false) {
            this.setState({ loaderShow: false });
            if (res.data.data !== null) {
              if (this.state.accountTypeText === "joint") {
                this.setState({
                  owner: [...this.state.owner, res.data.data],
                });
              } else {
                this.setState({ owner: [res.data.data] });
              }
            }
          } else if (res.data.result.error === true) {
            this.setState({ loaderShow: false }, () => {
              confirmAlert({
                title: "Error Message",
                message: (
                  <p className="mod-p">
                    No Customer Found ! Please Create Customer from{" "}
                    <Link to="/usermobile">here</Link>{" "}
                  </p>
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
          }
        })
        .catch((err) => this.setState({ loaderShow: false }));
    });
  };

  apiforPhonenumberSearch = () => {
    this.setState({ loaderShow: true, modalShow: false }, () => {
      let dataToSend = {
        property: "mobile",
        value: this.state.nid,
      };
      instance
        .post(baseURL + "/getCustomerByPropertyValue", dataToSend)
        .then((res) => {
          if (res.data.result.error === false) {
            this.setState({ loaderShow: false });
            if (res.data.data !== null) {
              if (this.state.accountTypeText === "joint") {
                this.setState({
                  owner: [...this.state.owner, res.data.data],
                });
              } else {
                this.setState({ owner: [res.data.data] });
              }
            } else if (res.data.data === null) {
              confirmAlert({
                title: "Message",
                message: (
                  <p className="mod-p">
                    No Customer Found ! Please Create Customer from{" "}
                    <Link to="/usermobile">here</Link>{" "}
                  </p>
                ),
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {},
                  },
                ],
                closeOnClickOutside: false,
              });
            }
          } else {
            this.setState({ loaderShow: false }, () => {
              confirmAlert({
                title: "Error Message",
                message: (
                  <p className="mod-p">
                    No Customer Found ! Please Create Customer from{" "}
                    <Link to="/usermobile">here</Link>{" "}
                  </p>
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
          }
        })
        .catch((err) => console.log(err));
    });
  };

  callBranchOptions = () => {
    instance
      .post(baseURL + "/getloggedinuser")
      .then((res) => {
        if (res.data.result.error === false) {
          let option = [];
          if (
            res.data.data.branchName !== undefined &&
            res.data.data.branchName !== null
          ) {
            option.push({
              id: res.data.data.branchName,
              value: res.data.data.branchName,
              title: res.data.data.branchName,
            });
            this.setState({ branchOptions: option }, () => {
              console.log("branch", this.state.branchOptions);
              this.transferData("branch", this.state.branchOptions[0].value);
            });
          }
        } else if (res.data.result.error === true) {
          this.setState({}, () => {
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
  };

  submitHandler = (e) => {
    e.preventDefault();
    if (this.state.identificationType === 3) {
      if (this.state.nid.length === 10 || this.state.nid.length === 17) {
        this.makeNidOrPassportCall();
      }
    } else if (this.state.identificationType === 5) {
      this.makeNidOrPassportCall();
    }
    //This means phone
    else if (this.state.identificationType === 10) {
      this.apiforPhonenumberSearch();
    }
  };
  transferData = (id, value) => {
    this.setState({ [id]: value }, () => {
      if (id === "accountTypeText") {
        if (value === "single") {
          this.setState(
            {
              owner: [],
              accountType: 0,
              addbtn: false,
              accountTypeText: "single",
            },
            () => {
              if (this.state.fromCustomerList) {
                this.setState({ owner: [this.state.datToload], addbtn: true });
              }
              if (
                this.state.owner !== undefined &&
                this.state.owner.length === 1
              ) {
                this.setState({ addbtn: true });
              }
            }
          );
        }
        if (value === "joint") {
          this.setState({
            owner: [],
            accountType: 1,
            accountTypeText: "joint",
            addbtn: false,
          });
        }
      }
    });
  };

  componentDidMount = () => {
    // this.callBranchOptions();
    if (this.state.datToload !== undefined && this.state.datToload !== null) {
      console.log("checking ", this.state.datToload);
      this.setState({ owner: [this.state.datToload] }, () => {
        console.log("Owner added in componentDid mount", this.state.owner);
      });
    }
    // let timer = setInterval(() => {
    //   this.setState({ loaderText: makeid(5) });
    // }, 2000);
    // setTimeout(() => {
    //   clearInterval(timer);
    //   this.loaderHide();
    // }, 10000);
  };
  setVal = (e) => {
    console.log(e);
    this.setState({ [e.name]: e.value });
  };
  render() {
    const accountOwnerForm = (
      <>
        <div className="col-md-6 d-inline-block">
          <div className="form-group">
            <label htmlFor="identityType">Identification Type</label>

            <select
              className="form-control"
              onChange={(e) => {
                this.setState({
                  identificationType:
                    e.target.value === "nid"
                      ? 3
                      : e.target.value === "passport"
                      ? 5
                      : 10,
                });
              }}
            >
              <option value="phn">Phone</option>
              <option value="nid">National ID</option>
              <option value="passport">Passport</option>
            </select>
          </div>
        </div>
        <div className="col-md-6 d-inline-block">
          <div className="form-group">
            <label htmlFor="name">Identification Number</label>

            <input
              type="number"
              maxLength={40}
              className="form-control"
              id="name"
              autoComplete="off"
              placeholder="Enter Number"
              onChange={(e) => {
                this.setState({ nid: e.target.value }, () => {});
              }}
            />
          </div>
        </div>
      </>
    );
    return (
      <div>
        <div className="row proBanner mt-3">
          <div className="col-12">
            <div className="card">
              {this.props.titleToShow !== undefined &&
              this.props.titleToShow === false ? (
                ""
              ) : (
                <h4 className="card-title">New Account</h4>
              )}
              <div className="card-body">
                <div className="row justify-content-md-center mb-2">
                  <div className="col-md-12">
                    <div className="row justify-content-md-center">
                      {/* <div className="col-md-1 d-inline-block pt-4">
                        <i
                          className="mdi mdi-close-box-outline mr-1"
                          style={{
                            fontSize: "24px",
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            console.log();
                          }}
                        ></i>
                      </div> */}
                      {/* <div className="col-md-10 d-inline-block">
                        {ownerInfo.map((v, k) => {
                          //console.log(v, k);
                          return (
                            <TextBox
                              dim={v.dim}
                              id={v.id}
                              title={v.title}
                              isMandatory={v.isMandatory}
                              placeholder={v.placeholder}
                              disable={v.disable}
                              val={v.val}
                            />
                          );
                        })}
                      </div> */}
                    </div>

                    <div className="form-header">
                      <h3 className="box-title">Account Info</h3>
                    </div>
                    {newAccount.map((v, k) => {
                      //console.log(v, k);
                      {
                        return v.options === null || v.options === undefined ? (
                          <TextBox
                            key={"new_acc_text" + k}
                            dim={v.dim}
                            id={v.id}
                            title={v.title}
                            isMandatory={v.isMandatory}
                            placeholder={v.placeholder}
                            disable={v.disable}
                            val={this.state[v.id]}
                          />
                        ) : (
                          <DropBox
                            key={"new_acc_drop" + k}
                            dim={v.dim}
                            id={v.id}
                            title={v.title}
                            isMandatory={v.isMandatory}
                            placeholder={v.placeholder}
                            disable={v.disable}
                            options={v.options}
                            ChangeHandler={(e) => {
                              console.log(e.target.value);
                              this.setState({ branch: e.target.value });
                            }}
                            transferData={this.transferData}
                          />
                        );
                      }
                    })}
                    <div className="form-header">
                      <h3
                        className="box-title"
                        style={{ paddingBottom: "15px" }}
                      >
                        {/* <Checking
                          type={TYPEOFONBOARDING}
                          setVal={this.setVal}
                          question="Type of OnBoarding"
                        />
                        <Checking
                          type={ProductAndChannelRisk}
                          setVal={this.setVal}
                          question="Type of Product"
                          showClientDropDown={true}
                        /> */}
                        Account Owner{" "}
                        {/* <button
                          disabled={this.state.addbtn}
                          className="btn btn-dark"
                          style={{
                            float: "right",
                            padding: "2px 12px",
                            fontSize: "14px",
                          }}
                          onClick={() => {
                            this.setState({ modalShow: true });
                          }}
                        >
                          + Add
                        </button> */}
                      </h3>
                    </div>
                    <div className="col-md-12">
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Document Type</th>
                            <th>Document Number</th>
                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.owner?.map((owner, k) => (
                            <tr key={k}>
                              <td>{owner?.cp?.name}</td>
                              <td>{owner?.cp?.dob}</td>
                              <td>
                                {owner?.cp?.identityDocType === 3
                                  ? "NID"
                                  : owner?.cp?.identityDocType === 5
                                  ? "Passport"
                                  : owner?.cp?.identityDocType === 8
                                  ? "Driving License"
                                  : owner?.cp?.identityDocType === 10
                                  ? "PAN / Aadhar Card"
                                  : "Birth Certificate"}
                              </td>
                              <td>
                                {owner.cp?.identityDocType === 3
                                  ? owner.cp?.nidDetail !== undefined &&
                                    owner.cp?.nidDetail !== null
                                    ? owner.cp?.nidDetail.nationalId10 !== null
                                      ? owner.cp?.nidDetail.nationalId10
                                      : owner.cp?.nidDetail.nationalId17 !==
                                        null
                                      ? owner.cp?.nidDetail.nationalId17
                                      : ""
                                    : ""
                                  : owner.cp?.passportDetail?.passportNumber}
                              </td>
                              {/* <td>
                                <i
                                  className="mdi mdi-close-box"
                                  style={{ color: "red" }}
                                  onClick={() => {
                                    console.log(owner);
                                    let arr = [...this.state.owner];
                                    arr = arr.filter(
                                      (item) => item.cp.id !== owner.cp.id
                                    );
                                    this.setState({ owner: arr });
                                  }}
                                ></i>
                              </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* <div className="form-header">
                      <h3 className="box-title">Initial Deposit</h3>
                    </div>
                    {initialDeposit.map((v, k) => {
                      //console.log(v, k);
                      {
                        return v.options === null || v.options === undefined ? (
                          <TextBox
                            key={"new_acc_text2" + k}
                            dim={v.dim}
                            id={v.id}
                            title={v.title}
                            isMandatory={v.isMandatory}
                            placeholder={v.placeholder}
                            disable={v.disable}
                            val={this.state[v.id]}
                          />
                        ) : (
                          <DropBox
                            key={"new_acc_drop" + k}
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
                    })} */}
                    <div className="col-md-12 d-inline-block">
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
                          checked={this.state.checkBook}
                          onChange={(e) => {
                            this.setState({ checkBook: e.target.checked });
                          }}
                        />

                        <label
                          className="form-check-label p-l"
                          htmlFor="inlineCheckbox1"
                          style={{ marginLeft: "10px" }}
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
                          checked={this.state.smsAlert}
                          onChange={(e) => {
                            this.setState({ smsAlert: e.target.checked });
                          }}
                        />
                        <label
                          className="form-check-label p-l"
                          htmlFor="inlineCheckbox2"
                          style={{ marginLeft: "10px" }}
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
                          checked={this.state.debitCard}
                          onChange={(e) => {
                            this.setState({ debitCard: e.target.checked });
                          }}
                        />
                        <label
                          className="form-check-label p-l"
                          htmlFor="inlineCheckbox2"
                          style={{ marginLeft: "10px" }}
                        >
                          Debit Card
                        </label>
                      </div>
                      <div className="form-check form-check-inline d-p">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox2"
                          value={this.state.internetBanking}
                          checked={this.state.internetBanking}
                          onChange={(e) => {
                            this.setState({
                              internetBanking: e.target.checked,
                            });
                          }}
                        />
                        <label
                          className="form-check-label p-l"
                          htmlFor="inlineCheckbox2"
                          style={{ marginLeft: "10px" }}
                        >
                          Internet Banking
                        </label>
                      </div>
                      <div className="form-check form-check-inline d-p">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox2"
                          value={this.state.eStatement}
                          checked={this.state.eStatement}
                          onChange={(e) => {
                            this.setState({ eStatement: e.target.checked });
                          }}
                        />
                        <label
                          className="form-check-label p-l"
                          htmlFor="inlineCheckbox2"
                          style={{ marginLeft: "10px" }}
                        >
                          e-Statement
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-12 mt-3" style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-success"
                    // onClick={() => {
                    //   console.log();
                    // }}
                  >
                    Submit
                  </button>
                </div> */}
                <PopUp
                  modalShow={this.state.modalShow}
                  onHide={this.modalHideHandler}
                  modalHideHandler={this.modalHideHandler}
                  modalHeading="Account Owner"
                  modalBody={accountOwnerForm}
                  submitHandler={this.submitHandler}
                />
                <Loader
                  loaderShow={this.state.loaderShow}
                  onHide={this.loaderHide}
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
export default NewAccount;
