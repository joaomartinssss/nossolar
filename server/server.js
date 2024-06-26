const express = require("express");
const mysql = require("mysql");
const app = express();
const baseApiRoute = "http://localhost:3002";

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

const categories = {
  Hortifruti: 1,
  Padaria: 2,
  Açougue: 3,
  Bebidas: 4,
  Rotisseria: 5,
  Bomboniere: 6,
  Bazar: 7,
  Automotivo: 8,
  Pets: 9,
  Mercearia: 10,
  Limpeza: 11,
  Laticínios: 12,
  Bebês: 13,
  Higiene: 14,
  Congelados: 15,
  Utilidades: 16,
  Japonês: 17,
};

// Dynamic route to fetch products by category
app.get(`${baseApiRoute}/Categoria/:category`, (req, res) => {
  const category = req.params.category;
  const categoryId = categories[category];

  if (!categoryId) {
    return res.status(404).json({ error: "Categoria não encontrada" });
  }

  let sql = "SELECT * FROM products where category_id = ?";
  db.query(sql, [categoryId], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Inicia o servidor
const port = 3002;
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
