import React, { useState } from "react";
import { IconButton, Typography, Grid, Button } from "@material-ui/core";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Box } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useMediaQuery } from "@mui/material";
import breakPoints from "./BreakPoints";
import OpenDialog from "./finalizePurchase/ClearCartConditional";

const Cart = ({ cartItems, setCartItems, setCartOpen }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleIncrement = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleRemove = (itemId) => {
    const updatedCartItems = cartItems.filter(
      (item) => `${item.id}-${item.quantity}` !== itemId
    );
    setCartItems(updatedCartItems);
  };

  // Função para calcular o total
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Verificar se o carrinho está vazio
  const isEmptyCart = cartItems.length === 0;

  const HandleclearCart = () => {
    setCartItems([]);
  };

  const truncateName = (name, length) => {
    return name.length > length ? name.slice(0, length) + "..." : name;
  };

  const isMobile = useMediaQuery(breakPoints.mobile);

  return (
    <div
      className="cart"
      style={{
        position: "relative",
        paddingBottom: "3rem",
      }}
    >
      {isEmptyCart ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/carrinho_vazio.png"
            alt="Imagem Carrinho Vazio"
            style={{ width: "20rem" }}
          />
          <p style={{ color: "black" }}>
            Carrinho vazio, que tal adicionar alguns itens?
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCartOpen(false)}
          >
            Fechar Carrinho
          </Button>
        </div>
      ) : (
        <div>
          <h2 color="#333">Carrinho</h2>
          <Grid container spacing={2}>
            {cartItems.map((item, index) => (
              <Grid item xs={12} key={item.id}>
                <Grid
                  container
                  alignItems="center"
                  spacing={1}
                  style={{
                    borderBottom:
                      index < cartItems.length - 1 ? "1px solid #ccc" : "none",
                  }}
                >
                  <Grid item xs={1}>
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        overflow: "hidden",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      variant="body1"
                      style={{
                        color: "black",
                        marginLeft: "30px",
                        fontWeight: "bold",
                      }}
                    >
                      {truncateName(item.name, 14)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <IconButton
                          aria-label="Diminuir quantidade"
                          onClick={() => handleDecrement(item.id)}
                        >
                          <RemoveIcon style={{ color: "red" }} />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          style={{ color: "black", fontWeight: "bold" }}
                        >
                          {item.quantity}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label="Incrementar quantidade"
                          onClick={() => handleIncrement(item.id)}
                        >
                          <AddIcon style={{ color: "#14248A" }} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="body1"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      {formatPrice(item.price * item.quantity)}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      aria-label="Remover item"
                      onClick={() =>
                        handleRemove(`${item.id}-${item.quantity}`)
                      }
                    >
                      <DeleteForeverOutlinedIcon style={{ color: "Red" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0rem 2rem 0rem 1rem",
                alignItems: "center", // Alinha verticalmente o texto e o botão
                width: "100%",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <Typography
                variant="h6"
                style={{
                  color: "white",
                  textAlign: "left",
                  marginTop: "1rem",
                  background: "#333",
                  width: "fit-content",
                  padding: "0.3rem 1.5rem",
                  borderRadius: "5px",
                }}
              >
                Total: {formatPrice(calculateTotal())}
              </Typography>
              <Link to={"/FinalizePurchase"}>
                <Button
                  variant="contained"
                  style={{
                    background: "green",
                    color: "white",
                    padding: "0.5rem 1rem",
                    marginTop: "1rem",
                  }}
                  onClick={() => {
                    setCartOpen(false); // Oculta o carrinho
                  }}
                >
                  Finalizar Compra
                </Button>
              </Link>
            </Box>
            <Button
              variant="contained"
              style={{
                background: "red",
                color: "white",
                fontWeight: "bold",
                position: "relative",
                bottom: "1rem",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: "999",
                width: "90%",
                maxWidth: isMobile ? "300px" : "500px",
                marginTop: "2rem",
              }}
              onClick={handleOpenDialog}
            >
              Deletar Carrinho <DeleteForeverOutlinedIcon />
            </Button>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            style={{
              position: "relative",
              bottom: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: "999",
              width: "90%",
              maxWidth: isMobile ? "300px" : "500px",
              marginBottom: "1rem",
              marginTop: "2rem",
            }}
            onClick={() => setCartOpen(false)}
          >
            Fechar Carrinho
          </Button>
        </div>
      )}
      <OpenDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        HandleclearCart={HandleclearCart}
      />
    </div>
  );
};

export default Cart;
