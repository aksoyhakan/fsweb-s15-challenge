const db = require("../../data/dbConfig");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secret/secret");

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodeJwt) => {
      if (err) {
        next({ status: 405, message: "invalid token" });
      } else {
        req.userData = decodeJwt;
        next();
      }
    });
  } else {
    next({ status: 405, message: "Token not found" });
  }
}

function checkPayload(req, res, next) {
  const keyArray = ["username", "password", "rolename"];

  keyArray.forEach((key) => {
    !req.body[key] &&
      next({
        status: 402,
        message: `${key} property is missing`,
      });
  });

  next();
}

async function uniqueUsername(req, res, next) {
  const searchedUser = await db("users")
    .where("username", req.body.username)
    .first();
  searchedUser
    ? next({ status: 407, message: "username is already used" })
    : next();
}

async function checkUsernameExisting(req, res, next) {
  const searchedUser = await db("users")
    .where("username", req.body.username)
    .first();
  searchedUser
    ? next()
    : next({ status: 404, message: "username is not found" });
}

function roleCheck(req, res, next) {
  const role = req.userData.rolename;
  role === "admin"
    ? next()
    : next({ status: 409, message: "No authorization to add riddle" });
}

module.exports = {
  checkPayload,
  uniqueUsername,
  checkUsernameExisting,
  restricted,
  roleCheck,
};
