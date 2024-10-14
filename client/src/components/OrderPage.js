import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Dialog,
  DialogContent,
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
  const [openModal, setOpenModal] = useState(false); // Estado para abrir/fechar o modal
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (userData && userData.id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/auth/user/${userData.id}`
          );
          setUserData(response.data);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário", error);
        }
      };
      fetchData();
    }
  }, [userData]);

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
      console.log("Pedidos retornados da API:", response.data);
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
    setOpenModal(true); // Abrir o modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Fechar o modal
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

      {/* Modal para detalhes do pedido */}
      {selectedOrder && (
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                margin: "1rem",
                fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "1.5rem",
                textAlign: "center",
              }}
            >
              Detalhes do Pedido #{selectedOrder?.id}
            </Typography>
            {userData && (
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: isMobile ? "1.5rem" : "1.5rem",
                    margin: "0.5rem",
                  }}
                >
                  Nome do Cliente: {userData.name}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: isMobile ? "1.5rem" : "1.5rem",
                    margin: "0.5rem",
                  }}
                >
                  Telefone: {userData.telefone}
                </Typography>
              </Box>
            )}
            <Typography
              variant="body1"
              sx={{
                margin: "0.5rem",
                fontWeight: "bold",
                fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "1.5rem",
              }}
            >
              Status: {selectedOrder?.status}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                margin: "0.5rem",
                fontWeight: "bold",
                fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "1.5rem",
              }}
            >
              Forma de Pagamento: {selectedOrder?.payment_method}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                margin: "0.5rem",
                fontWeight: "bold",
                fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "1.5rem",
              }}
            >
              Opção de Entrega: {selectedOrder?.type}
            </Typography>
            <Box sx={{ margin: "1rem", textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: isMobile
                    ? "1.5rem"
                    : isTablet
                    ? "2.5rem"
                    : "1.5rem",
                }}
              >
                Itens do Pedido:
              </Typography>
              {selectedOrder?.OrderItems &&
              selectedOrder.OrderItems.length > 0 ? (
                selectedOrder.OrderItems.map((item, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      margin: "0.5rem",
                      fontSize: isMobile
                        ? "1.5rem"
                        : isTablet
                        ? "2rem"
                        : "1.5rem",
                      textAlign: "left",
                      color: "gray",
                      fontFamily: "inherit",
                    }}
                  >
                    - {item.Product.name} - {item.quantity} x R${" "}
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
              {/* Calcular e exibir o total do pedido */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  margin: "0.5rem",
                  fontSize: isMobile
                    ? "1.5rem"
                    : isTablet
                    ? "2.5rem"
                    : "1.5rem",
                  textAlign: "left", // Alinhar o total à direita
                }}
              >
                Total: R${" "}
                {selectedOrder?.OrderItems
                  ? selectedOrder.OrderItems.reduce(
                      (total, item) =>
                        total + item.quantity * Number(item.Product.price),
                      0
                    ).toFixed(2)
                  : "0.00"}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  marginTop: "1rem",
                  width: isMobile ? "100%" : isTablet ? "30rem" : "25rem",
                  height: "3rem",
                  marginBottom: "1rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white", // Cor de fundo quando hover
                    color: "#1976d2", // Cor do texto quando hover
                    border: " 1px solid #1976d2", // Cor da borda quando hover
                  },
                }}
              >
                Despachar Pedido
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default Order;
