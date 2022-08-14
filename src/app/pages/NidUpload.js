import React, { Component } from "react";
import camera from "../user-pages/camera.js";
import DocumentUploader from "../components/DocumentUploader";
const userImg1 = require("../../assets/images/dummy-img.jpg");
const userImg2 = require("../../assets/images/dummy-img.jpg");
const userImg3 = require("../../assets/images/dummy-img.jpg");
export class NidUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this._handleNidFront = this._handleNidFront.bind(this);
    // this._handleNidBack = this._handleNidBack.bind(this);
    // this._handleOwn = this._handleOwn.bind(this);
  }
  _handleImageChange = (type) => async (e) => {
    e.preventDefault();

    switch (type) {
      case "front":
        document.getElementById("nidFrontCross").style.display = "block";
        this._handleNidFront(e);
        break;
      case "back":
        document.getElementById("nidBackCross").style.display = "block";
        this._handleNidBack(e);
        break;
      case "own":
        document.getElementById("ownCross").style.display = "block";
        this._handleOwn(e);
        break;
      default:
        break;
    }
  };
  resetNidFront = () => {
    this.setState({
      nidFrontFile: null,
      nidFrontFileNameToShow: undefined,
      androidProperties: {
        ...this.state.androidProperties,
        nidFrontbase64: null,
        nidFrontTempId: null,
      },
    });
  };
  resetNidBack = () => {
    this.setState({
      nidFrontFile: null,
      nidBackFileNameToShow: undefined,
      androidProperties: {
        ...this.state.androidProperties,
        nidBackbase64: null,
        nidBackTempId: null,
      },
    });
  };
  resetOwn = () => {
    this.setState({
      ownFile: null,
      ownFileNameToShow: undefined,
      androidProperties: {
        ...this.state.androidProperties,
        ownbase64: null,
        ownTempId: null,
      },
    });
  };
  _handleNidFront = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      let result = reader.result;
      if (result.substring(0, 22).includes("jpeg"))
        result = result.substring(23);
      else result = result.substring(22);

      this.setState(
        {
          nidFrontFile: file,
          nidFrontFileNameToShow: file.name,
          androidProperties: {
            ...this.state.androidProperties,
            nidFrontbase64: result,
          },
        },
        () => {
          if (
            this.state.nidFrontFile !== undefined &&
            this.state.nidFrontFile !== null
          ) {
            console.log("front");
            // this.upPictureToServer("lock")(e);
          }
        }
      );
    };
    reader.readAsDataURL(file);
  };
  _handleNidBack = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      let result = reader.result;
      if (result.substring(0, 22).includes("jpeg"))
        result = result.substring(23);
      else result = result.substring(22);

      this.setState(
        {
          nidBackFile: file,
          nidBackFileNameToShow: file.name,
          androidProperties: {
            ...this.state.androidProperties,
            nidBackbase64: result,
          },
        },
        () => {
          if (
            this.state.nidBackFile !== undefined &&
            this.state.nidBackFile !== null
          ) {
            console.log("back");
            // this.upPictureToServer("lock")(e);
          }
        }
      );
    };
    reader.readAsDataURL(file);
  };
  _handleOwn = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      let result = reader.result;
      if (result.substring(0, 22).includes("jpeg"))
        result = result.substring(23);
      else result = result.substring(22);

      this.setState(
        {
          ownFile: file,
          ownFileNameToShow: file.name,
          androidProperties: {
            ...this.state.androidProperties,
            ownbase64: result,
          },
        },
        () => {
          if (this.state.ownFile !== undefined && this.state.ownFile !== null) {
            console.log("own");
            // this.upPictureToServer("lock")(e);
          }
        }
      );
    };
    reader.readAsDataURL(file);
  };
  render() {
    let { nidFrontbase64 = userImg1 } =
      this.state.androidProperties !== undefined &&
      this.state.androidProperties;
    let $nidFrontView = null;
    // $imagePreview = (imagePreviewUrl)
    $nidFrontView = (
      <img
        src={
          nidFrontbase64 !== userImg1 && nidFrontbase64 !== null
            ? `data:image/jpeg;base64,${nidFrontbase64}`
            : process.env.PUBLIC_URL + "/dummy-img.jpg"
        }
        className="mx-auto d-block"
        alt="NID Front"
        style={{
          width: "100%",
          border: "1px solid #ffffff",
          maxHeight: "200px",
        }}
      />
    );
    let { nidBackbase64 = userImg2 } =
      this.state.androidProperties !== undefined &&
      this.state.androidProperties;
    let $nidBackView = null;
    // $imagePreview = (imagePreviewUrl)
    $nidBackView = (
      <img
        src={
          nidBackbase64 !== userImg2 && nidBackbase64 !== null
            ? `data:image/jpeg;base64,${nidBackbase64}`
            : process.env.PUBLIC_URL + "/dummy-img.jpg"
        }
        className="mx-auto d-block"
        alt="NID Back"
        style={{
          width: "100%",
          border: "1px solid #ffffff",
          maxHeight: "200px",
        }}
      />
    );
    let { ownbase64 = userImg3 } =
      this.state.androidProperties !== undefined &&
      this.state.androidProperties;
    let $ownView = null;
    // $imagePreview = (imagePreviewUrl)
    $ownView = (
      <img
        src={
          ownbase64 !== userImg3 && ownbase64 !== null
            ? `data:image/jpeg;base64,${ownbase64}`
            : process.env.PUBLIC_URL + "/dummy-img.jpg"
        }
        className="mx-auto d-block"
        alt="User Own"
        style={{
          width: "100%",
          border: "1px solid #ffffff",
          maxHeight: "200px",
        }}
      />
    );
    return (
      <div>
        <div className="row proBanner">
          <div className="col-12">
            <div className="card">
              <h4 className="card-title">Open Account List</h4>
              <div className="card-body">
                <div className="col-md-4 d-inline-block">
                  <DocumentUploader
                    name="Upload NID Front Photo"
                    id="front"
                    cross="nidFrontCross"
                    handleLock={() => this._handleImageChange("front")}
                    brandfileNameToShow={this.state.nidFrontFileNameToShow}
                    parentCall={() => {
                      this.resetNidFront();
                    }}
                  />
                  {$nidFrontView}
                </div>
                <div className="col-md-4 d-inline-block">
                  <DocumentUploader
                    name="Upload NID Back Photo"
                    id="back"
                    cross="nidBackCross"
                    handleLock={() => this._handleImageChange("back")}
                    brandfileNameToShow={this.state.nidBackFileNameToShow}
                    parentCall={() => {
                      this.resetNidBack();
                    }}
                  />
                  {$nidBackView}
                </div>
                <div className="col-md-4 d-inline-block">
                  <DocumentUploader
                    name="Upload Your Photo"
                    id="own"
                    cross="ownCross"
                    handleLock={() => this._handleImageChange("own")}
                    brandfileNameToShow={this.state.ownFileNameToShow}
                    parentCall={() => {
                      this.resetOwn();
                    }}
                  />
                  {$ownView}
                </div>
                <div className="col-md-4 d-inline-block">
                  <div id="web_came"></div>
                </div>
                <div
                  id="web_src"
                  className="col-md-4 d-inline-block"
                  style={{ width: "100%", height: "auto" }}
                ></div>
              </div>
              <div
                className="col-md-12 mt-3 pb-3"
                style={{ textAlign: "center" }}
              >
                {/* <Link to="/ocr-result"> */}
                <button
                  className="btn btn-light"
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/ocr-result",
                      state: { nidPics: this.state.androidProperties },
                    });
                  }}
                >
                  Submit
                </button>
                <button
                  className="btn btn-light"
                  onClick={() => {
                    camera.startCamera();
                  }}
                >
                  Web-Cam
                </button>
                <button
                  className="btn btn-light"
                  onClick={() => {
                    camera.stopCamera();
                  }}
                >
                  Stop-Camera
                </button>
                <button
                  className="btn btn-light"
                  onClick={() => {
                    let ownimge = camera.takeSnapshot();
                    this.setState({ ownbase64: ownimge.substring(22) });
                  }}
                >
                  Take Picture
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NidUpload;
