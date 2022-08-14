import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container-fluid">
          <div className="d-sm-flex justify-content-center">
            <span className="text-center text-sm-left d-block d-sm-inline-block">
              Copyright © 2022 State Bank of India.
            </span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
