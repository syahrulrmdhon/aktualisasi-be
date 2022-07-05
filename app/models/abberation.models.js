module.exports = (sequelize, Sequelize) => {
  const Abberation = sequelize.define("Abberation", {
    abberation_id: {
      type: Sequelize.STRING,
    },
    date_abberation: {
      type: Sequelize.DATE,
    },
    detail_abberation: {
      type: Sequelize.STRING,
    },
    corrective_action: {
      type: Sequelize.STRING,
    },
    cause_analysis: {
      type: Sequelize.STRING,
    },
    preventive_measure: {
      type: Sequelize.STRING,
    },
    reporter_name: {
      type: Sequelize.STRING,
    },
    action_recomendation: {
      type: Sequelize.STRING,
    },
    internal_auditor: {
      type: Sequelize.STRING,
    },
    facility_name: {
      type: Sequelize.STRING,
    },
    type_abberation: {
      type: Sequelize.STRING,
    },
    bussiness_process: {
      type: Sequelize.STRING,
    },
    signature_reporter: {
      type: Sequelize.BLOB("long"),
    },
    signature_headsub: {
      type: Sequelize.BLOB("long"),
    },
    name_headsub: {
      type: Sequelize.STRING,
    },
    signature_auditor: {
      type: Sequelize.BLOB("long"),
    },
    signature_head_auditor: {
      type: Sequelize.BLOB("long"),
    },
    name_head_auditor: {
      type: Sequelize.STRING,
    },
    signature_ceo: {
      type: Sequelize.BLOB("long"),
    },
    name_ceo: {
      type: Sequelize.STRING,
    },
  });

  return Abberation;
};
