import React, { Component } from "react";
import {
  Page,
  Text,
  PDFDownloadLink,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";
import { confirmAlert } from "react-confirm-alert";
import { DOCUMENTCHECKLIST } from "../Enum";
import { instance } from "../service/ApiUrls";
import { baseURL } from "../service/ApiService";
import { service, business } from "../data/profession";

class SbiAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.location.state.datToload,
      total: 0,
      a1: 0,
      a2: 3,
      b: 1,
      c1: 0,
      c2: 0,
      d: 0,
      e: 1,
      f: 0,
    };
  }

  professionScore = () => {
    let str = this.state.tp?.profession;

    let serviceName = str?.substring(str.indexOf(":") + 1);
    let serviceType = str?.substring(0, str.indexOf(":") - 1);
    console.log("type", serviceType);
    if (serviceType == "Service") {
      let s3;
      service.map((e) => {
        if (serviceName.includes(e.name)) {
          s3 = e.score;
          this.setState({ f: e.score });
        }
      });
      console.log("s3", s3);
    } else {
      let s3;
      business.map((e) => {
        if (serviceName.includes(e.name)) {
          s3 = e.score;
          this.setState({ f: e.score });
        }
      });
      console.log("s3", s3);
    }
  };

  handleTotal = (e) => {
    const { value, name } = e.target; // gets the name and value from input field
    const parsedValue = value === "" ? "" : parseFloat(value);
    this.setState({
      [name]: parsedValue,
    });
  };
  nomineeInfo = () => {
    let name;
    let relation, ndob, sharePercent, nidentityNumber, nidentityType;
    this.state.nomineeInfo?.map((e, i) => {
      name = e.nominee.name;
      relation = e.nominee.relation;
      ndob = e.nominee.dob;
      sharePercent = e.sharePercent;
      nidentityNumber = e.nominee.identityNumber;
      nidentityType = e.nominee.identityType;
    });
    this.setState({
      name: name,
      relation: relation,
      ndob: ndob,
      sharePercent: sharePercent,
      nidentityNumber: nidentityNumber,
      nidentityType: nidentityType,
    });
  };
  customerCreation = () => {
    let customerName = "";
    // let DOCUMENTCHECKLIST;
    let fatherName,
      motherName,
      spouseName,
      presentAddress,
      permanentAddress,
      dob,
      birth_place,
      mobile,
      email,
      nameBn,
      professionalAddressInstitutionAddress,
      identityDocExpiryDate,
      introducerName,
      introducerAccNumber,
      nationality,
      monthlyIncome,
      gender,
      tinNo,
      identityDocType,
      documentReference,
      passportNumber;
    this.state.listCustomers?.map((e, i) => {
      if (i === 0) {
        customerName = e.cp.name;
      } else {
        customerName += " AND " + e.cp.name;
      }
      documentReference = e.cp.documentReference;
      fatherName = e.cp.f_name + " ";
      motherName = e.cp.m_name;
      spouseName = e.cp.spouse_name;
      nameBn = e.cp.nameBn;
      mobile = e.cp.mobile;
      email = e.cp.email;
      nationality = e.cp.nationality;
      monthlyIncome = e.cp.monthlyIncome;
      gender = e.cp.gender;
      identityDocExpiryDate = e.cp.identityDocExpiryDate;
      introducerAccNumber = e.cp.introducerAccNumber;
      identityDocType = e.cp.identityDocType;
      introducerName = e.cp.introducerName;
      passportNumber = e.cp.passportDetail
        ? e.cp.passportDetail.passportNumber
        : null;
      tinNo = e.cp.tinNo;
      professionalAddressInstitutionAddress =
        e.cp.professionalAddressInstitutionAddress;
      presentAddress =
        (e.presentAddress.additionalMouzaOrMoholla !== null
          ? "Moholla: " + e.presentAddress.additionalMouzaOrMoholla + ", "
          : "") +
        (e.presentAddress.additionalVillageOrRoad !== null
          ? "Village: " + e.presentAddress.additionalVillageOrRoad + ", "
          : "") +
        (e.presentAddress.homeOrHoldingNo !== null
          ? "Holding No: " + e.presentAddress.homeOrHoldingNo + ", "
          : "") +
        (e.presentAddress.unionOrWard_en !== null
          ? "Union: " + e.presentAddress.unionOrWard_en + ", "
          : "") +
        (e.presentAddress.postOffice !== null
          ? "Post Office: " + e.presentAddress.postOffice + ", "
          : "") +
        (e.presentAddress.cityCorporationOrMunicipality !== null
          ? "City: " + e.presentAddress.cityCorporationOrMunicipality + ", "
          : "") +
        "Upozila: " +
        e.presentAddress.upozila_en +
        ", " +
        "District: " +
        e.presentAddress.district_en +
        ", " +
        "Division: " +
        e.presentAddress.division_en +
        " .";
      permanentAddress =
        (e.permanentAddress.additionalMouzaOrMoholla !== null
          ? "Moholla: " + e.permanentAddress.additionalMouzaOrMoholla + ", "
          : "") +
        (e.permanentAddress.additionalVillageOrRoad !== null
          ? "Village: " + e.permanentAddress.additionalVillageOrRoad + ", "
          : "") +
        (e.permanentAddress.homeOrHoldingNo !== null
          ? "Holding No: " + e.permanentAddress.homeOrHoldingNo + ", "
          : "") +
        (e.permanentAddress.unionOrWard_en !== null
          ? "Union: " + e.permanentAddress.unionOrWard_en + ", "
          : "") +
        (e.permanentAddress.postOffice !== null
          ? "Post Office: " + e.permanentAddress.postOffice + ", "
          : "") +
        (e.permanentAddress.cityCorporationOrMunicipality !== null
          ? "City: " + e.permanentAddress.cityCorporationOrMunicipality + ", "
          : "") +
        "Upozila: " +
        e.permanentAddress.upozila_en +
        ", " +
        "District: " +
        e.permanentAddress.district_en +
        ", " +
        "Division: " +
        e.permanentAddress.division_en +
        ".";
      // professionalAddressInstitutionAddress= e.cp.professionalAddressInstitutionAddress
      dob = e.cp.dob;
      birth_place = e.cp.birth_place;
      e.documentDetailList.map((v, k) => {
        if (Number(v.documentType) === DOCUMENTCHECKLIST.PHOTO.value) {
          this.setState({ customerPhoto: v.base64Content });
        } else if (
          Number(v.documentType) === DOCUMENTCHECKLIST.SIGNATURE.value
        ) {
          this.setState({ customerSignature: v.base64Content });
        } else if (
          Number(v.documentType) === DOCUMENTCHECKLIST.NIDFRONT.value
        ) {
          this.setState({ customerNIDFRONT: v.base64Content }, () => {
            // console.log(this.state.customerNIDFRONT);
          });
        } else if (Number(v.documentType) === DOCUMENTCHECKLIST.NIDBACK.value) {
          this.setState({ customerNIDBACK: v.base64Content });
        } else if (
          Number(v.documentType) === DOCUMENTCHECKLIST.PASSPORT.value
        ) {
          this.setState({ customerPASSPORT: v.base64Content });
        }
      });
    });
    this.setState(
      {
        customerName: customerName,
        documentReference: documentReference,
        fatherName: fatherName,
        motherName: motherName,
        spouseName: spouseName,
        presentAddress: presentAddress,
        permanentAddress: permanentAddress,
        dob: dob,
        birth_place: birth_place,
        mobile: mobile,
        email: email,
        nameBn: nameBn,
        nationality: nationality,
        monthlyIncome: monthlyIncome,
        tinNo: tinNo,
        gender: gender,
        professionalAddressInstitutionAddress:
          professionalAddressInstitutionAddress,
        identityDocExpiryDate: identityDocExpiryDate,
        introducerName: introducerName,
        introducerAccNumber: introducerAccNumber,
        passportNumber: passportNumber,
        identityDocType: identityDocType,
      },
      () => {
        this.callDocumentList(this.state.documentReference);
      }
    );
  };

  callDocumentList = (uniquereference) => {
    instance
      .post(baseURL + "/api/filesusingreferencebase64", null, {
        params: {
          uniquereference: uniquereference,
        },
      })
      .then((res) => {
        if (res.data.result.error === false) {
          let data = res.data.data;

          data.map((v) => {
            if (
              v !== null &&
              v !== undefined &&
              v.base64Content?.startsWith("/", 0)
            ) {
              this.setState({
                propicexten: "data:image/jpeg;base64",
              });
              // console.log("image type", this.state.propicexten);
            } else {
              this.setState({
                propicexten: "data:image/png;base64",
              });
              console.log("image type 2", this.state.propicexten);
            }

            if (Number(v?.documentType) === DOCUMENTCHECKLIST.PHOTO.value) {
              this.setState({ customerPhoto: v?.base64Content });
            } else if (
              Number(v.documentType) === DOCUMENTCHECKLIST.SIGNATURE.value
            ) {
              this.setState({ customerSignature: v.base64Content });
              console.log("signature", v.base64Content);
            } else if (
              Number(v.documentType) === DOCUMENTCHECKLIST.NIDFRONT.value
            ) {
              this.setState({ customerNIDFRONT: v.base64Content }, () => {
                // console.log(this.state.customerNIDFRONT);
              });
            } else if (
              Number(v.documentType) === DOCUMENTCHECKLIST.NIDBACK.value
            ) {
              this.setState({ customerNIDBACK: v.base64Content });
            } else if (
              Number(v.documentType) === DOCUMENTCHECKLIST.PASSPORT.value
            ) {
              this.setState({ customerPASSPORT: v.base64Content });
            }
          });
          //console.log("picdata", data);
        } else if (res.data.result.error === true) {
          this.setState({}, () => {
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
      .catch((err) => this.setState({ loaderShow: false }));
  };

  componentDidMount() {
    this.customerCreation();
    this.nomineeInfo();
    this.professionScore();
  }

  render() {
    Font.register({
      family: "kalpurush",
      src: "/kalpurush.ttf",
    });
    Font.register({
      family: "Oswald",
      src: "/oswald.ttf",
    });
    const BORDER_COLOR = "#000000";
    const BORDER_STYLE = "solid";
    const COL1_WIDTH = 12.5;
    const COLN_WIDTH = (100 - COL1_WIDTH) / 14;
    const COL2_WIDTH = 43.75;
    const COLN2_WIDTH = (100 - COL2_WIDTH) / 9;
    const COL3_WIDTH = 50;
    const COLN3_WIDTH = (100 - COL3_WIDTH) / 8;
    const styles = StyleSheet.create({
      body: {
        paddingTop: 25,
        paddingBottom: 25,
        paddingHorizontal: 35,
        fontFamily: "kalpurush",
      },
      text: {
        padding: "0px",
        fontSize: 10,
        width: "100%",
      },
      textT: {
        padding: "0px",
        fontSize: 14,
        width: "100%",
        textAlign: "center",
        fontWeight: "bold",
        marginTop: "10px",
      },
      text1: {
        fontSize: 10,
        width: "30%",
        display: "flex",
      },
      text2: {
        fontSize: 10,
        width: "70%",
        display: "flex",
        borderBottom: "1px dotted #000000",
      },
      textf: {
        fontSize: 10,
        width: "70%",
        display: "flex",
        fontFamily: "kalpurush",
        borderBottom: "1px dotted #000000",
        maxLines: 2,
      },
      text3: {
        fontSize: 10,
        width: "33%",
        display: "flex",
      },
      text4: {
        fontSize: 10,
        width: "33%",
        display: "flex",
        borderBottom: "1px dotted #000000",
      },
      text5: {
        fontSize: 10,
        width: "21%",
        display: "flex",
        borderBottom: "1px dotted #000000",
      },
      text6: {
        fontSize: 10,
        width: "50%",
        display: "flex",
        textAlign: "center",
      },
      image: {
        marginVertical: 15,
        marginHorizontal: 85,
        width: "50%",
      },
      image1: {
        marginVertical: 5,
        marginHorizontal: 5,
        width: "100%",
      },
      imageS: {
        marginVertical: 5,
        marginHorizontal: 5,
        width: "95%",
        maxHeight: "120px",
      },
      image2: {
        marginVertical: 8,
        marginHorizontal: 5,
        padding: "7px 0px",
        width: "90%",
      },
      cusView: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: "7px 0px",
      },
      cusView2: {
        display: "flex",
        flexDirection: "row",
        width: "50%",
        padding: "7px 0px",
      },
      cusView1: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: "0px",
        marginTop: "-10px",
        paddingTop: "-10px",
      },
      container: {
        flexDirection: "row",
        "@media max-width: 400": {
          flexDirection: "column",
        },
      },
      leftColumn: {
        flexDirection: "column",
        width: "50%",
        marginLeft: 1,
        marginRight: 20,
        marginTop: 10,
        "@media max-width: 400": {
          width: "50%",
          marginRight: 30,
        },
        "@media orientation: landscape": {
          width: "50%",
          marginRight: 50,
        },
      },
      rightColumn: {
        flexDirection: "column",
        flexGrow: 1,
        flexShrink: 1,
        marginLeft: 10,
        marginRight: 0,
        marginTop: 25,

        "@media max-width: 400": {
          marginTop: 10,
          marginLeft: 5,
        },
      },
      leftColumn1: {
        flexDirection: "column",
        width: "70%",
        marginLeft: 1,
        marginRight: 20,
        marginTop: 10,
        "@media max-width: 400": {
          width: "50%",
          marginRight: 30,
        },
        "@media orientation: landscape": {
          width: "70%",
          marginRight: 50,
        },
      },
      rightColumn1: {
        flexDirection: "column",
        flexGrow: 1,
        flexShrink: 1,
        marginLeft: 10,
        marginRight: 0,
        marginTop: 25,

        "@media max-width: 400": {
          marginTop: 10,
          marginLeft: 5,
        },
      },
      table: {
        display: "table",
        width: "auto",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
      },
      tableRow: {
        margin: "auto",
        flexDirection: "row",
      },
      tableCol1Header: {
        width: COL1_WIDTH + "%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: "#000",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableColHeader: {
        width: COLN_WIDTH + "%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: "#000",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableCol1: {
        width: COL1_WIDTH + "%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableCol2: {
        width: COL2_WIDTH + "%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableCol4: {
        width: COL3_WIDTH + "%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableColCus: {
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableCol: {
        width: COLN_WIDTH + "%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableCol3: {
        width: COLN2_WIDTH + "%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableCol5: {
        width: COLN3_WIDTH + "%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableCellHeader: {
        margin: 5,
        fontSize: 12,
        fontWeight: 500,
      },
      tableCell: {
        margin: 2,
        fontSize: 7,
      },
      tableCellCus: {
        margin: 2,
        fontSize: 9,
      },
    });
    const Page1 = (
      <>
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <Image style={styles.image1} src="/sbi-i.png" />
          </View>
          <View style={styles.rightColumn}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell}>A/C No.</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol2}>
                  <Text style={styles.tableCell}>Unique Customer ID Code</Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol4}>
                  <Text style={styles.tableCell}>Date</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>D</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>D</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>M</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>M</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>Y</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>Y</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>Y</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>Y</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.cusView}>
          <Text style={styles.textT}>ACCOUNT OPENING FORM (INDIVIDUAL)</Text>
        </View>
        <View style={styles.cusView}>
          <Text style={styles.text}>The Manager</Text>
        </View>
        <View style={[styles.cusView, { marginTop: "-10px" }]}>
          <Text style={styles.text}>State Bank of India</Text>
        </View>
        <View style={[styles.cusView, { marginTop: "-10px" }]}>
          <Text
            style={{
              display: "flex",
              flexDirection: "row",
              width: "15%",
              borderBottom: "1px solid #000000",
              fontSize: "7px",
            }}
          >
            {this.state.branch?.name}
          </Text>
          <Text style={styles.text}>Branch</Text>
        </View>
        <View
          style={[styles.cusView, { marginTop: "10px", marginBottom: "-10px" }]}
        >
          <Text style={styles.text}>Dear Sir,</Text>
        </View>
        <View style={[styles.cusView, { marginTop: "5px" }]}>
          <Text style={styles.text}>
            I/We am/are applying to open an account in your Branch. I/We furnish
            below information regarding the account and personal details:
          </Text>
        </View>
        <View style={styles.cusView}>
          <Text
            style={{
              textDecoration: "underline",
              fontSize: "10px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            FIRST PART: ACCOUNT RELATED INFORMATION
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View
              style={[
                styles.tableColCus,
                { width: "3%", borderBottomWidth: 0 },
              ]}
            >
              <Text style={styles.tableCellCus}>1</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Account Title (In Bangla)</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>
                {this.state.nameBn} {"  "}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[styles.tableColCus, { width: "3%", borderTopWidth: 0 }]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>In English Block Letter</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>{this.state.customerName}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>2</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Nature of A/C</Text>
            </View>
            <View style={[styles.tableColCus, { width: "25%" }]}>
              <Text style={styles.tableCellCus}>
                {this.state.product.name}{" "}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "4%" }]}>
              <Text style={styles.tableCellCus}>3 </Text>
            </View>
            <View style={[styles.tableColCus, { width: "16%" }]}>
              <Text style={styles.tableCellCus}>Currency </Text>
            </View>
            <View style={[styles.tableColCus, { width: "25%" }]}>
              <Text style={styles.tableCellCus}>BDT </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>4</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Mode of Account Operation</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>Singly</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>5</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}> Initial Deposit Amount</Text>
            </View>
            <View style={[styles.tableColCus, { width: "7%" }]}>
              <Text style={styles.tableCellCus}>In Fig</Text>
            </View>
            <View style={[styles.tableColCus, { width: "18%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "10%" }]}>
              <Text style={styles.tableCellCus}>In Word</Text>
            </View>
            <View style={[styles.tableColCus, { width: "35%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
        </View>
        <View style={[styles.cusView, { marginTop: "10px" }]}>
          <Text style={styles.text}>
            6. Whether The Customer has Account in Other Bank (If YES, describe
            below) : NO
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>SL</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}>Account Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}>Account Number</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}>Bank Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}>Branch Name</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>i</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>ii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>iii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
        </View>
        <View style={[styles.cusView, { marginTop: "10px" }]}>
          <Text style={styles.text}>
            7. Facilities & Alternate Delivery Channels
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>Cheque Book</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>Debit Card</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>SMS Banking </Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>Internet Banking</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>e-Statement</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>
                {this.state.account?.checkBook === false ? "No" : "Yes"}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>
                {this.state.account?.debitCard === false ? "No" : "Yes"}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>
                {this.state.account?.smsAlert === false ? "No" : "Yes"}{" "}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>N/A</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>N/A</Text>
            </View>
          </View>
        </View>
        <View style={[styles.table, { marginTop: "20px" }]}>
          <View style={styles.tableRow}>
            <View
              style={[
                styles.tableColCus,
                { width: "3%", borderBottomWidth: 0 },
              ]}
            >
              <Text style={styles.tableCellCus}>8</Text>
            </View>
            <View
              style={[
                styles.tableColCus,
                { width: "27%", borderBottomWidth: 0 },
              ]}
            >
              <Text style={styles.tableCellCus}>
                Mobile & E mail ID for SMS
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "15%" }]}>
              <Text style={styles.tableCellCus}>Mobile Number </Text>
            </View>
            <View style={[styles.tableColCus, { width: "55%" }]}>
              <Text style={styles.tableCellCus}>{this.state.mobile}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[styles.tableColCus, { width: "3%", borderTopWidth: 0 }]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View
              style={[styles.tableColCus, { width: "27%", borderTopWidth: 0 }]}
            >
              <Text style={styles.tableCellCus}>
                {" "}
                /Internet Banking facilities
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "15%" }]}>
              <Text style={styles.tableCellCus}>Email Address </Text>
            </View>
            <View style={[styles.tableColCus, { width: "55%" }]}>
              <Text style={styles.tableCellCus}>{this.state.email}</Text>
            </View>
          </View>
        </View>
      </>
    );
    const Page2 = (
      <>
        <View style={[styles.container, { marginTop: "10px" }]} break>
          <View style={styles.leftColumn}>
            <Image style={styles.image1} src="/sbi-i.png" />
          </View>
          <View style={[styles.rightColumn, { marginTop: "40px" }]}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell}>A/C No.</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableColCus, { width: "100%" }]}>
                  <Text
                    style={[
                      styles.tableCelCus,
                      { width: "100%", textAlign: "center", fontSize: "8px" },
                    ]}
                  >
                    ( For Bank Use )
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.container, { marginTop: "10px" }]}>
          <View style={styles.leftColumn1}>
            <View style={[styles.cusView, { marginBottom: "10px" }]}>
              <Text
                style={{
                  textDecoration: "underline",
                  fontSize: "10px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                SECOND PART: PERSONAL INFORMATION
              </Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableColCus,
                    { width: "4%", borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={styles.tableCellCus}>1</Text>
                </View>
                <View style={[styles.tableColCus, { width: "31%" }]}>
                  <Text style={styles.tableCellCus}>
                    Account Title (In Bangla)
                  </Text>
                </View>
                <View style={[styles.tableColCus, { width: "65%" }]}>
                  <Text style={styles.tableCellCus}>
                    {this.state.nameBn} {"  "}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableColCus,
                    { width: "4%", borderTopWidth: 0 },
                  ]}
                >
                  <Text style={styles.tableCellCus}></Text>
                </View>
                <View style={[styles.tableColCus, { width: "31%" }]}>
                  <Text style={styles.tableCellCus}>
                    In English Block Letter
                  </Text>
                </View>
                <View style={[styles.tableColCus, { width: "65%" }]}>
                  <Text style={styles.tableCellCus}>
                    {this.state.customerName}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableColCus,
                    { width: "4%", borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={styles.tableCellCus}>2</Text>
                </View>
                <View style={[styles.tableColCus, { width: "31%" }]}>
                  <Text style={styles.tableCellCus}>a. Date of Birth</Text>
                </View>
                <View style={[styles.tableColCus, { width: "65%" }]}>
                  <Text style={styles.tableCellCus}>{this.state.dob}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableColCus,
                    { width: "4%", borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={styles.tableCellCus}></Text>
                </View>
                <View style={[styles.tableColCus, { width: "31%" }]}>
                  <Text style={styles.tableCellCus}>b. Place of Birth</Text>
                </View>
                <View style={[styles.tableColCus, { width: "65%" }]}>
                  <Text style={styles.tableCellCus}>
                    {this.state.birth_place}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableColCus,
                    { width: "4%", borderTopWidth: 0 },
                  ]}
                >
                  <Text style={styles.tableCellCus}></Text>
                </View>
                <View style={[styles.tableColCus, { width: "31%" }]}>
                  <Text style={styles.tableCellCus}>c. Country of Birth</Text>
                </View>
                <View style={[styles.tableColCus, { width: "65%" }]}>
                  <Text style={styles.tableCellCus}>
                    {this.state.nationality === "bangladeshi"
                      ? "Bangladesh"
                      : "India"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.rightColumn,
              { marginTop: "10px", marginBottom: "5px" },
            ]}
          >
            <View
              style={[
                styles.cusView,
                {
                  border: "1px solid #000000",
                  textAlign: "center",
                  padding: "10px",
                  height: "130px",
                },
              ]}
            >
              {this.state.customerPhoto !== undefined &&
              this.state.customerPhoto !== null ? (
                <Image
                  style={styles.image1}
                  src={`${this.state.propicexten},${this.state.customerPhoto}`}
                />
              ) : (
                <Text
                  style={[
                    styles.text,
                    {
                      textAlign: "center",
                    },
                  ]}
                >
                  Photograph of Account Holder
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={[styles.table, { marginTop: "10px" }]}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>3</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Father???s Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>{this.state.fatherName}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>4</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Mother???s Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>{this.state.motherName}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>5</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Spouse???s Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>{this.state.spouseName}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>6</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}> Nationality</Text>
            </View>
            <View style={[styles.tableColCus, { width: "30%" }]}>
              <Text style={styles.tableCellCus}>
                {this.state.nationality === "bangladeshi"
                  ? "Bangladeshi"
                  : "India"}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "40%" }]}>
              <Text style={styles.tableCellCus}>
                (For Foreign National, copy of valid Passport including Visa has
                to be mandatorily collected)
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>7</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Gender</Text>
            </View>
            <View style={[styles.tableColCus, { width: "25%" }]}>
              <Text style={styles.tableCellCus}>{this.state.gender}</Text>
            </View>
            <View style={[styles.tableColCus, { width: "5%" }]}>
              <Text style={styles.tableCellCus}>8</Text>
            </View>
            <View style={[styles.tableColCus, { width: "17%" }]}>
              <Text style={styles.tableCellCus}>Resident Status</Text>
            </View>
            <View style={[styles.tableColCus, { width: "23%" }]}>
              <Text style={styles.tableCellCus}>Resident</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "100%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                (If needed, Guidelines for Foreign Exchange Transactions issued
                by Bangladesh Bank must be followed)
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>9</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>
                Profession (In details with Designation)
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>
                {this.state.tp?.profession}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>10</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}> Monthly Income </Text>
            </View>
            <View style={[styles.tableColCus, { width: "25%" }]}>
              <Text style={styles.tableCellCus}>
                {this.state.tp?.monthlyIncome}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "5%" }]}>
              <Text style={styles.tableCellCus}>12</Text>
            </View>
            <View style={[styles.tableColCus, { width: "17%" }]}>
              <Text style={styles.tableCellCus}>
                Tax Identification Number (If any){" "}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "23%" }]}>
              <Text style={styles.tableCellCus}>{this.state.tinNo}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>11</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>
                Source of Fund (In details)
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>
                {" "}
                {this.state.tp?.sourceOfFund}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.cusView, { marginTop: "10px" }]}>
          <Text style={styles.text}>13. Contact Information</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "33.33%" }]}>
              <Text style={styles.tableCellCus}>Present Address</Text>
            </View>
            <View style={[styles.tableColCus, { width: "33.33%" }]}>
              <Text style={styles.tableCellCus}>Permanent Address</Text>
            </View>
            <View style={[styles.tableColCus, { width: "33.33%" }]}>
              <Text style={styles.tableCellCus}>Professional Address</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[
                styles.tableColCus,
                { width: "33.33%", minHeight: "60px" },
              ]}
            >
              <Text style={styles.tableCellCus}>
                {this.state.presentAddress}
              </Text>
            </View>
            <View
              style={[
                styles.tableColCus,
                { width: "33.33%", minHeight: "60px" },
              ]}
            >
              <Text style={styles.tableCellCus}>
                {this.state.permanentAddress !== null
                  ? this.state.permanentAddress
                  : ""}
              </Text>
            </View>
            <View
              style={[
                styles.tableColCus,
                { width: "33.33%", minHeight: "60px" },
              ]}
            >
              <Text style={styles.tableCellCus}>
                {!this.state.professionalAddressInstitutionAddress}
              </Text>
            </View>
          </View>
        </View>
        <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
          (Documents as proof of address must be given, at least one in favour
          of address or as per directive of Bank)
        </Text>
        <View style={[styles.cusView, { marginTop: "10px" }]}>
          <Text style={styles.text}>14. Identification Document</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>a</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}>Identification Document</Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "4%" }]}>
              <Text style={styles.tableCellCus}>b</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20.25%" }]}>
              <Text style={styles.tableCellCus}>Birth Registration No</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>c</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}> Passport No. </Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}>
                {this.state.nidentityType === 3
                  ? this.state.nidentityNumber
                  : ""}
                {this.state.passportNumber}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}>Expiry Date </Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}>
                {this.state.identityDocExpiryDate}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>d</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}> Driving License No </Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}>Expiry Date</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>e</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}>Expiry Date</Text>
            </View>
            <View style={[styles.tableColCus, { width: "74.75%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
        </View>
        <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
          (At least one of above documents must be submitted as per extant
          guidelines of Bangladesh Bank & or Policy of SBI)
        </Text>
      </>
    );
    const Page3 = (
      <>
        <View style={[styles.cusView, { marginTop: "10px" }]} break>
          <Text style={styles.text}>15. Information of Introducer</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>a</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}>Introducer Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "74.75%" }]}>
              <Text style={styles.tableCellCus}>
                {this.state.introducerName}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>b</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}> Account Number</Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}>
                {this.state.introducerAccNumber}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "4%" }]}>
              <Text style={styles.tableCellCus}>c</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20.25%" }]}>
              <Text style={styles.tableCellCus}>Branch Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>d</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}> National ID No</Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "4%" }]}>
              <Text style={styles.tableCellCus}>e</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20.25%" }]}>
              <Text style={styles.tableCellCus}>Date of Birth</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[
                styles.tableColCus,
                { width: "3%", borderBottomWidth: 0 },
              ]}
            >
              <Text style={styles.tableCellCus}>f</Text>
            </View>
            <View style={[styles.tableColCus, { width: "48.5%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                Introducer Signature with date
              </Text>
            </View>
            <View
              style={[
                styles.tableColCus,
                { width: "4%", borderBottomWidth: 0 },
              ]}
            >
              <Text style={styles.tableCellCus}>g</Text>
            </View>
            <View style={[styles.tableColCus, { width: "44.5%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                Signature verified by SBI official with seal & date
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "48.5%" }]}>
              <Text style={[styles.tableCellCus, { minHeight: "60px" }]}></Text>
            </View>
            <View
              style={[styles.tableColCus, { width: "4%", borderTopWidth: 0 }]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "44.5%" }]}>
              <Text style={[styles.tableCellCus, { minHeight: "60px" }]}></Text>
            </View>
          </View>
        </View>
        <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
          (Personal information to be attached in the 2nd part for each person,
          in case Account holder is joint/multiple. If Account holder is minor,
          Personal Information of Legal Guardian to be attached with the 2nd
          part. Legal Guardian means Father or Mother or any other legal
          guardian).
        </Text>
        <View style={[styles.cusView, { marginTop: "10px" }]}>
          <Text style={styles.text}>
            16. Nominated Person for Emergency Contact:
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>a</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}> Full Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "74.75%" }]}>
              <Text style={styles.tableCellCus}>{this.state.name}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>a</Text>
            </View>
            <View
              style={[
                styles.tableColCus,
                { width: "22.25%", minHeight: "60px" },
              ]}
            >
              <Text style={styles.tableCellCus}> Present Address</Text>
            </View>
            <View
              style={[
                styles.tableColCus,
                { width: "74.75%", minHeight: "60px" },
              ]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>c</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}>Mobile Number</Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "4%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "20.25%" }]}>
              <Text style={styles.tableCellCus}>Email Address</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>e</Text>
            </View>
            <View style={[styles.tableColCus, { width: "48.5%" }]}>
              <Text style={styles.tableCellCus}>
                {" "}
                Relation with A/C holder /Operator
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "48.5%" }]}>
              <Text style={styles.tableCellCus}>{this.state.relation}</Text>
            </View>
          </View>
        </View>
      </>
    );
    const Page4 = (
      <>
        <View style={[styles.container, { marginTop: "10px" }]} break>
          <View style={styles.leftColumn}>
            <Image style={styles.image1} src="/sbi-i.png" />
          </View>
          <View style={[styles.rightColumn, { marginTop: "30px" }]}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell}>A/C No.</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableColCus, { width: "100%" }]}>
                  <Text
                    style={[
                      styles.tableCelCus,
                      { width: "100%", textAlign: "center", fontSize: "8px" },
                    ]}
                  >
                    ( For Bank Use )
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.container, { marginTop: "5px" }]}>
          <View style={styles.leftColumn1}>
            <View style={[styles.cusView, { marginBottom: "2px" }]}>
              <Text
                style={{
                  textDecoration: "underline",
                  fontSize: "10px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                SECOND PART (ADDITIONAL) : PERSONAL INFORMATION OF GUARDIAN
              </Text>
            </View>
            <View
              style={[
                styles.cusView,
                { marginTop: "-10px", marginBottom: "5px" },
              ]}
            >
              <Text
                style={{
                  textDecoration: "underline",
                  fontSize: "9px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                (To be filled up in case Account Holder is minor)
              </Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableColCus,
                    { width: "4%", borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={styles.tableCellCus}>1</Text>
                </View>
                <View style={[styles.tableColCus, { width: "40%" }]}>
                  <Text style={styles.tableCellCus}>
                    Name of Account Holder (Minor)
                  </Text>
                </View>
                <View style={[styles.tableColCus, { width: "56%" }]}>
                  <Text style={styles.tableCellCus}></Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableColCus,
                    { width: "4%", borderTopWidth: 0 },
                  ]}
                >
                  <Text style={styles.tableCellCus}></Text>
                </View>
                <View style={[styles.tableColCus, { width: "40%" }]}>
                  <Text style={styles.tableCellCus}>
                    Name of Guardian / Legal Guardian
                  </Text>
                </View>
                <View style={[styles.tableColCus, { width: "56%" }]}>
                  <Text style={styles.tableCellCus}></Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableColCus,
                    { width: "4%", borderTopWidth: 0 },
                  ]}
                >
                  <Text style={styles.tableCellCus}></Text>
                </View>
                <View style={[styles.tableColCus, { width: "40%" }]}>
                  <Text style={styles.tableCellCus}>
                    Relationship with the Account Holder
                  </Text>
                </View>
                <View style={[styles.tableColCus, { width: "56%" }]}>
                  <Text style={styles.tableCellCus}></Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableColCus,
                    { width: "4%", borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={styles.tableCellCus}>2</Text>
                </View>
                <View style={[styles.tableColCus, { width: "31%" }]}>
                  <Text style={styles.tableCellCus}>a. Date of Birth</Text>
                </View>
                <View style={[styles.tableColCus, { width: "65%" }]}>
                  <Text style={styles.tableCellCus}></Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableColCus,
                    { width: "4%", borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={styles.tableCellCus}></Text>
                </View>
                <View style={[styles.tableColCus, { width: "31%" }]}>
                  <Text style={styles.tableCellCus}>b. Place of Birth</Text>
                </View>
                <View style={[styles.tableColCus, { width: "65%" }]}>
                  <Text style={styles.tableCellCus}></Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableColCus,
                    { width: "4%", borderTopWidth: 0 },
                  ]}
                >
                  <Text style={styles.tableCellCus}></Text>
                </View>
                <View style={[styles.tableColCus, { width: "31%" }]}>
                  <Text style={styles.tableCellCus}>c. Country of Birth</Text>
                </View>
                <View style={[styles.tableColCus, { width: "65%" }]}>
                  <Text style={styles.tableCellCus}></Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.rightColumn,
              { marginTop: "10px", marginBottom: "5px" },
            ]}
          >
            <View
              style={[
                styles.cusView,
                {
                  border: "1px solid #000000",
                  textAlign: "center",
                  padding: "10px",
                  height: "150px",
                },
              ]}
            >
              {this.state.userImg === null ? (
                <Image style={styles.image1} src="/user-image.jpg" />
              ) : (
                <Text
                  style={[
                    styles.text,
                    {
                      textAlign: "center",
                    },
                  ]}
                >
                  Photograph of Guardian / Legal Guardian
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={[styles.table, { marginTop: "10px" }]}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>3</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Father???s Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>4</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Mother???s Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>5</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Spouse???s Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>6</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}> Nationality</Text>
            </View>
            <View style={[styles.tableColCus, { width: "30%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "40%" }]}>
              <Text style={styles.tableCellCus}>
                (For Foreign National, copy of valid Passport including Visa has
                to be mandatorily collected)
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>7</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Gender</Text>
            </View>
            <View style={[styles.tableColCus, { width: "25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "5%" }]}>
              <Text style={styles.tableCellCus}>8</Text>
            </View>
            <View style={[styles.tableColCus, { width: "17%" }]}>
              <Text style={styles.tableCellCus}>Resident Status</Text>
            </View>
            <View style={[styles.tableColCus, { width: "23%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "100%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                (If needed, Guidelines for Foreign Exchange Transactions issued
                by Bangladesh Bank must be followed)
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>9</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>
                Profession (In details with Designation)
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>10</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}> Monthly Income </Text>
            </View>
            <View style={[styles.tableColCus, { width: "25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "5%" }]}>
              <Text style={styles.tableCellCus}>12</Text>
            </View>
            <View style={[styles.tableColCus, { width: "17%" }]}>
              <Text style={styles.tableCellCus}>
                Tax Identification Number (If any){" "}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "23%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>11</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>
                Source of Fund (In details)
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
        </View>
        <View style={[styles.cusView, { marginTop: "10px" }]}>
          <Text style={styles.text}>13. Contact Information</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "33.33%" }]}>
              <Text style={styles.tableCellCus}>Present Address</Text>
            </View>
            <View style={[styles.tableColCus, { width: "33.33%" }]}>
              <Text style={styles.tableCellCus}>Permanent Address</Text>
            </View>
            <View style={[styles.tableColCus, { width: "33.33%" }]}>
              <Text style={styles.tableCellCus}>Professional Address</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[
                styles.tableColCus,
                { width: "33.33%", minHeight: "50px" },
              ]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View
              style={[
                styles.tableColCus,
                { width: "33.33%", minHeight: "50px" },
              ]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View
              style={[
                styles.tableColCus,
                { width: "33.33%", minHeight: "50px" },
              ]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
        </View>
        <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
          (Documents as proof of address must be given, at least one in favour
          of address or as per directive of Bank)
        </Text>
        <View style={[styles.cusView, { marginTop: "10px" }]}>
          <Text style={styles.text}>14. Identification Document</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>a</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}>Identification Document</Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}>d</Text>
            </View>
            <View style={[styles.tableColCus, { width: "4%" }]}>
              <Text style={styles.tableCellCus}>b</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20.25%" }]}>
              <Text style={styles.tableCellCus}>Birth Registration No</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>c</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}> Passport No. </Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}>d</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}>Expiry Date </Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>d</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}> Driving License No </Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}>Expiry Date</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>e</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}>Expiry Date</Text>
            </View>
            <View style={[styles.tableColCus, { width: "74.75%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
        </View>
        <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
          (At least one of above documents must be submitted as per extant
          guidelines of Bangladesh Bank & or Policy of SBI)
        </Text>
      </>
    );
    const Page5 = (
      <>
        <View
          style={[
            styles.cusView,
            {
              marginTop: "10px",
              borderTop: "1px solid #000000",
              borderBottom: "1px solid #000000",
            },
          ]}
          break
        >
          <Text
            style={[
              styles.text,
              { fontWeight: "bold", fontSize: "11px", textAlign: "center" },
            ]}
          >
            Minor Account Declaration
          </Text>
        </View>
        <View
          style={[
            styles.cusView,
            {
              marginTop: "10px",
            },
          ]}
        >
          <Text style={styles.tableCellCus}>
            I being the Guardian/Legal Guardian of above referred Account Holder
            hereby declare that account holder is/are minor. His/her/their
            relevant information is/are provided in the attached Form. The
            Account will be operated by my signature as guardian/legal guardian
            until the account holder become adult or until my further
            declaration.
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "50%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                Signature of Guardian/Legal Guardian{" "}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "50%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                Signature verified by SBI official with seal & date
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "50%" }]}>
              <Text style={[styles.tableCellCus, { minHeight: "50px" }]}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "50%" }]}>
              <Text style={[styles.tableCellCus, { minHeight: "50px" }]}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[styles.tableColCus, { width: "10%", minHeight: "30px" }]}
            >
              <Text style={styles.tableCellCus}>Name </Text>
            </View>
            <View
              style={[styles.tableColCus, { width: "40%", minHeight: "30px" }]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View
              style={[styles.tableColCus, { width: "10%", minHeight: "30px" }]}
            >
              <Text style={styles.tableCellCus}>Name Seal</Text>
            </View>
            <View
              style={[styles.tableColCus, { width: "40%", minHeight: "30px" }]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "10%" }]}>
              <Text style={styles.tableCellCus}>Date </Text>
            </View>
            <View style={[styles.tableColCus, { width: "40%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "10%" }]}>
              <Text style={styles.tableCellCus}>Date</Text>
            </View>
            <View style={[styles.tableColCus, { width: "40%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
        </View>
      </>
    );
    const Page6 = (
      <>
        <View style={[styles.container, { marginTop: "10px" }]} break>
          <View style={styles.leftColumn}>
            <Image style={styles.image1} src="/sbi-i.png" />
          </View>
          <View style={[styles.rightColumn, { marginTop: "30px" }]}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell}>A/C No.</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableColCus, { width: "100%" }]}>
                  <Text
                    style={[
                      styles.tableCelCus,
                      { width: "100%", textAlign: "center", fontSize: "8px" },
                    ]}
                  >
                    ( For Bank Use )
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.container, { marginTop: "10px" }]}>
          <View style={styles.leftColumn1}>
            <View style={[styles.cusView, { marginBottom: "10px" }]}>
              <Text
                style={{
                  textDecoration: "underline",
                  fontSize: "10px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                THIRD PART: NOMINEE RELATED INFORMATION
              </Text>
            </View>
            <View style={[styles.cusView, { marginBottom: "10px" }]}>
              <Text
                style={{
                  textDecoration: "underline",
                  fontSize: "9px",
                  fontWeight: "bold",
                }}
              >
                1. Nominee Related Information
              </Text>
            </View>
            <View style={[styles.cusView, { marginBottom: "10px" }]}>
              <Text style={styles.text}>
                I/We hereby nominate the following person(s) to receive the fund
                of this Account after my/our death. I/We reserve the right to
                cancel/amend /replace this nomination at any time.
              </Text>
            </View>
            <View style={[styles.cusView, { marginBottom: "10px" }]}>
              <Text style={styles.text}>
                /We further declare that the Bank will make the payment
                according to my/our instruction and if the Bank pay the fund, it
                will be treated that the Bank has paid the deposit related all
                liabilities accordingly.
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.rightColumn,
              { marginTop: "10px", marginBottom: "5px" },
            ]}
          >
            <View
              style={[
                styles.cusView,
                {
                  border: "1px solid #000000",
                  textAlign: "center",
                  padding: "10px",
                  height: "130px",
                },
              ]}
            >
              {this.state.userImg === null ? (
                <Image style={styles.image1} src="/user-image.jpg" />
              ) : (
                <Text
                  style={[
                    styles.text,
                    {
                      textAlign: "center",
                    },
                  ]}
                >
                  Photograph of Nominee (To be attested by Account holder)
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>a</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Name of Nominee</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>{this.state.name}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>b</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Date of Birth</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>{this.state.ndob}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>c</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Father???s Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>d</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Mother???s Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>e</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Spouse???s Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>f</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Nationality</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>x</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>g</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}> Percentage</Text>
            </View>
            <View style={[styles.tableColCus, { width: "23%" }]}>
              <Text style={styles.tableCellCus}>
                {" "}
                {this.state.sharePercent}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "4%" }]}>
              <Text style={styles.tableCellCus}> h</Text>
            </View>
            <View style={[styles.tableColCus, { width: "23%" }]}>
              <Text style={styles.tableCellCus}>
                Relation with Account Holder
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>{this.state.relation}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.cusView, { marginTop: "10px" }]}>
          <Text style={styles.text}>i. Contact Information</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "50%" }]}>
              <Text style={styles.tableCellCus}>Present Address</Text>
            </View>
            <View style={[styles.tableColCus, { width: "50%" }]}>
              <Text style={styles.tableCellCus}>Permanent Address</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[styles.tableColCus, { width: "50%", minHeight: "60px" }]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View
              style={[styles.tableColCus, { width: "50%", minHeight: "60px" }]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
        </View>
        <View style={[styles.cusView, { marginTop: "10px" }]}>
          <Text style={styles.text}>j. Identification Document</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>i</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}>Identification Document</Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}>
                {this.state.nidentityType === 3
                  ? this.state.nidentityNumber
                  : ""}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "4%" }]}>
              <Text style={styles.tableCellCus}>ii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20.25%" }]}>
              <Text style={styles.tableCellCus}>Birth Registration No</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>iii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}> Passport No. </Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}>
                {" "}
                {this.state.nidentityType === 5
                  ? this.state.nidentityNumber
                  : ""}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}>Expiry Date </Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>iv</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}> Driving License No </Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}>Expiry Date</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>v</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}>Expiry Date</Text>
            </View>
            <View style={[styles.tableColCus, { width: "74.75%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
        </View>
        <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
          (Nominee Related information should be kept with this part separately
          for each nominee in case of multiple nominee)
        </Text>
      </>
    );
    const Page7 = (
      <>
        <View style={[styles.cusView, { marginBottom: "20px" }]} break>
          <Text style={[styles.text, { fontSize: "11px", fontWeight: "bold" }]}>
            2. Guardian of Minor Nominee(If any)
          </Text>
        </View>
        <View style={[styles.cusView, { marginTop: "-10px" }]}>
          <Text style={styles.text}>
            If nominee(s) is /are minor, information of Recipient of deposits
            after death of the Account Holder(s) keeping the nominee minor as
            per Bank Company Act 1991, Section 103(2)
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>a</Text>
            </View>
            <View style={[styles.tableColCus, { width: "32%" }]}>
              <Text style={styles.tableCellCus}>
                Guardian???s Name of Minor Nominee
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "65%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>b</Text>
            </View>
            <View style={[styles.tableColCus, { width: "32%" }]}>
              <Text style={styles.tableCellCus}>Date of Birth</Text>
            </View>
            <View style={[styles.tableColCus, { width: "65%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>c</Text>
            </View>
            <View style={[styles.tableColCus, { width: "32%" }]}>
              <Text style={styles.tableCellCus}>Father???s Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "65%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>d</Text>
            </View>
            <View style={[styles.tableColCus, { width: "32%" }]}>
              <Text style={styles.tableCellCus}>Mother???s Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "65%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>e</Text>
            </View>
            <View style={[styles.tableColCus, { width: "32%" }]}>
              <Text style={styles.tableCellCus}>Spouse???s Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "65%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>f</Text>
            </View>
            <View style={[styles.tableColCus, { width: "32%" }]}>
              <Text style={styles.tableCellCus}>Nationality</Text>
            </View>
            <View style={[styles.tableColCus, { width: "65%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>g</Text>
            </View>
            <View style={[styles.tableColCus, { width: "32%" }]}>
              <Text style={styles.tableCellCus}>
                Relation with Account Holder
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "65%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
        </View>
        <View style={[styles.cusView, { marginTop: "10px" }]}>
          <Text style={styles.text}>h. Contact Information</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "50%" }]}>
              <Text style={styles.tableCellCus}>Present Address</Text>
            </View>
            <View style={[styles.tableColCus, { width: "50%" }]}>
              <Text style={styles.tableCellCus}>Permanent Address</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[styles.tableColCus, { width: "50%", minHeight: "60px" }]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View
              style={[styles.tableColCus, { width: "50%", minHeight: "60px" }]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
        </View>
        <View style={[styles.cusView, { marginTop: "10px" }]}>
          <Text style={styles.text}>j. Identification Document</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>i</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}>Identification Document</Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "4%" }]}>
              <Text style={styles.tableCellCus}>ii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20.25%" }]}>
              <Text style={styles.tableCellCus}>Birth Registration No</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>iii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}> Passport No. </Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}>Expiry Date </Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>iv</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}> Driving License No </Text>
            </View>
            <View style={[styles.tableColCus, { width: "26.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}>Expiry Date</Text>
            </View>
            <View style={[styles.tableColCus, { width: "24.25%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>v</Text>
            </View>
            <View style={[styles.tableColCus, { width: "22.25%" }]}>
              <Text style={styles.tableCellCus}>Expiry Date</Text>
            </View>
            <View style={[styles.tableColCus, { width: "74.75%" }]}>
              <Text style={styles.tableCellCus}></Text>
            </View>
          </View>
        </View>
        <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
          (In case of Non Resident Bangladeshi/Foreign National Nominee and the
          fund of the relevant account is payable to that Nominee, the
          prevailing provisions of foreign Exchange Regulations will be
          applicable)
        </Text>
      </>
    );
    const Page8 = (
      <>
        <View
          style={[
            styles.cusView,
            {
              marginTop: "10px",
              borderTop: "1px solid #000000",
              borderBottom: "1px solid #000000",
            },
          ]}
          break
        >
          <Text
            style={[
              styles.text,
              { fontWeight: "bold", fontSize: "11px", textAlign: "center" },
            ]}
          >
            Declaration and Signature
          </Text>
        </View>
        <View
          style={[
            styles.cusView,
            {
              marginTop: "10px",
            },
          ]}
        >
          <Text style={styles.tableCellCus}>
            I/We consciously declare that the information provided above is/are
            true/correct. I/We will provide you any other necessary
            information/documents in addition to the above as per requirement of
            the Bank.
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "10%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
            <View style={[styles.tableColCus, { width: "30%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                1st Applicant
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "30%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                2nd Applicant
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "30%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                3rd Applicant
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[styles.tableColCus, { width: "10%", minHeight: "30px" }]}
            >
              <Text style={[styles.tableCellCus, {}]}>Signature</Text>
            </View>
            <View style={[styles.tableColCus, { width: "30%" }]}>
              {this.state.customerSignature === undefined ||
              this.state.customerSignature === null ? (
                ""
              ) : (
                <View>
                  <Image
                    style={styles.imageS}
                    src={
                      this.state.customerSignature.startsWith("data")
                        ? this.state.customerSignature
                        : this.state.customerSignature.startsWith("/", 0)
                        ? `data:image/jpeg;base64,${this.state.customerSignature}`
                        : this.state.customerSignature.startsWith("Q", 0)
                        ? "white.png"
                        : `data:image/png;base64,${this.state.customerSignature}`
                    }
                    // src={`${this.state.propicexten},${this.state.customerSignature}`}
                  />
                  {/* <Image
                    style={styles.image1}
                    // src={`${this.state.propicexten},${this.state.customerSignature}`}
                    src={
                      "data:image/png;base64," + this.state.customerSignature
                    }
                    src={
                      "data:image/jpeg;base64," + this.state.customerSignature
                    }
                  /> */}
                </View>
                // <Image
                //   style={styles.image2}
                //   src={`${this.state.propicexten},${this.state.customerSignature}`}
                // />
              )}
            </View>
            <View style={[styles.tableColCus, { width: "30%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
            <View
              style={[styles.tableColCus, { width: "30%", minHeight: "25px" }]}
            >
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "10%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                Name
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "30%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                {this.state.customerName}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "30%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
            <View style={[styles.tableColCus, { width: "30%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "10%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                Date
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "30%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
            <View style={[styles.tableColCus, { width: "30%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
            <View style={[styles.tableColCus, { width: "30%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
          </View>
        </View>
        <View style={[styles.table, { marginTop: "20px" }]}>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "10%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
            <View style={[styles.tableColCus, { width: "45%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                Guardian???s Signature (for minor Account only)
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "45%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                Signature verified by SBI official with seal & date
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "10%" }]}>
              <Text style={[styles.tableCellCus, {}]}>Signature</Text>
            </View>
            <View style={[styles.tableColCus, { width: "45%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
            <View style={[styles.tableColCus, { width: "45%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "10%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                Name
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "45%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
            <View style={[styles.tableColCus, { width: "45%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "10%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                Date
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "45%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
            <View style={[styles.tableColCus, { width: "45%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
          </View>
        </View>
        <Text style={styles.tableCellCus}>
          (If Account holder is minor, her/his guardian will sign above and
          Personal Information of Guardian to be attached with the account
          application form/2nd part)
        </Text>
        <View
          style={[
            styles.cusView,
            {
              marginTop: "10px",
              borderTop: "1px solid #000000",
              borderBottom: "1px solid #000000",
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              { fontWeight: "bold", fontSize: "11px", textAlign: "center" },
            ]}
          >
            For Bank???s Use only
          </Text>
        </View>
        <View style={[styles.table, { marginTop: "20px" }]}>
          <View style={styles.tableRow}>
            <View
              style={[styles.tableColCus, { width: "10%", minHeight: "40px" }]}
            >
              <Text style={[styles.tableCellCus, {}]}>Remarks</Text>
            </View>
            <View
              style={[styles.tableColCus, { width: "90%", minHeight: "40px" }]}
            >
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[styles.tableColCus, { width: "50%", minHeight: "50px" }]}
            >
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
            <View
              style={[styles.tableColCus, { width: "50%", minHeight: "50px" }]}
            >
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "50%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                Signature of A/C opening Officer(seal with Name)
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "50%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                Signature of Authorized Officer/ Branch Head (seal with Name)
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "10%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                Date
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "40%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
            <View style={[styles.tableColCus, { width: "10%" }]}>
              <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                Date
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "40%" }]}>
              <Text
                style={[styles.tableCellCus, { textAlign: "center" }]}
              ></Text>
            </View>
          </View>
        </View>
        <View break>
          <Text style={[styles.textT, { textAlign: "center" }]}>
            Risk Grading
          </Text>

          <View style={[styles.table, { marginTop: "20px" }]}>
            <View style={styles.tableRow}>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                  Title
                </Text>
              </View>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                  Value
                </Text>
              </View>
              <View style={[styles.tableColCus, { width: "20%" }]}>
                <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                  Score
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, {}]}>
                  A1. Types of Product/Services
                </Text>
              </View>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                  {this.state.product.name}
                </Text>
              </View>
              <View style={[styles.tableColCus, { width: "20%" }]}>
                <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                  {this.state.product.name === "Savings" ? 1 : 2}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, {}]}>
                  A2. Types of Onboarding/opening of account
                </Text>
              </View>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                  By Branch/Relationship Manager
                </Text>
              </View>
              <View style={[styles.tableColCus, { width: "20%" }]}>
                <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                  3
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, {}]}>
                  B. Geographical Risk/Residential status Risk
                </Text>
              </View>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                  {this.state.listCustomers[0].permanentAddress.country ===
                  this.state.listCustomers[0].presentAddress.country
                    ? "Resident Bangladeshi Customer"
                    : "Non Resident Bangladeshi Customer"}
                </Text>
              </View>
              <View style={[styles.tableColCus, { width: "20%" }]}>
                <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                  {this.state.listCustomers[0].permanentAddress.country ===
                  this.state.listCustomers[0].presentAddress.country
                    ? 1
                    : 2}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, {}]}>
                  C1. Relation Risk: As per BFIU Circular, Whether the customer
                  is (are) belongs to PEPs/Influential Person(s)/Head of
                  International Organization of Senior Level Officer
                </Text>
              </View>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text
                  style={[styles.tableCellCus, { textAlign: "center" }]}
                ></Text>
              </View>
              <View style={[styles.tableColCus, { width: "20%" }]}>
                <Text
                  style={[styles.tableCellCus, { textAlign: "center" }]}
                ></Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, {}]}>
                  C2. Relation Risk: As per BFIU Circular, Whether the customer
                  is (are) family members(s) or close associates of
                  PEPs/Influential Person(s)/Head of international organization
                  or Senior level officer
                </Text>
              </View>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text
                  style={[styles.tableCellCus, { textAlign: "center" }]}
                ></Text>
              </View>
              <View style={[styles.tableColCus, { width: "20%" }]}>
                <Text
                  style={[styles.tableCellCus, { textAlign: "center" }]}
                ></Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, {}]}>
                  D. Customer???s Yearly Average Transaction (For Personal
                  Account)
                </Text>
              </View>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text
                  style={[styles.tableCellCus, { textAlign: "center" }]}
                ></Text>
              </View>
              <View
                style={[
                  styles.tableColCus,
                  { width: "20%", minHeight: "40px" },
                ]}
              >
                <Text
                  style={[styles.tableCellCus, { textAlign: "center" }]}
                ></Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, {}]}>
                  E. Transparency Risk: Whether customer(s) has/have supplied
                  reliable information/documents
                </Text>
              </View>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                  Yes
                </Text>
              </View>
              <View
                style={[
                  styles.tableColCus,
                  { width: "20%", minHeight: "40px" },
                ]}
              >
                <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                  1
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, {}]}>
                  F. Business and Profession/Occupation Related Risk
                </Text>
              </View>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                  {this.state.tp?.profession}
                </Text>
              </View>
              <View
                style={[
                  styles.tableColCus,
                  { width: "20%", minHeight: "40px" },
                ]}
              >
                <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                  {this.state.f}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, {}]}>Total Score</Text>
              </View>
              <View style={[styles.tableColCus, { width: "40%" }]}>
                <Text style={[styles.tableCellCus, { textAlign: "center" }]}>
                  Total Risk Score (A+B+C+D1 or D2+E+F i or F ii )
                </Text>
              </View>
              <View style={[styles.tableColCus, { width: "20%" }]}>
                <Text
                  style={[styles.tableCellCus, { textAlign: "center" }]}
                ></Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
    const MyDoc = () => (
      <Document>
        <Page size="A4" style={styles.body}>
          {Page1}
          {Page2}
          {Page3}
          {Page4}
          {Page5}
          {Page6}
          {Page7}
          {Page8}
        </Page>
      </Document>
    );
    return (
      <div>
        <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
        <PDFViewer style={{ width: "100%", height: "100vh", border: "none" }}>
          <MyDoc />
        </PDFViewer>
      </div>
    );
  }
}

export default SbiAccountForm;
