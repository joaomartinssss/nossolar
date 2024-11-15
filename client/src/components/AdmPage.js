import { Card, Button, Typography, Box, useMediaQuery } from "@mui/material";
import "./AdmPage.css";
import { Link } from "react-router-dom";
import breakPoints from "./BreakPoints";

function AdmPage() {
  const isMobile = useMediaQuery(breakPoints.mobile);
  const isTablet = useMediaQuery(breakPoints.tablet);

  const buttonStyles = {
    margin: "0.5rem",
    background: "#1976d2",
    width: isMobile ? "90%" : isTablet ? "70%" : "500px",
    height: "50px",
    fontWeight: "bold",
    fontSize: isMobile ? "1rem" : "1.2rem",
    ":hover": {
      background: "white",
      color: "#1976d2",
      border: "1px solid #1976d2",
      transform: "scale(1.05)",
      transition: "all 0.3s ease-in-out",
    },
  };

  return (
    <div className="adm-container">
      <div className="divadm">
        <Card className="cardadm">
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginTop: "2rem",
              marginBottom: isMobile ? "" : "3rem",
              fontSize: isMobile ? "2rem" : "2.5rem",
            }}
          >
            Página de Administração do Supermercado Nosso Lar
          </Typography>
          <Box className="box">
            <Link to={"/ProductControl"}>
              <Button sx={buttonStyles} variant="contained">
                Pagina de Controle de Produtos
              </Button>
            </Link>
            <Link to={"/PedidosPendentes"}>
              <Button sx={buttonStyles} variant="contained">
                Visualizar Pedidos Pendentes
              </Button>
            </Link>
            <Link to={"/PedidosProntosParaRetirada"}>
              <Button sx={buttonStyles} variant="contained">
                Visualizar Pedidos Prontos
              </Button>
            </Link>
            <Link
              to={
                "https://wa.me/5511980607358?text=João,+preciso+de+uma+ajuda+no+sistema"
              }
            >
              <Button sx={buttonStyles} variant="contained">
                Ajuda do Desenvolvedor
              </Button>
            </Link>
          </Box>
        </Card>
      </div>
    </div>
  );
}

export default AdmPage;
