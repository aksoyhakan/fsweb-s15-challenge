const express = require("express");
const BilmeceModels = require("./bilmeceler-model");
const riddleMd = require("./bilmeceler-middleware");
const authMd = require("../auth/auth-middleware");

const router = express.Router();

router.use(express.json());

router.get("/", authMd.restricted, (req, res, next) => {
  BilmeceModels.getAll()
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ status: 500, message: "database problem" }));
});

router.get("/:id", authMd.restricted, riddleMd.existingId, (req, res, next) => {
  BilmeceModels.getById(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ status: 500, message: "database problem" }));
});

router.post(
  "/",
  authMd.restricted,
  authMd.roleCheck,
  riddleMd.payloadCheck,
  riddleMd.checkUniqueRiddle,
  riddleMd.checkUniqueId,
  (req, res, next) => {
    BilmeceModels.addRiddle(req.body)
      .then((response) => res.status(201).json(response))
      .catch((err) => next({ status: 500, message: "database problem" }));
  }
);

router.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = router;
