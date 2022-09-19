const { authJwt } = require("../middleware");
const controller = require("../controllers/headsub.controller");

module.exports = (app) => {
  app.get(
    "/api/headsub/abberation",
    [authJwt.verifyToken, authJwt.isHeadSub],
    controller.headsubBoard
  );

  app.get(
    "/api/headsub/abberation/:id",
    [authJwt.verifyToken, authJwt.isHeadSub],
    controller.findOne
  );

  app.put(
    "/api/headsub/abberation/:id",
    [authJwt.verifyToken, authJwt.isHeadSub],
    controller.update
  );
};
