import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  InputBase,
  Modal,
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
      overflowX: "auto",
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
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    axios
      .get("https://products.nossolarsupermercado.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (productId) => {
    setDeleteProductId(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`https://products.nossolarsupermercado.com/products/${deleteProductId}`)
      .then((response) => {
        setProducts(
          products.filter((product) => product.id !== deleteProductId)
        );
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error("Erro ao excluir produto:", error);
        setShowDeleteModal(false);
      });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div
      style={{
        background: "#1976d2",
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
          overflowY: "auto",
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
              src="https://scontent.fsdu3-1.fna.fbcdn.net/v/t39.30808-6/318768361_487649283434966_4923966161297574562_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=iScLN_uATQcQ7kNvgFGCc-E&_nc_ht=scontent.fsdu3-1.fna&oh=00_AYCp337wpAEbbMFA9cap3516GfSUwBGVd5OBRUVJNO6o3Q&oe=66D88813"
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
          <InputBase
            style={style.inputBaseSearch}
            value={searchTerm}
            onChange={handleSearchChange}
          ></InputBase>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "50rem",
              marginTop: "0.5rem",
              padding: "0.5rem",
            }}
          >
            <Typography
              sx={{ width: "10%", fontWeight: "bold", marginLeft: "0.5rem" }}
            >
              ID:
            </Typography>
            <Typography sx={{ width: "30%", fontWeight: "bold" }}>
              Nome:
            </Typography>
            <Typography sx={{ width: "50%", fontWeight: "bold" }}>
              Descrição:
            </Typography>
            <Typography sx={{ width: "20%", fontWeight: "bold" }}>
              Preço:
            </Typography>
          </Box>
          <Box
            sx={{
              maxHeight: "70vh",
              overflowY: "auto",
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            {products
              .filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
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
                  <Typography
                    sx={{
                      width: "10%",
                      fontWeight: "bold",
                      marginLeft: "0.5rem",
                    }}
                  >
                    {product.id}
                  </Typography>
                  <Typography sx={{ width: "30%", fontWeight: "bold" }}>
                    {product.name}
                  </Typography>
                  <Typography sx={{ width: "50%", color: "gray" }}>
                    {product.description}
                  </Typography>
                  <Typography
                    sx={{
                      width: "10%",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    R$ {product.price}
                  </Typography>
                  <Link to={`/editProduct/${product.id}`}>
                    <EditOutlinedIcon
                      sx={{ color: "#003599", marginLeft: "1rem" }}
                    />
                  </Link>
                  <DeleteForeverOutlinedIcon
                    sx={{ color: "red", marginLeft: "1rem" }}
                    onClick={() => handleDelete(product.id)}
                  />
                </Box>
              ))}
          </Box>
        </CardContent>
      </Card>
      <Modal open={showDeleteModal} onClose={cancelDelete}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            border: "2px solid gray",
            boxShadow: 24,
            p: 4,
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Tem certeza que deseja excluir esse produto?
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={cancelDelete}
              variant="contained"
              sx={{ background: "gray" }}
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmDelete}
              variant="contained"
              sx={{ ml: 2, background: "red" }}
            >
              Excluir
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ProductControl;
