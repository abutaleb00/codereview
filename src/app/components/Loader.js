import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

class Loader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Modal
          show={this.props.loaderShow}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={this.props.loaderHide}
        >
          <Modal.Body>
            <img
              src={process.env.PUBLIC_URL + "/loader.gif"}
              className="rounded mx-auto d-block"
              alt="user image"
              width="40%"
            />
            <p className="text-center text-success font-weight-bold">
              {this.props.loaderText}
            </p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Loader;
