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
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false); // Estado para o diálogo de confirmação
  const [isLoading, setIsLoading] = useState(false); // Estado de loading
  const isMobile = useMediaQuery(breakPoints.mobile);
  const isTablet = useMediaQuery(breakPoints.tablet);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
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

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Função para abrir o modal de confirmação
  const handleConfirmClick = () => {
    setOpenConfirmation(true); // Abre o diálogo de confirmação
  };

  // Função para fechar o diálogo de confirmação
  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const confirmOrderPickup = async () => {
    if (selectedOrder) {
      setIsLoading(true); // Inicia o estado de loading
      try {
        await axios.put(`http://localhost:4000/orders/${selectedOrder.id}`, {
          status: "Pedido retirado",
        });
        fetchOrders(); // Atualiza a lista de pedidos após a alteração
        setSnackbarMessage(`Pedido #${selectedOrder.id} concluído com sucesso!`);
        setSnackbarOpen(true);
        handleCloseConfirmation(); // Fecha o diálogo de confirmação
        handleCloseModal();
      } catch (error) {
        console.error("Erro ao atualizar o status do pedido:", error);
      } finally {
        setIsLoading(false); // Finaliza o estado de loading
      }
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
            <Typography
              variant="body1"
              sx={{
                borderRadius: "5px",
                background: "#31D843",
                color: "black",
                textAlign: "center",
                margin: "0.5rem",
                fontWeight: "bold",
                fontSize: isMobile ? "1.5rem" : isTablet ? "2.5rem" : "1.5rem",
              }}
            >
              Status: {selectedOrder.status}
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
                  Cliente: {userData.name}
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
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: isMobile ? "1.5rem" : "1.5rem",
                    margin: "0.5rem",
                  }}
                >
                  CPF: {userData.cpf}
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
                    backgroundColor: "white",
                    color: "#1976d2",
                    border: " 1px solid #1976d2",
                  },
                }}
                onClick={handleConfirmClick} // Abre o diálogo de confirmação
              >
                Confirmar Retirada
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      {/* Diálogo de confirmação */}
      <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              margin: "1rem",
            }}
          >
            Tem certeza que deseja confirmar a retirada?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              onClick={handleCloseConfirmation}
              sx={{
                width: "45%",
                background: "red",
                margin: ".5rem",
                ":hover": {
                  backgroundColor: "#E5E7E6",
                  border: "1px solid red",
                  color: "red",
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "45%",
                background: "green",
                margin: ".5rem",
                ":hover": {
                  backgroundColor: "#E5E7E6",
                  border: "1px solid green",
                  color: "green",
                },
              }}
              onClick={confirmOrderPickup}
              disabled={isLoading} // Desabilita o botão durante o loading
            >
              {isLoading ? "Confirmando..." : "Confirmar"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ReadyForPickup;
