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
import Rodape from "./Rodape";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  card: {
    // marginBottom: "10rem",
    // display: "flex",
    // flexDirection: "column",
    // height: "auto",
    width: "100%",
    height: "100dvh",
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
  button: {
    backgroundColor: "green",
    color: "white",
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
  },
  link: {
    textDecoration: "none",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
  },
};

function ProductRow({ item, handleIncrement, handleDecrement, handleRemove }) {
  return (
    <Grid container alignItems="center" style={style.grid}>
      <Grid item xs={2}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            borderRadius: "50%",
            maxWidth: "100px",
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Typography sx={{ fontWeight: "bold" }}>{item.name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          sx={{ margin: "15px" }}
          onClick={() => handleDecrement(item.id)}
        >
          <RemoveIcon />
        </IconButton>
        {item.quantity}
        <IconButton
          sx={{ margin: "15px" }}
          onClick={() => handleIncrement(item.id)}
        >
          <AddIcon />
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <Typography>{(item.price * item.quantity).toFixed(2)}</Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => handleRemove(item.id)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

function BlackOverlay({ cartItems, setCartItems }) {
  const handleIncrement = (itemId) => {
    const updateCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updateCartItems);
  };

  const handleDecrement = (itemId) => {
    const updateCartItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updateCartItems);
  };

  const handleRemove = (itemId) => {
    const updateCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updateCartItems);
  };

  const [totals, setTotals] = useState({
    valorCompra: 0,
    frete: 0,
    descontos: 0,
    subtotal: 0,
    total: 0,
  });

  useEffect(() => {
    const valorCompra = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const subtotal = valorCompra + totals.frete - totals.descontos;
    const total = subtotal;

    setTotals({
      valorCompra,
      frete: totals.frete,
      descontos: totals.descontos,
      subtotal,
      total,
    });
  }, [cartItems, totals.frete, totals.descontos]);

  return (
    <div
      style={{
        background: "#003599",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100%",
        display: "block",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <CardContent>
          <Link to={""} style={style.link}>
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
            <PersonIcon sx={{ color: "#D3D3D3", fontSize: "2rem" }} />
            <Typography sx={{ color: "#D3D3D3", marginLeft: "5px" }}>
              Nome Do Cliente
            </Typography>
          </Box>
        </Link>
      </div>

      <Card style={style.card}>
        <CardContent style={style.cardContent}>
          <Grid container>
            <Grid item xs={9} sx={{pr: 4}}>
              {cartItems.map((item) => (
                <ProductRow
                  key={item.id}
                  item={item}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  handleRemove={handleRemove}
                />
              ))}
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ padding: "20px", color: "black", textAlign: "left" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Resumo do Pedido
                </Typography>
                <Typography>
                  Valor da Compra: {totals.valorCompra.toFixed(2)}
                </Typography>
                <Typography>Frete: {totals.frete.toFixed(2)}</Typography>
                <Typography>
                  Descontos: {totals.descontos.toFixed(2)}
                </Typography>
                <Typography>Subtotal: {totals.subtotal.toFixed(2)}</Typography>
                <Typography>Total: {totals.total.toFixed(2)}</Typography>
                <Link to={"/delivery"}>
                  <Button
                    style={style.button}
                    variant="contained"
                    sx={{
                      marginBottom: "5rem",
                      marginRight: "0",
                      marginTop: "2rem",
                    }}
                  >
                    Confirmar
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>          
        </CardContent>
      </Card>
      <Rodape />
    </div>
  );
}

export default BlackOverlay;