const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database");

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso");
  })
  .catch((err) => {
    console.error("erro ao se conectar ao banco de dados", err);
  });

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "users", // This is important to specify the exact table name
    timestamps: false, // Since we already have a `data_criacao` field, we don't need Sequelize's `createdAt` and `updatedAt`
  }
);

module.exports = User;
