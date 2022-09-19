const { authJwt } = require("../middleware");
const controller = require("../controllers/auditor.controller");

module.exports = (app) => {
  app.get(
    "/api/auditor/abberation",
    [authJwt.verifyToken, authJwt.isAuditor],
    controller.auditorBoard
  );

  app.get(
    "/api/auditor/abberation/:id",
    [authJwt.verifyToken, authJwt.isAuditor],
    controller.findOne
  );

  app.put(
    "/api/auditor/abberation/:id",
    [authJwt.verifyToken, authJwt.isAuditor],
    controller.update
  )

};
