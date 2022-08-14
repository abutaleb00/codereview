// import SecurityUtil from "./securityUtil";

// const pub_key =
//   "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvt2yRQ/oIqTO7F1I3X17McBDgszU8xaVrctljK4+gV6VogXCpsyC2D35yd6qD5TA/W0byC4esTFnZuhVFefYTPj6V5XI6Q3EJfKa1116IA3epwYSFw5UaKM7+27iEF1FSS+dC6B5ueziMN4CQAYSYjj1Y1g01aaxR5pl2lx3dMm0dBAEanSO2SVn4zVNZFJ9sPUON9vPcWevlkFhdkqZjlJndB+PM9byg8efBXRp5FXrV10+yU2ZO0pbXcSOnm720dDHu91aJ8xRKfxn27aKxcgml90dLoXlX0FCLahHR0WULCBKGyhYEz6JFmKL1jkCknTx8WBCiq3bRsGuQz2aJwIDAQAB";
// const util = new SecurityUtil(pub_key);

import JSEncrypt from "node-jsencrypt";

let e = new JSEncrypt();
const enc = (msg) => {
  let pk =
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvt2yRQ/oIqTO7F1I3X17McBDgszU8xaVrctljK4+gV6VogXCpsyC2D35yd6qD5TA/W0byC4esTFnZuhVFefYTPj6V5XI6Q3EJfKa1116IA3epwYSFw5UaKM7+27iEF1FSS+dC6B5ueziMN4CQAYSYjj1Y1g01aaxR5pl2lx3dMm0dBAEanSO2SVn4zVNZFJ9sPUON9vPcWevlkFhdkqZjlJndB+PM9byg8efBXRp5FXrV10+yU2ZO0pbXcSOnm720dDHu91aJ8xRKfxn27aKxcgml90dLoXlX0FCLahHR0WULCBKGyhYEz6JFmKL1jkCknTx8WBCiq3bRsGuQz2aJwIDAQAB";

  e.setPublicKey(pk);
  let encrypted = e.encrypt(msg);

  //console.log(`Encryptionn of ${msg}: ${encrypted}`, encrypted);
  return encrypted;
};

const dec = (msg2) => {
  let pk2 =
    "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+3bJFD+gipM7sXUjdfXsxwEOCzNTzFpWty2WMrj6BXpWiBcKmzILYPfnJ3qoPlMD9bRvILh6xMWdm6FUV59hM+PpXlcjpDcQl8prXXXogDd6nBhIXDlRoozv7buIQXUVJL50LoHm57OIw3gJABhJiOPVjWDTVprFHmmXaXHd0ybR0EARqdI7ZJWfjNU1kUn2w9Q43289xZ6+WQWF2SpmOUmd0H48z1vKDx58FdGnkVetXXT7JTZk7SltdxI6ebvbR0Me73VonzFEp/GfbtorFyCaX3R0uheVfQUItqEdHRZQsIEobKFgTPokWYovWOQKSdPHxYEKKrdtGwa5DPZonAgMBAAECggEAVLltjmmStnopHlQEaclvO7ToYvIQ3z1ZwPWGRO398ght7KeY8djbhijwrjMIk3UJPBXIXNJYLnjLOSuNxXUOl5B39BQZxJYnSV8Ja+tjMEJn4QV5V0G1p2M6V5CviesVO/kGQeiA0E7+UwnhvtDTLUWya+B2R5bAoBPB/a3JGw4//19TQKyNXwryBtQREp8ToisG2oRludN7lmvRclAPjeVFC3x7kSzMepHa3jmtYu/60x/XPtYJHntLZAaJoKfRcBncLbt/4VzisEraPdtUMXP2svR09PmrXhZRUc924gg+iop5vVWBRnawYz3iM7e26KnmaOS4lWxHb7wolim9wQKBgQDT2DeEVwgAgsXv7lDXmMF4qWtY8mxE/GpVKiU3uV3uxh4hJ5da/cakZbbHaePnXhy9YIuSDX4ORM6ML6iz62kTdePjH9Wfcv/ZjfDmlBtQ+Xa7halOJbs0w2F408AzxFY3EEyY7cUW9wn58Ew7+XSoUxLgW1hkeNwK2KPWfapG5wKBgQDmphX6qWsxDvbH6Mz3KgJeLsQgIahnNRRBaN9coW8L43ISZlZX/Efli8HMYf7jsgDu5RhBPgTqBLIzvd0CT1xxPUOgQG1IXNH1NlTz0PvwlMSNw96QzXd2adUVFfKKuiF6YPirvr2yrBHK2g3ne36YYTqXkK3l9jc7vUvpV5nqwQKBgDJy4C206CPvAKI1t6zQJOrONdE10hDPp6bmZXySuUrehVhR7Fpv6vlFe7Sbg/maUO/MaRB8BBPz0NhTlTJbkmdfAMka0K2rHkC566+Nf7/V2K+pkfsZQy66hKDYlIH/dKSiTgtxPClO5WJPFmiF7IEVX35sYm1y1rwCgWnX/U/rAoGBAMmM9wXsyDu9fM8iUwHlVt5gdYgygUt26bVi5FS4ySYVYhhMD0Whsl4Xq4ljVO46HXClB3XzsS2iXuqyDhA3s2tNAuxlgFnMqrhh+wh4ZcBM8BmFwNa+hZcXUlmzrRenIRwk4wiJjJE2pfGibKYMl4qm5CGQDzY12vw8JbrJjznBAoGBALUuv4NMnDi3E6W0EdP84Ve7P9OYMSUWNWG/KCzVLJFoUs4Wq2qpryvSWxCB+3nLG66hDnCrLWPO75sH5tmai5RCj8zjLCWeiFSZKVPeSYUaFVI+qL6ZpaRWlOEG2kr+uJ/c8lBW38d1RODri4iSWxNHisOK/T57v9Ph71wYvW+0";

  e.setPrivateKey(pk2);
  var dec2=null;
  if (msg2 !== null && msg2 !== undefined) {
    dec2 = e.decrypt(msg2);
  }
  return dec2;
};

const LocalStorageService = (function () {
  var _service;

  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  function _setToken(tokenObj) {
    localStorage.setItem("access_token", enc(tokenObj.access_token));
    localStorage.setItem("refresh_token", enc(tokenObj.refresh_token));

    // localStorage.setItem(
    //   "access_token",
    //   util.getAES256EncryptedData(JSON.stringify(tokenObj.access_token))
    // );
    // localStorage.setItem(
    //   "refresh_token",
    //   util.getAES256EncryptedData(JSON.stringify(tokenObj.refresh_token))
    // );
  }

  function _getAccessToken() {
    //return util.getAES256DecryptedData(localStorage.getItem("access_token"));
    if (
      localStorage.getItem("access_token") !== null &&
      localStorage.getItem("access_token") !== undefined
    )
    {
      let z = dec(localStorage.getItem("access_token"));
    
     // console.log(z); 
      return z;
  }
    else {
      return localStorage.getItem("access_token");
    }
  }

  function _getRefreshToken() {
    //return util.getAES256DecryptedData(localStorage.getItem("refresh_token"));
    if (
      localStorage.getItem("refresh_token") !== null &&
      localStorage.getItem("refresh_token") !== undefined
    ) {
      return dec(localStorage.getItem("refresh_token"));
    } else {
      return localStorage.getItem("refresh_token");
    }
  }

  function _clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();

export default LocalStorageService;
