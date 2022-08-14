import React, { Component } from "react";

export class AgentInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="row proBanner">
          <div className="col-12">
            <span className="d-flex align-items-center purchase-popup">
              <p>Welcome to Agent Information</p>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
export default AgentInformation;
