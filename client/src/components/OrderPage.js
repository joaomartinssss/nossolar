import React, { useEffect, useState } from "react";
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
import axios from "axios";

function Order() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const isMobile = useMediaQuery(breakPoints.mobile);
  const isTablet = useMediaQuery(breakPoints.tablet);
  const [orderItems, setOrderItems] = useState([]);

  const cartItems = JSON.parse(localStorage.getItem("cartItems")).map(
    (item) => ({
      ...item,
      price: Number(item.price),
    })
  );

  useEffect(() => {
    const savedOrderItems = localStorage.getItem("orderItems");
    if (savedOrderItems) {
      setOrderItems(JSON.parse(savedOrderItems));
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/orders");
      console.log("Pedidos retornados da API:", response.data); // Adicione isto para verificar os dados
      setOrders(response.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
            {orders.map((order) => (
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
              fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "1.5rem",
            }}
          >
            Detalhes do Pedido #{selectedOrder.id}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              margin: "1rem",
              fontWeight: "bold",
              fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "1.5rem",
            }}
          >
            Status: {selectedOrder.status}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              margin: "1rem",
              fontWeight: "bold",
              fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "1.5rem",
            }}
          >
            Forma de Pagamento: {selectedOrder.payment_method}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              margin: "1rem",
              fontWeight: "bold",
              fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "1.5rem",
            }}
          >
            Opção de Entrega: {selectedOrder.type}
          </Typography>
          <Box sx={{ margin: "1rem", textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "1.5rem",
              }}
            >
              Itens do Pedido:
            </Typography>
            {selectedOrder.OrderItems && selectedOrder.OrderItems.length > 0 ? (
              selectedOrder.OrderItems.map((item, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    margin: "0.5rem",
                    fontSize: isMobile
                      ? "1.5rem"
                      : isTablet
                      ? "2.5rem"
                      : "1.5rem",
                  }}
                >
                  {item.Product.name} - {item.quantity} x R${" "}
                  {Number(item.Product.price).toFixed(2)}
                </Typography>
              ))
            ) : (
              <Typography
                variant="body2"
                sx={{ margin: "0.5rem", fontSize: "1.5rem" }}
              >
                Nenhum item encontrado neste pedido.
              </Typography>
            )}

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
