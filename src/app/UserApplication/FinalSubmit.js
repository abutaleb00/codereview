import React, { Component } from "react";
import TextBox from "../components/TextBox";
import DropBox from "../components/DropBox";
import {
  listofFirst,
  listofSecond,
  listofThird,
  listofForth,
  nomineeInfo,
  tpInfo,
  newAccount,
  initialDeposit,
  ownerInfo,
} from "../components/finaldata";

export class FinalSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row proBanner">
        <div className="col-12">
          <div className="card">
            <h4 className="card-title">New Application Preview</h4>
            <div className="card-body">
              <div className="col-md-12" id="submit1">
                <div className="row justify-content-md-center mb-2">
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
                  <div className="col-md-8" id="submit1">
                    {listofFirst.map((v, k) => {
                      //console.log(v, k);
                      return (
                        <TextBox
                          key={k}
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
                <div className="form-header">
                  <h3 className="box-title">Account Info</h3>
                </div>
                {newAccount.map((v, k) => {
                  //console.log(v, k);
                  {
                    return v.options === null || v.options === undefined ? (
                      <TextBox
                        key={k}
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
                        key={k}
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
                <p className="preview-p">Initial Deposit</p>
                {initialDeposit.map((v, k) => {
                  //console.log(v, k);
                  {
                    return v.options === null || v.options === undefined ? (
                      <TextBox
                        key={k}
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
                        key={k}
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
                  <h3 className="box-title">Personal Info</h3>
                </div>
                {listofSecond.map((v, k) => {
                  //console.log(v, k);
                  {
                    return v.options === null || v.options === undefined ? (
                      <TextBox
                        key={k}
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
                        key={k}
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
                <p className="preview-p">Present Address</p>
                {listofThird.map((v, k) => {
                  //console.log(v, k);
                  {
                    return v.options === null || v.options === undefined ? (
                      <TextBox
                        key={k}
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
                        key={k}
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
                <p className="preview-p">Permanent Address</p>
                {listofForth.map((v, k) => {
                  //console.log(v, k);
                  {
                    return v.options === null || v.options === undefined ? (
                      <TextBox
                        key={k}
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
                        key={k}
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
                  <div className="form-header">
                    <h3 className="box-title">Nominee Information</h3>
                  </div>
                  <div className="row justify-content-md-center mb-2">
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
                              key={k}
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
                              key={k}
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
                </div>
                <div className="col-md-12">
                  <div className="form-header">
                    <h3 className="box-title">Transaction Profile</h3>
                  </div>
                  {tpInfo.map((v, k) => {
                    //console.log(v, k);
                    return (
                      <TextBox
                        key={k}
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
                  <div className="form-header">
                    <h3 className="box-title">Submited Documents</h3>
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
                          ? "data:image/png;base64," + this.state.ownbase64
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
                          ? "data:image/png;base64," + this.state.ownbase64
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
                          ? "data:image/png;base64," + this.state.ownbase64
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
                          ? "data:image/png;base64," + this.state.ownbase64
                          : process.env.PUBLIC_URL + "/back.jpg"
                      }
                      className="rounded mx-auto d-block"
                      alt="user image"
                      width="100%"
                    />
                    <p>Nominee NID Back</p>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-header">
                    <h3 className="box-title">Risk Type Overall Score</h3>
                  </div>
                  <p>1. Has UNSCRs check done? (Yes) (No)</p>
                  <p>
                    2. Has risk grading done? If assessed risk high then conduct
                    EDD as per BFIU circular.
                  </p>
                  <p>
                    3. Is the customer is IPs/PEPs? If client is PEPs or IPs
                    with higher risk, then conduct EDD as per BFIU circular.
                  </p>
                  <p>
                    4. Is there any adverse media news against the customer? If
                    any then conduct EDD.
                  </p>
                  <p>5. Has the source of und verified/justified? (Yes) (No)</p>
                  <p>
                    6. Has the beneficial ownership checked? If there any
                    beneficial owner found, then conduct CDD on beneficial
                    owner. If beneficial owner is PEPs, then conduct EDD.
                  </p>
                  <p>7. Are any other documents obtained…….?</p>
                  <p>8. Nominee details:……..</p>
                  <p>
                    9. Has review of customer profile done (existing customer)?
                    if so, date of review…..
                  </p>
                  <p>
                    10. What is the average range and usual pattern of customer
                    transaction (over 6/12 months)?
                  </p>
                  <p>
                    11. Any other relevant field may be add here…………………………..An
                    efficient cAn
                  </p>
                </div>
              </div>
              <div
                className="col-md-12 mt-5 pb-3"
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
                  Confirm Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FinalSubmit;
