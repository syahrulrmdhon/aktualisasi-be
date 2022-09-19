const db = require("../models");
const fs = require("fs");
const url = require("url");
const Abberation = db.abberations;
const Op = db.Sequelize.Op;
const ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: "public_xG5OmJGQjVrhelGWlVY1wCkh5aM=",
  privateKey: "private_ZzeEgh2SvyAVoAOT3bFRD1HcwyI=",
  urlEndpoint: "https://ik.imagekit.io/vn1tyriomme/",
});

exports.auditorBoard = (req, res) => {
  const reporter_name = req.query.reporter_name;
  const years = req.query.year;
  const group = req.query.group;
  let condition = {
    ...(reporter_name && {
      reporter_name: {
        [Op.iLike]: `%${reporter_name}%`,
      },
    }),
    ...(years && {
      date_abberation: db.Sequelize.where(
        db.Sequelize.fn(
          "date_part",
          "year",
          db.Sequelize.col("date_abberation")
        ),
        years
      ),
    }),
    ...(group && {
      surveillance_group: {
        [Op.iLike]: `%${group}%`,
      },
    }),
  };
  Abberation.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving abberations.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const imgdataAI = req.body.signature_auditor;
  let pathAI;
  const isBase64 = (str) => {
    return str.includes("base64");
  };

  if (imgdataAI && isBase64(JSON.stringify(imgdataAI))) {
    // path =
    //   __basedir +
    //   "/resources/uploads/" +
    //   Date.now() +
    //   Math.floor(Math.random() * (1 - 100 + 1) + 1) +
    //   ".png";

    // fs.writeFileSync(path, base64Data, { encoding: "base64" });

    return imagekit
      .upload({
        file: imgdataAI.replace(/^data:([A-Za-z-+/]+);base64,/, ""), //required
        fileName:
          Date.now() + Math.floor(Math.random() * (1 - 100 + 1) + 1) + ".png", //required
        extensions: [
          {
            name: "google-auto-tagging",
            maxTags: 5,
            minConfidence: 95,
          },
        ],
      })
      .then((response) => {
        // Save Abberation in the database
        req.body.signature_auditor = {
          pathUrl: response.url,
          fileId: response.fileId,
        };
        return Abberation.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Abberation was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Abberation with id=${id}!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: `Error updating Abberation with id=${id}`,
              error: err,
            });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    Abberation.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Abberation was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Abberation with id=${id}!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error updating Abberation with id=${id}`,
        });
      });
  }
};

// Find a single Abberation with an id
exports.findOne = (req, res) => {
  Abberation.findAll({ where: { id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving abberations.",
      });
    });
};
