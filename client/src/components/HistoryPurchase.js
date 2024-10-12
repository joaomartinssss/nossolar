import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import axios from "axios";
import "./HistoryPurchase.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function HistoryPurchase() {
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    //Recuperar os dados do usuário do LocalStorage
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData)); // Converta para JSON e atualize o estado
    }
  }, []);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      if (userData && userData.id) {
        try {
          const response = await axios.get(
            `http://localhost:4000/orders/history/${userData.id}`
          );
          const orders = response.data.map((order) => ({
            id: order.id,
            date: new Date(order.order_time).toLocaleDateString(),
            time: new Date(order.order_time).toLocaleTimeString(), // Adiciona o horário da compra
            items: order.OrderItems.map((item) => ({
              name: item.Product.name,
              quantity: item.quantity,
              price: `R$${parseFloat(item.Product.price).toFixed(2)}`,
            })),
            totalAmount: `R$${parseFloat(order.total).toFixed(2)}`,
          }));
          setPurchaseHistory(orders);
        } catch (error) {
          console.error("Erro ao buscar o histórico de compras:", error);
        }
      }
    };

    fetchPurchaseHistory();
  }, [userData]);

  const handlePurchaseClick = (purchase) => {
    setSelectedPurchase(purchase);
    setIsModalOpen(true); // Abre o modal quando a compra é clicada
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  return (
    <div className="divHistory">
      <Card className="cardHistory">
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "1rem" }}
          >
            Seu Histórico de Compras
          </Typography>
          <Grid container spacing={2}>
            {purchaseHistory.length > 0 ? (
              purchaseHistory.map((purchase) => (
                <Grid item xs={12} key={purchase.id}>
                  <Button
                    onClick={() => handlePurchaseClick(purchase)}
                    sx={{
                      border: "2px solid #003599",
                      width: "100%",
                      marginTop: "1rem",
                      color: "black",
                      ":hover": {
                        backgroundColor: "#E5E7E6",
                        borderColor: "#003599",
                        color: "blue",
                      },
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      Compra no dia {purchase.date} às {purchase.time}{" "}
                      {/* Exibe a data e o horário */}
                    </Typography>
                  </Button>
                </Grid>
              ))
            ) : (
              <Typography variant="body2">
                Nenhum histórico de compras encontrado.
              </Typography>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Modal com detalhes da compra */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Detalhes da Compra no dia {selectedPurchase?.date} às{" "}
          {selectedPurchase?.time}
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "black",
            }}
          >
            <HighlightOffIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ margin: "1rem" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Itens Comprados:
            </Typography>
            {selectedPurchase?.items.map((item, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ margin: "0.5rem", textAlign: "center" }}
              >
                {item.name} - {item.quantity} x {item.price}
              </Typography>
            ))}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              Total Gasto: {selectedPurchase?.totalAmount}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HistoryPurchase;
