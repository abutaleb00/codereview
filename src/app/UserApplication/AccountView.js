import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TextBox from "../components/TextBox";
import {
  account1,
  account2,
  branch,
  nominee,
  tpInfo,
} from "../components/accounts";
import "react-tabs/style/react-tabs.css";
import { instance, baseURL } from "../service/ApiUrls";
import Loader from "../components/Loader";
import { confirmAlert } from "react-confirm-alert";
import { service, business } from "../data/profession";

export default class AccountView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.location.state.datToload,
      loaderShow: false,
      loaderText: "Loading....",
      s3: { score: 0 },
      total: 0,
      a1: 0,
      a2: 3,
      b: 1,
      c1: 0,
      c2: 0,
      d: 0,
      e: 1,
      f: 0,
    };
  }

  componentDidMount = () => {
    this.callAccountDetailWithID();
    this.professionScore();
  };

  professionScore = () => {
    let str = this.state.tp?.profession;

    let serviceName = str?.substring(str.indexOf(":") + 1);
    let serviceType = str?.substring(0, str.indexOf(":") - 1);
    console.log("type", serviceType);
    if (serviceType == "Service") {
      let s3;
      service.map((e) => {
        if (serviceName.includes(e.name)) {
          s3 = e.score;
          this.setState({ f: e.score });
        }
      });
      console.log("s3", s3);
    } else {
      let s3;
      business.map((e) => {
        if (serviceName.includes(e.name)) {
          s3 = e.score;
          this.setState({ f: e.score });
        }
      });
      console.log("s3", s3);
    }
  };

  handleTotal = (e) => {
    const { value, name } = e.target; // gets the name and value from input field
    const parsedValue = value === "" ? "" : parseFloat(value);
    this.setState({
      [name]: parsedValue,
    });
  };
  callAccountDetailWithID = () => {
    this.setState({ loaderShow: true }, () => {
      instance
        .post(baseURL + "/getAccountDetail/" + this.state.account.id)
        .then((res) => {
          if (res.data.result.error === false) {
            this.setState(
              {
                ...res.data.data,
                loaderShow: false,
                nomineeInfo: res.data.data.nomineeInfoResponse,
              },
              () => {
                this.callDocumentList();
              }
            );
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
        .catch((err) => this.setState({ loaderShow: false }));
    });
  };

  callDocumentList = () => {
    this.setState({ loaderShow: true }, () => {
      this.state.nomineeInfoResponse !== null &&
        this.state.nomineeInfoResponse.map((v) => {
          //console.log(v);
          if (v.nominee !== undefined) {
            instance
              .post(baseURL + "/api/filesusingreferencebase64", null, {
                params: { uniquereference: v.nominee.documentReferenceNumber },
              })
              .then((res) => {
                if (res.data.result.error === false) {
                  this.setState({ loaderShow: false }, () => {
                    let data = res.data.data;
                    //console.log("picdata", data);
                    data.map((pic) => {
                      v["nominee"]["photo64"] = pic.base64Content;
                    });
                  });
                } else if (res.data.result.error === true) {
                  this.setState({ loaderShow: false }, () => {
                    confirmAlert({
                      title: "Error Message",
                      message: (
                        <p className="mod-p">{res.data.result.errorMsg}</p>
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
                // this.setState({ loaderShow: false });
              })
              .catch((err) => this.setState({ loaderShow: false }));
          }
        });
      this.setState({ loaderShow: false });
    });
  };

  render() {
    const { a1, a2, b, c1, c2, d, e, f } = this.state;
    return (
      <div>
        <div className="row align-items-start proBanner mt-4">
          <div className="col-md-12 mb-2" style={{ textAlign: "right" }}>
            <button
              className="btn btn-secondary"
              onClick={() => {
                this.props.history.push({ pathname: "/account-list" });
              }}
            >
              <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>{" "}
              Back to Account List
            </button>
          </div>
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <Tabs>
                  <TabList>
                    <Tab>Account Info</Tab>
                    <Tab>Nominee</Tab>
                    <Tab>Transaction Profile</Tab>
                    <Tab>Risk Grading</Tab>
                    {/* <Tab>Documents</Tab> */}
                  </TabList>

                  <TabPanel>
                    <div
                      className="row justify-content-md-start mb-2 mt-2 p-3"
                      id="submit1"
                    >
                      {account1.map((v, k) => {
                        //console.log(v, k);
                        {
                          return (
                            <TextBox
                              key={`text3-${v.id}`}
                              dim={v.dim}
                              id={v.id}
                              type={v.type}
                              maxLength={v.maxLength}
                              title={v.title}
                              isMandatory={v.isMandatory}
                              disable={v.disable}
                              val={
                                this.state.product[v.id] !== undefined &&
                                this.state.product[v.id] !== null
                                  ? this.state.product[v.id]
                                  : "N/A"
                              }
                            />
                          );
                        }
                      })}
                      {account2.map((v, k) => {
                        //console.log(v, k);
                        {
                          return (
                            <TextBox
                              key={`text-${k}`}
                              dim={v.dim}
                              id={v.id}
                              type={v.type}
                              maxLength={v.maxLength}
                              title={v.title}
                              isMandatory={v.isMandatory}
                              disable={v.disable}
                              val={
                                this.state.account[v.id] === false
                                  ? "Single"
                                  : "Joint"
                              }
                            />
                          );
                        }
                      })}
                      {branch.map((v, k) => {
                        //console.log(v, k);
                        {
                          return (
                            <TextBox
                              key={`text-${k}`}
                              dim={v.dim}
                              id={v.id}
                              type={v.type}
                              maxLength={v.maxLength}
                              title={v.title}
                              isMandatory={v.isMandatory}
                              disable={v.disable}
                              val={
                                this.state.branch[v.id] !== undefined &&
                                this.state.branch[v.id] !== null
                                  ? this.state.branch[v.id]
                                  : "N/A"
                              }
                            />
                          );
                        }
                      })}
                      {/* {account3.map((v, k) => {
                        //console.log(v, k);
                        {
                          return (
                            <TextBox
                              dim={v.dim}
                              id={v.id}
                              title={v.title}
                              isMandatory={v.isMandatory}
                              disable={v.disable}
                              val={
                                this.state.account[v.id] !== undefined &&
                                this.state.account[v.id] !== null
                                  ? this.state.account[v.id]
                                  : "N/A"
                              }
                            />
                          );
                        }
                      })} */}
                      <div className="col-md-12">
                        <p className="preview-p">Account Owner</p>
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Date of Birth</th>
                              <th>Marital Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.listCustomers.map((owner, i) => (
                              <tr key={i}>
                                <td>{owner.cp.name}</td>
                                <td>{owner.cp.dob}</td>
                                <td>{owner.cp.marital_status}</td>
                                <td>
                                  <a
                                    style={{
                                      color: "#076dea",
                                      cursor: "pointer",
                                      fontWeight: "bold",
                                    }}
                                    onClick={() => {
                                      this.props.history.push({
                                        pathname: "/customer-view",
                                        state: {
                                          fromCustomerList: true,
                                          datToload: owner,
                                        },
                                      });
                                    }}
                                  >
                                    View
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    {this.state.nomineeInfo?.map((singlenominee, i) => {
                      //console.log(singlenominee["nominee"]);
                      singlenominee["nominee"]["sharePercent"] =
                        singlenominee["sharePercent"];
                      return (
                        <div
                          className="row justify-content-md-start mb-2 mt-2 p-3"
                          style={{ borderBottom: "1px solid gray" }}
                          id="submit1"
                          key={i}
                        >
                          <div
                            className="col-md-3"
                            style={{ textAlign: "center" }}
                          >
                            <img
                              src={
                                singlenominee?.nominee !== undefined &&
                                singlenominee.nominee?.photo64 !== undefined
                                  ? `data:image/png;base64,${singlenominee.nominee.photo64}`
                                  : process.env.PUBLIC_URL + "/no-image.jpg"
                              }
                              className="rounded mx-auto d-block"
                              alt="user image"
                              width="50%"
                              style={{ maxHeight: "220px" }}
                            />
                          </div>
                          <div className="col-md-9">
                            {nominee.map((v, k) => {
                              //console.log(v, k);
                              {
                                return (
                                  <TextBox
                                    key={`text-${k}`}
                                    dim={v.dim}
                                    id={v.id}
                                    type={v.type}
                                    maxLength={v.maxLength}
                                    title={v.title}
                                    isMandatory={v.isMandatory}
                                    disable={v.disable}
                                    val={
                                      singlenominee["nominee"] !== undefined &&
                                      singlenominee["nominee"] !== null
                                        ? singlenominee["nominee"][v.id]
                                        : "N/A"
                                    }
                                  />
                                );
                              }
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </TabPanel>
                  <TabPanel>
                    <div className="col-md-12">
                      {tpInfo.map((v, k) => {
                        //console.log(this.state.tp[v]);
                        return (
                          <TextBox
                            key={`text-${k}`}
                            dim={v.dim}
                            id={v.id}
                            type={v.type}
                            maxLength={v.maxLength}
                            title={v.title}
                            isMandatory={v.isMandatory}
                            //placeholder={v.placeholder}
                            disable={true}
                            val={
                              this.state.tp !== null &&
                              this.state.tp[v.id] !== undefined &&
                              this.state.tp[v.id] !== null
                                ? this.state.tp[v.id]
                                : "N/A"
                            }
                          />
                        );
                      })}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="col-md-12">
                      <p className="preview-p">Risk Grading</p>
                      <table
                        id="risk"
                        className="table table-bordered"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th width="40%">Title</th>
                            <th width="40%">Value</th>
                            <th width="20%">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td width="40%">A1. Types of Product/Services</td>
                            <td width="40%">{this.state.product.name}</td>
                            <td width="20%" id="1">
                              <input
                                type="number"
                                name="a1"
                                onChange={this.handleTotal}
                                value={
                                  this.state.product.name === "Savings" ? 1 : 2
                                }
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              A2. Types of Onboarding/opening of account
                            </td>
                            <td width="40%">By Branch/Relationship Manager</td>
                            <td width="20%" id="2">
                              <input
                                type="number"
                                name="a2"
                                onChange={this.handleTotal}
                                value={this.state.a2}
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              B. Geographical Risk/Residential status Risk
                            </td>
                            <td width="40%">
                              {this.state.listCustomers[0].permanentAddress
                                .country ===
                              this.state.listCustomers[0].presentAddress.country
                                ? "Resident Bangladeshi Customer"
                                : "Non Resident Bangladeshi Customer"}
                            </td>
                            <td width="20%" id="3">
                              <input
                                type="number"
                                name="b"
                                onChange={(e) =>
                                  this.setState({ b: e.target.value })
                                }
                                value={
                                  this.state.listCustomers[0].permanentAddress
                                    .country ===
                                  this.state.listCustomers[0].presentAddress
                                    .country
                                    ? 1
                                    : 2
                                }
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              C1. Relation Risk: As per BFIU Circular, Whether
                              the customer is (are) belongs to PEPs/Influential
                              Person(s)/Head of International Organization of
                              Senior Level Officer
                            </td>
                            <td width="40%"></td>
                            <td width="20%" id="4">
                              <input
                                type="number"
                                name="c1"
                                onChange={this.handleTotal}
                                value={this.state.c1}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              C2. Relation Risk: As per BFIU Circular, Whether
                              the customer is (are) family members(s) or close
                              associates of PEPs/Influential Person(s)/Head of
                              international organization or Senior level officer
                            </td>
                            <td width="40%"></td>
                            <td width="20%" id="5">
                              <input
                                type="number"
                                name="c2"
                                onChange={this.handleTotal}
                                value={this.state.c2}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              D. Customer’s Yearly Average Transaction (For
                              Personal Account)
                            </td>
                            <td width="40%"></td>
                            <td width="20%" id="6">
                              <input
                                type="number"
                                name="d"
                                onChange={this.handleTotal}
                                value={this.state.d}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              E. Transparency Risk: Whether customer(s) has/have
                              supplied reliable information/documents
                            </td>
                            <td width="40%">Yes</td>
                            <td width="20%" id="7">
                              <input
                                type="number"
                                name="e"
                                onChange={this.handleTotal}
                                value={this.state.e}
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              F. Business and Profession/Occupation Related Risk
                            </td>
                            <td width="40%">
                              {/* { currentOptions?.filter(option => option.value === state.CurrencyId)} */}
                              {this.state.tp.profession}
                            </td>
                            <td width="20%">
                              <input
                                type="number"
                                name="f"
                                onChange={this.handleTotal}
                                value={this.state.f}
                                disabled
                              />
                              {/* <span id="score">{this.state.s3.score}</span> */}
                            </td>
                          </tr>
                          <tr>
                            <td width="40%">
                              <b>Total Score</b>
                            </td>
                            <td width="40%">
                              <b>
                                Total Risk Score (A+B+C+D1 or D2+E+F i or F ii )
                              </b>
                            </td>
                            <td width="20%">
                              {a1 + a2 + b + c1 + c2 + d + e + f}
                            </td>
                          </tr>
                        </tbody>
                        <tfoot></tfoot>
                      </table>
                    </div>
                  </TabPanel>
                  {/* <TabPanel>Documents</TabPanel> */}
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
