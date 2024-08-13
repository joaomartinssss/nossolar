import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import "./OrderPage.css";

function Order() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const pendingOrders = [
    {
      id: "093",
      status: "Em Preparo",
      paymentOption: "Pagar na Retirada",
      deliveryOption: "Retirada",
      items: [
        { name: "Produto 3", quantity: 1, price: "R$15,00" },
        { name: "Produto 4", quantity: 2, price: "R$25,00" },
      ],
    },
    // Adicione outros pedidos aqui
  ];

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="div">
      <Card className="card">
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Pedidos Pendentes
          </Typography>
          <Grid container spacing={2} sx={{ width: "30rem" }}>
            {pendingOrders.map((order) => (
              <Grid item xs={12} key={order.id}>
                <Button
                  variant="outlined"
                  onClick={() => handleOrderClick(order)}
                  sx={{
                    width: "100%",
                    color: "black",
                    padding: "10px 35%",
                    border: "1px solid blue",
                    ":hover": {
                      backgroundColor: "#E5E7E6",
                      border: "1px solid blue",
                      color: "blue",
                    },
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Pedido #{order.id}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      {selectedOrder && (
        <Card className="card">
          <Typography variant="h5" sx={{ fontWeight: "bold", margin: "1rem" }}>
            Detalhes do Pedido #{selectedOrder.id}
          </Typography>
          <Typography
            variant="body1"
            sx={{ margin: "1rem", fontWeight: "bold" }}
          >
            Status: {selectedOrder.status}
          </Typography>
          <Typography
            variant="body1"
            sx={{ margin: "1rem", fontWeight: "bold" }}
          >
            Forma de Pagamento: {selectedOrder.paymentOption}
          </Typography>
          <Typography
            variant="body1"
            sx={{ margin: "1rem", fontWeight: "bold" }}
          >
            Opção de Entrega: {selectedOrder.deliveryOption}
          </Typography>
          <Box sx={{ margin: "1rem" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Itens do Pedido:
            </Typography>
            {selectedOrder.items.map((item, index) => (
              <Typography key={index} variant="body2" sx={{ margin: "0.5rem" }}>
                {item.name} - {item.quantity} x {item.price}
              </Typography>
            ))}
            <Button variant="contained" sx={{ marginTop: "1rem" }}>
              Despachar Pedido
            </Button>
          </Box>
        </Card>
      )}
    </div>
  );
}

export default Order;
