import CryptoJS from 'crypto-js';

class AesUtil {
    constructor(keySize, iterationCount) {
        this._iterationCount = iterationCount;
        this._keySize = keySize / 32;
    }

    generateRandomHex = () => {
        const wordArray = CryptoJS.lib.WordArray.random(16);
        return CryptoJS.enc.Hex.stringify(wordArray);
    }

    generateKey = (salt, passPhrase) => {
        const key = CryptoJS.PBKDF2(
            passPhrase,
            CryptoJS.enc.Hex.parse(salt),
            { keySize: this._keySize, iterations: this._iterationCount });
        
        return key;
    }
    
    encrypt = (salt, iv, passPhrase, plainText) => {
        const key = this.generateKey(salt, passPhrase); 
        //console.log("key =====>"+ key);
        const encrypted = CryptoJS.AES.encrypt(
            plainText,
            key,
            { iv: CryptoJS.enc.Hex.parse(iv) });
        //console.log('encrypted====>', encrypted);
        return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
        //return encrypted.toString();
    }

    decrypt = (salt, iv, passPhrase, cipherText) => {
        // console.log("inside decryption");
        // console.log("salt ===> ", salt);
        // console.log("iv ====>", iv);
        // console.log("cipherText ===> ", cipherText);
        const key = this.generateKey(salt, passPhrase);
        const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(cipherText)
        }); 
    
        const decrypted = CryptoJS.AES.decrypt(
            cipherParams,
            key,
            { iv: CryptoJS.enc.Hex.parse(iv) }); 
        
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}

export default AesUtil;
