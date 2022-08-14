import React, { Component } from "react";
import { Link } from "react-router-dom";
export class AddProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            {/* <button type="button" className="btn btn-primary">
              Add Profile Face-Match
            </button> */}
            <Link to="/nid-verify">
              <button type="button" className="btn btn-primary">
                Add Profile Fingure-Print
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default AddProfile;
