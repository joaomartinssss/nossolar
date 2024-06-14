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
    background: "#E5E7E6",
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
            maxWidth: "60px",
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
        overflowY: "auto",
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
            <Grid item xs={9} sx={{ pr: 4 }}>
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
            <Grid
              item
              xs={3}
              sx={{ background: "#E5E7E6", borderRadius: "5px" }}
            >
              <Grid>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginTop: "1rem",
                    fontFamily: "unset",
                  }}
                >
                  DADOS PESSOAIS:
                </Typography>
                <Typography
                  sx={{
                    marginLeft: "1rem",
                    fontWeight: "bold",
                    marginTop: "1rem",
                    fontFamily: "unset",
                    background: "white",
                    borderRadius: "3px",
                    padding: "5px",
                    marginRight:"1rem",
                    marginBottom:"1px"
                  }}
                >
                  Email: joaozinho77@gmail.com
                </Typography>
                <Typography
                  sx={{
                    marginLeft: "1rem",
                    fontWeight: "bold",
                    fontFamily: "unset",
                    background: "white",
                    borderRadius: "3px",
                    padding: "5px",
                    marginRight:"1rem",
                    marginBottom:"1px"
                  }}
                >
                  Nome: Joãozinho Martins
                </Typography>
                <Typography
                  sx={{
                    marginLeft: "1rem",
                    fontWeight: "bold",
                    fontFamily: "unset",
                    background: "white",
                    borderRadius: "3px",
                    padding: "5px",
                    marginRight:"1rem",
                    marginBottom:"1px"
                  }}
                >
                  Endereço: Rua Sebastião Mamede Nº 251
                </Typography>
                <Typography
                  sx={{
                    marginLeft: "1rem",
                    fontWeight: "bold",
                    fontFamily: "unset",
                    background: "white",
                    borderRadius: "3px",
                    padding: "5px",
                    marginRight:"1rem"
                  }}
                >
                  Telefone: (11) 98060-7358
                </Typography>
              </Grid>
              <Grid sx={{ background: "#E5E7E6" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "unset",
                    textAlign: "center",
                    padding: "5px",
                    margin: "1rem",
                  }}
                >
                  OPÇÕES DE ENTREGA:
                </Typography>
                <Box style={{ ...style.buttonFlexContainer }}>
                  <Button
                    sx={{ padding: "5px 10px", fontFamily: "sans-serif" }}
                    variant="contained"
                  >
                    Receber em casa
                  </Button>
                  <Button
                    sx={{ padding: "5px 10px", fontFamily: "sans-serif" }}
                    variant="contained"
                  >
                    Retirar na Loja
                  </Button>
                </Box>
              </Grid>
              <Box
                sx={{
                  padding: "20px",
                  color: "black",
                  textAlign: "left",
                  background: "#E5E7E6",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    padding: "1.5rem 0rem 0.5rem 0rem",
                    fontFamily: "unset",
                    textAlign: "center",
                  }}
                >
                  RESUMO DO PEDIDO:
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "unset",
                    padding: "0rem 0rem 1.5rem 0rem",
                    background: "white",
                    borderRadius: "3px",
                    padding: "5px",
                    marginBottom: "1.5px",
                  }}
                >
                  Valor da Compra: R$ {totals.valorCompra.toFixed(2)}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "unset",
                    padding: "0rem 0rem 1.5rem 0rem",
                    background: "white",
                    borderRadius: "3px",
                    padding: "5px",
                    marginBottom: "2px",
                  }}
                >
                  Frete: R$ {totals.frete.toFixed(2)}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "unset",
                    padding: "0rem 0rem 1.5rem 0rem",
                    background: "white",
                    borderRadius: "3px",
                    padding: "5px",
                    marginBottom: "2px",
                  }}
                >
                  Descontos: R$ {totals.descontos.toFixed(2)}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "unset",
                    padding: "0rem 0rem 1.5rem 0rem",
                    background: "white",
                    // borderRadius: "5px",
                    padding: "5px",
                    marginBottom: "2px",
                  }}
                >
                  Subtotal: R$ {totals.subtotal.toFixed(2)}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    padding: "0rem 0rem 1.5rem 0rem",
                    fontFamily: "unset",
                    background: "white",
                    borderRadius: "3px",
                    padding: "5px",
                    marginBottom: "1rem",
                  }}
                >
                  TOTAL A PAGAR: R$ {totals.total.toFixed(2)}
                </Typography>
                <Box style={{ ...style.buttonFlexContainer }}>
                  <Link to={"/"}>
                    <Button
                      variant="contained"
                      sx={{ padding: "5px 10px", fontFamily: "sans-serif" }}
                    >
                      Continuar Comprando
                    </Button>
                  </Link>
                  <Link to={"/delivery"}>
                    <Button
                      style={style.button}
                      variant="contained"
                      sx={{
                        padding: "5px 10px",
                        fontFamily: "sans-serif",
                      }}
                    >
                      Confirmar
                    </Button>
                  </Link>
                </Box>
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
