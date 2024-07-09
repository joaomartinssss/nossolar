const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = 3001; // Definindo a porta como 3001
const baseApiRoute = "http://localhost:3001"; // Ajustando a rota base

app.use(express.json());
app.use(cors());

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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
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

// Rota dinâmica para buscar produtos por categoria
app.get(`${baseApiRoute}/Categoria/:category`, (req, res) => {
  const category = req.params.category;
  const categoryId = categories[category];

  if (!categoryId) {
    return res.status(404).json({ error: "Categoria não encontrada" });
  }

  let sql = "SELECT * FROM products WHERE category_id = ?";
  db.query(sql, [categoryId], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rotas de gerenciamento de categorias e produtos

app.post("/categories", (req, res) => {
  const { name } = req.body;
  const newCategory = { name };
  db.query("INSERT INTO categories SET ?", newCategory, (error, results) => {
    if (error) {
      console.error("Erro ao inserir categoria:", error);
      res.status(500).send("Erro ao criar categoria");
      return;
    }
    newCategory.id = results.insertId;
    res.status(201).json(newCategory);
  });
});

app.post("/categories/:categoryId/products", (req, res) => {
  const categoryId = req.params.categoryId;
  const { name, image, description, price } = req.body;
  const newProduct = {
    name,
    category_id: categoryId,
    image,
    description,
    price,
  };
  db.query("INSERT INTO products SET ?", newProduct, (error, results) => {
    if (error) {
      console.error("Erro ao inserir produto:", error);
      res.status(500).send("Erro ao criar produto");
      return;
    }
    newProduct.id = results.insertId;
    res.status(201).json(newProduct);
  });
});

app.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories", (error, results) => {
    if (error) {
      console.error("Erro ao buscar categorias:", error);
      res.status(500).send("Erro ao buscar categorias");
      return;
    }
    res.json(results);
  });
});

app.get("/categories/:categoryId/products", (req, res) => {
  const categoryId = req.params.categoryId;
  db.query(
    "SELECT * FROM products WHERE category_id = ?",
    [categoryId],
    (error, results) => {
      if (error) {
        console.error("Erro ao buscar produtos da categoria:", error);
        res.status(500).send("Erro ao buscar produtos da categoria");
        return;
      }
      res.json(results);
    }
  );
});

app.put("/categories/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  const { name } = req.body;
  const updateCategory = { name };

  db.query(
    "UPDATE categories SET ? WHERE id = ?",
    [updateCategory, categoryId],
    (error, results) => {
      if (error) {
        console.error("Erro ao atualizar categoria:", error);
        res.status(500).send("Erro ao atualizar categoria");
        return;
      }
      res.status(200).json({ message: "Categoria atualizada com sucesso" });
    }
  );
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (error, results) => {
    if (error) {
      console.error("Erro ao buscar produtos:", error);
      res.status(500).send("Erro ao buscar produtos");
      return;
    }
    res.json(results);
  });
});

app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  db.query(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (error, results) => {
      if (error) {
        console.error("Erro ao buscar produto:", error);
        res.status(500).send("Erro ao buscar produto");
        return;
      }
      if (results.length === 0) {
        res.status(404).send("Produto não encontrado");
        return;
      }
      res.json(results[0]);
    }
  );
});

app.put("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  const { name, categoryId, image, description, price } = req.body;
  console.log("Dados recebidos na requisição:", req.body)
  const updateProduct = {
    name,
    category_id: categoryId,
    image,
    description,
    price,
  };

  console.log("Dados recebidos para atualização:", updateProduct);

  db.query(
    "UPDATE products SET ? WHERE id = ?",
    [updateProduct, productId],
    (error, results) => {
      if (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(500).send("Erro ao atualizar produto");
        return;
      }
      if (results.affetedRows === 0) {
        res.status(404).send("Produto não encontrado");
      } else {
        res.status(200).send("Produto atualizado com sucesso");
      }
    }
  );
});

app.delete("/categories/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;

  db.query(
    "DELETE FROM categories WHERE id = ?",
    [categoryId],
    (error, results) => {
      if (error) {
        console.error("Erro ao excluir categoria:", error);
        res.status(500).send("Erro ao excluir categoria");
        return;
      }
      res.status(200).json({ message: "Categoria excluída com sucesso" });
    }
  );
});

app.delete("/products/:productId", (req, res) => {
  const productId = req.params.productId;

  db.query(
    "DELETE FROM products WHERE id = ?",
    [productId],
    (error, results) => {
      if (error) {
        console.error("Erro ao excluir produto:", error);
        res.status(500).send("Erro ao excluir produto");
        return;
      }
      res.status(200).json({ message: "Produto excluído com sucesso" });
    }
  );
});

app.delete("/products", (req, res) => {
  db.query("DELETE FROM products", (error, results) => {
    if (error) {
      console.error("Erro ao excluir todos os produtos:", error);
      res.status(500).send("Erro ao excluir todos os produtos");
      return;
    }
    res
      .status(200)
      .json({ message: "Todos os produtos excluídos com sucesso" });
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
