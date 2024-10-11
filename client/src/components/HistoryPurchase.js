import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import "./HistoryPurchase.css";

function HistoryPurchase() {
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    //Recuperar os dados do usuário do LocalStorage
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData)); //Converta para JSON e atualize o estado
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

  // const purchaseHistory = [
  //   {
  //     id: "001",
  //     date: "01/08/2024",
  //     items: [
  //       { name: "Produto 1", quantity: 2, price: "R$20,00" },
  //       { name: "Produto 2", quantity: 1, price: "R$50,00" },
  //     ],
  //     totalAmount: "R$90,00",
  //   },
  //   {
  //     id: "002",
  //     date: "15/07/2024",
  //     items: [
  //       { name: "Produto 3", quantity: 1, price: "R$15,00" },
  //       { name: "Produto 4", quantity: 2, price: "R$25,00" },
  //     ],
  //     totalAmount: "R$65,00",
  //   },
  //   // Adicione outras compras aqui
  // ];

  const handlePurchaseClick = (purchase) => {
    setSelectedPurchase(purchase);
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
                      Compra no dia {purchase.date}
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
      {selectedPurchase && (
        <Card className="cardHistory">
          <Typography variant="h5" sx={{ fontWeight: "bold", margin: "1rem" }}>
            Detalhes da Compra no dia {selectedPurchase.date}
          </Typography>
          <Box sx={{ margin: "1rem" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Itens Comprados:
            </Typography>
            {selectedPurchase.items.map((item, index) => (
              <Typography key={index} variant="body2" sx={{ margin: "0.5rem" }}>
                {item.name} - {item.quantity} x {item.price}
              </Typography>
            ))}
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginTop: "1rem" }}
            >
              Total Gasto: {selectedPurchase.totalAmount}
            </Typography>
          </Box>
        </Card>
      )}
    </div>
  );
}

export default HistoryPurchase;
