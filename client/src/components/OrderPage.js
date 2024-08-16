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
import breakPoints from "./BreakPoints";
import { useMediaQuery } from "@mui/material";

function Order() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const isMobile = useMediaQuery(breakPoints.mobile);
  const isTablet = useMediaQuery(breakPoints.tablet);

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
    <div className={isMobile ? "div mobile" : isTablet ? "div tablet" : "div"}>
      <Card
        className={isMobile ? "card mobile" : isTablet ? "card tablet" : "card"}
      >
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
        <CardContent
          sx={{
            overflowY: "auto",
            width: isMobile ? "100%" : isTablet ? "75%" : "47.5rem",
          }}
        >
          <Grid container spacing={2}>
            {pendingOrders.map((order) => (
              <Grid item xs={12} key={order.id}>
                <Button
                  variant="outlined"
                  onClick={() => handleOrderClick(order)}
                  sx={{
                    width: "100%",
                    color: "black",
                    padding: isMobile
                      ? "10px 25%"
                      : isTablet
                      ? "10px 30%"
                      : "10px 35%",
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
                      textAlign: "center",
                      width: isMobile ? "90%" : isTablet ? "60%" : "40rem",
                      height: "3rem",
                    }}
                  >
                    Pedido #{order.id}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      {selectedOrder && (
        <Card className="card" sx={{ overflowY: "auto", textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              margin: "1rem",
              fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "2rem",
            }}
          >
            Detalhes do Pedido #{selectedOrder.id}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              margin: "1rem",
              fontWeight: "bold",
              fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "2rem",
            }}
          >
            Status: {selectedOrder.status}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              margin: "1rem",
              fontWeight: "bold",
              fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "2rem",
            }}
          >
            Forma de Pagamento: {selectedOrder.paymentOption}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              margin: "1rem",
              fontWeight: "bold",
              fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "2rem",
            }}
          >
            Opção de Entrega: {selectedOrder.deliveryOption}
          </Typography>
          <Box sx={{ margin: "1rem", textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "2rem",
              }}
            >
              Itens do Pedido:
            </Typography>
            {selectedOrder.items.map((item, index) => (
              <Typography key={index} variant="body2" sx={{ margin: "0.5rem", fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "2rem" }}>
                {item.name} - {item.quantity} x {item.price}
              </Typography>
            ))}
            <Button
              variant="contained"
              sx={{
                marginTop: "1rem",
                width: isMobile ? "100%" : isTablet ? "30rem" : "40rem",
                height: "4rem",
                marginBottom: "1rem",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Encerrar Pedido
            </Button>
          </Box>
        </Card>
      )}
    </div>
  );
}

export default Order;
