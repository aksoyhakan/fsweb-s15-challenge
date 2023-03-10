const UserModels = require("./user-model");
const db = require("../../data/dbConfig");

function checkId(req, res, next) {
  UserModels.getById(req.params.id)
    .then((response) => {
      response
        ? next()
        : next({
            status: 404,
            message: `Id no: ${req.params.id} user is not found`,
          });
    })
    .catch((err) => next({ status: 500, message: "database problem" }));
}

module.exports = { checkId };
