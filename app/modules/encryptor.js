const CryptoJs = require('crypto-js')

exports.encrypt = (str,key) => {
  const ciphertext = CryptoJs.AES.encrypt(str,key)
  return ciphertext.toString()
}
exports.decrypt = (str,key) => {
  const bytes = CryptoJs.AES.decrypt(str,key)
  return bytes.toString(CryptoJs.enc.Utf8)
}
