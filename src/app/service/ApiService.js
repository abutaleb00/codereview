import axios from "axios";
import LocalStorageService from "./localStorageService";
import SecurityUtil from "./securityUtil";
const https = require("https");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export const baseURL = window.baseURL;
//const baseURL = "https://mdm.commlinkinfotech.com:8443/mdm";
//export const baseURL = "https://10.50.1.212:8443";
// export const baseURL =
//   "https://ekycmiddleware.globalislamibankbd.com:8443/ekyc";
// export const baseURL = "https://ekycrelay.globalislamibankbd.com:8443/ekyc";
//export const baseURL = "https://ekycweb.globalislamibankbd.com/apiserver";
// export const baseURL = "https://103.88.137.186:8443/ekyc";
// const baseURL = "http://180.210.129.103:8080/mdm";

// export const baseURL = "https://localhost:8443";
// export const baseURL = "https://192.168.225.170:343/apiserver";
//export const baseURL = "https://10.176.48.206:343/apiserver";
// export const baseURL = "https://10.177.128.15:343/apiserver";
//export const baseURL = "https://10.191.31.132:343/apiserver";
//export const baseURL = "https://localhost:8443";

const loginURL = "/oauth/token";
const logoutURL = "/oauth/revoke";

const client_id = "my-trusted-client";
const client_secret = "secret";
// TPj6V5XI6Q3EJfKa1116IA3epwYSFw5UaKM7+27iEF1FSS+dC6B5ueziMN4CQAYS\
// Yjj1Y1g01aaxR5pl2lx3dMm0dBAEanSO2SVn4zVNZFJ9sPUON9vPcWevlkFhdkqZ\
// jlJndB+PM9byg8efBXRp5FXrV10+yU2ZO0pbXcSOnm720dDHu91aJ8xRKfxn27aK\
// xcgml90dLoXlX0FCLahHR0WULCBKGyhYEz6JFmKL1jkCknTx8WBCiq3bRsGuQz2a\
// JwIDAQAB\
// -----END PUBLIC KEY-----\
// ";
const pub_key =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvt2yRQ/oIqTO7F1I3X17McBDgszU8xaVrctljK4+gV6VogXCpsyC2D35yd6qD5TA/W0byC4esTFnZuhVFefYTPj6V5XI6Q3EJfKa1116IA3epwYSFw5UaKM7+27iEF1FSS+dC6B5ueziMN4CQAYSYjj1Y1g01aaxR5pl2lx3dMm0dBAEanSO2SVn4zVNZFJ9sPUON9vPcWevlkFhdkqZjlJndB+PM9byg8efBXRp5FXrV10+yU2ZO0pbXcSOnm720dDHu91aJ8xRKfxn27aKxcgml90dLoXlX0FCLahHR0WULCBKGyhYEz6JFmKL1jkCknTx8WBCiq3bRsGuQz2aJwIDAQAB";
const util = new SecurityUtil(pub_key);
// const client_id = "my-trusted-client";
// const client_secret = "secret";

// export default axios.create({
// }) ;

const caxios = axios.create({
  baseURL: baseURL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  transformRequest: [
    (data, headers) => {
      // modify data here
      // console.log(
      //   "header in transformRequest ",
      //   headers,
      //   util.getAES256EncryptedData(JSON.stringify(data))
      // );
      return util.getAES256EncryptedData(JSON.stringify(data));
    },
    ...axios.defaults.transformRequest,
  ],
  transformResponse: [
    (data, header) => {
      let resp;
      try {
        resp = data;
        //console.log("header", header);
        resp = JSON.parse(util.getAES256DecryptedData(resp));
        //console.log("decrypted log", resp);
      } catch (error) {
        resp = JSON.parse(data);
        //console.log("Non decrypted log", resp);
      }
      return resp;
    },
  ],
});

// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Add a request interceptor
caxios.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();
    if (token && config.url !== loginURL) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

caxios.interceptors.response.use(
  (response) => {
    //   console.log("In response interceptor", response.config.url, response);
    if (response.status === 200 && response.config.url === loginURL) {
      localStorageService.setToken(response.data);
      return response;
    }
    if (
      response.status === 200 &&
      response.config.url === baseURL + "/getloggedinuser"
    ) {
      localStorage.setItem(
        "webFeatures",
        JSON.stringify(response.data.data.webfeaturelist)
      );
      localStorage.setItem("userRole", response.data.data.roleName);
      return response;
    }

    if (response.status === 400 && response.config.url === loginURL) {
      return response;
    }
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (!error.response) {
      console.log("!error.response", error);
      let customError = new Error("Network unreachable");
      customError.status = 202;
      return Promise.reject(customError);
    }

    if (error.response.status === 400 && originalRequest.url === loginURL) {
      console.log("error 400", error);
      return Promise.reject(error.response);
    }

    if (error.response.status === 401 && originalRequest.url === loginURL) {
      //router.push('/login');
      console.log("error 401", error);
      window.location = `${process.env.PUBLIC_URL}/login`;
      return Promise.reject(error);
    }

    if (error.response.status === 405 && originalRequest.url === loginURL) {
      //router.push('/login');
      console.log("error 405", error.response);
      return Promise.reject(error.response);
    }

    if (error.response.status === 401 && originalRequest.url === logoutURL) {
      localStorageService.clearToken();
      localStorage.setItem("loggedIn", false);
      window.location = `${process.env.PUBLIC_URL}/login`;
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      let token = getBasicToken();
      const rtoken = localStorageService.getRefreshToken();
      const userId = localStorage.getItem("username");
      let reqData = `grant_type=refresh_token&refresh_token=${rtoken}&client_id=${client_id}&username=${userId}`;
      let config = {
        headers: {
          Authorization: `Basic ${token}`,
          "X-ENCRYPTPAYLOAD": "YES",
          //'Content-Type': 'application/x-www-form-urlencoded'
        },
      };
      return axios
        .post(baseURL + loginURL, reqData, config)
        .then((res) => {
          if (res.status === 200) {
            localStorageService.setToken(res.data);
            //axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
            return caxios(originalRequest);
          } else {
            localStorageService.clearToken();
            window.location = `${process.env.PUBLIC_URL}/login`;
          }
        })
        .catch(function (err) {
          // 26/07/20-e nazmun-er sathe discussion
          localStorageService.clearToken();
          localStorage.setItem("loggedIn", false);
          window.location = `${process.env.PUBLIC_URL}/login`;
          return Promise.reject(err);
        });
    }
    console.log("error out side", error);
    return Promise.reject(error);
  }
);

function getBasicToken() {
  let temp = client_id + ":" + client_secret;
  let token = btoa(temp);

  return token;
}

export function login(userId, password, callback) {
  let reqData = `grant_type=password&username=${userId}&password=${password}&client_id=${client_id}`;
  let token = getBasicToken();
  let config = {
    headers: {
      Authorization: `Basic ${token}`,
      "X-ENCRYPTPAYLOAD": "YES",
      //'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  caxios
    .post("/oauth/token", reqData, config)
    .then((res) => callback(res))
    .catch((err) => callback(err));
}

//export default caxios, login;
export default caxios;

//sample
//import -
//import api, {login} from './service/ApiService';
//login -
//login(cuser,cpass, (response) => {
//  console.log(response);
//})
//get -
// api.get(<url>)
// .then(res => {
//   console.log(res);
// })
//post -
//api.post(<url>, data, config)
//  .then(res => {
//     console.log(res);
//   })
