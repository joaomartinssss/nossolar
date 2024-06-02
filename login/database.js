const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("usuarios_nosso_lar", "root", "Bl@ck100305", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
