const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nosso_lar_suburbano", "root", "Bl@ck100305", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
