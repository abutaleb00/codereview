import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import api from "./ApiService";

//export const baseURL = "https://10.50.1.212:8443";
// export const baseURL =
//   "https://ekycmiddleware.globalislamibankbd.com:8443/ekyc";
//  export const baseURL = "https://103.88.137.186:8443/ekyc";
// export const baseURL = "http://180.210.129.170:8080/DBS/api";
//export const baseURL = "https://ekycweb.globalislamibankbd.com/apiserver";
// export const baseURL = "https://ekycrelay.globalislamibankbd.com:8443/ekyc";
// export const baseURL = "https://localhost:8443";

//export const baseURL = "https://10.176.48.206:343/apiserver";
//export const baseURL = "https://127.0.0.1:8443";

// export const baseURL = "https://192.168.225.170:343/apiserver";
export const baseURL = window.baseURL;
// export const baseURL = "https://localhost:8443";
//export const baseURL = "https://10.177.128.15:343/apiserver";

// export const baseURL = "https://10.191.31.132:343/apiserver";
//export const baseURL = "https://192.168.225.170:343/apiserver";
export const login = baseURL + "/oauth/token";
export const logout = baseURL + "/logout?logout";
export const otpgen = baseURL + "/otpgen";
export const otpVerify = baseURL + "/otpverify";
export const signup = baseURL + "/signup";
export const accountnew = baseURL + "/application/new";
export const additionalaccountinfo = baseURL + "/application/additionalupdate";
export const nidcall = baseURL + "/nidmatch/eSignKyc";
export const ekycaddapi = baseURL + "/kyc/kycprofile/add";
export const nomineeaddapi = baseURL + "/kyc/nominee/add";

export const instance = api;

export function errorCompute(error) {
  let errorMessage = "";
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    switch (error.response.status) {
      case 500:
        errorMessage = "Internal Server Error.";
        break;
      case 503:
        errorMessage = "Service unavailable.";
        //tests["Service unavailable."] = statMessages === 503;
        break;
      case 502:
        errorMessage = "502 bad gateway.";
        //tests["502 bad gateway."] = statMessages === 502;
        break;
      case 599:
        errorMessage = "Network connect timeout error.";
        // tests["Network connect timeout error."] = statMessages === 599;
        break;
      case 408:
        errorMessage = "Request timedout.";
        // tests["Request timedout."] = statMessages === 408;
        break;
      case 400:
        errorMessage = error.response.data.error_description;
        break;
      default:
        errorMessage = "Unhandlled error code.";
        break;
      //tests["Sorry, we are out of" + responseCode.code];
    }

    return confirmAlert({
      title: "Error Message",
      message: { errorMessage },
      buttons: [
        {
          label: "Ok",
          onClick: () => {},
        },
      ],
    });
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    console.log(error.request);
    return confirmAlert({
      title: "Error Message",
      message: <p className="mod-p"> {error.request} </p>,
      buttons: [
        {
          label: "Ok",
          onClick: () => {},
        },
      ],
    });
  } else {
    // Something happened in setting up the request and triggered an Error
    console.log("Error", error.message);
    return confirmAlert({
      title: "Error Message",
      message: <p className="mod-p"> {error.message} </p>,
      buttons: [
        {
          label: "Ok",
          onClick: () => {},
        },
      ],
    });
  }
}
