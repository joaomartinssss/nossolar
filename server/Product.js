const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Product = sequelize.define(
  "products",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    timestamps: false, // Desativa as colunas createdAt e updatedAt
  }
);

module.exports = Product;
