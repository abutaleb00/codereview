import React, { Component } from "react";

class TextBox extends Component {
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
          <label htmlFor="fatherName">
            {this.props.title}{" "}
            {this.props.isMandatory ? (
              <span style={{ color: "red" }}>*</span>
            ) : (
              ""
            )}
          </label>

          <input
            type={this.props.type !== undefined ? this.props.type : "text"}
            maxLength={this.props.maxLength}
            className="form-control"
            id={this.props.id}
            name={this.props.id}
            autoComplete="off"
            placeholder={this.props.placeholder}
            onChange={(e) => {
              if (this.props.fromaccordian) {
                this.props.handleChange(e);
              } else {
                this.props.ChangeHandler(e);
              }
            }}
            disabled={this.props.disable ? true : false}
            value={this.props.val}
            required={this.props.isMandatory}
            // defaultValue={values.fatherName}
          />
        </div>
      </div>
    );
  }
}
export default TextBox;
