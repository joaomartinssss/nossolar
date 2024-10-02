import { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Rodape from "./Rodape";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import PixIcon from "@mui/icons-material/Pix";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import breakPoints from "./BreakPoints";
import { useMediaQuery } from "@mui/material";
import axios from "axios";

function Payment() {
  const [selectOption, setSelectOption] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [cartItems, setCartItems] = useState()

  const isMobile = useMediaQuery(breakPoints.mobile);

  useEffect(() => {
    setOpenDialog(true);
  }, []);

  const handleSelect = (option) => {
    setSelectOption(option);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const userId1 = 1;

  const handleCreateOrder = async () => {
    if (!selectOption) {
      alert("Por favor, selecione uma forma de pagamento!");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      alert("Carrinho vazio! Adicione itens ao carrinho antes de continuar.");
      return;
    }

    const formattedCartItems = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const newOrder = {
      user_id: userId1,
      payment_method: selectOption,
      type: "retirada",
      items: formattedCartItems,
    };

    try {
      const res = await axios.post("http://localhost:4000/orders", newOrder);
      console.log("Pedido criado com sucesso", res.data);
      alert("Pedido realizado com sucesso!");
    } catch (err) {
      console.error("Erro ao criar pedido:", err);
      alert("Erro ao realizar pedido. Tente novamente");
    }
  };

  const style = {
    image: {
      width: "100px",
      height: "100px",
      marginLeft: "1rem",
    },
    button: {
      margin: "1rem",
    },
    selectButton: {
      margin: "1rem",
      backgroundColor: "blue",
      color: "white",
    },
    confirmButton: {
      margin: "1rem",
      backgroundColor: "green",
      color: "#fff",
      width: "300px",
    },
    typography: {
      textAlign: "left",
      fontWeight: "bold",
    },
    icon: {
      marginLeft: "1rem",
    },
  };

  return (
    <div
      style={{
        background: "#CDD1DE",
        top: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "auto",
      }}
    >
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Aviso
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#003599",
              display: isMobile ? "none" : "block",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
            No momento não podemos realizar entregas, apenas retirada!
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: isMobile ? "center" : "center",
          }}
        >
          <Button
            variant="outlinec"
            onClick={handleCloseDialog}
            color="primary"
            sx={{
              margin: "1rem",
              color: "red",
              border: "1px solid red",
              fontWeight: "bold",
              width: isMobile ? "100%" : "auto",
              "&:hover": {
                backgroundColor: "red", // Cor de fundo ao passar o mouse
                color: "white", // Cor do texto ao passar o mouse
                border: "1px solid red", // Manter a borda vermelha
              },
            }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          display: "flex",
          border: "3px solid #cdd1de",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
          padding: "2rem",
          marginBottom: "1rem",
          marginTop: "5rem",
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        <Link to={"/"}>
          <img
            src="https://scontent.fsdu3-1.fna.fbcdn.net/v/t39.30808-6/318768361_487649283434966_4923966161297574562_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=vB82178ChRoQ7kNvgHyOB6F&_nc_ht=scontent.fsdu3-1.fna&_nc_gid=AsJo2QaL_XcKJpgoaRCkr11&oh=00_AYDxB29xn5jt1smBGNL_WsiB1_5p6LEAAYh6I_MMi51ncA&oe=66E62793"
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
          Página de Pagamento
        </Typography>
      </Box>
      <Card
        sx={{
          background: "white",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
        }}
      >
        <Typography style={style.typography} variant="h5">
          Formas de Pagamento:
        </Typography>
        <Typography sx={{ color: "#A29C9B", marginTop: "0.5rem" }}>
          No momento, aceitamos o pagamento somente na retirada com as opções
          abaixo!
        </Typography>
        <Box
          sx={{
            marginTop: "1rem",
            display: isMobile ? "flex" : "flex",
            flexDirection: isMobile ? "column" : "column",
            width: isMobile ? "100%" : "30%",
          }}
        >
          <Button
            style={
              selectOption === "debito" ? style.selectButton : style.button
            }
            variant="outlined"
            onClick={() => handleSelect("debito")}
          >
            Débito <PaymentIcon sx={{ marginLeft: "5px" }} />
            {selectOption === "debito" && (
              <CheckCircleOutlineIcon style={style.icon} />
            )}
          </Button>
          <Button
            style={
              selectOption === "credito" ? style.selectButton : style.button
            }
            variant="outlined"
            onClick={() => handleSelect("credito")}
          >
            Crédito <PaymentIcon sx={{ marginLeft: "5px" }} />
            {selectOption === "credito" && (
              <CheckCircleOutlineIcon style={style.icon} />
            )}
          </Button>
          <Button
            style={selectOption === "pix" ? style.selectButton : style.button}
            variant="outlined"
            onClick={() => handleSelect("pix")}
          >
            Pix <PixIcon sx={{ marginLeft: "5px" }} />
            {selectOption === "pix" && (
              <CheckCircleOutlineIcon style={style.icon} />
            )}
          </Button>
          <Button
            style={
              selectOption === "dinheiro" ? style.selectButton : style.button
            }
            variant="outlined"
            onClick={() => handleSelect("dinheiro")}
          >
            Dinheiro <LocalAtmIcon sx={{ marginLeft: "5px" }} />
            {selectOption === "dinheiro" && (
              <CheckCircleOutlineIcon style={style.icon} />
            )}
          </Button>
        </Box>
        {selectOption && (
          <Button
            style={style.confirmButton}
            variant="contained"
            onClick={handleCreateOrder}
          >
            Confirmar
          </Button>
        )}
      </Card>
      <Rodape />
    </div>
  );
}

export default Payment;
