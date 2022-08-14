import React, { Component } from "react";
import { DOCUMENTCHECKLIST } from "../Enum";

export class CusFileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { val: "" };
    //this.props.setTag("");
    //this.props.setDocType(DOCUMENTCHECKLIST.PHOTO);
  }

  clearTag = () => {
    // document.getElementById("doc_tag").innerHTML = "";
    this.setState({ val: "" });
  };

  render() {
    return (
      <>
        <div className="col-md-12">
          <div
            className="row justify-content-md-center mb-3 mt-3"
            style={{ border: "1px dotted gray", padding: "12px" }}
          >
            <div className="col-md-3 d-inline-block">
              <div className="form-group">
                <label htmlFor="documentType">Document Type</label>
                <select
                  className="form-control"
                  id="documentType"
                  onChange={(e) => {
                    //console.log("In cus file ", e.target.id, e.target.value);
                    const select = e.target;
                    const id = select.children[select.selectedIndex].id;
                    const val = select.children[select.selectedIndex].value;
                    this.props.setDocType({
                      name: id,
                      value: val,
                    });
                  }}
                >
                  {Object.entries(DOCUMENTCHECKLIST).map(([key, value]) => {
                    //console.log(key, value);
                    return (
                      <option id={value.name} value={value.value} key={key}>
                        {value.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-3 d-inline-block">
              <div className="form-group">
                <label htmlFor="document">Tag</label>
                <input
                  type="text"
                  id="doc_tag"
                  autoComplete="off"
                  name="document"
                  className="form-control"
                  placeholder="Enter Tag"
                  onChange={(e) => {
                    this.setState({ val: e.target.value }, () => {
                      this.props.setTag(this.state.val);
                    });
                  }}
                  value={this.state.val}
                />
              </div>
            </div>
            <div className="col-md-3 d-inline-block">
              <div className="form-group">
                <label htmlFor="plainAddress">Select Document</label>
                <div className="custom-file mb-1">
                  <input
                    type="file"
                    className="custom-file-input"
                    onChange={this.props.handleFile()}
                    id={this.props.id}
                    name={this.props.id}
                  />
                  <label className="custom-file-label" htmlFor={this.props.id}>
                    {this.props.fileNameToShow === undefined
                      ? "Select File"
                      : this.props.fileNameToShow}
                  </label>
                </div>
                <i
                  id={this.props.cross}
                  className="fa fa-times brandCross"
                  onClick={(e) => {
                    document.getElementById(this.props.id).value = null;
                    document.getElementById(this.props.cross).style.display =
                      "none";
                    this.props.parentCall();
                  }}
                  style={{
                    fontSize: "1em",
                    color: "red",
                    float: "right",
                    paddingRight: "10px",
                    display: "none",
                  }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CusFileUpload;
