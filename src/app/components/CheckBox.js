import React, { Component } from "react";

class CheckBox extends Component {
  constructor(props) {
    super(props);
  }
  ChangeHandler = (e) => {
    console.log(e.target.value);
  };
  render() {
    return (
      <div className={`col-md-${this.props.dim} d-inline-block`}>
        <div className="form-group">
          <label htmlFor={this.props.title}>
            {this.props.title}{" "}
            {this.props.isMandatory ? (
              <span style={{ color: "red" }}>*</span>
            ) : (
              ""
            )}
          </label>
          <div className="form-check">
            <label className="form-check-label" htmlFor={this.props.title}>
              <input
                type="checkbox"
                className="form-check-input"
                disabled={this.props.disable}
                checked={this.props.checked}
                value={this.props.val}
                onChange={(e) => {
                  if (this.props.fromaccordian) {
                    this.props.handleChange(e);
                  } else {
                    this.ChangeHandler(e);
                  }
                }}
              />
              <i className="input-helper"></i>
              htmlFor={this.props.title}
            </label>
          </div>
        </div>
      </div>
    );
  }
}
export default CheckBox;
