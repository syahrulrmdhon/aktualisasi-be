module.exports = {
  HOST: "ec2-52-205-61-230.compute-1.amazonaws.com",
  USER: "dyryvmbdbjfbbz",
  PASSWORD: "7589c8833ba4208dc6dac2b7b7ffbfe1cc4354d1e6e8baef50435727dd8fae9d",
  DB: "dc657jhhp2ac5e",
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// module.exports = {
//   HOST: "localhost",
//   USER: "postgres",
//   PASSWORD: "123",
//   DB: "aktualisasi_db",
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
