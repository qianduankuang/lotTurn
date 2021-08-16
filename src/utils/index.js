const crypto = require("crypto")

const uuid = (length) => {
  length = length || 8
  return crypto.randomBytes(parseInt(length / 2)).toString("hex").toUpperCase() + new Date().getTime()
}







export {
  uuid
}