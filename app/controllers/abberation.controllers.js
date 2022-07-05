const db = require("../models");
const fs = require("fs");
const Abberation = db.abberations;
const Op = db.Sequelize.Op;

// Create and Save a new Abberation
exports.create = (req, res) => {
  // Create a Abberation
  console.log(req.body)
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
    signature_reporter: req.body.signature_reporter
      ? fs.readFileSync(
          __basedir +
            "/resources/uploads/" +
            req.body.signature_reporter.originalname
        )
      : "",
  };

  // Save Abberation in the database
  Abberation.create(abberation)
    .then((data) => {
      fs.writeFileSync(
        __basedir + "/resources/tmp/" + data.signature_reporter.filename,
        data.signature_reporter
      );
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
  let condition = reporter_name
    ? { reporter_name: { [Op.iLike]: `%${reporter_name}%` } }
    : null;
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
  Abberation.findAll({ where: { abberation_id: req.params.abberation_id } })
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
  const id = req.params.abberation_id;

  Abberation.update(req.body, {
    where: { abberation_id: id },
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

  Abberation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Abberation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Abberation with id=${id}`,
        });
      }
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
