import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Rodape from "./Rodape";
import { Link, useNavigate } from "react-router-dom";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useMediaQuery } from "@mui/material";
import breakPoints from "./BreakPoints";
import ProductRow from "./finalizePurchase/ProductRow";
import TopNavFP from "./finalizePurchase/TopNavFP";
import axios from "axios";
import OpenDialog from "./finalizePurchase/ClearCartConditional";

const style = {
  card: {
    width: "100%",
    height: "100dvh",
    overflowY: "auto",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
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

<ProductRow />;

function BlackOverlay({ cartItems, setCartItems }) {
  const [userData, setUserData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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

  const handlePaymentClick = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

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
    navigate("/");
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
      <TopNavFP />
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
                {userData ? ( // Adicione esta verificação condicional
                  <>
                    <Typography
                      style={style.clientDados}
                      sx={{ marginTop: "1rem" }}
                    >
                      {`Email: ${userData.email}`}
                    </Typography>
                    <Typography style={style.clientDados}>
                      {`Nome: ${userData.name}`}
                    </Typography>
                    <Typography style={style.clientDados}>
                      {`Telefone: ${userData.telefone}`}
                    </Typography>
                  </>
                ) : (
                  <Typography style={style.clientDados}>
                    Carregando dados do usuário...
                  </Typography>
                )}
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
                      onClick={handleOpenDialog}
                    >
                      Deletar Carrinho
                      <DeleteForeverOutlinedIcon />
                    </Button>
                  </Box>
                  <Link
                    to={{
                      pathname: "/Pagamento",
                      state: { cartItems: cartItems },
                    }}
                  >
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
                      onClick={handlePaymentClick}
                    >
                      continuar
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Rodape />
      <OpenDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        HandleclearCart={HandleclearCart}
      />
    </div>
  );
}

export default BlackOverlay;
