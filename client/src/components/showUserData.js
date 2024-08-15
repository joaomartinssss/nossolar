import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

function ShowUserData() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/user/3");
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário", error);
      }
    };

    fetchData();
  }, []);

  const style = {
    typography: {
      fontWeight: "bold",
    },
  };

  if (!userData) {
    return <div>Carregando...</div>;
  }
  return (
    <div
      style={{
        background: "lightBlue",
        position: "fixed",
        top: 0,
        left: 0,
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
          height: "auto",
          margin: "1.5rem",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        <Typography style={style.typography}>Nome: {userData.name}</Typography>
        <Typography style={style.typography}>Id: {userData.id}</Typography>
        <Typography style={style.typography}>
          Email: {userData.email}
        </Typography>
        <Typography style={style.typography}>Cep: {userData.cep}</Typography>
        <Typography style={style.typography}>Cpf: {userData.cpf}</Typography>
        <Typography style={style.typography}>
          Telefone:{userData.telefone}
        </Typography>
      </Card>
    </div>
  );
}

export default ShowUserData;
