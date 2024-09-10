import React, { useEffect, useState } from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams } from "react-router-dom";
import TopNav from "./TopNav";
import Rodape from "./Rodape";
import Categoria from "./Category";
import Loading3 from "./Loading3";
import Erro from "./Error";
import { useMediaQuery } from "@mui/material";
import breakPoints from "./BreakPoints";

function ProductPage2({ cartItems, setCartItems }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMobile = useMediaQuery(breakPoints.mobile);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3001/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Falha ao carregar o produto.");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    setCartItems((prevCartItems) => [
      ...prevCartItems,
      { ...product, quantity: 1 },
    ]);
  };

  if (loading) {
    return <Loading3 />;
  }

  if (error) {
    // return <div>Erro: {error}</div>;
    return <Erro />;
  }

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

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
      <Categoria />
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Card
          sx={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              alignItems: isMobile ? "flex-start" : "center",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Link to={"/"}>
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </Link>
            <div style={{ marginLeft: "20px", marginRight: "20px" }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: isMobile ? "300px" : "400px",
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
                style={{ fontWeight: "bold", fontSize: isMobile ? "35px" : "" }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{ fontWeight: "bold", fontSize: isMobile ? "30px" : "" }}
              >
                R$ {product.price}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  color: "white", // Cor padrão do texto
                  fontWeight: "bold",
                  fontSize: isMobile ? "18px" : "",
                  "&:hover": {
                    backgroundColor: "white", // Cor de fundo no hover
                    color: "#1976d2", // Cor do texto no hover
                    border: "1.5px solid #1976d2", // Cor da borda no hover
                  },
                }}
                onClick={handleAddToCart}
              >
                Adicionar ao Carrinho
              </Button>
              <Typography
                sx={{
                  color: "gray",
                  marginTop: ".5rem",
                  fontSize: isMobile ? "20px" : "",
                }}
              >
                {product.description}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
      <Rodape />
    </div>
  );
}

export default ProductPage2;
