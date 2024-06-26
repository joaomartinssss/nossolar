import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Rodape = () => {
  const estiloRodape = {
    width: "100%",
    backgroundColor: "#003599",
    color: "aliceblue",
    padding: "1rem",
    // margin: 0,
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  };

  const estiloSecao = {
    flex: 1,
    padding: "1rem",
    textAlign: "left",
    margin: "1rem",
  };

  return (
    <div style={estiloRodape}>
      <Card
        style={{
          backgroundColor: "#003599",
          color: "white",
          width: "100%",
        }}
      >
        <CardContent
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={estiloSecao}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Sobre
            </Typography>
            <Typography sx={{ marginTop: "2rem" }}>
              O Supermercado Nosso Lar é um estabelecimento familiar que oferece
              os melhores produtos da região aos nossos clientes. Nosso objetivo
              é proporcionar uma experiência de compras agradável e conveniente,
              com preços acessíveis e uma ampla variedade de opções.
            </Typography>
            <p style={{ marginTop: "3rem" }}>
              &copy; 2024 Supermercado Nosso Lar
            </p>
          </div>
          <div style={estiloSecao}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Nossas Lojas
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginTop: "1rem",
              }}
            >
              Suburbano:
            </Typography>
            <Typography>(11) 4142-8317</Typography>
            <Typography>
              Av. Lizete Geralda Calandrini Guimarães, 57 - Parque Suburbano,
              Itapevi - SP, 06663-665
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginTop: "1rem",
              }}
            >
              Vitápolis:
            </Typography>
            <Typography>(11) 4141-2746</Typography>
            <Typography>
              R. Cecília Pereira Alves, 105 - Jardim Vitapolis, Itapevi - SP,
              06693-360
            </Typography>
          </div>
          <div style={estiloSecao}>
            <div style={{ marginBottom: "6rem" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Nossas Redes Sociais:
              </Typography>
              <Link
                to={
                  "https://www.instagram.com/supermercadosnossolar_oficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                }
              >
                <InstagramIcon
                  sx={{ color: "white", margin: ".5rem", fontSize: "2rem" }}
                />
              </Link>
              <Link>
                <XIcon
                  sx={{ color: "white", margin: ".5rem", fontSize: "2rem" }}
                />
              </Link>
              <Link>
                <FacebookIcon
                  sx={{ color: "white", margin: ".5rem", fontSize: "2rem" }}
                />
              </Link>
              <Link>
                <WhatsAppIcon
                  sx={{ color: "white", margin: ".5rem", fontSize: "2rem" }}
                />
              </Link>
            </div>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Horário de Funcionamento:
            </Typography>
            <Typography>Seg à Sab: 07:30 - 22:00</Typography>
            <Typography>Domingo: 08:00 - 20:00</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rodape;
{
  /* <section style={estiloRodape}>
      <h2>Sobre o Supermercado</h2>
    </section> */
}
{
  /* <p>
  O Supermercado Nosso Lar é um estabelecimento familiar que oferece os
  melhores produtos da região aos nossos clientes.
</p>
<p>
  Nosso objetivo é proporcionar uma experiência de compras agradável e
  conveniente, com preços acessíveis e uma ampla variedade de opções.
</p>
<p>Suburbano: (11) 4142-8317</p>
<p>
  Av. Lizete Geralda Calandrini Guimarães, 57 - Parque Suburbano, Itapevi
  - SP, 06663-665
</p>
<p>Vitápolis: (11) 4141-2746</p>
<p>
  R. Cecília Pereira Alves, 105 - Jardim Vitapolis, Itapevi - SP,
  06693-360
</p>
<footer>
  <p>&copy; 2024 Supermercado Nosso Lar</p>
</footer> */
}
