import React, { useState } from "react";
import {
  Card,
  CardContent,
  InputBase,
  Typography,
  Button,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

function CreateProductPage() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");

  const handleCreateProduct = async () => {
    const newProduct = {
      name: productName,
      price: productPrice,
      category: productCategory,
      description: productDescription,
      image: productImage,
    };

    try {
      const response = await fetch(
        `https://products.nossolarsupermercado.com/categories/${productCategory}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao criar produto");
      }

      console.log("Produto criado com sucesso!");
    } catch (error) {
      console.log("Erro ao criar produto", error);
    }
  };

  const handlePriceChange = (event) => {
    setProductPrice(event.target.value);
  };

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
    cardContent: {
      background: "white",
      width: "100%",
      height: "90%",
      flexDirection: "column",
      alignItems: "flex-start",
      display: "flex",
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
          <img
            src="https://products-nosso-lar.s3.sa-east-1.amazonaws.com/logoNossoLar.jpg"
            alt="Logo Nosso Lar"
            style={style.image}
          ></img>
          <Typography
            variant="h5"
            style={{
              ...style.typography,
              margin: "1rem",
              background: "white",
            }}
          >
            Página de criação de produtos:
          </Typography>
        </Box>
        <CardContent style={style.cardContent}>
          <Typography variant="h6" style={style.typography}>
            Nome do Produto:
          </Typography>
          <InputBase
            style={style.inputBase}
            placeholder=""
            onChange={(e) => setProductName(e.target.value)}
          ></InputBase>
          <Typography variant="h6" style={style.typography}>
            Preço do Produto: Não use ponto ou vírgula (4599 = R$45,99)
          </Typography>
          <InputBase
            style={style.inputBase}
            placeholder=""
            onChange={handlePriceChange}
          ></InputBase>
          <Typography variant="h6" style={style.typography}>
            Categoria do produto:
          </Typography>
          <FormControl
            fullWidth
            sx={{ marginTop: ".5rem", marginBottom: ".5rem" }}
          >
            <Select
              displayEmpty
              style={style.inputBase}
              value={productCategory}
              onChange={(e) => setProductCategory(Number(e.target.value))}
            >
              <MenuItem value={1}>Hortifruti</MenuItem>
              <MenuItem value={2}>Padaria</MenuItem>
              <MenuItem value={3}>Açougue</MenuItem>
              <MenuItem value={4}>Bebidas</MenuItem>
              <MenuItem value={5}>Rotisseria</MenuItem>
              <MenuItem value={6}>Bomboniere</MenuItem>
              <MenuItem value={7}>Bazar</MenuItem>
              <MenuItem value={8}>Automotivo</MenuItem>
              <MenuItem value={9}>Petshop</MenuItem>
              <MenuItem value={10}>Mercearia</MenuItem>
              <MenuItem value={11}>Limpeza</MenuItem>
              <MenuItem value={12}>Laticínios</MenuItem>
              <MenuItem value={13}>Bebês</MenuItem>
              <MenuItem value={14}>Higiene</MenuItem>
              <MenuItem value={15}>Congelados</MenuItem>
              <MenuItem value={16}>Utilidades</MenuItem>
              <MenuItem value={17}>Japonês</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6" style={style.typography}>
            Descrição do produto:
          </Typography>
          <InputBase
            style={style.inputBase}
            placeholder=""
            onChange={(e) => setProductDescription(e.target.value)}
          ></InputBase>
          <Typography variant="h6" style={style.typography}>
            Imagem do produto:
          </Typography>
          <InputBase
            style={style.inputBase}
            placeholder=""
            onChange={(e) => setProductImage(e.target.value)}
          ></InputBase>
          <Box>
            <Button
              variant="contained"
              sx={{
                background: "red",
                marginTop: "1rem",
                marginLeft: ".5rem",
              }}
            >
              Excluir Produtos
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "gold",
                marginTop: "1rem",
                marginLeft: "1rem",
                color: "#003599",
                marginRight: ".5rem",
              }}
            >
              Editar produtos
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "green",
                marginTop: "1rem",
                marginRight: ".5rem",
                marginLeft: ".5rem",
              }}
              onClick={handleCreateProduct}
            >
              Criar Produto
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateProductPage;

//Não use ponto ou vírgula (4599 = R$45,99)
