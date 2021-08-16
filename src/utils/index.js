const crypto = require("crypto")

const uuid = (length) => {
  length = length || 8
  return crypto.randomBytes(parseInt(length / 2)).toString("hex").toUpperCase() + new Date().getTime()
}



/**
 * @method isAndroid
 * @returns 1: 安卓，2：iOS
 */
 const isAndroid = () => {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return 1;
  } else if (isiOS) {
    return 2;
  }
}



export {
  uuid,
  isAndroid
}