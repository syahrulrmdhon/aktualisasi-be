const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isReporter = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "reporter") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Reporter Role!",
      });
      return;
    });
  });
};

isAuditor = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "auditor") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Auditor Role!",
      });
    });
  });
};

isHeadAuditor = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "head_auditor") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Head Auditor Role!",
      });
    });
  });
};

isHeadSub = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "head_sub") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Head Sub Role!",
      });
    });
  });
};

isCEO = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "ceo") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require CEO Role!",
      });
    });
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!",
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isReporter: isReporter,
  isAuditor: isAuditor,
  isHeadAuditor: isHeadAuditor,
  isHeadSub: isHeadSub,
  isCEO: isCEO,
  isAdmin: isAdmin,
};
module.exports = authJwt;
