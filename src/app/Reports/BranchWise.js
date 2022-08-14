import React, { Component } from "react";
// import DataTable from "react-data-table-component";
// import DatePicker from "react-datepicker";
// import { Link } from "react-router-dom";
import CusFileUpload from "../components/CusFileUpload";
import { instance, baseURL } from "../service/ApiUrls";
var FormData = require("form-data");
var fs = require("fs");

class BranchWise extends Component {
  constructor() {
    super();
    this.state = {
      //formDate: new Date(),
      //toDate: new Date(),
      files: [],
    };
    // this._handleFile = this._handleFile.bind(this);
    this.child = React.createRef();
  }
  _handleFileChange = (type) => async (e) => {
    e.preventDefault();
    switch (type) {
      case "uploadFile":
        document.getElementById("fileCross").style.display = "block";
        this._handleFile(e);
        break;
      default:
        break;
    }
  };

  _handleFile = (e) => {
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
          uploadFile: file,
          fileToShow: file.name,
          filebase64: result,
        },
        () => {
          if (
            this.state.uploadFile !== undefined &&
            this.state.uploadFile !== null
          ) {
            console.log("uploadFile");
            let oldFiles = [
              ...this.state.files,
              {
                docType: this.state.docName,
                docValue: this.state.docValue,
                fileName: this.state.fileToShow,
                tag: this.state.tag,
                fileSize: this.state.uploadFile.size,
                toUpload: this.state.uploadFile,
              },
            ];
            this.setState({ files: oldFiles, tag: "" }, () => {
              //document.getElementById(this.props.id).value = null;
              document.getElementById("fileCross").style.display = "none";
              this.resetFile();
              this.child.current.clearTag();
            });

            // this.upPictureToServer("lock")(e);
          }
        }
      );
    };
    if (file !== null) {
      reader.readAsDataURL(file);
    }
  };
  resetFile = () => {
    this.setState({
      uploadFile: null,
      fileToShow: undefined,
      filebase64: null,
    });
  };

  setDocType = (e) => {
    let { name, value } = e;
    console.log("In branch Wise", name, value);
    this.setState({ docName: name, docValue: value });
  };

  setTag = (e) => {
    this.setState({ tag: e });
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Branch Wise Report</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Reports
                </a>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Branch Wise
                </a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                {/* <h6 className="mb-2 mt-5"> */}
                <h6>Upload Your Document</h6>
                <CusFileUpload
                  ref={this.child}
                  name="File Upload"
                  id="passport"
                  cross="fileCross"
                  handleFile={() => this._handleFileChange("uploadFile")}
                  setDocType={this.setDocType}
                  setTag={this.setTag}
                  //handleLock={(e) => this._handlePhoto(e)}
                  fileNameToShow={this.state.fileToShow}
                  parentCall={() => {
                    this.resetFile();
                  }}
                />
                <div className="col-md-2 d-inline-block text-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={() => {
                      let tags = [];
                      const formData = new FormData();
                      this.state.files.map((v, k) => {
                        tags.push({
                          fileName: v.fileName,
                          tag: v.tag,
                          docType: v.docValue,
                        });
                        formData.append("filedata", v.toUpload);
                      });

                      formData.append("tags", JSON.stringify({ tags: tags }));
                      formData.append("doctype", 9);
                      instance
                        .post(baseURL + "/api/fileupload", formData, {
                          headers: {
                            "Content-type": "multipart/form-data",
                          },
                        })
                        .then((res) => {
                          if (res.data.result.error === false) {
                            console.log(
                              `Success` +
                                res.data.data[0].document.referenceNumber
                            );
                            this.setState({
                              uniqueReference:
                                res.data.data[0].document.referenceNumber,
                            });
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Upload
                  </button>
                </div>
                <h6>Uploaded Upcument</h6>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Document Type</th>
                      <th>Document Name</th>
                      <th>Document Size</th>
                      <th>Document tag</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.files.map((v, k) => {
                      return (
                        <tr key={"doc_" + k}>
                          <td>{v.docType}</td>
                          <td>{v.fileName}</td>
                          <td>{v.fileSize}</td>
                          <td>{v.tag}</td>
                          <td>
                            {" "}
                            <i
                              className="mdi mdi-close-box"
                              style={{ color: "red" }}
                              onClick={() => {
                                //console.log(v);
                                let arr = [...this.state.files];
                                arr = arr.filter(
                                  (item) =>
                                    item.docType !== v.doctype &&
                                    item.fileName !== v.fileName &&
                                    item.fileSize !== v.fileSize
                                );
                                this.setState({ files: arr });
                              }}
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BranchWise;
