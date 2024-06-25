import React from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import TopNav from "./TopNav";
import Rodape from "./Rodape";
import Categoria from "./Category";

function ProductPage2({ cartItems, setCartItems }) {
  return (
    <div
      style={{
        background: "#CDD1DE",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      <TopNav cartItems={cartItems} setCartItems={setCartItems} />      
      <Categoria/>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Card sx={{ display: "flex", alignItems: "center", padding: "20px" }}>
          <CardContent style={{ display: "flex", alignItems: "center" }}>
            <Link to={"/"}>
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </Link>
            <div style={{ marginLeft: "20px", marginRight: "20px" }}>
              <img
                src="https://boa.vtexassets.com/unsafe/fit-in/720x720/center/middle/https%3A%2F%2Fboa.vtexassets.com%2Farquivos%2Fids%2F553094%2FPicanha-Maturatta-Friboi-resfriada-kg.jpg%3Fv%3D638478606006830000"
                alt=""
                style={{
                  width: "400px",                  
                  border: " solid 5px #D8DDDE",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                style={{ fontWeight: "bold" }}
              >
                Picanha Friboi
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{ fontWeight: "bold" }}
              >
                R$ 67,99
              </Typography>
              <Button
                variant="contained"
                style={{ background: "#004BA8", fontWeight: "bold" }}
              >
                Adicionar ao Carrinho
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Rodape />
    </div>
  );
}

export default ProductPage2;
