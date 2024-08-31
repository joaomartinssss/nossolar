import { useState } from "react";
import { Card, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Rodape from "./Rodape";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function Payment() {
  const [selectOption, setSelectOption] = useState("");

  const handleSelect = (option) => {
    setSelectOption(option);
  };

  const style = {
    image: {
      width: "100px",
      height: "100px",
      marginLeft: "1rem",
    },
    button: {
      margin: "1rem",
    },
    selectButton: {
      margin: "1rem",
      backgroundColor: "gold",
      color: "black",
      fontWeight: "bold",
    },
    confirmButton: {
      margin: "1rem",
      backgroundColor: "green",
      color: "#fff",
      width: "300px",
    },
    typography: {
      textAlign: "left",
      fontWeight: "bold",
    },
    icon: {
      marginLeft: "1rem",
    },
  };

  return (
    <div
      style={{
        background: "#CDD1DE",
        top: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          border: "3px solid #cdd1de",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
          padding: "2rem",
          marginBottom: "1rem",
          marginTop: "5rem",
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        <Link to={"/"}>
          <img
            src="https://scontent.fsdu3-1.fna.fbcdn.net/v/t39.30808-6/318768361_487649283434966_4923966161297574562_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=iScLN_uATQcQ7kNvgFGCc-E&_nc_ht=scontent.fsdu3-1.fna&oh=00_AYCp337wpAEbbMFA9cap3516GfSUwBGVd5OBRUVJNO6o3Q&oe=66D88813"
            alt="Logo Nosso Lar"
            style={style.image}
          ></img>
        </Link>
        <Typography
          variant="h5"
          style={{
            ...style.typography,
            margin: "1rem",
            background: "white",
          }}
        >
          Página de Pagamento
        </Typography>
      </Box>
      <Card
        sx={{
          background: "white",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
        }}
      >
        <Typography style={style.typography} variant="h5">
          Formas de Pagamento:
        </Typography>
        <Box sx={{ marginTop: "1rem" }}>
          <Button
            style={
              selectOption === "retirada" ? style.selectButton : style.button
            }
            variant="contained"
            onClick={() => handleSelect("retirada")}
          >
            Pagar na retirada
            {selectOption === "retirada" && (
              <CheckCircleOutlineIcon style={style.icon} />
            )}
          </Button>
          <Button
            style={
              selectOption === "entrega" ? style.selectButton : style.button
            }
            variant="contained"
            onClick={() => handleSelect("entrega")}
          >
            Pagar na Entrega
            {selectOption === "entrega" && (
              <CheckCircleOutlineIcon style={style.icon} />
            )}
          </Button>
        </Box>
        {selectOption && (
          <Button style={style.confirmButton} variant="contained">
            Confirmar
          </Button>
        )}
      </Card>
      <Rodape />
    </div>
  );
}

export default Payment;
