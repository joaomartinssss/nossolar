import { Card, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Rodape from "./components/Rodape";

function payment() {
  const style = {
    image: {
      width: "100px",
      height: "100px",
      marginLeft: "1rem",
    },
    button: {
      margin: "1rem",
    },
    typography: {
      textAlign: "left",
      fontWeight: "bold",
    },
  };
  return (
    <div
      style={{
        background: "#CDD1DE",
        position: "fixed",
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
            src="https://scontent.fcgh4-1.fna.fbcdn.net/v/t39.30808-6/308833460_182883654278663_6836237298181134231_n.png?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=2k8AcPNGgUoQ7kNvgFNB3t4&_nc_zt=23&_nc_ht=scontent.fcgh4-1.fna&oh=00_AYAx0JFTTMPeBdFM0keiKlPGzPKZWV9gedvbC4wNm_HoFQ&oe=66B6B4F6"
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
          <Button style={style.button} variant="contained">
            Pagar na retirada
          </Button>
          <Button style={style.button} variant="contained">
            Pagar na Entrega
          </Button>
        </Box>
      </Card>
      <Rodape />
    </div>
  );
}

export default payment;
