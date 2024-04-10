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

// Rota para obter dados do banco de dados referente a TODOS os produtos de uma só vez
app.get(baseApiRoute + "/Categoria", (req, res) => {
  let sql = "SELECT * FROM Produtos;";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Hortifruti
app.get(baseApiRoute + "/Categoria/Hortifruti", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (1);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Padaria
app.get(baseApiRoute + "/Categoria/Padaria", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (2);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Açougue
app.get(baseApiRoute + "/Categoria/Açougue", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (3);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Bebidas
app.get(baseApiRoute + "/Categoria/Bebidas", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (4);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Rotisseria
app.get(baseApiRoute + "/Categoria/Rotisseria", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (5);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Bomboniere
app.get(baseApiRoute + "/Categoria/Bomboniere", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (6);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Bazar
app.get(baseApiRoute + "/Categoria/Bazar", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (7);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Automotivo
app.get(baseApiRoute + "/Categoria/Automotivo", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (8);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Pets
app.get(baseApiRoute + "/Categoria/Pets", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (9);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Mercearia
app.get(baseApiRoute + "/Categoria/Mercearia", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (10);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Limpeza
app.get(baseApiRoute + "/Categoria/Limpeza", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (11);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Latícinios
app.get(baseApiRoute + "/Categoria/Latícinios", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (12);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Bebês
app.get(baseApiRoute + "/Categoria/Bebês", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (13);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Higiene
app.get(baseApiRoute + "/Categoria/Higiene", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (14);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Congelados
app.get(baseApiRoute + "/Categoria/Congelados", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (15);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Utilidades
app.get(baseApiRoute + "/Categoria/Utilidades", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (16);";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rota para obter dados de TODOS os produtos da categoria Japonês
app.get(baseApiRoute + "/Categoria/Japonês", (req, res) => {
  let sql = "SELECT * FROM Produtos WHERE Categoria_ID = (17);";
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
