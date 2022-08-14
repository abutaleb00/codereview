import React, { Component } from "react";
import { tpInfo } from "../components/extra.js";
import TextBox from "../components/TextBox";

export class TransactionProfile extends Component {
  constructor(props) {
    super(props);
    window.transactionProfile = this;
    this.state = { profession: "", sourcesofFund: "", monthlyIncome: "" };
    if (
      props.passprops.location.state !== undefined &&
      props.passprops.location.state !== null
    ) {
      let cp = props.passprops.location.state.datToload.cp;
      this.state = {
        profession: cp.profession,
        sourcesofFund: cp.sourceOfFund,
        monthlyIncome: parseFloat(cp.monthlyIncome),
      };
    }
  }

  handleChange = (e) => {
    const re = /^[+-]?([0-9]*([.][0-9]*)?|[.][0-9]+)$/;
    if (this.props.fromaccordian === true && e.target.id !== "monthlyIncome") {
      this.setState({ [e.target.id]: e.target.value });
    } else if (
      this.props.fromaccordian === true &&
      e.target.id === "monthlyIncome"
    ) {
      console.log(e.target.value, re.test(e.target.value));
      if (re.test(e.target.value)) {
        this.setState({ [e.target.id]: e.target.value });
      }
    }
  };
  transactionalProfileData = () => {
    let data = { ...this.state };
    return data;
  };
  render() {
    // const accountOwnerForm = (
    //   <>
    //     <div className="col-md-6 d-inline-block">
    //       <div className="form-group">
    //         <label htmlFor="identityType">Identification Type</label>

    //         <select className="form-control" onChange={this.props.handleChange}>
    //           <option value="nid">National ID</option>
    //           <option value="passport">Passport</option>
    //         </select>
    //       </div>
    //     </div>
    //     <div className="col-md-6 d-inline-block">
    //       <div className="form-group">
    //         <label htmlFor="name">Identification Number</label>

    //         <input
    //           type="number"
    //           maxLength={40}
    //           className="form-control"
    //           id="name"
    //           autoComplete="off"
    //           placeholder="Enter Number"
    //           onChange={this.handleChange}
    //         />
    //       </div>
    //     </div>
    //   </>
    // );
    return (
      <div>
        <div className="row proBanner mt-3">
          <div className="col-12">
            <div className="card">
              {this.props.titleToShow !== undefined &&
              this.props.titleToShow === false ? (
                ""
              ) : (
                <h4 className="card-title">Transaction Profile</h4>
              )}
              <div className="card-body">
                <div className="row justify-content-md-start">
                  {tpInfo.map((v, k) => {
                    //console.log(v, k);
                    return (
                      <TextBox
                        key={"tp_text" + k}
                        dim={v.dim}
                        type={v.type}
                        maxLength={v.maxLength}
                        id={v.id}
                        title={v.title}
                        isMandatory={v.isMandatory}
                        placeholder={v.placeholder}
                        disable={v.disable}
                        val={this.state[v.id]}
                        fromaccordian={this.props.fromaccordian}
                        handleChange={this.handleChange}
                      />
                    );
                  })}
                </div>
                {this.props.fromaccordian !== undefined &&
                this.props.fromaccordian === false ? (
                  <div
                    className="col-md-12 mt-3"
                    style={{ textAlign: "center" }}
                  >
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        console.log();
                        // this.callAccountPost();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default TransactionProfile;
