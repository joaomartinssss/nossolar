const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./Order");
const Product = require("./Product"); // Certifique-se de que está importando o modelo de Produto corretamente

const OrderItem = sequelize.define("OrderItem", {
  order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: "id",
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Relacionamento entre Order e OrderItem
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

// Relacionamento entre OrderItem e Product
OrderItem.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(OrderItem, { foreignKey: "product_id" });

module.exports = OrderItem;
