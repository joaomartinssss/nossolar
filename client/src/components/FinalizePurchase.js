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
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useMediaQuery } from "@mui/material";
import breakPoints from "./BreakPoints";

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

function ProductRow({ item, handleIncrement, handleDecrement, handleRemove }) {
  const isMobile = useMediaQuery(breakPoints.mobile);

  return (
    <Grid container alignItems="center" style={style.grid} sx={{}}>
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
        <Typography
          sx={{ fontWeight: "bold", marginLeft: isMobile ? "1rem" : "" }}
        >
          {item.name}
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: "5px",
          marginLeft: isMobile ? "1rem" : "",
        }}
      >
        <IconButton
          sx={{ margin: "5px 0" }}
          onClick={() => handleDecrement(item.id)}
        >
          <RemoveIcon sx={{ color: "red" }} />
        </IconButton>
        <Typography sx={{ margin: "0 5px", fontWeight: "bold" }}>
          {item.quantity}
        </Typography>
        <IconButton onClick={() => handleIncrement(item.id)}>
          <AddIcon sx={{ color: "#14248A" }} />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => handleRemove(item.id)}>
          <DeleteForeverOutlinedIcon
            sx={{ color: "red", marginLeft: "3rem" }}
          />
        </IconButton>
      </Grid>
      <Grid item xs={6} sx={{ marginLeft: isMobile ? "2rem" : "" }}>
        <Typography sx={{ fontWeight: "bold" }}>
          {" "}
          Total: R$ {(item.price * item.quantity).toFixed(2)}
        </Typography>
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

  const HandleclearCart = () => {
    setCartItems([]);
  };

  const [totals, setTotals] = useState({
    valorCompra: 0,
    frete: 0,
    descontos: 0,
    subtotal: 0,
    total: 0,
  });

  const [showPickupOptions, setShowPickupOptions] = useState(false);
  const [showDeliveryOPtions, setShowDeliveryOptions] = useState(false);
  const isMobile = useMediaQuery(breakPoints.mobile);

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

  const handlePickupClick = () => {
    setShowPickupOptions(true);
    setShowDeliveryOptions(false);
  };

  const handleDeliveryClick = () => {
    setShowDeliveryOptions(true);
    setShowPickupOptions(false);
  };

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
            <PersonIcon sx={{ color: "#D3D3D3", fontSize: "2rem" }} />
            <Typography sx={{ color: "#D3D3D3", marginLeft: "5px" }}>
              Nome Do Cliente
            </Typography>
          </Box>
        </Link>
      </div>

      <Card style={style.card} sx={{ background: "#BCD3F2" }}>
        <CardContent style={style.cardContent}>
          <Grid container>
            <Grid item xs={isMobile ? 12 : 9} sx={{ pr: isMobile ? 0 : 4 }}>
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
              xs={isMobile ? 12 : 3}
              sx={{
                background: "#E5E7E6",
                borderRadius: "5px",
                border: "1px solid #A3A9AA",
                marginLeft: isMobile ? "0.5rem" : 0,
              }}
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
                  style={style.clientDados}
                  sx={{ marginTop: "1rem" }}
                >
                  Email: joaozinho77@gmail.com
                </Typography>
                <Typography style={style.clientDados}>
                  Nome: Joãozinho Martins
                </Typography>
                <Typography style={style.clientDados}>
                  Endereço: Rua Sebastião Mamede Nº 251
                </Typography>
                <Typography style={style.clientDados}>
                  Telefone: (11) 98060-7358
                </Typography>
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
                <Typography variant="h6" style={style.typographyClasses}>
                  Valor da Compra: R$ {totals.valorCompra.toFixed(2)}
                </Typography>
                <Typography variant="h6" style={style.typographyClasses}>
                  Frete: R$ {totals.frete.toFixed(2)}
                </Typography>
                <Typography variant="h6" style={style.typographyClasses}>
                  Descontos: R$ {totals.descontos.toFixed(2)}
                </Typography>
                <Typography variant="h6" style={style.typographyClasses}>
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
                    border: "1px solid #A3A9AA",
                  }}
                >
                  TOTAL A PAGAR: R$ {totals.total.toFixed(2)}
                </Typography>
                <Box
                  style={{
                    ...style.buttonFlexContainer,
                    flexDirection: isMobile ? "column" : "column",
                    alignItems: "center",
                    justifyContent: isMobile ? "center" : "center",
                  }}
                >
                  <Link to={"/"}>
                    <Button
                      variant="contained"
                      sx={{
                        fontWeight: "bold",
                        padding: "5px 10px",
                        fontFamily: "sans-serif",
                        margin: isMobile ? "0.5rem 1rem" : "0.5rem",
                        minWidth: isMobile ? "300px" : "300px",
                        maxHeight: isMobile ? "30px" : "30px",
                        minHeight: isMobile ? "40px" : "40px",
                        "&:hover": {
                          backgroundColor: "white", // Cor de fundo no hover
                          color: "#1976d2", // Cor do texto no hover
                          border: "1px solid #1976d2", // Cor da borda no hover
                          fontWeight: "bold",
                        },
                      }}
                    >
                      Continuar Comprando
                    </Button>
                  </Link>
                  <Box
                    sx={{
                      margin: isMobile ? "0.5rem 1rem" : "0",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        background: "#D10000",
                        fontFamily: "unset",
                        margin: isMobile ? "0.5rem 1rem" : "0.5rem",
                        minWidth: isMobile ? "300px" : "300px",
                        maxHeight: isMobile ? "30px" : "30px",
                        minHeight: isMobile ? "40px" : "40px",
                        "&:hover": {
                          backgroundColor: "white", // Cor de fundo no hover
                          color: "red", // Cor do texto no hover
                          border: "1px solid red", // Cor da borda no hover
                          fontWeight: "bold",
                        },
                      }}
                      onClick={HandleclearCart}
                    >
                      Deletar Carrinho
                      <DeleteForeverOutlinedIcon />
                    </Button>
                  </Box>
                  <Link to={"/Pagamento"}>
                    <Button
                      variant="contained"
                      sx={{
                        background: "green",
                        color: "white",
                        padding: isMobile ? "5% 20%" : "5px 10px",
                        fontFamily: "sans-serif",
                        margin: isMobile ? "0.5rem 1rem" : "0.5rem",
                        minWidth: isMobile ? "300px" : "300px",
                        maxHeight: isMobile ? "30px" : "30px",
                        minHeight: isMobile ? "40px" : "40px",
                        "&:hover": {
                          background: "white", // Cor de fundo no hover
                          color: "green", // Cor do texto no hover
                          border: "1px solid green", // Cor da borda no hover
                          fontWeight: "bold",
                        },
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
