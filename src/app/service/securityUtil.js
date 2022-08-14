// import CryptoJS from "crypto-js";
import AesUtil from "./aesUtil";
import JSEncrypt from "node-jsencrypt";
const iterationCount = 1000;
const keySize = 128;

class SecurityUtil {
  constructor(rsaPubKey) {
    this._aesUtil = new AesUtil(keySize, iterationCount);
    this.rsaPublicKey = rsaPubKey;
    this._passPhrase = this._aesUtil.generateRandomHex();
    this._iv = this._aesUtil.generateRandomHex();
    this._salt = this._aesUtil.generateRandomHex();
    //console.log( this.rsaPublicKey, this._aesUtil,this._passPhrase);
  }

  // enc=(msg)=>{
  //     let pk = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvt2yRQ/oIqTO7F1I3X17McBDgszU8xaVrctljK4+gV6VogXCpsyC2D35yd6qD5TA/W0byC4esTFnZuhVFefYTPj6V5XI6Q3EJfKa1116IA3epwYSFw5UaKM7+27iEF1FSS+dC6B5ueziMN4CQAYSYjj1Y1g01aaxR5pl2lx3dMm0dBAEanSO2SVn4zVNZFJ9sPUON9vPcWevlkFhdkqZjlJndB+PM9byg8efBXRp5FXrV10+yU2ZO0pbXcSOnm720dDHu91aJ8xRKfxn27aKxcgml90dLoXlX0FCLahHR0WULCBKGyhYEz6JFmKL1jkCknTx8WBCiq3bRsGuQz2aJwIDAQAB";
  //     let e = new JSEncrypt();
  //     e.setPublicKey(pk);
  //     let encrypted = e.encrypt(msg);

  //     console.log(`Encryptionn of ${msg}: ${encrypted}`, encrypted);
  //     return encrypted;
  // }

  encryptRSA = (data) => {
    const crypt = new JSEncrypt();
    crypt.setPublicKey(this.rsaPublicKey);
    //console.log("public key", this.rsaPublicKey);
    return crypt.encrypt(data);
  };

  getAES256EncryptedData = (data) => {
    const ciphertext = this._aesUtil.encrypt(
      this._salt,
      this._iv,
      this._passPhrase,
      data
    );

    // console.log("before encryption passphrase: ", this._passPhrase);
    // console.log("before encryption iv: ", this._iv);
    // console.log("before encryption salt: ", this._salt);

    const lPassPhrase = this.encryptRSA(this._passPhrase);
    //this.enc(this._passPhrase);
    const lIv = this.encryptRSA(this._iv);
    const lSalt = this.encryptRSA(this._salt);

    // console.log("after encryption passphrase : ", lPassPhrase);
    // console.log("ltv", lIv);
    // console.log("lsalt", lSalt);

    // const utfPassPhrase = CryptoJS.enc.Utf8.parse(lPassPhrase);
    // const utfIv = CryptoJS.enc.Utf8.parse(lIv);
    // const utfSalt = CryptoJS.enc.Utf8.parse(lSalt);

    // console.log('utfPassPhrase===>' + utfPassPhrase);
    // console.log('utfIv=====>'+ utfIv);
    // console.log('utfSalt=====>'+ utfSalt);

    //     const encryptRequest= {
    //       "request": ciphertext,
    //       "passcodeX": CryptoJS.enc.Base64.stringify(utfPassPhrase),
    //       "passcodeY": CryptoJS.enc.Base64.stringify(utfIv),
    //       "passcodeZ": CryptoJS.enc.Base64.stringify(utfSalt),
    //   }
    const encryptRequest = {
      request: ciphertext,
      passcodeX: lPassPhrase,
      passcodeY: lIv,
      passcodeZ: lSalt,
    };

    return encryptRequest;
  };

  getAES256DecryptedData = (ciphertext) => {
    const plainText = this._aesUtil.decrypt(
      this._salt,
      this._iv,
      this._passPhrase,
      ciphertext
    );
    return plainText.toString();
  };
}

export default SecurityUtil;
