import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TextBox from "../components/TextBox";
import DropBox from "../components/DropBox";
import {
  listofFirst,
  listofSecond,
  listofThird,
  listofForth,
  nomineeInfo,
  tpInfo,
} from "../components/finaldata";
import "react-tabs/style/react-tabs.css";

export class Checker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="row align-items-start proBanner mt-4">
          <div className="col-md-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <Tabs>
                  <TabList>
                    <Tab>Personal Information</Tab>
                    <Tab>Nominne</Tab>
                    <Tab>Transaction Profile</Tab>
                    <Tab>Documents</Tab>
                  </TabList>

                  <TabPanel>
                    <div className="row justify-content-md-start mb-2 mt-4">
                      <div className="col-md-4" style={{ textAlign: "center" }}>
                        <img
                          src={
                            this.state.ownbase64 !== null &&
                            this.state.ownbase64 !== undefined &&
                            this.state.submitPhoto === true
                              ? "data:image/png;base64," + this.state.ownbase64
                              : process.env.PUBLIC_URL + "/person.jpg"
                          }
                          className="rounded mx-auto d-block"
                          alt="user image"
                          width="50%"
                        />
                      </div>
                      <div className="col-md-8">
                        {listofFirst.map((v, k) => {
                          //console.log(v, k);
                          return (
                            <TextBox
                              key={`text-${k}`}
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
                      </div>
                      <div className="col-md-12">
                        <p className="preview-p">Personal Info</p>
                      </div>
                      {listofSecond.map((v, k) => {
                        //console.log(v, k);
                        {
                          return v.options === null ||
                            v.options === undefined ? (
                            <TextBox
                              key={`text-${k}`}
                              dim={v.dim}
                              id={v.id}
                              title={v.title}
                              isMandatory={v.isMandatory}
                              placeholder={v.placeholder}
                              disable={v.disable}
                              val={v.val}
                            />
                          ) : (
                            <DropBox
                              key={`text-${k}`}
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
                      <div className="col-md-12">
                        <p className="preview-p">Present Address</p>
                      </div>

                      {listofThird.map((v, k) => {
                        //console.log(v, k);
                        {
                          return v.options === null ||
                            v.options === undefined ? (
                            <TextBox
                              key={`text-${k}`}
                              dim={v.dim}
                              id={v.id}
                              title={v.title}
                              isMandatory={v.isMandatory}
                              placeholder={v.placeholder}
                              disable={v.disable}
                              val={v.val}
                              Address="present"
                            />
                          ) : (
                            <DropBox
                              key={`text-${k}`}
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
                      <div className="col-md-12">
                        <p className="preview-p">Permanent Address</p>
                      </div>
                      {listofForth.map((v, k) => {
                        //console.log(v, k);
                        {
                          return v.options === null ||
                            v.options === undefined ? (
                            <TextBox
                              key={`text-${k}`}
                              dim={v.dim}
                              id={v.id}
                              title={v.title}
                              isMandatory={v.isMandatory}
                              placeholder={v.placeholder}
                              disable={v.disable}
                              val={v.val}
                              Address="present"
                            />
                          ) : (
                            <DropBox
                              key={`text-${k}`}
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
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="row justify-content-md-start mb-2 mt-4">
                      <div className="col-md-4" style={{ textAlign: "center" }}>
                        <img
                          src={
                            this.state.ownbase64 !== null &&
                            this.state.ownbase64 !== undefined &&
                            this.state.submitPhoto === true
                              ? "data:image/png;base64," + this.state.ownbase64
                              : process.env.PUBLIC_URL + "/nominee.jpg"
                          }
                          className="rounded mx-auto d-block"
                          alt="user image"
                          width="56%"
                        />
                      </div>
                      <div className="col-md-8">
                        {nomineeInfo.map((v, k) => {
                          //console.log(v, k);
                          {
                            return v.options === null ||
                              v.options === undefined ? (
                              <TextBox
                                key={`text-${k}`}
                                dim={v.dim}
                                id={v.id}
                                title={v.title}
                                isMandatory={v.isMandatory}
                                placeholder={v.placeholder}
                                disable={v.disable}
                                val={v.val}
                              />
                            ) : (
                              <DropBox
                                key={`text-${k}`}
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
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="row justify-content-md-start mb-2 mt-4">
                      <div className="col-md-12">
                        {tpInfo.map((v, k) => {
                          //console.log(v, k);
                          return (
                            <TextBox
                              key={`text-${k}`}
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
                      </div>
                    </div>
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
                              this.state.ownbase64 !== null &&
                              this.state.ownbase64 !== undefined &&
                              this.state.submitPhoto === true
                                ? "data:image/png;base64," +
                                  this.state.ownbase64
                                : process.env.PUBLIC_URL + "/front.jpg"
                            }
                            className="rounded mx-auto d-block"
                            alt="user image"
                            width="100%"
                          />
                          <p>Account Owner NID Front</p>
                        </div>
                        <div
                          className="col-md-3 d-inline-block"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            src={
                              this.state.ownbase64 !== null &&
                              this.state.ownbase64 !== undefined &&
                              this.state.submitPhoto === true
                                ? "data:image/png;base64," +
                                  this.state.ownbase64
                                : process.env.PUBLIC_URL + "/back.jpg"
                            }
                            className="rounded mx-auto d-block"
                            alt="user image"
                            width="100%"
                          />
                          <p>Account Owner NID Back</p>
                        </div>
                        <div
                          className="col-md-3 d-inline-block"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            src={
                              this.state.ownbase64 !== null &&
                              this.state.ownbase64 !== undefined &&
                              this.state.submitPhoto === true
                                ? "data:image/png;base64," +
                                  this.state.ownbase64
                                : process.env.PUBLIC_URL + "/front.jpg"
                            }
                            className="rounded mx-auto d-block"
                            alt="user image"
                            width="100%"
                          />
                          <p>Nominee NID Front</p>
                        </div>
                        <div
                          className="col-md-3 d-inline-block"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            src={
                              this.state.ownbase64 !== null &&
                              this.state.ownbase64 !== undefined &&
                              this.state.submitPhoto === true
                                ? "data:image/png;base64," +
                                  this.state.ownbase64
                                : process.env.PUBLIC_URL + "/back.jpg"
                            }
                            className="rounded mx-auto d-block"
                            alt="user image"
                            width="100%"
                          />
                          <p>Nominee NID Back</p>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </Tabs>
                <div
                  className="col-md-12 mt-5 pb-3"
                  style={{ textAlign: "center" }}
                >
                  <button
                    className="btn btn-success"
                    onClick={this.saveAndContinue}
                  >
                    Confirm Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Checker;
