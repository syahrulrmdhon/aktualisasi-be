const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var multer = require("multer");
const path = require("path");
var upload = multer();
const app = express();

const db = require("./app/models");
const Role = db.role;

function initial() {
  Role.create({
    id: 1,
    name: "reporter",
  });

  Role.create({
    id: 2,
    name: "auditor",
  });

  Role.create({
    id: 3,
    name: "head_auditor",
  });

  Role.create({
    id: 4,
    name: "head_sub",
  });

  Role.create({
    id: 5,
    name: "ceo",
  });

  Role.create({
    id: 6,
    name: "admin",
  });
}
global.__basedir = __dirname;
// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

app.use(cors());
app.use(
  "/resources/uploads",
  express.static(path.join(__dirname, "/resources/uploads"))
);

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(upload.array());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to aktualisasi-be application." });
});

require("./app/routes/abberation.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/reporter.routes")(app);
require("./app/routes/auditor.routes")(app);
require("./app/routes/headsub.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
