const db = require("../models");
const fs = require("fs");
const url = require("url");
const Abberation = db.abberations;
const Op = db.Sequelize.Op;

// Create and Save a new Abberation
exports.create = (req, res) => {
  // Create a Abberation
  const path =
    __basedir +
    "/resources/uploads/" +
    Date.now() +
    Math.floor(Math.random() * (1 - 100 + 1) + 1) +
    ".png";
  const imgdata = req.body.signature_reporter;
  const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");

  fs.writeFileSync(path, base64Data, { encoding: "base64" });

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
    signature_reporter: path.replace(__basedir, ""),
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
};

// Retrieve all Abberations from the database.
exports.findAll = (req, res) => {
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
        [Op.iLike]: `%${group}%`
      }
    })
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

// Update a Abberation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

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

// Delete a Abberation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Abberation.findAll({ where: { id: req.params.id } })
    .then((data) => {
      if (data.length > 0) {
        if (data[0].signature_reporter) {
          fs.unlinkSync(__basedir + data[0].signature_reporter);
        }
        if (data[0].signature_headsub) {
          fs.unlinkSync(__basedir + data[0].signature_headsub);
        }
        if (data[0].signature_auditor) {
          fs.unlinkSync(__basedir + data[0].signature_auditor);
        }
        if (data[0].signature_head_auditor) {
          fs.unlinkSync(__basedir + data[0].signature_head_auditor);
        }
        if (data[0].signature_ceo) {
          fs.unlinkSync(__basedir + data[0].signature_ceo);
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

// Find all washed Abberation
exports.findAllSigned = (req, res) => {
  Abberation.findAll({ signed: { signed: true } })
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
