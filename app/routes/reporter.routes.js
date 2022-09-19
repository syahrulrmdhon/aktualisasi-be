const { authJwt } = require("../middleware");
const controller = require("../controllers/reporter.controller");

module.exports = (app) => {
  app.get(
    "/api/reporter/abberation",
    [authJwt.verifyToken, authJwt.isReporter],
    controller.reporterBoard
  );

  app.get(
    "/api/reporter/abberation/:id",
    [authJwt.verifyToken, authJwt.isReporter],
    controller.findOne
  );

  app.post(
    "/api/reporter/abberation",
    [authJwt.verifyToken, authJwt.isReporter],
    controller.create
  );

  app.delete(
    "/api/reporter/abberation/:id",
    [authJwt.verifyToken, authJwt.isReporter],
    controller.delete
  );

  app.put(
    "/api/reporter/abberation/:id",
    [authJwt.verifyToken, authJwt.isReporter],
    controller.update
  );
};
