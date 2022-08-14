import React, { Component } from "react";
import Checking from "../components/Checking";
import {
  TYPEOFONBOARDING,
  GeographicRisks,
  TypeofCustomer,
  ProductAndChannelRisk,
  BuisnessAndActivityRisk,
  TransactionRisk,
  TransparencyRisk,
} from "../components/riskgrading";

export class RiskGrading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setVal = (e) => {
    console.log(e);
    this.setState({ [e.name]: e.value });
  };

  render() {
    return (
      <div>
        <div className="row proBanner mt-4">
          <div className="col-12">
            <div className="card">
              {this.props.titleToShow !== undefined &&
              this.props.titleToShow === false ? (
                ""
              ) : (
                <h4 className="card-title">Customer Risk Grading</h4>
              )}
              <div className="card-body">
                <div className="row justify-content-md-start">
                  <div
                    className="col-md-6"
                    style={{ borderRight: "1px dotted #cccbcb" }}
                  >
                    <Checking
                      type={TYPEOFONBOARDING}
                      setVal={this.setVal}
                      question="Type of OnBoarding"
                      score="Score"
                    />
                    <Checking
                      type={GeographicRisks}
                      setVal={this.setVal}
                      question="Geographic Risks"
                      score="Score"
                      showClientDropDown={true}
                    />
                    <Checking
                      type={TypeofCustomer}
                      setVal={this.setVal}
                      question="Type of Customer"
                      score="Score"
                      showClientDropDown={true}
                    />
                    <Checking
                      type={ProductAndChannelRisk}
                      setVal={this.setVal}
                      question="Product and Channel 
                    Risk"
                      score="Score"
                      showClientDropDown={true}
                    />
                  </div>
                  <div
                    className="col-md-6"
                    style={{ borderLeft: "1px dotted #cccbcb" }}
                  >
                    <Checking
                      type={BuisnessAndActivityRisk}
                      setVal={this.setVal}
                      question="Business and Activity Risk"
                      score="Score"
                      showClientDropDown={true}
                    />
                    <Checking
                      type={TransactionRisk}
                      setVal={this.setVal}
                      question="Transactional Risks"
                      score="Score"
                      showClientDropDown={true}
                    />
                    <Checking
                      type={TransparencyRisk}
                      setVal={this.setVal}
                      question="Transparency Risk"
                      score="Score"
                      showClientDropDown={true}
                    />
                  </div>
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
export default RiskGrading;
