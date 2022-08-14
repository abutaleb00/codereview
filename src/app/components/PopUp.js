import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

class PopUp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Modal
          show={this.props.modalShow}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={this.props.modalHideHandler}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.modalHeading}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.modalBody}</Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={this.props.onHide}>
              Cancel
            </button>
            <button
              className="btn btn-success"
              onClick={this.props.submitHandler}
            >
              Submit
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default PopUp;
