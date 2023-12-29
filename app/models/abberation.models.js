module.exports = (sequelize, Sequelize) => {
  const Abberation = sequelize.define("abberation", {
    surveillance_group: {
      type: Sequelize.STRING,
    },
    abberation_id: {
      type: Sequelize.STRING,
    },
    date_abberation: {
      type: Sequelize.DATE,
    },
    detail_abberation: {
      type: Sequelize.STRING(1000),
    },
    corrective_action: {
      type: Sequelize.STRING(1000),
    },
    cause_analysis: {
      type: Sequelize.STRING(1000),
    },
    preventive_measure: {
      type: Sequelize.STRING(1000),
    },
    reporter_name: {
      type: Sequelize.STRING,
    },
    action_recomendation: {
      type: Sequelize.STRING(1000),
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
      type: Sequelize.JSON,
    },
    date_signature_reporter: {
      type: Sequelize.DATE,
    },
    signature_headsub: {
      type: Sequelize.JSON,
    },
    name_headsub: {
      type: Sequelize.STRING,
    },
    date_signature_headsub: {
      type: Sequelize.DATE,
    },
    signature_auditor: {
      type: Sequelize.JSON,
    },
    date_signature_auditor: {
      type: Sequelize.DATE,
    },
    signature_head_auditor: {
      type: Sequelize.JSON,
    },
    notes_headsub: {
      type: Sequelize.STRING(1000),
    },
    name_head_auditor: {
      type: Sequelize.STRING,
    },
    date_signature_head_auditor: {
      type: Sequelize.DATE,
    },
    signature_ceo: {
      type: Sequelize.JSON,
    },
    name_ceo: {
      type: Sequelize.STRING,
    },
    date_signature_ceo: {
      type: Sequelize.DATE,
    },
  });

  return Abberation;
};
