import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

export class AdminRegistration extends Component {
  state = {
    startDate: new Date(),
  };

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Registration </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Dashboard
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Registration
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Please Fillup all Infomation</h4>
                <form className="form-sample">
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          First Name
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            name="fname"
                            placeholder="Enter Here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Last Name
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            name="Lname"
                            placeholder="Enter Here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Father Name
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            name="FathersName"
                            placeholder="Enter Here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Mother Name
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            name="Mname"
                            placeholder="Enter Here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Gender
                        </label>
                        <div className="col-sm-9">
                          <select className="form-control">
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Date of Birth
                        </label>
                        <div className="col-sm-9">
                          <DatePicker
                            className="form-control w-100"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Email Address
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="email"
                            name="Email"
                            placeholder="Enter Here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Phone Number
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            name="Mobile"
                            placeholder="Enter Here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Identity Type
                        </label>
                        <div className="col-sm-9">
                          <select className="form-control">
                            <option>National ID Card</option>
                            <option>Passport</option>
                            <option>Driving License</option>
                          </select>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Identity Number
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            name="Mobile"
                            placeholder="Enter Here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <p className="card-description"> Address </p>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Address 1
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            name="AddressLine1"
                            placeholder="Enter here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          District
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            name="District"
                            placeholder="Enter Here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Address 2
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            name="AddressLine2"
                            placeholder="Enter here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Postcode
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            name="PostCode"
                            placeholder="Enter here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <p className="card-description"> Organization Information </p>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Org Name
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            name="OrgName"
                            placeholder="Enter here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Org Type
                        </label>
                        <div className="col-sm-9">
                          <select className="form-control">
                            <option>Government</option>
                            <option>Private</option>
                            <option>Others</option>
                          </select>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Org Code
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            name="OrgCode"
                            placeholder="Enter here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Department
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            name="Department"
                            placeholder="Enter here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Designation
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            name="Designation"
                            placeholder="Enter here"
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row justify-content-md-center">
                    <Button
                      className="btn mt-3 btn-primary btn-lg font-weight-medium"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminRegistration;
