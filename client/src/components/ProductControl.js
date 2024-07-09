import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Input,
  InputBase,
} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductControl() {
  const style = {
    inputBase: {
      border: "1px solid #AEB7B3",
      borderRadius: "3px",
      padding: "0 .5rem",
      background: "#EEF0EB",
      marginTop: ".5rem",
      marginBottom: ".5rem",
      boxShadow: "inset 0 0 1px black",
      width: "40rem",
    },
    inputBaseSearch: {
      border: "1px solid #AEB7B3",
      borderRadius: "3px",
      padding: "0 .5rem",
      background: "#EEF0EB",
      marginTop: ".5rem",
      marginBottom: ".5rem",
      boxShadow: "inset 0 0 1px black",
      width: "20rem",
    },
    cardContent: {
      background: "white",
      width: "100%",
      height: "90%",
      flexDirection: "column",
      alignItems: "flex-start",
      display: "flex",
      overFlowY: "auto",
    },
    typography: {
      textAlign: "left",
      fontWeight: "bold",
    },
    image: {
      width: "100px",
      height: "100px",
      marginLeft: "1rem",
    },
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  return (
    <div
      style={{
        background: "#CDD1DE",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <Card
        sx={{
          width: "90%",
          height: "90%",
          background: "white",
          overFlowY: "auto",
          alignItems: "flex-start",
          border: "3px solid #CDD1DE",
        }}
      >
        <Box
          sx={{
            display: "flex",
            border: "3px solid #CDD1DE",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to={"/"}>
            <img
              src="https://scontent.fsdu3-1.fna.fbcdn.net/v/t39.30808-1/318768361_487649283434966_4923966161297574562_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=zzM-ysoX78YQ7kNvgG60A-p&_nc_ht=scontent.fsdu3-1.fna&oh=00_AYBxLE6I_uDk7wsUHbKJQ3a5zysEse_I7Waij2YJ6gR_Dw&oe=668B9C95"
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
            Página de controle de produtos:
          </Typography>
        </Box>
        <CardContent style={style.cardContent}>
          <Link to={"/createProduct"}>
            <Button
              variant="contained"
              sx={{
                background: "#A7B0CA",
                marginTop: "1rem",
                marginRight: ".5rem",
              }}
            >
              Adicionar <AddOutlinedIcon sx={{ marginLeft: ".2rem" }} />
            </Button>
          </Link>
          <Typography style={{ ...style.typography, marginTop: "1rem" }}>
            Pesquisar por produtos:
          </Typography>
          <InputBase style={style.inputBaseSearch}></InputBase>
          <Box>
            {products.map((product) => (
              <Box
                key={product.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "50rem",
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  background: "#EEF0EB",
                  borderRadius: "4px",
                }}
              >
                <Typography sx={{ width: "30%", fontWeight: "bold" }}>
                  {product.name}
                </Typography>
                <Typography sx={{ width: "50%", color: "gray" }}>
                  {product.description}
                </Typography>
                <Typography
                  sx={{ width: "20%", textAlign: "right", fontWeight: "bold" }}
                >
                  R$ {product.price}
                </Typography>
                <Link to={"/editProduct"}>
                  <EditOutlinedIcon
                    sx={{ color: "#003599", marginLeft: "1rem" }}
                  />
                </Link>
                <DeleteForeverOutlinedIcon
                  sx={{ color: "red", marginLeft: "1rem" }}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductControl;
