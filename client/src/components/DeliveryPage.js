import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

function PageViewProducts() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: "092",
      status: "Pronto para Entrega",
      paymentOption: "Pagar na Entrega",
      deliveryOption: "Entrega",
      items: [
        { name: "Produto 1", quantity: 2, price: "R$20,00" },
        { name: "Produto 2", quantity: 1, price: "R$30,00" },
      ],
    },
    // Adicione outros pedidos aqui
  ];

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div
      style={{
        background: "#78C0E0",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <Card
        sx={{
          width: "50%",
          margin: "1.5rem",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", margin: "1rem" }}>
          Pronto para Entrega:
        </Typography>
        <Grid container spacing={2}>
          {orders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Button
                variant="outlined"
                onClick={() => handleOrderClick(order)}
                sx={{
                  width: "100%",
                  color: "black",
                  alignItems: "center",
                  padding: "10px 35%",
                  border: "1px solid blue",
                  ":hover": {
                    backgroundColor: "#E5E7E6",
                    border: "1px solid blue",
                    color: "blue",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    margin: "1rem",
                    textAlign: "center",
                  }}
                >
                  Pedido #{order.id}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Card>
      {selectedOrder && (
        <Card
          sx={{
            width: "50%",
            margin: "1.5rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", margin: "1rem" }}>
            Detalhes do Pedido #{selectedOrder.id}
          </Typography>
          <Typography variant="body1" sx={{ margin: "1rem", fontWeight: "bold" }}>
            Status: {selectedOrder.status}
          </Typography>
          <Typography variant="body1" sx={{ margin: "1rem", fontWeight: "bold" }}>
            Forma de Pagamento: {selectedOrder.paymentOption}
          </Typography>
          <Typography
            variant="body1"
            sx={{ margin: "1rem", fontWeight: "bold" }}
          >
            Opção de Entrega: {selectedOrder.deliveryOption}
          </Typography>
          <Box
            sx={{
              width: "100%",
              margin: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Itens do Pedido:
            </Typography>
            {selectedOrder.items.map((item, index) => (
              <Typography key={index} variant="body2" sx={{ margin: "0.5rem" }}>
                {item.name} - {item.quantity} x {item.price}
              </Typography>
            ))}
          </Box>
        </Card>
      )}
    </div>
  );
}

export default PageViewProducts;
