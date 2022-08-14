import React, { Component } from "react";
import CusAccordions from "../components/CusAccordions";
import "../../assets/styles/index.css";
import allInAccordians from "../pages/data";
import { instance, baseURL, errorCompute } from "../service/ApiUrls";
import { confirmAlert } from "react-confirm-alert";
import Loader from "../components/Loader";

class NewApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      loaderShow: false,
      loaderText: "Loading...",
      owner: [],
      accountType: 0,
      product: "Savings",
    };
    if (
      props.location.state !== undefined &&
      props.location.state.fromCustomerList &&
      props.location.state.datToload !== undefined
    ) {
      this.state = { ...this.state, ...props.location.state.datToload };
    }
  }
  setExpanded = () => {
    this.setState({ expanded: true });
  };
  loaderHide = () => {
    this.setState({ loaderShow: false });
  };
  componentDidMount = () => {
    this.setData();
    // this.callAccountPost();
  };

  callAccountPost = () => {
    this.setState({ loaderShow: true }, () => {
      let listofCustomers = [];

      if (this.state.owner !== undefined && this.state.owner !== null) {
        this.state.owner.map((v) => {
          console.log(v);
          listofCustomers.push({ customerID: v.cp.id });
        });
      }

      let dataToSend = {
        ownerType: this.state.accountType,
        accountType: this.state.accountType,
        debitCard: this.state.debitCard,
        checkBook: this.state.checkBook,
        smsAlert: this.state.smsAlert,
        mtransectionlimit: this.state.mtransectionlimit,
        product: this.state.product,
        branch: this.state.branch,
        listofCustomers: listofCustomers,
        listofNominee: this.state.listofNominee,
        transactionProfile: {
          proffession: this.state.profession,
          sourceofFund: this.state.sourcesofFund,
          monthlyIncome: this.state.monthlyIncome,
        },
        unscr: true,
        riskGrading: false,
        ipsPep: false,
        mediaNews: false,
        sourceOfFundVerify: false,
        ownershipChecked: true,
      };
      console.log("dataTosend", JSON.stringify(dataToSend));
      instance
        .post(baseURL + "/makingsoap", dataToSend)
        .then((res) => {
          if (res.data.result.error === false) {
            this.setState({ loaderShow: false }, () => {
              confirmAlert({
                title: "Successful",
                message: (
                  <p className="mod-sp">
                    Account application submitted Successfully
                  </p>
                ),
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {
                      this.props.history.push("/account-list");
                    },
                  },
                ],
              });
            });
          } else if (res.data.result.error === true) {
            this.setState({ loaderShow: false }, () => {
              confirmAlert({
                title: "Error",
                message: <p className="mod-p">{res.data.result.errorMsg}</p>,
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {
                      this.props.history.push("/customer-list");
                    },
                  },
                ],
              });
            });
          }
        })
        .catch((err) => errorCompute(err));
    });
  };

  setData = (obj) => {
    // if (obj !== undefined && obj !== null) {
    //   this.setState({
    //     ...obj,
    //   });
    // }
    if (
      window.nomineelInformation !== undefined &&
      window.transactionProfile !== undefined
    ) {
      this.setState(
        {
          ...window.newAccount.newAccountData(),
          ...window.nomineelInformation.nomineeData(),
          ...window.transactionProfile.transactionalProfileData(),
        },
        () => {
          console.log("Inside setData", { ...this.state });
          if (
            this.state.owner !== undefined &&
            this.state.owner !== null &&
            this.state.owner.length > 0
          ) {
            this.callAccountPost();
          } else if (
            this.state.owner !== undefined &&
            this.state.owner !== null &&
            this.state.owner.length === 0 &&
            (this.state.cp === undefined || this.state.cp === null)
          ) {
            confirmAlert({
              title: "Error",
              message: <p className="mod-p">Please Add Account Owner</p>,
              buttons: [
                {
                  label: "Ok",
                  onClick: () => {},
                },
              ],
            });
          }
          // if (
          //   this.state.owner !== undefined &&
          //   this.state.owner !== null &&
          //   this.state.owner.length !== 0
          // ) {
          //   this.callAccountPost();
          // }
        }
      );
    }
  };
  handleSubmit = (e) => {
    //e.preventDefault();
    console.log("submit is called", this.state.owner);
    if (
      this.state.owner !== undefined &&
      this.state.owner !== null &&
      this.state.owner.length === 0
    ) {
      this.setState({ ...window.newAccount.newAccountData() }, () => {
        if (
          this.state.owner !== undefined &&
          this.state.owner !== null &&
          this.state.owner.length > 0
        ) {
          this.setData();
        } else {
          confirmAlert({
            title: "Error",
            message: <p className="mod-p">Please Add Account Owner</p>,
            buttons: [
              {
                label: "Ok",
                onClick: () => {},
              },
            ],
          });
        }
      });
    }
    // if (
    //   this.state.owner !== undefined &&
    //   this.state.owner !== null &&
    //   this.state.owner.length > 0
    // ) {
    //   this.setData();
    // } else {
    //   confirmAlert({
    //     title: "Error",
    //     message: <p className="mod-p">Please Add Account Owner</p>,
    //     buttons: [
    //       {
    //         label: "Ok",
    //         onClick: () => {},
    //       },
    //     ],
    //   });
    // }
    // // this.setData();
    // console.log("data is set up");
  };
  render() {
    return (
      <div className="row proBanner">
        <div className="col-12">
          <div className="card">
            <h4 className="card-title">New Application</h4>
            {/* <form
              onSubmit={() => {
                this.handleSubmit();
              }}
            > */}
            <div className="card-body">
              {/*  */}
              {allInAccordians.map((v, k) => {
                return (
                  <CusAccordions
                    key={k}
                    title={v.title}
                    info={v.info}
                    setExpanded={this.setExpanded}
                    accordianOpen={k < 3}
                    component={v.component}
                    setData={this.setData}
                    passPropData={this.props}
                    from={
                      this.props.location.state !== undefined
                        ? this.props.location.state.from
                        : null
                    }
                  />
                );
              })}
              <div className="col-md-12 mt-5" style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={() => {
                    // console.log();
                    this.handleSubmit();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
            {/* </form> */}
            <Loader
              loaderShow={this.state.loaderShow}
              onHide={this.loaderHide}
              loaderText={this.state.loaderText}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default NewApplication;
