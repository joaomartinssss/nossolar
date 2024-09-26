const express = require("express");
const sequelize = require("./config/database");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");
const Product = require("./models/Product");

const app = express();
app.use(express.json());

// Sincronizar o banco de dados
sequelize.sync();

// Rota para criar um novo pedido
app.post("/orders", async (req, res) => {
  const { user_id, payment_method, status, type, items } = req.body;

  console.log("Iniciando criação de pedido...");
  console.log("Dados do pedido:", req.body);

  try {
    const newOrder = await Order.create({
      user_id,
      payment_method,
      status,
      type,
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

// Iniciar o servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
