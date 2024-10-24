import React, { useEffect, useState } from "react";
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
  Alert,
  Snackbar,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensagem de sucesso
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para controlar a exibição do Snackbar
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://15.228.201.29:3001/products/${productId}`)
      .then((response) => {
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setDescription(product.description);
        setImage(product.image);
      })
      .catch((error) => {
        console.error("Erro ao buscar produto:", error);
      });
  }, [productId]);

  const handleSave = () => {
    const updatedProduct = {
      name,
      categoryId: category,
      price,
      description,
      image,
    };

    axios
      .put(`http://15.228.201.29:3001/products/${productId}`, updatedProduct)
      .then((response) => {
        setSuccessMessage("Produto atualizado com sucesso!"); // Define a mensagem de sucesso
        setOpenSnackbar(true); // Abre o Snackbar

        setTimeout(() => {
          navigate("/ProductControl");
        }, 4000);
      })
      .catch((error) => {
        console.error("Erro ao atualizar produto:", error);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
            Editar produto:
          </Typography>
        </Box>
        <CardContent style={style.cardContent}>
          <Typography variant="h6" style={style.typography}>
            Nome do Produto:
          </Typography>
          <InputBase
            style={style.inputBase}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></InputBase>
          <Typography variant="h6" style={style.typography}>
            Preço do Produto: Use ponto em vez de virgula (4.99 = R$ 4,99)
          </Typography>
          <InputBase
            style={style.inputBase}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></InputBase>
          <Typography variant="h6" style={style.typography}>
            Categoria do produto:
          </Typography>
          <FormControl
            fullWidth
            sx={{ marginTop: ".5rem", marginBottom: ".5rem" }}
          >
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              style={style.inputBase}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></InputBase>
          <Typography variant="h6" style={style.typography}>
            Imagem do produto:
          </Typography>
          <InputBase
            style={style.inputBase}
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></InputBase>
          <Box>
            <Link to={"/ProductControl"}>
              <Button
                variant="contained"
                sx={{
                  background: "red",
                  marginTop: "1rem",
                  marginRight: ".5rem",
                }}
              >
                Cancelar
              </Button>
            </Link>
            <Button
              variant="contained"
              sx={{
                background: "green",
                marginTop: "1rem",
                marginRight: ".5rem",
                marginLeft: ".5rem",
              }}
              onClick={handleSave}
            >
              Salvar
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EditProduct;
