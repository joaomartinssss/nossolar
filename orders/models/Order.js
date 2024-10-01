const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "pendente",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    total: {
      //adicionando o campo total
      type: DataTypes.FLOAT, // ou  DOUBLE dependendo da precisão necessaria
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Order;
