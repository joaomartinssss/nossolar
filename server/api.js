const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const sequelize = require("./database");
const bodyParser = require("body-parser");
const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const auth = require("../server/users/auth");

const app = express(); // Mova esta linha para o início, antes do uso de middlewares

const allowedOrigins = [
  "http://localhost:3000",
  "https://main.d2dstay1bvn7vg.amplifyapp.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Demais middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Suas rotas e demais configurações...*
const PORT = 3001; // Definindo a porta como 3001
const baseApiRoute = "https://products.nossolarsupermercado.com"; // Ajustando a rota base

const connection = mysql.createConnection({
  host: "nossolardb.clqm8i0mo85q.sa-east-1.rds.amazonaws.com",
  user: "admin",
  password: "53972029837",
  database: "nosso_lar_products",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conexão ao banco de dados bem-sucedida");
});

sequelize
  .sync({ alter: true })
  .then(() => console.log("Banco de dados sincronizado."))
  .catch((error) =>
    console.error("Erro ao sincronizar banco de dados:", error)
  );

// Middleware de autenticação
app.use("/api/auth", auth); // Endpoints de autenticação

app.post("/api/auth/login", (req, res) => {
  // lógica de autenticação
  res.send("Login realizado com sucesso");
});

// Rota para criar um novo pedido
app.post("/orders", async (req, res) => {
  const { user_id, payment_method, status, type, items } = req.body;

  console.log("Iniciando criação de pedido...");
  console.log("Dados do pedido:", req.body);

  try {
    //calcular o total somando o preço * quantidade para cada item
    let total = 0;

    //Busca os produtos e calcula o total
    for (let item of items) {
      const product = await Product.findByPk(item.product_id);
      if (!product) {
        return res
          .status(400)
          .json({ error: `Produto com ID ${item.product_id} não encontrado` });
      }
      total += product.price * item.quantity; // Assumindo que o modelo Product tem um campo 'price'
    }

    //cria o novo pedido com o total calculado
    const newOrder = await Order.create({
      user_id,
      payment_method: payment_method,
      status: "pendente",
      type: type,
      total,
    });

    console.log("Pedido criado com ID:", newOrder.id);

    // Adiciona os itens do pedido
    const orderItems = items.map((item) => ({
      order_id: newOrder.id,
      product_id: item.product_id,
      quantity: item.quantity,
    }));

    await OrderItem.bulkCreate(orderItems);

    console.log("Itens do pedido criados.");

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res
      .status(500)
      .json({ error: "Erro ao criar pedido", details: error.message });
  }
});

// Rota para buscar todos os pedidos
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: OrderItem,
        include: Product, // Inclui os detalhes dos produtos
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    res.status(500).json({ error: "Erro ao buscar pedidos", error });
  }
});

// Rota para atualizar o status de um pedido
app.put("/orders/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: "Pedido não encontrado" });

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar status do pedido" });
  }
});

// Rota para deletar todos os pedidos
app.delete("/orders", async (req, res) => {
  try {
    await Order.destroy({ where: {} }); // Apaga todos os pedidos
    res
      .status(200)
      .json({ message: "Todos os pedidos foram deletados com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar todos os pedidos:", error);
    res
      .status(500)
      .json({ error: "Erro ao deletar pedidos", details: error.message });
  }
});

// Rota para buscar os pedidos de um usuário específico
app.get("/orders/history/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const orders = await Order.findAll({
      where: { user_id }, // Filtra pelos pedidos do usuário logado
      include: {
        model: OrderItem,
        include: Product, // Inclui os detalhes dos produtos
      },
    });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum pedido encontrado para este usuário." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
});

app.use((req, res, next) => {
  const origin = req.header.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
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
  connection.query(sql, [categoryId], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rotas de gerenciamento de categorias e produtos

app.post("/categories", (req, res) => {
  const { name } = req.body;
  const newCategory = { name };
  connection.query(
    "INSERT INTO categories SET ?",
    newCategory,
    (error, results) => {
      if (error) {
        console.error("Erro ao inserir categoria:", error);
        res.status(500).send("Erro ao criar categoria");
        return;
      }
      newCategory.id = results.insertId;
      res.status(201).json(newCategory);
    }
  );
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
  connection.query(
    "INSERT INTO products SET ?",
    newProduct,
    (error, results) => {
      if (error) {
        console.error("Erro ao inserir produto:", error);
        res.status(500).send("Erro ao criar produto");
        return;
      }
      newProduct.id = results.insertId;
      res.status(201).json(newProduct);
    }
  );
});

app.get("/categories", (req, res) => {
  connection.query("SELECT * FROM categories", (error, results) => {
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
  connection.query(
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

  connection.query(
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
  connection.query("SELECT * FROM products", (error, results) => {
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
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (error, results) => {
      if (error) {
        console.error("Erro ao buscar produto:", error);
        res.status(500).send("Erro ao buscar produto");
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send("Produto não encontrado");
      }
      res.json(results[0]);
    }
  );
});

app.put("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  const { name, categoryId, image, description, price } = req.body;
  console.log("Dados recebidos na requisição:", req.body);
  const updateProduct = {
    name,
    category_id: categoryId,
    image,
    description,
    price,
  };

  console.log("Dados recebidos para atualização:", updateProduct);

  connection.query(
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

  connection.query(
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

  connection.query(
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
  connection.query("DELETE FROM products", (error, results) => {
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
