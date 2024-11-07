import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useMediaQuery } from "@mui/material";
import breakPoints from "../BreakPoints";
import axios from "axios";

const style = {
  card: {
    // marginBottom: "10rem",
    // display: "flex",
    // flexDirection: "column",
    // height: "auto",
    width: "100%",
    height: "100dvh",
    overflowY: "auto",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
    // paddingBottom: "2rem",
    // marginTop:"10rem"
  },
  text: {
    color: "black",
    fontWeight: "bold",
    margin: "10px",
  },
  spacer: {
    flexGrow: 1, // This will take up the remaining space and push the button down
  },
  personIcon: {
    fontSize: 50,
    marginBottom: 20,
    color: "#B1B5C8",
  },
  inputBase: {
    border: "1px solid black",
    borderRadius: "3px",
    padding: "0px 3px 0px 3px", // Add some padding so that the placeholder margin is visible
    backgroundColor: "#DBDDE6",
  },
  grid: {
    margin: "10px",
    background: "#E5E7E6",
    border: "1px solid #A3A9AA",
    borderRadius: "3px",
    padding: "10px",
  },
  link: {
    textDecoration: "none",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
  },
  buttonFlexContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  typographyClasses: {
    fontFamily: "unset",
    padding: "0rem 0rem 1.5rem 0rem",
    background: "white",
    borderRadius: "3px",
    padding: "5px",
    marginBottom: "1.5px",
    border: "1px solid #A3A9AA",
  },
  clientDados: {
    marginLeft: "1rem",
    fontWeight: "bold",
    fontFamily: "unset",
    background: "white",
    borderRadius: "3px",
    padding: "5px",
    marginRight: "1rem",
    marginBottom: "1px",
    border: "1px solid #A3A9AA",
  },
};

function TopNavFP() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user"); //Busque o usuario armazenado
    if (userData) {
      setUserData(JSON.parse(userData)); //Converta para JSON e atualize o estado
    }
  }, []);

  useEffect(() => {
    if (userData && userData.id) {
      // Verifica se userData existe e tem o campo id
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://products.nossolarsupermercado.com/api/auth/user/${userData.id}` // Certifique-se de usar o campo id correto
          );
          setUserData(response.data); // Atualize o estado com os dados do servidor
        } catch (error) {
          console.error("Erro ao buscar dados do usuário", error);
        }
      };
      fetchData();
    }
  }, [userData]);

  const isMobile = useMediaQuery(breakPoints.mobile);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      <CardContent>
        <Link to={"/"} style={style.link}>
          <Typography
            variant="h6"
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.5rem",
              textDecoration: "none",
            }}
          >
            Supermercado Nosso Lar
          </Typography>
        </Link>
      </CardContent>
      <Link to={""} style={style.link}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{ color: "white", marginLeft: "5px", fontWeight: "bold" }}
          >
            {userData ? `${userData.name}` : "Carregando..."}
          </Typography>
          <PersonIcon
            sx={{ color: "white", fontSize: "2rem", fontWeight: "bold" }}
          />
        </Box>
      </Link>
    </div>
  );
}

export default TopNavFP;
