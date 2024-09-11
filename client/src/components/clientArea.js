import { useEffect, useState } from "react";
import axios from "axios";
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
import { Link } from "react-router-dom";

const style = {
  card: {
    width: "90%",
    height: "95%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    overflowY: "auto",
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
    justifyContent: "center",
  },
  personIcon: {
    fontSize: 30,
    color: "#324376",
  },
  cardContent: {
    border: "1px solid black",
    width: "40rem",
    height: "90%",
    margin: "1rem",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "1rem",
    alignItems: "center",
  },
};

function ClientArea() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/user/3"
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário", error);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <div>Carregando...</div>;
  }

  return (
    <div
      style={{
        top: 0,
        left: 0,
        background: "lightblue",
        width: "100%",
        height: "100%",
        position: "fixed",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Card sx={style.card}>
        <Box sx={{ marginTop: "1rem", display: "flex", marginTop: "2rem" }}>
          <PersonIcon sx={{ fontSize: "2rem", color: "#003599" }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              marginLeft: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            Área do Cliente
          </Typography>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
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
              Nome: {userData.name}
              <Button sx={{ color: "#7C7C7C" }}>
                <EditIcon />
              </Button>
            </Typography>
            <Typography variant="h6" style={style.typography}>
              CEP: {userData.cep}
              <Button sx={{ color: "#7C7C7C" }}>
                <EditIcon />
              </Button>
            </Typography>
            <Typography variant="h6" style={style.typography}>
              Telefone: {userData.telefone}
              <Button sx={{ color: "#7C7C7C" }}>
                <EditIcon />
              </Button>
            </Typography>
            <Typography variant="h6" style={style.typography}>
              Email: {userData.email}
            </Typography>
            <Typography variant="h6" style={style.typography}>
              CPF: {userData.cpf}
            </Typography>
            <Typography variant="h6" style={style.typography}>
              Endereço: {userData.endereco}
            </Typography>
            <Button
              variant="contained"
              sx={{ background: "green", marginTop: "1rem", width: "80%" }}
            >
              Salvar Alterações
            </Button>
          </CardContent>
          <CardContent sx={style.cardContent}>
            <Link
              to={"/historicoDeCompras"}
              style={{ width: "100%", color: "black", textDecoration: "none" }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  borderRadius: "5px",
                  border: "1px solid black",
                  marginBottom: "0.5rem",
                  background: "#DBDDE6",
                  padding: "5px",
                  width: "100%",
                  boxSizing: "border-box",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "left",
                }}
              >
                Histórico de Compras
              </Typography>
            </Link>
            <Link
              style={{ width: "100%", color: "black", textDecoration: "none" }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  borderRadius: "5px",
                  border: "1px solid black",
                  background: "#DBDDE6",
                  padding: "5px",
                  width: "100%",
                  boxSizing: "border-box",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "0.5rem",
                }}
              >
                Endereços Salvos
              </Typography>
            </Link>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
}

export default ClientArea;
