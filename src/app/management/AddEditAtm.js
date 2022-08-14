import React, { Component } from "react";
import { atmField } from "../data/allData.js";
import TextBox from "../components/TextBox";
import Loader from "../components/Loader";
import { confirmAlert } from "react-confirm-alert";
import { instance } from "../service/ApiUrls";
import { baseURL } from "../service/ApiService";

export class AddEditAtm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...props.location.state.datToload };
  }

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  updateAtm = (e) => {
    this.setState({ loaderShow: true }, () => {
      instance
        .post(baseURL + "/addorupdateatm", this.state)
        .then((res) => {
          if (res.data.result.error === false) {
            this.setState({ loaderShow: false, isEdit: false }, () => {
              confirmAlert({
                title: "Success Message",
                message: <p className="mod-sp">Updated Successfully</p>,
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {
                      this.props.history.push("/managementatm-list");
                    },
                  },
                ],
                closeOnClickOutside: false,
              });
            });
          } else if (res.data.result.error === true) {
            this.setState({ loaderShow: false }, () => {
              confirmAlert({
                title: "Error Message",
                message: <p className="mod-p">{res.data.result.errorMsg}</p>,
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {},
                  },
                ],
                closeOnClickOutside: false,
              });
            });
          }
        })
        .catch((err) => {
          this.setState({ loaderShow: false });
        });
    });
  };

  render() {
    return (
      <div>
        <div className="row proBanner mt-3">
          <div className="col-12">
            <div className="card">
              <h4 className="card-title">
                ATM Information{" "}
                <button
                  className="btn btn-secondary"
                  style={{ float: "right" }}
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/managementatm-list",
                    });
                  }}
                >
                  <i
                    className="fa fa-chevron-circle-left"
                    aria-hidden="true"
                  ></i>{" "}
                  Back to ATM List
                </button>
              </h4>
              <div className="card-body">
                <div className="row justify-content-md-center">
                  {atmField.map((v, k) => {
                    //console.log(v, k);
                    return (
                      <TextBox
                        key={"tp_text" + k}
                        dim={v.dim}
                        id={v.id}
                        type={v.type}
                        maxLength={v.maxLength}
                        name={v.id}
                        title={v.title}
                        isMandatory={v.isMandatory}
                        placeholder={v.placeholder}
                        disable={v.disable}
                        val={
                          this.state[v.id] !== undefined &&
                          this.state[v.id] !== null
                            ? this.state[v.id]
                            : ""
                        }
                        ChangeHandler={(e) => this.handleChange(e)}
                      />
                    );
                  })}
                </div>
                <div className="col-md-12 mt-3" style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      this.updateAtm();
                    }}
                  >
                    {this.props.location.state.datToload === null
                      ? "Submit"
                      : "Update"}
                  </button>
                </div>
              </div>
            </div>
            <Loader
              loaderShow={this.state.loaderShow}
              onHide={() => {}}
              loaderText={this.state.loaderText}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default AddEditAtm;
