import React, { Component } from "react";

class Button extends React.Component {
  render() {
    return (
      <div className="d-inline-block m-1">
        <input
          type="button"
          className="btn btn-dark"
          id={this.props.id}
          value={this.props.value}
          // style={btnStyle}
          onClick={this.props.funcName}
        />
      </div>
    );
  }
}

class TextBox extends React.Component {
  render() {
    return (
      <textarea
        cols="125"
        rows="15"
        id={this.props.id}
        style={{
          display: "none",
          marginLeft: "15px",
          padding: "10px 10px",
          textAlign: "left",
        }}
      ></textarea>
    );
  }
}
// const textStyle = {
//   marginLeft: "15px",
// };

// const btnStyle = {
//   height: "10mm",
//   width: "35mm",
// };

// const boxStyle = {
//   height: "35mm",
//   width: "60mm",
//   border: "1px solid #d3d3d3",
// };

export class Signature extends Component {
  constructor(props) {
    super(props);
    window.signature = this;
    this.state = {};
  }

  noDeviceSignal = (data) => {
    alert("Please connect your Signature pad for Capture");
  };
  receiveSignature = (data) => {
    this.props.signatureData(data);
  };

  render() {
    return (
      <div className="App">
        <div style={{ width: "100%" }}>
          <div className="row justify-content-md-center">
            <div className="col-md-auto">
              <div
                style={{
                  height: "35mm",
                  width: "60mm",
                  border: "1px solid gray",
                  borderRadius: "5px",
                }}
                id="imageBox"
                className="boxed"
                //onDoubleClick={window.displaySignatureDetails}
                //title="Double-click a signature to display its details"
              ></div>
              <div className="mt-3 mb-5" style={{ textAlign: "center" }}>
                <Button
                  value="Capture"
                  className="btn btn-dark mr-2"
                  funcName={window.capture}
                  title="Starts signature capture"
                />
                <Button
                  value="Clear"
                  className="btn btn-danger"
                  funcName={window.clearSignature}
                  title="Clears the signature"
                />
              </div>
            </div>
          </div>

          {/* <table>
            <tbody>
              <tr>
                <td rowSpan="3">
                  <div
                    id="imageBox"
                    className="boxed"
                    style={boxStyle}
                    //onDoubleClick={window.displaySignatureDetails}
                    title="Double-click a signature to display its details"
                  ></div>
                </td>
                <td>
                  <Button
                    value="Capture"
                    className="btn btn-dark"
                    funcName={window.capture}
                    title="Starts signature capture"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    value="Clear"
                    className="btn btn-danger"
                    funcName={window.clearSignature}
                    title="Clears the signature"
                  />
                </td>
              </tr>
              <tr></tr>
            </tbody>
          </table> */}
          <table style={{ display: "none" }}>
            <tbody>
              <tr>
                <td>
                  <b>Data included in the hash:</b>
                </td>
                <td>
                  First name:{" "}
                  <input
                    type="text"
                    autoComplete="off"
                    id="fname"
                    defaultValue={this.props.fname}
                  />
                </td>
                <td>
                  Last name:{" "}
                  <input
                    type="text"
                    id="lname"
                    autoComplete="off"
                    defaultValue={this.props.lname}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ display: "none" }}>
            <tbody>
              <tr>
                <td>
                  <b>Options:</b>
                </td>
                <td>
                  <input
                    style={{ display: "none" }}
                    type="checkbox"
                    id="chkUseB64Image"
                    defaultChecked
                  />
                  Use base-64 signature image
                </td>
                <td>
                  <input
                    style={{ display: "none" }}
                    type="checkbox"
                    id="chkShowSigText"
                    onClick={window.enableRestoreButton}
                  />
                  Output SigText to form
                </td>
              </tr>
            </tbody>
          </table>
          <TextBox id="txtDisplay" />
        </div>
      </div>
    );
  }
}
export default Signature;
