const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const PORT = 5000;
const auth = require("./auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", auth);

const connection = mysql.createConnection({
  host: "nossolardb.clqm8i0mo85q.sa-east-1.rds.amazonaws.com",
  user: "admin",
  password: "53972029837",
  database: "nosso_lar_products",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no banco de dados:", err);
    return;
  }
  console.log("Conexão ao banco de dados bem sucedida");
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
