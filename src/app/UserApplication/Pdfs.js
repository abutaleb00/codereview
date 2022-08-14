import React, { Component } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { PDFViewer } from "@react-pdf/renderer";
import { MyDocument } from "../UserApplication/CustomPdf";

// var ReactDOMServer = require("react-dom/server");

export class Pdfs extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  printDocument = () => {
    const input = document.getElementById("divToPrint");

    html2canvas(input, { scale: 1.0 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      console.log(imgProps, pdfWidth, pdfHeight);
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      //pdf.addImage(imgData, "png", 0, 0);
      //pdf.addImage(ReactDOMServer.renderToStaticMarkup(this.render()), 0, 0,1200,1);
      //pdf.output("dataurlnewwindow");
      pdf.save("download.pdf");
    });
  };

  render() {
    const App2 = () => (
      <PDFViewer>
        <MyDocument />
      </PDFViewer>
    );

    return (
      <div>
        <div className="row align-items-start proBanner mt-4">
          <div className="col-md-12">
            <div className="card">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    console.log("clicked here");
                    this.setState({ show: true });
                  }}
                >
                  {" Downloaded Report"}
                </button>
              </div>
              {this.state.show && (
                <App2 />
                // <PDFDownloadLink
                //   document={<MyDocument />}
                //   fileName="movielist.pdf"
                //   style={{
                //     textDecoration: "none",
                //     padding: "10px",
                //     color: "#4a4a4a",
                //     backgroundColor: "#f2f2f2",
                //     border: "1px solid #4a4a4a",
                //   }}
                // >
                //   {({ blob, url, loading, error }) =>
                //     loading ? "Loading document..." : "Download Pdf"
                //   }
                // </PDFDownloadLink>
              )}
              {/* <div className="card-body" id="divToPrint">
                <h4>Regular e-KYC Preview</h4>

                <div
                  style={{
                    padding: "5px",
                    border: "1px solid gray",
                    borderRadius: "5px",
                  }}
                >
                  <div className="col-md-12 pl-0">
                    <div className="row justify-content-md-center mb-2">
                      <div className="col-md-3">
                        <img
                          src={process.env.PUBLIC_URL + "/user-image.jpg"}
                          className="rounded mx-auto d-block"
                          alt="user image"
                          width="56%"
                        />
                        <p className="text-center">Photo Customer</p>
                      </div>
                      <div className="col-md-3">
                        <img
                          src={process.env.PUBLIC_URL + "/user-image.jpg"}
                          className="rounded mx-auto d-block"
                          alt="user image"
                          width="56%"
                        />
                        <p className="text-center">Photo Others</p>
                      </div>
                    </div>
                    <div className="form-group row pl-3 mb-0">
                      <label className="col-md-3 col-form-label">
                        Applicant’s Name:
                      </label>
                      <label className="col-md-9 col-form-label cus-label">
                        Ariful Islam Oni
                      </label>
                    </div>
                    <div className="form-group row pl-3 mb-0">
                      <label className="col-md-3 col-form-label">
                        Account Number:
                      </label>
                      <label className="col-md-9 col-form-label cus-label">
                        12345679066
                      </label>
                    </div>
                    <div className="form-group row pl-3 mb-0">
                      <label className="col-md-3 col-form-label">
                        Unique Account Number:
                      </label>
                      <label className="col-md-9 col-form-label cus-label">
                        AS1234568
                      </label>
                    </div>
                    <div className="form-group row pl-3 mb-0">
                      <label className="col-md-3 col-form-label">
                        Mother’s Name:
                      </label>
                      <label className="col-md-9 col-form-label cus-label">
                        Farvin Jahan
                      </label>
                    </div>
                    <div className="form-group row pl-3 mb-0">
                      <label className="col-md-3 col-form-label">
                        Father’s Name:
                      </label>
                      <label className="col-md-9 col-form-label cus-label">
                        Aslam Sheikh
                      </label>
                    </div>
                    <div className="form-group row pl-3 mb-0">
                      <label className="col-md-3 col-form-label">
                        Spouse Name:
                      </label>
                      <label className="col-md-9 col-form-label cus-label">
                        N/A
                      </label>
                    </div>
                    <div className="form-group col-md-6 d-inline-block pl-0 mb-0">
                      <label className="col-md-3 col-form-label">
                        Date of Birth:
                      </label>
                      <label className="col-md-9 col-form-label cus-label">
                        1997-08-10
                      </label>
                    </div>
                    <div className="form-group col-md-6 d-inline-block mb-0">
                      <label className="col-md-3 col-form-label">Gender:</label>
                      <label className="col-md-9 col-form-label cus-label">
                        Male
                      </label>
                    </div>
                    <div className="form-group col-md-4 d-inline-block pl-0 mb-0">
                      <label className="col-md-6 col-form-label">
                        Profession:
                      </label>
                      <label className="col-md-6 col-form-label cus-label">
                        Business
                      </label>
                    </div>
                    <div className="form-group col-md-4 d-inline-block mb-0">
                      <label className="col-md-6 col-form-label">
                        Monthly income:
                      </label>
                      <label className="col-md-6 col-form-label cus-label">
                        50,000
                      </label>
                    </div>
                    <div className="form-group col-md-4 d-inline-block mb-0">
                      <label className="col-md-6 col-form-label">
                        Sources of Fund:
                      </label>
                      <label className="col-md-6 col-form-label cus-label">
                        Own Income
                      </label>
                    </div>
                    <div className="form-group col-md-4 d-inline-block pl-0 mb-0">
                      <label className="col-md-6 col-form-label">
                        Mobile Number:
                      </label>
                      <label className="col-md-6 col-form-label cus-label">
                        01987654345
                      </label>
                    </div>
                    <div className="form-group col-md-4 d-inline-block mb-0">
                      <label className="col-md-6 col-form-label">
                        Nationality:
                      </label>
                      <label className="col-md-6 col-form-label cus-label">
                        Bangladeshi
                      </label>
                    </div>
                    <div className="form-group col-md-4 d-inline-block mb-0">
                      <label className="col-md-6 col-form-label">
                        TIN (if any):
                      </label>
                      <label className="col-md-6 col-form-label cus-label">
                        2346576878779
                      </label>
                    </div>
                    <div className="form-group row pl-3 mb-0">
                      <label className="col-md-3 col-form-label">
                        Present Address:
                      </label>
                      <label className="col-md-9 col-form-label cus-label">
                        হোল্ডিং:২২৪, ওয়ার্ড নং-০৯, ডাকঘর:খুলনা জি পি ও-৯০০০,
                        খালিসপুর, খুলনা সিটি কর্পোরেশন, খুলনা
                      </label>
                    </div>
                    <div className="form-group row pl-3 mb-0">
                      <label className="col-md-3 col-form-label">
                        Permanent Address:
                      </label>
                      <label className="col-md-9 col-form-label cus-label">
                        হোল্ডিং:২২৪, ওয়ার্ড নং-০৯, ডাকঘর:খুলনা জি পি ও-৯০০০,
                        খালিসপুর, খুলনা সিটি কর্পোরেশন, খুলনা
                      </label>
                    </div>
                    <div className="form-group col-md-4 d-inline-block pl-0 mb-0">
                      <label className="col-md-6 col-form-label">
                        Nominee:
                      </label>
                      <label className="col-md-6 col-form-label cus-label">
                        Abdul Motin
                      </label>
                    </div>
                    <div className="form-group col-md-4 d-inline-block mb-0">
                      <label className="col-md-6 col-form-label">
                        Relation:
                      </label>
                      <label className="col-md-6 col-form-label cus-label">
                        Brother
                      </label>
                    </div>
                    <div className="form-group col-md-4 d-inline-block mb-0">
                      <label className="col-md-6 col-form-label">
                        Photograph:
                      </label>
                      <label className="col-md-6 col-form-label cus-label">
                        Yes
                      </label>
                    </div>
                    <div className="row justify-content-md-center mb-2 mt-2">
                      <div className="col-md-3">
                        <img
                          src={process.env.PUBLIC_URL + "/dummy-img.jpg"}
                          className="rounded mx-auto d-block"
                          alt="user image"
                          width="75%"
                        />
                        <p className="text-center">Front side of NID</p>
                      </div>
                      <div className="col-md-3">
                        <img
                          src={process.env.PUBLIC_URL + "/dummy-img.jpg"}
                          className="rounded mx-auto d-block"
                          alt="user image"
                          width="75%"
                        />
                        <p className="text-center">Back side of NIDD</p>
                      </div>
                    </div>
                    <div className="row justify-content-md-start pl-2">
                      <p className="cus-p2">
                        <b>1.</b> Has UNSCRs check done?{" "}
                        <div className="form-check-inline ml-2">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="unscr"
                              className="form-check-input"
                              value="yes"
                              checked
                            />
                            Yes
                          </label>
                        </div>
                        <div className="form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="unscr"
                              className="form-check-input"
                              value="no"
                              //   checked={this.state.selectedOption === "no"}
                              onChange={this.onValueChange}
                            />
                            No
                          </label>
                        </div>
                      </p>
                      <p className="cus-p2">
                        <b>2.</b> Has risk grading done?{" "}
                        <div className="form-check-inline ml-2">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="risk"
                              className="form-check-input"
                              value="yes"
                              checked
                            />
                            Yes
                          </label>
                        </div>
                        <div className="form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="risk"
                              className="form-check-input"
                              value="no"
                            />
                            No
                          </label>
                        </div>{" "}
                        (If assessed risk high then conduct EDD as per BFIU
                        circular.)
                      </p>
                      <p className="cus-p2">
                        <b>3.</b> Is the customer is IPs/PEPs?{" "}
                        <div className="form-check-inline ml-2">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="peps"
                              className="form-check-input"
                              value="yes"
                            />
                            Yes
                          </label>
                        </div>
                        <div className="form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="peps"
                              className="form-check-input"
                              value="no"
                              checked
                            />
                            No
                          </label>
                        </div>{" "}
                        (If client is PEPs or IPs with higher risk, then conduct
                        EDD as per BFIU circular. )
                      </p>
                      <p className="cus-p2">
                        <b>4.</b> Is there any adverse media news against the
                        customer?{" "}
                        <div className="form-check-inline ml-2">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="adverse"
                              className="form-check-input"
                              value="yes"
                            />
                            Yes
                          </label>
                        </div>
                        <div className="form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="adverse"
                              className="form-check-input"
                              value="no"
                              checked
                            />
                            No
                          </label>
                        </div>{" "}
                        (If any then conduct EDD. )
                      </p>
                      <p className="cus-p2">
                        <b>5.</b> Has the source of fund verified/justified?{" "}
                        <div className="form-check-inline ml-2">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="verified"
                              className="form-check-input"
                              value="yes"
                              checked
                            />
                            Yes
                          </label>
                        </div>
                        <div className="form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="verified"
                              className="form-check-input"
                              value="no"
                            />
                            No
                          </label>
                        </div>
                      </p>
                      <p className="cus-p2">
                        <b>6.</b> Has the beneficial ownership checked?{" "}
                        <div className="form-check-inline ml-2">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="beneficial"
                              className="form-check-input"
                              value="yes"
                              checked
                            />
                            Yes
                          </label>
                        </div>
                        <div className="form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="beneficial"
                              className="form-check-input"
                              value="no"
                            />
                            No
                          </label>
                        </div>{" "}
                        (If there any beneficial owner found, then conduct CDD
                        on beneficial owner. If beneficial owner is PEPs, then
                        conduct EDD. )
                      </p>
                      <p className="cus-p2">
                        <b>7.</b> Are any other documents obtained{" "}
                        <span className="cus-span">Yes</span>
                      </p>
                      <p className="cus-p2">
                        <b>8.</b> Has review of customer profile done (existing
                        customer)?{" "}
                        <div className="form-check-inline ml-2">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="prfileDone"
                              className="form-check-input"
                              value="yes"
                              checked
                            />
                            Yes
                          </label>
                        </div>
                        <div className="form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="prfileDone"
                              className="form-check-input"
                              value="no"
                            />
                            No
                          </label>
                        </div>
                        if so, date of review
                        <span className="cus-span">27-02-2020</span>
                      </p>
                      <p className="cus-p2">
                        <b>9.</b> What is the average range and usual pattern of
                        customer transaction (over 6/12 months)?
                        <span className="cus-span">20000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Pdfs;
