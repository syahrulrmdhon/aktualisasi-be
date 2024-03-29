module.exports = (app) => {
  const abberation = require("../controllers/abberation.controllers");

  var router = require("express").Router();
  const upload = require("../middleware/upload");
  const { authJwt } = require("../middleware");

  // Create a new Order
  router.post("/", [authJwt.verifyToken, upload.single("signature_reporter")], (req, res) => {
    abberation.create(req, res);
  });

  // Retrieve all Orders
  router.get("/", [authJwt.verifyToken], abberation.findAll);

  // Retrieve all Signed
  router.get("/signed", abberation.findAllSigned);

  // Retrieve a single Order with id
  router.get("/:id", abberation.findOne);

  // Update a Order with id
  router.put("/:id", abberation.update);

  // Delete a Order with id
  router.delete("/:id", abberation.delete);

  app.use("/api/abberation", router);
};
