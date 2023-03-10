const db = require("../../data/dbConfig");
const RiddleModels = require("./bilmeceler-model");

function existingId(req, res, next) {
  RiddleModels.getById(req.params.id).then((response) => {
    response
      ? next()
      : next({
          status: 404,
          message: `Id no: ${req.params.id} riddle is not found`,
        });
  });
}

function payloadCheck(req, res, next) {
  const keyArray = ["id", "riddle"];

  keyArray.forEach((key) => {
    !req.body[key] &&
      next({ status: 404, message: `${key} property is missing` });
  });
  next();
}

async function checkUniqueRiddle(req, res, next) {
  const searchRiddle = await db("riddles")
    .where("riddle", req.body.riddle)
    .first();

  searchRiddle
    ? next({ status: 404, message: "This riddle is already uploaded" })
    : next();
}
function checkUniqueId(req, res, next) {
  const searchRiddle = RiddleModels.getById(req.body.id).then((response) => {
    response ? next({ status: 404, message: "This id is not unique" }) : next();
  });
}

module.exports = { existingId, payloadCheck, checkUniqueRiddle, checkUniqueId };
