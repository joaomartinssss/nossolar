const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nosso_lar_products", "admin", "53972029837", {
  host: "nossolardb.clqm8i0mo85q.sa-east-1.rds.amazonaws.com",
  dialect: "mysql",
});

module.exports = sequelize;
