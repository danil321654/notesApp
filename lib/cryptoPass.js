const crypto = require("crypto");
const util = require("util");
const cryptoPbkdf2 = util.promisify(crypto.pbkdf2);

let hashLength = 16;
let iterations = 10;

module.exports.createSaltHash = async function createSaltHash(pass) {
  let salt = crypto.randomBytes(hashLength).toString("base64");
  let hash = (
    await cryptoPbkdf2(pass, salt, iterations, hashLength, "sha512")
  ).toString();
  return {salt, hash};
};

module.exports.checkSaltHash = async function checkSaltHash(pass, salt, hash) {
  if (!pass || !hash || !salt) return false;
  let userHash = (
    await cryptoPbkdf2(pass, salt, iterations, hashLength, "sha512")
  ).toString();
  return userHash == hash;
};
