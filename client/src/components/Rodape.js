import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useMediaQuery } from "@mui/material";
import breakPoints from "./BreakPoints";

const Rodape = () => {
  const isMobile = useMediaQuery(breakPoints.mobile);

  const estiloRodape = {
    width: "100%",
    backgroundColor: "#003599",
    color: "aliceblue",
    padding: "1rem",
    textAlign: "center",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
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
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
          }}
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
            <Link
              style={{ color: "white" }}
              to={
                "https://www.google.com.br/maps/place/Av.+Lizete+Geralda+Calandrini+Guimar%C3%A3es,+57+-+Parque+Suburbano,+Itapevi+-+SP,+06663-650/@-23.5635799,-46.9323652,17z/data=!3m1!4b1!4m6!3m5!1s0x94cf06ef8ed53ee9:0xe7222493b03bf7a9!8m2!3d-23.5635799!4d-46.9297903!16s%2Fg%2F11c1p8tp0_?entry=ttu"
              }
            >
              <Typography>
                Av. Lizete Geralda Calandrini Guimarães, 57 - Parque Suburbano,
                Itapevi - SP, 06663-665
              </Typography>
            </Link>
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
            <Link
              style={{ color: "white" }}
              to={
                "https://www.google.com.br/maps/place/R.+Cec%C3%ADlia+Pereira+Alves,+105+-+Jardim+Vitapolis,+Itapevi+-+SP,+06693-360/@-23.5338869,-46.9287245,17z/data=!3m1!4b1!4m6!3m5!1s0x94cf0420a0b9d1a7:0x2d9484fc772d0247!8m2!3d-23.5338869!4d-46.9261496!16s%2Fg%2F11f1yzbcfj?entry=ttu"
              }
            >
              <Typography>
                R. Cecília Pereira Alves, 105 - Jardim Vitapolis, Itapevi - SP,
                06693-360
              </Typography>
            </Link>
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
              <Link
                to={"https://www.facebook.com/supermercadosnossolaroficial/"}
              >
                <FacebookIcon
                  sx={{ color: "white", margin: ".5rem", fontSize: "2rem" }}
                />
              </Link>
              <Link to={"https://wa.me/5511940862140"}>
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
