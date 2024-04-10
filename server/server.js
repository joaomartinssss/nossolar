const express = require("express");
const mysql = require("mysql");
const app = express();
const baseApiRoute = "api/v1";

// Configurações do banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bl@ck100305",
  database: "nosso_lar_suburbano",
});

// Conecta ao banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conexão ao banco de dados bem-sucedida!");
});

// Rota para obter dados do banco de dados
app.get(baseApiRoute + "/Categoria", (req, res) => {
  let sql = "SELECT * FROM Produtos";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Inicia o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// fetch(baseApiRoute + "/Categoria")
//   .then((response) => response.json())
//   .then((data) => {
//     // Faça o que quiser com os dados recebidos
//     console.log(data);
//   })
//   .catch((error) => console.error("Erro:", error));
