import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogContent,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import breakPoints from "./BreakPoints";
import { useMediaQuery } from "@mui/material";
import "./ReadyForPickup.css";

function ReadyForPickup() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Estado para o pedido selecionado
  const [openModal, setOpenModal] = useState(false); // Estado para abrir/fechar o modal
  const isMobile = useMediaQuery(breakPoints.mobile);
  const isTablet = useMediaQuery(breakPoints.tablet);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/orders");
      const readyOrders = response.data.filter(
        (order) => order.status === "Pronto para retirada"
      );
      setOrders(readyOrders);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Função para abrir o modal com o pedido selecionado
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/orders/${orderId}`, {
        status: newStatus,
      });
      fetchOrders(); // Atualiza a lista de pedidos após a alteração
      setSnackbarMessage("Pedido concluído com sucesso!");
      setSnackbarOpen(true); // Abre o Snackbar
    } catch (error) {
      console.error("Erro ao atualizar o status do pedido:", error);
    }
  };

  return (
    <div className={isMobile ? "div mobile" : isTablet ? "div tablet" : "div"}>
      <Card
        className={isMobile ? "card mobile" : isTablet ? "card tablet" : "card"}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}
        >
          Pedidos Prontos para Retirada
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
                  onClick={() => handleOrderClick(order)} // Abrir o modal ao clicar no pedido
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
                  Pedido #{order.id}
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
              Detalhes do Pedido #{selectedOrder.id}
            </Typography>

            {/* Snackbar para exibir mensagens */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={() => setSnackbarOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                {snackbarMessage}
              </Alert>
            </Snackbar>

            <Typography
              variant="body1"
              sx={{
                margin: "0.5rem",
                fontWeight: "bold",
                fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "1.5rem",
              }}
            >
              Status: {selectedOrder.status}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                margin: "0.5rem",
                fontWeight: "bold",
                fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "1.5rem",
              }}
            >
              Forma de Pagamento: {selectedOrder.payment_method}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                margin: "0.5rem",
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
                  fontSize: isMobile
                    ? "1.5rem"
                    : isTablet
                    ? "2.5rem"
                    : "1.5rem",
                }}
              >
                Itens do Pedido:
              </Typography>
              {selectedOrder.OrderItems &&
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

              {/* Exibir o total do pedido */}
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
                  textAlign: "left",
                }}
              >
                Total: R${" "}
                {selectedOrder.OrderItems
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
                onClick={() =>
                  updateOrderStatus(selectedOrder.id, "Pedido retirado")
                }
              >
                Confirmar Retirada
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default ReadyForPickup;
