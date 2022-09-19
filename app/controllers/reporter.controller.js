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

exports.reporterBoard = (req, res) => {
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

// Create and Save a new Abberation
exports.create = (req, res) => {
  // Create a Abberation
  const imgdata = req.body.signature_reporter;
  let path;
  let objImage;

  if (imgdata) {
    // path =
    //   __basedir +
    //   "/resources/uploads/" +
    //   Date.now() +
    //   Math.floor(Math.random() * (1 - 100 + 1) + 1) +
    //   ".png";
    // const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");

    // fs.writeFileSync(path, base64Data, { encoding: "base64" });
    return imagekit
      .upload({
        file: imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, ""), //required
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
        console.log(response)
        const abberation = {
          abberation_id: req.body.abberation_id,
          date_abberation: req.body.date_abberation,
          detail_abberation: req.body.detail_abberation,
          corrective_action: req.body.corrective_action,
          cause_analysis: req.body.cause_analysis,
          preventive_measure: req.body.preventive_measure,
          reporter_name: req.body.reporter_name,
          action_recomendation: req.body.action_recomendation,
          internal_auditor: req.body.internal_auditor,
          facility_name: req.body.facility_name,
          type_abberation: req.body.type_abberation,
          bussiness_process: req.body.bussiness_process,
          signature_reporter: {
            pathUrl: response.url,
            fileId: response.fileId,
          },
          date_signature_reporter: req.body.date_signature_reporter,
          surveillance_group: req.body.surveillance_group,
        };

        return Abberation.create(abberation)
          .then((data) => {
            // data.signature_reporter = data.signature_reporter.toString('base64')
            res.send({
              data,
              status: 200,
              statusText: "Laporan Penyimpangan has been created sucessfully",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Laporan Penyimpangan.",
            });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    const abberation = {
      abberation_id: req.body.abberation_id,
      date_abberation: req.body.date_abberation,
      detail_abberation: req.body.detail_abberation,
      corrective_action: req.body.corrective_action,
      cause_analysis: req.body.cause_analysis,
      preventive_measure: req.body.preventive_measure,
      reporter_name: req.body.reporter_name,
      action_recomendation: req.body.action_recomendation,
      internal_auditor: req.body.internal_auditor,
      facility_name: req.body.facility_name,
      type_abberation: req.body.type_abberation,
      bussiness_process: req.body.bussiness_process,
      signature_reporter: imgdata ? imgKit() : null,
      date_signature_reporter: req.body.date_signature_reporter,
      surveillance_group: req.body.surveillance_group,
    };

    // Save Abberation in the database
    Abberation.create(abberation)
      .then((data) => {
        // data.signature_reporter = data.signature_reporter.toString('base64')
        res.send({
          data,
          status: 200,
          statusText: "Laporan Penyimpangan has been created sucessfully",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating the Laporan Penyimpangan.",
        });
      });
  }
};

// Delete a Abberation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Abberation.findAll({ where: { id: req.params.id } })
    .then((data) => {
      if (data.length > 0) {
        if (data[0].signature_reporter) {
          imagekit
            .deleteFile(data[0].signature_reporter.fileId)
            .then((response) => {
              console.log("responsedeletereporter: ", response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if (data[0].signature_headsub) {
          imagekit
            .deleteFile(data[0].signature_headsub.fileId)
            .then((response) => {
              console.log("responsedeleteheadsub: ", response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if (data[0].signature_auditor) {
          imagekit
            .deleteFile(data[0].signature_auditor.fileId)
            .then((response) => {
              console.log("responsedeleteauditor: ", response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if (data[0].signature_head_auditor) {
          imagekit
            .deleteFile(data[0].signature_head_auditor.fileId)
            .then((response) => {
              console.log("responsedeleteheadauditor: ", response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if (data[0].signature_ceo) {
          imagekit
            .deleteFile(data[0].signature_ceo.fileId)
            .then((response) => {
              console.log("responsedeleteceo: ", response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
      return Abberation.destroy({
        where: { id: id },
      }).then((num) => {
        if (num == 1) {
          res.send({
            message: "Abberation was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Abberation with id=${id}`,
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Abberation with id=${id}`,
      });
    });
};

// Update a Abberation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const imgdata = req.body.signature_reporter;
  const imgdataHeadsub = req.body.signature_headsub;
  const imgdataAI = req.body.signature_auditor;
  const imgdataHA = req.body.signature_head_auditor;
  const imgdataCEO = req.body.signature_ceo;
  let path;
  let pathHeadsub;
  let pathAI;
  let pathHA;
  let pathCEO;
  const isBase64 = (str) => {
    return str.includes("base64");
  };

  if (imgdata && isBase64(JSON.stringify(imgdata))) {
    path =
      __basedir +
      "/resources/uploads/" +
      Date.now() +
      Math.floor(Math.random() * (1 - 100 + 1) + 1) +
      ".png";
    const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");

    fs.writeFileSync(path, base64Data, { encoding: "base64" });
    req.body.signature_reporter = imgdata ? path.replace(__basedir, "") : null;
  }

  if (imgdataHeadsub && isBase64(JSON.stringify(imgdataHeadsub))) {
    pathHeadsub =
      __basedir +
      "/resources/uploads/HS-" +
      Date.now() +
      Math.floor(Math.random() * (1 - 100 + 1) + 1) +
      ".png";
    const base64Data = imgdataHeadsub.replace(
      /^data:([A-Za-z-+/]+);base64,/,
      ""
    );

    fs.writeFileSync(pathHeadsub, base64Data, { encoding: "base64" });
    req.body.signature_headsub = imgdataHeadsub
      ? pathHeadsub.replace(__basedir, "")
      : null;
  }

  if (imgdataAI && isBase64(JSON.stringify(imgdataAI))) {
    pathAI =
      __basedir +
      "/resources/uploads/AI-" +
      Date.now() +
      Math.floor(Math.random() * (1 - 100 + 1) + 1) +
      ".png";
    const base64Data = imgdataAI.replace(/^data:([A-Za-z-+/]+);base64,/, "");

    fs.writeFileSync(pathAI, base64Data, { encoding: "base64" });
    req.body.signature_auditor = imgdataAI
      ? pathAI.replace(__basedir, "")
      : null;
  }

  if (imgdataHA && isBase64(JSON.stringify(imgdataHA))) {
    pathHA =
      __basedir +
      "/resources/uploads/HA-" +
      Date.now() +
      Math.floor(Math.random() * (1 - 100 + 1) + 1) +
      ".png";
    const base64Data = imgdataHA.replace(/^data:([A-Za-z-+/]+);base64,/, "");

    fs.writeFileSync(pathHA, base64Data, { encoding: "base64" });
    req.body.signature_head_auditor = imgdataHA
      ? pathHA.replace(__basedir, "")
      : null;
  }

  if (imgdataCEO && isBase64(JSON.stringify(imgdataCEO))) {
    pathCEO =
      __basedir +
      "/resources/uploads/CEO-" +
      Date.now() +
      Math.floor(Math.random() * (1 - 100 + 1) + 1) +
      ".png";
    const base64Data = imgdataCEO.replace(/^data:([A-Za-z-+/]+);base64,/, "");

    fs.writeFileSync(pathCEO, base64Data, { encoding: "base64" });
    req.body.signature_ceo = imgdataCEO ? pathCEO.replace(__basedir, "") : null;
  }

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
