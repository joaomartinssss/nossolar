import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, addToCart, onSelectProduct, showButtons }) => {
  const [fontSize, setFontSize] = useState(1); // Font size state
  const navigate = useNavigate();

  useEffect(() => {
    if (product && product.id) {
      // Ajustar font size para caber no card
      const cardHeight = document.getElementById(
        `product-card-${product.id}`
      )?.offsetHeight;
      const contentHeight = document.getElementById(
        `product-card-content-${product.id}`
      )?.offsetHeight;
      if (cardHeight && contentHeight) {
        const fontSizeRatio = cardHeight / contentHeight;
        setFontSize(fontSizeRatio > 1 ? 1 : fontSizeRatio); // Limitar tamanho máximo da fonte a 1
      }
    }
  }, [product]);

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(product);
  };

  const handleClick = () => {
    onSelectProduct(product);
    navigate(`/ProductPage2/${product.id}`);
  };

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  if (!product) {
    return null; // ou algum componente de fallback
  }

  return (
    <Card
      variant="outlined"
      id={`product-card-${product.id}`}
      style={{
        minHeight: "400px",
        width: "200px",
        overflow: "hidden",
        cursor: "pointer",
        borderRadius: "5px",
        margin: ".5rem",
      }}
      onClick={handleClick}
    >
      {/* Imagem */}
      <img
        src={product.image || "caminho-para-imagem-padrao.png"}
        alt={product.name || "Produto"}
        style={{
          width: "100%",
          height: "200px",
          padding: "10px, 10px, 10px, 10px",
        }}
      />
      <CardContent
        id={`product-card-content-${product.id}`}
        style={{
          minHeight: "150px",
          background: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <div>
          {/* Nome */}
          <Typography
            variant="h5"
            component="div"
            style={{
              fontSize: `${fontSize}rem`,
              fontFamily: "sans-serif",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {product.name?.length > 30
              ? `${product.name.substring(0, 30)}...`
              : product.name || "Nome do produto"}
          </Typography>

          {/* Preço */}
          <Typography
            variant="body1"
            color="textSecondary"
            style={{
              fontSize: `${fontSize}rem`,
              marginBottom: "10px",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            {formatPrice(product.price)}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {showButtons && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              style={{
                fontSize: `${fontSize}rem`,
                width: "100%",
                background: "#003599",
              }}
            >
              Adicionar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
