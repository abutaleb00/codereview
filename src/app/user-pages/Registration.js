import React, { Component } from "react";
import Loader from "../components/Loader";
import SelectSearch, { fuzzySearch } from "react-select-search";
import "../../assets/styles/cus-drop.css";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = { loaderShow: false };
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChange = (...args) => {
    // searchInput.current.querySelector("input").value = "";
    console.log("ARGS:", args);

    console.log("CHANGE:");
  };
  render() {
    const options = [
      { name: "Workshop Three", value: "1" },
      { name: "Workshop Two", value: "2" },
      { name: "Workshop Three", value: "3" },
      { name: "Workshop Four", value: "4" },
      { name: "Workshop Five", value: "5" },
    ];
    return (
      <div className="row proBanner">
        <div className="col-12">
          <div className="card">
            <h4 className="card-title">Registration</h4>
            <div className="card-body">
              <div className="row justify-content-center mt-2 mb-2">
                <div className="col-4">
                  <form className="pt-2">
                    <p style={{ fontWeight: "bold" }}>
                      Please fillup below Information:
                    </p>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-md"
                        id="username"
                        autoComplete="off"
                        name="username"
                        onChange={this.handleOnChange}
                        placeholder="Enter username"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        autoComplete="off"
                        className="form-control form-control-md"
                        id="email"
                        name="email"
                        onChange={this.handleOnChange}
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-md"
                        id="phoneNumber"
                        autoComplete="off"
                        name="phoneNumber"
                        onChange={this.handleOnChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <SelectSearch
                      options={options}
                      filterOptions={fuzzySearch}
                      value=""
                      placeholder="Select Branch"
                      search
                      onChange={this.handleChange}
                      emptyMessage={() => (
                        <div style={{ textAlign: "center", fontSize: "0.8em" }}>
                          No Branch Found
                        </div>
                      )}
                    />
                    <div className="mt-3">
                      <button
                        className="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn"
                        onClick={(e) => {
                          console.log(this.state);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Loader
          loaderShow={this.state.loaderShow}
          onHide={this.loaderHideHandler}
          loaderHideHandler={this.loaderHideHandler}
        />
      </div>
    );
  }
}

export default Registration;
