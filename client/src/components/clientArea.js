import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  card: {
    width: "90%",
    height: "95%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  typography: {
    fontWeight: "bold",
    borderRadius: "5px",
    border: "1px solid black",
    margin: "10px 1rem",
    background: "#DBDDE6",
    padding: "5px",
    width: "100%",
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  personIcon: {
    fontSize: 30,
    color: "#324376",
  },
  cardContent: {
    border: "1px solid black",
    width: "50%",
    height: "90%",
    margin: "1rem",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "1rem",
  },
};

function ClientArea() {
  return (
    <div
      style={{
        top: 0,
        left: 0,
        background: "green",
        width: "100%",
        height: "100%",
        position: "fixed",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Card sx={style.card}>
        <Box sx={{ marginTop: "1rem", display: "flex" }}>
          <PersonIcon sx={{ fontSize: "2rem", color: "#003599" }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginLeft: "0.5rem" }}
          >
            Área do Cliente
          </Typography>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <CardContent sx={style.cardContent}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", margin: "1rem" }}
            >
              Informações Pessoais:
            </Typography>
            <Typography variant="h6" style={style.typography}>
              Nome: João Victor Martins da Silva
              <Button sx={{ color: "#7C7C7C" }}>
                <EditIcon />
              </Button>
            </Typography>
            <Typography variant="h6" style={style.typography}>
              CEP: 06663-055
              <Button sx={{ color: "#7C7C7C" }}>
                <EditIcon />
              </Button>
            </Typography>
            <Typography variant="h6" style={style.typography}>
              Telefone: (11) 98060-7358
              <Button sx={{ color: "#7C7C7C" }}>
                <EditIcon />
              </Button>
            </Typography>
            <Typography variant="h6" style={style.typography}>
              Email: jvictor77761@gmail.com
            </Typography>
            <Typography variant="h6" style={style.typography}>
              CPF: 539.720.298-37
            </Typography>
            <Typography variant="h6" style={style.typography}>
              Endereço: Rua Sebastião Mamede Nº:251 apto: 12B - Conjunto
              Habitacional setor D
            </Typography>
            <Button
              variant="contained"
              sx={{ background: "green", marginTop: "1rem" }}
            >
              Salvar Alterações
            </Button>
          </CardContent>
          <CardContent sx={style.cardContent}>
            <Typography variant="h6" sx={style.typography}>
              Histórico de Compras
            </Typography>
            <Typography variant="h6" sx={style.typography}>
              Endereços Salvos
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
}

export default ClientArea;
