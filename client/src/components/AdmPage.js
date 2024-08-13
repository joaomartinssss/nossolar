import { Card, Button, Typography, Box } from "@mui/material";
import "./AdmPage.css";
import { Link } from "react-router-dom";

function AdmPage() {
  const style = {
    button: {
      margin: "0.5rem",
      background: "#003599",
      width: "400px",
    },
  };

  return (
    <div className="div">
      <Card className="card">
        <Typography variant="h4" sx={{ fontWeight: "bold", marginTop: "2rem" }}>
          Página de Administração do Supermercado Nosso Lar
        </Typography>
        <Box className="box">
          <Link to={"/ProductControl"}>
            <Button style={style.button} variant="contained">
              Pagina de Controle de Produtos
            </Button>
          </Link>
          <Button style={style.button} variant="contained">
            Visualizar Pedidos
          </Button>
          <Link
            to={
              "https://wa.me/5511980607358?text=João,+preciso+de+uma+ajuda+no+sistema"
            }
          >
            <Button style={style.button} variant="contained">
              Ajuda do Desenvolvedor
            </Button>
          </Link>
        </Box>
      </Card>
    </div>
  );
}

export default AdmPage;
